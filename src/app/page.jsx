import { client } from "@/sanity/lib/client";
import {
  NEWS_QUERY_IN_HOMEPAGE,
  WORKS_QUERY_IN_HOMEPAGE,
} from "@/sanity/lib/queries";
import NewsList from "@/components/news/NewsList";
import { HOME } from "@/lib/data";
import Info from "@/components/Info";
import { Title } from "@/app/about/page";
import Redirect from "@/components/Redirect";
import WorkCard from "@/components/work/WorkCard";

const Home = async () => {
  const news = await client.fetch(NEWS_QUERY_IN_HOMEPAGE);
  const works = await client.fetch(WORKS_QUERY_IN_HOMEPAGE);
  return (
    <main>
      <section className="h-screen overflow-hidden">
        <video
          src="/video/home.mp4"
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        />
      </section>
      {HOME.info && <Info info={HOME.info} />}
      <section className="mt-[30px] lg:mt-[200px]">
        {works.map((work) => (
          <WorkCard key={work.title} work={work} />
        ))}
      </section>
      <Redirect
        text="See more works →"
        href={`/work`}
        className="padding-x border-0 mb-[100px] md:mb-[200px] lg:mb-[400px] mt-[30px]"
      />
      <section className="padding-x">
        <Title title="What’s New" />
        <NewsList news={news} />
      </section>
      <Redirect
        text="Read more about what’s going on  →"
        href={`/news`}
        className="padding-x border-0 mb-[100px] md:mb-[200px] lg:mb-[400px] mt-[30px] lg:mt-[90px]"
      />
    </main>
  );
};

export default Home;
