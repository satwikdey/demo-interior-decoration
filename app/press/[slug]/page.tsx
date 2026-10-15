import MobilePage from "@/components/versions/mobile/press/[slug]/page";
import DesktopPage from "@/components/versions/desktop/press/[slug]/page";
import { ResponsiveVersion } from "@/components/ResponsiveVersion";

export default function Page() {
  return <ResponsiveVersion mobile={<MobilePage />} desktop={<DesktopPage />} />;
}
