import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { vocabularyCategories, wordOfDay, type VocabItem } from '../data/koreanData';
const categories = Object.keys(vocabularyCategories);
type LevelFilter = 'all' | 'beginner' | 'intermediate' | 'advanced';
export default function Vocabulary() {
  const [category, setCategory] = useState(categories[0]);
  const [flipped, setFlipped] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState<LevelFilter>('all');
  const [masteredWords, setMasteredWords] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem('kr-mastered');
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch { return new Set(); }
  });
  const toggleMastered = (word: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMasteredWords(prev => {
      const next = new Set(prev);
      if (next.has(word)) next.delete(word); else next.add(word);
      localStorage.setItem('kr-mastered', JSON.stringify([...next]));
      return next;
    });
  };
  const cat = vocabularyCategories[category];
  const filtered = useMemo(() => {
    let items = cat.items;
    if (levelFilter !== 'all') items = items.filter(w => w.level === levelFilter);
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(w =>
        w.korean.includes(search) || w.romanization.toLowerCase().includes(q) ||
        w.english.toLowerCase().includes(q) || w.filipino.toLowerCase().includes(q)
      );
    }
    return items;
  }, [cat.items, levelFilter, search]);
  const totalWords = Object.values(vocabularyCategories).reduce((a, c) => a + c.items.length, 0);
  const masteredCount = masteredWords.size;
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-3xl p-6">
        <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white mb-2">📚 Vocabulary — 어휘</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          <strong>{totalWords} words</strong> across {categories.length} categories. Tap to flip, star to mark as mastered.
        </p>
        {/* Progress */}
        <div className="mt-3 flex items-center gap-3">
          <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${totalWords ? (masteredCount / totalWords) * 100 : 0}%` }}
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full" />
          </div>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{masteredCount}/{totalWords} mastered</span>
        </div>
      </motion.div>
      {/* Word of the Day */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-2xl p-5 text-white shadow-lg"
      >
        <div className="text-xs font-bold uppercase tracking-wider opacity-80 mb-1">📅 Word of the Day</div>
        <div className="flex items-center gap-4">
          <div className="text-3xl sm:text-4xl font-bold">{wordOfDay.korean}</div>
          <div>
            <div className="text-sm font-mono opacity-90">{wordOfDay.romanization}</div>
            <div className="text-sm">🇺🇸 {wordOfDay.english} · 🇵🇭 {wordOfDay.filipino}</div>
          </div>
        </div>
      </motion.div>
      {/* Category pills */}
      <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((c) => {
          const d = vocabularyCategories[c];
          return (
            <button key={c}
              onClick={() => { setCategory(c); setFlipped(null); setSearch(''); }}
              className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                category === c ? 'bg-rose-500 text-white shadow-lg shadow-rose-200' : 'glass text-slate-600 dark:text-slate-300'
              }`}
            >{d.emoji} {d.label}</button>
          );
        })}
      </div>
      {/* Filters row */}
      <div className="flex gap-2 items-center">
        <div className="relative flex-1">
          <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full glass rounded-xl px-4 py-2.5 text-sm text-slate-700 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-300" />
          {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">✕</button>}
        </div>
        <div className="flex gap-1">
          {(['all', 'beginner', 'intermediate'] as LevelFilter[]).map(l => (
            <button key={l} onClick={() => setLevelFilter(l)}
              className={`px-2.5 py-2 rounded-xl text-[10px] font-bold transition-all ${
                levelFilter === l ? 'bg-indigo-500 text-white' : 'glass text-slate-500'
              }`}
            >{l === 'all' ? 'All' : l === 'beginner' ? '🟢' : '🟡'}</button>
          ))}
        </div>
      </div>
      {/* Cards */}
      <AnimatePresence mode="wait">
        <motion.div key={category + search + levelFilter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {filtered.map((item: VocabItem, i: number) => {
            const isFlipped = flipped === i;
            const isMastered = masteredWords.has(item.korean);
            return (
              <motion.div key={item.korean + i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.025 }}
                onClick={() => setFlipped(isFlipped ? null : i)}
                className="cursor-pointer relative"
              >
                {/* Mastery button */}
                <button onClick={(e) => toggleMastered(item.korean, e)}
                  className={`absolute top-2 right-2 z-20 w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all ${
                    isMastered ? 'bg-emerald-500 text-white shadow-md' : 'bg-white/80 dark:bg-slate-700 text-slate-400 hover:text-emerald-500'
                  }`}
                >{isMastered ? '★' : '☆'}</button>
                <AnimatePresence mode="wait">
                  {!isFlipped ? (
                    <motion.div key="front" initial={{ rotateY: 90, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} exit={{ rotateY: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`glass rounded-2xl p-5 hover:shadow-lg transition-all min-h-[110px] flex flex-col justify-center ${isMastered ? 'border-2 border-emerald-200 dark:border-emerald-800' : ''}`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl font-bold text-slate-800 dark:text-white">{item.korean}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${item.level === 'beginner' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                          {item.level === 'beginner' ? '초' : '중'}
                        </span>
                      </div>
                      <div className="text-sm text-indigo-500 font-mono">{item.romanization}</div>
                      <div className="mt-2 text-[10px] text-slate-400">Tap to reveal ↻</div>
                    </motion.div>
                  ) : (
                    <motion.div key="back" initial={{ rotateY: -90, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} exit={{ rotateY: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="rounded-2xl p-5 bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl min-h-[110px]"
                    >
                      <div className="text-xl font-bold mb-0.5">{item.korean}</div>
                      <div className="text-xs opacity-75 font-mono mb-2">{item.romanization}</div>
                      <div className="space-y-1 text-sm">
                        <div className="bg-white/20 inline-block px-2 py-0.5 rounded-lg mr-1">🇺🇸 {item.english}</div>
                        <div className="bg-white/20 inline-block px-2 py-0.5 rounded-lg">🇵🇭 {item.filipino}</div>
                      </div>
                      {item.note && <div className="mt-2 text-xs opacity-80 bg-white/10 rounded-lg px-2 py-1">💡 {item.note}</div>}
                      {item.example && (
                        <div className="mt-2 bg-white/10 rounded-lg px-2 py-1.5 text-xs space-y-0.5">
                          <div className="font-bold">{item.example.kr}</div>
                          <div className="opacity-75 font-mono">{item.example.rom}</div>
                          <div className="opacity-80">🇺🇸 {item.example.en}</div>
                          <div className="opacity-80">🇵🇭 {item.example.ph}</div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
      {filtered.length === 0 && (
        <div className="text-center py-10 text-slate-400 text-sm">No words found. Try a different search or filter.</div>
      )}
      {category === 'numbers' && (
        <div className="glass rounded-2xl p-4 text-sm text-slate-600 dark:text-slate-400 border-l-4 border-amber-400">
          <strong>📌 Two number systems:</strong> Native Korean (하나, 둘...) for counting/hours/age. Sino-Korean (일, 이...) for dates/minutes/phone numbers/math. Both are essential.
        </div>
      )}
      {category === 'verbs' && (
        <div className="glass rounded-2xl p-4 text-sm text-slate-600 dark:text-slate-400 border-l-4 border-indigo-400">
          <strong>📌 Korean verbs:</strong> Dictionary form always ends in <strong>-다</strong>. Remove -다 to get the stem. Add endings to the stem: -아/어요 (polite present), -았/었어요 (past), -(으)ㄹ 거예요 (future).
        </div>
      )}
    </div>
  );
}
