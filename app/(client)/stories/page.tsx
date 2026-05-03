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
//   'Events Coverage',
//   'Corporate & Professional Shoots',
//   'Lifestyle Content',
//   'Graduation Photography & Videography',
//   'Maternity & Newborn Sessions',
//   'Birthday & Milestone Shoots',
//   'Personal & Portrait Sessions',
//   'Fashion Shoots',
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

// export default function StoriesPage() {
//   const [albums, setAlbums] = useState<Album[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     AOS.init({ duration: 800, once: true });
    
//     fetch('/api/albums?limit=12&brand=stories')
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
//         <header className="relative pt-36 pb-24 bg-cover bg-center" style={{ backgroundImage: 'url(/assets/images/camara.jpg)' }}>
//           <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/80 to-dark-bg/40" />
//           <div className="relative container mx-auto px-4 text-center">
//             <h1 
//               className="text-5xl md:text-6xl font-bold text-white mb-3" 
//               style={{ color: '#C9B8FF' }}
//               data-aos="fade-up"
//             >
//               PIXEL STORIES
//             </h1>
//             <p 
//               className="text-xl md:text-2xl text-white/80" 
//               data-aos="fade-up"
//               data-aos-delay="100"
//             >
//               Story-Driven Photography & Videography
//             </p>
//           </div>
//         </header>

//         <section className="section">
//           <div className="container mx-auto px-4">
//             <div className="max-w-3xl mx-auto text-center mb-12">
//               <h2 className="text-2xl font-bold text-white mb-4" data-aos="fade-up">
//                 Capturing Your Unique Story
//               </h2>
//               <p className="text-text-color/80 text-lg" data-aos="fade-up" data-aos-delay="100">
//                 At Pixel Stories, we don&apos;t just take photos — we craft visual narratives. Every shoot is approached with creativity, attention to detail, and a deep understanding of what makes your moment unique. From lively events and corporate sessions to intimate personal portraits, we bring your story to life through the lens.
//               </p>
//             </div>
//           </div>
//         </section>

//         <section className="section bg-secondary-bg">
//           <div className="container mx-auto px-4">
//             <div className="section-title text-center mb-12">
//               <h2 data-aos="fade-up">At Stories, We Cover...</h2>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//               {services.map((service, index) => (
//                 <div 
//                   key={index}
//                   className="bg-dark-bg p-5 rounded-xl text-center border border-border-color hover:border-stories-purple transition-all hover:-translate-y-2"
//                   data-aos="fade-up"
//                   data-aos-delay={100 * (index + 1)}
//                 >
//                   <i className="bi bi-camera-fill text-stories-purple text-2xl mb-3 block"></i>
//                   <p className="text-white text-sm font-medium">{service}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         <section className="section">
//           <div className="container mx-auto px-4">
//             <div className="section-title text-center mb-8">
//               <h2 data-aos="fade-up">Our Work</h2>
//               <p className="text-text-color/80 mt-4 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
//                 Browse our portfolio to see the stories we&apos;ve had the privilege of telling. From vibrant events to quiet personal moments — every frame is crafted with care.
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
//                         <p className="text-stories-purple text-xs uppercase tracking-wider mb-1">{album.sub_category_name}</p>
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
//                 <i className="bi bi-images text-5xl text-text-color/30 mb-4 block"></i>
//                 <p className="text-text-color/60">No albums available yet. Check back soon!</p>
//               </div>
//             )}
            
//             <div className="flex flex-wrap justify-center gap-4 mt-8">
//               <Link 
//                 href="/photography" 
//                 className="border border-stories-purple text-stories-purple px-6 py-3 rounded-full hover:bg-stories-purple hover:text-dark-bg transition inline-block"
//               >
//                 <i className="bi bi-images mr-2"></i>
//                 View All Albums
//               </Link>
//               <Link 
//                 href="https://facebook.com/pixelstories" 
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="border border-stories-purple text-stories-purple px-6 py-3 rounded-full hover:bg-stories-purple hover:text-dark-bg transition inline-block"
//               >
//                 <i className="bi bi-facebook mr-2"></i>
//                 View on Facebook
//               </Link>
//               <Link 
//                 href="https://instagram.com/pixelstories" 
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="border border-stories-purple text-stories-purple px-6 py-3 rounded-full hover:bg-stories-purple hover:text-dark-bg transition inline-block"
//               >
//                 <i className="bi bi-instagram mr-2"></i>
//                 View on Instagram
//               </Link>
//             </div>
//           </div>
//         </section>

//         <section className="py-20 md:py-28 bg-secondary-bg relative overflow-hidden">
//           <div className="absolute inset-0 opacity-5">
//             <div className="absolute top-0 right-0 w-64 h-64 bg-stories-purple rounded-full blur-[80px]" />
//             <div className="absolute bottom-0 left-0 w-64 h-64 bg-stories-purple rounded-full blur-[80px]" />
//           </div>
//           <div className="container mx-auto px-4 relative text-center">
//             <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
//               Ready to Book Your Session?
//             </h2>
//             <p className="text-text-color/80 text-lg mb-8 max-w-2xl mx-auto">
//               Get in touch and let&apos;s create something beautiful together. All packages are tailored to your needs — reach out for a personalised quote.
//             </p>
//             <Link 
//               href="/contact?service=stories" 
//               className="inline-flex items-center gap-3 px-8 py-4 bg-stories-purple text-dark-bg font-semibold rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg"
//             >
//               <span>Get a Quote</span>
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//               </svg>
//             </Link>
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
  { name: 'Events Coverage', icon: 'bi-calendar-event', gradient: 'bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900', accent: 'purple' },
  { name: 'Corporate & Professional', icon: 'bi-briefcase', gradient: 'bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900', accent: 'blue' },
  { name: 'Lifestyle Content', icon: 'bi-heart', gradient: 'bg-gradient-to-br from-pink-900 via-rose-800 to-red-900', accent: 'pink' },
  { name: 'Graduation', icon: 'bi-mortarboard', gradient: 'bg-gradient-to-br from-yellow-900 via-amber-800 to-orange-900', accent: 'yellow' },
  { name: 'Maternity & Newborn', icon: 'bi-emoji-smile', gradient: 'bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900', accent: 'green' },
  { name: 'Birthday & Milestones', icon: 'bi-gift', gradient: 'bg-gradient-to-br from-orange-900 via-red-800 to-pink-900', accent: 'orange' },
  { name: 'Personal & Portraits', icon: 'bi-person', gradient: 'bg-gradient-to-br from-violet-900 via-purple-800 to-indigo-900', accent: 'violet' },
  { name: 'Fashion Shoots', icon: 'bi-star', gradient: 'bg-gradient-to-br from-fuchsia-900 via-pink-800 to-rose-900', accent: 'fuchsia' },
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

export default function StoriesPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredAlbums, setFilteredAlbums] = useState<Album[]>([]);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    AOS.init({ 
      duration: 800, 
      once: true,
      easing: 'ease-out-quart',
    });
    
    fetch('/api/albums?limit=12&brand=stories')
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
        {/* Hero Section with Parallax Effect */}
        <header className="relative pt-36 pb-28 bg-cover bg-center bg-fixed" style={{ backgroundImage: 'url(/assets/images/camara.jpg)' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-dark-bg/95 via-dark-bg/80 to-dark-bg/30" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-stories-purple/20 via-transparent to-transparent" />
          <div className="relative container mx-auto px-4 text-center">
            <div className="inline-block mb-4" data-aos="fade-down" data-aos-delay="200">
              <span className="px-4 py-1.5 bg-stories-purple/20 backdrop-blur-sm rounded-full text-stories-purple text-sm font-medium border border-stories-purple/30">
                Since 2022
              </span>
            </div>
            <h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 bg-gradient-to-r from-stories-purple via-white to-stories-purple bg-clip-text text-transparent" 
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              PIXEL STORIES
            </h1>
            <p 
              className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto" 
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Story-Driven Photography & Videography
            </p>
          </div>
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-2 bg-white/50 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </header>

        {/* About Section with Stats */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-dark-bg to-secondary-bg">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4" data-aos="fade-up">
                Capturing Your Unique Story
              </h2>
              <p className="text-text-color/80 text-lg leading-relaxed" data-aos="fade-up" data-aos-delay="100">
                At Pixel Stories, we don&apos;t just take photos — we craft visual narratives. Every shoot is approached with creativity, 
                attention to detail, and a deep understanding of what makes your moment unique.
              </p>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mt-8">
              {[
                { value: '500+', label: 'Happy Clients', icon: 'bi-emoji-smile' },
                { value: '1200+', label: 'Projects Completed', icon: 'bi-check-circle' },
                { value: '4+', label: 'Years Experience', icon: 'bi-award' },
                { value: '15+', label: 'Cities Covered', icon: 'bi-geo-alt' },
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="text-center p-4 rounded-xl bg-dark-bg/50 backdrop-blur-sm border border-border-color"
                  data-aos="zoom-in"
                  data-aos-delay={150 * index}
                >
                  <i className={`bi ${stat.icon} text-stories-purple text-2xl mb-2 block`}></i>
                  <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-text-color/60 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid with Premium Image Cards */}
        <section className="py-16 md:py-24 bg-secondary-bg relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-stories-purple/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-stories-purple/10 rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-4 relative">
            <div className="section-title text-center mb-12">
              <h2 data-aos="fade-up" className="text-3xl md:text-4xl font-bold text-white">What We Cover</h2>
              <p className="text-text-color/70 mt-3" data-aos="fade-up" data-aos-delay="100">Every moment deserves to be captured beautifully</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className={`group relative h-64 rounded-2xl overflow-hidden cursor-pointer ${service.gradient}`}
                  data-aos="fade-up"
                  data-aos-delay={80 * (index + 1)}
                >
                  {/* Pattern Overlay */}
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3),transparent_70%)]" />
                  
                  {/* Content */}
                  <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300 shadow-lg">
                      <i className={`bi ${service.icon} text-white text-2xl`}></i>
                    </div>
                    <p className="text-white font-semibold text-lg group-hover:translate-y-[-4px] transition-transform duration-300">{service.name}</p>
                    <div className="mt-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      <span className="text-white/90 text-sm border border-white/30 rounded-full px-4 py-1.5 backdrop-blur-sm hover:bg-white/20 transition-colors cursor-pointer">
                        Learn More
                      </span>
                    </div>
                  </div>
                  
                  {/* Decorative Border */}
                  <div className={`absolute inset-0 border-2 border-white/0 group-hover:border-white/20 rounded-2xl transition-colors duration-500`} />
                  
                  {/* Bottom Accent Line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-white/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section with Filter Tabs */}
        <section className="py-16 md:py-20 bg-dark-bg">
          <div className="container mx-auto px-4">
            <div className="section-title text-center mb-8">
              <h2 data-aos="fade-up" className="text-3xl md:text-4xl font-bold text-white">Our Work</h2>
              <p className="text-text-color/70 mt-3 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
                Browse our portfolio to see the stories we&apos;ve had the privilege of telling
              </p>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex justify-center gap-3 mb-10" data-aos="fade-up" data-aos-delay="150">
              {[
                { id: 'all', label: 'All Work', icon: 'bi-grid-3x3' },
                { id: 'photos', label: 'Photography', icon: 'bi-camera' },
                { id: 'videos', label: 'Videography', icon: 'bi-play-circle' },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 ${
                    activeFilter === filter.id
                      ? 'bg-stories-purple text-dark-bg shadow-lg shadow-stories-purple/30'
                      : 'bg-secondary-bg text-text-color hover:bg-stories-purple/20 hover:text-stories-purple'
                  }`}
                >
                  <i className={`bi ${filter.icon} text-sm`}></i>
                  <span className="text-sm font-medium">{filter.label}</span>
                </button>
              ))}
            </div>
            
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="aspect-square bg-secondary-bg rounded-2xl animate-pulse relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
                  </div>
                ))}
              </div>
            ) : filteredAlbums.length > 0 ? (
              <div className="relative">
                <Swiper
                  modules={[Navigation, Pagination, Autoplay, EffectFade]}
                  spaceBetween={24}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true, dynamicBullets: true }}
                  autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                  breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 },
                  }}
                  className="pb-14 stories-swiper"
                >
                  {filteredAlbums.map((album, idx) => (
                    <SwiperSlide key={album.id}>
                      <div 
                        className="group relative bg-secondary-bg rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-stories-purple/20 transition-all duration-500"
                        data-aos="fade-up"
                        data-aos-delay={idx * 50}
                      >
                        <Link href={album.hasVideo ? `/videos/${album.id}` : `/photography/${album.id}`} className="block">
                          <div className="relative aspect-[4/3] overflow-hidden">
                            <Image
                              src={album.cover_image || '/assets/images/album.jpg'}
                              alt={album.name}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            {/* Media Badges */}
                            <div className="absolute top-3 left-3 flex gap-2">
                              {(album.video_count ?? 0) > 0 && (
                                <span className="bg-red-600/90 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5">
                                  <i className="bi bi-play-fill text-xs"></i>
                                  {album.video_count}
                                </span>
                              )}
                              {(album.media_count ?? 0) > 0 && (
                                <span className="bg-stories-purple/90 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5">
                                  <i className="bi bi-images text-xs"></i>
                                  {album.media_count}
                                </span>
                              )}
                            </div>
                            
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-stories-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                                  <i className="bi bi-arrows-fullscreen text-white text-xl"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="p-4">
                            <p className="text-stories-purple text-xs uppercase tracking-wider font-semibold mb-1">{album.sub_category_name}</p>
                            <h5 className="text-white font-semibold truncate group-hover:text-stories-purple transition-colors duration-300">{album.name}</h5>
                            <div className="flex items-center gap-3 mt-2">
                              <span className="text-text-color/50 text-xs flex items-center gap-1">
                                <i className="bi bi-clock"></i> Featured
                              </span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            ) : (
              <div className="text-center py-16 bg-secondary-bg/30 rounded-2xl">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-stories-purple/10 flex items-center justify-center">
                  <i className="bi bi-images text-3xl text-stories-purple/40"></i>
                </div>
                <p className="text-text-color/60">No {activeFilter !== 'all' ? activeFilter : ''} albums available yet. Check back soon!</p>
              </div>
            )}
            
            {/* Action Buttons with Animation */}
            <div className="flex flex-wrap justify-center gap-4 mt-10" data-aos="fade-up" data-aos-delay="200">
              <Link 
                href="/photography" 
                className="group relative overflow-hidden border border-stories-purple text-stories-purple px-8 py-3.5 rounded-full hover:bg-stories-purple hover:text-dark-bg transition-all duration-300 inline-flex items-center gap-2"
              >
                <span className="relative z-10">View All Albums</span>
                <i className="bi bi-images relative z-10 group-hover:translate-x-1 transition-transform"></i>
              </Link>
              <Link 
                href="https://www.facebook.com/share/18pne6zysJ/?mibextid=wwXIfr" 
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#1877F2]/10 border border-[#1877F2]/30 text-[#1877F2] px-8 py-3.5 rounded-full hover:bg-[#1877F2] hover:text-white transition-all duration-300 inline-flex items-center gap-2"
              >
                <i className="bi bi-facebook"></i>
                <span>Facebook</span>
              </Link>
              <Link 
                href="https://www.instagram.com/photography.pixelstories?igsh=MTVqeW9qM2RjdGFncQ%3D%3D&utm_source=qr" 
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-r from-[#E4405F]/10 to-[#F56040]/10 border border-[#E4405F]/30 text-[#E4405F] px-8 py-3.5 rounded-full hover:from-[#E4405F] hover:to-[#F56040] hover:text-white transition-all duration-300 inline-flex items-center gap-2"
              >
                <i className="bi bi-instagram"></i>
                <span>Instagram</span>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section with Animated Background */}
        <section className="py-20 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-secondary-bg">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-20 left-10 w-72 h-72 bg-stories-purple/10 rounded-full blur-[100px] animate-pulse" />
              <div className="absolute bottom-20 right-10 w-96 h-96 bg-stories-purple/5 rounded-full blur-[120px] animate-pulse animation-delay-1000" />
            </div>
          </div>
          
          <div className="container mx-auto px-4 relative text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4" data-aos="zoom-in">
                Ready to Tell Your Story?
              </h2>
              <p className="text-text-color/80 text-lg mb-8" data-aos="fade-up" data-aos-delay="100">
                Get in touch and let&apos;s create something beautiful together. All packages are tailored to your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="200">
                <Link 
                  href="/contact?service=stories" 
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-stories-purple text-dark-bg font-semibold rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg shadow-stories-purple/30 group"
                >
                  <span>Book us now</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
               
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      
      <style jsx global>{`
        .stories-swiper .swiper-button-next,
        .stories-swiper .swiper-button-prev {
          background: rgba(201, 184, 255, 0.2);
          backdrop-filter: blur(8px);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          color: #C9B8FF;
          transition: all 0.3s ease;
        }
        .stories-swiper .swiper-button-next:hover,
        .stories-swiper .swiper-button-prev:hover {
          background: #C9B8FF;
          color: #1a1a2e;
        }
        .stories-swiper .swiper-button-next:after,
        .stories-swiper .swiper-button-prev:after {
          font-size: 18px;
          font-weight: bold;
        }
        .stories-swiper .swiper-pagination-bullet {
          background: rgba(201, 184, 255, 0.4);
          opacity: 1;
        }
        .stories-swiper .swiper-pagination-bullet-active {
          background: #C9B8FF;
          transform: scale(1.2);
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </>
  );
}