'use client';

import Link from 'next/link';

export default function BottomCTA() {
  return (
    <section 
      className="section py-20"
      style={{
        backgroundImage: 'linear-gradient(rgba(13, 9, 22, 0.85), rgba(13, 9, 22, 0.85)), url(https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto px-4 text-center">
        <h2 
          className="text-3xl md:text-4xl font-bold text-white mb-4" 
          data-aos="fade-up"
        >
          Ready to Bring Your Vision to Life?
        </h2>
        <p 
          className="text-text-color/80 text-lg mb-6 max-w-2xl mx-auto" 
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Whether it's your wedding day, a brand campaign, or your personal story we're here to capture it beautifully.
        </p>
        <Link 
          href="/contact" 
          className="btn-primary inline-block" 
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Contact Us Today →
        </Link>
      </div>
    </section>
  );
}