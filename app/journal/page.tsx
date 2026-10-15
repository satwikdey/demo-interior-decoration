import MobilePage from "@/components/versions/mobile/journal/page";
import DesktopPage from "@/components/versions/desktop/journal/page";
import { ResponsiveVersion } from "@/components/ResponsiveVersion";

export default function Page() {
  return <ResponsiveVersion mobile={<MobilePage />} desktop={<DesktopPage />} />;
}
