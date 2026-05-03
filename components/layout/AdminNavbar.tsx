'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: 'bi-speedometer2' },
  { href: '/admin/albums', label: 'Manage Albums', icon: 'bi-images' },
  { href: '/admin/admins', label: 'Manage Admins', icon: 'bi-person-plus-fill' },
];

export default function AdminNavbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/admin';
  };

  return (
    <>
      <header className="bg-secondary-bg border-b border-border-color fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSidebar}
              className="text-white text-2xl hover:text-primary transition"
            >
              <i className="bi bi-list"></i>
            </button>
            <Link href="/admin/dashboard" className="text-white text-xl font-bold">
              Team <span className="text-primary">PIXEL</span> Admin
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="text-white hover:text-primary transition flex items-center gap-2"
            >
              <i className="bi bi-box-arrow-right"></i>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <aside
        className={`fixed top-[57px] left-0 h-[calc(100vh-57px)] bg-secondary-bg border-r border-border-color z-40 transition-all duration-300 ${
          isSidebarOpen ? 'w-64' : 'w-0 overflow-hidden'
        } ${isMobile && !isSidebarOpen ? 'hidden' : ''}`}
      >
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    pathname === item.href
                      ? 'bg-primary text-dark-bg'
                      : 'text-text-color hover:bg-primary/20'
                  }`}
                  onClick={() => isMobile && setIsSidebarOpen(false)}
                >
                  <i className={item.icon}></i>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
}
