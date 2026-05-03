import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

function getR2Config() {
  const accountId = process.env.R2_ACCOUNT_ID;
  const bucketName = process.env.R2_BUCKET_NAME || 'media';
  const publicUrl = process.env.R2_PUBLIC_URL;
  
  const endpoint = accountId 
    ? `https://${accountId}.r2.cloudflarestorage.com` 
    : null;
  
  return { accountId, bucketName, publicUrl, endpoint };
}

let r2Client: S3Client | null = null;

function getR2Client(): S3Client {
  const { endpoint } = getR2Config();
  if (!r2Client && endpoint) {
    r2Client = new S3Client({
      region: 'auto',
      endpoint,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
      },
    });
  }
  return r2Client!;
}

export function getPublicUrl(key: string): string {
  const { publicUrl, endpoint, bucketName } = getR2Config();
  
  const normalizedKey = key.replace(/^\//, '');
  
  if (publicUrl) {
    return `${publicUrl.replace(/\/$/, '')}/${normalizedKey}`;
  }
  
  if (endpoint) {
    return `${endpoint}/${bucketName}/${normalizedKey}`;
  }
  
  return `/${normalizedKey}`;
}

export async function uploadToR2(
  file: File,
  key: string
): Promise<{ key: string; url: string }> {
  const client = getR2Client();
  const { bucketName } = getR2Config();
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const upload = new Upload({
    client,
    params: {
      Bucket: bucketName,
      Key: key,
      Body: buffer,
      ContentType: file.type,
    },
    leavePartsOnError: false,
  });

  await upload.done();

  return {
    key,
    url: getPublicUrl(key),
  };
}

export async function deleteFromR2(key: string): Promise<boolean> {
  try {
    const client = getR2Client();
    const { bucketName } = getR2Config();
    await client.send(
      new DeleteObjectCommand({
        Bucket: bucketName,
        Key: key,
      })
    );
    return true;
  } catch (error) {
    console.error('Error deleting from R2:', error);
    return false;
  }
}

export async function deleteMultipleFromR2(keys: string[]): Promise<boolean> {
  try {
    const client = getR2Client();
    const { bucketName } = getR2Config();
    await Promise.all(
      keys.map((key) =>
        client.send(
          new DeleteObjectCommand({
            Bucket: bucketName,
            Key: key,
          })
        )
      )
    );
    return true;
  } catch (error) {
    console.error('Error deleting multiple from R2:', error);
    return false;
  }
}
