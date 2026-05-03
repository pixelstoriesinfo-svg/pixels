'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const allServices = [
  {
    icon: 'bi-camera-fill',
    title: 'Photography',
    description: 'Creative and professional photography for weddings, events, portraits, and commercial needs.',
    items: [
      'Wedding Photography',
      'Corporate Events',
      'Portrait Sessions',
      'Commercial Photography',
      'Product Photography',
    ],
  },
  {
    icon: 'bi-film',
    title: 'Videography',
    description: 'Cinematic video production to capture the motion and emotion of your most important moments.',
    items: [
      'Wedding Films',
      'Event Coverage',
      'Corporate Videos',
      'Music Videos',
      'Commercial Spots',
    ],
  },
  {
    icon: 'bi-easel-fill',
    title: 'Album Design',
    description: 'Custom-designed, handcrafted photo albums that beautifully narrate your personal story.',
    items: [
      'Custom Layout Design',
      'Premium Materials',
      'Multiple Size Options',
      'Leather & Fabric Covers',
      'Digital Proofing',
    ],
  },
  {
    icon: 'bi-brush',
    title: 'Photo Editing',
    description: 'Professional retouching and color grading to make your images truly shine.',
    items: [
      'Color Correction',
      'Skin Retouching',
      'Background Removal',
      'Object Removal',
      'Creative Effects',
    ],
  },
  {
    icon: 'bi-megaphone',
    title: 'Digital Marketing',
    description: 'Strategic social media management and content creation to grow your brand.',
    items: [
      'Social Media Management',
      'Content Strategy',
      'Brand Photography',
      'Video Marketing',
      'Analytics & Reporting',
    ],
  },
  {
    icon: 'bi-calendar-event',
    title: 'Event Coverage',
    description: 'Full-service event photography and videography for any occasion.',
    items: [
      'Weddings & Engagements',
      'Corporate Events',
      'Birthday Parties',
      'Conferences',
      'Live Streaming',
    ],
  },
];

export default function ServicesPage() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <header className="relative pt-36 pb-20 bg-cover bg-center" style={{ backgroundImage: 'url(/assets/images/service.jpg)' }}>
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/80 to-dark-bg/40" />
          <div className="relative container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white" data-aos="fade-up">
              Our Services
            </h1>
          </div>
        </header>

        <section className="section">
          <div className="container mx-auto px-4">
            <div className="section-title text-center mb-12">
              <h2 data-aos="fade-up">What We Offer</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allServices.map((service, index) => (
                <div
                  key={service.title}
                  className="bg-secondary-bg rounded-xl p-6 border border-border-color hover:border-brand-purple transition-all hover:-translate-y-2"
                  data-aos="fade-up"
                  data-aos-delay={100 * (index + 1)}
                >
                  <i className={`${service.icon} text-brand-purple text-4xl mb-4 inline-block`}></i>
                  <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-text-color/80 mb-4">{service.description}</p>
                  <ul className="space-y-1">
                    {service.items.map((item) => (
                      <li key={item} className="text-text-color/60 text-sm flex items-center gap-2">
                        <i className="bi bi-check-circle-fill text-brand-purple text-xs"></i>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-secondary-bg">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" data-aos="fade-up">
                Ready to Get Started?
              </h2>
              <p className="text-text-color/80 text-lg mb-6" data-aos="fade-up" data-aos-delay="100">
                All packages are tailored to your specific needs. Get in touch for a personalized quote.
              </p>
              <Link href="/contact" className="btn-primary inline-block" data-aos="fade-up" data-aos-delay="200">
                Request a Quote
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}