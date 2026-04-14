export interface QuizQuestion {
  id: string;
  type: 'mc' | 'tf' | 'short-answer';
  topic: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  acceptableAnswers?: string[];
  explanation: string;
  points: number;
}

// ─── Branch Prediction (15 questions) ───────────────────────────────────────

const branchPrediction: QuizQuestion[] = [
  {
    id: 'bp-1',
    type: 'mc',
    topic: 'branch-prediction',
    question:
      'A 2-bit saturating counter starts at state "Weakly Taken" (10). The actual branch outcomes are T, N, T, T. What is the final state of the counter?',
    options: [
      '00 (Strongly Not Taken)',
      '01 (Weakly Not Taken)',
      '10 (Weakly Taken)',
      '11 (Strongly Taken)',
    ],
    correctAnswer: '11 (Strongly Taken)',
    explanation:
      'Start at 10 (WT). T: 10->11 (ST). N: 11->10 (WT). T: 10->11 (ST). T: 11->11 (ST). Final state is 11 (Strongly Taken).',
    points: 1,
  },
  {
    id: 'bp-2',
    type: 'mc',
    topic: 'branch-prediction',
    question:
      'For the branch pattern TNTNTNTN, what is the prediction accuracy of a 1-bit (last-time) predictor? Assume initial prediction is "Not Taken".',
    options: ['0%', '25%', '50%', '100%'],
    correctAnswer: '0%',
    explanation:
      'The 1-bit predictor always predicts what happened last time. With alternating T/N, after seeing T it predicts T (but next is N), after seeing N it predicts N (but next is T). Every prediction is wrong, yielding 0% accuracy.',
    points: 1,
  },
  {
    id: 'bp-3',
    type: 'tf',
    topic: 'branch-prediction',
    question:
      'A 2-bit saturating counter predictor achieves 100% accuracy on the repeating pattern TTTNTTTNTTTNTTT... after the warmup period.',
    correctAnswer: 'False',
    explanation:
      'For the pattern TTTN repeating, after warmup the counter stays at Strongly Taken (11). On each T: predicts T, correct, stays 11. On N: predicts T, actual N -> misprediction, goes to 10 (WT). Next T: predicts T (WT still predicts taken), correct, back to 11. So there is 1 misprediction per 4-outcome period, giving 75% accuracy, not 100%.',
    points: 1,
  },
  {
    id: 'bp-4',
    type: 'mc',
    topic: 'branch-prediction',
    question:
      'In a gshare predictor with a 4-bit Global History Register (GHR) and 16-entry Pattern History Table (PHT), which index is used to access the PHT when GHR = 1010 and the lower 4 bits of the branch PC are 0110?',
    options: ['1010', '0110', '1100', '0100'],
    correctAnswer: '1100',
    explanation:
      'Gshare XORs the GHR with the lower bits of the PC to index into the PHT. 1010 XOR 0110 = 1100, so PHT index 12 (1100) is accessed.',
    points: 1,
  },
  {
    id: 'bp-5',
    type: 'mc',
    topic: 'branch-prediction',
    question:
      'Which predictor uses a "choice" table to select between a global and a local predictor for each branch?',
    options: [
      'Gshare predictor',
      'Two-level local predictor',
      'Tournament (hybrid) predictor',
      'Branch Target Buffer',
    ],
    correctAnswer: 'Tournament (hybrid) predictor',
    explanation:
      'A tournament predictor (e.g., Alpha 21264) maintains a choice table that selects between a global predictor and a local predictor based on which one has been more accurate recently for each branch.',
    points: 1,
  },
  {
    id: 'bp-6',
    type: 'short-answer',
    topic: 'branch-prediction',
    question:
      'What does BTB stand for in the context of branch prediction, and what does it store?',
    correctAnswer: 'Branch Target Buffer',
    acceptableAnswers: [
      'Branch Target Buffer',
      'branch target buffer',
      'BTB stores branch target addresses',
    ],
    explanation:
      'BTB stands for Branch Target Buffer. It is a cache that stores the target address of previously taken branches, indexed by the branch PC. This allows the processor to know where to fetch from if it predicts a branch as taken, without waiting for the branch to be decoded.',
    points: 2,
  },
  {
    id: 'bp-7',
    type: 'tf',
    topic: 'branch-prediction',
    question:
      'In a two-level local predictor, the first level stores a per-branch history of outcomes, while the second level is a set of pattern history tables indexed by that local history.',
    correctAnswer: 'True',
    explanation:
      'A two-level local predictor maintains a Branch History Table (BHT) indexed by PC that stores the local history of each branch (first level). The local history is then used to index into a Pattern History Table (PHT) containing 2-bit counters (second level).',
    points: 1,
  },
  {
    id: 'bp-8',
    type: 'mc',
    topic: 'branch-prediction',
    question:
      'A processor has a 10-cycle branch misprediction penalty. If the branch prediction accuracy is 95% and branches make up 20% of all instructions, what is the CPI contribution from branch mispredictions (assuming ideal CPI of 1)?',
    options: ['0.10', '0.05', '0.50', '1.10'],
    correctAnswer: '0.10',
    explanation:
      'CPI contribution from mispredictions = branch_frequency x mispredict_rate x penalty = 0.20 x 0.05 x 10 = 0.10. The total CPI would be 1 + 0.10 = 1.10.',
    points: 1,
  },
  {
    id: 'bp-9',
    type: 'mc',
    topic: 'branch-prediction',
    question:
      'Which of the following is a key advantage of gshare over a simple global two-level predictor?',
    options: [
      'It uses less hardware',
      'It reduces aliasing by XORing the GHR with the PC',
      'It eliminates all mispredictions',
      'It does not require a Pattern History Table',
    ],
    correctAnswer:
      'It reduces aliasing by XORing the GHR with the PC',
    explanation:
      'Gshare improves upon the basic global two-level predictor by XORing the Global History Register with the branch PC to index the PHT. This spreads entries more evenly across the PHT and reduces destructive aliasing where different branches map to the same counter.',
    points: 1,
  },
  {
    id: 'bp-10',
    type: 'short-answer',
    topic: 'branch-prediction',
    question:
      'A 2-bit counter starts at Strongly Taken (11). Process the sequence: N, N, T, N, N. How many mispredictions occur?',
    correctAnswer: '4',
    acceptableAnswers: ['4', 'four'],
    explanation:
      'State 11 (ST), predict T. Actual N -> mispredict (1), go to 10 (WT). State 10 (WT), predict T. Actual N -> mispredict (2), go to 01 (WNT). State 01 (WNT), predict NT. Actual T -> mispredict (3), go to 10 (WT). State 10 (WT), predict T. Actual N -> mispredict (4), go to 01 (WNT). State 01 (WNT), predict NT. Actual N -> correct, go to 00 (SNT). Total: 4 mispredictions out of 5.',
    points: 2,
  },
  {
    id: 'bp-11',
    type: 'mc',
    topic: 'branch-prediction',
    question:
      'The Alpha 21264 tournament predictor uses which combination?',
    options: [
      'A global gshare predictor and a bimodal predictor',
      'A global predictor and a local two-level predictor with a choice predictor',
      'Two gshare predictors with different history lengths',
      'A neural branch predictor and a 2-bit counter',
    ],
    correctAnswer:
      'A global predictor and a local two-level predictor with a choice predictor',
    explanation:
      'The Alpha 21264 uses a tournament predictor that combines a global predictor (using global history) and a local predictor (using per-branch history), with a choice predictor that selects between them based on which has been more accurate.',
    points: 1,
  },
  {
    id: 'bp-12',
    type: 'tf',
    topic: 'branch-prediction',
    question:
      'Static branch prediction (e.g., always predict not taken, or backward branches taken) requires no hardware state.',
    correctAnswer: 'True',
    explanation:
      'Static prediction strategies like "always not taken" or "backward taken, forward not taken" are fixed policies that do not depend on runtime history. They require minimal hardware -- just the ability to determine branch direction from the PC, not dynamic state like counters or history registers.',
    points: 1,
  },
  {
    id: 'bp-13',
    type: 'mc',
    topic: 'branch-prediction',
    question:
      'If a global two-level predictor uses an n-bit GHR, how many entries does its PHT have (assuming one PHT shared across all branches)?',
    options: ['n', '2n', '2^n', 'n^2'],
    correctAnswer: '2^n',
    explanation:
      'An n-bit GHR can represent 2^n distinct history patterns. Each pattern indexes a unique entry in the PHT, so the PHT has 2^n entries (each containing a 2-bit counter).',
    points: 1,
  },
  {
    id: 'bp-14',
    type: 'short-answer',
    topic: 'branch-prediction',
    question:
      'What is the term for the situation where two different branches map to the same entry in the Pattern History Table, causing interference?',
    correctAnswer: 'aliasing',
    acceptableAnswers: ['aliasing', 'destructive aliasing', 'destructive interference', 'collision', 'alias'],
    explanation:
      'Aliasing (also called destructive aliasing or interference) occurs when multiple branches map to the same PHT entry. Their histories interfere with each other, potentially reducing prediction accuracy. Gshare attempts to reduce aliasing by XORing the PC with the GHR.',
    points: 2,
  },
  {
    id: 'bp-15',
    type: 'mc',
    topic: 'branch-prediction',
    question:
      'Which of the following branch patterns would a 2-bit saturating counter handle better than a 1-bit predictor?',
    options: [
      'TNTNTNTN (perfectly alternating)',
      'TTTTTTTTN (mostly taken with rare not-taken)',
      'NNNNNNNN (always not taken)',
      'TNTTNTTN (irregular pattern)',
    ],
    correctAnswer: 'TTTTTTTTN (mostly taken with rare not-taken)',
    explanation:
      'The 2-bit counter excels when branches are mostly one direction with occasional anomalies. For TTTTTTTTN, the 2-bit counter stays in Strongly Taken and only mispredicts the N (and still predicts Taken on the next T). A 1-bit predictor would mispredict both the N and the following T, giving 2 mispredictions per period vs 1 for the 2-bit counter.',
    points: 1,
  },
];

// ─── Cache Design (15 questions) ────────────────────────────────────────────

const cache: QuizQuestion[] = [
  {
    id: 'cache-1',
    type: 'mc',
    topic: 'cache',
    question:
      'A system has L1 cache hit time = 1 cycle, L1 miss rate = 5%, L2 hit time = 10 cycles, L2 miss rate = 20% (local), and main memory access time = 100 cycles. What is the AMAT?',
    options: ['3.0 cycles', '3.5 cycles', '2.5 cycles', '6.0 cycles'],
    correctAnswer: '2.5 cycles',
    explanation:
      'AMAT = L1_hit_time + L1_miss_rate x (L2_hit_time + L2_miss_rate x Memory_time) = 1 + 0.05 x (10 + 0.20 x 100) = 1 + 0.05 x (10 + 20) = 1 + 0.05 x 30 = 1 + 1.5 = 2.5 cycles.',
    points: 1,
  },
  {
    id: 'cache-2',
    type: 'mc',
    topic: 'cache',
    question:
      'A cache has 256 KB capacity, 64-byte blocks, and is 4-way set associative. The system has 32-bit addresses. How many index bits are needed?',
    options: ['8', '10', '12', '6'],
    correctAnswer: '10',
    explanation:
      'Number of blocks = 256 KB / 64 B = 4096. Number of sets = 4096 / 4 = 1024. Index bits = log2(1024) = 10. Offset bits = log2(64) = 6. Tag bits = 32 - 10 - 6 = 16.',
    points: 1,
  },
  {
    id: 'cache-3',
    type: 'mc',
    topic: 'cache',
    question:
      'A program accesses the following byte addresses in sequence: 0, 128, 256, 0, 128, 256. The cache is direct-mapped, 256 bytes total, with 64-byte blocks. Which type of miss does the second access to address 0 exhibit?',
    options: [
      'Compulsory miss',
      'Capacity miss',
      'Conflict miss',
      'It is a cache hit',
    ],
    correctAnswer: 'Conflict miss',
    explanation:
      'The cache has 256/64 = 4 blocks (indices 0-3). Address 0 maps to set 0, address 128 maps to set 2, address 256 maps to set 0 (since 256/64 = 4, and 4 mod 4 = 0). So addresses 0 and 256 map to the same set. After accessing 0, 128, 256 (which evicts 0 from set 0), the second access to 0 is a conflict miss.',
    points: 1,
  },
  {
    id: 'cache-4',
    type: 'tf',
    topic: 'cache',
    question:
      'Compulsory misses can be eliminated by increasing cache associativity.',
    correctAnswer: 'False',
    explanation:
      'Compulsory (cold) misses occur on the first access to a block and cannot be avoided by any cache configuration change. Increasing associativity helps reduce conflict misses. Compulsory misses can only be reduced via prefetching.',
    points: 1,
  },
  {
    id: 'cache-5',
    type: 'short-answer',
    topic: 'cache',
    question:
      'What are the three Cs of cache misses?',
    correctAnswer: 'Compulsory, Capacity, Conflict',
    acceptableAnswers: [
      'Compulsory, Capacity, Conflict',
      'compulsory, capacity, conflict',
      'cold, capacity, conflict',
      'Compulsory Capacity Conflict',
    ],
    explanation:
      'The Three Cs model classifies all cache misses into: Compulsory (cold) misses that occur on first access to a block, Capacity misses that occur because the cache is too small to hold all needed blocks, and Conflict misses that occur because multiple blocks map to the same set in a set-associative or direct-mapped cache.',
    points: 2,
  },
  {
    id: 'cache-6',
    type: 'mc',
    topic: 'cache',
    question:
      'Which write policy updates the next level of the hierarchy only when a dirty block is evicted?',
    options: [
      'Write-through',
      'Write-back',
      'Write-allocate',
      'No-write-allocate',
    ],
    correctAnswer: 'Write-back',
    explanation:
      'Write-back caches only write modified (dirty) blocks to the next level when they are evicted. This reduces write traffic compared to write-through, which writes every store to the next level immediately.',
    points: 1,
  },
  {
    id: 'cache-7',
    type: 'mc',
    topic: 'cache',
    question:
      'A cache has 32-bit addresses, 128-byte blocks, and 8192 sets. How many tag bits are needed?',
    options: ['6', '12', '13', '19'],
    correctAnswer: '12',
    explanation:
      'Offset bits = log2(128) = 7. Index bits = log2(8192) = 13. Tag bits = 32 - 13 - 7 = 12.',
    points: 1,
  },
  {
    id: 'cache-8',
    type: 'tf',
    topic: 'cache',
    question:
      'A fully associative cache has zero conflict misses.',
    correctAnswer: 'True',
    explanation:
      'In a fully associative cache, any block can be placed in any cache line, so there is no mapping conflict. The only misses are compulsory and capacity misses.',
    points: 1,
  },
  {
    id: 'cache-9',
    type: 'mc',
    topic: 'cache',
    question:
      'What is the purpose of MSHRs (Miss Status Holding Registers) in a non-blocking cache?',
    options: [
      'To track pending cache misses so the cache can continue servicing other requests',
      'To store dirty blocks waiting to be written back',
      'To implement the LRU replacement policy',
      'To hold branch prediction state',
    ],
    correctAnswer:
      'To track pending cache misses so the cache can continue servicing other requests',
    explanation:
      'MSHRs track outstanding cache misses in a non-blocking (lockup-free) cache. Each MSHR records the address of a pending miss and the destination registers/loads waiting for that data. This allows the cache to handle multiple misses concurrently and continue servicing hits.',
    points: 1,
  },
  {
    id: 'cache-10',
    type: 'short-answer',
    topic: 'cache',
    question:
      'What does AMAT stand for?',
    correctAnswer: 'Average Memory Access Time',
    acceptableAnswers: [
      'Average Memory Access Time',
      'average memory access time',
    ],
    explanation:
      'AMAT = Average Memory Access Time. It is computed as: AMAT = Hit Time + Miss Rate x Miss Penalty. For multi-level caches, AMAT is computed recursively for each level.',
    points: 2,
  },
  {
    id: 'cache-11',
    type: 'mc',
    topic: 'cache',
    question:
      'Doubling the cache size primarily reduces which type of miss?',
    options: [
      'Compulsory misses',
      'Conflict misses',
      'Capacity misses',
      'All three equally',
    ],
    correctAnswer: 'Capacity misses',
    explanation:
      'Increasing cache size directly reduces capacity misses because the cache can hold more blocks before eviction. It does not reduce compulsory misses and may not help conflict misses unless associativity also changes.',
    points: 1,
  },
  {
    id: 'cache-12',
    type: 'mc',
    topic: 'cache',
    question:
      'In a write-allocate policy, what happens on a write miss?',
    options: [
      'The write is sent directly to the next level without loading the block',
      'The block is first loaded into the cache, then the write is performed',
      'The write is buffered and delayed until the block is accessed again',
      'The cache is flushed',
    ],
    correctAnswer:
      'The block is first loaded into the cache, then the write is performed',
    explanation:
      'Write-allocate (also called fetch-on-write) loads the missed block into the cache before performing the write. This is commonly paired with write-back. The alternative, no-write-allocate, sends the write directly to the next level without caching.',
    points: 1,
  },
  {
    id: 'cache-13',
    type: 'tf',
    topic: 'cache',
    question:
      'SRAM is faster but more expensive per bit than DRAM, which is why SRAM is used for caches and DRAM for main memory.',
    correctAnswer: 'True',
    explanation:
      'SRAM uses 6 transistors per bit and does not need refresh, making it fast but expensive. DRAM uses 1 transistor + 1 capacitor per bit, is denser and cheaper, but slower and requires periodic refresh. This cost-performance tradeoff drives the memory hierarchy design.',
    points: 1,
  },
  {
    id: 'cache-14',
    type: 'short-answer',
    topic: 'cache',
    question:
      'A 32 KB direct-mapped cache has 32-byte blocks. How many sets does it have?',
    correctAnswer: '1024',
    acceptableAnswers: ['1024', '1,024'],
    explanation:
      'Number of blocks = 32 KB / 32 B = 1024. Since it is direct-mapped (1-way associative), number of sets = number of blocks = 1024.',
    points: 2,
  },
  {
    id: 'cache-15',
    type: 'mc',
    topic: 'cache',
    question:
      'Which replacement policy is most commonly approximated in hardware for set-associative caches?',
    options: [
      'FIFO (First In First Out)',
      'Random',
      'LRU (Least Recently Used)',
      'Optimal (Belady\'s)',
    ],
    correctAnswer: 'LRU (Least Recently Used)',
    explanation:
      'LRU is the most commonly approximated replacement policy in hardware caches. True LRU is expensive for high associativity (requires tracking access order), so pseudo-LRU approximations are often used. Random is also used in some designs due to simplicity.',
    points: 1,
  },
];

// ─── Memory Systems (15 questions) ──────────────────────────────────────────

const memorySystems: QuizQuestion[] = [
  {
    id: 'mem-1',
    type: 'mc',
    topic: 'memory-systems',
    question:
      'In DRAM, a row buffer hit occurs when:',
    options: [
      'The requested row is already open in the row buffer',
      'The requested row is in a different bank',
      'The row buffer is empty and a new row must be activated',
      'The DRAM is being refreshed',
    ],
    correctAnswer:
      'The requested row is already open in the row buffer',
    explanation:
      'A row buffer hit occurs when the accessed address falls within the row that is already open (activated) in the sense amplifiers (row buffer) of the bank. This is the fastest access type since only a CAS (Column Access Strobe) is needed.',
    points: 1,
  },
  {
    id: 'mem-2',
    type: 'mc',
    topic: 'memory-systems',
    question:
      'Which DRAM access scenario has the highest latency?',
    options: [
      'Row buffer hit',
      'Row buffer miss (empty row buffer)',
      'Row buffer conflict (different row open)',
      'All have the same latency',
    ],
    correctAnswer: 'Row buffer conflict (different row open)',
    explanation:
      'A row buffer conflict requires: (1) precharging the currently open row (tRP), (2) activating the new row (tRCD), and (3) performing the column access (tCAS). This is more expensive than a row buffer miss (which skips the precharge) and much more than a hit (which only needs the CAS).',
    points: 1,
  },
  {
    id: 'mem-3',
    type: 'short-answer',
    topic: 'memory-systems',
    question:
      'What are the three main timing parameters for DRAM access? Give the standard abbreviations.',
    correctAnswer: 'tRCD, tCAS (tCL), tRP',
    acceptableAnswers: [
      'tRCD, tCAS, tRP',
      'tRCD tCAS tRP',
      'tRCD, tCL, tRP',
      'tRCD tCL tRP',
    ],
    explanation:
      'tRCD (Row to Column Delay): time to activate a row. tCAS/tCL (Column Access Strobe latency): time to read/write a column from an open row. tRP (Row Precharge): time to close/precharge an open row before activating a different one.',
    points: 2,
  },
  {
    id: 'mem-4',
    type: 'mc',
    topic: 'memory-systems',
    question:
      'For a row buffer conflict, the total access latency is approximately:',
    options: [
      'tCAS',
      'tRCD + tCAS',
      'tRP + tRCD + tCAS',
      'tRP + tCAS',
    ],
    correctAnswer: 'tRP + tRCD + tCAS',
    explanation:
      'A row buffer conflict requires precharging the current row (tRP), activating the new row (tRCD), and then performing the column access (tCAS). Total = tRP + tRCD + tCAS.',
    points: 1,
  },
  {
    id: 'mem-5',
    type: 'tf',
    topic: 'memory-systems',
    question:
      'FR-FCFS (First-Ready, First-Come First-Served) scheduling prioritizes row buffer hits over older requests to different rows.',
    correctAnswer: 'True',
    explanation:
      'FR-FCFS prioritizes requests that hit in the already-open row buffer (first-ready) over older requests that would require a row activation. Among requests of the same priority, it uses FCFS ordering. This improves throughput by exploiting row buffer locality.',
    points: 1,
  },
  {
    id: 'mem-6',
    type: 'mc',
    topic: 'memory-systems',
    question:
      'A DRAM system has 2 channels, 2 ranks per channel, 8 banks per rank, and 2^15 rows per bank. How many total rows are in the system?',
    options: [
      '2^15',
      '2^20',
      '2^21',
      '2^22',
    ],
    correctAnswer: '2^20',
    explanation:
      'Total rows = channels x ranks x banks x rows_per_bank = 2 x 2 x 8 x 2^15 = 32 x 2^15 = 2^5 x 2^15 = 2^20.',
    points: 1,
  },
  {
    id: 'mem-7',
    type: 'mc',
    topic: 'memory-systems',
    question:
      'Bank interleaving in DRAM is primarily used to:',
    options: [
      'Reduce the power consumption of DRAM',
      'Allow multiple concurrent accesses to different banks, hiding latency',
      'Increase the row buffer size',
      'Reduce the refresh rate',
    ],
    correctAnswer:
      'Allow multiple concurrent accesses to different banks, hiding latency',
    explanation:
      'Bank interleaving distributes consecutive addresses across different banks. Since banks operate independently, multiple accesses can proceed in parallel (pipelined), hiding the long DRAM latency and increasing effective bandwidth.',
    points: 1,
  },
  {
    id: 'mem-8',
    type: 'short-answer',
    topic: 'memory-systems',
    question:
      'What is the DRAM hierarchy from largest to smallest unit? (Channel, Rank, Chip, Bank, Row, Column)',
    correctAnswer: 'Channel, DIMM, Rank, Chip, Bank, Row, Column',
    acceptableAnswers: [
      'Channel, DIMM, Rank, Chip, Bank, Row, Column',
      'Channel, Rank, Chip, Bank, Row, Column',
      'channel, rank, chip, bank, row, column',
      'Channel > Rank > Chip > Bank > Row > Column',
    ],
    explanation:
      'The DRAM hierarchy from system to data: Channel (independent memory bus) -> DIMM (physical module) -> Rank (set of chips accessed together) -> Chip -> Bank (independent sub-array within chip) -> Row -> Column.',
    points: 2,
  },
  {
    id: 'mem-9',
    type: 'tf',
    topic: 'memory-systems',
    question:
      'DRAM requires periodic refresh because the capacitor charge leaks over time, which can cause data loss.',
    correctAnswer: 'True',
    explanation:
      'DRAM stores each bit as charge on a tiny capacitor. This charge leaks over time (typically within ~64ms), so each row must be periodically read and rewritten (refreshed) to prevent data loss. During refresh, the bank being refreshed is unavailable for normal accesses.',
    points: 1,
  },
  {
    id: 'mem-10',
    type: 'mc',
    topic: 'memory-systems',
    question:
      'What is a disadvantage of FR-FCFS scheduling?',
    options: [
      'It cannot exploit row buffer locality',
      'It may cause starvation of requests to non-open rows',
      'It requires more banks',
      'It increases refresh overhead',
    ],
    correctAnswer:
      'It may cause starvation of requests to non-open rows',
    explanation:
      'FR-FCFS prioritizes row buffer hits, which means requests to different rows may be continually deferred if there is a stream of hits to the currently open row. This can cause unfairness and starvation, particularly in multi-core systems where one thread monopolizes the row buffer.',
    points: 1,
  },
  {
    id: 'mem-11',
    type: 'mc',
    topic: 'memory-systems',
    question:
      'Distributed refresh spreads refresh operations over time. Compared to burst refresh, what is its main advantage?',
    options: [
      'It eliminates the need for refresh entirely',
      'It reduces the worst-case latency spike from refresh',
      'It uses less total energy for refresh',
      'It increases the row buffer hit rate',
    ],
    correctAnswer:
      'It reduces the worst-case latency spike from refresh',
    explanation:
      'Burst refresh refreshes all rows at once, causing a long unavailability period. Distributed refresh spreads these operations over the entire refresh interval, causing smaller but more frequent interruptions. This reduces the worst-case latency spike, which is important for real-time or latency-sensitive workloads.',
    points: 1,
  },
  {
    id: 'mem-12',
    type: 'mc',
    topic: 'memory-systems',
    question:
      'In DRAM address mapping, which mapping scheme typically provides the best bank-level parallelism for sequential accesses?',
    options: [
      'Row:Bank:Column (bank bits after row bits)',
      'Row:Column:Bank (bank bits as lowest-order bits after block offset)',
      'Bank:Row:Column (bank bits as highest-order bits)',
      'Column:Row:Bank',
    ],
    correctAnswer:
      'Row:Column:Bank (bank bits as lowest-order bits after block offset)',
    explanation:
      'Placing bank bits as the lowest-order address bits (just above the block offset) ensures that consecutive cache blocks map to different banks. This maximizes bank-level parallelism for sequential/streaming access patterns.',
    points: 1,
  },
  {
    id: 'mem-13',
    type: 'tf',
    topic: 'memory-systems',
    question:
      'All ranks on the same channel share the data bus, so only one rank can transfer data at a time on a given channel.',
    correctAnswer: 'True',
    explanation:
      'A DRAM channel has a single data bus shared among all ranks connected to it. While multiple banks (even across ranks) can have rows activated simultaneously, only one rank can drive data onto the channel bus at any given time.',
    points: 1,
  },
  {
    id: 'mem-14',
    type: 'short-answer',
    topic: 'memory-systems',
    question:
      'If tRCD = 13ns, tCAS = 13ns, and tRP = 13ns, what is the latency in nanoseconds for a row buffer conflict?',
    correctAnswer: '39',
    acceptableAnswers: ['39', '39ns', '39 ns'],
    explanation:
      'Row buffer conflict latency = tRP + tRCD + tCAS = 13 + 13 + 13 = 39 ns.',
    points: 2,
  },
  {
    id: 'mem-15',
    type: 'mc',
    topic: 'memory-systems',
    question:
      'Which scheduling policy simply serves DRAM requests in the order they arrive, regardless of row buffer state?',
    options: ['FR-FCFS', 'FCFS', 'ATLAS', 'Round-robin'],
    correctAnswer: 'FCFS',
    explanation:
      'FCFS (First-Come First-Served) processes requests strictly in arrival order. It is simple but misses opportunities to exploit row buffer locality. FR-FCFS improves upon this by prioritizing ready (row-buffer-hit) requests.',
    points: 1,
  },
];

// ─── New Memory Technologies (15 questions) ─────────────────────────────────

const newMemory: QuizQuestion[] = [
  {
    id: 'nm-1',
    type: 'mc',
    topic: 'new-memory',
    question:
      'Phase Change Memory (PCM) stores data by switching a material between which two states?',
    options: [
      'Charged and uncharged capacitor',
      'Amorphous (high resistance) and crystalline (low resistance)',
      'Magnetic north and south',
      'High voltage and low voltage',
    ],
    correctAnswer:
      'Amorphous (high resistance) and crystalline (low resistance)',
    explanation:
      'PCM uses a chalcogenide glass material (e.g., GST: Ge2Sb2Te5) that can be switched between an amorphous state (high resistance, representing one bit value) and a crystalline state (low resistance, representing the other) by applying heat via electrical current.',
    points: 1,
  },
  {
    id: 'nm-2',
    type: 'tf',
    topic: 'new-memory',
    question:
      'PCM is non-volatile, meaning it retains data when power is removed, unlike DRAM.',
    correctAnswer: 'True',
    explanation:
      'PCM is non-volatile because the material remains in its amorphous or crystalline state without power. DRAM is volatile because the capacitor charge leaks and requires refresh. This non-volatility is a key advantage of PCM for persistent storage.',
    points: 1,
  },
  {
    id: 'nm-3',
    type: 'mc',
    topic: 'new-memory',
    question:
      'Which is a major disadvantage of PCM compared to DRAM?',
    options: [
      'Higher read latency',
      'Limited write endurance (finite number of writes before wear-out)',
      'Requires periodic refresh',
      'Lower density',
    ],
    correctAnswer:
      'Limited write endurance (finite number of writes before wear-out)',
    explanation:
      'PCM cells degrade after repeated write (SET/RESET) operations -- typically 10^6 to 10^8 writes before failure. DRAM has essentially unlimited write endurance. This limited endurance requires wear leveling techniques in PCM-based systems.',
    points: 1,
  },
  {
    id: 'nm-4',
    type: 'mc',
    topic: 'new-memory',
    question:
      'In a hybrid DRAM + PCM memory system, which approach places frequently accessed (hot) pages in DRAM and infrequently accessed (cold) pages in PCM?',
    options: [
      'Wear leveling',
      'Row buffer management',
      'Page-level data allocation/migration',
      'Bank interleaving',
    ],
    correctAnswer: 'Page-level data allocation/migration',
    explanation:
      'Hybrid memory systems monitor page access patterns and migrate hot pages to DRAM (for lower latency) and cold pages to PCM (for higher capacity). This page-level data allocation and migration optimizes both performance and capacity.',
    points: 1,
  },
  {
    id: 'nm-5',
    type: 'short-answer',
    topic: 'new-memory',
    question:
      'What technique distributes writes evenly across PCM cells to extend the overall lifetime of the memory?',
    correctAnswer: 'wear leveling',
    acceptableAnswers: [
      'wear leveling',
      'Wear leveling',
      'wear-leveling',
      'Wear Leveling',
    ],
    explanation:
      'Wear leveling ensures that writes are spread across all PCM cells rather than concentrating on a few heavily-written locations. This extends the usable lifetime of the PCM device. Techniques include randomized address mapping and periodic page swapping.',
    points: 2,
  },
  {
    id: 'nm-6',
    type: 'tf',
    topic: 'new-memory',
    question:
      'PCM has higher density than DRAM because it does not require a capacitor per cell.',
    correctAnswer: 'True',
    explanation:
      'PCM cells are simpler (a resistive element and an access transistor or diode) and can potentially be stacked in 3D. This gives PCM higher density (more bits per unit area) compared to DRAM, which needs a capacitor and transistor per cell with strict aspect ratio requirements.',
    points: 1,
  },
  {
    id: 'nm-7',
    type: 'mc',
    topic: 'new-memory',
    question:
      'Which PCM operation typically requires more energy and takes longer?',
    options: [
      'Read',
      'RESET (amorphization -- writing to high resistance)',
      'SET (crystallization -- writing to low resistance)',
      'Read and Write take the same energy',
    ],
    correctAnswer:
      'SET (crystallization -- writing to low resistance)',
    explanation:
      'The SET operation (crystallization) requires heating the material to just above its crystallization temperature and maintaining it long enough for the atomic structure to reorganize. This takes longer than RESET (which uses a short, high-energy pulse to melt and quickly quench into amorphous state). Writes in general are slower and more energy-intensive than reads.',
    points: 1,
  },
  {
    id: 'nm-8',
    type: 'mc',
    topic: 'new-memory',
    question:
      'A key DRAM scaling challenge is:',
    options: [
      'Increasing transistor speed',
      'Maintaining capacitor charge with shrinking cell sizes (reducing capacitance)',
      'Reducing cache hit latency',
      'Increasing the number of pipeline stages',
    ],
    correctAnswer:
      'Maintaining capacitor charge with shrinking cell sizes (reducing capacitance)',
    explanation:
      'As DRAM cells shrink, the capacitor becomes smaller and holds less charge, making it harder to reliably sense the stored bit and increasing susceptibility to noise and disturbance (e.g., Rowhammer). Maintaining adequate capacitance is a fundamental DRAM scaling challenge.',
    points: 1,
  },
  {
    id: 'nm-9',
    type: 'short-answer',
    topic: 'new-memory',
    question:
      'PCM read latency is roughly how many times slower than DRAM read latency? (order of magnitude)',
    correctAnswer: '2-4x',
    acceptableAnswers: ['2x', '3x', '4x', '2-4x', '2-4', 'several times', 'a few times'],
    explanation:
      'PCM read latency is typically 2-4x slower than DRAM. While DRAM reads take ~50-60ns, PCM reads take ~100-200ns. This is a relatively modest difference compared to the much larger write latency gap (PCM writes can be 5-10x slower than DRAM writes).',
    points: 2,
  },
  {
    id: 'nm-10',
    type: 'tf',
    topic: 'new-memory',
    question:
      'PCM does not require refresh operations, unlike DRAM.',
    correctAnswer: 'True',
    explanation:
      'Since PCM is non-volatile and stores data as a physical material state (not as charge on a capacitor), it does not require periodic refresh. This eliminates the performance and energy overhead of DRAM refresh, which becomes more significant as DRAM capacity scales.',
    points: 1,
  },
  {
    id: 'nm-11',
    type: 'mc',
    topic: 'new-memory',
    question:
      'In a hybrid memory system, what is the main role of the DRAM component?',
    options: [
      'To serve as persistent storage',
      'To act as a large-capacity main memory',
      'To act as a fast buffer/cache for hot data in front of PCM',
      'To replace the L2 cache',
    ],
    correctAnswer:
      'To act as a fast buffer/cache for hot data in front of PCM',
    explanation:
      'In a hybrid DRAM+PCM system, DRAM serves as a fast tier for frequently accessed (hot) data, while PCM provides large capacity at lower cost. The DRAM acts like a cache or buffer for the PCM, combining the speed of DRAM with the density and non-volatility of PCM.',
    points: 1,
  },
  {
    id: 'nm-12',
    type: 'mc',
    topic: 'new-memory',
    question:
      'Which statement about PCM write endurance is correct?',
    options: [
      'PCM has infinite write endurance like SRAM',
      'PCM typically endures 10^6 to 10^8 writes per cell',
      'PCM endures fewer writes than flash memory',
      'PCM write endurance is not a concern',
    ],
    correctAnswer:
      'PCM typically endures 10^6 to 10^8 writes per cell',
    explanation:
      'PCM cells can typically sustain 10^6 to 10^8 write cycles before failure, which is better than NAND flash (10^3 to 10^5) but much less than DRAM (practically unlimited). This motivates wear-leveling techniques.',
    points: 1,
  },
  {
    id: 'nm-13',
    type: 'mc',
    topic: 'new-memory',
    question:
      'Which is NOT an advantage of PCM over DRAM?',
    options: [
      'Non-volatility',
      'Higher density',
      'No refresh needed',
      'Faster write speed',
    ],
    correctAnswer: 'Faster write speed',
    explanation:
      'PCM writes are significantly slower than DRAM writes (5-10x). PCM advantages include non-volatility, higher density, no refresh requirement, and better scaling potential. Write speed and write endurance are PCM disadvantages.',
    points: 1,
  },
  {
    id: 'nm-14',
    type: 'short-answer',
    topic: 'new-memory',
    question:
      'What material is commonly used in PCM cells? (Give the common abbreviation or full name)',
    correctAnswer: 'GST',
    acceptableAnswers: [
      'GST',
      'Ge2Sb2Te5',
      'germanium antimony telluride',
      'chalcogenide',
    ],
    explanation:
      'GST (Ge2Sb2Te5, germanium-antimony-telluride) is the most commonly used chalcogenide glass material in PCM. It can be reversibly switched between amorphous and crystalline phases through controlled heating.',
    points: 2,
  },
  {
    id: 'nm-15',
    type: 'tf',
    topic: 'new-memory',
    question:
      'In a hybrid DRAM+PCM system, migrating a cold page from DRAM to PCM frees DRAM capacity for hot pages and may improve overall performance.',
    correctAnswer: 'True',
    explanation:
      'Moving cold (infrequently accessed) pages from DRAM to PCM frees DRAM space for hot pages that benefit more from DRAM speed. This data tiering approach optimizes the use of limited DRAM capacity while leveraging PCM for large-capacity storage.',
    points: 1,
  },
];

// ─── Hardware Security (15 questions) ───────────────────────────────────────

const hardwareSecurity: QuizQuestion[] = [
  {
    id: 'sec-1',
    type: 'mc',
    topic: 'hardware-security',
    question:
      'Rowhammer is a DRAM vulnerability where:',
    options: [
      'An attacker reads data directly from another process\'s memory',
      'Repeatedly activating a DRAM row causes bit flips in adjacent rows',
      'Cache timing reveals secret encryption keys',
      'Branch predictor state is leaked through speculative execution',
    ],
    correctAnswer:
      'Repeatedly activating a DRAM row causes bit flips in adjacent rows',
    explanation:
      'Rowhammer exploits the physical proximity of DRAM rows. Rapidly activating (hammering) a row causes electromagnetic interference that can flip bits in adjacent rows. This can be exploited to gain unauthorized memory access or escalate privileges.',
    points: 1,
  },
  {
    id: 'sec-2',
    type: 'mc',
    topic: 'hardware-security',
    question:
      'In a Flush+Reload cache side-channel attack, the attacker:',
    options: [
      'Fills the cache with their own data, then checks which lines were evicted',
      'Flushes a shared memory line from cache, waits for the victim, then measures reload time',
      'Overflows a buffer to inject malicious code',
      'Manipulates the branch predictor to cause speculative reads',
    ],
    correctAnswer:
      'Flushes a shared memory line from cache, waits for the victim, then measures reload time',
    explanation:
      'Flush+Reload requires shared memory (e.g., shared libraries). The attacker (1) flushes a specific cache line (clflush), (2) waits for the victim to execute, (3) reloads the line and measures time. A fast reload means the victim accessed that line (cache hit); slow means they did not.',
    points: 1,
  },
  {
    id: 'sec-3',
    type: 'mc',
    topic: 'hardware-security',
    question:
      'In a Prime+Probe attack, which step allows the attacker to determine which cache sets the victim accessed?',
    options: [
      'Prime: filling the cache with attacker data',
      'Probe: measuring access time to the attacker\'s previously cached data',
      'Flushing the victim\'s cache lines',
      'Executing a speculative load',
    ],
    correctAnswer:
      'Probe: measuring access time to the attacker\'s previously cached data',
    explanation:
      'In the Probe step, the attacker re-accesses their own data. If the victim accessed a line in the same cache set, the attacker\'s line was evicted, and the re-access is slow (cache miss). If the line is still there (fast access), the victim did not use that set. This timing difference reveals the victim\'s access pattern.',
    points: 1,
  },
  {
    id: 'sec-4',
    type: 'tf',
    topic: 'hardware-security',
    question:
      'Spectre attacks exploit speculative execution to read data that should not be accessible to the attacker.',
    correctAnswer: 'True',
    explanation:
      'Spectre tricks the CPU into speculatively executing instructions that access secret data. Although the speculative results are architecturally discarded on a misprediction, the microarchitectural side effects (e.g., cache state changes) persist and can be observed by the attacker through timing.',
    points: 1,
  },
  {
    id: 'sec-5',
    type: 'short-answer',
    topic: 'hardware-security',
    question:
      'What is a side-channel attack?',
    correctAnswer:
      'An attack that extracts information through indirect physical or microarchitectural observations rather than exploiting a software bug',
    acceptableAnswers: [
      'attack that uses indirect observations',
      'exploits physical implementation rather than algorithmic weakness',
      'extracts information through timing or other physical measurements',
      'attack using timing, power, or other physical side effects',
    ],
    explanation:
      'A side-channel attack extracts secret information by observing physical implementation artifacts such as timing, power consumption, electromagnetic emanations, or microarchitectural state (cache, branch predictor, memory access patterns) rather than exploiting logical software vulnerabilities.',
    points: 2,
  },
  {
    id: 'sec-6',
    type: 'mc',
    topic: 'hardware-security',
    question:
      'Which defense mechanism against Rowhammer refreshes neighboring rows when a row is activated frequently?',
    options: [
      'Cache partitioning',
      'Targeted Row Refresh (TRR)',
      'Address Space Layout Randomization (ASLR)',
      'Branch prediction flushing',
    ],
    correctAnswer: 'Targeted Row Refresh (TRR)',
    explanation:
      'Targeted Row Refresh (TRR) is a DRAM-level defense that detects frequently activated (hammered) rows and proactively refreshes their adjacent rows to prevent bit flips. However, TRR implementations have been shown to be bypassable by sophisticated hammering patterns.',
    points: 1,
  },
  {
    id: 'sec-7',
    type: 'mc',
    topic: 'hardware-security',
    question:
      'Meltdown differs from Spectre primarily because:',
    options: [
      'Meltdown exploits out-of-order execution to read kernel memory from user space, while Spectre exploits branch prediction to leak data across security boundaries',
      'Meltdown targets cache and Spectre targets DRAM',
      'Meltdown is a software bug and Spectre is a hardware bug',
      'Meltdown affects only Intel CPUs while Spectre affects only AMD',
    ],
    correctAnswer:
      'Meltdown exploits out-of-order execution to read kernel memory from user space, while Spectre exploits branch prediction to leak data across security boundaries',
    explanation:
      'Meltdown exploits a race condition in out-of-order execution where a user-space instruction can transiently read kernel memory before the permission check completes. Spectre exploits branch misprediction to execute gadgets that leak data through cache side channels. Meltdown is fixed by KPTI (kernel page table isolation); Spectre is harder to fully mitigate.',
    points: 1,
  },
  {
    id: 'sec-8',
    type: 'tf',
    topic: 'hardware-security',
    question:
      'Flush+Reload requires the attacker and victim to share physical memory (e.g., shared library pages).',
    correctAnswer: 'True',
    explanation:
      'Flush+Reload relies on shared memory because the attacker needs to flush specific cache lines that the victim may access. This is possible with shared libraries, memory-mapped files, or deduplication. Without shared memory, the attacker cannot target specific victim addresses, and Prime+Probe would be needed instead.',
    points: 1,
  },
  {
    id: 'sec-9',
    type: 'mc',
    topic: 'hardware-security',
    question:
      'The DRAMA attack demonstrates that DRAM row buffer state can be used as a side channel. What does it exploit?',
    options: [
      'Timing difference between cache hits and misses',
      'Timing difference between row buffer hits and conflicts in DRAM',
      'Power consumption differences during encryption',
      'Branch predictor state leakage',
    ],
    correctAnswer:
      'Timing difference between row buffer hits and conflicts in DRAM',
    explanation:
      'DRAMA exploits the timing difference between DRAM row buffer hits (fast, ~column access time) and row buffer conflicts (slow, requires precharge + activate + CAS). By measuring memory access times, an attacker can determine which DRAM row the victim is accessing, leaking information about memory access patterns.',
    points: 1,
  },
  {
    id: 'sec-10',
    type: 'short-answer',
    topic: 'hardware-security',
    question:
      'What kernel-level defense was deployed to mitigate Meltdown?',
    correctAnswer: 'KPTI',
    acceptableAnswers: [
      'KPTI',
      'Kernel Page Table Isolation',
      'kernel page table isolation',
      'KAISER',
    ],
    explanation:
      'KPTI (Kernel Page Table Isolation), also known as KAISER, unmaps kernel memory from user-space page tables. This prevents Meltdown because even speculative accesses cannot translate kernel virtual addresses when running in user mode, since those mappings no longer exist in the user page tables.',
    points: 2,
  },
  {
    id: 'sec-11',
    type: 'mc',
    topic: 'hardware-security',
    question:
      'Which Spectre variant exploits the branch direction predictor (conditional branch misprediction)?',
    options: [
      'Spectre v1 (Bounds Check Bypass)',
      'Spectre v2 (Branch Target Injection)',
      'Meltdown (Rogue Data Cache Load)',
      'Rowhammer',
    ],
    correctAnswer: 'Spectre v1 (Bounds Check Bypass)',
    explanation:
      'Spectre v1 exploits conditional branch misprediction. The attacker mistrains the branch predictor so that a bounds check is speculatively bypassed, allowing out-of-bounds speculative reads. Spectre v2 exploits indirect branch target prediction (BTB poisoning).',
    points: 1,
  },
  {
    id: 'sec-12',
    type: 'tf',
    topic: 'hardware-security',
    question:
      'Prime+Probe does not require shared memory between the attacker and victim, unlike Flush+Reload.',
    correctAnswer: 'True',
    explanation:
      'Prime+Probe works by filling cache sets with attacker data and later checking if victim activity evicted any of it. The attacker only needs to share the cache hardware, not any memory pages. This makes it applicable even without shared libraries or memory deduplication.',
    points: 1,
  },
  {
    id: 'sec-13',
    type: 'mc',
    topic: 'hardware-security',
    question:
      'Which of the following is NOT a microarchitectural side channel?',
    options: [
      'Cache timing',
      'Branch predictor state',
      'DRAM row buffer state',
      'SQL injection',
    ],
    correctAnswer: 'SQL injection',
    explanation:
      'SQL injection is a software-level attack that exploits improperly sanitized input, not a microarchitectural side channel. Cache timing, branch predictor state, and DRAM row buffer state are all microarchitectural side channels that leak information through timing differences.',
    points: 1,
  },
  {
    id: 'sec-14',
    type: 'short-answer',
    topic: 'hardware-security',
    question:
      'In Rowhammer, what is the name of the row being repeatedly activated (hammered)?',
    correctAnswer: 'aggressor row',
    acceptableAnswers: ['aggressor row', 'aggressor', 'hammer row'],
    explanation:
      'The row being repeatedly activated is called the aggressor row. The neighboring rows that suffer bit flips are called victim rows. Double-sided Rowhammer hammers rows on both sides of the victim for maximum effect.',
    points: 2,
  },
  {
    id: 'sec-15',
    type: 'mc',
    topic: 'hardware-security',
    question:
      'Why does increasing DRAM density make Rowhammer worse?',
    options: [
      'Higher density means faster refresh rates',
      'Smaller cells are closer together, increasing electromagnetic interference between rows',
      'Higher density reduces the number of banks',
      'Higher density eliminates the row buffer',
    ],
    correctAnswer:
      'Smaller cells are closer together, increasing electromagnetic interference between rows',
    explanation:
      'As DRAM technology shrinks, cells are packed closer together and hold less charge. This increases the electromagnetic coupling between adjacent rows, making cells more susceptible to disturbance from repeated activations of neighboring rows. Newer DRAM generations are increasingly vulnerable to Rowhammer.',
    points: 1,
  },
];

// ─── Fundamentals (10 questions) ────────────────────────────────────────────

const fundamentals: QuizQuestion[] = [
  {
    id: 'fund-1',
    type: 'mc',
    topic: 'fundamentals',
    question:
      'In the Von Neumann model, which component is responsible for fetching, decoding, and executing instructions?',
    options: [
      'Memory',
      'Control unit',
      'ALU',
      'I/O subsystem',
    ],
    correctAnswer: 'Control unit',
    explanation:
      'The control unit orchestrates the fetch-decode-execute cycle. It fetches instructions from memory using the PC, decodes them, and coordinates the ALU and other components to execute them.',
    points: 1,
  },
  {
    id: 'fund-2',
    type: 'tf',
    topic: 'fundamentals',
    question:
      'In the Von Neumann model, instructions and data share the same memory space.',
    correctAnswer: 'True',
    explanation:
      'A key characteristic of the Von Neumann architecture is the stored program concept: both instructions and data reside in the same memory. This contrasts with the Harvard architecture, which has separate instruction and data memories.',
    points: 1,
  },
  {
    id: 'fund-3',
    type: 'mc',
    topic: 'fundamentals',
    question:
      'In a dataflow execution model, an instruction executes when:',
    options: [
      'It is the next instruction in program order',
      'The program counter points to it',
      'All of its input operands are available',
      'The control unit signals it',
    ],
    correctAnswer: 'All of its input operands are available',
    explanation:
      'In dataflow computing, instructions fire (execute) when all their input operands are available, regardless of program order. This enables maximum parallelism but makes sequential programming constructs harder to implement.',
    points: 1,
  },
  {
    id: 'fund-4',
    type: 'short-answer',
    topic: 'fundamentals',
    question:
      'What is the Von Neumann bottleneck?',
    correctAnswer:
      'The shared bus between CPU and memory limits throughput',
    acceptableAnswers: [
      'shared bus between CPU and memory',
      'memory bandwidth bottleneck',
      'instruction and data share same memory bus',
      'single bus between processor and memory limits bandwidth',
    ],
    explanation:
      'The Von Neumann bottleneck refers to the limited throughput between the CPU and memory due to the shared bus. Since instructions and data share the same memory and bus, the data transfer rate between CPU and memory becomes the performance bottleneck.',
    points: 2,
  },
  {
    id: 'fund-5',
    type: 'mc',
    topic: 'fundamentals',
    question:
      'What distinguishes a microarchitecture from an ISA?',
    options: [
      'The microarchitecture defines the programmer-visible state; the ISA defines the hardware implementation',
      'The ISA defines the programmer-visible interface; the microarchitecture defines the hardware implementation',
      'They are the same thing',
      'The microarchitecture is software; the ISA is hardware',
    ],
    correctAnswer:
      'The ISA defines the programmer-visible interface; the microarchitecture defines the hardware implementation',
    explanation:
      'The ISA (Instruction Set Architecture) is the contract between hardware and software: it defines registers, instructions, addressing modes, etc. The microarchitecture is the specific hardware implementation of that ISA (pipeline depth, cache sizes, branch predictor design, etc.). Multiple microarchitectures can implement the same ISA.',
    points: 1,
  },
  {
    id: 'fund-6',
    type: 'tf',
    topic: 'fundamentals',
    question:
      'A dataflow graph has no sequential program counter. Instructions are scheduled based on data availability.',
    correctAnswer: 'True',
    explanation:
      'In dataflow, there is no program counter directing execution order. Instead, instructions are organized as a graph where edges represent data dependencies. An instruction executes as soon as all its input tokens (operands) arrive.',
    points: 1,
  },
  {
    id: 'fund-7',
    type: 'mc',
    topic: 'fundamentals',
    question:
      'Which is a disadvantage of the dataflow execution model?',
    options: [
      'Cannot exploit instruction-level parallelism',
      'Difficulty handling sequential memory operations and achieving precise exceptions',
      'Requires a program counter',
      'Cannot handle arithmetic operations',
    ],
    correctAnswer:
      'Difficulty handling sequential memory operations and achieving precise exceptions',
    explanation:
      'Dataflow execution makes it hard to enforce memory ordering (loads/stores to the same address must be ordered correctly) and to provide precise exceptions (knowing exactly which instruction faulted). The lack of sequential semantics complicates debugging and memory consistency.',
    points: 1,
  },
  {
    id: 'fund-8',
    type: 'short-answer',
    topic: 'fundamentals',
    question:
      'Name the five classic components of the Von Neumann model.',
    correctAnswer: 'Input, Output, Memory, ALU (Datapath), Control Unit',
    acceptableAnswers: [
      'Input, Output, Memory, ALU, Control',
      'input, output, memory, datapath, control',
      'Input Output Memory ALU Control Unit',
      'I/O, Memory, ALU, Control',
    ],
    explanation:
      'The five components are: (1) Input, (2) Output, (3) Memory (stores instructions and data), (4) Datapath/ALU (performs computations), and (5) Control Unit (orchestrates the fetch-decode-execute cycle).',
    points: 2,
  },
  {
    id: 'fund-9',
    type: 'mc',
    topic: 'fundamentals',
    question:
      'The "stored program" concept means:',
    options: [
      'Programs are stored on disk',
      'Programs are hardwired into the processor',
      'Instructions are stored in memory and can be treated as data',
      'Programs cannot be modified at runtime',
    ],
    correctAnswer:
      'Instructions are stored in memory and can be treated as data',
    explanation:
      'The stored program concept (fundamental to Von Neumann architecture) means instructions reside in main memory alongside data. This enables self-modifying code, compilers, and the general-purpose nature of modern computers.',
    points: 1,
  },
  {
    id: 'fund-10',
    type: 'tf',
    topic: 'fundamentals',
    question:
      'Modern out-of-order processors combine ideas from both Von Neumann (sequential semantics) and dataflow (out-of-order execution based on data availability).',
    correctAnswer: 'True',
    explanation:
      'Modern processors maintain the Von Neumann sequential programming model (in-order fetch, in-order commit) while using dataflow principles internally (instructions execute out-of-order as soon as operands are ready). This gives programmers sequential semantics while the hardware extracts parallelism.',
    points: 1,
  },
];

// ─── ISA (10 questions) ─────────────────────────────────────────────────────

const isa: QuizQuestion[] = [
  {
    id: 'isa-1',
    type: 'mc',
    topic: 'isa',
    question:
      'Which addressing mode calculates the effective address as: EA = Register + Offset?',
    options: [
      'Register direct',
      'Immediate',
      'Base + displacement (register indirect with offset)',
      'PC-relative',
    ],
    correctAnswer: 'Base + displacement (register indirect with offset)',
    explanation:
      'Base + displacement addressing computes the effective address by adding a constant offset (displacement) to the contents of a base register. This is the most common addressing mode in RISC ISAs for load/store instructions (e.g., lw $t0, 8($sp)).',
    points: 1,
  },
  {
    id: 'isa-2',
    type: 'mc',
    topic: 'isa',
    question:
      'Which ISA philosophy uses fixed-length instructions, a load/store architecture, and a large register file?',
    options: ['CISC', 'RISC', 'VLIW', 'Dataflow'],
    correctAnswer: 'RISC',
    explanation:
      'RISC (Reduced Instruction Set Computer) uses fixed-length instructions for simple decode, only loads and stores access memory (all ALU operations use registers), and typically has a large uniform register file (e.g., 32 registers).',
    points: 1,
  },
  {
    id: 'isa-3',
    type: 'tf',
    topic: 'isa',
    question:
      'CISC ISAs like x86 use variable-length instructions, which makes pipelining more complex.',
    correctAnswer: 'True',
    explanation:
      'Variable-length instructions mean the processor cannot know where the next instruction starts until the current one is decoded. This complicates fetch and decode stages. RISC ISAs use fixed-length instructions to simplify pipelining.',
    points: 1,
  },
  {
    id: 'isa-4',
    type: 'mc',
    topic: 'isa',
    question:
      'A 0-address (stack) machine performs "ADD" by:',
    options: [
      'Adding two specified registers',
      'Popping two operands from the stack, adding them, and pushing the result',
      'Adding an immediate to a register',
      'Adding the contents of two memory addresses',
    ],
    correctAnswer:
      'Popping two operands from the stack, adding them, and pushing the result',
    explanation:
      'In a 0-address (stack) machine, operands are implicitly on top of the stack. ADD pops the top two values, adds them, and pushes the result. No explicit operand addresses are needed in the instruction.',
    points: 1,
  },
  {
    id: 'isa-5',
    type: 'short-answer',
    topic: 'isa',
    question:
      'What does CISC stand for?',
    correctAnswer: 'Complex Instruction Set Computer',
    acceptableAnswers: [
      'Complex Instruction Set Computer',
      'complex instruction set computer',
    ],
    explanation:
      'CISC = Complex Instruction Set Computer. CISC ISAs (e.g., x86, VAX) feature variable-length instructions, many addressing modes, and complex instructions that may perform multiple operations (e.g., memory-to-memory operations, string operations).',
    points: 2,
  },
  {
    id: 'isa-6',
    type: 'mc',
    topic: 'isa',
    question:
      'In a load/store architecture, which operations can access memory?',
    options: [
      'All arithmetic operations',
      'Only load and store instructions',
      'Only branch instructions',
      'Any instruction can access memory',
    ],
    correctAnswer: 'Only load and store instructions',
    explanation:
      'In a load/store architecture (typical of RISC), only dedicated load and store instructions access memory. All computational instructions operate on registers. This simplifies the pipeline and timing since memory accesses are isolated to specific instruction types.',
    points: 1,
  },
  {
    id: 'isa-7',
    type: 'tf',
    topic: 'isa',
    question:
      'A 3-address instruction format specifies two source operands and one destination (e.g., ADD R1, R2, R3).',
    correctAnswer: 'True',
    explanation:
      'A 3-address instruction explicitly specifies all three operands: typically two sources and one destination. Example: ADD R1, R2, R3 means R1 = R2 + R3. This is the most common format in RISC ISAs.',
    points: 1,
  },
  {
    id: 'isa-8',
    type: 'mc',
    topic: 'isa',
    question:
      'Which is an advantage of uniform (fixed-length) instruction encoding?',
    options: [
      'Better code density',
      'Simpler and faster instruction decode',
      'More addressing modes',
      'Smaller instruction memory',
    ],
    correctAnswer: 'Simpler and faster instruction decode',
    explanation:
      'Fixed-length encoding means every instruction is the same size (e.g., 32 bits for MIPS). The processor knows exactly where the opcode and operand fields are, enabling simple, fast, single-cycle decode. The downside is potentially lower code density.',
    points: 1,
  },
  {
    id: 'isa-9',
    type: 'short-answer',
    topic: 'isa',
    question:
      'Name two examples of CISC ISAs.',
    correctAnswer: 'x86, VAX',
    acceptableAnswers: [
      'x86, VAX',
      'x86 and VAX',
      'Intel x86, DEC VAX',
      'x86, IBM System/360',
      'x86 and IBM 360',
    ],
    explanation:
      'Common CISC ISAs include x86 (Intel/AMD, the dominant desktop/server ISA), VAX (DEC, a classic CISC design studied in architecture courses), and IBM System/360. These feature variable-length instructions and complex addressing modes.',
    points: 2,
  },
  {
    id: 'isa-10',
    type: 'mc',
    topic: 'isa',
    question:
      'PC-relative addressing is most commonly used for:',
    options: [
      'Array indexing',
      'Stack operations',
      'Branch target calculations',
      'Register-to-register moves',
    ],
    correctAnswer: 'Branch target calculations',
    explanation:
      'PC-relative addressing computes the target address by adding an offset to the current program counter. This is the standard way to encode branch/jump targets because it makes code position-independent and offsets are typically small.',
    points: 1,
  },
];

// ─── Pipelining (10 questions) ──────────────────────────────────────────────

const pipelining: QuizQuestion[] = [
  {
    id: 'pipe-1',
    type: 'mc',
    topic: 'pipelining',
    question:
      'In a 5-stage MIPS pipeline (IF/ID/EX/MEM/WB), a RAW (Read After Write) data hazard occurs when:',
    options: [
      'An instruction tries to read a register before a prior instruction has written it',
      'Two instructions write the same register',
      'An instruction reads a register after it has been written',
      'A branch target is unknown at decode time',
    ],
    correctAnswer:
      'An instruction tries to read a register before a prior instruction has written it',
    explanation:
      'A RAW hazard occurs when an instruction needs to read a register value that has not yet been written by a preceding instruction. For example, ADD R1,R2,R3 followed by SUB R4,R1,R5 has a RAW hazard on R1.',
    points: 1,
  },
  {
    id: 'pipe-2',
    type: 'mc',
    topic: 'pipelining',
    question:
      'Data forwarding (bypassing) from the EX/MEM pipeline register can eliminate a stall when:',
    options: [
      'The producing instruction is a load (data not available until end of MEM)',
      'The producing instruction is an ALU operation (result available after EX)',
      'The consumer instruction is a store',
      'There are no data dependencies',
    ],
    correctAnswer:
      'The producing instruction is an ALU operation (result available after EX)',
    explanation:
      'For ALU instructions, the result is computed at the end of the EX stage and can be forwarded from the EX/MEM register to the EX input of the next instruction, avoiding a stall. Load instructions produce their result at the end of MEM, so EX-to-EX forwarding does not help -- a load-use hazard still requires at least one stall cycle.',
    points: 1,
  },
  {
    id: 'pipe-3',
    type: 'tf',
    topic: 'pipelining',
    question:
      'A load followed immediately by an instruction that uses the loaded value always requires at least one stall cycle, even with full forwarding.',
    correctAnswer: 'True',
    explanation:
      'This is the load-use hazard. The load produces data at the end of the MEM stage, but the dependent instruction needs it at the beginning of its EX stage (one cycle earlier). Even with forwarding from MEM/WB to EX, there is a 1-cycle gap that requires a stall (bubble).',
    points: 1,
  },
  {
    id: 'pipe-4',
    type: 'mc',
    topic: 'pipelining',
    question:
      'The ideal speedup of an N-stage pipeline over a single-cycle implementation is:',
    options: ['N', 'N^2', 'log(N)', '2N'],
    correctAnswer: 'N',
    explanation:
      'In the ideal case (no hazards, equal stage delays), an N-stage pipeline achieves throughput N times that of a single-cycle machine. CPI approaches 1, and clock period is 1/N of the single-cycle time, giving speedup of N.',
    points: 1,
  },
  {
    id: 'pipe-5',
    type: 'short-answer',
    topic: 'pipelining',
    question:
      'What are the three types of data dependencies?',
    correctAnswer: 'RAW, WAR, WAW',
    acceptableAnswers: [
      'RAW, WAR, WAW',
      'RAW WAR WAW',
      'Read After Write, Write After Read, Write After Write',
    ],
    explanation:
      'RAW (Read After Write) is a true dependency. WAR (Write After Read) is an anti-dependency. WAW (Write After Write) is an output dependency. In a simple 5-stage in-order pipeline, only RAW hazards cause stalls; WAR and WAW do not occur because reads happen before writes in the pipeline.',
    points: 2,
  },
  {
    id: 'pipe-6',
    type: 'mc',
    topic: 'pipelining',
    question:
      'Consider the following MIPS instructions in a 5-stage pipeline with full forwarding:\n1: LW R1, 0(R2)\n2: ADD R3, R1, R4\n3: SUB R5, R3, R6\nHow many stall cycles are inserted?',
    options: ['0', '1', '2', '3'],
    correctAnswer: '1',
    explanation:
      'Instruction 2 (ADD) uses R1, which is loaded by instruction 1 (LW). This is a load-use hazard requiring 1 stall. After the stall, the LW result is forwarded from MEM/WB to the ADD in EX. The ADD result can then be forwarded to SUB with no additional stall. Total: 1 stall.',
    points: 1,
  },
  {
    id: 'pipe-7',
    type: 'tf',
    topic: 'pipelining',
    question:
      'In a 5-stage pipeline, a WAR (Write After Read) hazard can cause a stall.',
    correctAnswer: 'False',
    explanation:
      'In a simple in-order 5-stage pipeline, reads happen in ID (stage 2) and writes happen in WB (stage 5). Since a later instruction reads before it writes, and earlier instructions write after they read, WAR hazards cannot occur. WAR hazards are only a concern in out-of-order execution.',
    points: 1,
  },
  {
    id: 'pipe-8',
    type: 'mc',
    topic: 'pipelining',
    question:
      'What is the pipeline throughput formula (instructions per cycle) for a pipeline with CPI = 1 + stall_cycles_per_instruction?',
    options: [
      '1 / (1 + stall_cycles_per_instruction)',
      '1 + stall_cycles_per_instruction',
      'N / (1 + stall_cycles_per_instruction)',
      'stall_cycles_per_instruction / N',
    ],
    correctAnswer: '1 / (1 + stall_cycles_per_instruction)',
    explanation:
      'Pipeline throughput (IPC) = 1 / CPI = 1 / (1 + stalls_per_instruction). With 0 stalls, throughput is 1 instruction/cycle (ideal). Stalls reduce throughput below the ideal.',
    points: 1,
  },
  {
    id: 'pipe-9',
    type: 'short-answer',
    topic: 'pipelining',
    question:
      'What is a pipeline bubble (or NOP)?',
    correctAnswer:
      'An empty cycle inserted into the pipeline to resolve a hazard',
    acceptableAnswers: [
      'empty cycle',
      'stall cycle',
      'no-op inserted to resolve hazard',
      'wasted cycle in pipeline due to stall',
      'a pipeline stage that does no useful work',
    ],
    explanation:
      'A pipeline bubble (or stall/NOP) is an empty slot inserted into the pipeline when a hazard prevents the next instruction from proceeding. The bubble propagates through the pipeline doing no useful work, effectively wasting a cycle of throughput.',
    points: 2,
  },
  {
    id: 'pipe-10',
    type: 'mc',
    topic: 'pipelining',
    question:
      'Which pipeline stage typically determines the branch outcome in a simple MIPS pipeline (without branch prediction)?',
    options: ['IF', 'ID', 'EX', 'MEM'],
    correctAnswer: 'ID',
    explanation:
      'In the classic MIPS pipeline with branch resolution optimized, the branch condition is evaluated in the ID stage (using a comparator) and the branch target is computed using the branch offset. This results in a 1-cycle branch penalty. Without this optimization, resolution would happen in EX, giving a 2-cycle penalty.',
    points: 1,
  },
];

// ─── SIMD & Multicore (10 questions) ────────────────────────────────────────

const simdAndMulticore: QuizQuestion[] = [
  {
    id: 'simd-1',
    type: 'mc',
    topic: 'simd-and-multicore',
    question:
      'According to Amdahl\'s Law, if 80% of a program can be parallelized and you have infinite processors, what is the maximum speedup?',
    options: ['4x', '5x', '8x', '80x'],
    correctAnswer: '5x',
    explanation:
      'Amdahl\'s Law: Speedup = 1 / (S + (1-S)/N) where S is the serial fraction and N is the number of processors. With S=0.2 and N=infinity: Speedup = 1/0.2 = 5x. The serial portion (20%) limits the maximum speedup to 5x regardless of processor count.',
    points: 1,
  },
  {
    id: 'simd-2',
    type: 'mc',
    topic: 'simd-and-multicore',
    question:
      'A GPU performing the same shader program on thousands of pixels simultaneously is best classified under which category of Flynn\'s taxonomy?',
    options: ['SISD', 'SIMD', 'MISD', 'MIMD'],
    correctAnswer: 'SIMD',
    explanation:
      'A GPU applies the same instruction (shader program) to multiple data elements (pixels) simultaneously. This is Single Instruction, Multiple Data (SIMD). GPUs are sometimes classified as SIMT (Single Instruction, Multiple Threads), which is a variant of SIMD.',
    points: 1,
  },
  {
    id: 'simd-3',
    type: 'tf',
    topic: 'simd-and-multicore',
    question:
      'MIMD (Multiple Instruction, Multiple Data) describes a multicore processor where each core executes its own independent instruction stream on its own data.',
    correctAnswer: 'True',
    explanation:
      'MIMD systems have multiple processing elements, each with its own instruction stream and data stream. Modern multicore CPUs are MIMD: each core fetches and executes its own instructions independently.',
    points: 1,
  },
  {
    id: 'simd-4',
    type: 'mc',
    topic: 'simd-and-multicore',
    question:
      'Using Amdahl\'s Law: a program is 50% parallelizable. With 4 processors, what is the speedup?',
    options: ['1.33x', '1.60x', '2.00x', '4.00x'],
    correctAnswer: '1.60x',
    explanation:
      'Speedup = 1 / (0.5 + 0.5/4) = 1 / (0.5 + 0.125) = 1 / 0.625 = 1.60x.',
    points: 1,
  },
  {
    id: 'simd-5',
    type: 'short-answer',
    topic: 'simd-and-multicore',
    question:
      'What is vector chaining?',
    correctAnswer:
      'Forwarding results element-by-element from one vector operation to the next without waiting for the full vector to complete',
    acceptableAnswers: [
      'forwarding vector results element by element',
      'pipelining vector operations by forwarding elements as they complete',
      'chaining vector functional units so output feeds input without waiting',
    ],
    explanation:
      'Vector chaining allows a dependent vector operation to start as soon as the first element of the producing operation is available, rather than waiting for the entire vector to be computed. This is analogous to data forwarding in scalar pipelines but applied to vector elements.',
    points: 2,
  },
  {
    id: 'simd-6',
    type: 'mc',
    topic: 'simd-and-multicore',
    question:
      'A systolic array processes data by:',
    options: [
      'Broadcasting all data to all processing elements simultaneously',
      'Streaming data through a regular array of processing elements with local communication',
      'Storing all data in a shared cache',
      'Using a single powerful processor with SIMD instructions',
    ],
    correctAnswer:
      'Streaming data through a regular array of processing elements with local communication',
    explanation:
      'A systolic array consists of a regular mesh of simple processing elements (PEs). Data flows rhythmically through the array, with each PE performing a local computation and passing results to neighbors. This is highly efficient for regular computations like matrix multiplication.',
    points: 1,
  },
  {
    id: 'simd-7',
    type: 'mc',
    topic: 'simd-and-multicore',
    question:
      'Google\'s TPU (Tensor Processing Unit) uses which key architectural feature for matrix multiplication?',
    options: [
      'Out-of-order execution',
      'Branch prediction',
      'Systolic array',
      'Virtual memory',
    ],
    correctAnswer: 'Systolic array',
    explanation:
      'The Google TPU features a large systolic array (e.g., 256x256) as its core computational engine. This is highly efficient for the matrix multiply-accumulate operations that dominate deep neural network inference and training.',
    points: 1,
  },
  {
    id: 'simd-8',
    type: 'tf',
    topic: 'simd-and-multicore',
    question:
      'Memory banking allows multiple simultaneous accesses to different banks, improving bandwidth for vector/SIMD operations.',
    correctAnswer: 'True',
    explanation:
      'Memory banking divides memory into multiple independent banks that can be accessed in parallel. For vector operations that access consecutive or strided addresses, banking ensures multiple elements can be fetched simultaneously, provided there are no bank conflicts.',
    points: 1,
  },
  {
    id: 'simd-9',
    type: 'short-answer',
    topic: 'simd-and-multicore',
    question:
      'What are the four categories in Flynn\'s taxonomy?',
    correctAnswer: 'SISD, SIMD, MISD, MIMD',
    acceptableAnswers: [
      'SISD, SIMD, MISD, MIMD',
      'SISD SIMD MISD MIMD',
    ],
    explanation:
      'Flynn\'s taxonomy classifies architectures along two dimensions (instruction streams and data streams): SISD (Single Instruction Single Data -- classical uniprocessor), SIMD (Single Instruction Multiple Data -- vector/GPU), MISD (Multiple Instruction Single Data -- rare, sometimes fault-tolerant systems), MIMD (Multiple Instruction Multiple Data -- multicore/multiprocessor).',
    points: 2,
  },
  {
    id: 'simd-10',
    type: 'mc',
    topic: 'simd-and-multicore',
    question:
      'Which of the following is NOT a benefit of SIMD processing?',
    options: [
      'Higher throughput for data-parallel workloads',
      'Amortizes instruction fetch/decode over multiple data elements',
      'Efficient handling of irregular control flow with many branches',
      'Reduced energy per operation',
    ],
    correctAnswer:
      'Efficient handling of irregular control flow with many branches',
    explanation:
      'SIMD struggles with irregular control flow (branches) because all lanes must execute the same instruction. When different data elements need different paths, lanes must be masked off (predicated), wasting resources. This is called branch divergence in GPU terminology.',
    points: 1,
  },
];

// ─── Export all quizzes by topic ─────────────────────────────────────────────

export const quizzesByTopic: Record<string, QuizQuestion[]> = {
  'branch-prediction': branchPrediction,
  'cache': cache,
  'memory-systems': memorySystems,
  'new-memory': newMemory,
  'hardware-security': hardwareSecurity,
  'fundamentals': fundamentals,
  'isa': isa,
  'pipelining': pipelining,
  'simd-and-multicore': simdAndMulticore,
};

export const allQuizQuestions: QuizQuestion[] = Object.values(quizzesByTopic).flat();
