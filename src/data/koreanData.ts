// ═══════════════════════════════════════════════════════════
// 한국어 마스터 — Complete Korean Language Data (Enhanced)
// Revised Romanization (국립국어원, National Institute of Korean Language)
// Hangul: King Sejong the Great (세종대왕), 1443. Promulgated 1446.
// ═══════════════════════════════════════════════════════════
export interface HangulChar {
  char: string;
  romanization: string;
  name: string;
  nameKr: string;
  sound: string;
  filipinoHint: string;
  type: 'consonant' | 'vowel' | 'double' | 'compound';
  group?: string;
}
export interface VocabItem {
  korean: string;
  romanization: string;
  english: string;
  filipino: string;
  note?: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  example?: { kr: string; rom: string; en: string; ph: string };
}
export interface GrammarRule {
  id: number;
  title: string;
  titleKr: string;
  explanation: string;
  structure: string;
  examples: { korean: string; romanization: string; english: string; filipino: string }[];
  filipinoParallel: string;
  tip: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}
export interface CultureNote {
  id: number;
  title: string;
  titleKr: string;
  content: string;
  filipinoConnection: string;
  emoji: string;
}
export interface Achievement {
  id: string;
  title: string;
  titleKr: string;
  description: string;
  emoji: string;
  condition: string;
}
export interface PronunciationRule {
  id: number;
  title: string;
  titleKr: string;
  rule: string;
  examples: { written: string; pronounced: string; romanization: string; meaning: string }[];
  filipinoNote: string;
}
// ────────────────────────────────
// CONSONANTS (자음, jaeum)
// Shape design: based on mouth/tongue position
// ────────────────────────────────
export const consonants: HangulChar[] = [
  { char: 'ㄱ', romanization: 'g / k', name: 'giyeok', nameKr: '기역', sound: '"g" as in "go" at start; "k" as in "back" at end', filipinoHint: 'Like Filipino "g" in "gatas" — soft and voiced', type: 'consonant', group: 'velar' },
  { char: 'ㄴ', romanization: 'n', name: 'nieun', nameKr: '니은', sound: '"n" as in "no"', filipinoHint: 'Same as Filipino "n" in "naman" — identical', type: 'consonant', group: 'alveolar' },
  { char: 'ㄷ', romanization: 'd / t', name: 'digeut', nameKr: '디귿', sound: '"d" at start; "t" at end', filipinoHint: 'Like Filipino "d" in "dito"', type: 'consonant', group: 'alveolar' },
  { char: 'ㄹ', romanization: 'r / l', name: 'rieul', nameKr: '리을', sound: 'Flapped "r" between vowels; "l" at end', filipinoHint: 'Very close to Filipino flapped "r" in "para" — your biggest advantage!', type: 'consonant', group: 'liquid' },
  { char: 'ㅁ', romanization: 'm', name: 'mieum', nameKr: '미음', sound: '"m" as in "mom"', filipinoHint: 'Same as Filipino "m" in "mama" — identical', type: 'consonant', group: 'bilabial' },
  { char: 'ㅂ', romanization: 'b / p', name: 'bieup', nameKr: '비읍', sound: '"b" at start; "p" at end', filipinoHint: 'Like Filipino "b" in "bata"', type: 'consonant', group: 'bilabial' },
  { char: 'ㅅ', romanization: 's', name: 'siot', nameKr: '시옷', sound: '"s" as in "sun"; "sh" before ㅣ', filipinoHint: 'Same as Filipino "s" in "sana"', type: 'consonant', group: 'alveolar' },
  { char: 'ㅇ', romanization: '- / ng', name: 'ieung', nameKr: '이응', sound: 'Silent at start; "ng" at end', filipinoHint: '"ng" is IDENTICAL to Filipino "ng" in "ang" — you already know this!', type: 'consonant', group: 'velar' },
  { char: 'ㅈ', romanization: 'j', name: 'jieut', nameKr: '지읒', sound: '"j" as in "just"', filipinoHint: 'Like Filipino "j" in "jeep" (dyip)', type: 'consonant', group: 'palatal' },
  { char: 'ㅊ', romanization: 'ch', name: 'chieut', nameKr: '치읓', sound: '"ch" as in "church" — aspirated', filipinoHint: 'Like Filipino "ts" in "tsismis" but with more air', type: 'consonant', group: 'palatal' },
  { char: 'ㅋ', romanization: 'k', name: 'kieuk', nameKr: '키읔', sound: 'Strong "k" with forceful breath', filipinoHint: 'Stronger than Filipino "k" — add a big puff of air', type: 'consonant', group: 'velar' },
  { char: 'ㅌ', romanization: 't', name: 'tieut', nameKr: '티읕', sound: 'Strong "t" with forceful breath', filipinoHint: 'Stronger than Filipino "t" — aspirated', type: 'consonant', group: 'alveolar' },
  { char: 'ㅍ', romanization: 'p', name: 'pieup', nameKr: '피읖', sound: 'Strong "p" with forceful breath', filipinoHint: 'Stronger than Filipino "p" — aspirated', type: 'consonant', group: 'bilabial' },
  { char: 'ㅎ', romanization: 'h', name: 'hieut', nameKr: '히읗', sound: '"h" as in "hat"', filipinoHint: 'Same as Filipino "h" in "hindi"', type: 'consonant', group: 'glottal' },
];
export const vowels: HangulChar[] = [
  { char: 'ㅏ', romanization: 'a', name: 'a', nameKr: '아', sound: '"a" as in "father"', filipinoHint: 'Same as Filipino "a" in "ama" — identical!', type: 'vowel' },
  { char: 'ㅑ', romanization: 'ya', name: 'ya', nameKr: '야', sound: '"ya" as in "yard"', filipinoHint: 'Same as Filipino "ya" in "yaman"', type: 'vowel' },
  { char: 'ㅓ', romanization: 'eo', name: 'eo', nameKr: '어', sound: 'Between "uh" and "aw"', filipinoHint: 'No exact Filipino match — say "o" with mouth more open and unrounded', type: 'vowel' },
  { char: 'ㅕ', romanization: 'yeo', name: 'yeo', nameKr: '여', sound: '"yo" but mouth more open', filipinoHint: 'Say Filipino "yo" but open your mouth wider', type: 'vowel' },
  { char: 'ㅗ', romanization: 'o', name: 'o', nameKr: '오', sound: '"o" as in "go" — rounded', filipinoHint: 'Same as Filipino "o" in "opo"', type: 'vowel' },
  { char: 'ㅛ', romanization: 'yo', name: 'yo', nameKr: '요', sound: '"yo" as in "yoga"', filipinoHint: 'Same as Filipino "yo"', type: 'vowel' },
  { char: 'ㅜ', romanization: 'u', name: 'u', nameKr: '우', sound: '"oo" as in "moon"', filipinoHint: 'Same as Filipino "u" in "upo"', type: 'vowel' },
  { char: 'ㅠ', romanization: 'yu', name: 'yu', nameKr: '유', sound: '"you"', filipinoHint: 'Same as Filipino "yu"', type: 'vowel' },
  { char: 'ㅡ', romanization: 'eu', name: 'eu', nameKr: '으', sound: '"oo" but with lips FLAT/spread', filipinoHint: 'No Filipino equivalent — say "u" with lips spread flat like smiling', type: 'vowel' },
  { char: 'ㅣ', romanization: 'i', name: 'i', nameKr: '이', sound: '"ee" as in "see"', filipinoHint: 'Same as Filipino "i" in "itay"', type: 'vowel' },
];
export const doubleConsonants: HangulChar[] = [
  { char: 'ㄲ', romanization: 'kk', name: 'ssang-giyeok', nameKr: '쌍기역', sound: 'Tense "k" — no air, throat tight', filipinoHint: 'No Filipino equivalent; like "k" in English "sky" (unaspirated)', type: 'double', group: 'velar' },
  { char: 'ㄸ', romanization: 'tt', name: 'ssang-digeut', nameKr: '쌍디귿', sound: 'Tense "t" — no air, throat tight', filipinoHint: 'Like a very sharp stopped "t" with tightened throat', type: 'double', group: 'alveolar' },
  { char: 'ㅃ', romanization: 'pp', name: 'ssang-bieup', nameKr: '쌍비읍', sound: 'Tense "p" — no air, throat tight', filipinoHint: 'Sharp "p" — hold breath then release', type: 'double', group: 'bilabial' },
  { char: 'ㅆ', romanization: 'ss', name: 'ssang-siot', nameKr: '쌍시옷', sound: 'Strong tense "s"', filipinoHint: 'Strong hissing "ss" with throat tension', type: 'double', group: 'alveolar' },
  { char: 'ㅉ', romanization: 'jj', name: 'ssang-jieut', nameKr: '쌍지읒', sound: 'Tense "j" — no air, throat tight', filipinoHint: 'Very sharp "j" with tightened throat', type: 'double', group: 'palatal' },
];
export const compoundVowels: HangulChar[] = [
  { char: 'ㅐ', romanization: 'ae', name: 'ae', nameKr: '애', sound: '"a" as in "apple"', filipinoHint: 'Between Filipino "a" and "e"', type: 'compound' },
  { char: 'ㅒ', romanization: 'yae', name: 'yae', nameKr: '얘', sound: '"ya"+"e" blended', filipinoHint: 'Say "ye" with mouth wider', type: 'compound' },
  { char: 'ㅔ', romanization: 'e', name: 'e', nameKr: '에', sound: '"e" as in "bed"', filipinoHint: 'Same as Filipino "e"', type: 'compound' },
  { char: 'ㅖ', romanization: 'ye', name: 'ye', nameKr: '예', sound: '"ye" as in "yes"', filipinoHint: 'Same as Filipino "ye"', type: 'compound' },
  { char: 'ㅘ', romanization: 'wa', name: 'wa', nameKr: '와', sound: '"wa" as in "wand"', filipinoHint: 'Same as Filipino "wa" in "wala"', type: 'compound' },
  { char: 'ㅙ', romanization: 'wae', name: 'wae', nameKr: '왜', sound: '"we" as in "wet"', filipinoHint: 'Similar to Filipino "we"', type: 'compound' },
  { char: 'ㅚ', romanization: 'oe', name: 'oe', nameKr: '외', sound: 'Modern: same as "we"', filipinoHint: 'Pronounced same as "we" in modern Seoul Korean', type: 'compound' },
  { char: 'ㅝ', romanization: 'wo', name: 'wo', nameKr: '워', sound: '"wo" as in "wonder"', filipinoHint: 'Similar to Filipino "wo"', type: 'compound' },
  { char: 'ㅞ', romanization: 'we', name: 'we', nameKr: '웨', sound: '"we" as in "wet"', filipinoHint: 'Same as ㅙ/ㅚ in modern Korean', type: 'compound' },
  { char: 'ㅟ', romanization: 'wi', name: 'wi', nameKr: '위', sound: '"wee" as in "week"', filipinoHint: 'Same as Filipino "wi"', type: 'compound' },
  { char: 'ㅢ', romanization: 'ui', name: 'ui', nameKr: '의', sound: 'Glide from ㅡ to ㅣ', filipinoHint: 'No Filipino equivalent — slide from flat "u" to "ee"', type: 'compound' },
];
// ────────────────────────────────
// CONSONANT TRIOS (Plain/Aspirated/Tense)
// ────────────────────────────────
export const consonantTrios = [
  { plain: 'ㄱ', aspirated: 'ㅋ', tense: 'ㄲ', label: 'G/K group', plainSound: 'soft g/k', aspiratedSound: 'strong k + air', tenseSound: 'stiff k, no air' },
  { plain: 'ㄷ', aspirated: 'ㅌ', tense: 'ㄸ', label: 'D/T group', plainSound: 'soft d/t', aspiratedSound: 'strong t + air', tenseSound: 'stiff t, no air' },
  { plain: 'ㅂ', aspirated: 'ㅍ', tense: 'ㅃ', label: 'B/P group', plainSound: 'soft b/p', aspiratedSound: 'strong p + air', tenseSound: 'stiff p, no air' },
  { plain: 'ㅈ', aspirated: 'ㅊ', tense: 'ㅉ', label: 'J/Ch group', plainSound: 'soft j', aspiratedSound: 'ch + air', tenseSound: 'stiff j, no air' },
  { plain: 'ㅅ', aspirated: null, tense: 'ㅆ', label: 'S group', plainSound: 'soft s', aspiratedSound: '—', tenseSound: 'strong ss' },
];
// ────────────────────────────────
// SYLLABLE BLOCK INFO
// ────────────────────────────────
export const syllableBlockInfo = {
  title: 'How Korean Syllable Blocks Work',
  explanation: 'Korean characters combine into square-shaped syllable blocks. Every block = one syllable. Every block MUST start with a consonant (use ㅇ as a silent placeholder for vowel-initial syllables).',
  structures: [
    { type: 'CV', label: 'Consonant + Vowel', example: '나', breakdown: 'ㄴ (n) + ㅏ (a) = 나 (na)', layout: 'Left-Right or Top-Bottom' },
    { type: 'CVC', label: 'Consonant + Vowel + Final', example: '한', breakdown: 'ㅎ (h) + ㅏ (a) + ㄴ (n) = 한 (han)', layout: 'Final consonant (받침 batchim) at bottom' },
    { type: 'CVCC', label: 'Consonant + Vowel + Double Final', example: '읽', breakdown: 'ㅇ (-) + ㅣ (i) + ㄹㄱ (lk) = 읽 (ilk)', layout: 'Two consonants at bottom (less common)' },
  ],
};
// ────────────────────────────────
// PRONUNCIATION CHANGE RULES
// Critical for actual spoken proficiency
// ────────────────────────────────
export const pronunciationRules: PronunciationRule[] = [
  {
    id: 1,
    title: 'Linking (연음)',
    titleKr: '연음 법칙',
    rule: 'When a syllable ending in a consonant (받침) is followed by a syllable starting with ㅇ, the final consonant moves to replace the ㅇ and becomes the initial consonant of the next syllable.',
    examples: [
      { written: '한국어', pronounced: '한구거', romanization: 'han-gu-geo', meaning: 'Korean language' },
      { written: '먹어요', pronounced: '머거요', romanization: 'meo-geo-yo', meaning: 'I eat' },
      { written: '읽어요', pronounced: '일거요', romanization: 'il-geo-yo', meaning: 'I read' },
    ],
    filipinoNote: 'Filipino also links sounds naturally — "mag-aaral" flows together. Korean linking works similarly but across syllable blocks.',
  },
  {
    id: 2,
    title: 'Nasalization (비음화)',
    titleKr: '비음화',
    rule: 'When ㄱ, ㄷ, or ㅂ appear before ㄴ or ㅁ, they nasalize: ㄱ→ㅇ, ㄷ→ㄴ, ㅂ→ㅁ.',
    examples: [
      { written: '학문', pronounced: '항문', romanization: 'hang-mun', meaning: 'academics' },
      { written: '읽는', pronounced: '잉는', romanization: 'ing-neun', meaning: 'reading (adj)' },
      { written: '합니다', pronounced: '함니다', romanization: 'ham-ni-da', meaning: 'I do (formal)' },
    ],
    filipinoNote: 'Filipino nasalization exists too — "pangalan" has nasal sounds. Korean is more systematic about when consonants change to nasals.',
  },
  {
    id: 3,
    title: 'Aspiration (격음화)',
    titleKr: '격음화',
    rule: 'When ㅎ meets ㄱ, ㄷ, ㅂ, or ㅈ (or vice versa), they combine into aspirated consonants: ㅋ, ㅌ, ㅍ, ㅊ.',
    examples: [
      { written: '좋다', pronounced: '조타', romanization: 'jo-ta', meaning: 'to be good' },
      { written: '넣다', pronounced: '너타', romanization: 'neo-ta', meaning: 'to put in' },
      { written: '않다', pronounced: '안타', romanization: 'an-ta', meaning: 'to not be' },
    ],
    filipinoNote: 'No direct Filipino parallel. This is unique to Korean — ㅎ acts as a "power-up" that strengthens the next consonant.',
  },
  {
    id: 4,
    title: 'Tensification (경음화)',
    titleKr: '경음화',
    rule: 'After obstruent finals (ㄱ, ㄷ, ㅂ), the following plain consonant becomes tense: ㄱ→ㄲ, ㄷ→ㄸ, ㅂ→ㅃ, ㅅ→ㅆ, ㅈ→ㅉ.',
    examples: [
      { written: '학교', pronounced: '학꾜', romanization: 'hak-kkyo', meaning: 'school' },
      { written: '식당', pronounced: '식땅', romanization: 'sik-ttang', meaning: 'restaurant' },
      { written: '있다', pronounced: '있따', romanization: 'it-tta', meaning: 'to exist/have' },
    ],
    filipinoNote: 'No Filipino equivalent. This is one of the trickiest Korean rules — listen to native speakers and you\'ll hear these doubled sounds after stops.',
  },
];
// ────────────────────────────────
// VOCABULARY (어휘) — Enhanced with examples
// ────────────────────────────────
export const vocabularyCategories: Record<string, { label: string; emoji: string; items: VocabItem[] }> = {
  greetings: {
    label: 'Greetings & Basics',
    emoji: '👋',
    items: [
      { korean: '안녕하세요', romanization: 'annyeonghaseyo', english: 'Hello (polite)', filipino: 'Kamusta po', note: 'Universal polite greeting — works for "hi" and "how are you"', level: 'beginner', example: { kr: 'A: 안녕하세요! B: 네, 안녕하세요!', rom: 'A: Annyeonghaseyo! B: Ne, annyeonghaseyo!', en: 'A: Hello! B: Yes, hello!', ph: 'A: Kamusta po! B: Oo, kamusta po!' } },
      { korean: '안녕히 가세요', romanization: 'annyeonghi gaseyo', english: 'Goodbye (to one leaving)', filipino: 'Paalam po (sa aalis)', note: 'Said to the person who is LEAVING', level: 'beginner' },
      { korean: '안녕히 계세요', romanization: 'annyeonghi gyeseyo', english: 'Goodbye (to one staying)', filipino: 'Paalam po (sa naiwan)', note: 'Said to the person who is STAYING', level: 'beginner' },
      { korean: '감사합니다', romanization: 'gamsahamnida', english: 'Thank you (formal)', filipino: 'Salamat po', level: 'beginner', example: { kr: '도와주셔서 감사합니다.', rom: 'Dowajusyeoseo gamsahamnida.', en: 'Thank you for helping me.', ph: 'Salamat po sa tulong.' } },
      { korean: '고맙습니다', romanization: 'gomapseumnida', english: 'Thank you (formal, native)', filipino: 'Salamat po', note: 'Native Korean; equally formal', level: 'beginner' },
      { korean: '죄송합니다', romanization: 'joesonghamnida', english: "I'm sorry (formal)", filipino: 'Pasensya na po', level: 'beginner' },
      { korean: '네', romanization: 'ne', english: 'Yes', filipino: 'Oo', level: 'beginner' },
      { korean: '아니요', romanization: 'aniyo', english: 'No', filipino: 'Hindi', level: 'beginner' },
      { korean: '만나서 반갑습니다', romanization: 'mannaseo bangapseumnida', english: 'Nice to meet you', filipino: 'Ikinagagalak kong makilala ka', level: 'beginner' },
      { korean: '실례합니다', romanization: 'sillyehamnida', english: 'Excuse me', filipino: 'Paumanhin po', level: 'beginner' },
      { korean: '잠시만요', romanization: 'jamsimanyo', english: 'Just a moment', filipino: 'Sandali lang po', level: 'beginner' },
      { korean: '괜찮아요', romanization: 'gwaenchanayo', english: "It's okay / I'm fine", filipino: 'Okay lang', level: 'beginner' },
      { korean: '천만에요', romanization: 'cheonmaneyo', english: "You're welcome", filipino: 'Walang anuman', level: 'beginner' },
    ],
  },
  numbers: {
    label: 'Numbers',
    emoji: '🔢',
    items: [
      { korean: '하나 / 일', romanization: 'hana / il', english: '1', filipino: 'Isa', note: 'Native (하나) for counting/age; Sino-Korean (일) for dates/math/money', level: 'beginner' },
      { korean: '둘 / 이', romanization: 'dul / i', english: '2', filipino: 'Dalawa', level: 'beginner' },
      { korean: '셋 / 삼', romanization: 'set / sam', english: '3', filipino: 'Tatlo', level: 'beginner' },
      { korean: '넷 / 사', romanization: 'net / sa', english: '4', filipino: 'Apat', level: 'beginner' },
      { korean: '다섯 / 오', romanization: 'daseot / o', english: '5', filipino: 'Lima', level: 'beginner' },
      { korean: '여섯 / 육', romanization: 'yeoseot / yuk', english: '6', filipino: 'Anim', level: 'beginner' },
      { korean: '일곱 / 칠', romanization: 'ilgop / chil', english: '7', filipino: 'Pito', level: 'beginner' },
      { korean: '여덟 / 팔', romanization: 'yeodeol / pal', english: '8', filipino: 'Walo', level: 'beginner' },
      { korean: '아홉 / 구', romanization: 'ahop / gu', english: '9', filipino: 'Siyam', level: 'beginner' },
      { korean: '열 / 십', romanization: 'yeol / sip', english: '10', filipino: 'Sampu', level: 'beginner' },
      { korean: '스물 / 이십', romanization: 'seumul / isip', english: '20', filipino: 'Dalawampu', level: 'intermediate' },
      { korean: '백', romanization: 'baek', english: '100', filipino: 'Isang daan', note: 'Sino-Korean only', level: 'intermediate' },
      { korean: '천', romanization: 'cheon', english: '1,000', filipino: 'Isang libo', level: 'intermediate' },
      { korean: '만', romanization: 'man', english: '10,000', filipino: 'Sampung libo', note: 'Korean counts in units of 10,000 (만), not 1,000', level: 'intermediate' },
    ],
  },
  dailyLife: {
    label: 'Daily Life',
    emoji: '🌅',
    items: [
      { korean: '물', romanization: 'mul', english: 'Water', filipino: 'Tubig', level: 'beginner', example: { kr: '물 주세요.', rom: 'Mul juseyo.', en: 'Water, please.', ph: 'Tubig po.' } },
      { korean: '밥', romanization: 'bap', english: 'Cooked rice / Meal', filipino: 'Kanin / Kain', note: 'Both "rice" and "meal" — central to Korean and Filipino life', level: 'beginner' },
      { korean: '집', romanization: 'jip', english: 'House / Home', filipino: 'Bahay', level: 'beginner' },
      { korean: '학교', romanization: 'hakgyo', english: 'School', filipino: 'Paaralan', level: 'beginner' },
      { korean: '사람', romanization: 'saram', english: 'Person / People', filipino: 'Tao', level: 'beginner' },
      { korean: '친구', romanization: 'chingu', english: 'Friend', filipino: 'Kaibigan', level: 'beginner' },
      { korean: '가족', romanization: 'gajok', english: 'Family', filipino: 'Pamilya', level: 'beginner' },
      { korean: '시간', romanization: 'sigan', english: 'Time', filipino: 'Oras', level: 'beginner' },
      { korean: '오늘', romanization: 'oneul', english: 'Today', filipino: 'Ngayon', level: 'beginner' },
      { korean: '내일', romanization: 'naeil', english: 'Tomorrow', filipino: 'Bukas', level: 'beginner' },
      { korean: '어제', romanization: 'eoje', english: 'Yesterday', filipino: 'Kahapon', level: 'beginner' },
      { korean: '일', romanization: 'il', english: 'Work / Day', filipino: 'Trabaho / Araw', level: 'beginner' },
      { korean: '돈', romanization: 'don', english: 'Money', filipino: 'Pera', level: 'beginner' },
      { korean: '전화', romanization: 'jeonhwa', english: 'Phone / Call', filipino: 'Telepono / Tawag', level: 'beginner' },
    ],
  },
  food: {
    label: 'Food & Drink',
    emoji: '🍚',
    items: [
      { korean: '김치', romanization: 'gimchi', english: 'Kimchi', filipino: 'Kimchi (atsara ang pinakamalapit)', note: "Korea's iconic fermented dish; UNESCO ICH 2013", level: 'beginner' },
      { korean: '불고기', romanization: 'bulgogi', english: 'Grilled marinated beef', filipino: 'Bulgogi (parang bistek)', level: 'beginner' },
      { korean: '비빔밥', romanization: 'bibimbap', english: 'Mixed rice bowl', filipino: 'Bibimbap (rice na may topping)', level: 'beginner' },
      { korean: '라면', romanization: 'ramyeon', english: 'Instant noodles', filipino: 'Ramen / Noodles', level: 'beginner' },
      { korean: '치킨', romanization: 'chikin', english: 'Fried chicken', filipino: 'Pritong manok', note: '치맥 = chicken + beer, massive cultural staple', level: 'beginner' },
      { korean: '커피', romanization: 'keopi', english: 'Coffee', filipino: 'Kape', note: "Korea: one of world's highest coffee consumption rates", level: 'beginner' },
      { korean: '소주', romanization: 'soju', english: 'Soju (Korean liquor)', filipino: 'Soju', note: 'Iconic distilled spirit; ~17-20% ABV', level: 'intermediate' },
      { korean: '떡볶이', romanization: 'tteokbokki', english: 'Spicy rice cakes', filipino: 'Tteokbokki (maanghang na rice cake)', level: 'beginner' },
      { korean: '삼겹살', romanization: 'samgyeopsal', english: 'Grilled pork belly', filipino: 'Samgyupsal (liempo)', level: 'beginner' },
      { korean: '맛있어요', romanization: 'masisseoyo', english: "It's delicious", filipino: 'Masarap', level: 'beginner', example: { kr: '이 음식이 정말 맛있어요!', rom: 'I eumsigi jeongmal masisseoyo!', en: 'This food is really delicious!', ph: 'Sobrang sarap talaga nito!' } },
      { korean: '배고파요', romanization: 'baegopayo', english: "I'm hungry", filipino: 'Gutom ako', level: 'beginner' },
      { korean: '배불러요', romanization: 'baebulleoyo', english: "I'm full", filipino: 'Busog na ako', level: 'beginner' },
    ],
  },
  emotions: {
    label: 'Emotions & Feelings',
    emoji: '💜',
    items: [
      { korean: '사랑', romanization: 'sarang', english: 'Love', filipino: 'Pag-ibig / Pagmamahal', level: 'beginner' },
      { korean: '행복', romanization: 'haengbok', english: 'Happiness', filipino: 'Kaligayahan', level: 'beginner' },
      { korean: '슬퍼요', romanization: 'seulpeoyo', english: "I'm sad", filipino: 'Malungkot ako', level: 'beginner' },
      { korean: '화나요', romanization: 'hwanayo', english: "I'm angry", filipino: 'Galit ako', level: 'beginner' },
      { korean: '걱정돼요', romanization: 'geokjeongdwaeyo', english: "I'm worried", filipino: 'Nag-aalala ako', level: 'intermediate' },
      { korean: '피곤해요', romanization: 'pigonhaeyo', english: "I'm tired", filipino: 'Pagod ako', level: 'beginner' },
      { korean: '기뻐요', romanization: 'gippeoyo', english: "I'm happy/glad", filipino: 'Masaya ako', level: 'beginner' },
      { korean: '희망', romanization: 'huimang', english: 'Hope', filipino: 'Pag-asa', level: 'beginner' },
      { korean: '보고 싶어요', romanization: 'bogo sipeoyo', english: 'I miss you', filipino: 'Miss na kita', level: 'intermediate' },
      { korean: '좋아해요', romanization: 'joahaeyo', english: 'I like (it/you)', filipino: 'Gusto ko', level: 'beginner' },
      { korean: '무서워요', romanization: 'museowoyo', english: "I'm scared", filipino: 'Takot ako', level: 'beginner' },
      { korean: '외로워요', romanization: 'oerowoyo', english: "I'm lonely", filipino: 'Nalulungkot ako (mag-isa)', level: 'intermediate' },
    ],
  },
  essentials: {
    label: 'Essential Phrases',
    emoji: '⭐',
    items: [
      { korean: '이것은 뭐예요?', romanization: 'igeoseun mwoyeyo?', english: 'What is this?', filipino: 'Ano ito?', level: 'beginner' },
      { korean: '얼마예요?', romanization: 'eolmayeyo?', english: 'How much?', filipino: 'Magkano?', level: 'beginner' },
      { korean: '화장실이 어디예요?', romanization: 'hwajangsiri eodiyeyo?', english: 'Where is the restroom?', filipino: 'Nasaan ang banyo?', level: 'beginner' },
      { korean: '도와주세요', romanization: 'dowajuseyo', english: 'Please help me', filipino: 'Tulungan niyo po ako', level: 'beginner' },
      { korean: '한국어를 공부하고 있어요', romanization: 'hangugeoreul gongbuhago isseoyo', english: 'I am studying Korean', filipino: 'Nag-aaral ako ng Korean', level: 'intermediate' },
      { korean: '천천히 말해 주세요', romanization: 'cheoncheonhi malhae juseyo', english: 'Please speak slowly', filipino: 'Pakidahan po ang pagsasalita', level: 'beginner' },
      { korean: '다시 한번 말해 주세요', romanization: 'dasi hanbeon malhae juseyo', english: 'Please say it again', filipino: 'Pakiulit po', level: 'beginner' },
      { korean: '잘 먹겠습니다', romanization: 'jal meokgesseumnida', english: 'I will eat well (before eating)', filipino: 'Kain na po (bago kumain)', note: 'Said before eating — like saying grace', level: 'beginner' },
      { korean: '잘 먹었습니다', romanization: 'jal meogeosseumnida', english: 'I ate well (after eating)', filipino: 'Busog na po (pagkatapos kumain)', level: 'beginner' },
      { korean: '사랑해요', romanization: 'saranghaeyo', english: 'I love you', filipino: 'Mahal kita', level: 'beginner' },
      { korean: '화이팅!', romanization: 'hwaiting!', english: 'You can do it! / Fighting!', filipino: 'Kaya mo yan!', note: 'Korean encouragement phrase from English "fighting"', level: 'beginner' },
      { korean: '저는 필리핀 사람이에요', romanization: 'jeoneun pillipin saramieyo', english: 'I am Filipino', filipino: 'Pilipino ako', level: 'beginner' },
      { korean: '몇 살이에요?', romanization: 'myeot sarieyo?', english: 'How old are you?', filipino: 'Ilang taon ka na?', note: 'Age is crucial in Korean — determines speech level', level: 'beginner' },
      { korean: '이름이 뭐예요?', romanization: 'ireumi mwoyeyo?', english: 'What is your name?', filipino: 'Ano pangalan mo?', level: 'beginner' },
    ],
  },
  family: {
    label: 'Family & People',
    emoji: '👨‍👩‍👧‍👦',
    items: [
      { korean: '엄마', romanization: 'eomma', english: 'Mom', filipino: 'Nanay / Mama', level: 'beginner' },
      { korean: '아빠', romanization: 'appa', english: 'Dad', filipino: 'Tatay / Papa', level: 'beginner' },
      { korean: '오빠', romanization: 'oppa', english: 'Older brother (said by female)', filipino: 'Kuya (sinasabi ng babae)', note: 'Also used for older male friend/boyfriend/celebrity by females', level: 'beginner' },
      { korean: '언니', romanization: 'eonni', english: 'Older sister (said by female)', filipino: 'Ate (sinasabi ng babae)', level: 'beginner' },
      { korean: '형', romanization: 'hyeong', english: 'Older brother (said by male)', filipino: 'Kuya (sinasabi ng lalaki)', level: 'beginner' },
      { korean: '누나', romanization: 'nuna', english: 'Older sister (said by male)', filipino: 'Ate (sinasabi ng lalaki)', level: 'beginner' },
      { korean: '동생', romanization: 'dongsaeng', english: 'Younger sibling', filipino: 'Bunso / Nakababata', level: 'beginner' },
      { korean: '할머니', romanization: 'halmeoni', english: 'Grandmother', filipino: 'Lola', level: 'beginner' },
      { korean: '할아버지', romanization: 'harabeoji', english: 'Grandfather', filipino: 'Lolo', level: 'beginner' },
      { korean: '선생님', romanization: 'seonsaengnim', english: 'Teacher (honorific)', filipino: "Guro / Sir / Ma'am", note: 'Also a respectful title for professionals', level: 'beginner' },
      { korean: '부모님', romanization: 'bumonim', english: 'Parents (honorific)', filipino: 'Mga magulang', level: 'beginner' },
      { korean: '남자친구', romanization: 'namjachingu', english: 'Boyfriend', filipino: 'Boyfriend / Kasintahan (lalaki)', level: 'beginner' },
      { korean: '여자친구', romanization: 'yeojachingu', english: 'Girlfriend', filipino: 'Girlfriend / Kasintahan (babae)', level: 'beginner' },
    ],
  },
  verbs: {
    label: 'Common Verbs',
    emoji: '🏃',
    items: [
      { korean: '가다', romanization: 'gada', english: 'to go', filipino: 'pumunta', level: 'beginner', example: { kr: '학교에 가요.', rom: 'Hakgyoe gayo.', en: 'I go to school.', ph: 'Pupunta ako sa paaralan.' } },
      { korean: '오다', romanization: 'oda', english: 'to come', filipino: 'pumunta dito', level: 'beginner' },
      { korean: '먹다', romanization: 'meokda', english: 'to eat', filipino: 'kumain', level: 'beginner' },
      { korean: '마시다', romanization: 'masida', english: 'to drink', filipino: 'uminom', level: 'beginner' },
      { korean: '하다', romanization: 'hada', english: 'to do', filipino: 'gawin', note: 'The most versatile verb — attaches to nouns to make verbs (공부하다 = to study)', level: 'beginner' },
      { korean: '보다', romanization: 'boda', english: 'to see / watch', filipino: 'tumingin / manood', level: 'beginner' },
      { korean: '읽다', romanization: 'ikda', english: 'to read', filipino: 'magbasa', level: 'beginner' },
      { korean: '쓰다', romanization: 'sseuda', english: 'to write / use', filipino: 'magsulat / gamitin', level: 'beginner' },
      { korean: '듣다', romanization: 'deutda', english: 'to listen / hear', filipino: 'makinig', level: 'beginner' },
      { korean: '말하다', romanization: 'malhada', english: 'to speak / say', filipino: 'magsalita', level: 'beginner' },
      { korean: '사다', romanization: 'sada', english: 'to buy', filipino: 'bumili', level: 'beginner' },
      { korean: '자다', romanization: 'jada', english: 'to sleep', filipino: 'matulog', level: 'beginner' },
      { korean: '일어나다', romanization: 'ireonada', english: 'to wake up / get up', filipino: 'gumising', level: 'beginner' },
      { korean: '좋아하다', romanization: 'joahada', english: 'to like', filipino: 'gustuhin / magustuhan', level: 'beginner' },
      { korean: '알다', romanization: 'alda', english: 'to know', filipino: 'malaman', level: 'beginner' },
      { korean: '모르다', romanization: 'moreuda', english: 'to not know', filipino: 'hindi malaman', level: 'beginner' },
    ],
  },
  adjectives: {
    label: 'Adjectives & Descriptions',
    emoji: '🎨',
    items: [
      { korean: '좋다', romanization: 'jota', english: 'good', filipino: 'mabuti / maganda', level: 'beginner' },
      { korean: '나쁘다', romanization: 'nappeuda', english: 'bad', filipino: 'masama', level: 'beginner' },
      { korean: '크다', romanization: 'keuda', english: 'big', filipino: 'malaki', level: 'beginner' },
      { korean: '작다', romanization: 'jakda', english: 'small', filipino: 'maliit', level: 'beginner' },
      { korean: '많다', romanization: 'manta', english: 'many / a lot', filipino: 'marami', level: 'beginner' },
      { korean: '적다', romanization: 'jeokda', english: 'few / little', filipino: 'konti', level: 'beginner' },
      { korean: '빠르다', romanization: 'ppareuda', english: 'fast', filipino: 'mabilis', level: 'beginner' },
      { korean: '느리다', romanization: 'neurida', english: 'slow', filipino: 'mabagal', level: 'beginner' },
      { korean: '덥다', romanization: 'deopda', english: 'hot (weather)', filipino: 'mainit', level: 'beginner' },
      { korean: '춥다', romanization: 'chupda', english: 'cold (weather)', filipino: 'malamig', level: 'beginner' },
      { korean: '예쁘다', romanization: 'yeppeuda', english: 'pretty', filipino: 'maganda', level: 'beginner' },
      { korean: '맛있다', romanization: 'masitta', english: 'delicious', filipino: 'masarap', level: 'beginner' },
    ],
  },
};
// ────────────────────────────────
// GRAMMAR (문법) — Enhanced
// ────────────────────────────────
export const grammarRules: GrammarRule[] = [
  {
    id: 1, title: 'Sentence Structure: SOV', titleKr: '문장 구조',
    explanation: 'Korean follows Subject-Object-Verb (SOV) order. The verb ALWAYS comes at the end. Filipino uses VSO, English uses SVO. This is the single biggest structural adjustment.',
    structure: 'Subject + Object + Verb',
    examples: [
      { korean: '나는 밥을 먹어요.', romanization: 'Naneun babeul meogeoyo.', english: 'I eat rice.', filipino: 'Kumakain ako ng kanin.' },
      { korean: '저는 한국어를 공부해요.', romanization: 'Jeoneun hangugeoreul gongbuhaeyo.', english: 'I study Korean.', filipino: 'Nag-aaral ako ng Korean.' },
    ],
    filipinoParallel: 'Filipino VSO: "Kumakain (V) ako (S) ng kanin (O)." Korean SOV: "나는 (S) 밥을 (O) 먹어요 (V)." Move the verb to the end.',
    tip: 'Identify the verb, move it to the end. Everything else goes before it.', level: 'beginner',
  },
  {
    id: 2, title: 'Topic Particle: 은/는', titleKr: '은/는',
    explanation: 'Marks what the sentence is ABOUT. Use 은 after consonant-ending syllables, 는 after vowel-ending syllables.',
    structure: 'Noun + 은 (consonant) / 는 (vowel)',
    examples: [
      { korean: '저는 학생이에요.', romanization: 'Jeoneun haksaengieyo.', english: 'I am a student.', filipino: 'Ako ay estudyante.' },
      { korean: '한국은 아름다워요.', romanization: 'Hangugeun areumdawoyo.', english: 'Korea is beautiful.', filipino: 'Ang Korea ay maganda.' },
    ],
    filipinoParallel: 'Like Filipino "ay" inversion: "Ako ay..." = 저는... Works like "Ang" + "ay" — marking the topic.',
    tip: 'Ends in consonant (받침) → 은. Ends in vowel → 는.', level: 'beginner',
  },
  {
    id: 3, title: 'Subject Particle: 이/가', titleKr: '이/가',
    explanation: 'Marks the grammatical subject, especially NEW information or emphasis. 이 after consonants, 가 after vowels.',
    structure: 'Noun + 이 (consonant) / 가 (vowel)',
    examples: [
      { korean: '날씨가 좋아요.', romanization: 'Nalssiga joayo.', english: 'The weather is good.', filipino: 'Maganda ang panahon.' },
      { korean: '누가 왔어요?', romanization: 'Nuga wasseoyo?', english: 'Who came?', filipino: 'Sino ang dumating?' },
    ],
    filipinoParallel: 'Like Filipino "ang" marking the focus: "Maganda ang panahon" = 날씨가 좋아요.',
    tip: 'Use 이/가 for new info or "who/what" answers. Use 은/는 for known topics.', level: 'beginner',
  },
  {
    id: 4, title: 'Object Particle: 을/를', titleKr: '을/를',
    explanation: 'Marks the direct object. 을 after consonants, 를 after vowels.',
    structure: 'Noun + 을 (consonant) / 를 (vowel)',
    examples: [
      { korean: '커피를 마셔요.', romanization: 'Keopireul masyeoyo.', english: 'I drink coffee.', filipino: 'Umiinom ako ng kape.' },
      { korean: '책을 읽어요.', romanization: 'Chaegeul ilgeoyo.', english: 'I read a book.', filipino: 'Nagbabasa ako ng libro.' },
    ],
    filipinoParallel: 'Like Filipino "ng" (nang): "Umiinom ako ng kape" — 커피를 마셔요.',
    tip: 'Object particle goes after the thing being acted upon, before the verb.', level: 'beginner',
  },
  {
    id: 5, title: 'Polite Speech: -요 Ending', titleKr: '해요체',
    explanation: 'The most useful speech level. Add -아요 when last vowel is ㅏ/ㅗ; -어요 for others. 하다 → 해요.',
    structure: 'Verb stem + 아요/어요 (하다 → 해요)',
    examples: [
      { korean: '가다 → 가요', romanization: 'gada → gayo', english: 'to go → go', filipino: 'pumunta → pumupunta' },
      { korean: '먹다 → 먹어요', romanization: 'meokda → meogeoyo', english: 'to eat → eat', filipino: 'kumain → kumakain' },
      { korean: '공부하다 → 공부해요', romanization: 'gongbuhada → gongbuhaeyo', english: 'to study → study', filipino: 'mag-aral → nag-aaral' },
    ],
    filipinoParallel: '-요 = Filipino "po" — instant politeness. Both cultures prioritize respectful speech.',
    tip: 'When in doubt, use -요 form. Polite without being stiff.', level: 'beginner',
  },
  {
    id: 6, title: 'Location: 에 / 에서', titleKr: '에 / 에서',
    explanation: '에 = destination/static location/time. 에서 = action location or starting point.',
    structure: 'Place + 에 (destination) / Place + 에서 (action location)',
    examples: [
      { korean: '학교에 가요.', romanization: 'Hakgyoe gayo.', english: 'I go to school.', filipino: 'Pupunta ako sa paaralan.' },
      { korean: '학교에서 공부해요.', romanization: 'Hakgyoeseo gongbuhaeyo.', english: 'I study at school.', filipino: 'Nag-aaral ako sa paaralan.' },
    ],
    filipinoParallel: 'Both like Filipino "sa" — but Korean distinguishes going TO (에) vs doing AT (에서).',
    tip: 'Going TO → 에. Doing something AT → 에서.', level: 'beginner',
  },
  {
    id: 7, title: 'Negation: 안 / -지 않다', titleKr: '부정문',
    explanation: 'Two ways: 1) 안 before verb (short). 2) Stem + 지 않다 (long). Same meaning.',
    structure: '안 + Verb / Verb stem + 지 않아요',
    examples: [
      { korean: '안 먹어요.', romanization: 'An meogeoyo.', english: "I don't eat.", filipino: 'Hindi ako kumakain.' },
      { korean: '먹지 않아요.', romanization: 'Meokji anayo.', english: "I don't eat.", filipino: 'Hindi ako kumakain.' },
    ],
    filipinoParallel: '안 works like Filipino "hindi" — placed before the action.',
    tip: '안 for speech, -지 않다 for writing/emphasis.', level: 'intermediate',
  },
  {
    id: 8, title: 'Past Tense: -았/었어요', titleKr: '과거 시제',
    explanation: 'Add -았어요 when last vowel is ㅏ/ㅗ; -었어요 for others. 하다 → 했어요.',
    structure: 'Verb stem + 았어요/었어요',
    examples: [
      { korean: '갔어요.', romanization: 'Gasseoyo.', english: 'I went.', filipino: 'Pumunta ako.' },
      { korean: '먹었어요.', romanization: 'Meogeosseoyo.', english: 'I ate.', filipino: 'Kumain ako.' },
      { korean: '공부했어요.', romanization: 'Gongbuhaesseoyo.', english: 'I studied.', filipino: 'Nag-aral ako.' },
    ],
    filipinoParallel: 'Filipino uses verb affixes (um-, nag-, in-) for past. Korean adds endings.',
    tip: 'Same vowel harmony as polite form: ㅏ/ㅗ → 았, others → 었.', level: 'intermediate',
  },
  {
    id: 9, title: 'Future/Intention: -(으)ㄹ 거예요', titleKr: '미래 시제',
    explanation: 'Express future plans or intentions. Add -ㄹ 거예요 after vowel stems, -을 거예요 after consonant stems.',
    structure: 'Verb stem + (으)ㄹ 거예요',
    examples: [
      { korean: '갈 거예요.', romanization: 'Gal geoyeyo.', english: 'I will go.', filipino: 'Pupunta ako.' },
      { korean: '먹을 거예요.', romanization: 'Meogeul geoyeyo.', english: 'I will eat.', filipino: 'Kakain ako.' },
    ],
    filipinoParallel: 'Like Filipino future prefix "mag-" + future markers: "Kakain ako" = 먹을 거예요.',
    tip: 'Stem ends in vowel → ㄹ 거예요. Stem ends in consonant → 을 거예요.', level: 'intermediate',
  },
  {
    id: 10, title: 'Want to: -고 싶다', titleKr: '-고 싶다',
    explanation: 'Express desire/want. Add -고 싶어요 to the verb stem. Literally "want to do [verb]."',
    structure: 'Verb stem + 고 싶어요',
    examples: [
      { korean: '먹고 싶어요.', romanization: 'Meokgo sipeoyo.', english: 'I want to eat.', filipino: 'Gusto kong kumain.' },
      { korean: '한국에 가고 싶어요.', romanization: 'Hanguge gago sipeoyo.', english: 'I want to go to Korea.', filipino: 'Gusto kong pumunta sa Korea.' },
    ],
    filipinoParallel: 'Like Filipino "gusto kong [verb]" — both put desire before the action.',
    tip: 'Just add -고 싶어요 to ANY verb stem. No vowel harmony needed!', level: 'intermediate',
  },
  {
    id: 11, title: 'Can/Cannot: -(으)ㄹ 수 있다/없다', titleKr: '능력 표현',
    explanation: 'Express ability. -(으)ㄹ 수 있어요 = can. -(으)ㄹ 수 없어요 = cannot.',
    structure: 'Verb stem + (으)ㄹ 수 있어요/없어요',
    examples: [
      { korean: '한국어를 할 수 있어요.', romanization: 'Hangugeoreul hal su isseoyo.', english: 'I can speak Korean.', filipino: 'Kaya kong magsalita ng Korean.' },
      { korean: '수영할 수 없어요.', romanization: 'Suyeonghal su eopseoyo.', english: "I can't swim.", filipino: 'Hindi ako marunong lumangoy.' },
    ],
    filipinoParallel: '"Kaya kong..." = -(으)ㄹ 수 있어요. "Hindi ko kaya..." = -(으)ㄹ 수 없어요.',
    tip: 'This is one of the most useful patterns — you can use it with any verb!', level: 'intermediate',
  },
  {
    id: 12, title: 'Connecting Sentences: -고', titleKr: '-고 (and)',
    explanation: 'Connect two actions/descriptions with -고 (and). Simple way to make longer sentences.',
    structure: 'Verb stem + 고 + next clause',
    examples: [
      { korean: '밥을 먹고 커피를 마셔요.', romanization: 'Babeul meokgo keopireul masyeoyo.', english: 'I eat rice and drink coffee.', filipino: 'Kumakain ako ng kanin at umiinom ng kape.' },
      { korean: '크고 예뻐요.', romanization: 'Keugo yeppeoyo.', english: "It's big and pretty.", filipino: 'Malaki at maganda.' },
    ],
    filipinoParallel: '-고 = Filipino "at" (and). Both simply connect clauses together.',
    tip: 'Just add -고 to the verb stem of the first clause. No vowel harmony needed.', level: 'intermediate',
  },
];
// ────────────────────────────────
// CULTURE (문화) — Enhanced
// ────────────────────────────────
export const cultureNotes: CultureNote[] = [
  { id: 1, title: 'Honorifics & Speech Levels', titleKr: '존댓말과 반말', emoji: '🙏',
    content: 'Korean has 7 speech levels. Learners use 2: 해요체 (informal polite) and 합쇼체 (formal polite). The system affects verb endings, vocabulary, and nouns. Age hierarchy is deeply embedded — always ask age early to calibrate speech level. Using 반말 (casual speech) with someone older or unfamiliar is a serious social faux pas.',
    filipinoConnection: 'Like "po/opo" with elders, but Korean changes entire verb conjugations. Both cultures deeply value age-based respect.' },
  { id: 2, title: 'Nunchi — Reading the Room', titleKr: '눈치', emoji: '👀',
    content: 'Nunchi (눈치) = "eye-measure." The Korean art of reading the atmosphere and responding appropriately without being told. Essential for social success. Korean saying: "A person without nunchi is like a person without a face."',
    filipinoConnection: 'Very similar to "pakiramdaman" — sensing others\' feelings. Also "hiya." Both cultures see this social intelligence as maturity.' },
  { id: 3, title: 'Jeong — Deep Emotional Bond', titleKr: '정', emoji: '💗',
    content: 'Jeong (정) = deep emotional bond developing over time. Beyond love or friendship — it\'s attachment, loyalty, interconnectedness. You can develop jeong even for someone you initially disliked. One of the defining Korean relationship concepts.',
    filipinoConnection: 'Like "pagmamalasakit" and "pakikipagkapwa-tao." Both cultures value deep, lasting emotional connections over transactional ones.' },
  { id: 4, title: 'Food Culture & 밥 먹었어요?', titleKr: '음식 문화', emoji: '🍚',
    content: '"밥 먹었어요?" (Have you eaten?) = common greeting expressing care. Korean meals feature banchan (반찬, shared sides). Table manners: pour drinks for elders with two hands, don\'t refill your own glass, wait for the eldest to eat first. 같이 먹기 (eating together) = bonding.',
    filipinoConnection: '"Kumain ka na ba?" is the EXACT Filipino equivalent — food as love language. Both center meals around rice and value communal eating.' },
  { id: 5, title: 'Bowing & Physical Greetings', titleKr: '인사 (절하기)', emoji: '🤝',
    content: '15° nod = casual. 45° bow = elders/formal. 90° deep bow = very formal (Seollal/Chuseok). Business handshakes: support right arm with left hand. Always receive items from elders with both hands.',
    filipinoConnection: '"Mano po" serves the same purpose. Receiving items with two hands is also Filipino etiquette. Both have specific physical expressions of respect.' },
  { id: 6, title: 'Korean Age System (2023 Update)', titleKr: '한국 나이', emoji: '🎂',
    content: 'Traditional: 1 at birth, everyone ages on Jan 1. On June 28, 2023, Korea officially adopted international age for legal/admin purposes. Traditional age still used informally, especially for 오빠/형/언니/누나 status.',
    filipinoConnection: 'Philippines uses international age, so 2023 change simplifies things. But Koreans still care deeply about relative age — like Filipinos with kuya/ate status.' },
  { id: 7, title: 'Family Terms Beyond Family', titleKr: '가족 호칭', emoji: '👨‍👩‍👧‍👦',
    content: '오빠, 언니, 형, 누나 extend beyond blood family to close older friends, coworkers, celebrities. Using someone\'s name without a title = very close same-age/younger relationship only.',
    filipinoConnection: 'Directly parallel to "kuya" and "ate" used for non-family. Both cultures use family-like terms for social warmth.' },
  { id: 8, title: 'Han — Collective Resilience', titleKr: '한', emoji: '🌊',
    content: 'Han (한) = complex emotion of collective grief, resentment, perseverance from historical suffering. Embedded in Korean identity, art, pansori, K-drama storytelling. Crucially, han is NOT passive — it fuels creativity and determination.',
    filipinoConnection: 'Resonates with Filipino resilience ("diskarte," "tibay ng loob," "bayanihan"). Both cultures transformed collective hardship into cultural strength.' },
  { id: 9, title: 'Hallyu — Korean Wave', titleKr: '한류', emoji: '🌊',
    content: 'Hallyu (한류) = global spread of Korean culture. K-pop (BTS, BLACKPINK), K-drama (Squid Game), film (Parasite — 2020 Best Picture), cuisine, K-beauty. The Philippines is one of the largest Hallyu consumer markets in SE Asia.',
    filipinoConnection: 'Filipinos are among the most enthusiastic Hallyu fans globally. K-culture deeply integrated into Filipino youth culture — constant immersion opportunities for learners.' },
  { id: 10, title: 'Ppalli Ppalli Culture', titleKr: '빨리빨리 문화', emoji: '⚡',
    content: '빨리빨리 (ppalli ppalli) means "hurry hurry" and reflects Korea\'s fast-paced culture. Korea went from one of the poorest nations in the 1950s to a global economic powerhouse in decades. This speed-oriented mindset shows in fast internet, quick food service, rapid construction, and efficient public transit.',
    filipinoConnection: 'Contrasts with Filipino "mañana habit" but both cultures have developed their own rhythms for good reasons. Understanding 빨리빨리 helps contextualize Korean social expectations around punctuality and efficiency.' },
];
// ────────────────────────────────
// SENTENCE BUILDING EXERCISES
// ────────────────────────────────
export const sentenceExercises = [
  { id: 1, words: ['저는', '학생', '이에요'], particles: ['는', '이에요'], answer: '저는 학생이에요.', meaning: 'I am a student.', filipino: 'Ako ay estudyante.' },
  { id: 2, words: ['저는', '밥을', '먹어요'], particles: ['는', '을'], answer: '저는 밥을 먹어요.', meaning: 'I eat rice.', filipino: 'Kumakain ako ng kanin.' },
  { id: 3, words: ['한국어를', '공부해요', '저는'], particles: ['를', '는'], answer: '저는 한국어를 공부해요.', meaning: 'I study Korean.', filipino: 'Nag-aaral ako ng Korean.' },
  { id: 4, words: ['학교에', '가요', '저는'], particles: ['에', '는'], answer: '저는 학교에 가요.', meaning: 'I go to school.', filipino: 'Pupunta ako sa paaralan.' },
  { id: 5, words: ['날씨가', '좋아요'], particles: ['가'], answer: '날씨가 좋아요.', meaning: 'The weather is good.', filipino: 'Maganda ang panahon.' },
  { id: 6, words: ['커피를', '마시고', '싶어요'], particles: ['를', '고'], answer: '커피를 마시고 싶어요.', meaning: 'I want to drink coffee.', filipino: 'Gusto kong uminom ng kape.' },
];
// ────────────────────────────────
// ACHIEVEMENTS
// ────────────────────────────────
export const achievements: Achievement[] = [
  { id: 'first-visit', title: 'First Step', titleKr: '첫걸음', description: 'Opened the app for the first time', emoji: '🌱', condition: 'firstVisit' },
  { id: 'hangul-explorer', title: 'Hangul Explorer', titleKr: '한글 탐험가', description: 'Visited the Hangul Lab', emoji: '🔤', condition: 'hangulVisited' },
  { id: 'word-collector', title: 'Word Collector', titleKr: '단어 수집가', description: 'Visited the Vocabulary section', emoji: '📚', condition: 'vocabVisited' },
  { id: 'grammar-student', title: 'Grammar Student', titleKr: '문법 학생', description: 'Visited the Grammar section', emoji: '📝', condition: 'grammarVisited' },
  { id: 'culture-explorer', title: 'Culture Explorer', titleKr: '문화 탐험가', description: 'Visited the Culture section', emoji: '🌏', condition: 'cultureVisited' },
  { id: 'quiz-taker', title: 'Quiz Taker', titleKr: '퀴즈 도전자', description: 'Completed your first quiz', emoji: '🎯', condition: 'firstQuiz' },
  { id: 'perfect-score', title: 'Perfect Score', titleKr: '만점', description: 'Got 100% on any quiz', emoji: '🏆', condition: 'perfectScore' },
  { id: 'wellness-warrior', title: 'Wellness Warrior', titleKr: '건강 전사', description: 'Used the wellness features', emoji: '🧘', condition: 'wellnessVisited' },
  { id: 'all-sections', title: 'Full Explorer', titleKr: '완전 탐험가', description: 'Visited every section', emoji: '🌟', condition: 'allSections' },
  { id: 'streak-3', title: '3-Day Streak', titleKr: '3일 연속', description: 'Studied 3 days in a row', emoji: '🔥', condition: 'streak3' },
  { id: 'streak-7', title: '7-Day Streak', titleKr: '7일 연속', description: 'Studied 7 days in a row', emoji: '🔥', condition: 'streak7' },
  { id: 'night-owl', title: 'Night Owl', titleKr: '올빼미', description: 'Studied after 10 PM', emoji: '🦉', condition: 'nightOwl' },
];
// ────────────────────────────────
// WELLNESS & STUDY TIPS
// ────────────────────────────────
export const wellnessTips = [
  { title: 'Micro-sessions Work Best', content: 'Research on spaced repetition (Ebbinghaus, 1885; Cepeda et al., 2006) shows short sessions (5–10 min) beat long cramming. Even 5 minutes of Hangul review = real, measurable progress.', emoji: '⏱️' },
  { title: 'Progress Is Not Linear', content: 'Some days you absorb everything; other days, reviewing basics is the win. "Plateaus" are periods of unconscious consolidation (Krashen, 1982) — your brain IS processing.', emoji: '📈' },
  { title: 'Self-Compassion = Better Learning', content: 'Research by Kristin Neff (2003): self-compassion during setbacks improves outcomes. Self-criticism activates the amygdala\'s threat response, impairing memory. Kindness is neuroscience.', emoji: '💛' },
  { title: 'Immerse Gently', content: 'Korean music, K-dramas with subtitles, Korean social media. Passive exposure builds phonological awareness without pressure. Implicit learning works (Reber, 1967).', emoji: '🎵' },
  { title: 'Celebrate Every Win', content: 'Recognized a character? Win. Understood a word in a song? Win. Small celebrations trigger dopamine, strengthening neural pathways (Schultz, 1997).', emoji: '🎉' },
  { title: 'Rest Is Productive', content: 'Sleep = memory consolidation. New material transfers from hippocampus to cortex during sleep (Walker, 2017). Exhausted? Resting IS studying. 20-90 min naps enhance retention.', emoji: '😴' },
  { title: 'Reframe Anxiety', content: 'Mild anxiety can enhance performance (Yerkes-Dodson Law). Try "I am excited" instead of "I am anxious" — reappraisal works (Brooks, 2014). Your body is preparing, not warning.', emoji: '🧠' },
  { title: 'Your Bilingual Brain', content: 'Bilinguals learn 3rd languages 30-40% faster (Cenoz & Valencia, 1994). Your Filipino-English brain already switches language systems — this transfers to Korean.', emoji: '⚡' },
];
export const affirmations = [
  'I am learning at exactly the right pace for me.',
  'Every small step forward is real progress.',
  "It's okay to take breaks. Rest is part of learning.",
  "I don't need to be perfect. I just need to keep going.",
  'My effort today matters, no matter how small.',
  'I am capable of learning this language.',
  'Difficult does not mean impossible.',
  'I choose to be patient with myself today.',
  'My brain is building new connections right now.',
  'I am doing something brave by learning something new.',
  'I deserve rest without guilt.',
  'My pace is valid. My journey is valid.',
  'I am stronger than I think.',
  'This feeling will pass. I will keep growing.',
];
// ────────────────────────────────
// HELPERS
// ────────────────────────────────
export const allHangul = [...consonants, ...vowels, ...doubleConsonants, ...compoundVowels];
export const allVocab = Object.values(vocabularyCategories).flatMap((c) => c.items);
export const wordOfDay = (() => {
  const words = [
    { korean: '사랑', romanization: 'sarang', english: 'Love', filipino: 'Pag-ibig' },
    { korean: '희망', romanization: 'huimang', english: 'Hope', filipino: 'Pag-asa' },
    { korean: '행복', romanization: 'haengbok', english: 'Happiness', filipino: 'Kaligayahan' },
    { korean: '꿈', romanization: 'kkum', english: 'Dream', filipino: 'Pangarap' },
    { korean: '힘', romanization: 'him', english: 'Strength / Power', filipino: 'Lakas' },
    { korean: '용기', romanization: 'yonggi', english: 'Courage', filipino: 'Tapang / Lakas ng loob' },
    { korean: '감사', romanization: 'gamsa', english: 'Gratitude', filipino: 'Pasasalamat' },
    { korean: '평화', romanization: 'pyeonghwa', english: 'Peace', filipino: 'Kapayapaan' },
    { korean: '자유', romanization: 'jayu', english: 'Freedom', filipino: 'Kalayaan' },
    { korean: '미래', romanization: 'mirae', english: 'Future', filipino: 'Kinabukasan' },
    { korean: '친절', romanization: 'chinjeol', english: 'Kindness', filipino: 'Kabaitan' },
    { korean: '지혜', romanization: 'jihye', english: 'Wisdom', filipino: 'Karunungan' },
    { korean: '노력', romanization: 'noryeok', english: 'Effort', filipino: 'Pagsisikap' },
    { korean: '성장', romanization: 'seongjang', english: 'Growth', filipino: 'Paglago' },
  ];
  const dayIndex = Math.floor(Date.now() / 86400000) % words.length;
  return words[dayIndex];
})();
