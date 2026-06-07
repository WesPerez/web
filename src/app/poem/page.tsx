"use client";

import { PoemHelper } from "@/components/PoemHelper";
import { SubPageLayout } from "@/components/SubPageLayout";

export default function PoemPage() {
  return (
    <SubPageLayout
      emoji="📝"
      title={<>诗歌<span className="text-gradient-sky">小助手</span></>}
      subtitle="给一个词，小伙伴还你一首诗。现代诗、古风、俳句随你选~"
    >
      <PoemHelper />
    </SubPageLayout>
  );
}
