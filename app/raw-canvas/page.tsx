import MobilePage from "@/components/versions/mobile/raw-canvas/page";
import DesktopPage from "@/components/versions/desktop/raw-canvas/page";
import { ResponsiveVersion } from "@/components/ResponsiveVersion";

export default function Page() {
  return <ResponsiveVersion mobile={<MobilePage />} desktop={<DesktopPage />} />;
}
