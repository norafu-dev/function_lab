export default function Home() {
  return (
    <div className="h-screen overflow-hidden">
      <video
        src="/video/home.mp4"
        autoPlay
        muted
        loop
        className="w-full h-full object-cover"
      />
    </div>
  );
}
