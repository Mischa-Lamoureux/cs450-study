'use client';

import Link from 'next/link';
import { topics } from '@/data/topics';
import { quizzesByTopic, allQuizQuestions } from '@/data/quizzes';

export default function QuizTopicPicker() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Topic Quizzes</h1>
      <p className="text-[var(--muted)] mb-8">
        Test your knowledge on each CS 450 topic. Mix of multiple choice, true/false, and short answer questions at exam difficulty.
      </p>

      {/* Random Mix card */}
      <Link
        href="/quiz/random"
        className="block mb-8 bg-gradient-to-r from-[var(--primary)]/20 to-[var(--accent)]/20 border border-[var(--primary)]/30 rounded-xl p-5 hover:border-[var(--primary)]/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <span className="text-3xl">🎲</span>
          <div>
            <h2 className="font-semibold text-lg">Random Mix</h2>
            <p className="text-sm text-[var(--muted)]">
              15 random questions from all topics &middot; {allQuizQuestions.length} questions total
            </p>
          </div>
        </div>
      </Link>

      {/* Post-midterm */}
      <h2 className="text-lg font-semibold mb-3 text-[var(--primary-light)]">
        Post-Midterm Topics (~85% of final)
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {topics
          .filter((t) => t.weight === 'post-midterm')
          .map((t) => {
            const questions = quizzesByTopic[t.slug] || [];
            return (
              <Link
                key={t.slug}
                href={`/quiz/${t.slug}`}
                className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 hover:border-[var(--primary)]/40 hover:bg-[var(--card-hover)] transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{t.icon}</span>
                  <h3 className="font-semibold">{t.title}</h3>
                </div>
                <p className="text-sm text-[var(--muted)] mb-3">{t.description}</p>
                <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
                  <span className="px-2 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary-light)]">
                    {questions.length} questions
                  </span>
                  <span>
                    {questions.filter((q) => q.type === 'mc').length} MC &middot;{' '}
                    {questions.filter((q) => q.type === 'tf').length} T/F &middot;{' '}
                    {questions.filter((q) => q.type === 'short-answer').length} Short
                  </span>
                </div>
              </Link>
            );
          })}
      </div>

      {/* Pre-midterm */}
      <h2 className="text-lg font-semibold mb-3 text-[var(--accent)]">
        Pre-Midterm Topics (~15% of final)
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {topics
          .filter((t) => t.weight === 'pre-midterm')
          .map((t) => {
            const questions = quizzesByTopic[t.slug] || [];
            return (
              <Link
                key={t.slug}
                href={`/quiz/${t.slug}`}
                className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 hover:border-[var(--accent)]/40 hover:bg-[var(--card-hover)] transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{t.icon}</span>
                  <h3 className="font-semibold">{t.title}</h3>
                </div>
                <p className="text-sm text-[var(--muted)] mb-3">{t.description}</p>
                <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
                  <span className="px-2 py-0.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)]">
                    {questions.length} questions
                  </span>
                  <span>
                    {questions.filter((q) => q.type === 'mc').length} MC &middot;{' '}
                    {questions.filter((q) => q.type === 'tf').length} T/F &middot;{' '}
                    {questions.filter((q) => q.type === 'short-answer').length} Short
                  </span>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
