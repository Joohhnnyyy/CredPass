"use client";

import Header from "@/components/sections/header";
import Preloader from "@/components/sections/preloader";
import Footer from "@/components/sections/footer";
import HorizontalScroll from "@/components/HorizontalScroll";
import FeatureSection from "@/components/sections/FeatureSection";
import { sliderData } from "@/components/sections/HeroSlider";

export default function Home() {
  // We have 10 features + 1 footer section = 11 sections total in horizontal scroll
  const totalSections = sliderData.length + 1;

  return (
    <main className="relative min-h-screen bg-white">
      <Preloader />
      <Header />
      
      <HorizontalScroll sectionsCount={totalSections}>
        {sliderData.map((item) => (
          <FeatureSection key={item.id} item={item} />
        ))}
        <div className="w-screen h-screen flex-shrink-0 flex items-center justify-center bg-[#010107]">
          <Footer />
        </div>
      </HorizontalScroll>
    </main>
  );
}
