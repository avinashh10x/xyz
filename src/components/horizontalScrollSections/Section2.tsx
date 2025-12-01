
function Section2() {
  return (
    <section className="panel h-screen w-[45vw] flex flex-col justify-center items-center   ">
      <div className="h-[70%]  flex items-end">
        <div className=" h-72 aspect-[19/9] mb-10 rounded-full relative p-5">
          <img
            className="h-full w-full object-cover rounded-full"
            src="https://plus.unsplash.com/premium_photo-1764177093378-dd86813fcdb6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
            alt="banner-img"
          />
          <img
            src="https://www.bpco.kr/img/m2_r_t.svg"
            alt="border-img"
            className="h-full absolute top-0 left-0"
          />
        </div>
      </div>
      <div className=" w-2/3 h-[30%]">
        <p className="text-lg">
          We love building memorable digital interactions through motion +
          storytelling. We love building memorable digital interactions through
          motion + storytelling.
        </p>
      </div>
    </section>
  );
}

export default Section2;