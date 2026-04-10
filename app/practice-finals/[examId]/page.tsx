'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getExamById, ExamQuestion } from '@/data/practice-finals';
import { recordExamScore } from '@/lib/progress';

export default function ExamTakingPage() {
  const params = useParams<{ examId: string }>();
  const exam = getExamById(params.examId);

  const [mcAnswers, setMcAnswers] = useState<Record<string, string>>({});
  const [saAnswers, setSaAnswers] = useState<Record<string, string>>({});
  const [laAnswers, setLaAnswers] = useState<Record<string, string>>({});
  const [revealedKeys, setRevealedKeys] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [selfGraded, setSelfGraded] = useState<Record<string, number>>({});
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (!exam) return;
    setTimeLeft(exam.duration * 60);
    setTimerEnabled(true);
    setStarted(true);
  }, [exam]);

  const startWithoutTimer = useCallback(() => {
    setTimerEnabled(false);
    setStarted(true);
  }, []);

  useEffect(() => {
    if (!timerEnabled || !started || submitted) return;
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timerEnabled, started, submitted]);

  if (!exam) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Exam Not Found</h1>
        <Link href="/practice-finals" className="text-[var(--primary-light)] hover:underline">
          Back to practice exams
        </Link>
      </div>
    );
  }

  const allQuestions = exam.sections.flatMap((s) => s.questions);
  const mcQuestions = allQuestions.filter((q) => q.type === 'mc');
  const saQuestions = allQuestions.filter((q) => q.type === 'short-answer');
  const laQuestions = allQuestions.filter((q) => q.type === 'long-answer');

  function formatTime(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    return `${m}:${String(s).padStart(2, '0')}`;
  }

  function handleSubmit() {
    setSubmitted(true);
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Auto-grade MC
    let autoScore = 0;
    mcQuestions.forEach((q) => {
      if (mcAnswers[q.id] === q.correctAnswer) {
        autoScore += q.points;
      }
    });

    // Keyword-match short answers
    let saScore = 0;
    saQuestions.forEach((q) => {
      const userAns = (saAnswers[q.id] || '').toLowerCase().trim();
      const correct = (q.correctAnswer || '').toLowerCase().trim();
      if (!userAns) return;
      // Simple keyword matching
      const keywords = correct.split(/[,;.()]/).map((k) => k.trim()).filter(Boolean);
      const matchCount = keywords.filter((kw) => kw.length > 3 && userAns.includes(kw)).length;
      const matchRatio = keywords.length > 0 ? matchCount / keywords.length : 0;
      if (matchRatio >= 0.5) saScore += q.points;
      else if (matchRatio >= 0.25) saScore += Math.ceil(q.points / 2);
    });

    recordExamScore(exam!.id, autoScore, saScore, exam!.totalPoints);
  }

  // Calculate scores for display
  const mcScore = mcQuestions.reduce(
    (s, q) => s + (mcAnswers[q.id] === q.correctAnswer ? q.points : 0),
    0
  );
  const mcTotal = mcQuestions.reduce((s, q) => s + q.points, 0);
  const saTotal = saQuestions.reduce((s, q) => s + q.points, 0);
  const laTotal = laQuestions.reduce((s, q) => s + q.points, 0);
  const selfGradedTotal = Object.values(selfGraded).reduce((s, v) => s + v, 0);

  // Start screen
  if (!started) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link href="/practice-finals" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]">
          &larr; All Practice Exams
        </Link>
        <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-8 mt-6 text-center">
          <h1 className="text-2xl font-bold mb-2">{exam.title}</h1>
          <p className="text-[var(--muted)] mb-6">
            {exam.totalPoints} points &middot; {exam.duration} minutes &middot;{' '}
            {exam.sections.length} sections
          </p>
          <div className="text-left bg-[var(--background)] rounded-lg p-4 mb-6 text-sm">
            {exam.sections.map((s) => (
              <div key={s.title} className="mb-2 last:mb-0">
                <span className="font-medium">{s.title}</span>
                <span className="text-[var(--muted)]">
                  {' '}
                  &mdash; {s.questions.length} questions &middot; {s.instructions}
                </span>
              </div>
            ))}
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={startTimer}
              className="px-6 py-2.5 rounded-lg bg-[var(--primary)] text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Start with Timer ({exam.duration} min)
            </button>
            <button
              onClick={startWithoutTimer}
              className="px-6 py-2.5 rounded-lg border border-[var(--border)] text-sm font-medium hover:bg-[var(--card-hover)] transition-colors"
            >
              Start without Timer
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Results screen
  if (submitted) {
    const overallAutoScore = mcScore;
    const pct = Math.round(
      ((overallAutoScore + selfGradedTotal) / exam.totalPoints) * 100
    );

    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Results: {exam.title}</h1>

        {/* Score overview */}
        <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 mb-8">
          <div className="text-center mb-6">
            <div
              className="text-5xl font-bold mb-1"
              style={{
                color:
                  pct >= 80
                    ? 'var(--success)'
                    : pct >= 60
                    ? 'var(--warning)'
                    : 'var(--danger)',
              }}
            >
              {pct}%
            </div>
            <p className="text-[var(--muted)] text-sm">
              {overallAutoScore + selfGradedTotal}/{exam.totalPoints} points (auto + self-graded)
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <div className="text-lg font-bold text-[var(--primary-light)]">
                {mcScore}/{mcTotal}
              </div>
              <div className="text-[var(--muted)]">MC (auto)</div>
            </div>
            <div>
              <div className="text-lg font-bold text-[var(--accent)]">
                {selfGradedTotal - (selfGradedTotal > laTotal ? laTotal : 0)}/{saTotal}
              </div>
              <div className="text-[var(--muted)]">Short Answer (self)</div>
            </div>
            <div>
              <div className="text-lg font-bold text-[var(--warning)]">
                {Object.entries(selfGraded)
                  .filter(([k]) => laQuestions.some((q) => q.id === k))
                  .reduce((s, [, v]) => s + v, 0)}
                /{laTotal}
              </div>
              <div className="text-[var(--muted)]">Long Answer (self)</div>
            </div>
          </div>
        </div>

        {/* Detailed review */}
        {exam.sections.map((section) => (
          <div key={section.title} className="mb-8">
            <h2 className="text-lg font-semibold mb-4">{section.title}</h2>
            <div className="space-y-4">
              {section.questions.map((q) => (
                <div
                  key={q.id}
                  className="bg-[var(--card)] rounded-lg border border-[var(--border)] p-4"
                >
                  <p className="text-sm mb-3 whitespace-pre-line">{q.question}</p>

                  {q.type === 'mc' && (
                    <div className="space-y-1">
                      {q.options?.map((opt) => (
                        <div
                          key={opt}
                          className={`text-sm px-3 py-1.5 rounded ${
                            opt === q.correctAnswer
                              ? 'bg-[var(--success)]/10 text-[var(--success)]'
                              : opt === mcAnswers[q.id] && opt !== q.correctAnswer
                              ? 'bg-[var(--danger)]/10 text-[var(--danger)]'
                              : 'text-[var(--muted)]'
                          }`}
                        >
                          {opt === q.correctAnswer && '\u2713 '}
                          {opt === mcAnswers[q.id] && opt !== q.correctAnswer && '\u2717 '}
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}

                  {q.type === 'short-answer' && (
                    <div className="text-sm">
                      <p>
                        <span className="text-[var(--muted)]">Your answer: </span>
                        {saAnswers[q.id] || '(blank)'}
                      </p>
                      <p className="mt-1">
                        <span className="text-[var(--success)]">Answer: </span>
                        {q.correctAnswer}
                      </p>
                    </div>
                  )}

                  {q.type === 'long-answer' && (
                    <div className="text-sm">
                      <p className="text-[var(--muted)] mb-1">Your answer:</p>
                      <p className="whitespace-pre-line bg-[var(--background)] rounded p-2 mb-2 text-xs">
                        {laAnswers[q.id] || '(blank)'}
                      </p>
                      <p className="text-[var(--success)] mb-1">Answer Key:</p>
                      <p className="whitespace-pre-line bg-[var(--success)]/5 rounded p-2 text-xs">
                        {q.answerKey}
                      </p>
                      {q.rubric && (
                        <div className="mt-2">
                          <p className="text-[var(--muted)] text-xs">Rubric:</p>
                          <ul className="text-xs text-[var(--muted)] ml-3">
                            {q.rubric.map((r, i) => (
                              <li key={i}>&bull; {r}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Self-grading for SA and LA */}
                  {(q.type === 'short-answer' || q.type === 'long-answer') && (
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs text-[var(--muted)]">Self-grade:</span>
                      <input
                        type="number"
                        min={0}
                        max={q.points}
                        value={selfGraded[q.id] ?? ''}
                        onChange={(e) => {
                          const val = Math.min(
                            q.points,
                            Math.max(0, parseInt(e.target.value) || 0)
                          );
                          setSelfGraded((prev) => ({ ...prev, [q.id]: val }));
                        }}
                        className="w-16 px-2 py-1 rounded border border-[var(--border)] bg-[var(--background)] text-sm text-center"
                      />
                      <span className="text-xs text-[var(--muted)]">/ {q.points}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex gap-3 justify-center mt-8">
          <Link
            href="/practice-finals"
            className="px-4 py-2 rounded-lg border border-[var(--border)] text-sm hover:bg-[var(--card-hover)] transition-colors"
          >
            All Practice Exams
          </Link>
        </div>
      </div>
    );
  }

  // Active exam view
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header with timer */}
      <div className="sticky top-14 z-40 bg-[var(--background)] py-3 border-b border-[var(--border)] mb-6 -mx-4 px-4">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">{exam.title}</h1>
          <div className="flex items-center gap-4">
            {timerEnabled && (
              <div
                className={`font-mono text-lg font-bold ${
                  timeLeft < 300 ? 'text-[var(--danger)]' : 'text-[var(--foreground)]'
                }`}
              >
                {formatTime(timeLeft)}
              </div>
            )}
            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Submit Exam
            </button>
          </div>
        </div>
      </div>

      {/* Sections */}
      {exam.sections.map((section) => (
        <div key={section.title} className="mb-10">
          <div className="mb-4">
            <h2 className="text-xl font-bold">{section.title}</h2>
            <p className="text-sm text-[var(--muted)]">{section.instructions}</p>
          </div>

          <div className="space-y-6">
            {section.questions.map((q, qi) => (
              <div
                key={q.id}
                className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5"
              >
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-sm font-bold text-[var(--muted)] mt-0.5">
                    {qi + 1}.
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-[var(--muted)]">[{q.points} pt{q.points > 1 ? 's' : ''}]</span>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-[var(--background)] text-[var(--muted)]">
                        {q.topic}
                      </span>
                    </div>
                    <p className="whitespace-pre-line">{q.question}</p>

                    {/* MC options */}
                    {q.type === 'mc' && q.options && (
                      <div className="mt-3 space-y-2">
                        {q.options.map((opt) => (
                          <button
                            key={opt}
                            onClick={() =>
                              setMcAnswers((prev) => ({ ...prev, [q.id]: opt }))
                            }
                            className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-colors ${
                              mcAnswers[q.id] === opt
                                ? 'border-[var(--primary)] bg-[var(--primary)]/10'
                                : 'border-[var(--border)] hover:border-[var(--primary)]/40'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Short answer */}
                    {q.type === 'short-answer' && (
                      <textarea
                        value={saAnswers[q.id] || ''}
                        onChange={(e) =>
                          setSaAnswers((prev) => ({
                            ...prev,
                            [q.id]: e.target.value,
                          }))
                        }
                        rows={3}
                        placeholder="Type your answer..."
                        className="mt-3 w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none focus:border-[var(--primary)] resize-y"
                      />
                    )}

                    {/* Long answer */}
                    {q.type === 'long-answer' && (
                      <div className="mt-3">
                        <textarea
                          value={laAnswers[q.id] || ''}
                          onChange={(e) =>
                            setLaAnswers((prev) => ({
                              ...prev,
                              [q.id]: e.target.value,
                            }))
                          }
                          rows={8}
                          placeholder="Show all work..."
                          className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none focus:border-[var(--primary)] resize-y font-mono"
                        />
                        {q.parts && (
                          <div className="mt-2 text-xs text-[var(--muted)]">
                            Parts:{' '}
                            {q.parts.map((p) => `${p.label} (${p.points}pts)`).join(', ')}
                          </div>
                        )}
                        {revealedKeys[q.id] ? (
                          <div className="mt-3 bg-[var(--success)]/5 border border-[var(--success)]/20 rounded-lg p-4">
                            <p className="text-sm font-medium text-[var(--success)] mb-2">
                              Answer Key:
                            </p>
                            <p className="text-sm whitespace-pre-line">{q.answerKey}</p>
                            {q.rubric && (
                              <div className="mt-3 border-t border-[var(--success)]/10 pt-2">
                                <p className="text-xs font-medium text-[var(--muted)] mb-1">
                                  Rubric:
                                </p>
                                <ul className="text-xs text-[var(--muted)] space-y-0.5">
                                  {q.rubric.map((r, i) => (
                                    <li key={i}>&bull; {r}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ) : (
                          <button
                            onClick={() =>
                              setRevealedKeys((prev) => ({
                                ...prev,
                                [q.id]: true,
                              }))
                            }
                            className="mt-2 text-xs text-[var(--primary-light)] hover:underline"
                          >
                            Show Answer Key
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Bottom submit */}
      <div className="text-center py-8 border-t border-[var(--border)]">
        <button
          onClick={handleSubmit}
          className="px-8 py-3 rounded-lg bg-[var(--primary)] text-white font-medium hover:opacity-90 transition-opacity"
        >
          Submit Exam
        </button>
        <p className="text-xs text-[var(--muted)] mt-2">
          MC will be auto-graded. Short and long answer will show answer keys for self-assessment.
        </p>
      </div>
    </div>
  );
}
