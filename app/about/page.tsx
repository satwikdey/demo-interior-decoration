import MobilePage from "@/components/versions/mobile/about/page";
import DesktopPage from "@/components/versions/desktop/about/page";
import { ResponsiveVersion } from "@/components/ResponsiveVersion";

export default function Page() {
  return <ResponsiveVersion mobile={<MobilePage />} desktop={<DesktopPage />} />;
}
