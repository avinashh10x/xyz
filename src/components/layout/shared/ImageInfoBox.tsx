import React from "react";

function ImageInfoBox() {
  return (
    <div>
      {/* hero info part */}
      <div className="absolute bottom-4 left-4  tracking-tight border  text-background border-background backdrop-blur-[3px] w-82 z-999  text-sm ">
        <div className=" flex h-1/2  border-b border-background ">
          <div className="flex items-center justify-center w-10 py-2 border-r border-background">
            <span className="rotate-270  ">ⓒBPCO</span>
          </div>
          <div className=" p-2 flex items-center justify-center w-full">
            <span>
              ADVERTISING AGENCY SPECIALIZING IN PLANNING, PRODUCTION, AN
              OUTDOOR ADVERTISEMENTS
            </span>
          </div>
        </div>
        <div className=" flex h-1/2   ">
          <div className=" p-2 flex items-center  w-full border-r border-background">
            <span>BIGPICTURE COMPANY</span>
          </div>
          <div className="flex items-center justify-center w-10 py-2">
            <span className="">O8</span>
          </div>
        </div>
      </div>

     
    </div>
  );
}

export default ImageInfoBox;
