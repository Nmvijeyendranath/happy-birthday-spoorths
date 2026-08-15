export default function VideoBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-black">
      <video
        autoPlay
        loop
        muted={true}
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-70"
        style={{ filter: 'blur(4px)' }}
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>
      
      {/* Optional: Add a subtle dark overlay to ensure text remains readable */}
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
}
