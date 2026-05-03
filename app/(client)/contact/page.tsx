'use client';

import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function ContactPage() {
  const [isCalendarLoaded, setIsCalendarLoaded] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });

    // Create overlay scrollbar for main page
    const scrollbar = document.createElement('div');
    scrollbar.style.cssText = 'position:fixed;right:0;top:0;width:6px;height:100vh;z-index:9999;pointer-events:none;opacity:0;transition:opacity 0.3s ease;';
    
    const thumb = document.createElement('div');
    thumb.style.cssText = 'position:absolute;right:0;width:100%;background:rgba(167,84,248,0.8);border-radius:3px;min-height:30px;';
    scrollbar.appendChild(thumb);
    document.body.appendChild(scrollbar);

    let timer: NodeJS.Timeout;

    const updateThumb = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const ratio = scrollTop / scrollHeight;
      const thumbHeight = Math.max(30, (window.innerHeight / document.documentElement.scrollHeight) * window.innerHeight);
      const maxTop = window.innerHeight - thumbHeight;
      thumb.style.height = thumbHeight + 'px';
      thumb.style.top = (ratio * maxTop) + 'px';
    };

    const onScroll = () => {
      scrollbar.style.opacity = '1';
      updateThumb();
      clearTimeout(timer);
      timer = setTimeout(() => { scrollbar.style.opacity = '0'; }, 1500);
    };

    updateThumb();
    window.addEventListener('scroll', onScroll, { passive: true } as any);
    window.addEventListener('resize', updateThumb, { passive: true } as any);

    // Create overlay scrollbar for Calendly container
    const container = document.getElementById('calendly-container');
    if (container) {
      const calScrollbar = document.createElement('div');
      calScrollbar.style.cssText = 'position:absolute;right:0;top:0;width:6px;height:100%;z-index:10;pointer-events:none;opacity:0;transition:opacity 0.3s ease;';
      
      const calThumb = document.createElement('div');
      calThumb.style.cssText = 'position:absolute;right:0;width:100%;background:rgba(167,84,248,0.8);border-radius:3px;min-height:30px;';
      calScrollbar.appendChild(calThumb);
      container.appendChild(calScrollbar);
      container.style.position = 'relative';

      let calTimer: NodeJS.Timeout;

      const updateCalThumb = () => {
        const containerHeight = container.clientHeight;
        const containerScrollHeight = container.scrollHeight;
        if (containerScrollHeight <= containerHeight) return;
        const scrollTop = container.scrollTop;
        const ratio = scrollTop / (containerScrollHeight - containerHeight);
        const thumbHeight = Math.max(30, (containerHeight / containerScrollHeight) * containerHeight);
        const maxTop = containerHeight - thumbHeight;
        calThumb.style.height = thumbHeight + 'px';
        calThumb.style.top = (ratio * maxTop) + 'px';
      };

      // Show scrollbar on mouse enter, hide on mouse leave
      container.addEventListener('mouseenter', () => {
        calScrollbar.style.opacity = '1';
        updateCalThumb();
        clearTimeout(calTimer);
      });

      container.addEventListener('mouseleave', () => {
        calTimer = setTimeout(() => { calScrollbar.style.opacity = '0'; }, 1500);
      });

      container.addEventListener('scroll', () => {
        calScrollbar.style.opacity = '1';
        updateCalThumb();
        clearTimeout(calTimer);
        calTimer = setTimeout(() => { calScrollbar.style.opacity = '0'; }, 1500);
      });

      // Update on resize
      window.addEventListener('resize', updateCalThumb, { passive: true } as any);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateThumb);
      clearTimeout(timer);
      scrollbar.remove();
    };
  }, []);

  const contactMethods = [
    {
      icon: "bi bi-chat-square-heart-fill",
      title: "Pixel Weds Enquiries",
      description: "Wedding photography & videography",
      contact: "+94 76 481 5334",
      link: "https://wa.me/94764815334",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: "bi bi-briefcase-fill",
      title: "Pixel Media / Business",
      description: "Brand & social media services",
      contact: "+94 71 200 1102",
      link: "https://wa.me/94712001102",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: "bi bi-envelope-fill",
      title: "General / Marketing",
      description: "General inquiries",
      contact: "geethikasenod@gmail.com",
      contactAlt: "+94 76 481 334",
      link: "mailto:geethikasenod@gmail.com",
      color: "from-purple-500 to-indigo-500"
    }
  ];

  const socialLinks = [
    { name: "Pixel Stories", platform: "Facebook", icon: "bi bi-facebook", url: "https://www.facebook.com/share/18pne6zysJ/?mibextid=wwXIfr" },
    { name: "Pixel Stories", platform: "Instagram", icon: "bi bi-instagram", url: "https://www.instagram.com/photography.pixelstories?igsh=MTVqeW9qM2RjdGFncQ%3D%3D&utm_source=qr" },
    { name: "Pixel Stories", platform: "TikTok", icon: "bi bi-tiktok", url: "https://www.tiktok.com/@photography.pixelstories?_r=1&_t=ZS-95pBaYBaNzM" },
    { name: "Pixel Weds", platform: "Facebook", icon: "bi bi-facebook", url: "https://facebook.com/share/17cgjijHVJ/?mibextid=wwXIfr&ref=1" },
    { name: "Pixel Media", platform: "Facebook", icon: "bi bi-facebook", url: "https://www.facebook.com/share/1G3ftMZUg7/?mibextid=wwXIfr" },
    { name: "Pixel Media", platform: "Instagram", icon: "bi bi-instagram", url: "https://www.instagram.com/pixelmedia.lk?igsh=azJxdDdzOHc5cnN1" }
  ];

  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        {/* Hero Section */}
        <header className="relative pt-36 pb-24 md:pt-40 md:pb-32 bg-cover bg-center" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url(/assets/images/contact.jpg)' }}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent" />
          <div className="relative container mx-auto px-4 text-center">
            <div className="inline-block mb-4 px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full" data-aos="fade-up">
              <span className="text-white/90 text-sm font-medium">Get in Touch</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6" data-aos="fade-up" data-aos-delay="100">
              Let&apos;s Create
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Something Amazing</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
              Ready to bring your vision to life? Let&apos;s collaborate and create unforgettable moments together.
            </p>
          </div>
        </header>

        {/* Main Contact Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-dark-bg to-secondary-bg">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-purple/10 rounded-full mb-4" data-aos="fade-up">
                <span className="w-2 h-2 bg-brand-purple rounded-full animate-pulse" />
                <span className="text-brand-purple text-sm font-medium">Book a Consultation</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" data-aos="fade-up" data-aos-delay="100">
                Let&apos;s Start a Conversation
              </h2>
              <p className="text-text-color/70 text-lg max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
                Choose your preferred way to connect. We&apos;re here to answer your questions and discuss your project.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-start">
              {/* Calendar Section */}
              <div data-aos="fade-right" data-aos-delay="100">
                <div className="bg-gradient-to-br from-secondary-bg to-dark-bg rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                  <div className="p-4 sm:p-6 md:p-8 border-b border-white/10 bg-gradient-to-r from-brand-purple/5 to-transparent">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-brand-purple/20 flex items-center justify-center">
                        <i className="bi bi-calendar-check text-brand-purple text-xl"></i>
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white">Schedule a Meeting</h3>
                        <p className="text-text-color/60 text-sm">30-minute consultation call</p>
                      </div>
                    </div>
                    <p className="text-text-color/70 text-sm mt-2">
                      Pick a time that works best for you. We&apos;ll discuss your project, goals, and how we can help.
                    </p>
                  </div>
                  <div className="p-3 sm:p-4 md:p-6 relative calendly-scrollbar-container" style={{ minHeight: '500px' }} id="calendly-container">
                    {!isCalendarLoaded && (
                      <div className="flex justify-center items-center absolute inset-4 z-10 bg-dark-bg/90 rounded-lg">
                        <div className="text-center">
                          <div className="w-12 h-12 border-4 border-brand-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                          <p className="text-text-color/60">Loading calendar...</p>
                        </div>
                      </div>
                    )}
                      <div className="calendly-wrapper" style={{ height: '850px', overflow: 'hidden' }} id="calendly-wrapper">
                      <iframe
                        src="https://calendly.com/teampixel/30min?hide_gdpr_banner=1&background_color=1a1a2e&text_color=ffffff&primary_color=8b5cf6&hide_landing_page_details=1"
                        width="100%"
                        height="850"
                        className="w-full"
                        frameBorder="0"
                        title="Schedule a meeting with Pixel Nation"
                        onLoad={(e) => {
                          setIsCalendarLoaded(true);
                        }}
                        style={{ minHeight: '850px' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div data-aos="fade-left" data-aos-delay="200">
                <div className="bg-gradient-to-br from-secondary-bg to-dark-bg rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-brand-purple/20 flex items-center justify-center">
                        <i className="bi bi-headset text-brand-purple text-xl"></i>
                      </div>
                      <h3 className="text-2xl font-bold text-white">Direct Contact</h3>
                    </div>
                    
                    <div className="space-y-6">
                      {contactMethods.map((method, idx) => (
                        <div key={idx} className="group relative">
                          <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" style={{ background: `linear-gradient(135deg, ${method.color.split(' ')[1]}10, transparent)` }} />
                          <div className="relative flex items-start gap-4 p-4 rounded-xl transition-all duration-300 group-hover:translate-x-2">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                              <i className={`${method.icon} text-white text-xl`}></i>
                            </div>
                            <div className="flex-1">
                              <h5 className="font-semibold text-white text-lg mb-1">{method.title}</h5>
                              <p className="text-text-color/60 text-sm mb-2">{method.description}</p>
                              <a 
                                href={method.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-brand-purple hover:text-purple-400 transition-colors font-medium inline-flex items-center gap-2 group/link"
                              >
                                {method.contact}
                                <i className="bi bi-arrow-right text-sm group-hover/link:translate-x-1 transition-transform"></i>
                              </a>
                              {method.contactAlt && (
                                <p className="text-text-color/50 text-sm mt-1">{method.contactAlt}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Social Links Section */}
                    <div className="border-t border-white/10 mt-8 pt-8">
                      <div className="flex items-center gap-2 mb-6">
                        <i className="bi bi-share-fill text-brand-purple text-xl"></i>
                        <h5 className="font-semibold text-white">Connect With Us</h5>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {socialLinks.map((social, idx) => (
                          <a 
                            key={idx}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-purple/50"
                          >
                            <div className="w-8 h-8 rounded-lg bg-brand-purple/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                              <i className={`${social.icon} text-brand-purple text-sm`}></i>
                            </div>
                            <div className="flex-1">
                              <p className="text-xs text-text-color/50">{social.platform}</p>
                              <p className="text-sm font-medium text-white group-hover:text-brand-purple transition-colors">{social.name}</p>
                            </div>
                            <i className="bi bi-box-arrow-up-right text-text-color/30 text-xs group-hover:text-brand-purple transition-colors"></i>
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Response Time Badge */}
                    <div className="mt-6 p-4 bg-brand-purple/5 rounded-xl border border-brand-purple/20 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <i className="bi bi-clock-history text-brand-purple"></i>
                        <span className="text-sm text-white">Response time:</span>
                        <span className="text-sm font-semibold text-brand-purple">Within 24 hours</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-dark-bg border-t border-white/5">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full mb-6">
                <i className="bi bi-question-circle text-brand-purple text-sm"></i>
                <span className="text-text-color/70 text-sm">Frequently Asked</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">What to Expect?</h3>
              <p className="text-text-color/60">
                During our consultation, we&apos;ll discuss your vision, timeline, and budget. 
                We&apos;ll answer all your questions and provide professional guidance to bring your ideas to life.
                No obligation, just genuine conversation about making your project exceptional.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
