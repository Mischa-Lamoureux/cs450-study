'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getTopicBySlug } from '@/data/topics';
import { notesContent } from '@/data/notes';
import { loadProgress, markNoteRead } from '@/lib/progress';

export default function TopicNotesPage() {
  const params = useParams<{ topicSlug: string }>();
  const slug = params.topicSlug;
  const topic = getTopicBySlug(slug);
  const sections = notesContent[slug] || [];

  const [isRead, setIsRead] = useState(false);
  const [justMarked, setJustMarked] = useState(false);

  useEffect(() => {
    const p = loadProgress();
    setIsRead(p.notesRead.includes(slug));
  }, [slug]);

  function handleMarkRead() {
    markNoteRead(slug);
    setIsRead(true);
    setJustMarked(true);
    setTimeout(() => setJustMarked(false), 2000);
  }

  if (!topic) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-2">Topic Not Found</h1>
        <p className="text-[var(--muted)] mb-6">No notes found for &quot;{slug}&quot;.</p>
        <Link href="/notes" className="text-[var(--primary-light)] hover:underline">
          Back to all notes
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
        <Link href="/notes" className="hover:text-[var(--foreground)] transition-colors">
          Notes
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">{topic.title}</span>
      </div>

      {/* Topic header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">{topic.icon}</span>
          <div>
            <h1 className="text-3xl font-bold">{topic.title}</h1>
            <div className="flex items-center gap-2 mt-1">
              {topic.lectures.map(l => (
                <span
                  key={l}
                  className="text-xs px-2 py-0.5 rounded bg-[var(--primary)]/10 text-[var(--primary-light)] border border-[var(--primary)]/20"
                >
                  {l}
                </span>
              ))}
              <span className="text-xs px-2 py-0.5 rounded bg-[var(--card)] text-[var(--muted)] border border-[var(--border)]">
                {topic.weight === 'post-midterm' ? 'Post-Midterm' : 'Pre-Midterm'}
              </span>
            </div>
          </div>
        </div>
        <p className="text-[var(--muted)]">{topic.description}</p>
      </div>

      {/* Subtopics overview */}
      <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 mb-8">
        <h2 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wider mb-3">Topics Covered</h2>
        <div className="flex flex-wrap gap-2">
          {topic.subtopics.map(sub => (
            <span
              key={sub}
              className="text-sm px-3 py-1 rounded-lg bg-[var(--background)] text-[var(--foreground)] border border-[var(--border)]"
            >
              {sub}
            </span>
          ))}
        </div>
      </div>

      {/* Note sections */}
      <div className="space-y-8">
        {sections.map((section, idx) => (
          <section
            key={section.id}
            className="bg-[var(--card)] rounded-xl border border-[var(--border)] overflow-hidden"
          >
            {/* Section header */}
            <div className="px-6 py-4 border-b border-[var(--border)]">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[var(--muted)] font-mono">{String(idx + 1).padStart(2, '0')}</span>
                <h2 className="text-lg font-semibold">{section.title}</h2>
              </div>
            </div>

            {/* Content */}
            <div
              className="px-6 py-4 prose-custom"
              dangerouslySetInnerHTML={{ __html: section.content }}
              style={{
                lineHeight: '1.7',
                color: 'var(--foreground)',
              }}
            />

            {/* Key points */}
            {section.keyPoints.length > 0 && (
              <div className="px-6 py-4 border-t border-[var(--border)] bg-[var(--primary)]/5">
                <h3 className="text-sm font-semibold text-[var(--primary-light)] mb-2">Key Points</h3>
                <ul className="space-y-1.5">
                  {section.keyPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-[var(--primary-light)] mt-0.5 shrink-0">&#x2022;</span>
                      <span className="text-[var(--foreground)]">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Exam tip */}
            {section.examTip && (
              <div className="px-6 py-4 border-t border-[var(--border)] bg-[var(--warning)]/5">
                <div className="flex items-start gap-2">
                  <span className="text-[var(--warning)] text-lg leading-none mt-0.5">&#x26A0;</span>
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--warning)] mb-1">Exam Tip</h3>
                    <p className="text-sm text-[var(--foreground)]">{section.examTip}</p>
                  </div>
                </div>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Mark as read button */}
      <div className="mt-10 flex flex-col items-center gap-3">
        {isRead ? (
          <div className="flex items-center gap-2 text-[var(--success)]">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 10l4 4 6-6" />
            </svg>
            <span className="font-medium">
              {justMarked ? 'Marked as read! +20 XP' : 'You\'ve read these notes'}
            </span>
          </div>
        ) : (
          <button
            onClick={handleMarkRead}
            className="px-6 py-3 bg-[var(--primary)] text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            Mark as Read (+20 XP)
          </button>
        )}

        <Link
          href="/notes"
          className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          Back to all notes
        </Link>
      </div>
    </div>
  );
}
