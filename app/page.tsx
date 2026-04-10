'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { loadProgress, saveProgress, getLevelForXP, LEVELS, ACHIEVEMENTS } from '@/lib/progress';
import { topics } from '@/data/topics';

function getCountdown() {
  const exam = new Date('2026-04-18T12:30:00-04:00');
  const now = new Date();
  const diff = exam.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, passed: true };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return { days, hours, minutes, passed: false };
}

const features = [
  { href: '/notes', icon: '📖', title: 'Note Summaries', desc: 'Comprehensive summaries with diagrams', color: 'from-indigo-500/20 to-purple-500/20 hover:from-indigo-500/30 hover:to-purple-500/30' },
  { href: '/flashcards', icon: '🃏', title: 'Flashcards', desc: 'Spaced repetition study cards', color: 'from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30' },
  { href: '/quiz', icon: '✏️', title: 'Quizzes', desc: 'Test your knowledge by topic', color: 'from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30' },
  { href: '/practice-finals', icon: '📝', title: 'Practice Finals', desc: '3 full practice exams with grading', color: 'from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30' },
];

export default function HomePage() {
  const [countdown, setCountdown] = useState(getCountdown());
  const [progress, setProgress] = useState(loadProgress());
  const [name, setName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);

  useEffect(() => {
    const p = loadProgress();
    setProgress(p);
    setName(p.name);
    if (!p.name) setShowNameInput(true);
    const timer = setInterval(() => setCountdown(getCountdown()), 60000);
    return () => clearInterval(timer);
  }, []);

  function saveName() {
    if (name.trim()) {
      const p = loadProgress();
      p.name = name.trim();
      saveProgress(p);
      setProgress(p);
      setShowNameInput(false);
    }
  }

  const levelInfo = getLevelForXP(progress.xp);
  const notesProgress = Math.round((progress.notesRead.length / topics.length) * 100);

  const unreadTopics = topics.filter(t => !progress.notesRead.includes(t.slug));
  const postMidtermUnread = unreadTopics.filter(t => t.weight === 'post-midterm');
  const suggestedTopic = postMidtermUnread[0] || unreadTopics[0];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Countdown Banner */}
      <div className="text-center mb-10">
        {!countdown.passed ? (
          <>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-sm text-[var(--primary-light)] mb-4">
              CS 450/650 Final Exam &middot; April 18, MC 2054
            </div>
            <div className="flex justify-center gap-6 mb-3">
              <div className="text-center">
                <div className="text-5xl font-bold text-[var(--foreground)]">{countdown.days}</div>
                <div className="text-sm text-[var(--muted)]">days</div>
              </div>
              <div className="text-5xl font-bold text-[var(--muted)]">:</div>
              <div className="text-center">
                <div className="text-5xl font-bold text-[var(--foreground)]">{countdown.hours}</div>
                <div className="text-sm text-[var(--muted)]">hours</div>
              </div>
              <div className="text-5xl font-bold text-[var(--muted)]">:</div>
              <div className="text-center">
                <div className="text-5xl font-bold text-[var(--foreground)]">{countdown.minutes}</div>
                <div className="text-sm text-[var(--muted)]">min</div>
              </div>
            </div>
            <p className="text-[var(--muted)] text-sm">Closed-book, 2 hours, simple calculator allowed</p>
          </>
        ) : (
          <div className="text-2xl font-bold text-[var(--success)]">Good luck on your exam!</div>
        )}
      </div>

      {/* Name input */}
      {showNameInput && (
        <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 mb-8 text-center">
          <h2 className="text-lg font-semibold mb-2">Welcome to CS 450 Study Hub</h2>
          <p className="text-[var(--muted)] text-sm mb-4">Enter your name to track your progress</p>
          <div className="flex gap-2 justify-center max-w-xs mx-auto">
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && saveName()}
              placeholder="Your name"
              className="flex-1 px-3 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] text-sm focus:outline-none focus:border-[var(--primary)]"
            />
            <button onClick={saveName} className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
              Start
            </button>
          </div>
        </div>
      )}

      {/* Welcome back + level */}
      {progress.name && !showNameInput && (
        <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-lg font-semibold">
                {progress.streak > 2 ? `${progress.name} is on fire!` : `Welcome back, ${progress.name}`}
              </h2>
              <p className="text-sm text-[var(--muted)]">
                Level {levelInfo.level}: {levelInfo.name} &middot; {progress.xp} XP
                {progress.streak > 0 && ` \u00B7 ${progress.streak} day streak \u{1F525}`}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-xs text-[var(--muted)]">Notes: {notesProgress}%</div>
                <div className="text-xs text-[var(--muted)]">Quizzes: {progress.totalQuizzesTaken}</div>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-lg font-bold">
                {levelInfo.level}
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="w-full h-2 bg-[var(--background)] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-full transition-all duration-700"
                style={{ width: `${levelInfo.progress * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-[var(--muted)] mt-1">
              <span>{LEVELS[levelInfo.level - 1]?.name}</span>
              <span>{levelInfo.level < 10 ? LEVELS[levelInfo.level]?.name : 'MAX'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Suggested topic */}
      {suggestedTopic && progress.name && (
        <div className="mb-8">
          <Link
            href={`/notes/${suggestedTopic.slug}`}
            className="block bg-gradient-to-r from-[var(--primary)]/10 to-[var(--accent)]/10 border border-[var(--primary)]/20 rounded-xl p-4 hover:border-[var(--primary)]/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{suggestedTopic.icon}</span>
              <div>
                <div className="text-xs text-[var(--accent)] font-medium">Suggested next</div>
                <div className="font-semibold">{suggestedTopic.title}</div>
                <div className="text-sm text-[var(--muted)]">{suggestedTopic.description}</div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Feature grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {features.map(f => (
          <Link
            key={f.href}
            href={f.href}
            className={`bg-gradient-to-br ${f.color} rounded-xl border border-[var(--border)] p-5 transition-all hover:scale-[1.02] hover:border-[var(--primary)]/30`}
          >
            <div className="text-3xl mb-2">{f.icon}</div>
            <h3 className="font-semibold text-lg">{f.title}</h3>
            <p className="text-sm text-[var(--muted)]">{f.desc}</p>
          </Link>
        ))}
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <div className="bg-[var(--card)] rounded-lg p-4 text-center border border-[var(--border)]">
          <div className="text-2xl font-bold text-[var(--primary-light)]">{progress.notesRead.length}/{topics.length}</div>
          <div className="text-xs text-[var(--muted)]">Notes Read</div>
        </div>
        <div className="bg-[var(--card)] rounded-lg p-4 text-center border border-[var(--border)]">
          <div className="text-2xl font-bold text-[var(--accent)]">{progress.totalFlashcardsStudied}</div>
          <div className="text-xs text-[var(--muted)]">Cards Studied</div>
        </div>
        <div className="bg-[var(--card)] rounded-lg p-4 text-center border border-[var(--border)]">
          <div className="text-2xl font-bold text-[var(--success)]">{progress.totalQuizzesTaken}</div>
          <div className="text-xs text-[var(--muted)]">Quizzes Taken</div>
        </div>
        <div className="bg-[var(--card)] rounded-lg p-4 text-center border border-[var(--border)]">
          <div className="text-2xl font-bold text-[var(--warning)]">{progress.achievements.length}/{ACHIEVEMENTS.length}</div>
          <div className="text-xs text-[var(--muted)]">Achievements</div>
        </div>
      </div>

      {/* Exam info */}
      <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5">
        <h3 className="font-semibold mb-3">Exam Breakdown</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="text-[var(--primary-light)] font-medium mb-1">Post-Midterm (~85%)</h4>
            <ul className="space-y-1 text-[var(--muted)]">
              <li>&#x2022; Branch Prediction (L11)</li>
              <li>&#x2022; Cache Design (L12-13)</li>
              <li>&#x2022; Memory Systems (L15-16)</li>
              <li>&#x2022; New Memory Tech (L17-18)</li>
              <li>&#x2022; Hardware Security (L18)</li>
              <li>&#x2022; Microarch Simulation (L14)</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[var(--accent)] font-medium mb-1">Pre-Midterm (~15%)</h4>
            <ul className="space-y-1 text-[var(--muted)]">
              <li>&#x2022; Fundamentals &amp; Dataflow</li>
              <li>&#x2022; ISA Design</li>
              <li>&#x2022; Pipelining &amp; Dependencies</li>
              <li>&#x2022; SIMD, Systolic Arrays, Multicore</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
