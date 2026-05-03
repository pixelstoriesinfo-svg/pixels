'use client';

import Link from 'next/link';
import { useState } from 'react';

const brands = [
  {
    name: 'Pixel Stories',
    tagline: 'Story-Driven Photography & Videography',
    description: 'Events · Corporate Shoots · Lifestyle Content\nGraduations · Fashion Shoots · Personal Portraits',
    href: '/stories',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.822 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
  {
    name: 'Pixel Weds',
    tagline: 'Luxury Wedding Visuals with a Cinematic Approach',
    description: 'Weddings · Homecomings · Engagements · Pre-Shoots',
    href: '/weds',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75l-1.5-1.5M9.75 14.25l1.5-1.5M14.25 14.25l1.5-1.5" />
      </svg>
    ),
  },
  {
    name: 'Pixel Media',
    tagline: 'Strategic Visual Media for Brands',
    description: 'Social Media Management · Content Creation\nWeb Design · Property Marketing · Podcast Production',
    href: '/media',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
      </svg>
    ),
  },
];

export default function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="section bg-dark-bg relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="section-title text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            <span className="relative">
              Three Brands. One Creative Vision.
              
            </span>
          </h2>
          <p className="text-text-color/80 mt-6 max-w-2xl mx-auto text-lg">
            Pixel Nation (Pvt) Ltd operates through three specialised entities — each built to serve a distinct creative need with the same commitment to quality, creativity, and technical excellence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {brands.map((brand, index) => (
            <div
              key={brand.name}
              className="group relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={`absolute -inset-0.5 bg-gradient-to-r from-primary to-primary rounded-2xl opacity-30 blur transition-all duration-500 ${
                  hoveredIndex === index ? 'opacity-60 scale-[1.02]' : 'opacity-0 scale-100'
                }`}
              />
              <div
                className={`relative bg-secondary-bg p-8 rounded-2xl text-center border border-border-color transition-all duration-500 h-full ${
                  hoveredIndex === index ? 'border-primary/50 -translate-y-2 shadow-2xl shadow-primary/10' : 'hover:border-primary/30'
                }`}
              >
                <div 
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 transition-all duration-500 group-hover:scale-110 bg-primary/10 text-primary"
                >
                  {brand.icon}
                </div>
                
                <h3 className="text-2xl font-bold mb-2 text-white">
                  {brand.name}
                </h3>
                <p className="text-text-color/80 mb-4 font-medium">{brand.tagline}</p>
                <p className="text-text-color/60 text-sm whitespace-pre-line mb-6">{brand.description}</p>
                
                <Link
                  href={brand.href}
                  className="inline-flex items-center gap-2 text-primary hover:text-white transition-all duration-300 font-semibold group/link"
                >
                  <span>Explore {brand.name.split(' ')[1]}</span>
                  <svg 
                    className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-dark-bg font-semibold rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/40"
          >
            <span>Start Your Project</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}