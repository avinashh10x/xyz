function Section5() {
  return (
    <section className="panel h-screen w-[100vw] flex items-center justify-center">
      <div className="w-[95%] flex justify-center gap-10 uppercase font-mono">
        <p>Its me</p>
        <p>Avinash</p>
      </div>
    </section>
  );
}

export default Section5;

function OverlayContent({
  section5ContentRef,
}: {
  section5ContentRef: React.RefObject<HTMLDivElement>;
}) {
  return (
    <>
      <div
        ref={section5ContentRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0"
      >
        <div className="w-[95%] flex justify-center gap-10 uppercase font-mono">
          <p>Its me</p>
          <p>Avinash</p>
        </div>
      </div>
    </>
  );
}

export { OverlayContent };
