import { client } from "@/sanity/lib/client";
import {
  NEWS_QUERY_IN_HOMEPAGE,
  WORKS_QUERY_IN_HOMEPAGE,
} from "@/sanity/lib/queries";
import NewsList from "@/components/news/NewsList";
import { Title } from "@/app/about/page";
import Redirect from "@/components/Redirect";
import WorkCard from "@/components/work/WorkCard";
import Hero from "@/components/home/Hero";

const Home = async () => {
  const news = await client.fetch(NEWS_QUERY_IN_HOMEPAGE);
  const works = await client.fetch(WORKS_QUERY_IN_HOMEPAGE);
  return (
    <main>
      <Hero />
      <section className="mt-[30px] lg:mt-[200px]">
        {works.map((work) => (
          <div className="pb-[6px]" key={work.title}>
            <WorkCard work={work} autoplay={true} />
          </div>
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
