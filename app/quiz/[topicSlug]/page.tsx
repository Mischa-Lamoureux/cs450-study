'use client';

import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { quizzesByTopic, allQuizQuestions, QuizQuestion } from '@/data/quizzes';
import { getTopicBySlug } from '@/data/topics';
import { recordQuizScore } from '@/lib/progress';

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function QuizPage() {
  const params = useParams<{ topicSlug: string }>();
  const topicSlug = params.topicSlug;

  const questions: QuizQuestion[] = useMemo(() => {
    if (topicSlug === 'random') {
      return shuffleArray(allQuizQuestions).slice(0, 15);
    }
    return quizzesByTopic[topicSlug] || [];
  }, [topicSlug]);

  const topic = topicSlug === 'random' ? null : getTopicBySlug(topicSlug);
  const title = topicSlug === 'random' ? 'Random Mix' : topic?.title || topicSlug;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [textAnswer, setTextAnswer] = useState('');

  if (questions.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">No Questions Found</h1>
        <p className="text-[var(--muted)] mb-4">
          No quiz questions available for &quot;{topicSlug}&quot;.
        </p>
        <Link href="/quiz" className="text-[var(--primary-light)] hover:underline">
          Back to quiz topics
        </Link>
      </div>
    );
  }

  const q = questions[currentIndex];
  const totalPoints = questions.reduce((s, q) => s + q.points, 0);

  function submitAnswer() {
    const userAnswer = q.type === 'short-answer' ? textAnswer.trim() : selectedOption;
    if (!userAnswer) return;
    setAnswers((prev) => ({ ...prev, [currentIndex]: userAnswer }));
    setShowResult(true);
  }

  function isCorrect(question: QuizQuestion, userAnswer: string): boolean {
    if (question.type === 'short-answer') {
      const lower = userAnswer.toLowerCase().trim();
      const correct = question.correctAnswer.toLowerCase().trim();
      if (lower === correct) return true;
      if (question.acceptableAnswers) {
        return question.acceptableAnswers.some(
          (a) => lower.includes(a.toLowerCase())
        );
      }
      return false;
    }
    return userAnswer === question.correctAnswer;
  }

  function nextQuestion() {
    setShowResult(false);
    setSelectedOption('');
    setTextAnswer('');
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setFinished(true);
      // Calculate score
      let earned = 0;
      questions.forEach((q, i) => {
        const userAns = i === currentIndex ? answers[i] || (q.type === 'short-answer' ? textAnswer.trim() : selectedOption) : answers[i];
        if (userAns && isCorrect(q, userAns)) {
          earned += q.points;
        }
      });
      recordQuizScore(topicSlug, earned, totalPoints);
    }
  }

  const currentAnswer = answers[currentIndex];
  const currentIsCorrect = currentAnswer ? isCorrect(q, currentAnswer) : false;

  // Score calculation for finished state
  const earnedPoints = finished
    ? questions.reduce((s, q, i) => {
        const a = answers[i];
        return s + (a && isCorrect(q, a) ? q.points : 0);
      }, 0)
    : 0;
  const correctCount = finished
    ? questions.filter((q, i) => answers[i] && isCorrect(q, answers[i])).length
    : 0;

  if (finished) {
    const pct = Math.round((earnedPoints / totalPoints) * 100);
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-8 text-center">
          <h1 className="text-2xl font-bold mb-2">Quiz Complete!</h1>
          <p className="text-[var(--muted)] mb-6">{title}</p>

          <div className="text-6xl font-bold mb-2" style={{
            color: pct >= 80 ? 'var(--success)' : pct >= 60 ? 'var(--warning)' : 'var(--danger)',
          }}>
            {pct}%
          </div>
          <p className="text-[var(--muted)] mb-6">
            {earnedPoints}/{totalPoints} points &middot; {correctCount}/{questions.length} questions correct
          </p>

          {/* Breakdown */}
          <div className="text-left space-y-3 mb-8">
            {questions.map((q, i) => {
              const a = answers[i];
              const correct = a && isCorrect(q, a);
              return (
                <div
                  key={q.id}
                  className={`flex items-start gap-3 p-3 rounded-lg border ${
                    correct
                      ? 'border-[var(--success)]/30 bg-[var(--success)]/5'
                      : 'border-[var(--danger)]/30 bg-[var(--danger)]/5'
                  }`}
                >
                  <span className="mt-0.5 text-lg">{correct ? '\u2705' : '\u274C'}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{q.question.slice(0, 100)}...</p>
                    <p className="text-xs text-[var(--muted)] mt-1">
                      Your answer: {a || '(no answer)'} &middot;{' '}
                      Correct: {q.correctAnswer}
                    </p>
                  </div>
                  <span className="text-xs text-[var(--muted)] whitespace-nowrap">
                    {correct ? q.points : 0}/{q.points}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex gap-3 justify-center">
            <Link
              href="/quiz"
              className="px-4 py-2 rounded-lg border border-[var(--border)] text-sm hover:bg-[var(--card-hover)] transition-colors"
            >
              All Topics
            </Link>
            <button
              onClick={() => {
                setCurrentIndex(0);
                setAnswers({});
                setShowResult(false);
                setFinished(false);
                setSelectedOption('');
                setTextAnswer('');
              }}
              className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white text-sm hover:opacity-90 transition-opacity"
            >
              Retry Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/quiz" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]">
          &larr; All Topics
        </Link>
        <span className="text-sm text-[var(--muted)]">{title}</span>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-[var(--muted)] mb-1">
          <span>
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span>{q.points} pt{q.points > 1 ? 's' : ''}</span>
        </div>
        <div className="w-full h-2 bg-[var(--background)] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + (showResult ? 1 : 0)) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${
              q.type === 'mc'
                ? 'bg-[var(--primary)]/10 text-[var(--primary-light)]'
                : q.type === 'tf'
                ? 'bg-[var(--accent)]/10 text-[var(--accent)]'
                : 'bg-[var(--warning)]/10 text-[var(--warning)]'
            }`}
          >
            {q.type === 'mc' ? 'Multiple Choice' : q.type === 'tf' ? 'True / False' : 'Short Answer'}
          </span>
        </div>

        <p className="text-lg mb-6 whitespace-pre-line">{q.question}</p>

        {/* MC options */}
        {q.type === 'mc' && q.options && (
          <div className="space-y-2">
            {q.options.map((opt) => {
              const isSelected = selectedOption === opt;
              const isAnswer = showResult && opt === q.correctAnswer;
              const isWrong = showResult && isSelected && opt !== q.correctAnswer;
              return (
                <button
                  key={opt}
                  onClick={() => !showResult && setSelectedOption(opt)}
                  disabled={showResult}
                  className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors ${
                    isAnswer
                      ? 'border-[var(--success)] bg-[var(--success)]/10 text-[var(--success)]'
                      : isWrong
                      ? 'border-[var(--danger)] bg-[var(--danger)]/10 text-[var(--danger)]'
                      : isSelected
                      ? 'border-[var(--primary)] bg-[var(--primary)]/10'
                      : 'border-[var(--border)] hover:border-[var(--primary)]/40'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        )}

        {/* TF buttons */}
        {q.type === 'tf' && (
          <div className="flex gap-3">
            {['True', 'False'].map((opt) => {
              const isSelected = selectedOption === opt;
              const isAnswer = showResult && opt === q.correctAnswer;
              const isWrong = showResult && isSelected && opt !== q.correctAnswer;
              return (
                <button
                  key={opt}
                  onClick={() => !showResult && setSelectedOption(opt)}
                  disabled={showResult}
                  className={`flex-1 px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
                    isAnswer
                      ? 'border-[var(--success)] bg-[var(--success)]/10 text-[var(--success)]'
                      : isWrong
                      ? 'border-[var(--danger)] bg-[var(--danger)]/10 text-[var(--danger)]'
                      : isSelected
                      ? 'border-[var(--primary)] bg-[var(--primary)]/10'
                      : 'border-[var(--border)] hover:border-[var(--primary)]/40'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        )}

        {/* Short answer */}
        {q.type === 'short-answer' && (
          <div>
            <input
              type="text"
              value={textAnswer}
              onChange={(e) => setTextAnswer(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !showResult && submitAnswer()}
              disabled={showResult}
              placeholder="Type your answer..."
              className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none focus:border-[var(--primary)] disabled:opacity-60"
            />
          </div>
        )}
      </div>

      {/* Explanation */}
      {showResult && (
        <div
          className={`rounded-xl border p-5 mb-6 ${
            currentIsCorrect
              ? 'border-[var(--success)]/30 bg-[var(--success)]/5'
              : 'border-[var(--danger)]/30 bg-[var(--danger)]/5'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{currentIsCorrect ? '\u2705' : '\u274C'}</span>
            <span className="font-semibold">
              {currentIsCorrect ? 'Correct!' : 'Incorrect'}
            </span>
          </div>
          {!currentIsCorrect && (
            <p className="text-sm mb-2">
              <span className="text-[var(--muted)]">Correct answer: </span>
              <span className="font-medium">{q.correctAnswer}</span>
            </p>
          )}
          <p className="text-sm text-[var(--muted)]">{q.explanation}</p>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex justify-end">
        {!showResult ? (
          <button
            onClick={submitAnswer}
            disabled={q.type === 'short-answer' ? !textAnswer.trim() : !selectedOption}
            className="px-6 py-2.5 rounded-lg bg-[var(--primary)] text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={nextQuestion}
            className="px-6 py-2.5 rounded-lg bg-[var(--primary)] text-white text-sm font-medium hover:opacity-90 transition-opacity"
          >
            {currentIndex + 1 < questions.length ? 'Next Question' : 'See Results'}
          </button>
        )}
      </div>
    </div>
  );
}
