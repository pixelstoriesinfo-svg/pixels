'use client';

import { useState, useEffect } from 'react';

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface SubCategory {
  id: number;
  name: string;
  slug: string;
  category_id: number;
  category_name?: string;
}

export default function CategoryManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showSubCategoryForm, setShowSubCategoryForm] = useState(false);
  const [categoryForm, setCategoryForm] = useState({ name: '' });
  const [subCategoryForm, setSubCategoryForm] = useState({ name: '', category_id: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [categoriesRes, subRes] = await Promise.all([
        fetch('/api/categories'),
        fetch('/api/subcategories'),
      ]);

      const categoriesData = await categoriesRes.json();
      const subData = await subRes.json();

      if (categoriesData.success) setCategories(categoriesData.data);
      if (subData.success) setSubCategories(subData.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryForm),
      });

      if (response.ok) {
        setShowCategoryForm(false);
        setCategoryForm({ name: '' });
        fetchData();
      }
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  const handleCreateSubCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/subcategories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subCategoryForm),
      });

      if (response.ok) {
        setShowSubCategoryForm(false);
        setSubCategoryForm({ name: '', category_id: '' });
        fetchData();
      }
    } catch (error) {
      console.error('Error creating sub-category:', error);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (!confirm('Delete this category? All sub-categories and albums will also be deleted.')) return;
    try {
      await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleDeleteSubCategory = async (id: number) => {
    if (!confirm('Delete this sub-category? All albums in it will also be deleted.')) return;
    try {
      await fetch(`/api/subcategories/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (error) {
      console.error('Error deleting sub-category:', error);
    }
  };

  if (loading) {
    return <p className="text-white">Loading categories...</p>;
  }

  return (
    <div>
      {/* Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setShowCategoryForm(!showCategoryForm)}
          className="bg-primary text-dark-bg px-4 py-2 rounded-lg font-semibold hover:bg-primary-light transition"
        >
          <i className="bi bi-plus-circle mr-2"></i>
          Add Main Category
        </button>
        <button
          onClick={() => setShowSubCategoryForm(!showSubCategoryForm)}
          className="border border-primary text-primary px-4 py-2 rounded-lg font-semibold hover:bg-primary/10 transition"
        >
          <i className="bi bi-folder-plus mr-2"></i>
          Add Sub-Category
        </button>
      </div>

      {/* Create Category Form */}
      {showCategoryForm && (
        <div className="bg-secondary-bg rounded-xl p-6 border border-border-color mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Create New Main Category</h3>
          <form onSubmit={handleCreateCategory}>
            <div className="mb-4">
              <label className="block text-text-color mb-2">Category Name</label>
              <input
                type="text"
                value={categoryForm.name}
                onChange={(e) => setCategoryForm({ name: e.target.value })}
                className="w-full bg-dark-bg border border-border-color rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                placeholder="e.g., Weddings, Corporate, Portraits"
                required
              />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="bg-primary text-dark-bg px-4 py-2 rounded-lg">
                Create Category
              </button>
              <button
                type="button"
                onClick={() => setShowCategoryForm(false)}
                className="border border-border-color text-text-color px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Create Sub-Category Form */}
      {showSubCategoryForm && (
        <div className="bg-secondary-bg rounded-xl p-6 border border-border-color mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Create New Sub-Category</h3>
          <form onSubmit={handleCreateSubCategory}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-text-color mb-2">Parent Category</label>
                <select
                  value={subCategoryForm.category_id}
                  onChange={(e) => setSubCategoryForm({ ...subCategoryForm, category_id: e.target.value })}
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
                <label className="block text-text-color mb-2">Sub-Category Name</label>
                <input
                  type="text"
                  value={subCategoryForm.name}
                  onChange={(e) => setSubCategoryForm({ ...subCategoryForm, name: e.target.value })}
                  className="w-full bg-dark-bg border border-border-color rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                  placeholder="e.g., Wedding Photography, Corporate Headshots"
                  required
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="bg-primary text-dark-bg px-4 py-2 rounded-lg">
                Create Sub-Category
              </button>
              <button
                type="button"
                onClick={() => setShowSubCategoryForm(false)}
                className="border border-border-color text-text-color px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Categories List */}
      <div className="space-y-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-secondary-bg rounded-xl border border-border-color overflow-hidden">
            <div className="flex justify-between items-center p-4 bg-border-color/20">
              <h3 className="text-lg font-bold text-white">{category.name}</h3>
              <button
                onClick={() => handleDeleteCategory(category.id)}
                className="text-red-500 hover:text-red-400 transition"
              >
                <i className="bi bi-trash-fill"></i>
              </button>
            </div>
            <div className="p-4">
              {subCategories.filter((sc) => sc.category_id === category.id).length > 0 ? (
                <ul className="space-y-2">
                  {subCategories
                    .filter((sc) => sc.category_id === category.id)
                    .map((sub) => (
                      <li key={sub.id} className="flex justify-between items-center p-2 hover:bg-border-color/10 rounded-lg">
                        <span className="text-text-color">{sub.name}</span>
                        <button
                          onClick={() => handleDeleteSubCategory(sub.id)}
                          className="text-red-500 hover:text-red-400 text-sm"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </li>
                    ))}
                </ul>
              ) : (
                <p className="text-text-color/60 text-sm">No sub-categories yet.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}