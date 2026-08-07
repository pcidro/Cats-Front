import DonthaveCat from "@/components/home/DonthaveCat";
import Funcionalities from "@/components/home/Funcionalities";
import HappeningNow from "@/components/home/HappeningNow";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import KnowCommunity from "@/components/home/KnowCommunity";
import LastCta from "@/components/home/LastCta";
import { getUser } from "@/utils/getuser";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getUser();
  if (user) {
    redirect("/explorar");
  }
  return (
    <div>
      <Hero />
      <Funcionalities />
      <HowItWorks />
      <KnowCommunity />
      <DonthaveCat />
      <HappeningNow />
      <LastCta />
    </div>
  );
}
