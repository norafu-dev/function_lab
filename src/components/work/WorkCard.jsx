import Link from "next/link";
import ImageCard from "./ImageCard";
import VideoCard from "./VideoCard";

const WorkCard = ({ work }) => {
  const { hero, slug, title } = work;
  return (
    <div className="relative group aspect-[1440/810] overflow-hidden">
      <Link href={`/work/${slug}`}>
        {hero.type === "image" ? (
          <ImageCard src={hero} alt={title} />
        ) : (
          <VideoCard src={hero} alt={title} />
        )}
        <div className="absolute left-0 bottom-0 flex items-center w-full h-[60px] px-[30px] text-[12px] leading-[15px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {title}
        </div>
      </Link>
    </div>
  );
};

export default WorkCard;
