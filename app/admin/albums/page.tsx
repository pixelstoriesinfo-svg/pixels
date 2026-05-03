'use client';

import { useState, useEffect } from 'react';
import AdminNavbar from '@/components/layout/AdminNavbar';
import AlbumManager from '@/components/admin/AlbumManager';
import CategoryManager from '@/components/admin/CategoryManager';

export default function AdminAlbumsPage() {
  const [activeTab, setActiveTab] = useState<'albums' | 'categories'>('albums');

  return (
    <div className="min-h-screen bg-dark-bg">
      <AdminNavbar />
      <div className="ml-0 lg:ml-64 p-6 transition-all">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-white">Manage Albums</h1>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-border-color pb-2">
            <button
              onClick={() => setActiveTab('albums')}
              className={`px-4 py-2 rounded-lg transition ${
                activeTab === 'albums'
                  ? 'bg-primary text-dark-bg'
                  : 'text-text-color hover:bg-primary/20'
              }`}
            >
              <i className="bi bi-images mr-2"></i>
              Albums
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`px-4 py-2 rounded-lg transition ${
                activeTab === 'categories'
                  ? 'bg-primary text-dark-bg'
                  : 'text-text-color hover:bg-primary/20'
              }`}
            >
              <i className="bi bi-folder2 mr-2"></i>
              Categories
            </button>
          </div>

          {activeTab === 'albums' ? <AlbumManager /> : <CategoryManager />}
        </div>
      </div>
    </div>
  );
}