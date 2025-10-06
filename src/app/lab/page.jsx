import { client } from "@/sanity/lib/client";
import { LAB_QUERY } from "@/sanity/lib/queries";
import { LAB } from "@/lib/data";
import Info from "@/components/Info";
import DomWanderCanvas from "@/components/lab/DomWanderCanvas";
import Redirect from "@/components/Redirect";

const LabPage = async () => {
  const lab = await client.fetch(LAB_QUERY);
  return (
    <div>
      {LAB.info && <Info info={LAB.info} />}
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
