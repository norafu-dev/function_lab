import ImageCard from "../ImageCard";
import VideoCard from "../VideoCard";

const Hero = ({ cover, title }) => {
  return (
    <div className="relative aspect-[1440/810] overflow-hidden">
      {cover.type === "image" ? (
        <ImageCard src={cover} alt={title} />
      ) : (
        <VideoCard src={cover} alt={title} />
      )}
    </div>
  );
};

export default Hero;
