"use client";

import { CatTranslator } from "@/components/CatTranslator";
import { SubPageLayout } from "@/components/SubPageLayout";

export default function CatPage() {
  return (
    <SubPageLayout
      emoji="🐱"
      title={<>猫咪<span className="text-gradient-cute">翻译官</span></>}
      subtitle="选择你家猫咪的行为，让小伙伴帮你翻译它在想什么~"
    >
      <CatTranslator />
    </SubPageLayout>
  );
}
