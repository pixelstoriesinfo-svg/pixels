'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Album {
  id: number;
  name: string;
  sub_category_name: string;
  cover_image: string;
}

export default function AlbumsSlider() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/albums?limit=6')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAlbums(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="section">
        <div className="container mx-auto px-4 text-center">
          <p>Loading albums...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container mx-auto px-4">
        <div className="section-title text-center mb-12 md:mb-16">
          <h2 data-aos="fade-up">Latest Photo Albums</h2>
        </div>
        <div data-aos="fade-up" data-aos-delay="200">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1200: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {albums.map((album) => (
              <SwiperSlide key={album.id}>
                <Link href={`/photography/${album.id}`} className="album-card block bg-secondary-bg rounded-xl overflow-hidden hover:shadow-2xl transition-all group">
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
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}