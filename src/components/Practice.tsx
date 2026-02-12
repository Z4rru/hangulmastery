import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { allHangul, allVocab, grammarRules } from '../data/koreanData';
type QuizType = 'hangul' | 'vocab' | 'mixed' | 'particles' | 'sentences';
interface Question {
  question: string;
  sub?: string;
  options: string[];
  correct: number;
  explanation: string;
  tag: string;
}
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const particleQuestions: Question[] = [
  { question: '저___ 학생이에요.', sub: 'I am a student. (Topic)', options: ['는', '가', '를', '에서'], correct: 0, explanation: '저는 — "저" ends in vowel, so use 는 (topic particle).', tag: 'Particles' },
  { question: '날씨___ 좋아요.', sub: 'The weather is good. (Subject)', options: ['는', '가', '를', '에'], correct: 1, explanation: '날씨가 — "씨" ends in vowel, use 가 (subject particle for new info).', tag: 'Particles' },
  { question: '커피___ 마셔요.', sub: 'I drink coffee. (Object)', options: ['는', '가', '를', '에서'], correct: 2, explanation: '커피를 — "피" ends in vowel, use 를 (object particle).', tag: 'Particles' },
  { question: '학교___ 가요.', sub: 'I go to school. (Destination)', options: ['에서', '에', '를', '는'], correct: 1, explanation: '학교에 — going TO a place uses 에 (destination).', tag: 'Particles' },
  { question: '학교___ 공부해요.', sub: 'I study at school. (Action location)', options: ['에', '에서', '를', '가'], correct: 1, explanation: '학교에서 — doing something AT a place uses 에서.', tag: 'Particles' },
  { question: '책___ 읽어요.', sub: 'I read a book. (Object)', options: ['는', '가', '을', '에'], correct: 2, explanation: '책을 — "책" ends in consonant, use 을 (object particle).', tag: 'Particles' },
  { question: '한국___ 아름다워요.', sub: 'Korea is beautiful. (Topic)', options: ['은', '이', '을', '에서'], correct: 0, explanation: '한국은 — "국" ends in consonant, use 은 (topic particle).', tag: 'Particles' },
  { question: '누___ 왔어요?', sub: 'Who came? (Subject)', options: ['는', '가', '를', '에'], correct: 1, explanation: '누가 — asking "who" uses 가 (subject particle).', tag: 'Particles' },
];
const sentenceQuestions: Question[] = [
  { question: 'How do you say "I eat rice" in Korean?', sub: 'SOV order', options: ['나는 밥을 먹어요', '나는 먹어요 밥을', '밥을 나는 먹어요', '먹어요 나는 밥을'], correct: 0, explanation: 'SOV: Subject (나는) + Object (밥을) + Verb (먹어요).', tag: 'Sentences' },
  { question: 'Which is the polite form of 가다 (to go)?', options: ['가요', '갔어요', '가고', '간'], correct: 0, explanation: '가다 stem is 가. Last vowel is ㅏ, so add -아요 = 가 + 아요 = 가요.', tag: 'Conjugation' },
  { question: 'What is the past tense of 먹다 (to eat)?', options: ['먹어요', '먹었어요', '먹을 거예요', '먹고'], correct: 1, explanation: '먹다 stem is 먹. Last vowel is ㅓ (not ㅏ/ㅗ), so add -었어요 = 먹었어요.', tag: 'Conjugation' },
  { question: '"I want to go to Korea" — correct Korean?', options: ['한국에 가고 싶어요', '한국에서 가고 싶어요', '가고 싶어요 한국에', '한국을 가고 싶어요'], correct: 0, explanation: '한국에 (destination) + 가고 (go +) 싶어요 (want to).', tag: 'Sentences' },
  { question: 'How do you negate "먹어요" (I eat)?', sub: 'Short form', options: ['못 먹어요', '안 먹어요', '먹 안어요', '없 먹어요'], correct: 1, explanation: '안 before the verb = negation. 안 먹어요 = I don\'t eat.', tag: 'Conjugation' },
  { question: '"I can speak Korean" in Korean?', options: ['한국어를 할 수 있어요', '한국어를 하고 싶어요', '한국어를 할 거예요', '한국어를 해요'], correct: 0, explanation: '할 수 있어요 = can do. 한국어를 할 수 있어요 = I can speak Korean.', tag: 'Sentences' },
];
function makeQuestions(type: QuizType): Question[] {
  const qs: Question[] = [];
  if (type === 'hangul' || type === 'mixed') {
    const chars = shuffle(allHangul).slice(0, type === 'mixed' ? 4 : 10);
    for (const c of chars) {
      const wrongs = shuffle(allHangul.filter(x => x.char !== c.char).map(x => x.romanization)).slice(0, 3);
      const opts = shuffle([c.romanization, ...wrongs]);
      qs.push({
        question: c.char, sub: 'What is the romanization?', options: opts,
        correct: opts.indexOf(c.romanization),
        explanation: `${c.char} = "${c.name}" (${c.nameKr}), romanized "${c.romanization}". ${c.filipinoHint}`,
        tag: 'Hangul',
      });
    }
  }
  if (type === 'vocab' || type === 'mixed') {
    const words = shuffle(allVocab).slice(0, type === 'mixed' ? 3 : 10);
    for (const w of words) {
      const wrongs = shuffle(allVocab.filter(x => x.korean !== w.korean).map(x => x.english)).slice(0, 3);
      const opts = shuffle([w.english, ...wrongs]);
      qs.push({
        question: w.korean, sub: `(${w.romanization}) — What does this mean?`, options: opts,
        correct: opts.indexOf(w.english),
        explanation: `${w.korean} (${w.romanization}) = "${w.english}" 🇺🇸 / "${w.filipino}" 🇵🇭`,
        tag: 'Vocab',
      });
    }
  }
  if (type === 'particles') {
    return shuffle(particleQuestions).slice(0, 8);
  }
  if (type === 'sentences') {
    return shuffle(sentenceQuestions).slice(0, 6);
  }
  if (type === 'mixed') {
    qs.push(...shuffle(particleQuestions).slice(0, 2));
    qs.push(...shuffle(sentenceQuestions).slice(0, 1));
  }
  return shuffle(qs).slice(0, 10);
}
export default function Practice() {
  const [quizType, setQuizType] = useState<QuizType | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [history, setHistory] = useState<boolean[]>([]);
  const [missedQs, setMissedQs] = useState<Question[]>([]);
  const [showMissed, setShowMissed] = useState(false);
  const start = useCallback((t: QuizType) => {
    setQuizType(t); setQuestions(makeQuestions(t)); setQi(0); setPicked(null);
    setRevealed(false); setScore(0); setDone(false); setHistory([]); setMissedQs([]); setShowMissed(false);
  }, []);
  const answer = (idx: number) => {
    if (revealed) return;
    setPicked(idx); setRevealed(true);
    const ok = idx === questions[qi].correct;
    if (ok) setScore(s => s + 1);
    else setMissedQs(prev => [...prev, questions[qi]]);
    setHistory(h => [...h, ok]);
    // Save quiz completion
    try {
      const stats = JSON.parse(localStorage.getItem('kr-quiz-stats') || '{}');
      stats.totalQuizzes = (stats.totalQuizzes || 0) + (qi + 1 === questions.length ? 1 : 0);
      stats.totalCorrect = (stats.totalCorrect || 0) + (ok ? 1 : 0);
      stats.totalAnswered = (stats.totalAnswered || 0) + 1;
      if (ok && qi + 1 === questions.length && score + 1 === questions.length) stats.perfectScores = (stats.perfectScores || 0) + 1;
      localStorage.setItem('kr-quiz-stats', JSON.stringify(stats));
    } catch { /* */ }
  };
  const next = () => {
    if (qi + 1 >= questions.length) { setDone(true); return; }
    setQi(q => q + 1); setPicked(null); setRevealed(false);
  };
  const pct = useMemo(() => questions.length ? Math.round((score / questions.length) * 100) : 0, [score, questions.length]);
  // ─── MENU ───
  if (!quizType) {
    return (
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-3xl p-6">
          <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white mb-2">🎯 Practice Zone — 연습</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            5 quiz types. No timers. No penalties. Every attempt builds your Korean.
          </p>
        </motion.div>
        <div className="space-y-3">
          {([
            { t: 'hangul' as QuizType, title: 'Hangul Characters', desc: 'Identify consonants & vowels', emoji: '🔤', grad: 'from-indigo-500 to-blue-600' },
            { t: 'vocab' as QuizType, title: 'Vocabulary', desc: 'Match Korean words to meanings', emoji: '📚', grad: 'from-rose-500 to-pink-600' },
            { t: 'particles' as QuizType, title: 'Particle Practice', desc: 'Fill in 은/는, 이/가, 을/를, 에/에서', emoji: '🧩', grad: 'from-emerald-500 to-teal-600' },
            { t: 'sentences' as QuizType, title: 'Sentence & Conjugation', desc: 'Test grammar and sentence structure', emoji: '📝', grad: 'from-amber-500 to-orange-600' },
            { t: 'mixed' as QuizType, title: 'Ultimate Mixed', desc: 'All types combined', emoji: '🌟', grad: 'from-purple-500 to-indigo-600' },
          ]).map((item, i) => (
            <motion.button key={item.t} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => start(item.t)}
              className={`w-full text-left p-5 rounded-2xl bg-gradient-to-r ${item.grad} text-white shadow-lg hover:shadow-xl transition-shadow`}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{item.emoji}</span>
                <div>
                  <div className="font-bold text-lg">{item.title}</div>
                  <div className="text-sm opacity-80">{item.desc}</div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
        <div className="glass rounded-2xl p-4 text-sm text-slate-500 dark:text-slate-400 text-center">
          💜 No timers. No pressure. Just learning at your pace.
        </div>
      </div>
    );
  }
  // ─── RESULTS ───
  if (done) {
    const msg = pct >= 90 ? { text: '완벽해요! Amazing! 🎉', c: 'text-emerald-600' }
      : pct >= 70 ? { text: '잘했어요! Great progress! 🌟', c: 'text-emerald-600' }
      : pct >= 50 ? { text: '괜찮아요! Strong foundations! 💪', c: 'text-blue-600' }
      : { text: '화이팅! Every attempt counts! 🌱', c: 'text-purple-600' };
    return (
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-3xl p-8 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }} className="text-6xl mb-4">
            {pct >= 80 ? '🏆' : pct >= 50 ? '⭐' : '🌱'}
          </motion.div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Practice Complete!</h2>
          <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">{score}/{questions.length}</div>
          <div className="text-sm text-slate-500 mb-2">{pct}%</div>
          <p className={`text-sm font-semibold ${msg.c} mb-5`}>{msg.text}</p>
          <div className="flex justify-center gap-1.5 mb-6">
            {history.map((ok, i) => (
              <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 + i * 0.04 }}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${ok ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-500'}`}
              >{ok ? '✓' : '✗'}</motion.div>
            ))}
          </div>
          <div className="flex gap-3 justify-center flex-wrap">
            <button onClick={() => start(quizType)} className="px-6 py-2.5 bg-indigo-500 text-white rounded-xl font-bold hover:bg-indigo-600">Try Again</button>
            <button onClick={() => setQuizType(null)} className="px-6 py-2.5 glass rounded-xl font-bold text-slate-600 dark:text-slate-300">Menu</button>
          </div>
          {/* Review missed */}
          {missedQs.length > 0 && (
            <div className="mt-6">
              <button onClick={() => setShowMissed(!showMissed)}
                className="text-sm text-orange-500 font-bold hover:text-orange-600"
              >{showMissed ? '▴ Hide Review' : '▾ Review Missed Questions'}</button>
              <AnimatePresence>
                {showMissed && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mt-3 space-y-2 text-left"
                  >
                    {missedQs.map((q, i) => (
                      <div key={i} className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-3 text-sm">
                        <div className="font-bold text-orange-700 dark:text-orange-400 mb-1">{q.question}</div>
                        <div className="text-orange-600 dark:text-orange-300">{q.explanation}</div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>
    );
  }
  // ─── QUESTION ───
  const q = questions[qi];
  return (
    <div className="space-y-5">
      <div className="glass rounded-2xl p-4">
        <div className="flex items-center justify-between text-sm text-slate-500 mb-2">
          <span>Question {qi + 1}/{questions.length}</span>
          <span className="text-[10px] bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-lg font-bold">{q.tag}</span>
        </div>
        <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
            initial={{ width: 0 }} animate={{ width: `${((qi + 1) / questions.length) * 100}%` }} />
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={qi} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
          className="glass rounded-3xl p-6 sm:p-8 text-center"
        >
          <div className="text-3xl sm:text-5xl font-bold text-indigo-600 dark:text-indigo-400 mb-3 animate-float">{q.question}</div>
          {q.sub && <p className="text-slate-500 dark:text-slate-400 text-sm">{q.sub}</p>}
        </motion.div>
      </AnimatePresence>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {q.options.map((opt, i) => {
          let cls = 'glass hover:bg-white dark:hover:bg-slate-800 hover:shadow-md text-slate-700 dark:text-white';
          if (revealed) {
            if (i === q.correct) cls = 'bg-emerald-500 text-white shadow-lg shadow-emerald-200';
            else if (i === picked) cls = 'bg-orange-400 text-white shadow-lg shadow-orange-200';
            else cls = 'glass text-slate-400';
          }
          return (
            <motion.button key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              whileHover={!revealed ? { scale: 1.02 } : {}} whileTap={!revealed ? { scale: 0.98 } : {}}
              onClick={() => answer(i)} disabled={revealed}
              className={`p-4 rounded-2xl font-semibold text-left transition-all text-sm ${cls}`}
            ><span className="mr-2 opacity-50">{['A','B','C','D'][i]}.</span>{opt}</motion.button>
          );
        })}
      </div>
      <AnimatePresence>
        {revealed && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
            <div className={`rounded-2xl p-4 text-sm ${
              picked === q.correct
                ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                : 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800'
            }`}>
              <strong>{picked === q.correct ? '✅ Correct! ' : '🧡 Not quite — '}</strong>{q.explanation}
            </div>
            <button onClick={next}
              className="w-full py-3 bg-indigo-500 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-colors"
            >{qi + 1 >= questions.length ? 'See Results' : 'Next →'}</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
