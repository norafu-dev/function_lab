import VideoPlayer from "@/components/VideoPlayer";

export default function Home() {
  return (
    <main>
      <h1 className="px-[30px]">
        Function Lab is a design practice that creates systems and experiences
        across brand, print and digital.
      </h1>
      <VideoPlayer src="https://player.vimeo.com/video/1114575023" />
    </main>
  );
}

{
  /* <div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1114575023?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;autoplay=1" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="forever present"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script> */
}
