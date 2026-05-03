'use client';

import { useState, useEffect, useRef } from 'react';
import AdminNavbar from '@/components/layout/AdminNavbar';

declare global {
  interface Window {
    turnstile: any;
  }
}

interface Admin {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export default function AdminAdminsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<string | null>(null);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);

  useEffect(() => {
    fetchAdmins();
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (showForm && window.turnstile && containerRef.current && !widgetRef.current) {
      widgetRef.current = window.turnstile.render(containerRef.current, {
        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA',
        callback: (token: string) => {
          setCaptchaToken(token);
        },
        'expired-callback': () => {
          setCaptchaToken(null);
        },
      });
    }
  }, [showForm]);

  const fetchAdmins = async () => {
    try {
      const res = await fetch('/api/admins');
      const data = await res.json();
      if (data.success) {
        setAdmins(data.data);
      }
    } catch (error) {
      console.error('Error fetching admins:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetCaptcha = () => {
    if (window.turnstile && widgetRef.current) {
      window.turnstile.reset(widgetRef.current);
    }
    setCaptchaToken(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match');
      return;
    }

    if (!captchaToken) {
      setError('Please complete the captcha verification');
      return;
    }

    try {
      const res = await fetch('/api/admins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          captchaToken,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('Admin created successfully!');
        setFormData({ name: '', email: '', password: '', confirm_password: '' });
        setShowForm(false);
        resetCaptcha();
        fetchAdmins();
      } else {
        setError(data.error || 'Failed to create admin');
        resetCaptcha();
      }
    } catch {
      setError('An error occurred');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this admin? At least one admin must remain.')) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/admins/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok) {
        fetchAdmins();
      } else {
        alert(data.error || 'Failed to delete admin');
      }
    } catch (error) {
      console.error('Error deleting admin:', error);
    } finally {
      setDeleting(null);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    resetCaptcha();
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      <AdminNavbar />
      <div className="ml-0 lg:ml-64 p-6 transition-all">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-white">Manage Admins</h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-primary text-dark-bg px-4 py-2 rounded-lg font-semibold hover:bg-primary-light transition"
            >
              <i className="bi bi-person-plus-fill mr-2"></i>
              Create New Admin
            </button>
          </div>

          {showForm && (
            <div className="bg-secondary-bg rounded-xl p-6 border border-border-color mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Create New Admin</h3>
              {error && <div className="bg-red-600/20 border border-red-600 text-red-400 p-3 rounded-lg mb-4">{error}</div>}
              {success && <div className="bg-green-600/20 border border-green-600 text-green-400 p-3 rounded-lg mb-4">{success}</div>}
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-text-color mb-2">Admin Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-dark-bg border border-border-color rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-text-color mb-2">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-dark-bg border border-border-color rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-text-color mb-2">Password</label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full bg-dark-bg border border-border-color rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-text-color mb-2">Confirm Password</label>
                    <input
                      type="password"
                      value={formData.confirm_password}
                      onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
                      className="w-full bg-dark-bg border border-border-color rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="mb-6 flex justify-center">
                  <div ref={containerRef}></div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={!captchaToken}
                    className="bg-primary text-dark-bg px-4 py-2 rounded-lg disabled:opacity-50"
                  >
                    Create Admin
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseForm}
                    className="border border-border-color text-text-color px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-secondary-bg rounded-xl border border-border-color overflow-hidden">
            <table className="w-full">
              <thead className="bg-border-color/30">
                <tr>
                  <th className="text-left p-4 text-text-color">Name</th>
                  <th className="text-left p-4 text-text-color">Email</th>
                  <th className="text-left p-4 text-text-color">Created At</th>
                  <th className="text-right p-4 text-text-color">Actions</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr key={admin.id} className="border-t border-border-color hover:bg-border-color/10">
                    <td className="p-4 text-white font-medium">{admin.name}</td>
                    <td className="p-4 text-text-color">{admin.email}</td>
                    <td className="p-4 text-text-color">{new Date(admin.created_at).toLocaleDateString()}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDelete(admin.id)}
                        disabled={deleting === admin.id || admins.length <= 1}
                        className="text-red-500 hover:text-red-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {deleting === admin.id ? (
                          <i className="bi bi-hourglass-split"></i>
                        ) : (
                          <i className="bi bi-trash-fill"></i>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {admins.length === 0 && !loading && (
              <div className="text-center py-8 text-text-color/60">
                No admin users found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
