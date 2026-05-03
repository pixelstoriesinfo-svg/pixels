// 'use client';

// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import Navbar from '@/components/layout/Navbar';
// import Footer from '@/components/layout/Footer';

// const services = [
//   'Wedding Day Full Coverage',
//   'Homecoming Shoots',
//   'Engagement Sessions',
//   'Pre-Wedding Shoots',
//   'Post-Wedding Shoots',
// ];

// interface Album {
//   id: number;
//   name: string;
//   sub_category_name: string;
//   cover_image: string;
//   media_count: number;
//   video_count: number;
//   hasVideo?: boolean;
// }

// export default function WedsPage() {
//   const [albums, setAlbums] = useState<Album[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     AOS.init({ duration: 800, once: true });
    
//     fetch('/api/albums?limit=12&brand=weds')
//       .then(res => res.json())
//       .then(data => {
//         if (data.success) {
//           setAlbums(data.data);
//         }
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <main>
//         <header className="relative pt-36 pb-24 bg-cover bg-center" style={{ backgroundImage: 'url(/assets/images/album.jpg)' }}>
//           <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/80 to-dark-bg/40" />
//           <div className="relative container mx-auto px-4 text-center">
//             <h1 
//               className="text-5xl md:text-6xl font-bold text-white mb-3" 
//               style={{ color: '#A78BFA' }}
//               data-aos="fade-up"
//             >
//               PIXEL WEDS
//             </h1>
//             <p 
//               className="text-xl md:text-2xl text-white/80" 
//               data-aos="fade-up"
//               data-aos-delay="100"
//             >
//               Luxury Wedding Visuals with a Cinematic Approach
//             </p>
//           </div>
//         </header>

//         <section className="section">
//           <div className="container mx-auto px-4">
//             <div className="max-w-3xl mx-auto text-center mb-12">
//               <h2 className="text-2xl font-bold text-white mb-4" data-aos="fade-up">
//                 Your Love Story, Beautifully Told
//               </h2>
//               <p className="text-text-color/80 text-lg" data-aos="fade-up" data-aos-delay="100">
//                 Your wedding day is one of the most precious moments of your life — and it deserves to be remembered in every detail. At Pixel Weds, we combine cinematic artistry with luxury visual storytelling to deliver timeless wedding films and photographs that you will treasure forever. We work discreetly yet passionately to capture the emotion, elegance, and authenticity of your special day.
//               </p>
//             </div>
//           </div>
//         </section>

//         <section className="section bg-secondary-bg">
//           <div className="container mx-auto px-4">
//             <div className="section-title text-center mb-12">
//               <h2 data-aos="fade-up">At Weds, We Cover...</h2>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
//               {services.map((service, index) => (
//                 <div 
//                   key={index}
//                   className="bg-dark-bg p-5 rounded-xl text-center border border-border-color hover:border-weds-purple transition-all hover:-translate-y-2"
//                   data-aos="fade-up"
//                   data-aos-delay={100 * (index + 1)}
//                 >
//                   <i className="bi bi-heart-fill text-weds-purple text-2xl mb-3 block"></i>
//                   <p className="text-white text-sm font-medium">{service}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         <section className="section">
//           <div className="container mx-auto px-4">
//             <div className="section-title text-center mb-8">
//               <h2 data-aos="fade-up">Wedding Stories</h2>
//               <p className="text-text-color/80 mt-4 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
//                 Every wedding we photograph is a unique love story. Explore our portfolio to see how we&apos;ve captured these unforgettable moments for our couples.
//               </p>
//             </div>
            
//             {loading ? (
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 {[...Array(12)].map((_, i) => (
//                   <div key={i} className="aspect-square bg-secondary-bg rounded-xl animate-pulse"></div>
//                 ))}
//               </div>
//             ) : albums.length > 0 ? (
//               <Swiper
//                 modules={[Navigation, Pagination, Autoplay]}
//                 spaceBetween={20}
//                 slidesPerView={1}
//                 navigation
//                 pagination={{ clickable: true }}
//                 breakpoints={{
//                   640: { slidesPerView: 2 },
//                   768: { slidesPerView: 3 },
//                   1024: { slidesPerView: 4 },
//                 }}
//                 className="pb-12"
//               >
//                 {albums.map((album) => (
//                   <SwiperSlide key={album.id}>
//                     <Link 
//                       href={album.hasVideo ? `/videos/${album.id}` : `/photography/${album.id}`}
//                       className="block bg-secondary-bg rounded-xl overflow-hidden hover:shadow-2xl transition-all group"
//                     >
//                       <div className="relative aspect-square overflow-hidden">
//                         <Image
//                           src={album.cover_image || '/assets/images/album.jpg'}
//                           alt={album.name}
//                           fill
//                           className="object-cover transition-transform duration-500 group-hover:scale-110"
//                         />
//                         {(album.video_count ?? 0) > 0 && (
//                           <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
//                             <i className="bi bi-play-fill text-xs"></i>
//                             {album.video_count}
//                           </div>
//                         )}
//                         <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                           <i className="bi bi-arrows-fullscreen text-white text-2xl"></i>
//                         </div>
//                       </div>
//                       <div className="p-4">
//                         <p className="text-weds-purple text-xs uppercase tracking-wider mb-1">{album.sub_category_name}</p>
//                         <h5 className="text-white text-sm font-semibold truncate">{album.name}</h5>
//                         <p className="text-text-color/60 text-xs mt-1">
//                           {album.media_count || 0} photos • {album.video_count || 0} videos
//                         </p>
//                       </div>
//                     </Link>
//                   </SwiperSlide>
//                 ))}
//               </Swiper>
//             ) : (
//               <div className="text-center py-12">
//                 <i className="bi bi-heart text-5xl text-text-color/30 mb-4 block"></i>
//                 <p className="text-text-color/60">No wedding albums available yet. Check back soon!</p>
//               </div>
//             )}
            
//             <div className="flex flex-wrap justify-center gap-4 mt-8">
//               <Link 
//                 href="/photography" 
//                 className="border border-weds-purple text-weds-purple px-6 py-3 rounded-full hover:bg-weds-purple hover:text-white transition inline-block"
//               >
//                 <i className="bi bi-images mr-2"></i>
//                 View Photo Albums
//               </Link>
//               <Link 
//                 href="/videos" 
//                 className="border border-weds-purple text-weds-purple px-6 py-3 rounded-full hover:bg-weds-purple hover:text-white transition inline-block"
//               >
//                 <i className="bi bi-play-circle mr-2"></i>
//                 View Videos
//               </Link>
//               <Link 
//                 href="https://facebook.com/pixelweds" 
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="border border-weds-purple text-weds-purple px-6 py-3 rounded-full hover:bg-weds-purple hover:text-white transition inline-block"
//               >
//                 <i className="bi bi-facebook mr-2"></i>
//                 View on Facebook
//               </Link>
//               <Link 
//                 href="https://instagram.com/pixelweds" 
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="border border-weds-purple text-weds-purple px-6 py-3 rounded-full hover:bg-weds-purple hover:text-white transition inline-block"
//               >
//                 <i className="bi bi-instagram mr-2"></i>
//                 View on Instagram
//               </Link>
//             </div>
//           </div>
//         </section>

//         <section className="section bg-secondary-bg">
//           <div className="container mx-auto px-4 text-center">
//             <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" data-aos="fade-up">
//               Your Dream Wedding Visuals Start Here.
//             </h2>
//             <p className="text-text-color/80 text-lg mb-6 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
//               Dates fill up fast — reach out early to check availability and discuss your wedding package.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="200">
//               <Link 
//                 href="https://wa.me/94764815334"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="btn-primary inline-block"
//               >
//                 <i className="bi bi-whatsapp mr-2"></i>
//                 Enquire on WhatsApp
//               </Link>
//             </div>
//             <p className="text-text-color/60 mt-4" data-aos="fade-up" data-aos-delay="300">
//               WhatsApp: +94 76 481 5334
//             </p>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </>
//   );
// }



'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const services = [
  { name: 'Wedding Day Full Coverage', image: '/assets/images/image1.jpeg' },
  { name: 'Homecoming Shoots', image: '/assets/images/image2.jpg' },
  { name: 'Engagement Sessions', image: '/assets/images/engagement.jpeg' },
  { name: 'Pre-Wedding Shoots', image: '/assets/images/Pre-wedding.jpg' },
  { name: 'Post-Wedding Shoots', image: '/assets/images/post.jpeg' },
];

interface Album {
  id: number;
  name: string;
  sub_category_name: string;
  cover_image: string;
  media_count: number;
  video_count: number;
  hasVideo?: boolean;
}

export default function WedsPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredAlbums, setFilteredAlbums] = useState<Album[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    AOS.init({ 
      duration: 1000, 
      once: true,
      easing: 'ease-out-cubic',
    });
    
    fetch('/api/albums?limit=12&brand=weds')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setAlbums(data.data);
          setFilteredAlbums(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        heroRef.current.style.transform = `translateY(${scrolled * 0.4}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter logic
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredAlbums(albums);
    } else if (activeFilter === 'videos') {
      setFilteredAlbums(albums.filter(album => (album.video_count ?? 0) > 0));
    } else if (activeFilter === 'photos') {
      setFilteredAlbums(albums.filter(album => (album.video_count ?? 0) === 0));
    }
  }, [activeFilter, albums]);

  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden">
        
        {/* Hero Section - Cinematic Parallax */}
        <div className="relative h-screen min-h-[700px] overflow-hidden">
          <div 
            ref={heroRef}
            className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-out"
            style={{ 
              backgroundImage: 'url(/assets/images/album.jpg)',
              transform: 'scale(1.05)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/95" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-weds-purple/10 via-transparent to-transparent" />
          </div>
          
          {/* Animated Border Frame */}
          <div className="absolute inset-4 md:inset-8 pointer-events-none">
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-weds-purple/40 animate-pulse" />
            <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-weds-purple/40 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-weds-purple/40 animate-pulse" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-weds-purple/40 animate-pulse" />
          </div>
          
          <div className="relative h-full flex items-center justify-center text-center z-10">
            <div className="container mx-auto px-4">
              <div className="inline-block mb-6" data-aos="fade-down" data-aos-delay="100">
                <span className="px-6 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-medium border border-white/20 tracking-wider">
                  <i className="bi bi-star-fill text-xs mr-2"></i>
                  LUXURY WEDDING CINEMATOGRAPHY
                </span>
              </div>
              
              <h1 
                className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight text-white"
                data-aos="fade-up"
                data-aos-duration="1200"
              >
                PIXEL WEDS
              </h1>
              
              <p 
                className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                Luxury Wedding Visuals with a Cinematic Approach
              </p>
              
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="300">
                <Link 
                  href="#portfolio"
                  className="group relative overflow-hidden px-8 py-4 bg-weds-purple text-white font-semibold rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-weds-purple/40 hover:scale-105"
                >
                  <span className="relative z-10">Explore Weddings</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-weds-purple to-white opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                </Link>
                <Link 
                  href="https://wa.me/94764815334"
                  target="_blank"
                  className="px-8 py-4 border-2 border-weds-purple text-weds-purple font-semibold rounded-full hover:bg-weds-purple hover:text-white transition-all duration-300 backdrop-blur-sm"
                >
                  <i className="bi bi-whatsapp mr-2"></i>
                  Inquire Now
                </Link>
              </div>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-2 bg-white/50 rounded-full mt-2 animate-pulse-slow" />
            </div>
          </div>
        </div>

        {/* About Section with Cinematic Quote - Content Unchanged */}
        <section className="py-24 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-secondary-bg to-dark-bg" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4" data-aos="fade-up">
                Your Love Story, Beautifully Told
              </h2>
              <p className="text-text-color/80 text-lg" data-aos="fade-up" data-aos-delay="100">
                Your wedding day is one of the most precious moments of your life — and it deserves to be remembered in every detail. At Pixel Weds, we combine cinematic artistry with luxury visual storytelling to deliver timeless wedding films and photographs that you will treasure forever. We work discreetly yet passionately to capture the emotion, elegance, and authenticity of your special day.
              </p>
            </div>
          </div>
        </section>

        {/* Services Section - Content Unchanged */}
        <section className="py-20 bg-secondary-bg relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-weds-purple/5 rounded-full blur-[120px] -translate-x-1/2" />
          </div>
          
          <div className="container mx-auto px-4 relative">
            <div className="section-title text-center mb-12">
              <h2 data-aos="fade-up" className="text-3xl md:text-4xl font-bold text-white">At Weds, We Cover...</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
              {services.map((service, index) => (
                <Link 
                  key={index}
                  href="/contact?service=weds"
                  className="group relative bg-dark-bg rounded-xl overflow-hidden border border-border-color hover:border-weds-purple transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                  data-aos="fade-up"
                  data-aos-delay={100 * (index + 1)}
                >
                  <div className="relative aspect-square">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-700 group-hover:scale-110 brightness-50 group-hover:brightness-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-14 h-14 rounded-full bg-weds-purple/30 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                        <i className="bi bi-heart-fill text-weds-purple text-2xl"></i>
                      </div>
                    </div>
                    <p className="absolute bottom-0 left-0 right-0 p-4 text-center text-white text-sm font-semibold drop-shadow-lg group-hover:text-weds-purple transition-colors">
                      {service.name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section with Filter - All Albums, Photos, Videos only */}
        <section id="portfolio" className="py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-bg to-dark-bg" />
          <div className="absolute top-0 left-1/2 w-[800px] h-[600px] bg-weds-purple/5 rounded-full blur-[120px] -translate-x-1/2" />
          
          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="w-12 h-px bg-weds-purple" />
                <span className="text-weds-purple text-sm tracking-widest uppercase">Portfolio</span>
                <span className="w-12 h-px bg-weds-purple" />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                Wedding Stories
              </h2>
              <p className="text-text-color/70 mt-4 max-w-2xl mx-auto text-lg">
                Every wedding we photograph is a unique love story. Explore our portfolio to see how we&apos;ve captured these unforgettable moments for our couples.
              </p>
            </div>
            
            {/* Filter Tabs */}
            {/* <div className="flex justify-center gap-3 mb-12">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-8 py-3 rounded-full transition-all duration-300 flex items-center gap-2 ${
                  activeFilter === 'all'
                    ? 'bg-weds-purple text-dark-bg shadow-lg shadow-weds-purple/40'
                    : 'bg-secondary-bg/50 text-text-color hover:bg-weds-purple/20 hover:text-weds-purple border border-border-color'
                }`}
              >
                <span>All Albums</span>
              </button>
            </div> */}
            
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="aspect-square bg-secondary-bg rounded-xl animate-pulse relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
                  </div>
                ))}
              </div>
            ) : filteredAlbums.length > 0 ? (
              <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true, dynamicBullets: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                speed={800}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                  1280: { slidesPerView: 4 },
                }}
                className="pb-14 weds-swiper"
              >
                {filteredAlbums.map((album, idx) => (
                  <SwiperSlide key={album.id}>
                    <Link 
                      href={album.hasVideo ? `/videos/${album.id}` : `/photography/${album.id}`}
                      className="block group"
                    >
                      <div className="relative bg-secondary-bg rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-weds-purple/30 transition-all duration-500 border border-border-color hover:border-weds-purple/50">
                        <div className="relative aspect-[4/5] overflow-hidden">
                          <Image
                            src={album.cover_image || '/assets/images/album.jpg'}
                            alt={album.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-dark-bg/20 to-transparent" />
                          {(album.video_count ?? 0) > 0 && (
                            <div className="absolute top-4 right-4 bg-red-600 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 z-10">
                              <i className="bi bi-play-fill text-xs"></i>
                              <span>{album.video_count} Videos</span>
                            </div>
                          )}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="w-16 h-16 rounded-full bg-weds-purple/90 backdrop-blur-sm flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-300">
                              <i className="bi bi-arrows-fullscreen text-white text-2xl"></i>
                            </div>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-5">
                            <p className="text-weds-purple text-xs uppercase tracking-widest mb-1">{album.sub_category_name}</p>
                            <h5 className="text-white text-base font-semibold truncate group-hover:text-weds-purple transition-colors">{album.name}</h5>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="text-center py-12">
                <i className="bi bi-heart text-5xl text-text-color/30 mb-4 block"></i>
                <p className="text-text-color/60">
                  {activeFilter === 'videos' ? 'No video albums available yet. Check back soon!' : 
                   activeFilter === 'photos' ? 'No photo albums available yet. Check back soon!' : 
                   'No wedding albums available yet. Check back soon!'}
                </p>
              </div>
            )}
            <div className="mt-12"></div>
              {/* Social Links */}





             <div className="flex flex-wrap justify-center gap-4 mt-12">
  <Link
    href="/photography"
    className="inline-flex items-center gap-2 px-7 py-3 bg-weds-purple/10 border border-weds-purple/30 text-weds-purple font-medium rounded-full hover:bg-weds-purple hover:text-white hover:border-weds-purple transition-all duration-300"
  >
    <i className="bi bi-images text-lg"></i>
    View Photo Albums
  </Link>
  <Link 
    href="/videos" 
    className="inline-flex items-center gap-2 px-7 py-3 bg-weds-purple/10 border border-weds-purple/30 text-weds-purple font-medium rounded-full hover:bg-weds-purple hover:text-white hover:border-weds-purple transition-all duration-300"
  >
    <i className="bi bi-play-circle text-lg"></i>
    View Videos
  </Link>
</div>

<div className="flex flex-wrap justify-center gap-4 mt-5">
  <Link 
    href="https://www.facebook.com/share/17cgjijHVJ/?mibextid=wwXIfr" 
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 px-7 py-3 bg-[#1877F2]/10 border border-[#1877F2]/30 text-[#1877F2] font-medium rounded-full hover:bg-[#1877F2] hover:text-white transition-all duration-300"
  >
    <i className="bi bi-facebook text-lg"></i>
    Facebook
  </Link>
  <Link 
    href="https://www.instagram.com/pixel_weds?igsh=MThldTNmeTM0cm9udw==" 
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-[#833AB4]/10 via-[#FD1D1D]/10 to-[#F77737]/10 border border-[#E4405F]/30 text-[#E4405F] font-medium rounded-full hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737] hover:text-white transition-all duration-300"
  >
    <i className="bi bi-instagram text-lg"></i>
    Instagram
  </Link>
</div>




          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-24 bg-secondary-bg relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-weds-purple/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-weds-purple/10 rounded-full blur-[80px]" />
          </div>
          
          <div className="container mx-auto px-4 relative text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Book Your Dream Wedding?
            </h2>
            <p className="text-text-color/80 text-lg mb-8 max-w-2xl mx-auto">
              Dates fill up fast — reach out early to check availability and discuss your wedding package.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="https://wa.me/94764815334"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-weds-purple text-white font-semibold rounded-full hover:bg-white hover:text-weds-purple hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-weds-purple/30"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.101-.473-.158-.673.158-.197.315-.764.965-.935 1.165-.175.204-.342.2-.492-.074-.149-.274-.6-.329-.825-.202-.224-.124-.49-.3-.933-.3-.721 0-1.169-.493-1.416-.998-.248-.505-.392-.925-.49-1.077-.097-.151-.024-.235.075-.31.296-.2.664.075.902.225.237.15.495.405.607.505.149.124.249.198.349.321.149.2.1.526-.025.926l-.4 1.204c-.05.125-.201.3-.423.525-.224.224-.449.37-.549.523-.1.151-.02.33-.01.495.011.165.149.299.349.449l.824.824c.396.396.824.744 1.199 1.113.6.599 1.275 1.199 2.174 1.199.825 0 1.546-.337 2.168-.924.622-.587 1.445-1.499 2.043-2.43.149-.224.2-.525.074-.926-.124-.4-.574-.824-1.025-1.099l-.523-.523c-.2-.15-.15-.225-.2-.45-.05-.2-.025-.4.025-.6.05-.199.1-.398.174-.572.075-.199.149-.398.224-.572l.124-.15c.074-.124.149-.2.224-.324.074-.124.149-.274.124-.424-.024-.149-.074-.3-.149-.423-.074-.124-.174-.249-.274-.349-.1-.099-.149-.224-.249-.349l-.524-.524c-.124-.099-.174-.174-.249-.274-.074-.124-.124-.274-.074-.424.05-.15.124-.3.149-.449.025-.15.049-.324.074-.473l.124-.15z"/>
                </svg>
                Enquire on WhatsApp
              </Link>
              <Link 
                href="/contact?service=weds"
                className="inline-flex items-center gap-3 px-8 py-4 border-2 border-weds-purple text-weds-purple font-semibold rounded-full hover:bg-weds-purple hover:text-white hover:scale-105 transition-all duration-300"
              >
                <span>Book us now</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <p className="text-text-color/60 mt-6">
              WhatsApp: +94 76 481 5334
            </p>
          </div>
        </section>
      </main>
      <Footer />
      
      <style jsx global>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .bg-300% {
          background-size: 300% 300%;
        }
        .animate-gradient {
          animation: gradient 4s ease infinite;
        }
        .animate-bounce-slow {
          animation: bounce 2.5s infinite;
        }
        .animate-pulse-slow {
          animation: pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
        
        /* Custom Swiper Styles */
        .weds-swiper .swiper-button-next,
        .weds-swiper .swiper-button-prev {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(8px);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          color: #a38ee2ff;
          transition: all 0.3s ease;
        }
        .weds-swiper .swiper-button-next:hover,
        .weds-swiper .swiper-button-prev:hover {
          background: #ffffffff;
          color: #ffffffff;
          transform: scale(1.1);
        }
        .weds-swiper .swiper-button-next:after,
        .weds-swiper .swiper-button-prev:after {
          font-size: 18px;
          font-weight: bold;
        }
        .weds-swiper .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.4);
          opacity: 1;
          width: 8px;
          height: 8px;
        }
        .weds-swiper .swiper-pagination-bullet-active {
          background: #ffffffff;
          transform: scale(1.2);
          width: 10px;
          height: 10px;
        }
      `}</style>
    </>
  );
}