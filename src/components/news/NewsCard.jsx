import Image from "next/image";

const NewsCard = ({ cover, title, date, index }) => {
  const { imgUrl, ratio } = cover || {};
  return (
    <div>
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: ratio }}
      >
        <Image src={imgUrl} alt={title || `news-${index + 1}`} fill />
      </div>
      <div className="text-base pt-[10px] lg:pt-[30px] ">
        <span className="pr-[3px] lg:pr-[10px] text-secondary">{date}</span>
        {title}
      </div>
    </div>
  );
};

export default NewsCard;
