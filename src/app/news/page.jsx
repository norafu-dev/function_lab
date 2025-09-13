import { NEWS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import Redirect from "@/components/Redirect";
import { ClampWithReadMore } from "@/components/work/slug/Description";
import { NEWS } from "@/lib/data";
import Info from "@/components/Info";
import NewsList from "@/components/news/NewsList";

const NewsPage = async () => {
  const news = await client.fetch(NEWS_QUERY);

  return (
    <div>
      {NEWS.info && <Info info={NEWS.info} />}
      <div className="px-[15px] md:px-[30px] mt-[60px] md:mt-[30px] lg:mt-[200px]">
        <NewsList news={news} total={Infinity} mobileCount={Infinity} />

        {NEWS.keepReading && (
          <div className="md:w-1/2 mt-[30px] md:mt-[75px] lg:mt-[100px] mb-[100px] md:mb-[200px] lg:mb-[400px]">
            <h2 className="mb-[15px] lg:mb-[30px] text-md">Keep reading →</h2>
            <ClampWithReadMore
              text={NEWS.keepReading}
              lines={4}
              color="text-[#8C8C8C]"
            />
          </div>
        )}

        <div className="w-full mb-[15px] md:mb-[30px] lg:mb-[90px]">
          <Redirect text="See our projects →" href={`/work`} />
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
