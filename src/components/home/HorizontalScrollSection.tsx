"use client";
import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section1 from "../horizontalScrollSections/Section1";
import Section2 from "../horizontalScrollSections/Section2";
import Section3 from "../horizontalScrollSections/Section3";
import Section4 from "../horizontalScrollSections/Section4";
import Section5 from "../horizontalScrollSections/Section5";
import ImageInfoBox from "../layout/shared/ImageInfoBox";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const section5OverlayRef = useRef<HTMLDivElement | null>(null);
  const section5ContentRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear existing triggers
    ScrollTrigger.getAll().forEach((t) => t.kill());

    // Get all sections with class 'panel'
    const sections = container.querySelectorAll(".panel");
    const textEls = section5ContentRef.current.querySelectorAll(".movingText");
    const imgBoxes = section5ContentRef.current.querySelectorAll(".img-box");

    // Calculate cumulative positions dynamically
    const sectionPositions: number[] = [];
    let cumulativeWidth = 0;

    sections.forEach((section) => {
      sectionPositions.push(cumulativeWidth);
      cumulativeWidth += section.clientWidth;
    });

    // Section 5 is at index 4 (0-indexed: S1, S2, S3, S4, S5)
    const section5StartX = sectionPositions[4] || 0;
    const section6StartX = sectionPositions[5] || section5StartX;

    console.log(
      "📍 Section widths:",
      Array.from(sections).map((s) => `${s.clientWidth}px`)
    );
    console.log("📍 Section 5 freeze point:", section5StartX);

    // Create timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        start: "top top",
        end: "+=6000",
        invalidateOnRefresh: true,
      },
    });

    // Phase 1: Scroll through sections 1-4 to reveal Section 5
    tl.to(container, {
      x: -section5StartX,
      duration: 3,
      ease: "none",
    });

    // Label when section 5 enters viewport
    tl.add("section5Start");

    // Phase 2: FREEZE at Section 5 position
    tl.to(container, {
      x: -section5StartX,
      duration: 2,
      ease: "none",
    });

    // Section 5 internal animations (during freeze)
    // First fade in the overlay and change its color
    tl.to(
      section5OverlayRef.current,
      {
        opacity: 1,
        backgroundColor: "transparent",
        duration: 0,
        ease: "none",
      },
      "section5Start"
    );

    // Fade in the animated text

    // Fade in the animated text
    tl.set(
      section5ContentRef.current,
      {
        opacity: 1,
        backgroundColor: "white",
        y: 0,
      },
      "section5Start+=0.3"
    );

    tl.to(
      textEls,
      {
        x: (i) => (i % 2 === 0 ? "-30vw" : "30vw"),
        opacity: 1,
        scale: 1.1,
        duration: 1.2,
        ease: "power2.out",
      },
      "section5Start+=0.3"
    );

    // Calculate final position of the img-box
    const imgBox = imgBoxes[0];
    const finalRect = imgBox.getBoundingClientRect();

    // CENTER of screen
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // CENTER of img-box
    const boxCenterX = finalRect.left + finalRect.width / 2;
    const boxCenterY = finalRect.top + finalRect.height / 2;

    // Offset needed to bring the box from center to its final position
    const offsetX = boxCenterX - centerX;
    const offsetY = boxCenterY - centerY;

    tl.fromTo(
      imgBox,
      {
        opacity: 0,
        scale: 0,
        x: -offsetX,
        y: -offsetY,
      },
      {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
      },
      "section5Start+=0.7"
    );

    // Phase 3: Continue to Section 6 (if it exists)
    if (section6StartX > section5StartX) {
      tl.to(container, {
        x: -section6StartX,
        duration: 1,
        ease: "none",
      });
    }

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="overflow-hidden">
      <div ref={containerRef} className="flex h-screen w-max">
        {/* Your custom sections with their own widths */}
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />

        {/* Section 5 with freeze + animation overlay */}
        <div className="relative">
          <Section5 />

          {/* Overlay for color animations - starts transparent */}
          <div
            ref={section5OverlayRef}
            className="absolute inset-0 pointer-events-none opacity-0"
            style={{ backgroundColor: "bg-bg" }}
          />

          {/* Animated content overlay */}
          <div
            ref={section5ContentRef}
            className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0"
          >
            <div className="w-[95%] bg-bg flex justify-center gap-10 uppercase font-mono">
              <p className="movingText">Its me</p>
              <p className="movingText">Avinash</p>
            </div>
            <div className=" absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
              <div className="img-box h-1/2 w-1/3 absolute top-1/4 left-1/3 opcity-0">
                <img
                  className="h-full w-full object-cover"
                  src="/pic1.png"
                  alt=""
                />
                <ImageInfoBox />
              </div>
            </div>
          </div>
        </div>

        {/* Section 6 - Optional final section */}
        <section className="panel w-screen h-screen bg-purple-500 flex items-center justify-center">
          <div className="text-white text-4xl font-bold">Final Section</div>
        </section>
      </div>
    </div>
  );
}
