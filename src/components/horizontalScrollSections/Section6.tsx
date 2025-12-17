"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

function Section6() {
  const rootRef = useRef(null);
  const listRef = useRef(null);
  const mediaContainerRef = useRef(null);

  const medias = [
    "/pic1.png",
    "/assets/medias/._02.png",
    "/assets/medias/._03.png",
    "/assets/medias/._04.png",
    "/assets/medias/._05.png",
  ];

  useEffect(() => {
    const root = rootRef.current;
    const list = listRef.current;
    const mediaContainer = mediaContainerRef.current;
    if (!root || !list || !mediaContainer) return;

    const rows = list.querySelectorAll("li");

    gsap.set(mediaContainer, { yPercent: -50 });

    const yTo = gsap.quickTo(mediaContainer, "y", {
      duration: 0.5,
      ease: "power4",
    });

    const handleMouseMove = (e) => {
      yTo(e.clientY + window.scrollY);
    };

    list.addEventListener("mouseenter", () => {
      mediaContainer.classList.remove("invisible");
    });

    list.addEventListener("mouseleave", () => {
      mediaContainer.classList.add("invisible");
      Array.from(mediaContainer.children).forEach((el) => el.remove());
    });

    list.addEventListener("mousemove", handleMouseMove);

    rows.forEach((row, index) => {
      row.addEventListener("mouseenter", () => createMedia(index));
    });

    function createMedia(index) {
      const div = document.createElement("div");
      const img = document.createElement("img");

      img.src = medias[index];
      img.className =
        "absolute inset-0 h-full w-full object-cover translate-y-[90%]";

      div.className =
        "absolute inset-0 overflow-hidden translate-y-[-100%]";

      div.appendChild(img);
      mediaContainer.appendChild(div);

      gsap.to([div, img], {
        y: 0,
        duration: 0.6,
        ease: "expo.inOut",
      });

      if (mediaContainer.children.length > 20) {
        mediaContainer.children[0].remove();
      }
    }

    return () => {
      list.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={rootRef}
     className="panel w-screen h-screen bg-purple-500 flex items-center justify-center"
    >
      {/* LIST */}
      <ul
        ref={listRef}
        className="w-full border-b border-white/30"
      >
        {[
          ["Made With Gsap", "Branding, Website"],
          ["Light Into Darkness Conference", "Branding, Print, Website"],
          ["Kara", "Eshop"],
          ["Pink clothing", "Branding, Print, Eshop"],
          ["Soundtrack® Record", "Branding, Website"],
        ].map(([title, type], i) => (
          <li
            key={i}
            className="group flex gap-4 w-full border-t border-white/30 px-6 py-5 cursor-pointer"
          >
            <span className="w-1/4">{title}</span>
            <span>{type}</span>
            <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
              See project
            </span>
          </li>
        ))}
      </ul>

      {/* MEDIA CONTAINER */}
      <div
        ref={mediaContainerRef}
        className="pointer-events-none invisible absolute right-[16%] top-0 w-[24vw] h-[24vw] overflow-hidden rounded-md"
      />
    </section>
  );
}

export default Section6;
