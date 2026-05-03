'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function AboutSection() {
  return (
    <section className="section bg-dark-bg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="lg:w-1/2" data-aos="fade-right">
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071"
              alt="Pixel Nation Team at work"
              width={600}
              height={400}
              className="rounded-xl shadow-2xl object-cover w-full"
            />
          </div>
          <div className="lg:w-1/2 text-white" data-aos="fade-left" data-aos-delay="200">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Pixel Nation?</h2>
            <p className="text-text-color/80 mb-6">
              Pixel Nation is your all-in-one creative partner. From photography and videography to digital marketing and brand visuals, everything you need is delivered under one roof. This integrated approach ensures consistency, efficiency, and seamless execution — saving you time while maintaining high creative standards. With one trusted vendor managing your entire visual journey, we turn ideas into impactful results, effortlessly.
            </p>
            <Link href="/about" className="btn-outline-primary inline-block mt-6">
              Read More About Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}