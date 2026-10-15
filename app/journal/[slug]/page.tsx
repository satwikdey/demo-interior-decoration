import MobilePage from "@/components/versions/mobile/journal/[slug]/page";
import DesktopPage from "@/components/versions/desktop/journal/[slug]/page";
import { ResponsiveVersion } from "@/components/ResponsiveVersion";
export { generateMetadata, generateStaticParams } from "@/components/versions/mobile/journal/[slug]/page";

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <ResponsiveVersion mobile={<MobilePage params={params} />} desktop={<DesktopPage params={params} />} />;
}
