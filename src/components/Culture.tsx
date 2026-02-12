import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cultureNotes } from '../data/koreanData';
const kdramaVocab = [
  { kr: '대박', rom: 'daebak', en: 'Awesome! / Jackpot!', ph: 'Ang galing! / Grabe!' },
  { kr: '아이고', rom: 'aigo', en: 'Oh my! (exasperation/surprise)', ph: 'Ay nako!' },
  { kr: '진짜', rom: 'jinjja', en: 'Really? / For real', ph: 'Talaga? / Totoo ba?' },
  { kr: '헐', rom: 'heol', en: 'OMG / No way (slang)', ph: 'Grabe! / OMG!' },
  { kr: '짱', rom: 'jjang', en: 'The best! / Awesome', ph: 'Ang galing! / Best!' },
  { kr: '오빠 / 언니', rom: 'oppa / eonni', en: 'Terms for older friends (K-drama staple)', ph: 'Kuya / Ate' },
  { kr: '사랑해', rom: 'saranghae', en: 'I love you (casual)', ph: 'Mahal kita' },
  { kr: '미안해', rom: 'mianhae', en: "I'm sorry (casual)", ph: 'Sorry / Pasensya na' },
  { kr: '가자!', rom: 'gaja!', en: "Let's go!", ph: 'Tara!' },
  { kr: '뭐?', rom: 'mwo?', en: 'What?', ph: 'Ano?' },
  { kr: '왜?', rom: 'wae?', en: 'Why?', ph: 'Bakit?' },
  { kr: '맞아', rom: 'maja', en: "That's right", ph: 'Tama' },
];
export default function Culture() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showKdrama, setShowKdrama] = useState(false);
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-3xl p-6">
        <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white mb-2">🌏 Culture Corner — 문화</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
          {cultureNotes.length} cultural topics with Filipino parallels. Language without culture is just sounds — understanding <em>why</em> Koreans communicate the way they do is the real key to fluency.
        </p>
      </motion.div>
      {/* Culture cards */}
      <div className="space-y-3">
        {cultureNotes.map((note, idx) => {
          const isOpen = expandedId === note.id;
          return (
            <motion.div key={note.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
            >
              <button onClick={() => setExpandedId(isOpen ? null : note.id)}
                className={`w-full text-left rounded-2xl transition-all duration-300 ${
                  isOpen ? 'bg-gradient-to-br from-indigo-500 via-purple-500 to-rose-500 text-white shadow-xl shadow-indigo-200/50 dark:shadow-indigo-900/50' : 'glass hover:bg-white dark:hover:bg-slate-800 hover:shadow-md'
                }`}
              >
                <div className="px-5 py-4 flex items-center gap-4">
                  <span className="text-2xl sm:text-3xl flex-shrink-0">{note.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className={`font-bold truncate text-sm ${isOpen ? '' : 'text-slate-800 dark:text-white'}`}>{note.title}</div>
                    <div className={`text-xs ${isOpen ? 'text-white/70' : 'text-slate-400'}`}>{note.titleKr}</div>
                  </div>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className={isOpen ? 'text-white/70' : 'text-slate-400'}>▾</motion.span>
                </div>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="glass rounded-b-2xl -mt-3 pt-6 px-5 pb-5 space-y-4">
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{note.content}</p>
                      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-4 border border-amber-100 dark:border-amber-800">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-lg">🇵🇭</span>
                          <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">Filipino Connection</span>
                        </div>
                        <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">{note.filipinoConnection}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
      {/* K-Drama Vocabulary */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <button onClick={() => setShowKdrama(!showKdrama)}
          className={`w-full p-4 rounded-2xl font-bold text-sm transition-all ${
            showKdrama ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg' : 'glass text-rose-600 hover:bg-white dark:hover:bg-slate-800'
          }`}
        >
          {showKdrama ? '✕ Close K-Drama Vocab' : '🎬 K-Drama & K-Pop Vocabulary'}
        </button>
        <AnimatePresence>
          {showKdrama && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="glass rounded-2xl mt-3 p-5 space-y-3 border-2 border-rose-200 dark:border-rose-800">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Words you&apos;ll hear constantly in K-dramas and K-pop. Learning these gives you instant recognition while watching.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {kdramaVocab.map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                      className="bg-white/70 dark:bg-slate-800/70 rounded-xl p-3 hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-slate-800 dark:text-white">{item.kr}</span>
                        <span className="text-xs text-indigo-500 font-mono">{item.rom}</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">🇺🇸 {item.en}</div>
                      <div className="text-xs text-slate-500">🇵🇭 {item.ph}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      {/* Parallels table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass rounded-3xl p-6">
        <h3 className="font-bold text-slate-800 dark:text-white mb-4">🤝 Korean-Filipino Cultural Parallels</h3>
        <div className="space-y-2">
          {[
            { kr: '존댓말', ph: 'Po / Opo', m: 'Polite speech' },
            { kr: '오빠/언니/형/누나', ph: 'Kuya / Ate', m: 'Elder terms' },
            { kr: '눈치 (nunchi)', ph: 'Pakiramdaman', m: 'Social awareness' },
            { kr: '정 (jeong)', ph: 'Pagmamalasakit', m: 'Deep bond' },
            { kr: '절 (jeol)', ph: 'Mano po', m: 'Physical respect' },
            { kr: '밥 먹었어요?', ph: 'Kumain ka na ba?', m: 'Caring greeting' },
            { kr: '우리 (uri)', ph: 'Tayo / Natin', m: 'Collective we' },
            { kr: '효 (hyo)', ph: 'Paggalang sa magulang', m: 'Filial piety' },
            { kr: '빨리빨리', ph: 'Mabilis mabilis', m: 'Speed culture' },
          ].map((row, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 + i * 0.03 }}
              className="grid grid-cols-12 gap-2 items-center bg-white/60 dark:bg-slate-800/60 rounded-xl px-3 py-2.5 text-sm hover:bg-white dark:hover:bg-slate-800 transition-colors"
            >
              <div className="col-span-5 font-medium text-indigo-700 dark:text-indigo-400 text-xs sm:text-sm">{row.kr}</div>
              <div className="col-span-4 font-medium text-rose-600 dark:text-rose-400 text-xs sm:text-sm">{row.ph}</div>
              <div className="col-span-3 text-slate-500 text-[10px] sm:text-xs">{row.m}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      {/* Quick facts */}
      <div className="glass rounded-3xl p-6">
        <h3 className="font-bold text-slate-800 dark:text-white mb-3">⚡ Quick Facts</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {[
            { fact: 'Hangul Day (한글날) is October 9th — a national holiday.', emoji: '📅' },
            { fact: 'South Korea literacy rate: ~97.9%, thanks to Hangul\'s logical design.', emoji: '📖' },
            { fact: 'Parasite (기생충) won Best Picture at the 2020 Oscars — first non-English film.', emoji: '🎬' },
            { fact: 'Korea has the fastest average internet speed (consistently top 3 globally).', emoji: '📡' },
            { fact: 'Kimchi: 200+ varieties, UNESCO ICH 2013.', emoji: '🥬' },
            { fact: 'Seoul subway announcements are in Korean, English, Chinese, and Japanese.', emoji: '🚇' },
          ].map((item, i) => (
            <div key={i} className="bg-white/60 dark:bg-slate-800/60 rounded-xl p-3 flex items-start gap-2.5">
              <span className="text-xl flex-shrink-0">{item.emoji}</span>
              <span className="text-sm text-slate-600 dark:text-slate-400">{item.fact}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
