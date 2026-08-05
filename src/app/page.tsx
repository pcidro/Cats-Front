import DonthaveCat from "@/components/home/DonthaveCat";
import Funcionalities from "@/components/home/Funcionalities";
import HappeningNow from "@/components/home/HappeningNow";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import KnowCommunity from "@/components/home/KnowCommunity";
import LastCta from "@/components/home/LastCta";

export default function Page() {
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
