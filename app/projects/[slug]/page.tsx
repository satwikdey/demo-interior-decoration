import MobilePage from "@/components/versions/mobile/projects/[slug]/page";
import DesktopPage from "@/components/versions/desktop/projects/[slug]/page";
import { ResponsiveVersion } from "@/components/ResponsiveVersion";

export default function Page() {
  return <ResponsiveVersion mobile={<MobilePage />} desktop={<DesktopPage />} />;
}
