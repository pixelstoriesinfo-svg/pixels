'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import EditAlbumModal from './EditAlbumModal';

interface Album {
  id: number;
  name: string;
  category_name: string;
  sub_category_name: string;
  sub_category_id?: number;
}

interface Category {
  id: number;
  name: string;
}

interface SubCategory {
  id: number;
  name: string;
  category_id: number;
}

export default function AlbumManager() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingAlbum, setEditingAlbum] = useState<Album | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category_id: '',
    sub_category_id: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [albumsRes, categoriesRes] = await Promise.all([
        fetch('/api/albums'),
        fetch('/api/categories'),
      ]);

      const albumsData = await albumsRes.json();
      const categoriesData = await categoriesRes.json();

      if (albumsData.success) setAlbums(albumsData.data);
      if (categoriesData.success) {
        setCategories(categoriesData.data);
        // Fetch all subcategories
        const subRes = await fetch('/api/subcategories');
        const subData = await subRes.json();
        if (subData.success) setSubCategories(subData.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    setFormData({ ...formData, category_id: categoryId, sub_category_id: '' });
  };

  const handleCreateAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/albums', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          sub_category_id: formData.sub_category_id,
        }),
      });

      if (response.ok) {
        setShowCreateForm(false);
        setFormData({ name: '', category_id: '', sub_category_id: '' });
        fetchData();
      }
    } catch (error) {
      console.error('Error creating album:', error);
    }
  };

  const handleDeleteAlbum = async (id: number) => {
    if (!confirm('Are you sure you want to delete this album? All media will be permanently deleted.')) return;

    try {
      const response = await fetch(`/api/albums/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error deleting album:', error);
    }
  };

  if (loading) {
    return <p className="text-white">Loading albums...</p>;
  }

  const filteredSubCategories = subCategories.filter(
    (sc) => sc.category_id === parseInt(formData.category_id)
  );

  return (
    <div>
      {/* Create Album Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-primary text-dark-bg px-4 py-2 rounded-lg font-semibold hover:bg-primary-light transition"
        >
          <i className="bi bi-plus-circle mr-2"></i>
          Create New Album
        </button>
      </div>

      {/* Create Album Form */}
      {showCreateForm && (
        <div className="bg-secondary-bg rounded-xl p-6 border border-border-color mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Create New Album</h3>
          <form onSubmit={handleCreateAlbum}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-text-color mb-2">Main Category</label>
                <select
                  value={formData.category_id}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full bg-dark-bg border border-border-color rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-text-color mb-2">Sub-Category</label>
                <select
                  value={formData.sub_category_id}
                  onChange={(e) => setFormData({ ...formData, sub_category_id: e.target.value })}
                  className="w-full bg-dark-bg border border-border-color rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                  required
                  disabled={!formData.category_id}
                >
                  <option value="">Select a sub-category</option>
                  {filteredSubCategories.map((sc) => (
                    <option key={sc.id} value={sc.id}>
                      {sc.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-text-color mb-2">Album Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-dark-bg border border-border-color rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                required
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-primary text-dark-bg px-4 py-2 rounded-lg font-semibold hover:bg-primary-light transition"
              >
                Create Album
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="border border-border-color text-text-color px-4 py-2 rounded-lg hover:bg-border-color/20 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Albums List */}
      <div className="bg-secondary-bg rounded-xl border border-border-color overflow-hidden">
        <table className="w-full">
          <thead className="bg-border-color/30">
            <tr>
              <th className="text-left p-4 text-text-color">Album Name</th>
              <th className="text-left p-4 text-text-color">Category</th>
              <th className="text-right p-4 text-text-color">Actions</th>
            </tr>
          </thead>
          <tbody>
            {albums.map((album) => (
              <tr key={album.id} className="border-t border-border-color hover:bg-border-color/10">
                <td className="p-4 text-white font-medium">{album.name}</td>
                <td className="p-4 text-text-color">
                  {album.category_name} / {album.sub_category_name}
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => setEditingAlbum(album)}
                    className="text-primary hover:text-primary-light mr-3 transition"
                  >
                    <i className="bi bi-pencil-fill"></i>
                  </button>
                  <button
                    onClick={() => handleDeleteAlbum(album.id)}
                    className="text-red-500 hover:text-red-400 transition"
                  >
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {albums.length === 0 && (
          <div className="text-center py-8 text-text-color/60">
            No albums found. Create your first album!
          </div>
        )}
      </div>

      {/* Edit Album Modal */}
      {editingAlbum && (
        <EditAlbumModal
          album={editingAlbum}
          onClose={() => setEditingAlbum(null)}
          onUpdate={fetchData}
        />
      )}
    </div>
  );
}