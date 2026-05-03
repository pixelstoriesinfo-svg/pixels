'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Play, Pause, Camera, Video, BarChart3 } from 'lucide-react';

export default function HeroSection() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('canplay', () => setIsVideoLoaded(true));
      return () => video.removeEventListener('canplay', () => setIsVideoLoaded(true));
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        videoRef.current.play();
        setIsVideoPlaying(true);
      }
    }
  };

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  const services = [
    { name: 'Photography', icon: Camera, href: '/stories' },
    { name: 'Videography', icon: Video, href: '/stories' },
    { name: 'Digital Marketing', icon: BarChart3, href: '/media' },
  ];

  return (
    <header
      ref={heroRef}
      className="relative h-screen flex items-center justify-center text-center overflow-hidden pt-16 isolate"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-transparent z-10" />

      <div className="absolute inset-0 z-0">
        <div
          className={`absolute inset-0 bg-gray-900 transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        </div>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover transition-opacity duration-1000"
          style={{
            opacity: isVideoLoaded ? 1 : 0,
            transform: `translate(calc(-50% + ${mousePosition.x * 0.02}px), calc(-50% + ${mousePosition.y * 0.02}px))`,
          }}
        >
          <source src="/assets/images/bg.mp4" type="video/mp4" />
        </video>
      </div>

      <button
        onClick={toggleVideoPlayback}
        className="absolute bottom-8 right-8 z-30 bg-white/10 backdrop-blur-md rounded-full p-3 hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label={isVideoPlaying ? 'Pause background video' : 'Play background video'}
      >
        {isVideoPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
      </button>

      <button
        onClick={scrollToNextSection}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 animate-bounce bg-white/10 backdrop-blur-md rounded-full p-3 hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Scroll to next section"
      >
        <ChevronDown className="w-6 h-6 text-white" />
      </button>

      <div className="relative z-20 text-white px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-8 border border-white/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="text-sm font-medium tracking-wide">Sri Lanka's Premier Creative Studio</span>
        </div>

        <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-6 leading-tight" style={{ fontFamily: 'var(--font-raleway)' }}>
          <span className="block text-white">
            We Create. We Capture.
          </span>
          <span className="block text-primary mt-2">
            We Tell Your Story.
          </span>
        </h1>

        <p className="text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-10 text-white/80">
          Transforming your moments into timeless visual stories.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link
                key={index}
                href={service.href}
                className="flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-md border bg-white/10 border-white/20 hover:bg-white/15 hover:border-white/40 transition-all duration-300"
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{service.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <Link
            href="/stories"
            className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-semibold text-white transition-all duration-300 bg-gradient-to-r from-primary to-primary rounded-full hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black"
          >
            <span className="relative z-10">Explore Our Work</span>
            <span className="absolute inset-0 bg-gradient-to-r from-primary opacity-90 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
          </Link>
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-semibold text-white transition-all duration-300 bg-white/10 backdrop-blur-md border border-white/30 rounded-full hover:bg-white/20 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <span className="relative z-10">Get in Touch</span>
            <span className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
          </Link>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-8 text-xs text-white/60">
          <span>✨ 500+ Happy Clients</span>
          <span>🎬 1000+ Projects</span>
          <span>🏆 Award-Winning</span>
        </div>
      </div>
    </header>
  );
}