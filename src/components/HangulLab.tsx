import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  consonants, vowels, doubleConsonants, compoundVowels,
  syllableBlockInfo, consonantTrios, pronunciationRules,
  type HangulChar,
} from '../data/koreanData';
type Tab = 'consonants' | 'vowels' | 'double' | 'compound' | 'trios' | 'blocks' | 'pronunciation';
const tabs: { key: Tab; label: string; emoji: string }[] = [
  { key: 'consonants', label: 'Consonants', emoji: '🔵' },
  { key: 'vowels', label: 'Vowels', emoji: '🔴' },
  { key: 'double', label: 'Double', emoji: '⚡' },
  { key: 'compound', label: 'Compound', emoji: '🔗' },
  { key: 'trios', label: 'Sound Trios', emoji: '🔊' },
  { key: 'blocks', label: 'Syllables', emoji: '🧩' },
  { key: 'pronunciation', label: 'Rules', emoji: '📢' },
];
function getDataForTab(tab: Tab): HangulChar[] {
  switch (tab) {
    case 'consonants': return consonants;
    case 'vowels': return vowels;
    case 'double': return doubleConsonants;
    case 'compound': return compoundVowels;
    default: return [];
  }
}
// Interactive Syllable Builder
function SyllableBuilder() {
  const [selC, setSelC] = useState<string | null>('ㅎ');
  const [selV, setSelV] = useState<string | null>('ㅏ');
  const [selF, setSelF] = useState<string | null>('ㄴ');
  const buildSyllable = useMemo(() => {
    if (!selC || !selV) return null;
    // Try combining into a string
    try {
      const cIdx = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ'.indexOf(selC);
      const vIdx = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ'.indexOf(selV);
      if (cIdx === -1 || vIdx === -1) return selC + selV + (selF || '');
      let code = 0xAC00 + cIdx * 588 + vIdx * 28;
      if (selF) {
        const fIdx = ' ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ'.indexOf(selF);
        if (fIdx > 0) code += fIdx;
      }
      return String.fromCharCode(code);
    } catch {
      return selC + selV + (selF || '');
    }
  }, [selC, selV, selF]);
  const availableConsonants = [...consonants, ...doubleConsonants].map(c => c.char);
  const availableVowels = [...vowels, ...compoundVowels].map(v => v.char);
  const availableFinals = ['', ...consonants.map(c => c.char)];
  return (
    <div className="glass rounded-3xl p-6 space-y-5">
      <h3 className="text-lg font-bold text-slate-800">🧪 Interactive Syllable Builder</h3>
      <p className="text-sm text-slate-500">Pick a consonant, vowel, and optional final consonant to build a real Korean syllable block.</p>
      <div className="flex justify-center">
        <motion.div
          key={buildSyllable}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-32 h-32 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl shadow-indigo-200"
        >
          <span className="text-6xl font-bold text-white">{buildSyllable || '?'}</span>
        </motion.div>
      </div>
      {/* Initial consonant */}
      <div>
        <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">Initial Consonant (초성)</div>
        <div className="flex flex-wrap gap-1.5">
          {availableConsonants.map(c => (
            <button key={c} onClick={() => setSelC(c)}
              className={`w-9 h-9 rounded-lg text-sm font-bold transition-all ${selC === c ? 'bg-indigo-500 text-white shadow-md' : 'bg-white/80 text-slate-700 hover:bg-indigo-100'}`}
            >{c}</button>
          ))}
        </div>
      </div>
      {/* Vowel */}
      <div>
        <div className="text-xs font-bold text-rose-600 uppercase tracking-wider mb-2">Vowel (중성)</div>
        <div className="flex flex-wrap gap-1.5">
          {availableVowels.map(v => (
            <button key={v} onClick={() => setSelV(v)}
              className={`w-9 h-9 rounded-lg text-sm font-bold transition-all ${selV === v ? 'bg-rose-500 text-white shadow-md' : 'bg-white/80 text-slate-700 hover:bg-rose-100'}`}
            >{v}</button>
          ))}
        </div>
      </div>
      {/* Final consonant */}
      <div>
        <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">Final Consonant — 받침 (종성) <span className="text-slate-400 font-normal">optional</span></div>
        <div className="flex flex-wrap gap-1.5">
          {availableFinals.map((f, i) => (
            <button key={f + i} onClick={() => setSelF(f || null)}
              className={`w-9 h-9 rounded-lg text-sm font-bold transition-all ${(selF === f || (!selF && !f)) ? 'bg-emerald-500 text-white shadow-md' : 'bg-white/80 text-slate-700 hover:bg-emerald-100'}`}
            >{f || '∅'}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
export default function HangulLab() {
  const [tab, setTab] = useState<Tab>('consonants');
  const [selected, setSelected] = useState<HangulChar | null>(null);
  const [expandedRule, setExpandedRule] = useState<number | null>(null);
  const data = getDataForTab(tab);
  const isCharTab = ['consonants', 'vowels', 'double', 'compound'].includes(tab);
  return (
    <div className="space-y-6">
      {/* Intro */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-3xl p-6">
        <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white mb-2">🔤 Hangul Lab — 한글</h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
          Created by <strong>King Sejong the Great (세종대왕)</strong> in 1443. Consonant shapes mirror the
          mouth/tongue position when making each sound. You can learn to <em>read</em> Hangul in days.
        </p>
        <div className="mt-3 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl text-sm text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800">
          <strong>🇵🇭 Filipino advantage:</strong> Your "ng" sound, flapped "r," and open vowels already exist in Korean!
        </div>
        <div className="mt-2 grid grid-cols-4 gap-1.5 text-center text-xs">
          <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-1.5">
            <div className="font-bold text-indigo-600 dark:text-indigo-400">14</div>
            <div className="text-indigo-400">consonants</div>
          </div>
          <div className="bg-rose-50 dark:bg-rose-900/30 rounded-lg p-1.5">
            <div className="font-bold text-rose-600 dark:text-rose-400">10</div>
            <div className="text-rose-400">vowels</div>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-1.5">
            <div className="font-bold text-amber-600 dark:text-amber-400">5</div>
            <div className="text-amber-400">double cons.</div>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-900/30 rounded-lg p-1.5">
            <div className="font-bold text-emerald-600 dark:text-emerald-400">11</div>
            <div className="text-emerald-400">compound v.</div>
          </div>
        </div>
      </motion.div>
      {/* Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none">
        {tabs.map((t) => (
          <button key={t.key}
            onClick={() => { setTab(t.key); setSelected(null); setExpandedRule(null); }}
            className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              tab === t.key
                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900'
                : 'glass text-slate-600 dark:text-slate-300 hover:bg-white/80'
            }`}
          >
            {t.emoji} {t.label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        {/* ─── CHARACTER GRID ─── */}
        {isCharTab && (
          <motion.div key={tab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className={`grid gap-2.5 ${tab === 'compound' ? 'grid-cols-4 sm:grid-cols-6' : 'grid-cols-5 sm:grid-cols-7'}`}>
              {data.map((char, i) => (
                <motion.button key={char.char}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.025, type: 'spring', stiffness: 260, damping: 20 }}
                  whileHover={{ scale: 1.12, y: -3 }}
                  whileTap={{ scale: 0.93 }}
                  onClick={() => setSelected(selected?.char === char.char ? null : char)}
                  className={`aspect-square rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                    selected?.char === char.char
                      ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-300 ring-2 ring-indigo-300'
                      : 'glass hover:bg-white dark:hover:bg-slate-800 text-slate-800 dark:text-white hover:shadow-md'
                  }`}
                >
                  <span className="text-2xl sm:text-3xl font-bold leading-none">{char.char}</span>
                  <span className={`text-[9px] mt-1 font-mono ${selected?.char === char.char ? 'text-indigo-100' : 'text-slate-400'}`}>
                    {char.romanization}
                  </span>
                </motion.button>
              ))}
            </div>
            {/* Detail panel */}
            <AnimatePresence>
              {selected && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                  <div className="glass rounded-3xl p-5 border-2 border-indigo-200 dark:border-indigo-700">
                    <div className="flex items-start gap-4">
                      <motion.div
                        initial={{ rotate: -10 }}
                        animate={{ rotate: 0 }}
                        className="text-5xl sm:text-6xl font-bold text-indigo-600 dark:text-indigo-400 animate-float flex-shrink-0"
                      >{selected.char}</motion.div>
                      <div className="flex-1 space-y-2 min-w-0">
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <span className="text-lg font-bold text-slate-800 dark:text-white">{selected.nameKr}</span>
                          <span className="text-sm text-slate-500">({selected.name})</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            selected.type === 'consonant' ? 'bg-indigo-100 text-indigo-600' :
                            selected.type === 'vowel' ? 'bg-rose-100 text-rose-600' :
                            selected.type === 'double' ? 'bg-amber-100 text-amber-600' :
                            'bg-emerald-100 text-emerald-600'
                          }`}>{selected.type}</span>
                        </div>
                        <div className="text-sm"><span className="font-semibold text-slate-700 dark:text-slate-300">Romanization: </span><span className="text-indigo-600 dark:text-indigo-400 font-mono font-bold">{selected.romanization}</span></div>
                        <div className="text-sm text-slate-600 dark:text-slate-400"><span className="font-semibold text-slate-700 dark:text-slate-300">Sound: </span>{selected.sound}</div>
                        <div className="p-2.5 bg-amber-50 dark:bg-amber-900/20 rounded-xl text-sm text-amber-800 dark:text-amber-300 border border-amber-100 dark:border-amber-800">
                          <strong>🇵🇭 Filipino hint: </strong>{selected.filipinoHint}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {/* Tips */}
            <div className="glass rounded-2xl p-4 text-sm text-slate-600 dark:text-slate-400">
              {tab === 'consonants' && <><strong>💡</strong> Consonants come in <strong>trios</strong>: plain (ㄱ), aspirated (ㅋ), tense (ㄲ). Check the "Sound Trios" tab to compare them!</>}
              {tab === 'vowels' && <><strong>💡</strong> Vowels are built from 3 philosophical elements: a dot (Heaven/Sun), horizontal line ㅡ (Earth), vertical line ㅣ (Human).</>}
              {tab === 'double' && <><strong>💡</strong> Tense consonants: tighten your throat, stop airflow, then release. Practice with English "sky" — the "k" is unaspirated like ㄲ.</>}
              {tab === 'compound' && <><strong>💡</strong> In modern Seoul Korean, ㅐ/ㅔ have merged. ㅙ/ㅚ/ㅞ also sound identical. Context resolves ambiguity.</>}
            </div>
          </motion.div>
        )}
        {/* ─── SOUND TRIOS ─── */}
        {tab === 'trios' && (
          <motion.div key="trios" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="glass rounded-3xl p-6">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">🔊 Plain / Aspirated / Tense Trios</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Korean consonants come in groups. Understanding these trios is <strong>critical</strong> for pronunciation. This distinction does NOT exist in Filipino or English.</p>
              <div className="grid grid-cols-3 gap-2 text-center text-xs mb-4 font-bold">
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-2 text-blue-600 dark:text-blue-400">Plain (평음)<br/>Soft, light</div>
                <div className="bg-orange-50 dark:bg-orange-900/30 rounded-lg p-2 text-orange-600 dark:text-orange-400">Aspirated (격음)<br/>Strong + air puff</div>
                <div className="bg-red-50 dark:bg-red-900/30 rounded-lg p-2 text-red-600 dark:text-red-400">Tense (경음)<br/>Stiff, no air</div>
              </div>
            </div>
            {consonantTrios.map((trio, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.08 }}
                className="glass rounded-2xl p-4"
              >
                <div className="text-xs font-bold text-slate-500 mb-2">{trio.label}</div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3">
                    <div className="text-3xl font-bold text-blue-600">{trio.plain}</div>
                    <div className="text-[10px] text-blue-500 mt-1">{trio.plainSound}</div>
                    <div className="text-[10px] text-blue-400">Plain</div>
                  </div>
                  {trio.aspirated ? (
                    <div className="text-center bg-orange-50 dark:bg-orange-900/20 rounded-xl p-3">
                      <div className="text-3xl font-bold text-orange-600">{trio.aspirated}</div>
                      <div className="text-[10px] text-orange-500 mt-1">{trio.aspiratedSound}</div>
                      <div className="text-[10px] text-orange-400">Aspirated</div>
                    </div>
                  ) : (
                    <div className="text-center bg-slate-50 dark:bg-slate-800 rounded-xl p-3 opacity-40">
                      <div className="text-3xl font-bold text-slate-400">—</div>
                      <div className="text-[10px] text-slate-400 mt-1">No aspirated</div>
                    </div>
                  )}
                  <div className="text-center bg-red-50 dark:bg-red-900/20 rounded-xl p-3">
                    <div className="text-3xl font-bold text-red-600">{trio.tense}</div>
                    <div className="text-[10px] text-red-500 mt-1">{trio.tenseSound}</div>
                    <div className="text-[10px] text-red-400">Tense</div>
                  </div>
                </div>
              </motion.div>
            ))}
            <div className="glass rounded-2xl p-4 text-sm text-slate-600 dark:text-slate-400 border-l-4 border-indigo-400">
              <strong>🎯 Practice tip:</strong> Hold a tissue in front of your mouth. Plain consonants barely move it.
              Aspirated consonants blow it away. Tense consonants don&apos;t move it at all.
            </div>
          </motion.div>
        )}
        {/* ─── SYLLABLE BLOCKS ─── */}
        {tab === 'blocks' && (
          <motion.div key="blocks" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="glass rounded-3xl p-6">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">{syllableBlockInfo.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed text-sm">{syllableBlockInfo.explanation}</p>
              <div className="space-y-3">
                {syllableBlockInfo.structures.map((s, i) => (
                  <motion.div key={s.type} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                    className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-2xl p-4 flex items-center gap-4"
                  >
                    <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 w-16 text-center flex-shrink-0">{s.example}</div>
                    <div>
                      <div className="font-bold text-slate-800 dark:text-white text-sm">{s.type}: {s.label}</div>
                      <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{s.breakdown}</div>
                      <div className="text-xs text-indigo-500 mt-0.5">{s.layout}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            {/* Syllable builder */}
            <SyllableBuilder />
            {/* Demo syllables */}
            <div className="glass rounded-3xl p-6">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3">🧩 Common Syllable Patterns</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { s: '한', p: 'ㅎ+ㅏ+ㄴ', r: 'han', m: 'Korean' },
                  { s: '글', p: 'ㄱ+ㅡ+ㄹ', r: 'geul', m: 'writing' },
                  { s: '사', p: 'ㅅ+ㅏ', r: 'sa', m: '' },
                  { s: '랑', p: 'ㄹ+ㅏ+ㅇ', r: 'rang', m: '사랑=love' },
                  { s: '감', p: 'ㄱ+ㅏ+ㅁ', r: 'gam', m: '' },
                  { s: '사', p: 'ㅅ+ㅏ', r: 'sa', m: '감사=thanks' },
                  { s: '친', p: 'ㅊ+ㅣ+ㄴ', r: 'chin', m: '' },
                  { s: '구', p: 'ㄱ+ㅜ', r: 'gu', m: '친구=friend' },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl p-3 text-center shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{item.s}</div>
                    <div className="text-[10px] text-slate-400 mt-1">{item.p}</div>
                    <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">{item.r}</div>
                    {item.m && <div className="text-[10px] text-rose-400">{item.m}</div>}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
        {/* ─── PRONUNCIATION RULES ─── */}
        {tab === 'pronunciation' && (
          <motion.div key="pron" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="glass rounded-3xl p-6">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">📢 Pronunciation Change Rules</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Korean has systematic rules where pronunciation differs from spelling. Mastering these is <strong>essential</strong> for
                sounding natural and understanding native speakers. These rules are why reading Hangul alone isn&apos;t enough.
              </p>
            </div>
            {pronunciationRules.map((rule, idx) => {
              const isOpen = expandedRule === rule.id;
              return (
                <motion.div key={rule.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.06 }}>
                  <button onClick={() => setExpandedRule(isOpen ? null : rule.id)}
                    className={`w-full text-left rounded-2xl transition-all ${isOpen ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl' : 'glass hover:bg-white dark:hover:bg-slate-800 hover:shadow-md'}`}
                  >
                    <div className="px-5 py-4 flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${isOpen ? 'bg-white/20' : 'bg-indigo-100 text-indigo-600'}`}>
                        {rule.id}
                      </span>
                      <div className="min-w-0">
                        <div className={`font-bold text-sm ${isOpen ? '' : 'text-slate-800 dark:text-white'}`}>{rule.title}</div>
                        <div className={`text-xs ${isOpen ? 'text-white/70' : 'text-slate-400'}`}>{rule.titleKr}</div>
                      </div>
                      <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className={isOpen ? 'text-white/70' : 'text-slate-400'}>▾</motion.span>
                    </div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="glass rounded-b-2xl -mt-2 pt-5 px-5 pb-5 space-y-3">
                          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{rule.rule}</p>
                          <div className="space-y-2">
                            {rule.examples.map((ex, i) => (
                              <div key={i} className="bg-white dark:bg-slate-800 rounded-xl p-3 grid grid-cols-12 gap-2 items-center text-sm">
                                <div className="col-span-4">
                                  <div className="font-bold text-slate-800 dark:text-white">{ex.written}</div>
                                  <div className="text-[10px] text-slate-400">written</div>
                                </div>
                                <div className="col-span-1 text-center text-indigo-400">→</div>
                                <div className="col-span-4">
                                  <div className="font-bold text-indigo-600 dark:text-indigo-400">{ex.pronounced}</div>
                                  <div className="text-[10px] text-indigo-400">{ex.romanization}</div>
                                </div>
                                <div className="col-span-3 text-xs text-slate-500">{ex.meaning}</div>
                              </div>
                            ))}
                          </div>
                          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 text-sm text-amber-800 dark:text-amber-300 border border-amber-100 dark:border-amber-800">
                            <strong>🇵🇭 Note: </strong>{rule.filipinoNote}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
