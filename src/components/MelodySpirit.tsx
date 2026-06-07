"use client";

import { useState, useRef, useCallback, useEffect } from "react";

type Mood = "开心" | "安静" | "怀旧" | "奇幻";
type Tempo = "慢板" | "行板" | "快板";

interface NoteInfo {
  freq: number;
  name: string;
}

const MOODS: { key: Mood; emoji: string; scale: NoteInfo[] }[] = [
  {
    key: "开心",
    emoji: "😊",
    scale: [
      { freq: 261.63, name: "C" },
      { freq: 293.66, name: "D" },
      { freq: 329.63, name: "E" },
      { freq: 392.0, name: "G" },
      { freq: 440.0, name: "A" },
    ],
  },
  {
    key: "安静",
    emoji: "🌙",
    scale: [
      { freq: 220.0, name: "A" },
      { freq: 261.63, name: "C" },
      { freq: 293.66, name: "D" },
      { freq: 329.63, name: "E" },
      { freq: 392.0, name: "G" },
    ],
  },
  {
    key: "怀旧",
    emoji: "🍂",
    scale: [
      { freq: 293.66, name: "D" },
      { freq: 329.63, name: "E" },
      { freq: 349.23, name: "F" },
      { freq: 392.0, name: "G" },
      { freq: 440.0, name: "A" },
      { freq: 466.16, name: "Bb" },
    ],
  },
  {
    key: "奇幻",
    emoji: "✨",
    scale: [
      { freq: 261.63, name: "C" },
      { freq: 293.66, name: "D" },
      { freq: 329.63, name: "E" },
      { freq: 369.99, name: "F#" },
      { freq: 415.3, name: "G#" },
      { freq: 466.16, name: "A#" },
    ],
  },
];

const TEMPO_MAP: Record<Tempo, number> = {
  慢板: 400,
  行板: 250,
  快板: 150,
};

function getWaveform(mood: Mood): OscillatorType {
  if (mood === "怀旧") return "triangle";
  return "sine";
}

function generateMelody(mood: Mood): NoteInfo[] {
  const moodData = MOODS.find((m) => m.key === mood)!;
  const count = 12 + Math.floor(Math.random() * 5);
  return Array.from({ length: count }, () => {
    const idx = Math.floor(Math.random() * moodData.scale.length);
    return { ...moodData.scale[idx] };
  });
}

export function MelodySpirit() {
  const [mood, setMood] = useState<Mood>("开心");
  const [tempo, setTempo] = useState<Tempo>("行板");
  const [melody, setMelody] = useState<NoteInfo[]>([]);
  const [playing, setPlaying] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(-1);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const timersRef = useRef<number[]>([]);
  const playingRef = useRef(false);

  const stopPlayback = useCallback(() => {
    playingRef.current = false;
    setPlaying(false);
    setCurrentIdx(-1);
    timersRef.current.forEach((id) => clearTimeout(id));
    timersRef.current = [];
  }, []);

  const playMelody = useCallback(() => {
    if (melody.length === 0) return;

    stopPlayback();
    playingRef.current = true;
    setPlaying(true);

    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    const duration = TEMPO_MAP[tempo] / 1000;
    const waveform = getWaveform(mood);
    const isFantasy = mood === "奇幻";

    melody.forEach((note, i) => {
      const tid = window.setTimeout(() => {
        if (!playingRef.current) return;

        setCurrentIdx(i);

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = waveform;
        osc.frequency.value = note.freq;

        if (isFantasy) {
          osc.detune.value = Math.random() * 12 - 6;
        }

        const attack = duration * 0.05;
        const decay = duration * 0.1;
        const sustainLevel = 0.3;
        const release = duration * 0.15;
        const sustainEnd = duration - release;

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + attack);
        gain.gain.linearRampToValueAtTime(
          0.15 * sustainLevel,
          ctx.currentTime + attack + decay
        );
        gain.gain.setValueAtTime(
          0.15 * sustainLevel,
          ctx.currentTime + sustainEnd
        );
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + duration);
      }, i * TEMPO_MAP[tempo]);

      timersRef.current.push(tid);
    });

    const endTid = window.setTimeout(() => {
      stopPlayback();
    }, melody.length * TEMPO_MAP[tempo] + 100);
    timersRef.current.push(endTid);
  }, [melody, tempo, mood, stopPlayback]);

  const handleGenerate = useCallback(() => {
    stopPlayback();
    setMelody(generateMelody(mood));
  }, [mood, stopPlayback]);

  const handlePlayStop = useCallback(() => {
    if (playing) {
      stopPlayback();
    } else {
      playMelody();
    }
  }, [playing, playMelody, stopPlayback]);

  useEffect(() => {
    return () => {
      playingRef.current = false;
      timersRef.current.forEach((id) => clearTimeout(id));
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
    };
  }, []);

  return (
    <div className="card-cute bg-sky-100 p-6 max-w-[480px] mx-auto">
      <h3 className="text-center mb-4 text-lg font-semibold">
        🎵 旋律精灵
      </h3>

      {/* Mood selection */}
      <div className="mb-4">
        <div className="text-[13px] mb-2 text-gray-500">选择心情</div>
        <div className="flex gap-2" role="group" aria-label="选择心情">
          {MOODS.map((m) => (
            <button
              key={m.key}
              onClick={() => setMood(m.key)}
              aria-pressed={mood === m.key}
              className={`
                flex-1 py-2 px-1 rounded-xl border text-[13px] transition-all duration-200 cursor-pointer
                ${mood === m.key
                  ? "border-2 border-emerald-400 bg-emerald-400/10 font-semibold"
                  : "border border-blue-100 bg-white font-normal"
                }
              `}
            >
              {m.emoji} {m.key}
            </button>
          ))}
        </div>
      </div>

      {/* Tempo selection */}
      <div className="mb-4">
        <div className="text-[13px] mb-2 text-gray-500">选择速度</div>
        <div className="flex gap-2" role="group" aria-label="选择速度">
          {(["慢板", "行板", "快板"] as Tempo[]).map((t) => (
            <button
              key={t}
              onClick={() => setTempo(t)}
              aria-pressed={tempo === t}
              className={`
                flex-1 py-2 px-1 rounded-xl border text-[13px] transition-all duration-200 cursor-pointer
                ${tempo === t
                  ? "border-2 border-sky-400 bg-sky-400/10 font-semibold"
                  : "border border-blue-100 bg-white font-normal"
                }
              `}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Generate button */}
      <button
        onClick={handleGenerate}
        className="block w-full py-2.5 rounded-[14px] border-none bg-gradient-to-r from-sky-400 to-emerald-400 text-white text-[15px] font-semibold cursor-pointer mb-4 hover:opacity-90 active:opacity-80 transition-opacity"
      >
        生成旋律
      </button>

      {/* Note display */}
      {melody.length > 0 && (
        <div className="flex justify-center gap-1.5 flex-wrap mb-4 min-h-[40px]" aria-label="音符序列">
          {melody.map((note, i) => {
            const isCurrent = i === currentIdx;
            return (
              <div
                key={i}
                className={`
                  w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold
                  border transition-all duration-150
                  ${isCurrent
                    ? "bg-sky-400 text-white border-sky-400 -translate-y-1.5"
                    : "bg-white text-gray-500 border-blue-100"
                  }
                `}
              >
                {note.name}
              </div>
            );
          })}
        </div>
      )}

      {/* Play / Stop */}
      {melody.length > 0 && (
        <div className="flex justify-center">
          <button
            onClick={handlePlayStop}
            aria-label={playing ? "停止播放" : "播放旋律"}
            className={`
              w-12 h-12 rounded-full border-2 border-blue-100 flex items-center justify-center
              text-lg transition-all duration-200 cursor-pointer
              ${playing ? "bg-amber-100" : "bg-white hover:bg-sky-50"}
            `}
          >
            {playing ? "⏸" : "▶"}
          </button>
        </div>
      )}
    </div>
  );
}
