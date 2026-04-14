'use client';

import Link from 'next/link';
import { assignmentExams } from '@/data/assignment-practice';

const hwTopics = [
  { hw: 'HW1', topics: 'Dataflow, ISA vs Microarchitecture, Addressing Modes' },
  { hw: 'HW2', topics: 'Performance Evaluation, ISA Tradeoffs (Stack/Accumulator/Register), Single-cycle Datapath' },
  { hw: 'HW3', topics: 'Pipelining, Data Forwarding, Vector Processing, Systolic Arrays' },
  { hw: 'HW4', topics: 'Branch Prediction (Last-time, 2-bit, Global/Local Correlation)' },
  { hw: 'HW5', topics: 'Caching (Associativity, Replacement), Memory Scheduling (FR-FCFS, Channel Partitioning)' },
];

export default function AssignmentPracticePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Assignment-Style Practice</h1>
      <p className="text-[var(--muted)] mb-8">
        Practice exams modeled after the difficulty and question styles from
        HW1&ndash;HW5. The professor typically makes final exams with similar
        topics and difficulty to the assignments.
      </p>

      <div className="space-y-4">
        {assignmentExams.map((exam, idx) => {
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
              href={`/assignment-practice/${exam.id}`}
              className="block bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 hover:border-[var(--primary)]/40 hover:bg-[var(--card-hover)] transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">
                      {['\uD83D\uDCDD', '\u2699\uFE0F', '\uD83E\udDE0'][idx]}
                    </span>
                    <h2 className="text-lg font-semibold">{exam.title}</h2>
                  </div>
                  <p className="text-sm text-[var(--muted)] mb-3">
                    {exam.sections.length} sections &middot; {exam.totalPoints}{' '}
                    points &middot; {exam.duration} minutes
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
        <h3 className="font-semibold mb-3">Assignment Coverage</h3>
        <div className="space-y-2 text-sm">
          {hwTopics.map((hw) => (
            <div key={hw.hw} className="flex gap-3">
              <span className="font-medium text-[var(--primary-light)] shrink-0 w-10">
                {hw.hw}
              </span>
              <span className="text-[var(--muted)]">{hw.topics}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 bg-[var(--card)] rounded-xl border border-[var(--border)] p-5">
        <h3 className="font-semibold mb-2">Tips</h3>
        <ul className="space-y-1 text-sm text-[var(--muted)]">
          <li>&bull; These questions mirror the style and difficulty of your actual assignments</li>
          <li>&bull; MC is auto-graded, short answer uses keyword matching, long answer shows full solutions</li>
          <li>&bull; Work through problems on paper first, then check your answer</li>
          <li>&bull; Focus on post-midterm topics (Exams 2 &amp; 3) for the final</li>
        </ul>
      </div>
    </div>
  );
}
