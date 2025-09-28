import ImageCard from "../ImageCard";
import AutoPlayVideoCard from "../AutoPlayVideoCard";

const Hero = ({ cover, title }) => {
  return (
    <div className="relative aspect-[1440/810] overflow-hidden">
      {cover.type === "image" ? (
        <ImageCard src={cover} alt={title} />
      ) : (
        <AutoPlayVideoCard src={cover} alt={title} />
      )}
    </div>
  );
};

export default Hero;
