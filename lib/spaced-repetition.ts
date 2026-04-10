/**
 * SM-2 spaced repetition algorithm.
 *
 * quality: 0–5 rating of how well the card was recalled
 *   0 – complete blackout
 *   1 – incorrect; correct answer remembered after seeing it
 *   2 – incorrect; correct answer seemed easy to recall
 *   3 – correct with serious difficulty
 *   4 – correct after hesitation
 *   5 – perfect recall
 *
 * Returns updated { ease, interval (days), repetitions }.
 */
export function sm2(
  quality: number,
  prev: { ease: number; interval: number; repetitions: number },
): { ease: number; interval: number; repetitions: number } {
  const q = Math.max(0, Math.min(5, Math.round(quality)));

  let { ease, interval, repetitions } = prev;

  if (q < 3) {
    // Failed recall — reset
    repetitions = 0;
    interval = 1;
  } else {
    // Successful recall
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * ease);
    }
    repetitions += 1;
  }

  // Update ease factor (minimum 1.3)
  ease = ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  if (ease < 1.3) ease = 1.3;

  return { ease, interval, repetitions };
}

/** Map the Easy / Medium / Hard buttons to SM-2 quality scores. */
export function difficultyToQuality(rating: 'easy' | 'medium' | 'hard'): number {
  switch (rating) {
    case 'easy':
      return 5;
    case 'medium':
      return 3;
    case 'hard':
      return 1;
  }
}

/** Default state for a brand-new card. */
export function defaultCardState() {
  return { ease: 2.5, interval: 0, repetitions: 0 };
}
