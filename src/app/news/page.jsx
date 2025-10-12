import { INFO_QUERY_BY_KEY, NEWS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import Redirect from "@/components/Redirect";
import Info from "@/components/Info";
import NewsShowMore from "@/components/news/NewsShowMore";

const NewsPage = async () => {
  const news = await client.fetch(NEWS_QUERY);
  const newsInfo = await client.fetch(INFO_QUERY_BY_KEY, { key: "news" });

  return (
    <div>
      {newsInfo?.content && <Info info={newsInfo.content} />}
      <div className="px-[15px] md:px-[30px] mt-[60px] md:mt-[30px] lg:mt-[200px]">
        <NewsShowMore news={news} />
        {newsInfo?.secondaryContent && (
          <p className="md:w-1/2 mt-[15px] lg:mt-[30px] mb-[100px] md:mb-[200px] lg:mb-[400px] text-base text-secondary">
            {newsInfo.secondaryContent}
          </p>
        )}
        <div className="w-full mb-[15px] md:mb-[30px] lg:mb-[90px]">
          <Redirect text="See our projects →" href={`/work`} />
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
