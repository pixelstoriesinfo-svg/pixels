'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface Album {
  id: number;
  name: string;
  sub_category_name: string;
  category_name: string;
  category_slug: string;
  media: Array<{
    id: number;
    file_name: string;
    url: string;
    file_type: 'image' | 'video';
    order_index: number;
  }>;
}

export default function AlbumViewPage() {
  const params = useParams();
  const [mounted, setMounted] = useState(false);
  const [album, setAlbum] = useState<Album | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    AOS.init({ duration: 800, once: true });
    Fancybox.bind('[data-fancybox="gallery"]', {});

    fetchAlbum();
  }, [params.id]);

  const fetchAlbum = async () => {
    try {
      const res = await fetch(`/api/albums/${params.id}`);
      const data = await res.json();
      if (data.success) {
        setAlbum(data.data);
      }
    } catch (error) {
      console.error('Error fetching album:', error);
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

  if (!album) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-white">Album not found</p>
        </div>
        <Footer />
      </>
    );
  }

  const images = album.media.filter((m) => m.file_type === 'image');

  return (
    <>
      <Navbar />
      <main>
        {/* Page Header */}
        <header className="relative pt-36 pb-20 bg-cover bg-center" style={{ backgroundImage: 'url(/assets/images/imageview.jpg)' }}>
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/80 to-dark-bg/40" />
          <div className="relative container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white" data-aos="fade-up">
              {album.name}
            </h1>
          </div>
        </header>

        {/* Breadcrumb */}
        <div className="bg-secondary-bg py-3">
          <div className="container mx-auto px-4">
            <ol className="flex flex-wrap text-sm">
              <li className="breadcrumb-item">
                <Link href="/" className="text-primary hover:underline">Home</Link>
              </li>
              <li className="breadcrumb-item mx-2 text-text-color">/</li>
              <li className="breadcrumb-item">
                <Link href="/photography" className="text-primary hover:underline">Photography</Link>
              </li>
              <li className="breadcrumb-item mx-2 text-text-color">/</li>
              <li className="breadcrumb-item text-text-color/80">{album.name}</li>
            </ol>
          </div>
        </div>

        <div className="section">
          <div className="container mx-auto px-4">
            {/* Image Gallery */}
            {images.length > 0 && (
              <div data-aos="fade-up">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div key={image.id} data-aos="fade-up" data-aos-delay={index * 50}>
                      <a
                        href={image.url}
                        data-fancybox="gallery"
                        data-caption={album.name}
                        className="group block relative overflow-hidden rounded-lg aspect-square"
                      >
                        <Image
                          src={image.url}
                          alt={`${album.name} - ${index + 1}`}
                          fill
                          className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <i className="bi bi-search text-white text-4xl bg-black/50 rounded-full p-4"></i>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {images.length === 0 && (
              <div className="text-center py-12" data-aos="fade-up">
                <i className="bi bi-image-alt text-5xl text-muted mb-3 block"></i>
                <p className="text-text-color/80">This album is currently empty. Please check back soon!</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}