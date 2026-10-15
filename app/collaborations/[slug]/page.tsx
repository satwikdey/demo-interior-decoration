import MobilePage from "@/components/versions/mobile/collaborations/[slug]/page";
import DesktopPage from "@/components/versions/desktop/collaborations/[slug]/page";
import { ResponsiveVersion } from "@/components/ResponsiveVersion";

export default function Page() {
  return <ResponsiveVersion mobile={<MobilePage />} desktop={<DesktopPage />} />;
}
