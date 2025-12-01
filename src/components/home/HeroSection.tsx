// HeroSection.tsx
"use client";

import React from "react";
import Title from "./_component/Title";
import Hero3dObject from "./_component/Hero3dObject";
import ServicesSection from "./ServicesSection";
import HeroInfoBox from "../layout/shared/HeroInfoBox";
import HorizontalScrollSection from "./HorizontalScrollSection";

function HeroSection() {
  // Lenis should be initialized once globally (see `components/layout/SmoothScroll`)

  return (
    <div>
      <div className="relative w-full bg-background text-foreground">
        <Title />

        <Hero3dObject />
        <div></div>
        <HorizontalScrollSection />
        <ServicesSection />
        <HeroInfoBox />
      </div>
    </div>
  );
}

export default HeroSection;
