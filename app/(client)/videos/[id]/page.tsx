'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';
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

export default function VideoAlbumPage() {
  const params = useParams();
  const [mounted, setMounted] = useState(false);
  const [album, setAlbum] = useState<Album | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    AOS.init({ duration: 800, once: true });

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

  const video = album.media.find((m) => m.file_type === 'video');

  return (
    <>
      <Navbar />
      <main>
        {/* Page Header */}
        <header className="relative pt-36 pb-20 bg-cover bg-center" style={{ backgroundImage: 'url(/assets/images/video.jpg)' }}>
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
                <Link href="/videos" className="text-primary hover:underline">Videos</Link>
              </li>
              <li className="breadcrumb-item mx-2 text-text-color">/</li>
              <li className="breadcrumb-item text-text-color/80">{album.name}</li>
            </ol>
          </div>
        </div>

        <div className="section">
          <div className="container mx-auto px-4">
            {video ? (
              <div className="max-w-5xl mx-auto" data-aos="fade-up">
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <video 
                    controls 
                    className="absolute top-0 left-0 w-full h-full rounded-xl" 
                    playsInline
                    src={video.url}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
                <h2 className="text-white text-xl font-semibold mt-6 text-center">{album.name}</h2>
                <p className="text-text-color text-sm mt-2 text-center">
                  {album.sub_category_name} • {album.category_name}
                </p>
              </div>
            ) : (
              <div className="text-center py-12" data-aos="fade-up">
                <i className="bi bi-film text-5xl text-muted mb-3 block"></i>
                <p className="text-text-color/80">This video album is currently empty. Please check back soon!</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
