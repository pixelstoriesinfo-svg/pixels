'use client';

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/stories', label: 'Stories' },
  { href: '/weds', label: 'Weds' },
  { href: '/media', label: 'Media' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const serviceLinks = [
  { href: '/stories', label: 'Photography' },
  { href: '/stories', label: 'Videography' },
  { href: '/weds', label: 'Wedding Films' },
  { href: '/media', label: 'Social Media' },
  { href: '/media', label: 'Web Design' },
  { href: '/media', label: 'Brand Marketing' },
];

const socialLinks = [
  {
    href: 'https://www.instagram.com/photography.pixelstories?igsh=MTVqeW9qM2RjdGFncQ%3D%3D&utm_source=qr',
    label: 'Instagram',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.012-3.584.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
        <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8z" />
      </svg>
    ),
  },
  {
    href: 'https://www.facebook.com/share/18pne6zysJ/?mibextid=wwXIfr',
    label: 'Facebook',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.471h3.047V9.362c0-3.007 1.786-4.675 4.533-4.675 1.312 0 2.686.234 2.686.234v2.953H15.83c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.384C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    href: 'https://www.tiktok.com/@photography.pixelstories?_r=1&_t=ZS-95pBaYBaNzM',
    label: 'TikTok',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
      </svg>
    ),
  },
  // {
  //   href: 'https://youtube.com/@pixelstories',
  //   label: 'YouTube',
  //   icon: (
  //     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
  //       <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.572V8.428L15.818 12l-6.273 3.572z" />
  //     </svg>
  //   ),
  // },
  {
    href: 'https://wa.me/94771234567',
    label: 'WhatsApp',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.101-.473-.158-.673.159-.197.315-.764.965-.935 1.165-.175.204-.342.2-.492-.074-.149-.274-.6-.329-.825-.202-.224-.124-.49-.3-.933-.3-.721 0-1.169-.493-1.416-.998-.248-.505-.392-.925-.49-1.077-.097-.151-.024-.235.075-.31.296-.2.664.075.902.225.237.15.495.405.607.505.149.124.249.198.349.321.149.2.1.526-.025.926l-.4 1.204c-.05.125-.201.3-.423.525-.224.224-.449.37-.549.523-.1.151-.02.33-.01.495.011.165.149.299.349.449l.824.824c.396.396.824.744 1.199 1.113.6.599 1.275 1.199 2.174 1.199.825 0 1.546-.337 2.168-.924.622-.587 1.445-1.499 2.043-2.43.149-.224.2-.525.074-.926-.124-.4-.574-.824-1.025-1.099l-.523-.523c-.2-.15-.15-.225-.2-.45-.05-.2-.025-.4.025-.6.05-.199.1-.398.174-.572.075-.199.149-.398.224-.572l.124-.15c.074-.124.149-.2.224-.324.074-.124.149-.274.124-.424-.024-.149-.074-.3-.149-.423-.074-.124-.174-.249-.274-.349-.1-.099-.149-.224-.249-.349l-.524-.524c-.124-.099-.174-.174-.249-.274-.074-.124-.124-.274-.074-.424.05-.15.124-.3.149-.449.025-.15.049-.324.074-.473l.124-.15zM12 22.5c-1.769 0-3.49-.451-5.032-1.316l-3.24-1.93-3.24 1.93C-1.507 20.877.012 13.545.012 13.545s-.198-.199-.198-.524c0-.174.05-.349.124-.498.075-.15.224-.349.349-.524l1.875-3.24c.451-1.316 1.032-2.994 1.454-4.297.025-.149.074-.349.074-.524 0-.174-.049-.349-.124-.498-.075-.174-.224-.349-.349-.524l-1.577-2.794c-.224-.398-.649-.774-1.129-1.129-.224-.174-.524-.299-.773-.424-.249-.124-.524-.199-.773-.274-.249-.074-.449-.124-.623-.174-.174-.05-.349-.074-.499-.074H6.5c-1.769 0-3.49.451-5.032 1.316L-.77 2.607l1.875 3.24C2.95 7.463 2.95 7.937 2.95 8.41c0 .349-.074.698-.174 1.047-.075.174-.224.423-.349.647l-1.578 2.769c-.224.398-.349.848-.349 1.297 0 .476.124.926.349 1.326l2.248 2.694c.198.224.449.473.773.698.324.224.698.373 1.047.473.924.224 1.924.349 2.848.349s1.924-.124 2.848-.349c.349-.1.723-.249 1.047-.473.324-.224.575-.473.773-.698l2.248-2.694c.224-.4.349-.85.349-1.326 0-.449-.124-.899-.349-1.297l-1.578-2.769c-.124-.224-.274-.473-.349-.647-.099-.349-.174-.698-.174-1.047 0-.473.124-.947.349-1.42l1.875-3.264c1.542-.865 2.263-1.316 5.032-1.316h1.23c2.769 0 3.49.451 5.032 1.316l1.875 3.264c.224.473.349.947.349 1.42 0 .349-.074.698-.174 1.047-.075.174-.224.423-.349.647l-1.578 2.769c-.224.398-.349.848-.349 1.297 0 .476.124.926.349 1.326l2.248 2.694c.198.224.449.473.773.698.324.224.698.373 1.047.473.924.224 1.924.349 2.848.349s1.924-.124 2.848-.349c.349-.1.723-.249 1.047-.473.324-.224.575-.473.773-.698l2.248-2.694c.224-.4.349-.85.349-1.326 0-.449-.124-.899-.349-1.297l-1.578-2.769c-.124-.224-.274-.473-.349-.647-.099-.349-.174-.698-.174-1.047 0-.473.124-.947.349-1.42l1.875-3.264c1.542-.865 2.263-1.316 5.032-1.316v1.23z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-dark-bg relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary rounded-full blur-[80px]" />
      </div>

       <div className="container mx-auto px-4 py-12 md:py-16 relative">
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
           <div className="sm:col-span-2 lg:col-span-1 text-center sm:text-left">
             <Link href="/" className="inline-block mb-4 sm:mb-6">
               <Image
                 src="/assets/images/logo2.png"
                 alt="Pixel Nation"
                 width={140}
                 height={52}
                 className="h-10 sm:h-12 w-auto mx-auto sm:mx-0"
               />
             </Link>
             <p className="text-text-color/70 text-sm mb-4 sm:mb-6 leading-relaxed max-w-xs mx-auto sm:mx-0">
               Pixel Nation (Pvt) Ltd — Creative media solutions across photography, weddings, and brand media. We transform your moments into timeless stories.
             </p>
             <div className="flex items-center gap-3 text-sm text-text-color/60 justify-center sm:justify-start">
               <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
               <span>Serving since 2022</span>
             </div>
           </div>

           <div className="text-center sm:text-left">
             <h4 className="text-white font-semibold mb-4 sm:mb-5 flex items-center gap-2 justify-center sm:justify-start">
               <span className="w-1 h-5 bg-primary rounded-full" />
               Quick Links
             </h4>
             <ul className="space-y-2 sm:space-y-3">
               {quickLinks.map((link) => (
                 <li key={link.href}>
                   <Link 
                     href={link.href} 
                     className="text-text-color/60 hover:text-primary transition-all duration-300 text-sm flex items-center gap-2 group justify-center sm:justify-start"
                   >
                     <span className="w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-3" />
                     {link.label}
                   </Link>
                 </li>
               ))}
             </ul>
           </div>

           <div className="text-center sm:text-left">
             <h4 className="text-white font-semibold mb-4 sm:mb-5 flex items-center gap-2 justify-center sm:justify-start">
               <span className="w-1 h-5 bg-primary rounded-full" />
               Services
             </h4>
             <ul className="space-y-2 sm:space-y-3">
               {serviceLinks.map((link, index) => (
                 <li key={index}>
                   <Link 
                     href={link.href} 
                     className="text-text-color/60 hover:text-primary transition-all duration-300 text-sm flex items-center gap-2 group justify-center sm:justify-start"
                   >
                     <span className="w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-3" />
                     {link.label}
                   </Link>
                 </li>
               ))}
             </ul>
           </div>

           <div className="sm:col-span-2 lg:col-span-1 text-center sm:text-left">
             <h4 className="text-white font-semibold mb-4 sm:mb-5 flex items-center gap-2 justify-center sm:justify-start">
               <span className="w-1 h-5 bg-primary rounded-full" />
               Stay Connected
             </h4>
             <p className="text-text-color/60 text-sm mb-4 max-w-xs mx-auto sm:mx-0">
               Subscribe to our newsletter for latest updates and offers.
             </p>
             <form onSubmit={handleSubscribe} className="mb-6 max-w-sm mx-auto sm:mx-0">
               <div className="flex gap-2">
                 <input
                   type="email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   placeholder="Your email"
                   className="flex-1 px-4 py-3 bg-secondary-bg border border-border-color rounded-lg text-sm text-white placeholder:text-text-color/40 focus:outline-none focus:border-primary transition-colors min-h-[44px]"
                 />
                 <button
                   type="submit"
                   className="px-4 py-3 bg-primary text-dark-bg rounded-lg font-semibold hover:bg-white transition-all duration-300 min-h-[44px] min-w-[44px]"
                 >
                   {subscribed ? '✓' : '→'}
                 </button>
               </div>
             </form>

             <h4 className="text-white font-semibold mb-4">Follow Us</h4>
             <div className="flex gap-3 justify-center sm:justify-start">
               {socialLinks.map((social) => (
                 <a
                   key={social.label}
                   href={social.href}
                   target="_blank"
                   rel="noopener noreferrer"
                   aria-label={social.label}
                   className="w-10 h-10 sm:w-11 sm:h-11 bg-secondary-bg border border-border-color rounded-lg flex items-center justify-center text-text-color hover:text-primary hover:border-primary transition-all duration-300 hover:-translate-y-1"
                 >
                   {social.icon}
                 </a>
               ))}
             </div>
           </div>
         </div>

        <div className="mt-16 pt-8 border-t border-border-color">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-text-color/50">
              <p>© {new Date().getFullYear()} Pixel Nation (Pvt) Ltd. All rights reserved.</p>
              <span className="hidden md:inline">•</span>
              <p>Registration: PV 00343293</p>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/contact" className="text-text-color/50 hover:text-primary transition">
                Contact Us
              </Link>
              <Link href="/about" className="text-text-color/50 hover:text-primary transition">
                About
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}