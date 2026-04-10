'use client';

import Link from 'next/link';
import { practiceExams } from '@/data/practice-finals';

export default function PracticeFinalsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Practice Finals</h1>
      <p className="text-[var(--muted)] mb-8">
        Three full-length practice exams modeled after the CS 450 final. Each has MC (auto-graded),
        short answer (keyword-matched), and long answer (answer key revealed) sections.
      </p>

      <div className="space-y-4">
        {practiceExams.map((exam, idx) => {
          const mcCount = exam.sections
            .flatMap((s) => s.questions)
            .filter((q) => q.type === 'mc').length;
          const saCount = exam.sections
            .flatMap((s) => s.questions)
            .filter((q) => q.type === 'short-answer').length;
          const laCount = exam.sections
            .flatMap((s) => s.questions)
            .filter((q) => q.type === 'long-answer').length;

          return (
            <Link
              key={exam.id}
              href={`/practice-finals/${exam.id}`}
              className="block bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 hover:border-[var(--primary)]/40 hover:bg-[var(--card-hover)] transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{['📝', '📋', '📄'][idx]}</span>
                    <h2 className="text-lg font-semibold">{exam.title}</h2>
                  </div>
                  <p className="text-sm text-[var(--muted)] mb-3">
                    {exam.sections.length} sections &middot; {exam.totalPoints} points &middot;{' '}
                    {exam.duration} minutes
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary-light)]">
                      {mcCount} MC (auto-graded)
                    </span>
                    <span className="px-2 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)]">
                      {saCount} Short Answer
                    </span>
                    <span className="px-2 py-1 rounded-full bg-[var(--warning)]/10 text-[var(--warning)]">
                      {laCount} Long Answer
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-2xl font-bold text-[var(--primary-light)]">
                    {exam.totalPoints}
                  </div>
                  <div className="text-xs text-[var(--muted)]">points</div>
                  <div className="text-sm text-[var(--muted)] mt-1">
                    ~{exam.duration} min
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 bg-[var(--card)] rounded-xl border border-[var(--border)] p-5">
        <h3 className="font-semibold mb-2">Exam Tips</h3>
        <ul className="space-y-1 text-sm text-[var(--muted)]">
          <li>&bull; Set a timer for 2 hours to simulate real exam conditions</li>
          <li>&bull; Part A (MC) is auto-graded instantly</li>
          <li>&bull; Part B (Short Answer) uses keyword matching -- compare your answer to the solution</li>
          <li>&bull; Part C (Long Answer) shows the full answer key so you can self-assess</li>
          <li>&bull; Weight: ~85% post-midterm, ~15% pre-midterm material</li>
          <li>&bull; Closed-book, simple calculator allowed on the real exam</li>
        </ul>
      </div>
    </div>
  );
}
