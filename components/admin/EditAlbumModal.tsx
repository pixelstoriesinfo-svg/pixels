'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Sortable from 'sortablejs';

interface Media {
  id: number;
  album_id: number;
  file_name: string;
  url: string;
  file_type: 'image' | 'video';
  order_index: number;
}

interface Album {
  id: number;
  name: string;
  category_name: string;
  sub_category_name: string;
}

interface EditAlbumModalProps {
  album: Album;
  onClose: () => void;
  onUpdate: () => void;
}

export default function EditAlbumModal({ album, onClose, onUpdate }: EditAlbumModalProps) {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const sortableRef = useRef<HTMLDivElement>(null);
  const sortableInstance = useRef<Sortable | null>(null);

  const fetchMedia = useCallback(async () => {
    try {
      const response = await fetch(`/api/albums/${album.id}/media`);
      const data = await response.json();
      if (data.success) {
        setMedia(data.data);
      }
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setLoading(false);
    }
  }, [album.id]);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  useEffect(() => {
    if (!sortableRef.current || loading) return;

    const sortable = Sortable.create(sortableRef.current, {
      animation: 200,
      ghostClass: 'opacity-50',
      onEnd: (evt) => {
        const items = [...media];
        const [movedItem] = items.splice(evt.oldIndex!, 1);
        items.splice(evt.newIndex!, 0, movedItem);
        setMedia(items);
      },
    });

    sortableInstance.current = sortable;

    return () => {
      if (sortableInstance.current && sortableInstance.current.el) {
        sortableInstance.current.destroy();
        sortableInstance.current = null;
      }
    };
  }, [media, loading]);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append('files', file);
      });

      const response = await fetch(`/api/albums/${album.id}/media`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setMedia((prev) => [...prev, ...data.data]);
        onUpdate();
      }
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDeleteMedia = async (mediaId: number) => {
    if (!confirm('Are you sure you want to delete this media?')) return;

    try {
      const response = await fetch(`/api/albums/${album.id}/media`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mediaId }),
      });

      if (response.ok) {
        setMedia((prev) => prev.filter((m) => m.id !== mediaId));
        onUpdate();
      }
    } catch (error) {
      console.error('Error deleting media:', error);
    }
  };

  const handleSaveOrder = async () => {
    setSaving(true);
    try {
      const mediaOrder = media.map((m) => m.id);
      await fetch(`/api/albums/${album.id}/media`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mediaOrder }),
      });
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error saving order:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-4">
      <div className="bg-secondary-bg rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col border border-border-color">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white">Edit Album: {album.name}</h3>
            <p className="text-text-color text-sm">
              {album.category_name} / {album.sub_category_name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-text-color hover:text-white transition"
          >
            <i className="bi bi-x-lg text-2xl"></i>
          </button>
        </div>

        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center mb-4 transition ${
            dragOver
              ? 'border-primary bg-primary/10'
              : 'border-border-color hover:border-primary/50'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            type="file"
            id="file-upload"
            className="hidden"
            multiple
            accept="image/*,video/*"
            onChange={(e) => handleFileUpload(e.target.files)}
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            <i className="bi bi-cloud-arrow-up text-5xl text-primary mb-3"></i>
            <p className="text-white font-medium">
              {uploading ? 'Uploading...' : 'Drop files here or click to upload'}
            </p>
            <p className="text-text-color text-sm mt-1">
              Supports images (JPG, PNG, GIF) and videos (MP4, WebM)
            </p>
          </label>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-text-color">Loading media...</p>
          </div>
        ) : (
          <>
            <div className="text-text-color text-sm mb-2">
              {media.length} {media.length === 1 ? 'item' : 'items'} - Drag to reorder
            </div>

            <div
              ref={sortableRef}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 overflow-y-auto flex-1 mb-4"
              style={{ maxHeight: '400px' }}
            >
                {media.map((item) => (
                  <div
                    key={item.id}
                    className="relative group bg-dark-bg rounded-lg overflow-hidden aspect-square"
                  >
                    {item.file_type === 'image' ? (
                      <img
                        src={item.url}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-dark-bg">
                        <video
                          src={item.url}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <i className="bi bi-play-circle-fill text-4xl text-white/80"></i>
                        </div>
                      </div>
                    )}

                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-2">
                    <button
                      onClick={() => handleDeleteMedia(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
                    >
                      <i className="bi bi-trash mr-1"></i>
                      Delete
                    </button>
                  </div>

                  <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                    <i className="bi bi-arrows-move mr-1"></i>
                    Drag
                  </div>

                  {item.order_index === 0 && (
                    <div className="absolute top-2 right-2 bg-primary text-dark-bg text-xs px-2 py-1 rounded font-medium">
                      <i className="bi bi-star-fill mr-1"></i>
                      Cover
                    </div>
                  )}
                </div>
              ))}
            </div>

            {media.length === 0 && (
              <div className="text-center py-8 text-text-color/60">
                No media uploaded yet. Drop files above to add photos or videos.
              </div>
            )}
          </>
        )}

        <div className="flex justify-end gap-3 pt-4 border-t border-border-color">
          <button
            onClick={onClose}
            className="border border-border-color text-text-color px-4 py-2 rounded-lg hover:bg-border-color/20 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveOrder}
            disabled={saving}
            className="bg-primary text-dark-bg px-4 py-2 rounded-lg font-semibold hover:bg-primary-light transition disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
