'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Album {
  id: number;
  name: string;
  sub_category_name: string;
  category_name: string;
  cover_image: string;
}

export default function PhotographyPage() {
  const [mounted, setMounted] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [albumsByCategory, setAlbumsByCategory] = useState<Record<number, Album[]>>({});
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    AOS.init({ duration: 800, once: true });

    fetchCategoriesAndAlbums();
  }, []);

  const fetchCategoriesAndAlbums = async () => {
    try {
      // Fetch categories
      const categoriesRes = await fetch('/api/categories');
      const categoriesData = await categoriesRes.json();
      if (categoriesData.success) {
        setCategories(categoriesData.data);
        if (categoriesData.data.length > 0) {
          setActiveCategory(categoriesData.data[0].id);
        }
      }

      // Fetch albums by category
      const albumsByCat: Record<number, Album[]> = {};
      for (const cat of categoriesData.data || []) {
        const albumsRes = await fetch(`/api/albums?categoryId=${cat.id}&type=image`);
        const albumsData = await albumsRes.json();
        if (albumsData.success) {
          albumsByCat[cat.id] = albumsData.data;
        }
      }
      setAlbumsByCategory(albumsByCat);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted || loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-white">Loading...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Page Header */}
        <header className="relative pt-36 pb-20 bg-cover bg-center" style={{ backgroundImage: 'url(/assets/images/album.jpg)' }}>
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/80 to-dark-bg/40" />
          <div className="relative container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white" data-aos="fade-up">
              Our Photography
            </h1>
          </div>
        </header>

        {/* Albums Section with Tabs */}
        <section className="section">
          <div className="container mx-auto px-4">
            <div className="section-title text-center mb-12 md:mb-16">
              <h2 data-aos="fade-up">Explore Our Work</h2>
            </div>

            {categories.length > 0 ? (
              <>
                {/* Category Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-8" data-aos="fade-up" data-aos-delay="200">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`px-5 py-2 rounded-full border transition-all ${
                        activeCategory === category.id
                          ? 'bg-primary text-dark-bg border-primary'
                          : 'bg-secondary-bg text-text-color border-border-color hover:border-primary'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>

                {/* Albums Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-aos="fade-up" data-aos-delay="300">
                  {activeCategory && albumsByCategory[activeCategory]?.length > 0 ? (
                    albumsByCategory[activeCategory].map((album) => (
                      <Link
                        key={album.id}
                        href={`/photography/${album.id}`}
                        className="album-card group bg-secondary-bg rounded-xl overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2"
                      >
                        <div className="relative h-64 overflow-hidden">
                          <Image
                            src={album.cover_image}
                            alt={album.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <div className="p-6">
                          <p className="text-primary text-sm uppercase tracking-wider mb-2">{album.sub_category_name}</p>
                          <h5 className="text-white text-lg font-semibold">{album.name}</h5>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12 bg-secondary-bg rounded-xl border border-border-color">
                      <i className="bi bi-image-alt text-5xl text-muted mb-3 block"></i>
                      <p className="text-text-color/80">No photo albums in this category yet. Check back soon!</p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <p className="text-center text-text-color/80">No photography categories have been set up yet.</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}