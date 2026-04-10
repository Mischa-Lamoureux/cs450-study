'use client';

import { useState, useEffect } from 'react';
import { loadProgress, getLevelForXP, LEVELS, ACHIEVEMENTS } from '@/lib/progress';
import { topics } from '@/data/topics';
import Link from 'next/link';

export default function ProgressPage() {
  const [progress, setProgress] = useState(loadProgress());

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const levelInfo = getLevelForXP(progress.xp);
  const notesPercent = Math.round((progress.notesRead.length / topics.length) * 100);

  // Quiz stats
  const avgQuizScore = progress.quizScores.length > 0
    ? Math.round(progress.quizScores.reduce((acc, q) => acc + (q.score / q.total) * 100, 0) / progress.quizScores.length)
    : 0;

  // Best exam scores
  const bestExamScores: Record<string, number> = {};
  for (const e of progress.examScores) {
    const pct = Math.round((e.score / e.total) * 100);
    if (!bestExamScores[e.examId] || pct > bestExamScores[e.examId]) {
      bestExamScores[e.examId] = pct;
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Progress</h1>

      {/* Level card */}
      <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-2xl font-bold">
            {levelInfo.level}
          </div>
          <div>
            <h2 className="text-xl font-bold">{progress.name || 'Student'}</h2>
            <p className="text-[var(--muted)]">{levelInfo.name} &middot; {progress.xp} XP</p>
          </div>
          {progress.streak > 0 && (
            <div className="ml-auto text-center">
              <div className="text-3xl">&#x1F525;</div>
              <div className="text-sm text-[var(--muted)]">{progress.streak} day streak</div>
            </div>
          )}
        </div>
        <div className="w-full h-3 bg-[var(--background)] rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-full transition-all duration-700"
            style={{ width: `${levelInfo.progress * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-[var(--muted)]">
          <span>Level {levelInfo.level}: {LEVELS[levelInfo.level - 1]?.name}</span>
          <span>{levelInfo.level < 10 ? `Next: ${LEVELS[levelInfo.level]?.name} (${LEVELS[levelInfo.level]?.xpRequired} XP)` : 'MAX LEVEL'}</span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-[var(--card)] rounded-lg p-4 border border-[var(--border)]">
          <div className="text-3xl font-bold text-[var(--primary-light)]">{notesPercent}%</div>
          <div className="text-xs text-[var(--muted)]">Notes Completed</div>
        </div>
        <div className="bg-[var(--card)] rounded-lg p-4 border border-[var(--border)]">
          <div className="text-3xl font-bold text-[var(--accent)]">{progress.totalFlashcardsStudied}</div>
          <div className="text-xs text-[var(--muted)]">Cards Studied</div>
        </div>
        <div className="bg-[var(--card)] rounded-lg p-4 border border-[var(--border)]">
          <div className="text-3xl font-bold text-[var(--success)]">{avgQuizScore}%</div>
          <div className="text-xs text-[var(--muted)]">Avg Quiz Score</div>
        </div>
        <div className="bg-[var(--card)] rounded-lg p-4 border border-[var(--border)]">
          <div className="text-3xl font-bold text-[var(--warning)]">{progress.examScores.length}</div>
          <div className="text-xs text-[var(--muted)]">Exams Taken</div>
        </div>
      </div>

      {/* Topic completion */}
      <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 mb-6">
        <h3 className="font-semibold mb-4">Topic Progress</h3>
        <div className="space-y-3">
          {topics.map(topic => {
            const noteDone = progress.notesRead.includes(topic.slug);
            const quizAttempts = progress.quizScores.filter(q => q.quizId === topic.slug);
            const bestQuiz = quizAttempts.length > 0
              ? Math.max(...quizAttempts.map(q => Math.round((q.score / q.total) * 100)))
              : null;

            return (
              <div key={topic.slug} className="flex items-center gap-3">
                <span className="text-xl w-8">{topic.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium truncate">{topic.title}</span>
                    <div className="flex items-center gap-2 text-xs text-[var(--muted)] shrink-0">
                      {noteDone && <span className="text-[var(--success)]">Notes &#10003;</span>}
                      {bestQuiz !== null && <span className={bestQuiz >= 80 ? 'text-[var(--success)]' : bestQuiz >= 60 ? 'text-[var(--warning)]' : 'text-[var(--danger)]'}>Quiz: {bestQuiz}%</span>}
                    </div>
                  </div>
                  <div className="w-full h-1.5 bg-[var(--background)] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${topic.weight === 'post-midterm' ? 'bg-[var(--primary)]' : 'bg-[var(--muted)]'}`}
                      style={{ width: `${(noteDone ? 50 : 0) + (bestQuiz !== null ? Math.min(bestQuiz / 2, 50) : 0)}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quiz history */}
      {progress.quizScores.length > 0 && (
        <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 mb-6">
          <h3 className="font-semibold mb-3">Recent Quiz Scores</h3>
          <div className="space-y-2">
            {progress.quizScores.slice(-10).reverse().map((q, i) => {
              const pct = Math.round((q.score / q.total) * 100);
              return (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-[var(--muted)]">{q.quizId.replace(/-/g, ' ')}</span>
                  <div className="flex items-center gap-2">
                    <span>{q.score}/{q.total}</span>
                    <span className={`font-medium ${pct >= 80 ? 'text-[var(--success)]' : pct >= 60 ? 'text-[var(--warning)]' : 'text-[var(--danger)]'}`}>{pct}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Achievements */}
      <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 mb-6">
        <h3 className="font-semibold mb-4">Achievements ({progress.achievements.length}/{ACHIEVEMENTS.length})</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {ACHIEVEMENTS.map(a => {
            const unlocked = progress.achievements.includes(a.id);
            return (
              <div
                key={a.id}
                className={`p-3 rounded-lg border ${unlocked ? 'border-[var(--primary)]/30 bg-[var(--primary)]/5' : 'border-[var(--border)] opacity-40'}`}
              >
                <div className="text-2xl mb-1">{unlocked ? a.icon : '🔒'}</div>
                <div className="text-sm font-medium">{a.name}</div>
                <div className="text-xs text-[var(--muted)]">{a.description}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick links */}
      <div className="flex flex-wrap gap-3">
        <Link href="/notes" className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg text-sm hover:opacity-90">
          Study Notes
        </Link>
        <Link href="/flashcards" className="px-4 py-2 bg-[var(--accent)] text-black rounded-lg text-sm hover:opacity-90">
          Flashcards
        </Link>
        <Link href="/quiz" className="px-4 py-2 bg-[var(--success)] text-black rounded-lg text-sm hover:opacity-90">
          Take a Quiz
        </Link>
      </div>
    </div>
  );
}
