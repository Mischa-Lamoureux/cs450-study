'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { flashcardsByTopic, allFlashcards, type Flashcard } from '@/data/flashcards';
import { getTopicBySlug } from '@/data/topics';
import {
  sm2,
  difficultyToQuality,
  defaultCardState,
} from '@/lib/spaced-repetition';
import {
  loadProgress,
  updateProgress,
  addXP,
  checkAchievements,
  type FlashcardProgress,
} from '@/lib/progress';

function StudySession() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const topicParam = searchParams.get('topic') ?? 'all';

  // Build deck
  const [deck, setDeck] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [sessionRatings, setSessionRatings] = useState<
    { id: string; rating: 'easy' | 'medium' | 'hard' }[]
  >([]);
  const [finished, setFinished] = useState(false);

  // Initialise deck
  useEffect(() => {
    let cards: Flashcard[];

    if (topicParam === 'all') {
      cards = [...allFlashcards];
    } else if (topicParam === 'due') {
      const progress = loadProgress();
      const now = new Date();
      cards = allFlashcards.filter((c) => {
        const fp = progress.flashcards[c.id];
        if (!fp) return true;
        return new Date(fp.nextReview) <= now;
      });
    } else {
      cards = [...(flashcardsByTopic[topicParam] ?? [])];
    }

    // Shuffle
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    setDeck(cards);
    setCurrentIndex(0);
    setFlipped(false);
    setSessionRatings([]);
    setFinished(false);
  }, [topicParam]);

  const currentCard = deck[currentIndex] ?? null;
  const topicInfo = topicParam !== 'all' && topicParam !== 'due'
    ? getTopicBySlug(topicParam)
    : null;

  const flip = useCallback(() => {
    if (!finished && currentCard) setFlipped((f) => !f);
  }, [finished, currentCard]);

  const rate = useCallback(
    (rating: 'easy' | 'medium' | 'hard') => {
      if (!currentCard || !flipped) return;

      // Update spaced repetition state
      const progress = loadProgress();
      const prev: FlashcardProgress = progress.flashcards[currentCard.id] ?? {
        ease: defaultCardState().ease,
        interval: defaultCardState().interval,
        nextReview: new Date().toISOString(),
        repetitions: defaultCardState().repetitions,
      };

      const quality = difficultyToQuality(rating);
      const result = sm2(quality, {
        ease: prev.ease,
        interval: prev.interval,
        repetitions: prev.repetitions,
      });

      const nextReview = new Date();
      nextReview.setDate(nextReview.getDate() + result.interval);

      updateProgress((p) => ({
        ...p,
        flashcards: {
          ...p.flashcards,
          [currentCard.id]: {
            ease: result.ease,
            interval: result.interval,
            repetitions: result.repetitions,
            nextReview: nextReview.toISOString(),
          },
        },
        totalFlashcardsStudied: p.totalFlashcardsStudied + 1,
      }));

      // XP
      const xpMap = { easy: 5, medium: 10, hard: 15 };
      addXP(xpMap[rating], `Flashcard: ${currentCard.id}`);
      checkAchievements();

      setSessionRatings((prev) => [...prev, { id: currentCard.id, rating }]);

      // Next card or finish
      if (currentIndex + 1 >= deck.length) {
        setFinished(true);
      } else {
        setCurrentIndex((i) => i + 1);
        setFlipped(false);
      }
    },
    [currentCard, flipped, currentIndex, deck.length],
  );

  // Keyboard shortcuts
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        flip();
      } else if (e.key === '1') {
        rate('hard');
      } else if (e.key === '2') {
        rate('medium');
      } else if (e.key === '3') {
        rate('easy');
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [flip, rate]);

  const topicLabel =
    topicParam === 'all'
      ? 'All Topics'
      : topicParam === 'due'
        ? 'Due for Review'
        : topicInfo?.title ?? topicParam;

  // Empty deck
  if (deck.length === 0 && !finished) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="text-5xl mb-4">&#x2705;</div>
        <h1 className="text-2xl font-bold mb-2">No cards to study</h1>
        <p className="text-[var(--muted)] mb-6">
          {topicParam === 'due'
            ? 'All cards are up to date! Come back later when cards are due.'
            : 'No flashcards found for this topic.'}
        </p>
        <Link
          href="/flashcards"
          className="px-5 py-2.5 rounded-lg bg-[var(--primary)] text-white font-medium text-sm hover:opacity-90 transition-opacity"
        >
          Back to Flashcards
        </Link>
      </div>
    );
  }

  // Session summary
  if (finished) {
    const easyCount = sessionRatings.filter((r) => r.rating === 'easy').length;
    const mediumCount = sessionRatings.filter((r) => r.rating === 'medium').length;
    const hardCount = sessionRatings.filter((r) => r.rating === 'hard').length;
    const total = sessionRatings.length;
    const score = total > 0 ? Math.round(((easyCount * 3 + mediumCount * 2 + hardCount * 1) / (total * 3)) * 100) : 0;

    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">&#x1F389;</div>
          <h1 className="text-2xl font-bold mb-2">Session Complete</h1>
          <p className="text-[var(--muted)]">{topicLabel}</p>
        </div>

        <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 mb-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-[var(--foreground)]">{total}</div>
              <div className="text-xs text-[var(--muted)]">Cards Reviewed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[var(--success)]">{easyCount}</div>
              <div className="text-xs text-[var(--muted)]">Easy</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[var(--warning)]">{mediumCount}</div>
              <div className="text-xs text-[var(--muted)]">Medium</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[var(--danger)]">{hardCount}</div>
              <div className="text-xs text-[var(--muted)]">Hard</div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-[var(--muted)]">Performance</span>
              <span className="font-medium">{score}%</span>
            </div>
            <div className="w-full h-3 bg-[var(--background)] rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  score >= 80
                    ? 'bg-[var(--success)]'
                    : score >= 50
                      ? 'bg-[var(--warning)]'
                      : 'bg-[var(--danger)]'
                }`}
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => {
              setCurrentIndex(0);
              setFlipped(false);
              setSessionRatings([]);
              setFinished(false);
              // Re-shuffle
              const copy = [...deck];
              for (let i = copy.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [copy[i], copy[j]] = [copy[j], copy[i]];
              }
              setDeck(copy);
            }}
            className="px-5 py-2.5 rounded-lg bg-[var(--primary)] text-white font-medium text-sm hover:opacity-90 transition-opacity"
          >
            Study Again
          </button>
          <Link
            href="/flashcards"
            className="px-5 py-2.5 rounded-lg bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)] font-medium text-sm hover:bg-[var(--card-hover)] transition-colors"
          >
            Back to Topics
          </Link>
        </div>
      </div>
    );
  }

  // Active study
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link
            href="/flashcards"
            className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            &larr; Back
          </Link>
          <h1 className="text-xl font-bold">{topicLabel}</h1>
        </div>
        <div className="text-sm text-[var(--muted)]">
          {currentIndex + 1} / {deck.length}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-[var(--card)] rounded-full overflow-hidden mb-8">
        <div
          className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex) / deck.length) * 100}%` }}
        />
      </div>

      {/* Card */}
      {currentCard && (
        <div
          className="perspective cursor-pointer mb-6"
          onClick={flip}
          role="button"
          tabIndex={0}
          aria-label={flipped ? 'Card back shown. Press space to flip.' : 'Card front shown. Press space to flip.'}
        >
          <div
            className="relative w-full transition-transform duration-500"
            style={{
              transformStyle: 'preserve-3d',
              transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              minHeight: '280px',
            }}
          >
            {/* Front */}
            <div
              className="absolute inset-0 backface-hidden bg-[var(--card)] rounded-xl border border-[var(--border)] p-8 flex flex-col justify-center"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="text-xs text-[var(--muted)] mb-3 uppercase tracking-wide">
                Question
              </div>
              <p className="text-lg leading-relaxed">{currentCard.front}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {currentCard.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary-light)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 text-xs text-[var(--muted)] text-center">
                Tap or press Space to flip
              </div>
            </div>

            {/* Back */}
            <div
              className="absolute inset-0 backface-hidden bg-[var(--card)] rounded-xl border border-[var(--primary)]/30 p-8 flex flex-col justify-center"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <div className="text-xs text-[var(--primary-light)] mb-3 uppercase tracking-wide">
                Answer
              </div>
              <p className="text-lg leading-relaxed whitespace-pre-line">{currentCard.back}</p>
            </div>
          </div>
        </div>
      )}

      {/* Rating buttons */}
      <div
        className={`flex gap-3 justify-center transition-opacity duration-300 ${
          flipped ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          onClick={() => rate('hard')}
          className="flex-1 max-w-[140px] py-3 rounded-lg bg-[var(--danger)]/10 border border-[var(--danger)]/20 text-[var(--danger)] font-medium text-sm hover:bg-[var(--danger)]/20 transition-colors"
        >
          Hard
          <span className="block text-xs opacity-60 mt-0.5">Press 1</span>
        </button>
        <button
          onClick={() => rate('medium')}
          className="flex-1 max-w-[140px] py-3 rounded-lg bg-[var(--warning)]/10 border border-[var(--warning)]/20 text-[var(--warning)] font-medium text-sm hover:bg-[var(--warning)]/20 transition-colors"
        >
          Medium
          <span className="block text-xs opacity-60 mt-0.5">Press 2</span>
        </button>
        <button
          onClick={() => rate('easy')}
          className="flex-1 max-w-[140px] py-3 rounded-lg bg-[var(--success)]/10 border border-[var(--success)]/20 text-[var(--success)] font-medium text-sm hover:bg-[var(--success)]/20 transition-colors"
        >
          Easy
          <span className="block text-xs opacity-60 mt-0.5">Press 3</span>
        </button>
      </div>

      {/* Keyboard hint */}
      <div className="text-center text-xs text-[var(--muted)] mt-6">
        Space = flip &middot; 1 = Hard &middot; 2 = Medium &middot; 3 = Easy
      </div>
    </div>
  );
}

export default function StudyPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="text-[var(--muted)]">Loading flashcards...</div>
        </div>
      }
    >
      <StudySession />
    </Suspense>
  );
}
