import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { wellnessTips, affirmations } from '../data/koreanData';
type Phase = 'idle' | 'inhale' | 'hold' | 'exhale' | 'holdOut';
type WellnessTab = 'breathe' | 'tips' | 'affirm' | 'pomodoro' | 'ground';
const CYCLE = [
  { phase: 'inhale' as Phase, label: 'Breathe In', dur: 4000, kr: '들이쉬세요', rom: 'deuriswiiseyo' },
  { phase: 'hold' as Phase, label: 'Hold', dur: 4000, kr: '멈추세요', rom: 'meomchuseyo' },
  { phase: 'exhale' as Phase, label: 'Breathe Out', dur: 4000, kr: '내쉬세요', rom: 'naeswiiseyo' },
  { phase: 'holdOut' as Phase, label: 'Hold', dur: 4000, kr: '멈추세요', rom: 'meomchuseyo' },
];
function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}
export default function Wellness() {
  const [tab, setTab] = useState<WellnessTab>('breathe');
  // ─── BREATHING ───
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState<Phase>('idle');
  const [step, setStep] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [cd, setCd] = useState(4);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cdRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const clear = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    if (cdRef.current) clearInterval(cdRef.current);
  }, []);
  useEffect(() => {
    if (!running) { clear(); setPhase('idle'); setStep(0); setCd(4); return; }
    const s = CYCLE[step];
    setPhase(s.phase); setCd(s.dur / 1000);
    cdRef.current = setInterval(() => setCd(c => (c <= 1 ? s.dur / 1000 : c - 1)), 1000);
    timer.current = setTimeout(() => { const ns = (step + 1) % CYCLE.length; setStep(ns); if (ns === 0) setCycles(c => c + 1); }, s.dur);
    return clear;
  }, [running, step, clear]);
  // ─── POMODORO ───
  const [pomTime, setPomTime] = useState(10 * 60); // 10 min for gentle sessions
  const [pomRunning, setPomRunning] = useState(false);
  const [pomLeft, setPomLeft] = useState(10 * 60);
  const [pomDone, setPomDone] = useState(false);
  const pomRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    if (!pomRunning) { if (pomRef.current) clearInterval(pomRef.current); return; }
    pomRef.current = setInterval(() => {
      setPomLeft(prev => {
        if (prev <= 1) { setPomRunning(false); setPomDone(true); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => { if (pomRef.current) clearInterval(pomRef.current); };
  }, [pomRunning]);
  const resetPom = (mins: number) => {
    setPomTime(mins * 60); setPomLeft(mins * 60); setPomRunning(false); setPomDone(false);
  };
  // ─── AFFIRMATIONS ───
  const [affIdx, setAffIdx] = useState(0);
  // ─── GROUNDING ───
  const [groundStep, setGroundStep] = useState(0);
  const groundSteps = [
    { count: 5, sense: 'SEE', kr: '보다', rom: 'boda', desc: 'Name 5 things you can see right now.', emoji: '👀' },
    { count: 4, sense: 'TOUCH', kr: '만지다', rom: 'manjida', desc: 'Name 4 things you can touch/feel.', emoji: '✋' },
    { count: 3, sense: 'HEAR', kr: '듣다', rom: 'deutda', desc: 'Name 3 things you can hear.', emoji: '👂' },
    { count: 2, sense: 'SMELL', kr: '맡다', rom: 'matda', desc: 'Name 2 things you can smell.', emoji: '👃' },
    { count: 1, sense: 'TASTE', kr: '맛보다', rom: 'matboda', desc: 'Name 1 thing you can taste.', emoji: '👅' },
  ];
  const scale = phase === 'inhale' ? 1.5 : phase === 'hold' ? 1.5 : 1;
  const cur = phase !== 'idle' ? CYCLE[step] : null;
  const tabItems: { key: WellnessTab; label: string; emoji: string; bg: string }[] = [
    { key: 'breathe', label: 'Breathe', emoji: '🫁', bg: 'bg-teal-500' },
    { key: 'pomodoro', label: 'Timer', emoji: '⏱️', bg: 'bg-rose-500' },
    { key: 'ground', label: 'Ground', emoji: '🌿', bg: 'bg-emerald-500' },
    { key: 'tips', label: 'Tips', emoji: '💡', bg: 'bg-amber-500' },
    { key: 'affirm', label: 'Affirm', emoji: '💜', bg: 'bg-purple-500' },
  ];
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-3xl p-6">
        <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white mb-2">🧘 Wellness Corner — 건강</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
          Learning while managing MDD with anxious distress takes real courage. This space supports your
          well-being. Everything is gentle, optional, and backed by research. You are brave for being here. 💜
        </p>
      </motion.div>
      {/* Tabs */}
      <div className="flex gap-1.5 overflow-x-auto scrollbar-none">
        {tabItems.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`flex-1 min-w-0 py-2 rounded-xl text-xs font-bold transition-all ${
              tab === t.key ? `${t.bg} text-white shadow-lg` : 'glass text-slate-600 dark:text-slate-300'
            }`}
          >{t.emoji}<span className="hidden sm:inline ml-1">{t.label}</span></button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        {/* ─── BREATHE ─── */}
        {tab === 'breathe' && (
          <motion.div key="breathe" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <div className="glass rounded-3xl p-6 sm:p-8">
              <h3 className="font-bold text-slate-800 dark:text-white mb-1 text-center">Box Breathing (4-4-4-4)</h3>
              <p className="text-xs text-slate-500 text-center mb-6">Activates the parasympathetic nervous system. Used in clinical therapy & by Navy SEALs.</p>
              <div className="flex justify-center mb-6">
                <div className="relative w-52 h-52 flex items-center justify-center">
                  {[0, 4, 8].map(inset => (
                    <motion.div key={inset} className="absolute rounded-full bg-gradient-to-br from-teal-300 to-blue-400"
                      style={{ inset: `${inset * 4}px`, opacity: 0.15 + inset * 0.05 }}
                      animate={{ scale: running ? scale : 1 }}
                      transition={{ duration: phase === 'idle' ? 0.5 : 4, ease: 'easeInOut' }} />
                  ))}
                  <div className="relative z-10 text-center">
                    {running && cur ? (
                      <><div className="text-3xl font-bold text-teal-700 dark:text-teal-400">{cd}</div>
                      <div className="text-sm font-semibold text-teal-600 dark:text-teal-300">{cur.label}</div>
                      <div className="text-xs text-teal-500">{cur.kr}</div>
                      <div className="text-[10px] text-teal-400 font-mono">{cur.rom}</div></>
                    ) : <div className="text-sm text-slate-500">Tap Start</div>}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <button onClick={() => { if (running) { setRunning(false); setCycles(0); } else setRunning(true); }}
                  className={`px-8 py-3 rounded-2xl font-bold transition-all ${running ? 'bg-slate-200 text-slate-600' : 'bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-lg shadow-teal-200 hover:shadow-xl'}`}
                >{running ? 'Stop' : 'Start Breathing'}</button>
                {cycles > 0 && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-teal-600">Cycles: {cycles} 🌿</motion.p>}
              </div>
            </div>
          </motion.div>
        )}
        {/* ─── POMODORO ─── */}
        {tab === 'pomodoro' && (
          <motion.div key="pom" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <div className="glass rounded-3xl p-6 sm:p-8 text-center">
              <h3 className="font-bold text-slate-800 dark:text-white mb-1">⏱️ Gentle Study Timer</h3>
              <p className="text-xs text-slate-500 mb-6">Shorter sessions are more effective for learning. Pick a gentle duration.</p>
              {/* Duration options */}
              <div className="flex gap-2 justify-center mb-6">
                {[5, 10, 15, 20, 25].map(m => (
                  <button key={m} onClick={() => resetPom(m)}
                    className={`w-12 h-12 rounded-xl text-sm font-bold transition-all ${pomTime === m * 60 ? 'bg-rose-500 text-white shadow-md' : 'glass text-slate-600 dark:text-slate-300'}`}
                  >{m}m</button>
                ))}
              </div>
              {/* Timer display */}
              <div className="relative w-48 h-48 mx-auto mb-6">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" className="text-slate-100 dark:text-slate-700" strokeWidth="6" />
                  <motion.circle cx="50" cy="50" r="44" fill="none" stroke="url(#pomGrad)" strokeWidth="6" strokeLinecap="round"
                    strokeDasharray={276.46} strokeDashoffset={276.46 * (1 - pomLeft / pomTime)}
                    transition={{ duration: 0.5 }}
                  />
                  <defs><linearGradient id="pomGrad"><stop offset="0%" stopColor="#f43f5e" /><stop offset="100%" stopColor="#ec4899" /></linearGradient></defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-3xl font-bold text-slate-800 dark:text-white font-mono">{formatTime(pomLeft)}</div>
                  <div className="text-xs text-slate-500">{pomDone ? '🎉 Done!' : pomRunning ? 'Studying...' : 'Ready'}</div>
                </div>
              </div>
              <div className="flex gap-3 justify-center">
                <button onClick={() => { if (pomDone) { resetPom(pomTime / 60); } else setPomRunning(!pomRunning); }}
                  className={`px-8 py-3 rounded-2xl font-bold transition-all ${
                    pomRunning ? 'bg-slate-200 text-slate-600' : 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg'
                  }`}
                >{pomDone ? 'Reset' : pomRunning ? 'Pause' : 'Start'}</button>
              </div>
              {pomDone && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-sm text-emerald-600 dark:text-emerald-400 font-bold">
                  ✅ Great session! 잘했어요! Take a break — you earned it.
                </motion.div>
              )}
              <div className="mt-4 text-xs text-slate-400">
                💡 Pomodoro research (Cirillo, 2006): short focused sessions with breaks improve concentration and reduce burnout.
              </div>
            </div>
          </motion.div>
        )}
        {/* ─── GROUNDING ─── */}
        {tab === 'ground' && (
          <motion.div key="ground" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <div className="glass rounded-3xl p-6 sm:p-8">
              <h3 className="font-bold text-slate-800 dark:text-white mb-1 text-center">🌿 5-4-3-2-1 Grounding</h3>
              <p className="text-xs text-slate-500 text-center mb-2">
                A clinical technique for anxiety. Uses your senses to anchor you to the present moment.
              </p>
              <p className="text-[10px] text-slate-400 text-center mb-6">
                (Ackerman, 2017 — used in CBT for anxious distress)
              </p>
              {/* Steps */}
              <div className="space-y-3 mb-6">
                {groundSteps.map((gs, i) => {
                  const isActive = groundStep === i;
                  const isDone = groundStep > i;
                  return (
                    <motion.button key={i}
                      onClick={() => setGroundStep(i)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className={`w-full text-left p-4 rounded-2xl transition-all ${
                        isActive ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg' :
                        isDone ? 'glass border-2 border-emerald-200 dark:border-emerald-800 opacity-70' :
                        'glass opacity-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{gs.emoji}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm">{gs.count} things you can {gs.sense}</span>
                            {isDone && <span className="text-emerald-500 text-xs">✓</span>}
                          </div>
                          <div className="text-xs opacity-80">{gs.desc}</div>
                          <div className={`text-[10px] mt-0.5 ${isActive ? 'text-white/70' : 'text-indigo-500'}`}>
                            Korean: {gs.kr} ({gs.rom})
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
              <div className="flex gap-2 justify-center">
                <button onClick={() => setGroundStep(Math.max(0, groundStep - 1))}
                  disabled={groundStep === 0}
                  className="px-4 py-2 glass rounded-xl text-sm font-bold text-slate-600 disabled:opacity-30">← Back</button>
                <button onClick={() => setGroundStep(Math.min(4, groundStep + 1))}
                  disabled={groundStep === 4}
                  className="px-6 py-2 bg-emerald-500 text-white rounded-xl font-bold disabled:opacity-30">
                  {groundStep === 4 ? '✓ Complete' : 'Next →'}
                </button>
              </div>
              {groundStep === 4 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-center">
                  <div className="text-sm text-emerald-600 dark:text-emerald-400 font-bold">🌿 잘했어요! You are grounded. You are present. You are safe.</div>
                  <button onClick={() => setGroundStep(0)} className="mt-2 text-xs text-slate-400 hover:text-slate-600">Reset exercise</button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
        {/* ─── TIPS ─── */}
        {tab === 'tips' && (
          <motion.div key="tips" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-3">
            {wellnessTips.map((tip, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">{tip.emoji}</span>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white mb-1 text-sm">{tip.title}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{tip.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            <div className="glass rounded-2xl p-4 text-center text-sm text-slate-500 border-2 border-dashed border-slate-200 dark:border-slate-700">
              <strong>Remember:</strong> You are not falling behind. You are learning something extraordinary while managing something difficult. That takes immense strength. 💜
            </div>
          </motion.div>
        )}
        {/* ─── AFFIRMATIONS ─── */}
        {tab === 'affirm' && (
          <motion.div key="affirm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
            <div className="glass rounded-3xl p-8 text-center">
              <motion.div className="text-6xl mb-6" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>💜</motion.div>
              <AnimatePresence mode="wait">
                <motion.p key={affIdx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  className="text-xl sm:text-2xl font-bold text-slate-700 dark:text-slate-200 leading-relaxed mb-8 min-h-[80px] flex items-center justify-center"
                >&ldquo;{affirmations[affIdx]}&rdquo;</motion.p>
              </AnimatePresence>
              <button onClick={() => setAffIdx(i => (i + 1) % affirmations.length)}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-2xl font-bold shadow-lg shadow-purple-200 hover:shadow-xl transition-all"
              >Next Affirmation ✨</button>
              <div className="mt-4 flex justify-center gap-1.5">
                {affirmations.map((_, i) => (
                  <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === affIdx ? 'bg-purple-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
                ))}
              </div>
            </div>
            <div className="glass rounded-2xl p-5">
              <h4 className="font-bold text-slate-800 dark:text-white mb-3">🌱 Korean Affirmations</h4>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 text-center mb-3 border border-purple-100 dark:border-purple-800">
                <div className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-1">나는 할 수 있어요</div>
                <div className="text-sm text-purple-500 font-mono">naneun hal su isseoyo</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">&ldquo;I can do it.&rdquo; — Kaya ko ito.</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { kr: '괜찮아요', rom: 'gwaenchanayo', en: "It's okay.", ph: 'Okay lang.' },
                  { kr: '잘하고 있어요', rom: 'jalhago isseoyo', en: "You're doing well.", ph: 'Magaling ka.' },
                  { kr: '쉬어도 돼요', rom: 'swieodo dwaeyo', en: "It's okay to rest.", ph: 'Pwede kang magpahinga.' },
                  { kr: '천천히 가요', rom: 'cheoncheonhi gayo', en: "Let's go slowly.", ph: 'Dahan-dahan lang.' },
                  { kr: '넌 혼자가 아니야', rom: 'neon honjaga aniya', en: "You're not alone.", ph: 'Hindi ka nag-iisa.' },
                  { kr: '내일은 더 좋은 날', rom: 'naeireun deo joeun nal', en: 'Tomorrow will be better.', ph: 'Mas maganda ang bukas.' },
                ].map((item, i) => (
                  <div key={i} className="bg-white/60 dark:bg-slate-800/60 rounded-xl p-3">
                    <div className="font-bold text-slate-800 dark:text-white">{item.kr}</div>
                    <div className="text-xs text-indigo-500 font-mono">{item.rom}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{item.en} — {item.ph}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
