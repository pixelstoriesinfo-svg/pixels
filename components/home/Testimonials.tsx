'use client';

import { useEffect, useState } from 'react';

const brands = [
  { name: 'NH Bentota', logo: 'https://assets.minorhotels.com/image/upload/q_auto,f_auto/media/minor/nh/images/nh-bentota-ceysands/01_homepage_ok1/nh_bentota_ceysands_resort_logo_360x140.png' },
  { name: 'Ceysands Resort', logo: 'https://assets.minorhotels.com/image/upload/q_auto,f_auto/media/minor/nh/images/nh-bentota-ceysands/01_homepage_ok1/nh_bentota_ceysands_resort_logo_360x140.png' },
  { name: 'Zone24x7', logo: 'https://zone24x7.com/wp-content/uploads/2022/01/zone-logo-1-2.png' },
  { name: 'KIA Sri Lanka', logo: 'https://www.kia.lk/wp-content/uploads/2023/01/kia-logo-white-400x225.png' },
  { name: 'Kasthiram of Ceylon', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN8OTZaYPCWKvy6bm2DVAx0pEv15aMEDGF5Q&s' },
  { name: 'PickleBee', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZcv-WYWLAe4t2ZiRv9c2WSwCYYwmnapC9h1Yay8t9JA&s' },
  { name: 'Sri Lanka Navy', logo: 'https://www.navy.lk/assets/template2025/img/logo/english.webp' },
  { name: 'SLIIT', logo: 'https://www.sliit.lk/build/assets/images/logo.svg' },
  { name: 'Asante', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-X4083H-ST179-TIjZ7HJIkZKFs08A1dSR4iHbkm6LPmO9-Vx3L_LYnHM&s=10' },
  { name: 'Intervest', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREWQsG2SJBot-in_DlBeHMDTQO9xO3Ty7T2clNf11Z6tgJH1kt3BPKOPo&s=10' },
  { name: 'Cinnamon Hotels', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8UKtC682_0tUDCM2cYHLSSobxq34nE-NaTw&s' },
  { name: 'Coconut Development Authority', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ9XyISR8NTX4iH9pURVFIy2Ule5oM0iph0g&s' },
  { name: 'NSBM Green University', logo: 'https://studyway-resources.s3.amazonaws.com/profilePictures/1669870901417.png' },
  { name: 'patpat.lk', logo: 'https://play-lh.googleusercontent.com/Eizy4DSOvBeu4FzYU27YOJkUi0bxvSd2bxIpGoBliWjhVqdEwIaizWGk_FzkyargxuTi=w240-h480-rw' },
  { name: 'Nail Art', logo: 'https://findit-resources.s3.us-east-2.amazonaws.com/account/profilePictures/1686137278772.jpg' },
  { name: 'Breeze Spice', logo: 'https://logo.clearbit.com/breezespice.com' },
];

export default function Testimonials() {
  const [visibleCount, setVisibleCount] = useState(4);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (typeof window === 'undefined') return;
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCount(1);
      } else if (width < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(4);
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  useEffect(() => {
    if (index > brands.length - visibleCount) {
      setIndex(Math.max(0, brands.length - visibleCount));
    }
  }, [visibleCount, index, brands.length]);

  const itemWidth = 100 / visibleCount;

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [index, visibleCount]);

  const handleNext = () => {
    setIndex((prev) =>
      prev >= brands.length - visibleCount ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    setIndex((prev) =>
      prev <= 0 ? brands.length - visibleCount : prev - 1
    );
  };

  return (
    <section className="section bg-secondary-bg py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl">Trusted by Leading Brands</h2>
          <p className="text-text-color/80 mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0">
            From luxury hotels to national institutions, we've worked with top brands.
          </p>
        </div>

        <div className="relative overflow-hidden px-8 sm:px-12">
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-dark-bg w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-border-color flex items-center justify-center text-text-color hover:text-primary hover:border-primary transition-colors"
            aria-label="Previous"
          >
            ‹
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-dark-bg w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-border-color flex items-center justify-center text-text-color hover:text-primary hover:border-primary transition-colors"
            aria-label="Next"
          >
            ›
          </button>

          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${index * itemWidth}%)`,
            }}
          >
            {brands.map((brand, i) => (
              <div
                key={i}
                style={{ minWidth: `${itemWidth}%` }}
                className="px-2 sm:px-3"
              >
                <div className="bg-dark-bg p-4 sm:p-6 rounded-xl border border-border-color flex flex-col items-center justify-center h-[120px] sm:h-[150px]">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-10 sm:h-16 object-contain mb-2 sm:mb-3"
                  />
                  <span className="text-text-color/60 text-xs sm:text-sm text-center">
                    {brand.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-6 sm:hidden">
          {Array.from({ length: Math.ceil(brands.length / visibleCount) }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i * visibleCount)}
              className={`w-2 h-2 rounded-full transition-colors ${
                Math.floor(index / visibleCount) === i ? 'bg-primary' : 'bg-border-color'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}