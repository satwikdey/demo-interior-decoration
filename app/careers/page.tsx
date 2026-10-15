import MobilePage from "@/components/versions/mobile/careers/page";
import DesktopPage from "@/components/versions/desktop/careers/page";
import { ResponsiveVersion } from "@/components/ResponsiveVersion";

export default function Page() {
  return <ResponsiveVersion mobile={<MobilePage />} desktop={<DesktopPage />} />;
}
