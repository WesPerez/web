"use client";

import { MelodySpirit } from "@/components/MelodySpirit";
import { SubPageLayout } from "@/components/SubPageLayout";

export default function MelodyPage() {
  return (
    <SubPageLayout
      emoji="🎵"
      title={<>旋律<span className="text-gradient-cute">精灵</span></>}
      subtitle="选择心情和节奏，小伙伴为你谱写一段专属旋律~"
    >
      <MelodySpirit />
    </SubPageLayout>
  );
}
