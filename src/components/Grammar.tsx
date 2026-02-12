import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { grammarRules, sentenceExercises } from '../data/koreanData';
export default function Grammar() {
  const [expanded, setExpanded] = useState<number | null>(1);
  const [showBuilder, setShowBuilder] = useState(false);
  const [builderIdx, setBuilderIdx] = useState(0);
  const [userOrder, setUserOrder] = useState<string[]>([]);
  const [builderResult, setBuilderResult] = useState<'correct' | 'wrong' | null>(null);
  const exercise = sentenceExercises[builderIdx];
  const handleWordClick = (word: string) => {
    if (builderResult) return;
    if (userOrder.includes(word)) {
      setUserOrder(prev => prev.filter(w => w !== word));
    } else {
      setUserOrder(prev => [...prev, word]);
    }
  };
  const checkAnswer = () => {
    const attempt = userOrder.join(' ');
    setBuilderResult(attempt === exercise.answer.replace(/\.$/, '').trim() || attempt + '.' === exercise.answer ? 'correct' : 'wrong');
  };
  const nextExercise = () => {
    setBuilderIdx(prev => (prev + 1) % sentenceExercises.length);
    setUserOrder([]);
    setBuilderResult(null);
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-3xl p-6">
        <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white mb-2">📝 Grammar Guide — 문법</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
          {grammarRules.length} essential grammar patterns with Filipino connections. Tap to expand.
        </p>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-2.5 border border-blue-100 dark:border-blue-800">
            <div className="font-bold text-blue-600 dark:text-blue-400">English</div>
            <div className="text-blue-500 font-mono font-bold text-sm">SVO</div>
            <div className="text-blue-400 mt-0.5">I eat rice.</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-2.5 border border-green-100 dark:border-green-800">
            <div className="font-bold text-green-600 dark:text-green-400">Filipino</div>
            <div className="text-green-500 font-mono font-bold text-sm">VSO</div>
            <div className="text-green-400 mt-0.5">Kumakain ako ng kanin.</div>
          </div>
          <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-xl p-2.5 border border-indigo-100 dark:border-indigo-800">
            <div className="font-bold text-indigo-600 dark:text-indigo-400">Korean</div>
            <div className="text-indigo-500 font-mono font-bold text-sm">SOV</div>
            <div className="text-indigo-400 mt-0.5">나는 밥을 먹어요.</div>
          </div>
        </div>
      </motion.div>
      {/* Sentence Builder Toggle */}
      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        onClick={() => setShowBuilder(!showBuilder)}
        className={`w-full p-4 rounded-2xl font-bold text-sm transition-all ${
          showBuilder ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg' : 'glass text-indigo-600 hover:bg-white dark:hover:bg-slate-800'
        }`}
      >
        {showBuilder ? '✕ Close Sentence Builder' : '🧩 Open Interactive Sentence Builder'}
      </motion.button>
      {/* Sentence Builder */}
      <AnimatePresence>
        {showBuilder && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="glass rounded-3xl p-6 space-y-4 border-2 border-purple-200 dark:border-purple-800">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-800 dark:text-white">🧩 Build the Sentence</h3>
                <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full font-bold">
                  {builderIdx + 1}/{sentenceExercises.length}
                </span>
              </div>
              <div className="text-center">
                <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Translate to Korean:</div>
                <div className="text-lg font-bold text-slate-800 dark:text-white">{exercise.meaning}</div>
                <div className="text-sm text-slate-500">🇵🇭 {exercise.filipino}</div>
              </div>
              {/* Drop zone */}
              <div className="min-h-[52px] bg-white/50 dark:bg-slate-800/50 rounded-xl p-3 flex flex-wrap gap-2 border-2 border-dashed border-slate-300 dark:border-slate-600">
                {userOrder.length === 0 && <span className="text-sm text-slate-400">Tap words below to build...</span>}
                {userOrder.map((word, i) => (
                  <motion.span key={word + i} initial={{ scale: 0.8 }} animate={{ scale: 1 }}
                    onClick={() => !builderResult && handleWordClick(word)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-bold cursor-pointer transition-colors ${
                      builderResult === 'correct' ? 'bg-emerald-500 text-white' :
                      builderResult === 'wrong' ? 'bg-orange-400 text-white' :
                      'bg-indigo-500 text-white hover:bg-indigo-600'
                    }`}
                  >{word}</motion.span>
                ))}
              </div>
              {/* Word options */}
              <div className="flex flex-wrap gap-2 justify-center">
                {exercise.words.map((word, i) => (
                  <motion.button key={word + i}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleWordClick(word)}
                    disabled={!!builderResult}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                      userOrder.includes(word)
                        ? 'opacity-30 bg-slate-200 dark:bg-slate-700 text-slate-400'
                        : 'glass text-slate-700 dark:text-white hover:bg-indigo-100 dark:hover:bg-indigo-900/30'
                    }`}
                  >{word}</motion.button>
                ))}
              </div>
              {/* Actions */}
              <div className="flex gap-2 justify-center">
                {!builderResult ? (
                  <>
                    <button onClick={checkAnswer} disabled={userOrder.length === 0}
                      className="px-6 py-2.5 bg-indigo-500 text-white rounded-xl font-bold hover:bg-indigo-600 transition-colors disabled:opacity-40">
                      Check ✓
                    </button>
                    <button onClick={() => { setUserOrder([]); setBuilderResult(null); }}
                      className="px-4 py-2.5 glass rounded-xl text-sm font-bold text-slate-500">
                      Reset
                    </button>
                  </>
                ) : (
                  <div className="space-y-3 w-full">
                    <div className={`rounded-xl p-3 text-center text-sm font-bold ${
                      builderResult === 'correct' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'
                    }`}>
                      {builderResult === 'correct' ? '✅ 정답! Correct!' : `🧡 Answer: ${exercise.answer}`}
                    </div>
                    <button onClick={nextExercise}
                      className="w-full py-2.5 bg-indigo-500 text-white rounded-xl font-bold hover:bg-indigo-600 transition-colors">
                      Next →
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Rules accordion */}
      <div className="space-y-3">
        {grammarRules.map((rule, idx) => {
          const isOpen = expanded === rule.id;
          return (
            <motion.div key={rule.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              className="glass rounded-2xl overflow-hidden"
            >
              <button onClick={() => setExpanded(isOpen ? null : rule.id)}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors ${
                    isOpen ? 'bg-indigo-500 text-white' : 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
                  }`}>{rule.id}</span>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-800 dark:text-white text-sm truncate">{rule.title}</div>
                    <div className="text-xs text-slate-400">{rule.titleKr}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    rule.level === 'beginner' ? 'bg-emerald-100 text-emerald-600' : rule.level === 'intermediate' ? 'bg-amber-100 text-amber-600' : 'bg-red-100 text-red-600'
                  }`}>{rule.level === 'beginner' ? '초급' : rule.level === 'intermediate' ? '중급' : '고급'}</span>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="text-slate-400">▾</motion.span>
                </div>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }} className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 space-y-4">
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{rule.explanation}</p>
                      <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-xl p-3 border border-indigo-100 dark:border-indigo-800">
                        <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider mb-1">Structure</div>
                        <div className="font-mono text-indigo-700 dark:text-indigo-300 font-bold text-sm">{rule.structure}</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Examples</div>
                        {rule.examples.map((ex, ei) => (
                          <div key={ei} className="bg-white dark:bg-slate-800 rounded-xl p-3.5 shadow-sm border border-slate-100 dark:border-slate-700">
                            <div className="text-lg font-bold text-slate-800 dark:text-white">{ex.korean}</div>
                            <div className="text-sm text-indigo-500 font-mono">{ex.romanization}</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400 mt-1.5 space-y-0.5">
                              <div>🇺🇸 {ex.english}</div>
                              <div>🇵🇭 {ex.filipino}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3.5 border border-amber-100 dark:border-amber-800">
                        <div className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-1">🇵🇭 Filipino Connection</div>
                        <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">{rule.filipinoParallel}</p>
                      </div>
                      <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-3.5 border border-emerald-100 dark:border-emerald-800">
                        <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1">💡 Tip</div>
                        <p className="text-sm text-emerald-800 dark:text-emerald-300">{rule.tip}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
      {/* Key takeaways */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass rounded-3xl p-6">
        <h3 className="font-bold text-slate-800 dark:text-white mb-3">🗝️ Key Takeaways for Filipino Speakers</h3>
        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
          {[
            'Verb goes at the END — always.',
            'Particles (은/는, 이/가, 을/를) = Filipino markers (ang, ng, sa).',
            '-요 = Filipino "po" — instant politeness.',
            'Korean drops subjects when clear, like Filipino: "Kumain na" ≈ "먹었어요."',
            'Vowel harmony: ㅏ/ㅗ → 아, others → 어. This one rule covers most conjugation.',
            '-고 싶어요 = "Gusto kong..." — one of the most useful patterns early on.',
          ].map((text, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-indigo-500 mt-0.5 flex-shrink-0">✦</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
