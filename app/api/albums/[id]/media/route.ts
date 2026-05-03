import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { saveFile, deleteFile, getMediaUrl } from '@/lib/upload';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const albumId = parseInt(id);

    const media = await query(
      'SELECT id, file_name, file_type, order_index FROM media WHERE album_id = ? ORDER BY order_index ASC, id ASC',
      [albumId]
    );

    const mediaWithUrls = (media as any[]).map((item) => ({
      ...item,
      url: getMediaUrl(item.file_name),
    }));

    return NextResponse.json({
      success: true,
      data: mediaWithUrls,
    });
  } catch (error) {
    console.error('Error fetching media:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch media' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const albumId = parseInt(id);

    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No files provided' },
        { status: 400 }
      );
    }

    const maxOrderResult = await query<{ max_order: number }[]>(
      'SELECT COALESCE(MAX(order_index), 0) as max_order FROM media WHERE album_id = ?',
      [albumId]
    );
    let orderIndex = (maxOrderResult[0]?.max_order || 0) + 1;

    const uploadedMedia = [];

    for (const file of files) {
      const isVideo = file.type.startsWith('video/');
      const type = isVideo ? 'video' : 'image';

      const result = await saveFile(file, type);

      const insertResult = await query<{ insertId: number }>(
        'INSERT INTO media (album_id, file_name, file_type, order_index) VALUES (?, ?, ?, ?)',
        [albumId, result.path, type, orderIndex]
      );

      uploadedMedia.push({
        id: insertResult.insertId,
        album_id: albumId,
        file_name: result.path,
        file_type: type,
        order_index: orderIndex,
        url: result.url,
      });

      orderIndex++;
    }

    return NextResponse.json({
      success: true,
      data: uploadedMedia,
    });
  } catch (error) {
    console.error('Error uploading media:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload media' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const albumId = parseInt(id);

    const { mediaOrder } = await request.json();

    if (!Array.isArray(mediaOrder)) {
      return NextResponse.json(
        { success: false, error: 'Invalid media order' },
        { status: 400 }
      );
    }

    for (let i = 0; i < mediaOrder.length; i++) {
      await query(
        'UPDATE media SET order_index = ? WHERE id = ? AND album_id = ?',
        [i, mediaOrder[i], albumId]
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating media order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update media order' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const albumId = parseInt(id);

    const { mediaId } = await request.json();

    const mediaResult = await query<{ file_name: string }[]>(
      'SELECT file_name FROM media WHERE id = ? AND album_id = ?',
      [mediaId, albumId]
    );

    if (mediaResult.length > 0) {
      await deleteFile(mediaResult[0].file_name);
      await query('DELETE FROM media WHERE id = ?', [mediaId]);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting media:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete media' },
      { status: 500 }
    );
  }
}
