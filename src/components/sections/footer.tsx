import React from 'react';
import Image from 'next/image';

/**
 * Footer component for the AI Banking UX website.
 * Features branding, copyright information, and a large decorative illustration.
 * Adheres to the dark theme and high-end cinematic design system.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden bg-[#010107] pt-16 pb-8 lg:pt-24 lg:pb-12 border-t border-white/10">
      <div className="container mx-auto px-5 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12 lg:gap-0">
          
          {/* Left Side: Branding and Info */}
          <div className="z-10 flex flex-col gap-8 lg:gap-12 max-w-lg">
            <div className="flex flex-col gap-4">
              <a 
                href="/" 
                className="group flex items-baseline gap-1.5 transition-opacity hover:opacity-80"
              >
                <span className="font-sans text-[16px] lg:text-[18px] text-[#9DA5B4] font-normal leading-none">by</span>
                <span className="font-sans text-[20px] lg:text-[24px] text-white font-bold tracking-tight leading-none uppercase">
                  CredPass
                </span>
              </a>
              <p className="font-sans text-[14px] lg:text-[16px] text-[#9DA5B4] leading-relaxed max-w-xs">
                Unlock global credibility and make trust portable through secure, privacy-first verification.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="mono-label text-[#9DA5B4] text-[10px] tracking-[0.2em] mb-2">Built for</p>
              <h3 className="font-display text-[24px] lg:text-[32px] text-white font-semibold leading-tight">
                The Future of <br className="hidden lg:block" /> Portable Trust
              </h3>
            </div>

            {/* Copyright & Links */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-4">
              <span className="font-mono text-[11px] text-[#9DA5B4] tracking-wider uppercase">
                © {currentYear} CREDPASS
              </span>
            </div>
          </div>

          {/* Right Side: Large Decorative Illustration */}
          <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[600px] lg:h-[600px] transition-cinematic">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4a4bd797-4236-4bdf-9f89-b0e30f388317-ai-in-banking-ux-design-videinfra-com/assets/images/footer-illu_xs-12.webp"
                alt="Futuristic banking UX decorative illustration"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 300px, (max-width: 1024px) 450px, 600px"
                priority
              />
              
              {/* Subtle Ambient Glow behind the illustration */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-tr from-[#3D318C]/20 via-[#E37491]/10 to-transparent blur-[80px] -z-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorative Element (Large "UX" or Branding fade) */}
      <div className="absolute -bottom-16 -left-16 huge-number select-none opacity-[0.03] text-white">
        UX
      </div>
      
      {/* Decorative Grid Lines - characteristic of the source design */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-[40px] w-[1px] h-full bg-white/[0.03] hidden lg:block" />
    </footer>
  );
}