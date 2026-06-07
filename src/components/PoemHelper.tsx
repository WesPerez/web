"use client";

import { useState } from "react";

type PoemStyle = "现代诗" | "古风" | "俳句";

const TEMPLATES: Record<PoemStyle, string[]> = {
  现代诗: [
    "在{keyword}的影子里\n我找到了一个\n被遗忘的下午\n风很轻\n像你离开时的呼吸",
    "如果{keyword}有颜色\n那一定是\n清晨四点的蓝\n和傍晚六点的橙\n之间\n那段沉默",
    "我把{keyword}折成纸船\n放进时间的河里\n它漂走了\n带着我\n写了一半的信",
    "{keyword}落在窗台上\n像一句\n没说完的话\n我等了一整个冬天\n它也没有\n变成雪",
    "有人问我{keyword}是什么\n我想了想\n大概是\n你笑的时候\n世界暂停的那一秒",
    "深夜的{keyword}\n比白天多了一层\n看不见的温柔\n像月光\n落在没有人的街道",
  ],
  古风: [
    "一帘{keyword}半卷风，\n小楼昨夜又相逢。\n不知何处吹箫管，\n惹得落花满地红。",
    "{keyword}深处有人家，\n竹篱茅舍伴烟霞。\n溪声入梦三更月，\n不觉青丝换白发。",
    "谁将{keyword}入画屏，\n淡墨轻描总未成。\n若问此心何处是，\n一江春水向东行。",
    "独坐{keyword}听雨声，\n烛花落尽夜微明。\n人间多少悲欢事，\n都付茶烟一缕轻。",
    "风过{keyword}带晚香，\n半山残照半山凉。\n归鸟不知何处去，\n空留松影满衣裳。",
    "{keyword}如梦水如天，\n一叶扁舟入暮烟。\n渔唱数声人去远，\n白鸥飞处是江南。",
  ],
  俳句: [
    "{keyword}微凉\n蝉声落进茶杯里\n夏日悠长",
    "静看{keyword}落\n一只蝴蝶停指尖\n风也轻柔",
    "{keyword}深处\n谁家猫咪打哈欠\n午后时光",
    "细雨湿{keyword}\n伞下两个人的肩\n很近很近",
    "晚风拂{keyword}\n萤火虫提着灯笼\n来找夏天",
    "{keyword}初醒\n露珠还挂在叶尖\n世界好安静",
  ],
};

const STYLES: PoemStyle[] = ["现代诗", "古风", "俳句"];

function generatePoem(keyword: string, style: PoemStyle): string {
  const templates = TEMPLATES[style];
  const template = templates[Math.floor(Math.random() * templates.length)];
  return template.replace(/\{keyword\}/g, keyword);
}

export function PoemHelper() {
  const [keyword, setKeyword] = useState("");
  const [style, setStyle] = useState<PoemStyle>("现代诗");
  const [poem, setPoem] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!keyword.trim()) return;
    setPoem(generatePoem(keyword.trim(), style));
    setCopied(false);
  };

  const handleRegenerate = () => {
    setPoem(generatePoem(keyword.trim(), style));
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!poem) return;
    await navigator.clipboard.writeText(poem);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="card-cute bg-sky-100 border border-blue-100 p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        ✨ 诗歌生成器
      </h3>

      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="输入一个词，比如：月亮、春天、咖啡..."
        aria-label="输入关键词"
        className="w-full rounded-lg px-4 py-2.5 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300 mb-4 bg-white"
      />

      <div className="flex gap-2 mb-4" role="group" aria-label="选择诗歌风格">
        {STYLES.map((s) => (
          <button
            key={s}
            onClick={() => setStyle(s)}
            aria-pressed={style === s}
            className={`
              px-4 py-1.5 rounded-full text-sm transition-all duration-200 cursor-pointer
              ${style === s
                ? "border-2 border-violet-400 bg-violet-50 text-violet-800 font-semibold"
                : "border border-blue-100 bg-white text-gray-500 font-normal"
              }
            `}
          >
            {s}
          </button>
        ))}
      </div>

      <button
        onClick={handleGenerate}
        disabled={!keyword.trim()}
        className="w-full py-2.5 rounded-lg text-white text-sm font-medium bg-violet-400 hover:bg-violet-500 active:bg-violet-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        生成诗歌
      </button>

      {poem && (
        <div className="mt-4">
          <div
            className={`
              rounded-xl p-6 text-center bg-white border border-blue-100
              text-[1.05rem] leading-loose
              ${style === "现代诗" ? "italic" : ""}
            `}
            role="status"
            aria-live="polite"
          >
            {poem.split("\n").map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>

          <div className="flex gap-2 mt-3">
            <button
              onClick={handleRegenerate}
              className="flex-1 py-2 rounded-lg text-sm bg-white border border-blue-100 text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              换一首
            </button>
            <button
              onClick={handleCopy}
              className={`
                flex-1 py-2 rounded-lg text-sm text-white transition-colors cursor-pointer
                ${copied ? "bg-emerald-300" : "bg-violet-400 hover:bg-violet-500"}
              `}
            >
              {copied ? "已复制!" : "复制"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
