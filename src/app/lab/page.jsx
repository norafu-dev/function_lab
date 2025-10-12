import { client } from "@/sanity/lib/client";
import { INFO_QUERY_BY_KEY, LAB_QUERY } from "@/sanity/lib/queries";
import Info from "@/components/Info";
import DomWanderCanvas from "@/components/lab/DomWanderCanvas";
import Redirect from "@/components/Redirect";

const LabPage = async () => {
  const lab = await client.fetch(LAB_QUERY);
  const labInfo = await client.fetch(INFO_QUERY_BY_KEY, { key: "lab" });
  return (
    <div>
      <div className="md:hidden">
        {labInfo?.mobileContent && <Info info={labInfo.mobileContent} />}
      </div>
      <div className="hidden md:block">
        {labInfo?.content && <Info info={labInfo.content} />}
      </div>
      <div className="mt-[40px] lg:mt-[70px] mb-[40px] lg:mb-[70px]">
        <DomWanderCanvas lab={lab} />
      </div>
      <div className="w-full padding-x mb-[15px] md:mb-[30px] lg:mb-[90px]">
        <Redirect text="See our projects →" href={`/work`} />
      </div>
    </div>
  );
};

export default LabPage;
