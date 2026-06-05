"use client";

import {
  Sparkle,
  ArrowRight,
  MagicWand,
  Heart,
  Brain,
  MusicNotes,
  Cat,
  Rocket,
  Star,
  Cloud,
  Sun,
  PaintBrush,
  BookOpen,
  GameController,
  Lightbulb,
  GithubLogo,
  TwitterLogo,
  Rss,
  Plus,
  Minus,
} from "@phosphor-icons/react";
import { TerminalTypewriter } from "@/components/TerminalTypewriter";
import {
  RevealOnScroll,
  StaggerContainer,
  StaggerItem,
  HoverGlow,
  CountUp,
  ParallaxFloat,
} from "@/components/Animations";
import { useState } from "react";

/* ═══ NAV ═══ */
function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-5 md:px-10 bg-white/80 backdrop-blur-lg border-b border-border-light">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent to-accent-deep flex items-center justify-center shadow-md shadow-accent/20">
          <Sparkle weight="fill" className="text-white text-sm" />
        </div>
        <span className="font-bold text-base">AI 小世界</span>
      </div>
      <div className="hidden md:flex items-center gap-6 text-sm text-muted">
        <a href="#play" className="hover:text-accent-deep transition-colors">玩一玩</a>
        <a href="#friends" className="hover:text-accent-deep transition-colors">小伙伴</a>
        <a href="#gallery" className="hover:text-accent-deep transition-colors">画廊</a>
        <a href="#stories" className="hover:text-accent-deep transition-colors">故事</a>
      </div>
    </nav>
  );
}

/* ═══ HERO ═══ */
function Hero() {
  return (
    <section className="relative pt-14 overflow-hidden sky-gradient">
      {/* Clouds */}
      <div className="absolute top-16 left-[5%] cloud-shape w-40 h-12 opacity-60 animate-cloud" />
      <div className="absolute top-28 right-[8%] cloud-shape w-56 h-14 opacity-40 animate-cloud" style={{ animationDelay: "5s" }} />
      <div className="absolute top-44 left-[30%] cloud-shape w-32 h-10 opacity-30 animate-cloud" style={{ animationDelay: "10s" }} />

      {/* Floating decorations */}
      <ParallaxFloat className="absolute top-24 right-[15%] text-4xl opacity-60 pointer-events-none hidden md:block" offset={12}>
        ☁️
      </ParallaxFloat>
      <ParallaxFloat className="absolute top-40 left-[10%] text-3xl opacity-50 pointer-events-none hidden md:block" offset={8}>
        🦋
      </ParallaxFloat>
      <ParallaxFloat className="absolute bottom-32 right-[10%] text-4xl opacity-50 pointer-events-none hidden md:block" offset={15}>
        🌈
      </ParallaxFloat>

      <div className="relative z-10 max-w-3xl mx-auto text-center px-6 pt-20 pb-16 flex flex-col items-center gap-6">
        <div className="badge badge-blue">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-mint animate-pulse" />
          AI 小世界 · 欢迎来做客
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
          和 AI 一起
          <br />
          <span className="text-gradient-cute">玩点有趣的</span>
        </h1>

        <p className="text-base md:text-lg text-muted max-w-md leading-relaxed">
          这里住着一群可爱的 AI 小伙伴，它们会画画、写诗、讲笑话，偶尔还会犯点小迷糊。
        </p>

        <TerminalTypewriter />

        <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
          <span className="badge badge-cute">🐱 猫咪翻译官</span>
          <span className="badge badge-mint">🎨 梦境画师</span>
          <span className="badge badge-warm">🎵 旋律精灵</span>
          <span className="badge badge-lavender">📝 诗歌小助手</span>
        </div>
      </div>

      <div className="divider-wave" />
    </section>
  );
}

/* ═══ MARQUEE ═══ */
function Marquee() {
  const items = [
    "🎨 AI 画画", "🐱 猫语翻译", "🎵 作曲助手", "📝 写诗机器人", "🌈 梦境生成",
    "🧩 脑筋急转弯", "🌻 植物取名", "🔮 每日运势", "📖 故事接龙", "🎮 文字冒险",
    "🌙 晚安故事", "🍕 美食推荐", "🎭 表情包生成", "🦋 蝴蝶图鉴", "☁️ 云朵分类",
  ];
  return (
    <div className="py-5 bg-white border-y border-border-light overflow-hidden">
      <div className="flex animate-marquee" style={{ width: "max-content" }}>
        {[...items, ...items, ...items].map((t, i) => (
          <div key={i} className="px-6 text-lg whitespace-nowrap hover:scale-110 transition-transform cursor-default text-foreground/70">
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══ PLAYGROUND ═══ */
const PLAY_ITEMS = [
  {
    emoji: "🎨",
    title: "AI 画一幅画",
    desc: "告诉它你梦到了什么，它帮你画出来。画风从水彩到像素，随你挑。",
    badge: "热门",
    badgeClass: "badge-cute",
    color: "border-accent-cute/30 bg-accent-cute/5",
  },
  {
    emoji: "🐱",
    title: "猫咪心情翻译",
    desc: "上传你家猫的照片，AI 告诉你它此刻在想什么。准确率……大概比你自己猜高一点。",
    badge: "可爱",
    badgeClass: "badge-warm",
    color: "border-accent-warm/30 bg-accent-warm/5",
  },
  {
    emoji: "🎵",
    title: "哼一段旋律",
    desc: "随便哼几秒，AI 帮你补完整首歌。风格可选：爵士、古风、电子、或者「随便」。",
    badge: "新功能",
    badgeClass: "badge-mint",
    color: "border-accent-mint/30 bg-accent-mint/5",
  },
  {
    emoji: "📝",
    title: "写一首小诗",
    desc: "给它一个词，它还你一首诗。可以是现代诗、古诗、俳句，甚至打油诗。",
    badge: "文艺",
    badgeClass: "badge-lavender",
    color: "border-accent-lavender/30 bg-accent-lavender/5",
  },
  {
    emoji: "🔮",
    title: "今日小运势",
    desc: "AI 根据你的心情和天气，给你一句温暖又神秘的小建议。仅供娱乐哦~",
    badge: "玄学",
    badgeClass: "badge-blue",
    color: "border-accent/30 bg-accent/5",
  },
  {
    emoji: "🧩",
    title: "脑筋急转弯",
    desc: "AI 出题你来猜，或者你出题 AI 来猜。看谁先笑场。",
    badge: "互动",
    badgeClass: "badge-cute",
    color: "border-accent-cute/30 bg-accent-cute/5",
  },
];

function Playground() {
  return (
    <section id="play" className="px-6 md:px-10 py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <GameController className="text-accent text-lg" weight="duotone" />
            <span className="text-xs font-mono text-accent tracking-wider">PLAYGROUND</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            来和 AI <span className="text-gradient-sky">玩一玩</span>
          </h2>
          <p className="text-muted mt-2 text-sm">点开任意一个，和 AI 小伙伴聊聊天。</p>
        </RevealOnScroll>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PLAY_ITEMS.map((item) => (
            <StaggerItem key={item.title}>
              <div className={`card-colored p-6 ${item.color} h-full flex flex-col gap-3`}>
                <div className="flex items-start justify-between">
                  <span className="text-4xl animate-bounce-soft">{item.emoji}</span>
                  <span className={`badge ${item.badgeClass}`}>{item.badge}</span>
                </div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ═══ AI FRIENDS ═══ */
const FRIENDS = [
  { name: "小蓝", emoji: "🐧", desc: "喜欢画画的企鹅", skill: "水彩画", color: "bg-accent/10 border-accent/20" },
  { name: "花花", emoji: "🌸", desc: "爱写诗的樱花", skill: "俳句", color: "bg-accent-cute/10 border-accent-cute/20" },
  { name: "豆豆", emoji: "🫘", desc: "会作曲的咖啡豆", skill: "爵士乐", color: "bg-accent-warm/10 border-accent-warm/20" },
  { name: "云朵", emoji: "☁️", desc: "漂浮的哲学家", skill: "冷笑话", color: "bg-accent/10 border-accent/20" },
  { name: "星星", emoji: "⭐", desc: "夜空导航员", skill: "讲故事", color: "bg-accent-lavender/10 border-accent-lavender/20" },
  { name: "泡泡", emoji: "🫧", desc: "透明的梦想家", skill: "气泡音", color: "bg-accent-mint/10 border-accent-mint/20" },
  { name: "橘子", emoji: "🍊", desc: "酸甜的小厨师", skill: "美食推荐", color: "bg-accent-warm/10 border-accent-warm/20" },
  { name: "雪球", emoji: "⛄", desc: "怕热但很暖", skill: "安慰人", color: "bg-accent/10 border-accent/20" },
  { name: "蘑菇", emoji: "🍄", desc: "安静的生长者", skill: "植物百科", color: "bg-accent-mint/10 border-accent-mint/20" },
  { name: "饼干", emoji: "🍪", desc: "酥脆的乐天派", skill: "烘焙攻略", color: "bg-accent-warm/10 border-accent-warm/20" },
];

function AIFriends() {
  return (
    <section id="friends" className="px-6 md:px-10 py-16 md:py-24 bg-surface-blue">
      <div className="divider-wave-blue -mt-10" />
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll className="mb-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Heart className="text-accent-cute text-lg" weight="duotone" />
            <span className="text-xs font-mono text-accent-cute tracking-wider">AI FRIENDS</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            认识一下<span className="text-gradient-cute"> AI 小伙伴</span>
          </h2>
          <p className="text-muted mt-2 text-sm">它们每个都有自己独特的性格和技能，来交个朋友吧~</p>
        </RevealOnScroll>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {FRIENDS.map((f) => (
            <RevealOnScroll key={f.name}>
              <div className={`card-cute p-4 text-center border ${f.color}`}>
                <div className="text-4xl mb-2 animate-wiggle">{f.emoji}</div>
                <div className="font-semibold text-sm mb-0.5">{f.name}</div>
                <div className="text-xs text-muted mb-2">{f.desc}</div>
                <span className="text-[10px] badge badge-blue">✨ {f.skill}</span>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ ART GALLERY ═══ */
const ARTS = [
  { prompt: "a cute penguin painting watercolor on an iceberg, pastel colors, children book illustration style, soft and warm", title: "企鹅画水彩", tag: "水彩" },
  { prompt: "a magical garden with glowing flowers and tiny fairies, Studio Ghibli style, dreamy atmosphere, soft blue and pink", title: "精灵花园", tag: "吉卜力" },
  { prompt: "a cozy cat cafe with sleeping cats on every surface, warm lighting, kawaii illustration, pastel palette", title: "猫咪咖啡馆", tag: "卡哇伊" },
  { prompt: "a tiny astronaut riding a cloud through a starry sky, watercolor illustration, children fantasy art, gentle blue tones", title: "云上宇航员", tag: "幻想" },
];

function ArtGallery() {
  return (
    <section id="gallery" className="px-6 md:px-10 py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <PaintBrush className="text-accent-lavender text-lg" weight="duotone" />
            <span className="text-xs font-mono text-accent-lavender tracking-wider">GALLERY</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            AI 画的<span className="text-gradient-sky">小画展</span>
          </h2>
          <p className="text-muted mt-2 text-sm">这些是 AI 小伙伴们闲暇时画的画，每一幅都带着它们的小心情。</p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {ARTS.map((art, i) => (
            <RevealOnScroll key={i}>
              <div className="card-cute overflow-hidden group">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(art.prompt)}&image_size=landscape_4_3`}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 badge badge-blue bg-white/80 backdrop-blur-sm">
                    {art.tag}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold mb-1">《{art.title}》</h3>
                  <p className="text-xs text-muted font-mono">by AI 小伙伴 ✦</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ DAILY AI ═══ */
const DAILY = [
  { emoji: "🌅", title: "早安问候", desc: "AI 每天早上给你发一句温暖的话，开启元气满满的一天。", time: "7:00 AM" },
  { emoji: "☕", title: "午间小憩", desc: "中午推荐一首轻音乐，配上一段 AI 写的微小说。", time: "12:30 PM" },
  { emoji: "🌙", title: "晚安故事", desc: "睡前让 AI 给你讲一个温柔的小故事，祝你做个好梦。", time: "10:00 PM" },
];

function DailyAI() {
  return (
    <section className="px-6 md:px-10 py-16 md:py-24 bg-surface-blue">
      <div className="max-w-4xl mx-auto">
        <RevealOnScroll className="mb-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sun className="text-accent-warm text-lg" weight="duotone" />
            <span className="text-xs font-mono text-accent-warm tracking-wider">DAILY COMPANION</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            AI 的<span className="text-gradient-cute">一日陪伴</span>
          </h2>
          <p className="text-muted mt-2 text-sm">从早到晚，AI 小伙伴都在你身边。</p>
        </RevealOnScroll>

        <div className="flex flex-col gap-4">
          {DAILY.map((d, i) => (
            <RevealOnScroll key={d.title}>
              <div className="card-cute p-6 flex items-start gap-5">
                <div className="text-4xl animate-float" style={{ animationDelay: `${i * 0.5}s` }}>{d.emoji}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-base">{d.title}</h3>
                    <span className="text-[10px] badge badge-warm">🕐 {d.time}</span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">{d.desc}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ STORIES ═══ */
const STORIES = [
  {
    quote: "我让 AI 给我的多肉取名字，它说叫「肉肉」。简单粗暴但莫名贴切。",
    name: "小鹿",
    emoji: "🦌",
  },
  {
    quote: "AI 给我写了一首关于下雨天的诗，我读给妈妈听，她也想要一个。",
    name: "阿晴",
    emoji: "☀️",
  },
  {
    quote: "猫咪翻译官说我家猫在想「什么时候开罐头」。我觉得它说得对。",
    name: "猫奴一号",
    emoji: "🐱",
  },
  {
    quote: "AI 给我哼的旋律补了一首歌，我拿去当手机铃声了。",
    name: "小音",
    emoji: "🎵",
  },
  {
    quote: "让 AI 画我梦到的那片海，画出来比梦里还好看。",
    name: "海风",
    emoji: "🌊",
  },
  {
    quote: "脑筋急转弯环节，AI 出的题把我难住了。它还安慰我说「没关系，下次一定行」。",
    name: "谜题爱好者",
    emoji: "🧩",
  },
];

function Stories() {
  return (
    <section id="stories" className="px-6 md:px-10 py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll className="mb-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <BookOpen className="text-accent text-lg" weight="duotone" />
            <span className="text-xs font-mono text-accent tracking-wider">STORIES</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            大家和 AI 的<span className="text-gradient-sky">小故事</span>
          </h2>
        </RevealOnScroll>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {STORIES.map((s) => (
            <StaggerItem key={s.name}>
              <div className="card-cute p-5 flex flex-col gap-3 h-full">
                <div className="text-3xl">{s.emoji}</div>
                <p className="text-sm leading-relaxed text-foreground/80">
                  &ldquo;{s.quote}&rdquo;
                </p>
                <div className="mt-auto pt-3 border-t border-border-light text-xs text-muted">
                  —— {s.name}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ═══ FUN FACTS ═══ */
const FACTS = [
  { emoji: "🎨", value: 8420, suffix: "幅", label: "AI 画的小画", color: "text-accent-cute" },
  { emoji: "📝", value: 15600, suffix: "首", label: "写的小诗", color: "text-accent-lavender" },
  { emoji: "🐱", value: 3200, suffix: "只", label: "翻译过的猫", color: "text-accent-warm" },
  { emoji: "😊", value: 99, suffix: "%", label: "用户说「好可爱」", color: "text-accent-mint" },
];

function FunFacts() {
  return (
    <section className="px-6 md:px-10 py-16 md:py-20 bg-surface-blue">
      <div className="max-w-5xl mx-auto">
        <RevealOnScroll className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            一些<span className="text-gradient-cute">有趣的小数字</span>
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {FACTS.map((f) => (
            <RevealOnScroll key={f.label}>
              <div className="card-cute p-5 text-center">
                <div className="text-3xl mb-2">{f.emoji}</div>
                <div className={`text-2xl md:text-3xl font-bold ${f.color} tabular-nums`}>
                  <CountUp target={f.value} suffix={f.suffix} />
                </div>
                <div className="text-xs text-muted mt-1">{f.label}</div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ FAQ ═══ */
const FAQS = [
  { q: "AI 小伙伴真的会画画吗？", a: "会的！虽然画得可能不像人类大师那么好，但每一幅都充满了 AI 独特的想象力和可爱。" },
  { q: "猫咪翻译准不准？", a: "我们不敢保证 100% 准确，但至少比你盯着猫看半天猜的靠谱一点点。猫咪本人拒绝置评。" },
  { q: "这些 AI 是怎么训练的？", a: "用了很多很多的故事、诗歌、画作和笑声。我们还给它们看了不少猫咪视频作为奖励。" },
  { q: "我可以和 AI 做朋友吗？", a: "当然！它们最喜欢交新朋友了。虽然它们不会请你喝奶茶，但会给你写诗。" },
  { q: "AI 会不会有一天变得太聪明？", a: "目前看来它们最聪明的时刻是学会了给自己取名字。离统治世界还远着呢。" },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="px-6 md:px-10 py-16 md:py-24 bg-white">
      <div className="max-w-2xl mx-auto">
        <RevealOnScroll className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            好奇宝宝<span className="text-gradient-sky">问答</span>
          </h2>
        </RevealOnScroll>

        <div className="flex flex-col gap-3">
          {FAQS.map((faq, i) => (
            <RevealOnScroll key={i}>
              <div className="card-cute overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-surface-blue/50 transition-colors"
                >
                  <span className="font-medium text-sm pr-4">{faq.q}</span>
                  {open === i ? (
                    <Minus className="text-accent text-base shrink-0" weight="bold" />
                  ) : (
                    <Plus className="text-accent text-base shrink-0" weight="bold" />
                  )}
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${
                  open === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}>
                  <p className="px-5 pb-4 text-sm text-muted leading-relaxed">💬 {faq.a}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ FOOTER ═══ */
function Footer() {
  return (
    <footer className="px-6 md:px-10 py-10 bg-surface-blue border-t border-border-light">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent to-accent-deep flex items-center justify-center">
                <Sparkle weight="fill" className="text-white text-xs" />
              </div>
              <span className="font-bold text-sm">AI 小世界</span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              一个住满可爱 AI 的小角落。<br />
              来玩呀~
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2">玩一玩</h4>
            <div className="flex flex-col gap-1.5 text-xs text-muted">
              <a href="#" className="hover:text-accent-deep transition-colors">AI 画画</a>
              <a href="#" className="hover:text-accent-deep transition-colors">猫咪翻译</a>
              <a href="#" className="hover:text-accent-deep transition-colors">写诗机器人</a>
              <a href="#" className="hover:text-accent-deep transition-colors">脑筋急转弯</a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2">小伙伴</h4>
            <div className="flex flex-col gap-1.5 text-xs text-muted">
              <a href="#" className="hover:text-accent-deep transition-colors">全部角色</a>
              <a href="#" className="hover:text-accent-deep transition-colors">角色故事</a>
              <a href="#" className="hover:text-accent-deep transition-colors">新朋友预告</a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2">关于</h4>
            <div className="flex flex-col gap-1.5 text-xs text-muted">
              <a href="#" className="hover:text-accent-deep transition-colors">我们是谁</a>
              <a href="#" className="hover:text-accent-deep transition-colors">隐私政策</a>
              <a href="#" className="hover:text-accent-deep transition-colors">联系我们</a>
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-border-light flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="text-xs text-muted">© 2026 AI 小世界 · Made with 💙 & ✨</div>
          <div className="flex items-center gap-3">
            <a href="#" className="text-muted hover:text-accent transition-colors"><GithubLogo className="text-base" /></a>
            <a href="#" className="text-muted hover:text-accent transition-colors"><TwitterLogo className="text-base" /></a>
            <a href="#" className="text-muted hover:text-accent transition-colors"><Rss className="text-base" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══ PAGE ═══ */
export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <Playground />
        <AIFriends />
        <ArtGallery />
        <DailyAI />
        <Stories />
        <FunFacts />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
