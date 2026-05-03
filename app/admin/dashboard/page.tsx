'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminNavbar from '@/components/layout/AdminNavbar';

interface DashboardStats {
  totalAlbums: number;
  totalAdmins: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const res = await fetch('/api/admin/stats');
      const data = await res.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      <AdminNavbar />
      <div className="ml-0 lg:ml-64 p-6 transition-all">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-white mb-6">Admin Dashboard</h1>
          <p className="text-text-color/80 mb-8">Welcome to the Team PIXEL administration panel. From here, you can manage all aspects of your website.</p>

          {loading ? (
            <p className="text-white">Loading stats...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-secondary-bg rounded-xl p-6 border border-border-color">
                <div className="flex items-center justify-between mb-4">
                  <i className="bi bi-images text-primary text-3xl"></i>
                  <span className="text-3xl font-bold text-white">{stats?.totalAlbums || 0}</span>
                </div>
                <h3 className="text-text-color font-semibold">Total Albums</h3>
                <Link href="/admin/albums" className="text-primary text-sm hover:underline mt-2 inline-block">Manage Albums →</Link>
              </div>

              <div className="bg-secondary-bg rounded-xl p-6 border border-border-color">
                <div className="flex items-center justify-between mb-4">
                  <i className="bi bi-person-badge text-primary text-3xl"></i>
                  <span className="text-3xl font-bold text-white">{stats?.totalAdmins || 0}</span>
                </div>
                <h3 className="text-text-color font-semibold">Admin Users</h3>
                <Link href="/admin/admins" className="text-primary text-sm hover:underline mt-2 inline-block">Manage Admins →</Link>
              </div>

              <div className="bg-secondary-bg rounded-xl p-6 border border-border-color">
                <div className="flex items-center justify-between mb-4">
                  <i className="bi bi-camera text-primary text-3xl"></i>
                </div>
                <h3 className="text-text-color font-semibold">Quick Actions</h3>
                <Link href="/admin/albums?action=create" className="text-primary text-sm hover:underline block mt-2">Create New Album →</Link>
                <Link href="/admin/albums" className="text-primary text-sm hover:underline block mt-1">Upload Media →</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
