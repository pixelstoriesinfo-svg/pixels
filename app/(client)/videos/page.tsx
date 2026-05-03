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

interface VideoAlbum {
  id: number;
  name: string;
  sub_category_name: string;
  cover_image: string;
}

export default function VideosPage() {
  const [mounted, setMounted] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [videosByCategory, setVideosByCategory] = useState<Record<number, VideoAlbum[]>>({});
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    AOS.init({ duration: 800, once: true });

    fetchCategoriesAndVideos();
  }, []);

  const fetchCategoriesAndVideos = async () => {
    try {
      // Fetch categories that have video albums
      const categoriesRes = await fetch('/api/categories?hasVideos=true');
      const categoriesData = await categoriesRes.json();
      if (categoriesData.success) {
        setCategories(categoriesData.data);
        if (categoriesData.data.length > 0) {
          setActiveCategory(categoriesData.data[0].id);
        }
      }

      // Fetch video albums by category
      const videosByCat: Record<number, VideoAlbum[]> = {};
      for (const cat of categoriesData.data || []) {
        const albumsRes = await fetch(`/api/albums?categoryId=${cat.id}&type=video`);
        const albumsData = await albumsRes.json();
        if (albumsData.success) {
          videosByCat[cat.id] = albumsData.data;
        }
      }
      setVideosByCategory(videosByCat);
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
        <header className="relative pt-36 pb-20 bg-cover bg-center" style={{ backgroundImage: 'url(/assets/images/video.jpg)' }}>
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/80 to-dark-bg/40" />
          <div className="relative container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white" data-aos="fade-up">
              Video Productions
            </h1>
          </div>
        </header>

        {/* Videos Section with Tabs */}
        <section className="section">
          <div className="container mx-auto px-4">
            <div className="section-title text-center mb-12 md:mb-16">
              <h2 data-aos="fade-up">Our Cinematic Work</h2>
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

                {/* Video Albums Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-aos="fade-up" data-aos-delay="300">
                  {activeCategory && videosByCategory[activeCategory]?.length > 0 ? (
                    videosByCategory[activeCategory].map((album) => (
                        <Link
                          key={album.id}
                          href={`/videos/${album.id}`}
                          className="album-card group bg-secondary-bg rounded-xl overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2"
                        >
                        <div className="relative h-64 overflow-hidden">
                          <Image
                            src={album.cover_image || '/assets/images/video.jpg'}
                            alt={album.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                            <i className="bi bi-play-circle-fill text-white text-6xl"></i>
                          </div>
                        </div>
                        <div className="p-6">
                          <p className="text-primary text-sm uppercase tracking-wider mb-2">{album.sub_category_name}</p>
                          <h5 className="text-white text-lg font-semibold">{album.name}</h5>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12 bg-secondary-bg rounded-xl border border-border-color">
                      <i className="bi bi-film text-5xl text-muted mb-3 block"></i>
                      <p className="text-text-color/80">No video albums in this category yet.</p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <p className="text-center text-text-color/80">No video categories available yet.</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}