'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { topics } from '@/data/topics';
import { flashcardsByTopic, allFlashcards } from '@/data/flashcards';
import { loadProgress, type FlashcardProgress } from '@/lib/progress';

function getDueCount(
  cards: { id: string }[],
  flashcardProgress: Record<string, FlashcardProgress>,
): number {
  const now = new Date();
  return cards.filter((c) => {
    const fp = flashcardProgress[c.id];
    if (!fp) return true; // never studied = due
    return new Date(fp.nextReview) <= now;
  }).length;
}

export default function FlashcardsPage() {
  const [progress, setProgress] = useState<ReturnType<typeof loadProgress> | null>(null);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const flashcardProgress = progress?.flashcards ?? {};

  const totalDue = getDueCount(allFlashcards, flashcardProgress);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Flashcards</h1>
        <p className="text-[var(--muted)]">
          Spaced repetition flashcards covering all CS 450 topics.
          {' '}{allFlashcards.length} total cards.
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Link
          href="/flashcards/study?topic=all"
          className="px-5 py-2.5 rounded-lg bg-[var(--primary)] text-white font-medium text-sm hover:opacity-90 transition-opacity"
        >
          Study All ({allFlashcards.length} cards)
        </Link>
        <Link
          href="/flashcards/study?topic=due"
          className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-opacity ${
            totalDue > 0
              ? 'bg-[var(--warning)] text-black hover:opacity-90'
              : 'bg-[var(--card)] text-[var(--muted)] border border-[var(--border)]'
          }`}
        >
          Due for Review ({totalDue} cards)
        </Link>
      </div>

      {/* Post-midterm section */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold mb-1 text-[var(--primary-light)]">
          Post-Midterm Topics (~85% of final)
        </h2>
        <p className="text-sm text-[var(--muted)] mb-4">
          Focus your study here for maximum exam impact.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topics
            .filter((t) => t.weight === 'post-midterm')
            .map((topic) => {
              const cards = flashcardsByTopic[topic.slug] ?? [];
              const due = getDueCount(cards, flashcardProgress);
              const studied = cards.filter((c) => flashcardProgress[c.id]).length;
              return (
                <TopicCard
                  key={topic.slug}
                  slug={topic.slug}
                  title={topic.title}
                  icon={topic.icon}
                  color={topic.color}
                  total={cards.length}
                  studied={studied}
                  due={due}
                />
              );
            })}
        </div>
      </div>

      {/* Pre-midterm section */}
      <div>
        <h2 className="text-lg font-semibold mb-1 text-[var(--accent)]">
          Pre-Midterm Topics (~15% of final)
        </h2>
        <p className="text-sm text-[var(--muted)] mb-4">
          Review these for a well-rounded preparation.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topics
            .filter((t) => t.weight === 'pre-midterm')
            .map((topic) => {
              const cards = flashcardsByTopic[topic.slug] ?? [];
              const due = getDueCount(cards, flashcardProgress);
              const studied = cards.filter((c) => flashcardProgress[c.id]).length;
              return (
                <TopicCard
                  key={topic.slug}
                  slug={topic.slug}
                  title={topic.title}
                  icon={topic.icon}
                  color={topic.color}
                  total={cards.length}
                  studied={studied}
                  due={due}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

function TopicCard({
  slug,
  title,
  icon,
  color,
  total,
  studied,
  due,
}: {
  slug: string;
  title: string;
  icon: string;
  color: string;
  total: number;
  studied: number;
  due: number;
}) {
  const pct = total > 0 ? Math.round((studied / total) * 100) : 0;

  return (
    <Link
      href={`/flashcards/study?topic=${slug}`}
      className="group block bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 hover:border-[var(--primary)]/40 hover:bg-[var(--card-hover)] transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          <h3 className="font-semibold group-hover:text-[var(--primary-light)] transition-colors">
            {title}
          </h3>
        </div>
        <span className="text-xs text-[var(--muted)] bg-[var(--background)] px-2 py-0.5 rounded-full">
          {total} cards
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="w-full h-1.5 bg-[var(--background)] rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-500`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-[var(--muted)] mt-1">
          <span>{studied}/{total} studied</span>
          <span>{pct}%</span>
        </div>
      </div>

      {/* Due badge */}
      {due > 0 && (
        <div className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-[var(--warning)]/10 text-[var(--warning)] border border-[var(--warning)]/20">
          {due} due for review
        </div>
      )}
    </Link>
  );
}
