import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HangulLab from './components/HangulLab';
import Vocabulary from './components/Vocabulary';
import Grammar from './components/Grammar';
import Culture from './components/Culture';
import Practice from './components/Practice';
import Wellness from './components/Wellness';
type Section = 'home' | 'hangul' | 'vocabulary' | 'grammar' | 'culture' | 'practice' | 'wellness';
const NAV: { key: Section; label: string; emoji: string; grad: string }[] = [
  { key: 'home', label: 'Home', emoji: '🏠', grad: 'from-slate-500 to-slate-600' },
  { key: 'hangul', label: 'Hangul', emoji: '🔤', grad: 'from-indigo-500 to-blue-600' },
  { key: 'vocabulary', label: 'Vocab', emoji: '📚', grad: 'from-rose-500 to-pink-600' },
  { key: 'grammar', label: 'Grammar', emoji: '📝', grad: 'from-emerald-500 to-teal-600' },
  { key: 'culture', label: 'Culture', emoji: '🌏', grad: 'from-amber-500 to-orange-600' },
  { key: 'practice', label: 'Practice', emoji: '🎯', grad: 'from-purple-500 to-indigo-600' },
  { key: 'wellness', label: 'Wellness', emoji: '🧘', grad: 'from-teal-500 to-cyan-600' },
];
interface Progress {
  visited: Record<string, boolean>;
  totalVisits: number;
}
const STORAGE_KEY = 'korean-master-progress';
const load = (): Progress => {
  try { const d = localStorage.getItem(STORAGE_KEY); if (d) return JSON.parse(d); } catch { /* */ }
  return { visited: {}, totalVisits: 0 };
};
const save = (p: Progress) => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch { /* */ } };
const SECTIONS: { key: Section; title: string; sub: string; emoji: string; grad: string }[] = [
  { key: 'hangul', title: 'Hangul Lab', sub: 'Learn the Korean alphabet', emoji: '🔤', grad: 'from-indigo-500 to-blue-600' },
  { key: 'vocabulary', title: 'Vocabulary', sub: '90+ words & phrases across 7 categories', emoji: '📚', grad: 'from-rose-500 to-pink-600' },
  { key: 'grammar', title: 'Grammar Guide', sub: 'SOV, particles, politeness & more', emoji: '📝', grad: 'from-emerald-500 to-teal-600' },
  { key: 'culture', title: 'Culture Corner', sub: '9 deep cultural topics with Filipino parallels', emoji: '🌏', grad: 'from-amber-500 to-orange-600' },
  { key: 'practice', title: 'Practice Zone', sub: 'No-pressure quizzes', emoji: '🎯', grad: 'from-purple-500 to-indigo-600' },
  { key: 'wellness', title: 'Wellness Corner', sub: 'Breathing, tips & affirmations', emoji: '🧘', grad: 'from-teal-500 to-cyan-600' },
];
const PROVERBS = [
  { kr: '아는 것이 힘이다', rom: 'aneun geosi himida', en: 'Knowledge is power.', ph: 'Ang kaalaman ay kapangyarihan.' },
  { kr: '천 리 길도 한 걸음부터', rom: 'cheon ri gildo han georeumbuteo', en: 'A 1,000-li journey begins with one step.', ph: 'Ang paglalakbay na sanlibong milya ay nagsisimula sa isang hakbang.' },
  { kr: '시작이 반이다', rom: 'sijagi banida', en: 'Starting is half the task.', ph: 'Ang pagsisimula ay kalahati ng gawain.' },
  { kr: '고생 끝에 낙이 온다', rom: 'gosaeng kkute nagi onda', en: 'After hardship comes happiness.', ph: 'Pagkatapos ng hirap, darating ang ginhawa.' },
];
function Dashboard({ go, progress }: { go: (s: Section) => void; progress: Progress }) {
  const explored = SECTIONS.filter((s) => progress.visited[s.key]).length;
  const [pi] = useState(() => Math.floor(Math.random() * PROVERBS.length));
  const proverb = PROVERBS[pi];
  return (
    <div className="space-y-6">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-rose-500 p-6 sm:p-8 text-white shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10">
          <motion.div initial={{ scale: 0.7 }} animate={{ scale: 1 }} transition={{ delay: 0.15, type: 'spring' }} className="text-4xl sm:text-5xl mb-3">🇰🇷</motion.div>
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-1"><span className="shimmer-text">한국어 마스터</span></h1>
          <h2 className="text-lg sm:text-xl font-semibold opacity-90 mb-3">Korean Language & Culture</h2>
          <p className="text-sm opacity-80 leading-relaxed max-w-lg">
            A complete learning journey built for Filipino-English bilingual speakers.
            Hangul, vocabulary, grammar, culture — all with Filipino connections and wellness support.
          </p>
          <div className="mt-4 flex gap-2 flex-wrap">
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">🇵🇭 Filipino Hints</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">🧘 MDD-Friendly</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">📊 Progress Tracking</span>
          </div>
        </div>
      </motion.div>
      {/* Progress */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-slate-800">Your Progress</h3>
          <span className="text-sm text-indigo-500 font-bold">{explored}/{SECTIONS.length} explored</span>
        </div>
        <div className="h-3 bg-slate-100 rounded-full overflow-hidden mb-3">
          <motion.div initial={{ width: 0 }} animate={{ width: `${(explored / SECTIONS.length) * 100}%` }} transition={{ duration: 0.8, delay: 0.2 }}
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
        </div>
        <div className="flex gap-1.5">
          {SECTIONS.map((s) => (
            <div key={s.key} className={`flex-1 h-2 rounded-full transition-colors ${progress.visited[s.key] ? `bg-gradient-to-r ${s.grad}` : 'bg-slate-100'}`} title={s.title} />
          ))}
        </div>
        {progress.totalVisits > 0 && (
          <p className="text-xs text-slate-400 mt-2">
            Sessions: {progress.totalVisits} {explored === SECTIONS.length ? '• All explored! 🎉' : ''}
          </p>
        )}
      </motion.div>
      {/* Proverb */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="glass rounded-2xl p-5 border-l-4 border-indigo-400"
      >
        <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider mb-2">Korean Proverb — 속담</div>
        <div className="text-xl font-bold text-slate-800 mb-1">{proverb.kr}</div>
        <div className="text-sm text-indigo-500 font-mono mb-2">{proverb.rom}</div>
        <div className="text-sm text-slate-600">🇺🇸 {proverb.en}</div>
        <div className="text-sm text-slate-600">🇵🇭 {proverb.ph}</div>
      </motion.div>
      {/* Section cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SECTIONS.map((s, i) => (
          <motion.button key={s.key}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + i * 0.05 }}
            whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}
            onClick={() => go(s.key)}
            className="text-left glass rounded-2xl p-5 hover:shadow-lg hover:bg-white transition-all group relative overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${s.grad} opacity-10 rounded-bl-[40px] group-hover:opacity-20 transition-opacity`} />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{s.emoji}</span>
                <div className="min-w-0">
                  <h4 className="font-bold text-slate-800">{s.title}</h4>
                  <p className="text-xs text-slate-400 truncate">{s.sub}</p>
                </div>
              </div>
              {progress.visited[s.key] && (
                <span className="inline-block text-[10px] bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full font-bold">✓ Explored</span>
              )}
            </div>
          </motion.button>
        ))}
      </div>
      {/* Filipino advantage */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="glass rounded-3xl p-6">
        <h3 className="font-bold text-slate-800 mb-3">🇵🇭 Why This Works for Filipino Speakers</h3>
        <div className="space-y-2.5 text-sm text-slate-600">
          {[
            ['Shared respect culture', 'Filipino "po/opo" maps directly to Korean 존댓말 (honorific speech levels).'],
            ['Similar sounds', 'Filipino\'s "ng" sound, flapped "r," and open vowels already exist in Korean.'],
            ['Family terms', '"Kuya/Ate" parallels Korean 오빠/언니/형/누나 perfectly.'],
            ['Bilingual advantage', 'Research shows bilinguals learn 3rd languages ~30-40% faster (Cenoz & Valencia, 1994).'],
            ['Cultural proximity', 'Philippines is one of the largest Hallyu consumer markets — constant immersion.'],
          ].map(([title, desc], i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-indigo-500 mt-0.5 flex-shrink-0">✦</span>
              <span><strong>{title}</strong> — {desc}</span>
            </div>
          ))}
        </div>
      </motion.div>
      {/* Recommended path */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="glass rounded-2xl p-5 text-center">
        <p className="text-sm text-slate-500">
          Recommended: <strong className="text-indigo-600">Hangul → Vocab → Grammar → Culture → Practice</strong>
        </p>
        <p className="text-xs text-slate-400 mt-1">Visit Wellness anytime you need a pause. 💜</p>
      </motion.div>
    </div>
  );
}
export function App() {
  const [section, setSection] = useState<Section>('home');
  const [progress, setProgress] = useState<Progress>(load);
  useEffect(() => {
    if (section === 'home') return;
    setProgress((prev) => {
      const next = { visited: { ...prev.visited, [section]: true }, totalVisits: prev.totalVisits + 1 };
      save(next);
      return next;
    });
  }, [section]);
  const go = (s: Section) => { setSection(s); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/40 to-rose-50/30">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-white/30">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => go('home')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-xl">🇰🇷</span>
            <span className="font-extrabold text-slate-800 text-sm sm:text-base">한국어 마스터</span>
          </button>
          {section !== 'home' && (
            <motion.button initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
              onClick={() => go('home')}
              className="text-xs sm:text-sm text-indigo-500 font-bold hover:text-indigo-700 transition-colors flex items-center gap-1"
            >← Home</motion.button>
          )}
        </div>
      </header>
      {/* Nav */}
      <nav className="sticky top-[52px] z-40 bg-white/60 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-3xl mx-auto overflow-x-auto scrollbar-none">
          <div className="flex gap-1 px-3 py-2 min-w-max">
            {NAV.map((n) => (
              <button key={n.key} onClick={() => go(n.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 flex items-center gap-1 ${
                  section === n.key
                    ? `bg-gradient-to-r ${n.grad} text-white shadow-md`
                    : 'text-slate-500 hover:bg-white/80 hover:text-slate-700'
                }`}
              >
                <span>{n.emoji}</span>
                <span className="hidden sm:inline">{n.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-6 pb-24">
        <AnimatePresence mode="wait">
          <motion.div key={section} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
            {section === 'home' && <Dashboard go={go} progress={progress} />}
            {section === 'hangul' && <HangulLab />}
            {section === 'vocabulary' && <Vocabulary />}
            {section === 'grammar' && <Grammar />}
            {section === 'culture' && <Culture />}
            {section === 'practice' && <Practice />}
            {section === 'wellness' && <Wellness />}
          </motion.div>
        </AnimatePresence>
      </main>
      {/* Footer */}
      <footer className="glass border-t border-white/30 py-4 text-center text-xs text-slate-400">
        <div className="max-w-3xl mx-auto px-4 space-y-0.5">
          <p>한국어 마스터 — Built for Filipino-English bilingual learners</p>
          <p>Romanization: Revised Romanization (국립국어원) • Hangul: King Sejong the Great, 1443</p>
        </div>
      </footer>
    </div>
  );
}
