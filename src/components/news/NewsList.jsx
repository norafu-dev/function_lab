import { getImageInfo, formatDate } from "@/lib/utils";
import NewsCard from "./NewsCard";

const NewsList = ({ news, mobileCount = 4, total = 6 }) => {
  const newsWithImageInfo = news.map((item) => ({
    title: item.title,
    cover: getImageInfo(item.cover),
    date: formatDate(item.date),
  }));
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-[6px] gap-y-[60px] lg:gap-x-[30px] lg:gap-y-[30px]">
      {newsWithImageInfo
        .slice(0, total)
        .map(({ cover, title, date }, index) => (
          <div
            key={index}
            className={index >= mobileCount ? "hidden md:block" : ""}
          >
            <NewsCard cover={cover} title={title} date={date} index={index} />
          </div>
        ))}
    </div>
  );
};

export default NewsList;
