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
    setImageUrl(null);

    const img = new Image();
    img.onload = () => {
      setImageUrl(url);
      setLoading(false);
    };
    img.onerror = () => {
      setError("生成失败，请稍后重试");
      setLoading(false);
    };
    img.src = url;
  };

  return (
    <div className="card-cute" style={{ padding: 24 }}>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="描述你的梦，比如：在云上骑鲸鱼..."
        style={{
          width: "100%",
          padding: "10px 14px",
          borderRadius: 12,
          border: "1.5px solid #fae8e8",
          background: "#fef9f5",
          fontSize: 14,
          outline: "none",
          marginBottom: 14,
          boxSizing: "border-box",
        }}
      />

      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {STYLES.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelectedStyle(s.id)}
            style={{
              padding: "6px 14px",
              borderRadius: 16,
              border: selectedStyle === s.id ? "2px solid #f472b6" : "1.5px solid #fae8e8",
              background: selectedStyle === s.id ? "#fce7f3" : "rgba(255,255,255,0.75)",
              color: selectedStyle === s.id ? "#be185d" : "#3d2c2c",
              fontSize: 13,
              cursor: "pointer",
              fontWeight: selectedStyle === s.id ? 600 : 400,
              transition: "all 0.2s",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      <button
        onClick={handleGenerate}
        disabled={!canGenerate || loading}
        style={{
          width: "100%",
          padding: "10px 0",
          borderRadius: 14,
          border: "none",
          background: canGenerate && !loading ? "#ec4899" : "#f9a8d4",
          color: "#fff",
          fontSize: 15,
          fontWeight: 600,
          cursor: canGenerate && !loading ? "pointer" : "not-allowed",
          marginBottom: 16,
        }}
      >
        {loading ? "正在画画..." : "生成画作"}
      </button>

      {loading && (
        <div style={{ textAlign: "center", padding: "24px 0", fontSize: 16, color: "#3d2c2c" }}>
          <span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>🎨</span>{" "}
          小伙伴正在画画...
        </div>
      )}

      {error && (
        <div style={{ textAlign: "center", padding: "12px 0", color: "#ef4444", fontSize: 14 }}>
          {error}
        </div>
      )}

      {imageUrl && !loading && (
        <div style={{ textAlign: "center" }}>
          <img
            src={imageUrl}
            alt="梦境画作"
            style={{
              maxWidth: "100%",
              borderRadius: 16,
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          />
          <div style={{ marginTop: 12 }}>
            <button
              onClick={handleGenerate}
              style={{
                padding: "8px 20px",
                borderRadius: 12,
                border: "1.5px solid #fae8e8",
                background: "rgba(255,255,255,0.75)",
                color: "#3d2c2c",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              重新生成
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
