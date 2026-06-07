"use client";

import { useState } from "react";

const STYLES = [
  { id: "watercolor", label: "水彩风", suffix: ", watercolor painting style, soft pastel colors, dreamy and gentle, artistic brush strokes" },
  { id: "pixel", label: "像素风", suffix: ", pixel art style, 16-bit retro game aesthetic, vibrant colors, cute and nostalgic" },
  { id: "ghibli", label: "吉卜力风", suffix: ", Studio Ghibli animation style, whimsical and magical, lush nature, warm lighting, Miyazaki inspired" },
  { id: "cyberpunk", label: "赛博朋克风", suffix: ", cyberpunk style, neon lights, futuristic cityscape, dark background with glowing accents, sci-fi" },
];

export function DreamPainter() {
  const [description, setDescription] = useState("");
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canGenerate = description.trim().length >= 2 && selectedStyle !== null;

  const handleGenerate = () => {
    if (!canGenerate) return;
    const style = STYLES.find((s) => s.id === selectedStyle)!;
    const fullPrompt = description.trim() + style.suffix;
    const url = `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(fullPrompt)}&image_size=landscape_4_3&_t=${Date.now()}`;

    setLoading(true);
    setError(null);
    setImageUrl(url);
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    setLoading(false);
    setError("生成失败，请稍后重试");
    setImageUrl(null);
  };

  return (
    <div className="card-cute p-6">
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="描述你的梦，比如：在云上骑鲸鱼..."
        aria-label="梦境描述"
        className="w-full px-3.5 py-2.5 rounded-xl border border-border-light bg-surface text-sm outline-none focus:border-accent-cute transition-colors mb-3.5 box-border"
      />

      <div className="flex gap-2 mb-4 flex-wrap" role="group" aria-label="选择画风">
        {STYLES.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelectedStyle(s.id)}
            aria-pressed={selectedStyle === s.id}
            className={`
              px-3.5 py-1.5 rounded-2xl text-[13px] transition-all duration-200 cursor-pointer
              ${selectedStyle === s.id
                ? "border-2 border-pink-400 bg-pink-50 text-pink-800 font-semibold"
                : "border border-border-light bg-white/75 text-foreground font-normal"
              }
            `}
          >
            {s.label}
          </button>
        ))}
      </div>

      <button
        onClick={handleGenerate}
        disabled={!canGenerate || loading}
        className={`
          w-full py-2.5 rounded-[14px] border-none text-white text-[15px] font-semibold mb-4 transition-colors cursor-pointer
          ${canGenerate && !loading
            ? "bg-accent-deep hover:bg-pink-600 active:bg-pink-700"
            : "bg-accent cursor-not-allowed"
          }
        `}
      >
        {loading ? "正在画画..." : "生成画作"}
      </button>

      {loading && (
        <div className="text-center py-6 text-base text-foreground" aria-live="polite">
          <span className="inline-block animate-spin">🎨</span>{" "}
          小伙伴正在画画...
        </div>
      )}

      {error && (
        <div className="text-center py-3 text-red-500 text-sm" role="alert">
          {error}
        </div>
      )}

      {imageUrl && !loading && (
        <div className="text-center">
          {/* eslint-disable-next-line @next/next/no-img-element -- External API image, cannot use next/image with static export */}
          <img
            src={imageUrl}
            alt="梦境画作"
            onLoad={handleImageLoad}
            onError={handleImageError}
            className="max-w-full rounded-2xl shadow-lg"
          />
          <div className="mt-3">
            <button
              onClick={handleGenerate}
              className="px-5 py-2 rounded-xl border border-border-light bg-white/75 text-foreground text-[13px] cursor-pointer hover:bg-white transition-colors"
            >
              重新生成
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
