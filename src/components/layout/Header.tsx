"use client";
import React, { useState } from "react";
import { Globe } from "lucide-react";

const menuItems = ["HOME", "PROJECTS", "CONTACT"];

function Header() {
  const [active, setActive] = useState("HOME");

  return (
    <header
      className=" 
        w-full fixed top-0 left-0 z-[999]
        flex items-start justify-between
        px-10 py-6 font-mono tracking-tight
        font-semibold text-md
      "
    >
      {/* COLUMN 1 */}
      <div className="leading-tight">
        <div className="">Bigpicture Company</div>
        <div className="">We share</div>
        <div className="">Our pleasure</div>
      </div>

      {/* COLUMN 2 */}
      <div className="">Creativity_agency</div>

      {/* COLUMN 3 → CENTER MENU */}
      <nav
        className="
          flex items-center gap-2
          p-2
          rounded-full border-2 border-black/70 border-dotted
          backdrop-blur-md bg-white/20
          text-sm
        "
      >
        {menuItems.map((item) => (
          <button
            key={item}
            onClick={() => setActive(item)}
            className={`
    transition-all px-4 py-1 rounded-full
    ${
      active === item
        ? "font-bold bg-foreground/30 shadow-sm"
        : "opacity-70 hover:opacity-100"
    }
  `}
          >
            {item}
          </button>
        ))}
      </nav>

      {/* COLUMN 4 */}
      <div className="">Offline_marketing</div>

      {/* COLUMN 5 */}
      <div className="flex items-center gap-2 ">
        <Globe size={16} />
        <span>Seoul,Korea</span>
      </div>
    </header>
  );
}

export default Header;
