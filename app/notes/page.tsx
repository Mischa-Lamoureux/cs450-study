'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { topics, postMidtermTopics, preMidtermTopics } from '@/data/topics';
import { loadProgress } from '@/lib/progress';

export default function NotesIndexPage() {
  const [readSlugs, setReadSlugs] = useState<string[]>([]);

  useEffect(() => {
    const p = loadProgress();
    setReadSlugs(p.notesRead);
  }, []);

  const totalRead = readSlugs.length;
  const totalTopics = topics.length;
  const pct = Math.round((totalRead / totalTopics) * 100);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Note Summaries</h1>
        <p className="text-[var(--muted)]">
          Comprehensive study notes for every CS 450 topic. Read through each to build a solid foundation for the final.
        </p>
        <div className="mt-4 flex items-center gap-3">
          <div className="flex-1 h-2 bg-[var(--card)] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-full transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-sm text-[var(--muted)] whitespace-nowrap">
            {totalRead}/{totalTopics} read ({pct}%)
          </span>
        </div>
      </div>

      {/* Post-midterm topics */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-semibold">Post-Midterm Topics</h2>
          <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--primary)]/20 text-[var(--primary-light)] border border-[var(--primary)]/20">
            ~85% of final
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {postMidtermTopics.map(topic => {
            const isRead = readSlugs.includes(topic.slug);
            return (
              <Link
                key={topic.slug}
                href={`/notes/${topic.slug}`}
                className="group relative bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 transition-all hover:border-[var(--primary)]/40 hover:bg-[var(--card-hover)]"
              >
                {isRead && (
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[var(--success)]/20 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 7l3 3 5-5" />
                    </svg>
                  </div>
                )}
                <div className="text-2xl mb-2">{topic.icon}</div>
                <h3 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--primary-light)] transition-colors">
                  {topic.title}
                </h3>
                <p className="text-sm text-[var(--muted)] mt-1 mb-3">{topic.description}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {topic.lectures.map(l => (
                    <span
                      key={l}
                      className="text-xs px-2 py-0.5 rounded bg-[var(--background)] text-[var(--muted)] border border-[var(--border)]"
                    >
                      {l}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Pre-midterm topics */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-semibold">Pre-Midterm Topics</h2>
          <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--accent)]/20 text-[var(--accent)] border border-[var(--accent)]/20">
            ~15% of final
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {preMidtermTopics.map(topic => {
            const isRead = readSlugs.includes(topic.slug);
            return (
              <Link
                key={topic.slug}
                href={`/notes/${topic.slug}`}
                className="group relative bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 transition-all hover:border-[var(--accent)]/40 hover:bg-[var(--card-hover)]"
              >
                {isRead && (
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[var(--success)]/20 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 7l3 3 5-5" />
                    </svg>
                  </div>
                )}
                <div className="text-2xl mb-2">{topic.icon}</div>
                <h3 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                  {topic.title}
                </h3>
                <p className="text-sm text-[var(--muted)] mt-1 mb-3">{topic.description}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {topic.lectures.map(l => (
                    <span
                      key={l}
                      className="text-xs px-2 py-0.5 rounded bg-[var(--background)] text-[var(--muted)] border border-[var(--border)]"
                    >
                      {l}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
