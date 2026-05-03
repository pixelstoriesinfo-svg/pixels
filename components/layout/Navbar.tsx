'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/stories', label: 'Stories' },
  { href: '/weds', label: 'Weds' },
  { href: '/media', label: 'Media' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const albumLinks = [
  { href: '/photography', label: 'Photography' },
  { href: '/videos', label: 'Videography' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAlbumsOpen, setIsAlbumsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isAlbumsPage = pathname === '/photography' || pathname === '/videos';

  useEffect(() => {
    // Navbar is now fixed size, no scroll effect needed
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsAlbumsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav
      className="fixed top-0 w-full z-50 bg-secondary-bg py-3 shadow-lg border-b border-border-color"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="navbar-brand h-12 md:h-14 flex items-center">
            <Image
              src="/assets/images/logo2.png"
              alt="Pixel Nation (Pvt) Ltd"
              width={100}
              height={40}
              className="h-8 w-auto object-contain"
              priority
            />
          </Link>

          <ul className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-white uppercase text-sm relative transition-all duration-300 group ${
                    pathname === link.href ? 'text-primary' : ''
                  }`}
                >
                  <span className="relative pb-1 block">
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                        pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </span>
                </Link>
              </li>
            ))}
            <li className="relative" ref={dropdownRef as any}>
              <button
                onClick={() => setIsAlbumsOpen(!isAlbumsOpen)}
                className={`text-white uppercase text-sm relative transition-all duration-300 flex items-center gap-1 group ${
                  isAlbumsPage ? 'text-primary' : ''
                }`}
              >
                <span className="relative pb-1 block">
                  Albums
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                      isAlbumsPage ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </span>
                <svg
                  className={`w-4 h-4 transition-transform ${isAlbumsOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`absolute top-full left-0 mt-2 w-40 bg-secondary-bg border border-border-color rounded-lg shadow-xl overflow-hidden transition-all duration-300 ${
                  isAlbumsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}
              >
                {albumLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-4 py-2 text-sm text-white hover:bg-brand-purple hover:text-dark-bg transition-all ${
                      pathname === link.href ? 'bg-brand-purple text-dark-bg' : ''
                    }`}
                    onClick={() => setIsAlbumsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </li>
          </ul>

          <button
            className="lg:hidden modern-toggler"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
          >
            <span className="toggler-bar block w-7 h-0.5 bg-white my-1.5 transition-all"></span>
            <span className="toggler-bar block w-7 h-0.5 bg-white my-1.5 transition-all"></span>
            <span className="toggler-bar block w-7 h-0.5 bg-white my-1.5 transition-all"></span>
          </button>
        </div>

        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-[400px] mt-4' : 'max-h-0'
          }`}
        >
          <ul className="flex flex-col space-y-3 pb-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block text-white uppercase text-sm py-2 relative ${
                    pathname === link.href ? 'text-primary' : ''
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={() => setIsAlbumsOpen(!isAlbumsOpen)}
                className="block text-white uppercase text-sm py-2 w-full text-left flex items-center justify-between"
              >
                Albums
                <svg
                  className={`w-4 h-4 transition-transform ${isAlbumsOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`pl-4 space-y-2 overflow-hidden transition-all duration-300 ${
                  isAlbumsOpen ? 'max-h-20 mt-1' : 'max-h-0'
                }`}
              >
                {albumLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block text-white uppercase text-sm py-1 ${
                      pathname === link.href ? 'text-primary' : ''
                    }`}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsAlbumsOpen(false);
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        .modern-toggler[aria-expanded='true'] .toggler-bar:nth-child(1) {
          transform: translateY(8px) rotate(45deg);
        }
        .modern-toggler[aria-expanded='true'] .toggler-bar:nth-child(2) {
          opacity: 0;
        }
        .modern-toggler[aria-expanded='true'] .toggler-bar:nth-child(3) {
          transform: translateY(-8px) rotate(-45deg);
        }
      `}</style>
    </nav>
  );
}