"use client";

import { DreamPainter } from "@/components/DreamPainter";
import { SubPageLayout } from "@/components/SubPageLayout";

export default function DreamPage() {
  return (
    <SubPageLayout
      emoji="🎨"
      title={<>梦境<span className="text-gradient-sky">画师</span></>}
      subtitle="描述你的梦，小伙伴帮你画出来。多种画风任你挑选~"
    >
      <DreamPainter />
    </SubPageLayout>
  );
}
