'use client';

export interface FlashcardProgress {
  ease: number;
  interval: number;
  nextReview: string;
  repetitions: number;
}

export interface QuizAttempt {
  quizId: string;
  score: number;
  total: number;
  date: string;
}

export interface ExamAttempt {
  examId: string;
  score: number;
  total: number;
  date: string;
  autoGradedScore: number;
  selfGradedScore: number;
}

export interface UserProgress {
  name: string;
  xp: number;
  level: number;
  streak: number;
  lastStudyDate: string;
  achievements: string[];
  flashcards: Record<string, FlashcardProgress>;
  quizScores: QuizAttempt[];
  examScores: ExamAttempt[];
  notesRead: string[];
  totalFlashcardsStudied: number;
  totalQuizzesTaken: number;
}

const STORAGE_KEY = 'cs450-study-progress';
const SCHEMA_VERSION = 1;

function getDefaultProgress(): UserProgress {
  return {
    name: '',
    xp: 0,
    level: 1,
    streak: 0,
    lastStudyDate: '',
    achievements: [],
    flashcards: {},
    quizScores: [],
    examScores: [],
    notesRead: [],
    totalFlashcardsStudied: 0,
    totalQuizzesTaken: 0,
  };
}

export function loadProgress(): UserProgress {
  if (typeof window === 'undefined') return getDefaultProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultProgress();
    const parsed = JSON.parse(raw);
    if (parsed._version !== SCHEMA_VERSION) return getDefaultProgress();
    return parsed.data as UserProgress;
  } catch {
    return getDefaultProgress();
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    _version: SCHEMA_VERSION,
    data: progress,
  }));
}

export function updateProgress(updater: (p: UserProgress) => UserProgress): UserProgress {
  const current = loadProgress();
  const updated = updater(current);
  saveProgress(updated);
  return updated;
}

// XP and Level helpers
export const LEVELS = [
  { level: 1, name: 'Freshman Fetch', xpRequired: 0 },
  { level: 2, name: 'Pipeline Padawan', xpRequired: 100 },
  { level: 3, name: 'Cache Cadet', xpRequired: 250 },
  { level: 4, name: 'Branch Predictor', xpRequired: 500 },
  { level: 5, name: 'Memory Marshal', xpRequired: 800 },
  { level: 6, name: 'Hazard Handler', xpRequired: 1200 },
  { level: 7, name: 'Superscalar Scholar', xpRequired: 1700 },
  { level: 8, name: 'Architecture Ace', xpRequired: 2300 },
  { level: 9, name: 'Silicon Sage', xpRequired: 3000 },
  { level: 10, name: 'Von Neumann Virtuoso', xpRequired: 4000 },
];

export function getLevelForXP(xp: number): { level: number; name: string; xpRequired: number; xpForNext: number; progress: number } {
  let currentLevel = LEVELS[0];
  for (const l of LEVELS) {
    if (xp >= l.xpRequired) currentLevel = l;
    else break;
  }
  const nextLevel = LEVELS.find(l => l.level === currentLevel.level + 1);
  const xpForNext = nextLevel ? nextLevel.xpRequired : currentLevel.xpRequired;
  const xpInLevel = xp - currentLevel.xpRequired;
  const xpNeeded = xpForNext - currentLevel.xpRequired;
  return {
    ...currentLevel,
    xpForNext,
    progress: xpNeeded > 0 ? Math.min(xpInLevel / xpNeeded, 1) : 1,
  };
}

export function addXP(amount: number, reason: string): UserProgress {
  return updateProgress(p => {
    const newXP = p.xp + amount;
    const levelInfo = getLevelForXP(newXP);
    const today = new Date().toISOString().split('T')[0];
    let streak = p.streak;
    if (p.lastStudyDate) {
      const lastDate = new Date(p.lastStudyDate);
      const todayDate = new Date(today);
      const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) streak++;
      else if (diffDays > 1) streak = 1;
    } else {
      streak = 1;
    }
    return {
      ...p,
      xp: newXP,
      level: levelInfo.level,
      streak,
      lastStudyDate: today,
    };
  });
}

export function markNoteRead(topicSlug: string): void {
  updateProgress(p => {
    if (p.notesRead.includes(topicSlug)) return p;
    return { ...p, notesRead: [...p.notesRead, topicSlug] };
  });
  addXP(20, `Read notes: ${topicSlug}`);
}

export function recordQuizScore(quizId: string, score: number, total: number): void {
  updateProgress(p => ({
    ...p,
    quizScores: [...p.quizScores, { quizId, score, total, date: new Date().toISOString() }],
    totalQuizzesTaken: p.totalQuizzesTaken + 1,
  }));
  const pct = score / total;
  if (pct >= 0.8) addXP(50, 'Quiz score >= 80%');
  else if (pct >= 0.6) addXP(30, 'Quiz score >= 60%');
  else addXP(10, 'Quiz attempt');
}

export function recordExamScore(examId: string, autoGraded: number, selfGraded: number, total: number): void {
  updateProgress(p => ({
    ...p,
    examScores: [...p.examScores, {
      examId,
      score: autoGraded + selfGraded,
      total,
      date: new Date().toISOString(),
      autoGradedScore: autoGraded,
      selfGradedScore: selfGraded,
    }],
  }));
  addXP(100, 'Practice exam completed');
}

// Achievement checking
export const ACHIEVEMENTS = [
  { id: 'first-flip', name: 'First Flip', description: 'Study your first flashcard', icon: '🃏' },
  { id: 'perfect-predictor', name: 'Perfect Predictor', description: '100% on Branch Prediction quiz', icon: '🎯' },
  { id: 'cache-hit', name: 'Cache Hit', description: 'Read all cache notes', icon: '💾' },
  { id: 'no-conflict-miss', name: 'No Conflict Miss', description: '3 quizzes in a row above 80%', icon: '🏆' },
  { id: 'row-buffer-hit', name: 'Row Buffer Hit', description: '7-day study streak', icon: '🔥' },
  { id: 'speculative-execution', name: 'Speculative Execution', description: 'Start a practice exam', icon: '🚀' },
  { id: 'retired-instruction', name: 'Retired Instruction', description: 'Complete a practice exam', icon: '✅' },
  { id: 'alpha-21264', name: 'Alpha 21264', description: 'Reach Level 10', icon: '👑' },
  { id: 'tournament-winner', name: 'Tournament Winner', description: 'Score 90%+ on all 3 practice finals', icon: '🏅' },
  { id: 'miss-rate-zero', name: 'Miss Rate: 0%', description: 'Perfect score on any quiz', icon: '💯' },
  { id: 'full-pipeline', name: 'Full Pipeline', description: 'Read all note summaries', icon: '📚' },
  { id: 'ten-cards', name: 'Deck Builder', description: 'Study 50 flashcards total', icon: '📇' },
  { id: 'hundred-cards', name: 'Card Shark', description: 'Study 200 flashcards total', icon: '🦈' },
];

export function unlockAchievement(achievementId: string): boolean {
  const progress = loadProgress();
  if (progress.achievements.includes(achievementId)) return false;
  updateProgress(p => ({
    ...p,
    achievements: [...p.achievements, achievementId],
  }));
  addXP(25, `Achievement: ${achievementId}`);
  return true;
}

export function checkAchievements(): string[] {
  const p = loadProgress();
  const newlyUnlocked: string[] = [];

  if (p.totalFlashcardsStudied >= 1 && !p.achievements.includes('first-flip')) {
    if (unlockAchievement('first-flip')) newlyUnlocked.push('first-flip');
  }
  if (p.totalFlashcardsStudied >= 50 && !p.achievements.includes('ten-cards')) {
    if (unlockAchievement('ten-cards')) newlyUnlocked.push('ten-cards');
  }
  if (p.totalFlashcardsStudied >= 200 && !p.achievements.includes('hundred-cards')) {
    if (unlockAchievement('hundred-cards')) newlyUnlocked.push('hundred-cards');
  }
  if (p.streak >= 7 && !p.achievements.includes('row-buffer-hit')) {
    if (unlockAchievement('row-buffer-hit')) newlyUnlocked.push('row-buffer-hit');
  }
  if (p.level >= 10 && !p.achievements.includes('alpha-21264')) {
    if (unlockAchievement('alpha-21264')) newlyUnlocked.push('alpha-21264');
  }

  // Check perfect quiz scores
  const perfectQuizzes = p.quizScores.filter(q => q.score === q.total);
  if (perfectQuizzes.length > 0 && !p.achievements.includes('miss-rate-zero')) {
    if (unlockAchievement('miss-rate-zero')) newlyUnlocked.push('miss-rate-zero');
  }
  const perfectBP = perfectQuizzes.find(q => q.quizId === 'branch-prediction');
  if (perfectBP && !p.achievements.includes('perfect-predictor')) {
    if (unlockAchievement('perfect-predictor')) newlyUnlocked.push('perfect-predictor');
  }

  // 3 quizzes in a row above 80%
  const last3 = p.quizScores.slice(-3);
  if (last3.length === 3 && last3.every(q => q.score / q.total >= 0.8) && !p.achievements.includes('no-conflict-miss')) {
    if (unlockAchievement('no-conflict-miss')) newlyUnlocked.push('no-conflict-miss');
  }

  // All notes read
  const allTopics = ['branch-prediction', 'cache', 'memory-systems', 'new-memory', 'hardware-security', 'pre-midterm'];
  if (allTopics.every(t => p.notesRead.includes(t)) && !p.achievements.includes('full-pipeline')) {
    if (unlockAchievement('full-pipeline')) newlyUnlocked.push('full-pipeline');
  }
  if (p.notesRead.includes('cache') && !p.achievements.includes('cache-hit')) {
    if (unlockAchievement('cache-hit')) newlyUnlocked.push('cache-hit');
  }

  // Exam achievements
  if (p.examScores.length > 0 && !p.achievements.includes('retired-instruction')) {
    if (unlockAchievement('retired-instruction')) newlyUnlocked.push('retired-instruction');
  }
  const exam90 = p.examScores.filter(e => e.score / e.total >= 0.9);
  const uniqueExams = new Set(exam90.map(e => e.examId));
  if (uniqueExams.size >= 3 && !p.achievements.includes('tournament-winner')) {
    if (unlockAchievement('tournament-winner')) newlyUnlocked.push('tournament-winner');
  }

  return newlyUnlocked;
}
