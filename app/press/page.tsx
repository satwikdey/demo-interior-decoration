import MobilePage from "@/components/versions/mobile/press/page";
import DesktopPage from "@/components/versions/desktop/press/page";
import { ResponsiveVersion } from "@/components/ResponsiveVersion";

export default function Page() {
  return <ResponsiveVersion mobile={<MobilePage />} desktop={<DesktopPage />} />;
}
