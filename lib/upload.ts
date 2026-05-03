import { v4 as uuidv4 } from 'uuid';
import { uploadToR2, deleteFromR2, getPublicUrl } from './r2';

export interface UploadedFile {
  filename: string;
  path: string;
  url: string;
  type: 'image' | 'video';
}

export async function saveFile(
  file: File,
  type: 'image' | 'video'
): Promise<UploadedFile> {
  const extension = file.name.split('.').pop();
  const filename = `${uuidv4()}.${extension}`;
  const key = `${type}s/${filename}`;

  const result = await uploadToR2(file, key);

  return {
    filename,
    path: key,
    url: result.url,
    type,
  };
}

export async function deleteFile(filePath: string): Promise<boolean> {
  return deleteFromR2(filePath);
}

export function getMediaUrl(filePath: string): string {
  return getPublicUrl(filePath);
}
