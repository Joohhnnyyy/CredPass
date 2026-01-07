"use client";

import React from 'react';
import Image from 'next/image';
import { Plus } from 'lucide-react';

/**
 * SliderDetails component for features 6 through 10.
 * Focuses on secondary content and mock-up visuals for mobile UI screens.
 */

interface FeatureItem {
  id: number;
  number: string;
  title: string[];
  description: string;
  image: string;
  alt: string;
}

const features: FeatureItem[] = [
  {
    id: 6,
    number: "6",
    title: ["Localized", "Cost-of-Living", "Calculators"],
    description: "Localized Cost-of-Living Calculators feature AI-powered tools that offer localized budget suggestions tailored to the cost of living in specific regions or cities.",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4a4bd797-4236-4bdf-9f89-b0e30f388317-ai-in-banking-ux-design-videinfra-com/assets/images/slider-6-1_xs-22.webp",
    alt: "AI-features for banking mobile app design: Localized Cost-of-Living Calculators"
  },
  {
    id: 7,
    number: "7",
    title: ["Seamless", "Integration", "with IoT Devices"],
    description: "AI bridges the gap by integrating with connected devices, offering real-time financial guidance in the app.",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4a4bd797-4236-4bdf-9f89-b0e30f388317-ai-in-banking-ux-design-videinfra-com/assets/images/slider-7-1_xs-25.webp",
    alt: "AI-features in mobile banking app: Seamless Integration with IoT Devices"
  },
  {
    id: 8,
    number: "8",
    title: ["Debt", "Management", "and Loan Options"],
    description: "AI in banking apps assesses debt, forecasts the impact on credit scores, suggests tailored loans for future needs.",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4a4bd797-4236-4bdf-9f89-b0e30f388317-ai-in-banking-ux-design-videinfra-com/assets/images/slider-8-1_xs-26.webp",
    alt: "AI-features in fintech app: Debt Management and Loan Options"
  },
  {
    id: 9,
    number: "9",
    title: ["Fully", "Personalized", "Financial Strategies"],
    description: "The AI simplifies investment by offering personalized strategies tailored to each user's unique profile.",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4a4bd797-4236-4bdf-9f89-b0e30f388317-ai-in-banking-ux-design-videinfra-com/assets/images/slider-9-1_xs-29.webp",
    alt: "UI design of banking mobile app with AI-features: Fully Personalized Financial Strategies"
  },
  {
    id: 10,
    number: "10",
    title: ["Real-time", "Investment", "Updates"],
    description: "AI monitors investments and offers personalized real-time recommendations in one banking app, adapting to market changes.",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/4a4bd797-4236-4bdf-9f89-b0e30f388317-ai-in-banking-ux-design-videinfra-com/assets/images/slider-9-1_xs-29.webp", // Fallback to 9 as 10 is missing in assets list
    alt: "AI-driven features of banking mobile app UI: Real-time Investment Updates"
  }
];

const SliderDetails: React.FC = () => {
  return (
    <div className="bg-background text-foreground selection:bg-accent selection:text-white overflow-hidden">
      {features.map((feature) => (
        <section 
          key={feature.id}
          className="relative min-h-screen w-full flex flex-col justify-center px-4 md:px-16 py-20 border-b border-white/5"
        >
          {/* Large Background Number */}
          <div 
            className="absolute top-1/2 left-0 -translate-y-1/2 select-none pointer-events-none z-0 opacity-[0.03] overflow-hidden"
            style={{ fontSize: 'min(40vw, 40rem)', fontWeight: 700, lineHeight: 0.7, letterSpacing: '-0.05em' }}
          >
            {feature.number}
          </div>

          <div className="container relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Content: Description and Explore */}
            <div className="md:col-span-4 order-2 md:order-1 flex flex-col items-start">
              <p className="text-lead text-dim max-w-sm mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                {feature.description}
              </p>

              <a 
                href={`#modal-${feature.id}`}
                className="group flex items-center gap-4 cursor-pointer"
              >
                <span className="text-lead uppercase tracking-widest font-medium">explore</span>
                <div className="w-12 h-12 flex items-center justify-center bg-primary text-primary-foreground transform transition-transform duration-500 group-hover:rotate-90">
                  <Plus size={16} strokeWidth={3} />
                </div>
              </a>
            </div>

            {/* Middle Content: Mockup Image */}
            <div className="md:col-span-4 order-1 md:order-2 flex justify-center perspective-1000">
              <div className="relative w-full max-w-[320px] aspect-[9/18.5] shadow-2xl rounded-[3rem] overflow-hidden border-8 border-secondary glass-panel transform transition-transform duration-700 hover:scale-105">
                <Image
                  src={feature.image}
                  alt={feature.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={feature.id === 6}
                />
              </div>
            </div>

            {/* Right Content: Section Title */}
            <div className="md:col-span-4 order-3 flex flex-col md:items-end text-left md:text-right">
              <h2 className="text-display leading-tight uppercase">
                {feature.title.map((line, idx) => (
                  <React.Fragment key={idx}>
                    <span className="block">{line}</span>
                  </React.Fragment>
                ))}
              </h2>
            </div>
          </div>

          {/* Bottom Decorations */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-30">
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-white to-transparent"></div>
          </div>
        </section>
      ))}

      {/* Internal Page Styles for Animation and Layout */}
      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        @media (max-width: 768px) {
          .text-display {
            font-size: 3rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SliderDetails;