import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  consonants, vowels, doubleConsonants, compoundVowels,
  syllableBlockInfo, type HangulChar,
} from '../data/koreanData';
type Tab = 'consonants' | 'vowels' | 'double' | 'compound' | 'blocks';
const tabs: { key: Tab; label: string; data?: HangulChar[] }[] = [
  { key: 'consonants', label: 'Consonants (14)', data: consonants },
  { key: 'vowels', label: 'Vowels (10)', data: vowels },
  { key: 'double', label: 'Double (5)', data: doubleConsonants },
  { key: 'compound', label: 'Compound (11)', data: compoundVowels },
  { key: 'blocks', label: 'Syllable Blocks' },
];
export default function HangulLab() {
  const [tab, setTab] = useState<Tab>('consonants');
  const [selected, setSelected] = useState<HangulChar | null>(null);
  const currentTab = tabs.find((t) => t.key === tab)!;
  const data = currentTab.data || [];
  return (
    <div className="space-y-6">
      {/* Intro */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-3xl p-6 sm:p-7">
        <h2 className="text-2xl font-extrabold text-slate-800 mb-2">🔤 Hangul Lab — 한글</h2>
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          Hangul was created by <strong>King Sejong the Great (세종대왕)</strong> in 1443 and
          promulgated in 1446. The consonant shapes are based on the position of the mouth/tongue
          when producing each sound. You can learn to <em>read</em> Hangul in days — it was literally designed for this.
        </p>
        <div className="mt-3 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl text-sm text-indigo-700 border border-indigo-100">
          <strong>🇵🇭 Filipino advantage:</strong> Many Korean sounds already exist in Filipino — your "ng," flapped "r," and open vowels give you a genuine head start.
        </div>
      </motion.div>
      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => { setTab(t.key); setSelected(null); }}
            className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 whitespace-nowrap ${
              tab === t.key
                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-200'
                : 'glass text-slate-600 hover:bg-white/80'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        {tab === 'blocks' ? (
          /* ─── SYLLABLE BLOCKS ─── */
          <motion.div key="blocks" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-4">
            <div className="glass rounded-3xl p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-3">{syllableBlockInfo.title}</h3>
              <p className="text-slate-600 mb-4 leading-relaxed text-sm">{syllableBlockInfo.explanation}</p>
              <div className="space-y-3">
                {syllableBlockInfo.structures.map((s, i) => (
                  <motion.div
                    key={s.type}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4 flex items-center gap-4"
                  >
                    <div className="text-4xl font-bold text-indigo-600 w-16 text-center flex-shrink-0">{s.example}</div>
                    <div>
                      <div className="font-bold text-slate-800 text-sm">{s.type}: {s.label}</div>
                      <div className="text-xs text-slate-600 mt-0.5">{s.breakdown}</div>
                      <div className="text-xs text-indigo-500 mt-0.5">{s.layout}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-5 space-y-1.5 text-sm text-slate-600">
                <p>📐 <strong>Vertical vowels</strong> (ㅏ ㅑ ㅓ ㅕ ㅣ): go to the <strong>right</strong> of the consonant.</p>
                <p>📐 <strong>Horizontal vowels</strong> (ㅗ ㅛ ㅜ ㅠ ㅡ): go <strong>below</strong> the consonant.</p>
                <p>📐 <strong>Compound vowels</strong> (ㅘ ㅙ ㅚ etc.): wrap around the consonant.</p>
              </div>
            </div>
            {/* Interactive syllable demo */}
            <div className="glass rounded-3xl p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-3">🧩 See It in Action</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { syllable: '한', parts: 'ㅎ+ㅏ+ㄴ', rom: 'han', meaning: '(Korean)' },
                  { syllable: '글', parts: 'ㄱ+ㅡ+ㄹ', rom: 'geul', meaning: '(writing)' },
                  { syllable: '사', parts: 'ㅅ+ㅏ', rom: 'sa', meaning: '' },
                  { syllable: '랑', parts: 'ㄹ+ㅏ+ㅇ', rom: 'rang', meaning: '= 사랑 (love)' },
                  { syllable: '아', parts: 'ㅇ+ㅏ', rom: 'a', meaning: '' },
                  { syllable: '빠', parts: 'ㅃ+ㅏ', rom: 'ppa', meaning: '= 아빠 (dad)' },
                  { syllable: '엄', parts: 'ㅇ+ㅓ+ㅁ', rom: 'eom', meaning: '' },
                  { syllable: '마', parts: 'ㅁ+ㅏ', rom: 'ma', meaning: '= 엄마 (mom)' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white rounded-2xl p-3 text-center shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="text-3xl font-bold text-indigo-600">{item.syllable}</div>
                    <div className="text-[10px] text-slate-400 mt-1">{item.parts}</div>
                    <div className="text-xs font-semibold text-slate-600">{item.rom}</div>
                    {item.meaning && <div className="text-[10px] text-rose-400 mt-0.5">{item.meaning}</div>}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          /* ─── CHARACTER GRID ─── */
          <motion.div key={tab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-4">
            <div className="grid grid-cols-5 sm:grid-cols-7 gap-2.5">
              {data.map((char, i) => (
                <motion.button
                  key={char.char}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03, type: 'spring', stiffness: 260, damping: 20 }}
                  whileHover={{ scale: 1.12, y: -3 }}
                  whileTap={{ scale: 0.93 }}
                  onClick={() => setSelected(selected?.char === char.char ? null : char)}
                  className={`aspect-square rounded-2xl flex flex-col items-center justify-center transition-all duration-200 cursor-pointer ${
                    selected?.char === char.char
                      ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-300 ring-2 ring-indigo-300'
                      : 'glass hover:bg-white text-slate-800 hover:shadow-md'
                  }`}
                >
                  <span className="text-2xl sm:text-3xl font-bold leading-none">{char.char}</span>
                  <span className={`text-[10px] mt-1 font-mono ${selected?.char === char.char ? 'text-indigo-100' : 'text-slate-400'}`}>
                    {char.romanization}
                  </span>
                </motion.button>
              ))}
            </div>
            {/* Detail panel */}
            <AnimatePresence>
              {selected && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="glass rounded-3xl p-6 border-2 border-indigo-200">
                    <div className="flex items-start gap-5">
                      <div className="text-6xl font-bold text-indigo-600 animate-float flex-shrink-0">{selected.char}</div>
                      <div className="flex-1 space-y-2 min-w-0">
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <span className="text-xl font-bold text-slate-800">{selected.nameKr}</span>
                          <span className="text-sm text-slate-500">({selected.name})</span>
                        </div>
                        <div className="text-sm">
                          <span className="font-semibold text-slate-700">Romanization: </span>
                          <span className="text-indigo-600 font-mono font-bold">{selected.romanization}</span>
                        </div>
                        <div className="text-sm text-slate-600">
                          <span className="font-semibold text-slate-700">Sound: </span>
                          {selected.sound}
                        </div>
                        <div className="mt-2 p-3 bg-amber-50 rounded-xl text-sm text-amber-800 border border-amber-100">
                          <strong>🇵🇭 Filipino hint: </strong>{selected.filipinoHint}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {/* Contextual tips */}
            <div className="glass rounded-2xl p-4 text-sm text-slate-600">
              {tab === 'consonants' && (
                <><strong>💡 Tip:</strong> Korean consonants come in groups of 3 — <em>plain</em> (ㄱ), <em>aspirated</em> (ㅋ), and <em>tense</em> (ㄲ). Plain are soft, aspirated have a puff of air, and tense are "stiff" with no air release.</>
              )}
              {tab === 'vowels' && (
                <><strong>💡 Tip:</strong> Korean vowels are built from 3 elements designed by King Sejong: a dot (now a short stroke representing the Sun/Heaven), a horizontal line (ㅡ, Earth), and a vertical line (ㅣ, Human). Combining these philosophical elements creates all vowel sounds.</>
              )}
              {tab === 'double' && (
                <><strong>💡 Tip:</strong> Double (tense/쌍) consonants are made by tensing your throat and stopping airflow before releasing. Practice by saying English "sky" — the "k" in "sky" is unaspirated, similar to ㄲ. There is no equivalent in Filipino.</>
              )}
              {tab === 'compound' && (
                <><strong>💡 Note:</strong> In modern Seoul Korean, ㅐ and ㅔ have largely merged — most speakers pronounce them the same way. Similarly, ㅙ, ㅚ, and ㅞ are often identical in pronunciation. Context resolves ambiguity.</>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
