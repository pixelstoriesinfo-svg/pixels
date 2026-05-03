// 'use client';

// import { useEffect } from 'react';
// import Link from 'next/link';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import Navbar from '@/components/layout/Navbar';
// import Footer from '@/components/layout/Footer';

// const services = [
//   'Social Media Management',
//   'Content Creation & Strategy',
//   'Web Design & Development',
//   'Property Marketing Visuals',
//   'Ads Management (Meta & Google)',
//   'Print Media & Advertising Visuals',
//   'Podcast Production & Execution',
// ];

// const brandLogos = [
//   'Zone24x7',
//   'KIA Sri Lanka',
//   'Asante',
//   'Intervest',
//   'Cinnamon Hotels',
//   'NSBM Green University',
//   'patpat.lk',
// ];

// export default function MediaPage() {
//   useEffect(() => {
//     AOS.init({ duration: 800, once: true });
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <main>
//         <header className="relative pt-36 pb-24 bg-cover bg-center" style={{ backgroundImage: 'url(/assets/images/video.jpg)' }}>
//           <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/80 to-dark-bg/40" />
//           <div className="relative container mx-auto px-4 text-center">
//             <h1 
//               className="text-5xl md:text-6xl font-bold text-white mb-3" 
//               data-aos="fade-up"
//               style={{ color: '#B8A5E0' }}
//             >
//               PIXEL MEDIA
//             </h1>
//             <p 
//               className="text-xl md:text-2xl text-white/80" 
//               data-aos="fade-up"
//               data-aos-delay="100"
//             >
//               Strategic Visual Media for Brands
//             </p>
//           </div>
//         </header>

//         <section className="section">
//           <div className="container mx-auto px-4">
//             <div className="max-w-3xl mx-auto text-center mb-12">
//               <h2 className="text-2xl font-bold text-white mb-4" data-aos="fade-up">
//                 Your Brand&apos;s Visual Identity
//               </h2>
//               <p className="text-text-color/80 text-lg" data-aos="fade-up" data-aos-delay="100">
//                 In a world driven by content, your brand&apos;s visual identity determines how far it goes. Pixel Media is our dedicated B2B arm, providing end-to-end strategic media solutions that help businesses grow their presence, engage their audiences, and convert attention into results. From managing your social channels to producing compelling brand content — we are your creative department.
//               </p>
//             </div>
//           </div>
//         </section>

//         <section className="section bg-secondary-bg">
//           <div className="container mx-auto px-4">
//             <div className="section-title text-center mb-12">
//               <h2 data-aos="fade-up">At Media, We Provide...</h2>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {services.map((service, index) => (
//                 <div 
//                   key={index}
//                   className="bg-dark-bg p-6 rounded-xl text-center border border-border-color hover:border-media-purple transition-all hover:-translate-y-2"
//                   data-aos="fade-up"
//                   data-aos-delay={100 * (index + 1)}
//                 >
//                   <i className="bi bi-graph-up-arrow text-media-purple text-3xl mb-3 block"></i>
//                   <p className="text-white font-medium">{service}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* <section className="section">
//           <div className="container mx-auto px-4">
//             <div className="section-title text-center mb-12">
//               <h2 data-aos="fade-up">Brands We&apos;ve Worked With</h2>
//             </div>
//             <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6" data-aos="fade-up" data-aos-delay="200">
//               {brandLogos.map((brand, index) => (
//                 <div 
//                   key={index}
//                   className="bg-secondary-bg px-6 py-4 rounded-lg border border-border-color hover:border-media-purple transition-all min-w-[140px] text-center"
//                 >
//                   <span className="text-text-color/70 font-semibold text-sm">{brand}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section> */}

//         <section className="section">
//           <div className="container mx-auto px-4 text-center">
//             <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" data-aos="fade-up">
//               Let&apos;s Grow Your Brand Together.
//             </h2>
//             <p className="text-text-color/80 text-lg mb-6 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
//               Talk to us about a tailored media package for your business. We work with brands of all sizes — from startups to established enterprises.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="200">
//               <Link 
//                 href="https://wa.me/94712001102"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="btn-primary inline-block"
//               >
//                 <i className="bi bi-whatsapp mr-2"></i>
//                 Start a Conversation
//               </Link>
//             </div>
//             <p className="text-text-color/60 mt-4" data-aos="fade-up" data-aos-delay="300">
//               WhatsApp: +94 71 200 1102
//             </p>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </>
//   );
// }


'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const services = [
  {
    title: 'Social Media Management',
    icon: 'bi bi-instagram',
    description: 'Strategic posting, engagement, and community growth across all platforms',
    color: 'from-pink-500 to-rose-500'
  },
  {
    title: 'Content Creation & Strategy',
    icon: 'bi bi-camera-reels-fill',
    description: 'Professional photo, video, and strategic content planning',
    color: 'from-purple-500 to-indigo-500'
  },
  {
    title: 'Web Design & Development',
    icon: 'bi bi-window-sidebar',
    description: 'Modern, responsive websites that convert visitors into customers',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Property Marketing Visuals',
    icon: 'bi bi-building',
    description: 'Stunning property photography, virtual tours, and marketing materials',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    title: 'Ads Management (Meta & Google)',
    icon: 'bi bi-megaphone-fill',
    description: 'Data-driven ad campaigns that maximize ROI',
    color: 'from-orange-500 to-red-500'
  },
  {
    title: 'Print Media & Advertising Visuals',
    icon: 'bi bi-printer-fill',
    description: 'Professional print designs for brochures, billboards, and more',
    color: 'from-amber-500 to-yellow-500'
  },
  {
    title: 'Podcast Production & Execution',
    icon: 'bi bi-mic-fill',
    description: 'End-to-end podcast production from recording to distribution',
    color: 'from-violet-500 to-purple-500'
  }
];

const brandLogos = [
  'Zone24x7',
  'KIA Sri Lanka',
  'Asante',
  'Intervest',
  'Cinnamon Hotels',
  'NSBM Green University',
  'patpat.lk',
];

export default function MediaPage() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
  }, []);

  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        {/* Hero Section */}
        <header className="relative pt-36 pb-28 md:pt-40 md:pb-32 bg-cover bg-center bg-fixed" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url(/assets/images/video.jpg)' }}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent" />
          <div className="relative container mx-auto px-4 text-center">
            <div className="inline-block mb-4 px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full" data-aos="fade-up">
              <span className="text-white/90 text-sm font-medium">B2B Creative Agency</span>
            </div>
            <h1 
              className="text-5xl md:text-7xl font-bold mb-4" 
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                PIXEL MEDIA
              </span>
            </h1>
            <p 
              className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto" 
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Strategic Visual Media for Brands
            </p>
          </div>
        </header>

        {/* Brand Identity Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-dark-bg to-secondary-bg">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-purple/10 rounded-full mb-6" data-aos="fade-up">
                <span className="w-2 h-2 bg-brand-purple rounded-full animate-pulse" />
                <span className="text-brand-purple text-sm font-medium">Your Visual Partner</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" data-aos="fade-up" data-aos-delay="100">
                Your Brand&apos;s Visual Identity
              </h2>
              <p className="text-text-color/80 text-lg leading-relaxed" data-aos="fade-up" data-aos-delay="200">
                In a world driven by content, your brand&apos;s visual identity determines how far it goes. 
                Pixel Media is our dedicated B2B arm, providing end-to-end strategic media solutions that 
                help businesses grow their presence, engage their audiences, and convert attention into results. 
                From managing your social channels to producing compelling brand content — we are your creative department.
              </p>
            </div>
          </div>
        </section>

        {/* Services Section - Redesigned */}
        <section className="py-20 md:py-28 bg-secondary-bg">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-purple/10 rounded-full mb-4" data-aos="fade-up">
                <i className="bi bi-star-fill text-brand-purple text-sm"></i>
                <span className="text-brand-purple text-sm font-medium">What We Offer</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" data-aos="fade-up" data-aos-delay="100">
                At Media, We Provide...
              </h2>
              <p className="text-text-color/70 text-lg max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
                Comprehensive media solutions tailored to elevate your brand&apos;s presence
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className="group relative"
                  data-aos="fade-up"
                  data-aos-delay={100 * (index % 3 + 1)}
                >
                  {/* Animated Border Gradient */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition duration-500 rounded-2xl blur" style={{ background: `linear-gradient(135deg, ${service.color.split(' ')[1]}, ${service.color.split(' ')[3]})` }} />
                  
                  {/* Card Content */}
                  <div className="relative bg-dark-bg rounded-2xl p-8 border border-white/5 hover:border-transparent transition-all duration-500 group-hover:translate-y-[-8px]">
                    {/* Icon Container */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-lg transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                      <i className={`${service.icon} text-white text-2xl`}></i>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-purple transition-colors">
                      {service.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-text-color/60 text-sm leading-relaxed">
                      {service.description}
                    </p>
                    
                    {/* Decorative Line */}
                    <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-12 h-0.5 bg-gradient-to-r ${service.color} transition-all duration-500 rounded-full`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Brands Section - Uncommented and Enhanced */}
        {/* <section className="py-20 md:py-28 bg-gradient-to-b from-secondary-bg to-dark-bg">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full mb-4" data-aos="fade-up">
                <i className="bi bi-trophy-fill text-brand-purple text-sm"></i>
                <span className="text-text-color/70 text-sm font-medium">Trusted Partners</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" data-aos="fade-up" data-aos-delay="100">
                Brands We&apos;ve Worked With
              </h2>
              <p className="text-text-color/70 text-lg max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
                Join the growing list of brands that trust us with their visual identity
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6" data-aos="fade-up" data-aos-delay="300">
              {brandLogos.map((brand, index) => (
                <div 
                  key={index}
                  className="group bg-white/5 backdrop-blur-sm px-6 py-4 rounded-xl border border-white/10 hover:border-brand-purple/50 transition-all duration-300 hover:translate-y-[-4px] text-center"
                >
                  <span className="text-text-color/80 group-hover:text-white font-semibold text-sm md:text-base transition-colors">
                    {brand}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* CTA Section - Enhanced */}
        <section className="py-20 md:py-28 relative overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/10 via-transparent to-brand-purple/10" />
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full mb-6" data-aos="fade-up">
                <i className="bi bi-chat-dots-fill text-brand-purple text-sm"></i>
                <span className="text-text-color/70 text-sm">Start Your Journey</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6" data-aos="fade-up" data-aos-delay="100">
                Let&apos;s Grow Your Brand Together.
              </h2>
              
              <p className="text-text-color/80 text-lg mb-8 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
                Talk to us about a tailored media package for your business. We work with brands of all sizes — from startups to established enterprises.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="300">
                <Link 
                  href="https://wa.me/94712001102"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-purple to-purple-600 hover:from-purple-600 hover:to-brand-purple text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-brand-purple/25"
                >
                  <i className="bi bi-whatsapp text-xl"></i>
                  Start a Conversation
                </Link>
                
                <Link 
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl transition-all duration-300 border border-white/10 hover:border-brand-purple/50"
                >
                  <i className="bi bi-calendar-check text-xl"></i>
                  Schedule a Call
                </Link>
              </div>
              
              <p className="text-text-color/60 mt-6 flex items-center justify-center gap-2" data-aos="fade-up" data-aos-delay="400">
                <i className="bi bi-whatsapp text-brand-purple"></i>
                WhatsApp: +94 71 200 1102
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}