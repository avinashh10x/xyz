import Image from "next/image";

function Section4() {
  return (
    <section className="panel h-screen w-screen relative">
      <Image
        src="https://www.bpco.kr/_next/image?url=%2Fimg%2Fm209.webp&w=3840&q=95"
        alt="bg"
        fill
        className="object-cover"
      />
    </section>
  );
}


export default Section4;