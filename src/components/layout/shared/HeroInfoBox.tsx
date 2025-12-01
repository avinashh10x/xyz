"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function HeroInfoBox() {
  const box1Ref = useRef(null);
  const box2Ref = useRef(null);

  useEffect(() => {
    const box1 = box1Ref.current;
    const box2 = box2Ref.current;

    gsap.to([box1, box2], {
      opacity: 0,
      scrollTrigger: {
        trigger: document.body,
        start: "top -100vh",
        end: "top -200vh",
        scrub: true,
        // markers: true,
      },
    });
  }, []);

  return (
    <div>
      {/* hero info part */}
      <div
        ref={box1Ref}
        className="fixed top-[79vh] left-10  tracking-tight border border-foreground  backdrop-blur-[3px] w-82 z-999  text-sm "
      >
        <div className=" flex h-1/2  border-b border-foreground ">
          <div className="flex items-center justify-center w-10 py-2 border-r border-foreground">
            <span className="rotate-270 ">ⓒBPCO</span>
          </div>
          <div className=" p-2 flex items-center justify-center w-full">
            <span>
              ADVERTISING AGENCY SPECIALIZING IN PLANNING, PRODUCTION, AN
              OUTDOOR ADVERTISEMENTS
            </span>
          </div>
        </div>
        <div className=" flex h-1/2   ">
          <div className=" p-2 flex items-center  w-full border-r border-foreground">
            <span>BIGPICTURE COMPANY</span>
          </div>
          <div className="flex items-center justify-center w-10 py-2">
            <span className="">O8</span>
          </div>
        </div>
      </div>

      {/* scroll info part */}
      <div
        ref={box2Ref}
        className="fixed top-[90vh] left-1/2 transform -translate-x-1/2  tracking-tight  w-40 z-999  text-sm "
      >
        <div className=" flex h-1/2  ">
          <div className=" p-2 flex items-center justify-center w-full text-nowrap text-lg">
            <span>PLEASE SCROLL DOWN</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroInfoBox;
