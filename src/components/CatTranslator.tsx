"use client";

import { useState } from "react";

const behaviors = [
  { key: "yawn", label: "打哈欠", emoji: "😺" },
  { key: "tailUp", label: "尾巴竖起", emoji: "🐈" },
  { key: "rubLeg", label: "蹭你腿", emoji: "🐱" },
  { key: "stare", label: "盯着你看", emoji: "😸" },
  { key: "bellyUp", label: "肚子朝天", emoji: "😻" },
  { key: "earsBack", label: "耳朵后压", emoji: "🙀" },
  { key: "knead", label: "踩奶", emoji: "🐾" },
  { key: "zoomies", label: "突然跑酷", emoji: "🏃" },
] as const;

type BehaviorKey = (typeof behaviors)[number]["key"];

const translations: Record<BehaviorKey, string[]> = {
  yawn: [
    "本喵只是活动一下下巴，不是困了",
    "人类的会议太无聊了，让我打个哈欠清醒一下",
    "这个哈欠的意思是：你该给我加餐了",
    "本喵的哈欠是对这个世界最大的蔑视",
  ],
  tailUp: [
    "你好，两脚兽！本喵今天心情不错",
    "快看！本喵的尾巴在给你发信号：开罐头",
    "尾巴竖起来是因为……我闻到了小鱼干的味道",
    "这是本喵的VIP问候，只有重要的人类才能看到",
  ],
  rubLeg: [
    "你是本喵的财产了，我已经标记完毕",
    "本喵在给你施加猫猫魔法，你会变得幸运",
    "蹭蹭你，提醒你该喂饭了",
    "本喵在你腿上留下了爱的签名",
  ],
  stare: [
    "本喵在审视你的灵魂……结论：需要更多猫粮",
    "你在看本喵？本喵也在看你。谁先眨眼谁输",
    "本喵在用意念控制你打开罐头……好像没成功",
    "盯着你是因为你脸上有个东西……哦那是你的鼻子",
  ],
  bellyUp: [
    "本喵信任你才露肚皮，但别乱摸！",
    "这是陷阱。摸了你就知道了。",
    "本喵只是想展示一下我的毛有多软",
    "肚皮朝天的意思是：全世界都是本喵的",
  ],
  earsBack: [
    "本喵听到了令猫不悦的声音",
    "那个吸尘器……又在蠢蠢欲动了",
    "本喵的雷达检测到了危险……可能是洗澡水",
    "耳朵后压 = 本喵正在加载防御模式",
  ],
  knead: [
    "本喵在给你做按摩，收费一条小鱼干",
    "踩奶是本喵的幸福仪式，你被选中了",
    "本喵在揉面团……等等，这不是面团",
    "踩踩踩，本喵踩出了一条通往幸福的路",
  ],
  zoomies: [
    "本喵体内有无法解释的能量需要释放",
    "3点AM，本喵的赛道时刻到了",
    "本喵看到了一只看不见的虫子",
    "跑酷是猫科动物的传统艺能，请尊重",
  ],
};

function pickRandom(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function CatTranslator() {
  const [selected, setSelected] = useState<BehaviorKey | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const translate = (key: BehaviorKey) => {
    setSelected(key);
    setResult(pickRandom(translations[key]));
    setShowResult(false);
    requestAnimationFrame(() => setShowResult(true));
  };

  const reTranslate = () => {
    if (!selected) return;
    setShowResult(false);
    setTimeout(() => {
      setResult(pickRandom(translations[selected]));
      setShowResult(true);
    }, 150);
  };

  const selectedBehavior = behaviors.find((b) => b.key === selected);

  return (
    <div className="max-w-[600px] mx-auto">
      <div className="grid grid-cols-2 gap-3" role="group" aria-label="选择猫咪行为">
        {behaviors.map((b) => (
          <button
            key={b.key}
            onClick={() => translate(b.key)}
            aria-pressed={selected === b.key}
            className={`
              card-cute flex items-center gap-2 px-4 py-3.5 cursor-pointer text-[15px] text-left
              transition-all duration-200
              ${selected === b.key
                ? "border-2 border-orange-400 bg-orange-50 font-semibold"
                : "border border-blue-100 bg-white/75 font-normal"
              }
            `}
          >
            <span className="text-2xl" aria-hidden="true">{b.emoji}</span>
            <span>{b.label}</span>
          </button>
        ))}
      </div>

      {result && selectedBehavior && (
        <div
          className={`
            card-cute mt-5 p-6 text-center
            transition-all duration-300
            ${showResult ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}
          `}
          role="status"
          aria-live="polite"
        >
          <div
            className="text-5xl mb-3"
            aria-hidden="true"
          >
            <span className={showResult ? "animate-cat-bounce inline-block" : ""}>
              {selectedBehavior.emoji}
            </span>
          </div>
          <p className="text-[17px] leading-relaxed text-slate-800 mb-5">
            「{result}」
          </p>
          <button
            onClick={reTranslate}
            className="bg-orange-400 hover:bg-orange-500 active:bg-orange-600 text-white rounded-[14px] px-6 py-2.5 text-sm font-semibold transition-colors cursor-pointer"
          >
            再翻译一次 🔄
          </button>
        </div>
      )}
    </div>
  );
}
