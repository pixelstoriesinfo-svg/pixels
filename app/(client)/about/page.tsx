'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const teamMembers = [
  {
    name: 'Geethika Perera',
    role: 'Business Development & Marketing Manager',
    email: 'geethikasenod@gmail.com',
    phone: '+94 76 481 334',
  },
  {
    name: 'Pathum Samarathunga',
    role: 'Operations & Logistics Manager',
    email: 'pathumdeepana@gmail.com',
    phone: '+94 76 481 334',
  },
  {
    name: 'Dulshan Liyanage',
    role: 'Accounts & Finance Manager',
    email: 'dulshanliyanage68@gmail.com',
    phone: '+94 77 383 4830',
  },
  {
    name: 'Pramod Salinda',
    role: 'Lead Photographer',
    email: 'donpramodsalinda@gmail.com',
    phone: '+94 77 874 4270',
  },
];

export default function AboutPage() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <header className="relative pt-36 pb-20 bg-cover bg-center" style={{ backgroundImage: 'url(/assets/images/camara.jpg)' }}>
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/80 to-dark-bg/40" />
          <div className="relative container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white" data-aos="fade-up">
              About Team PIXEL
            </h1>
          </div>
        </header>

        <section className="section">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              <div className="lg:w-1/2" data-aos="fade-right">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071"
                  alt="Pixel Nation Team"
                  className="rounded-xl shadow-2xl object-cover w-full"
                />
              </div>
              <div className="lg:w-1/2" data-aos="fade-left" data-aos-delay="200">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our Story</h2>
                <p className="text-text-color/80 text-lg mb-4">
                  Pixel Nation (Pvt) Ltd is a creative media company delivering high-quality visual storytelling for individuals, weddings, and brands.
                </p>
                <p className="text-text-color/80 text-lg mb-6">
                  Through three specialised entities — Pixel Stories, Pixel Weds, and Pixel Media — we provide end-to-end photography, videography, and media solutions that combine creativity, strategy, and technical excellence.
                </p>
                <p className="text-text-color/80 text-lg">
                  We believe every moment, milestone, and brand has a story worth telling beautifully. Our team of dedicated creatives works closely with every client to understand their vision and bring it to life with precision and passion.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-secondary-bg">
          <div className="container mx-auto px-4">
            <div className="section-title text-center mb-12">
              <h2 data-aos="fade-up">Meet the Team</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <div 
                  key={index}
                  className="bg-dark-bg rounded-xl p-6 text-center border border-border-color hover:border-brand-purple transition-all hover:-translate-y-2"
                  data-aos="fade-up"
                  data-aos-delay={100 * (index + 1)}
                >
                  <div className="w-24 h-24 rounded-full bg-brand-purple flex items-center justify-center mx-auto mb-4">
                    <span className="text-dark-bg text-2xl font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h5 className="text-white text-lg font-semibold mb-1">{member.name}</h5>
                  <p className="text-brand-purple text-sm mb-3">{member.role}</p>
                  <p className="text-text-color/60 text-xs mb-1">{member.email}</p>
                  <p className="text-text-color/70 text-sm">{member.phone}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Let&apos;s Create Something Beautiful Together
            </h2>
            <p className="text-text-color/80 text-lg mb-6 max-w-2xl mx-auto">
              Ready to tell your story? We&apos;d love to hear from you.
            </p>
            <Link href="/contact" className="btn-primary inline-block">
              Contact Us Today
            </Link>
          </div>
        </section>

        <div className="pb-8 text-center">
          <p className="text-text-color/50 text-sm">
            Pixel Nation (Pvt) Ltd — Registered Company No. PV 00343293
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}