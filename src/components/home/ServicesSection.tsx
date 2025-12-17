"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

function ServicesSection() {
  const rootRef = useRef(null);
  const cardRef = useRef(null);
  const mediaRef = useRef(null);

  useEffect(() => {
    if (!rootRef.current || !cardRef.current || !mediaRef.current) return;

    const root = rootRef.current;
    const card = cardRef.current;
    const media = mediaRef.current;

    const xTo = gsap.quickTo(card, "x", { duration: 1, ease: "power4" });
    const yTo = gsap.quickTo(card, "y", { duration: 1, ease: "power4" });
    const rotationYTo = gsap.quickTo(card, "rotationY", {
      duration: 1,
      ease: "power4",
    });
    const rotationXTo = gsap.quickTo(card, "rotationX", {
      duration: 1,
      ease: "power4",
    });
    const scaleXTo = gsap.quickTo(media, "scaleX", {
      duration: 2,
      ease: "power1",
    });
    const scaleYTo = gsap.quickTo(media, "scaleY", {
      duration: 2,
      ease: "power1",
    });

    let oldPosX = 0;
    let oldPosY = 0;
    let isMoving;

    const handleMouseMove = (e) => {
      const W = window.innerWidth;
      const H = window.innerHeight;

      rotationYTo(e.clientX - oldPosX);
      rotationXTo(-(e.clientY - oldPosY));

      xTo(e.clientX - W / 2);
      yTo(e.clientY - root.getBoundingClientRect().top - H / 2);

      scaleXTo(1);
      scaleYTo(1);

      oldPosX = e.clientX;
      oldPosY = e.clientY;

      clearTimeout(isMoving);
      isMoving = setTimeout(() => {
        rotationYTo(0);
        rotationXTo(0);
        scaleXTo(1.2);
        scaleYTo(1.2);
      }, 66);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative h-[89vh] w-full overflow-hidden px-6 bg-background text-foreground"
      style={{ perspective: "100vw" }}
    >
   
      {/* TEXT BLOCK */}
      <div className="relative z-10">
        {/* LINE 1 */}
        <div className="flex justify-between">
          <p className="font-medium leading-[0.8] tracking-[-0.05em] text-[14.4vw]">
            The craft
          </p>

          <p className="text-right text-[1.6vw] leading-[1.1] tracking-[-0.03em] text-[#BAB8B9]">
            Full-Stack Developer <br />
            Design · Engineering <br />
            Product Thinking
          </p>
        </div>

        {/* LINE 2 */}
        <div className="mt-8 flex justify-between items-end">
          <div className="flex flex-col gap-4">
            <img src="/assets/medias/icon.svg" alt="" className="w-[7.4vw]" />
            <p className="text-[1.6vw] leading-[1.1] tracking-[-0.03em] text-[#BAB8B9]">
              <a href="https://www.instagram.com/avinashh10x" target="_blank" rel="noopener noreferrer">Instagram</a> <br />
              <a href="https://twitter.com/avinash10x" target="_blank" rel="noopener noreferrer">Twitter</a> <br />
              <a href="mailto:thissideavinash@gmail.com">mail</a>
            </p>
          </div>

          <div>
            <div className="flex justify-between">
              <p className="font-medium leading-[0.8] tracking-[-0.05em] text-[14.4vw]">
                of
              </p>
              <p className="font-medium leading-[0.8] tracking-[-0.05em] text-[14.4vw]">
                digital
              </p>
            </div>

            <p className="font-medium leading-[0.8] tracking-[-0.05em] text-[14.4vw]">
              craftsmanship
            </p>
          </div>
        </div>
      </div>

      {/* FLOATING CARD */}
      <div
        ref={cardRef}
        className="absolute top-1/2 left-1/2 w-[20vw] aspect-[3/4] overflow-hidden rounded-[1vw]"
        style={{
          transform: "translate(-50%, -50%)",
          transformStyle: "preserve-3d",
        }}
      >
        <img
          ref={mediaRef}
          src="/pic1.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover scale-[1.2]"
        />
      </div>
    </section>
  );
}

export default ServicesSection;
