export interface ExamQuestion {
  id: string;
  type: 'mc' | 'short-answer' | 'long-answer';
  question: string;
  parts?: { label: string; question: string; points: number }[];
  points: number;
  options?: string[];
  correctAnswer?: string;
  answerKey?: string;
  rubric?: string[];
  topic: string;
}

export interface ExamSection {
  title: string;
  instructions: string;
  questions: ExamQuestion[];
}

export interface PracticeExam {
  id: string;
  title: string;
  duration: number;
  sections: ExamSection[];
  totalPoints: number;
}

// ═══════════════════════════════════════════════════════════════════════════════
// Practice Exam 1
// ═══════════════════════════════════════════════════════════════════════════════

const exam1: PracticeExam = {
  id: 'exam-1',
  title: 'Practice Final Exam 1',
  duration: 120,
  totalPoints: 80,
  sections: [
    {
      title: 'Part A: Multiple Choice',
      instructions:
        'Select the single best answer for each question. Each question is worth 1 point.',
      questions: [
        {
          id: 'e1-a1',
          type: 'mc',
          question:
            'A 2-bit saturating counter in state 01 (Weakly Not Taken) receives outcome Taken. What is the new state?',
          options: [
            '00 (Strongly Not Taken)',
            '01 (Weakly Not Taken)',
            '10 (Weakly Taken)',
            '11 (Strongly Taken)',
          ],
          correctAnswer: '10 (Weakly Taken)',
          points: 1,
          topic: 'branch-prediction',
        },
        {
          id: 'e1-a2',
          type: 'mc',
          question:
            'In a gshare predictor, the PHT is indexed by:',
          options: [
            'The branch PC only',
            'The Global History Register (GHR) only',
            'The XOR of the GHR and the lower bits of the branch PC',
            'The XOR of the PC and the local branch history',
          ],
          correctAnswer:
            'The XOR of the GHR and the lower bits of the branch PC',
          points: 1,
          topic: 'branch-prediction',
        },
        {
          id: 'e1-a3',
          type: 'mc',
          question:
            'A cache block is 64 bytes, the cache is 4-way set associative with 512 sets, and addresses are 32 bits. How many tag bits are needed?',
          options: ['11', '13', '15', '17'],
          correctAnswer: '17',
          points: 1,
          topic: 'cache',
        },
        {
          id: 'e1-a4',
          type: 'mc',
          question: 'Which type of cache miss cannot be reduced by increasing cache size?',
          options: [
            'Compulsory miss',
            'Capacity miss',
            'Conflict miss',
            'Both capacity and conflict',
          ],
          correctAnswer: 'Compulsory miss',
          points: 1,
          topic: 'cache',
        },
        {
          id: 'e1-a5',
          type: 'mc',
          question:
            'A DRAM row buffer conflict requires the sequence:',
          options: [
            'Activate + CAS',
            'CAS only',
            'Precharge + Activate + CAS',
            'Precharge + CAS',
          ],
          correctAnswer: 'Precharge + Activate + CAS',
          points: 1,
          topic: 'memory-systems',
        },
        {
          id: 'e1-a6',
          type: 'mc',
          question:
            'FR-FCFS DRAM scheduling prioritizes:',
          options: [
            'Oldest request first',
            'Row buffer hits over older requests',
            'Requests from the highest-priority core',
            'Write requests over read requests',
          ],
          correctAnswer: 'Row buffer hits over older requests',
          points: 1,
          topic: 'memory-systems',
        },
        {
          id: 'e1-a7',
          type: 'mc',
          question:
            'PCM stores data by switching a material between:',
          options: [
            'Charged and uncharged states',
            'Amorphous and crystalline phases',
            'Magnetic orientations',
            'High and low voltage',
          ],
          correctAnswer: 'Amorphous and crystalline phases',
          points: 1,
          topic: 'new-memory',
        },
        {
          id: 'e1-a8',
          type: 'mc',
          question:
            'Which is a key disadvantage of PCM compared to DRAM?',
          options: [
            'Volatility',
            'Higher density',
            'Limited write endurance',
            'Requires refresh',
          ],
          correctAnswer: 'Limited write endurance',
          points: 1,
          topic: 'new-memory',
        },
        {
          id: 'e1-a9',
          type: 'mc',
          question:
            'Flush+Reload requires:',
          options: [
            'Shared cache between attacker and victim',
            'Shared physical memory pages (e.g., shared libraries)',
            'Root access on the victim machine',
            'Access to the branch predictor',
          ],
          correctAnswer:
            'Shared physical memory pages (e.g., shared libraries)',
          points: 1,
          topic: 'hardware-security',
        },
        {
          id: 'e1-a10',
          type: 'mc',
          question:
            'Rowhammer causes bit flips by:',
          options: [
            'Overflowing a software buffer',
            'Repeatedly activating a DRAM row, disturbing adjacent rows',
            'Exploiting speculative execution',
            'Timing cache accesses',
          ],
          correctAnswer:
            'Repeatedly activating a DRAM row, disturbing adjacent rows',
          points: 1,
          topic: 'hardware-security',
        },
        {
          id: 'e1-a11',
          type: 'mc',
          question:
            'In Flynn\'s taxonomy, a GPU running the same shader on many pixels is classified as:',
          options: ['SISD', 'SIMD', 'MISD', 'MIMD'],
          correctAnswer: 'SIMD',
          points: 1,
          topic: 'simd-and-multicore',
        },
        {
          id: 'e1-a12',
          type: 'mc',
          question:
            'According to Amdahl\'s Law, if 90% of a program is parallelizable, the maximum speedup with infinite processors is:',
          options: ['9x', '10x', '90x', 'Infinity'],
          correctAnswer: '10x',
          points: 1,
          topic: 'simd-and-multicore',
        },
        {
          id: 'e1-a13',
          type: 'mc',
          question:
            'In a 5-stage pipeline, a load followed by an instruction that uses the loaded value causes:',
          options: [
            'No stall with forwarding',
            '1 stall cycle even with full forwarding',
            '2 stall cycles',
            '3 stall cycles',
          ],
          correctAnswer: '1 stall cycle even with full forwarding',
          points: 1,
          topic: 'pipelining',
        },
        {
          id: 'e1-a14',
          type: 'mc',
          question:
            'The Von Neumann bottleneck refers to:',
          options: [
            'Limited number of registers',
            'Shared bus between CPU and memory limiting throughput',
            'Slow ALU operations',
            'Limited instruction set size',
          ],
          correctAnswer:
            'Shared bus between CPU and memory limiting throughput',
          points: 1,
          topic: 'fundamentals',
        },
        {
          id: 'e1-a15',
          type: 'mc',
          question:
            'Which addressing mode computes: EA = PC + offset?',
          options: [
            'Register indirect',
            'Base + displacement',
            'PC-relative',
            'Immediate',
          ],
          correctAnswer: 'PC-relative',
          points: 1,
          topic: 'isa',
        },
      ],
    },
    {
      title: 'Part B: Short Answer',
      instructions:
        'Answer each question concisely. Show key steps for any calculations.',
      questions: [
        {
          id: 'e1-b1',
          type: 'short-answer',
          question:
            'Explain the difference between a row buffer hit, row buffer miss, and row buffer conflict in DRAM. For each, list the DRAM commands involved and the approximate latency in terms of tRCD, tCAS, and tRP.',
          correctAnswer:
            'Row buffer hit: CAS only, latency = tCAS. Row buffer miss (empty): Activate + CAS, latency = tRCD + tCAS. Row buffer conflict (wrong row open): Precharge + Activate + CAS, latency = tRP + tRCD + tCAS.',
          points: 4,
          topic: 'memory-systems',
        },
        {
          id: 'e1-b2',
          type: 'short-answer',
          question:
            'A direct-mapped cache has 16 KB capacity, 32-byte blocks, and 32-bit addresses. Calculate: (a) the number of sets, (b) the number of offset bits, (c) the number of index bits, and (d) the number of tag bits.',
          correctAnswer:
            '(a) 512 sets. (b) 5 offset bits (log2(32)). (c) 9 index bits (log2(512)). (d) 18 tag bits (32 - 9 - 5).',
          points: 4,
          topic: 'cache',
        },
        {
          id: 'e1-b3',
          type: 'short-answer',
          question:
            'Compare Prime+Probe and Flush+Reload cache side-channel attacks. State one key requirement that differs between them and explain why.',
          correctAnswer:
            'Flush+Reload requires shared memory between attacker and victim (e.g., shared library). Prime+Probe does not require shared memory -- it only needs to share the cache. This is because Flush+Reload uses clflush on a specific shared address, while Prime+Probe fills entire cache sets with attacker data and checks for eviction.',
          points: 4,
          topic: 'hardware-security',
        },
        {
          id: 'e1-b4',
          type: 'short-answer',
          question:
            'List three advantages of PCM over DRAM and two disadvantages.',
          correctAnswer:
            'Advantages: (1) Non-volatile -- retains data without power, (2) Higher density -- smaller cell size, (3) No refresh needed -- saves energy and avoids refresh interference. Disadvantages: (1) Limited write endurance (10^6-10^8 cycles), (2) Higher write latency and energy compared to DRAM.',
          points: 4,
          topic: 'new-memory',
        },
        {
          id: 'e1-b5',
          type: 'short-answer',
          question:
            'Using Amdahl\'s Law, a program has 75% parallelizable work. Calculate the speedup with: (a) 4 processors, (b) 16 processors, (c) infinite processors.',
          correctAnswer:
            '(a) Speedup = 1/(0.25 + 0.75/4) = 1/(0.25 + 0.1875) = 1/0.4375 = 2.29x. (b) Speedup = 1/(0.25 + 0.75/16) = 1/(0.25 + 0.047) = 1/0.297 = 3.37x. (c) Speedup = 1/0.25 = 4.0x.',
          points: 4,
          topic: 'simd-and-multicore',
        },
      ],
    },
    {
      title: 'Part C: Long Answer / Calculation',
      instructions:
        'Show all work. Partial credit will be given for correct methodology.',
      questions: [
        {
          id: 'e1-c1',
          type: 'long-answer',
          question:
            'Trace a 2-bit saturating counter predictor for the following branch outcome sequence: T, T, N, T, T, N, T, T, N. The counter starts at state 00 (Strongly Not Taken). For each outcome, show: (a) the current state, (b) the prediction, (c) the actual outcome, (d) whether it is correct or mispredicted, and (e) the new state. Calculate the overall prediction accuracy.',
          answerKey:
            'Starting state: 00 (SNT)\n\n1. State 00, Predict NT, Actual T -> MISPREDICT, New state 01\n2. State 01, Predict NT, Actual T -> MISPREDICT, New state 10\n3. State 10, Predict T, Actual N -> MISPREDICT, New state 01\n4. State 01, Predict NT, Actual T -> MISPREDICT, New state 10\n5. State 10, Predict T, Actual T -> CORRECT, New state 11\n6. State 11, Predict T, Actual N -> MISPREDICT, New state 10\n7. State 10, Predict T, Actual T -> CORRECT, New state 11\n8. State 11, Predict T, Actual T -> CORRECT, New state 11\n9. State 11, Predict T, Actual N -> MISPREDICT, New state 10\n\nCorrect predictions: 3 (outcomes 5, 7, 8)\nMispredictions: 6 (outcomes 1, 2, 3, 4, 6, 9)\nAccuracy: 3/9 = 33.3%\n\nNote: The poor accuracy is due to the cold start (00) and the alternating N pattern. The 2-bit counter struggles because the N breaks the pattern every 3rd outcome, and the initial state requires warmup.',
          rubric: [
            'Correct state transitions for all 9 steps (5 pts)',
            'Correct prediction for each state (2 pts)',
            'Correct identification of hits/misses (2 pts)',
            'Correct final accuracy calculation (1 pt)',
          ],
          points: 10,
          topic: 'branch-prediction',
        },
        {
          id: 'e1-c2',
          type: 'long-answer',
          question:
            'A processor has a 2-level cache hierarchy with the following parameters:\n- L1: Hit time = 1 cycle, Size = 32 KB, Miss rate = 8%\n- L2: Hit time = 10 cycles, Size = 256 KB, Local miss rate = 25%\n- Main memory access time: 200 cycles\n\n(a) Calculate the AMAT.\n(b) If the L1 miss rate is reduced to 4% (by doubling L1 size), what is the new AMAT? What is the percentage improvement?\n(c) Instead, if the L2 local miss rate is reduced to 10% (by improving L2), what is the new AMAT? Which optimization is more effective?',
          answerKey:
            '(a) AMAT = L1_hit + L1_miss_rate * (L2_hit + L2_local_miss_rate * Mem_time)\n    = 1 + 0.08 * (10 + 0.25 * 200)\n    = 1 + 0.08 * (10 + 50)\n    = 1 + 0.08 * 60\n    = 1 + 4.8\n    = 5.8 cycles\n\n(b) New AMAT = 1 + 0.04 * (10 + 0.25 * 200)\n    = 1 + 0.04 * 60\n    = 1 + 2.4\n    = 3.4 cycles\n    Improvement = (5.8 - 3.4) / 5.8 = 41.4%\n\n(c) New AMAT = 1 + 0.08 * (10 + 0.10 * 200)\n    = 1 + 0.08 * (10 + 20)\n    = 1 + 0.08 * 30\n    = 1 + 2.4\n    = 3.4 cycles\n    Improvement = (5.8 - 3.4) / 5.8 = 41.4%\n\n    Both optimizations yield the same AMAT (3.4 cycles). However, halving L1 miss rate doubles L1 size (32KB -> 64KB), while reducing L2 miss rate from 25% to 10% might require a much larger or more associative L2. The L1 optimization may be more practical.',
          rubric: [
            'Correct AMAT formula setup (2 pts)',
            'Correct part (a) calculation: 5.8 cycles (3 pts)',
            'Correct part (b) calculation: 3.4 cycles + improvement (3 pts)',
            'Correct part (c) calculation: 3.4 cycles + comparison (4 pts)',
          ],
          points: 12,
          topic: 'cache',
        },
        {
          id: 'e1-c3',
          type: 'long-answer',
          question:
            'A DRAM system has the following timing parameters: tRCD = 14ns, tCAS = 14ns, tRP = 14ns, tBurst = 4ns.\n\nThree requests arrive to the same bank in this order:\n  R1: Row 5, Column 10 (arrives at t=0ns)\n  R2: Row 5, Column 20 (arrives at t=5ns)\n  R3: Row 8, Column 5 (arrives at t=10ns)\n\nAssume the bank starts with no row open (idle).\n\n(a) Using FCFS scheduling, calculate when each request completes and total latency.\n(b) Using FR-FCFS scheduling, calculate when each request completes and total latency.\n(c) Which scheduling policy is better for this sequence? Why?',
          answerKey:
            '(a) FCFS Scheduling (process R1, R2, R3 in order):\n\nR1: Bank idle -> activate Row 5: tRCD=14ns. CAS: tCAS=14ns. Burst: 4ns.\n  Start: t=0, Activate done: t=14, CAS done: t=28, Data ready: t=32ns.\n\nR2: Row 5 already open -> Row buffer HIT.\n  Start: t=32 (after R1), CAS: tCAS=14ns. Burst: 4ns.\n  CAS done: t=46, Data ready: t=50ns.\n\nR3: Row 5 open, need Row 8 -> Row buffer CONFLICT.\n  Start: t=50, Precharge: tRP=14ns (done t=64). Activate Row 8: tRCD=14ns (done t=78). CAS: tCAS=14ns (done t=92). Burst: 4ns.\n  Data ready: t=96ns.\n\nTotal time: 96ns. All finish by t=96ns.\n\n(b) FR-FCFS Scheduling:\nAt t=0: R1 is only request -> process R1 (bank idle, Row 5 activate needed).\n  R1: Activate Row 5 (14ns) + CAS (14ns) + Burst (4ns) = Data ready t=32ns.\n\nAt t=32: R2 (Row 5 -- row buffer hit) and R3 (Row 8 -- conflict) pending. FR-FCFS prioritizes R2 (hit).\n  R2: CAS (14ns) + Burst (4ns) = Data ready t=50ns.\n\nAt t=50: R3 (Row 8 -- conflict).\n  R3: Precharge (14ns) + Activate (14ns) + CAS (14ns) + Burst (4ns) = Data ready t=96ns.\n\nTotal time: 96ns.\n\n(c) For this specific sequence, FCFS and FR-FCFS produce the same result because R1 and R2 access the same row (both benefit from the row being open). FR-FCFS would be better if R3 had arrived before R2, as it would reorder to serve the row buffer hit (R2) first. In general, FR-FCFS exploits row buffer locality and provides better throughput for workloads with spatial locality.',
          rubric: [
            'Correct R1 latency calculation (2 pts)',
            'Correct identification of R2 as row buffer hit (2 pts)',
            'Correct R3 conflict latency (2 pts)',
            'Correct FCFS total (2 pts)',
            'Correct FR-FCFS scheduling and comparison (5 pts)',
          ],
          points: 13,
          topic: 'memory-systems',
        },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// Practice Exam 2
// ═══════════════════════════════════════════════════════════════════════════════

const exam2: PracticeExam = {
  id: 'exam-2',
  title: 'Practice Final Exam 2',
  duration: 120,
  totalPoints: 80,
  sections: [
    {
      title: 'Part A: Multiple Choice',
      instructions:
        'Select the single best answer for each question. Each question is worth 1 point.',
      questions: [
        {
          id: 'e2-a1',
          type: 'mc',
          question:
            'A tournament predictor selects between:',
          options: [
            'Two branch target buffers',
            'A global predictor and a local predictor using a choice table',
            'Two cache levels',
            'Speculation and non-speculation modes',
          ],
          correctAnswer:
            'A global predictor and a local predictor using a choice table',
          points: 1,
          topic: 'branch-prediction',
        },
        {
          id: 'e2-a2',
          type: 'mc',
          question:
            'Which branch predictor requires the least hardware?',
          options: [
            'Tournament predictor',
            'Gshare with 16-bit GHR',
            '1-bit (last-time) predictor',
            'Two-level local predictor',
          ],
          correctAnswer: '1-bit (last-time) predictor',
          points: 1,
          topic: 'branch-prediction',
        },
        {
          id: 'e2-a3',
          type: 'mc',
          question:
            'AMAT for a single-level cache is calculated as:',
          options: [
            'Hit Rate x Hit Time + Miss Rate x Miss Penalty',
            'Hit Time + Miss Rate x Miss Penalty',
            'Miss Rate x (Hit Time + Miss Penalty)',
            'Hit Time x Miss Rate + Miss Penalty',
          ],
          correctAnswer: 'Hit Time + Miss Rate x Miss Penalty',
          points: 1,
          topic: 'cache',
        },
        {
          id: 'e2-a4',
          type: 'mc',
          question:
            'In a write-back cache, when is data written to the next level?',
          options: [
            'On every write',
            'When the dirty block is evicted',
            'At fixed intervals',
            'Never',
          ],
          correctAnswer: 'When the dirty block is evicted',
          points: 1,
          topic: 'cache',
        },
        {
          id: 'e2-a5',
          type: 'mc',
          question:
            'A row buffer miss (bank idle, no row open) has latency:',
          options: [
            'tCAS',
            'tRCD + tCAS',
            'tRP + tRCD + tCAS',
            'tRP + tCAS',
          ],
          correctAnswer: 'tRCD + tCAS',
          points: 1,
          topic: 'memory-systems',
        },
        {
          id: 'e2-a6',
          type: 'mc',
          question:
            'Which DRAM address mapping provides best bank-level parallelism for sequential accesses?',
          options: [
            'Row:Bank:Column',
            'Row:Column:Bank',
            'Bank:Row:Column',
            'Column:Bank:Row',
          ],
          correctAnswer: 'Row:Column:Bank',
          points: 1,
          topic: 'memory-systems',
        },
        {
          id: 'e2-a7',
          type: 'mc',
          question:
            'Wear leveling in PCM aims to:',
          options: [
            'Speed up read operations',
            'Distribute writes evenly to extend device lifetime',
            'Reduce refresh energy',
            'Increase DRAM density',
          ],
          correctAnswer:
            'Distribute writes evenly to extend device lifetime',
          points: 1,
          topic: 'new-memory',
        },
        {
          id: 'e2-a8',
          type: 'mc',
          question:
            'In a hybrid DRAM+PCM system, DRAM serves as:',
          options: [
            'Persistent storage',
            'A fast buffer for hot data',
            'A replacement for L2 cache',
            'A write buffer only',
          ],
          correctAnswer: 'A fast buffer for hot data',
          points: 1,
          topic: 'new-memory',
        },
        {
          id: 'e2-a9',
          type: 'mc',
          question:
            'Spectre v1 exploits:',
          options: [
            'DRAM row buffer timing',
            'Conditional branch misprediction to bypass bounds checks speculatively',
            'Out-of-order execution to read kernel memory',
            'Write buffer coalescing',
          ],
          correctAnswer:
            'Conditional branch misprediction to bypass bounds checks speculatively',
          points: 1,
          topic: 'hardware-security',
        },
        {
          id: 'e2-a10',
          type: 'mc',
          question:
            'KPTI (Kernel Page Table Isolation) defends against:',
          options: ['Spectre', 'Meltdown', 'Rowhammer', 'Prime+Probe'],
          correctAnswer: 'Meltdown',
          points: 1,
          topic: 'hardware-security',
        },
        {
          id: 'e2-a11',
          type: 'mc',
          question:
            'A systolic array is best suited for:',
          options: [
            'Branch prediction',
            'Regular, data-parallel computations like matrix multiplication',
            'Cache replacement decisions',
            'Virtual memory page table walks',
          ],
          correctAnswer:
            'Regular, data-parallel computations like matrix multiplication',
          points: 1,
          topic: 'simd-and-multicore',
        },
        {
          id: 'e2-a12',
          type: 'mc',
          question:
            'Vector chaining allows:',
          options: [
            'Multiple vectors to share the same register',
            'A dependent vector operation to start before the producing operation fully completes',
            'Dynamic branch prediction on vector branches',
            'Out-of-order vector execution',
          ],
          correctAnswer:
            'A dependent vector operation to start before the producing operation fully completes',
          points: 1,
          topic: 'simd-and-multicore',
        },
        {
          id: 'e2-a13',
          type: 'mc',
          question:
            'Which data dependency type is a "true" dependency?',
          options: ['WAR', 'WAW', 'RAW', 'RAR'],
          correctAnswer: 'RAW',
          points: 1,
          topic: 'pipelining',
        },
        {
          id: 'e2-a14',
          type: 'mc',
          question:
            'In the dataflow execution model, an instruction fires when:',
          options: [
            'The program counter reaches it',
            'All input operands are available',
            'The control unit signals it',
            'It is the oldest instruction',
          ],
          correctAnswer: 'All input operands are available',
          points: 1,
          topic: 'fundamentals',
        },
        {
          id: 'e2-a15',
          type: 'mc',
          question:
            'A 0-address (stack) machine\'s ADD instruction:',
          options: [
            'Adds two registers',
            'Pops two operands from the stack, adds them, pushes the result',
            'Adds an immediate to the accumulator',
            'Adds two memory values',
          ],
          correctAnswer:
            'Pops two operands from the stack, adds them, pushes the result',
          points: 1,
          topic: 'isa',
        },
      ],
    },
    {
      title: 'Part B: Short Answer',
      instructions:
        'Answer concisely. Show work for calculations.',
      questions: [
        {
          id: 'e2-b1',
          type: 'short-answer',
          question:
            'A processor executes 1 billion instructions. Branches constitute 20% of instructions. The branch predictor has 97% accuracy. The misprediction penalty is 15 cycles.\n(a) How many mispredictions occur?\n(b) How many total penalty cycles are wasted on mispredictions?\n(c) What is the CPI contribution from branch mispredictions?',
          correctAnswer:
            '(a) 1B * 0.20 * 0.03 = 6,000,000 mispredictions. (b) 6,000,000 * 15 = 90,000,000 penalty cycles. (c) 90,000,000 / 1,000,000,000 = 0.09 CPI contribution.',
          points: 4,
          topic: 'branch-prediction',
        },
        {
          id: 'e2-b2',
          type: 'short-answer',
          question:
            'Explain the difference between a write-through and write-back cache policy. Which generates more write traffic to the next level of the hierarchy?',
          correctAnswer:
            'Write-through: every write updates both the cache and the next level immediately. Write-back: writes only update the cache (marking the block dirty); the next level is only updated when the dirty block is evicted. Write-through generates more write traffic because every write goes to the next level, while write-back only writes back dirty blocks on eviction.',
          points: 3,
          topic: 'cache',
        },
        {
          id: 'e2-b3',
          type: 'short-answer',
          question:
            'A DRAM system has 4 channels, 2 ranks per channel, and 16 banks per rank. How many banks total? If each bank has a 2KB row buffer, what is the total row buffer capacity across the entire system?',
          correctAnswer:
            'Total banks = 4 * 2 * 16 = 128 banks. Total row buffer capacity = 128 * 2KB = 256 KB.',
          points: 3,
          topic: 'memory-systems',
        },
        {
          id: 'e2-b4',
          type: 'short-answer',
          question:
            'What is the DRAMA attack? Explain what side channel it exploits and why it is concerning.',
          correctAnswer:
            'DRAMA exploits the timing difference between DRAM row buffer hits and row buffer conflicts as a side channel. By measuring access latency, an attacker can determine which DRAM row the victim is accessing. This is concerning because it reveals memory access patterns without requiring shared memory between attacker and victim, and DRAM side channels are harder to mitigate than cache side channels.',
          points: 4,
          topic: 'hardware-security',
        },
        {
          id: 'e2-b5',
          type: 'short-answer',
          question:
            'Consider a 5-stage MIPS pipeline with full data forwarding. Identify all hazards and any stall cycles needed:\n  I1: LW R1, 0(R5)\n  I2: ADD R2, R1, R3\n  I3: SW R2, 4(R5)\n  I4: SUB R4, R2, R1',
          correctAnswer:
            'I1->I2: RAW on R1 (load-use hazard). LW produces R1 at end of MEM; ADD needs it at EX. Even with forwarding from MEM/WB, this requires 1 stall cycle.\nI2->I3: RAW on R2. ADD produces at EX, SW needs R2 at MEM for store data. Forwarded from EX/MEM to MEM stage -- no stall.\nI2->I4: RAW on R2. ADD result forwarded from MEM/WB (after stall pushes I2 one cycle later) to EX of I4 -- no additional stall.\nI1->I4: RAW on R1. LW result available from WB, forwarded to I4 EX -- no stall.\nTotal stalls: 1 cycle (between I1 and I2).',
          points: 5,
          topic: 'pipelining',
        },
      ],
    },
    {
      title: 'Part C: Long Answer / Calculation',
      instructions:
        'Show all work. Partial credit will be given.',
      questions: [
        {
          id: 'e2-c1',
          type: 'long-answer',
          question:
            'Compare gshare and tournament predictors in detail.\n\n(a) Describe how gshare works. What is stored in the GHR and PHT? How is the PHT indexed?\n(b) Describe how a tournament predictor works. What tables does it maintain?\n(c) For each predictor, give an example of a branch pattern where it would excel and one where it would struggle.\n(d) The Alpha 21264 uses a tournament predictor. Why might this be preferable to using gshare alone for a high-performance processor?',
          answerKey:
            '(a) Gshare:\n- GHR: an n-bit shift register recording the last n branch outcomes (T/N) globally across all branches.\n- PHT: a table of 2^n 2-bit saturating counters.\n- Index: GHR XOR lower n bits of branch PC. This XOR reduces aliasing by incorporating both global history and branch identity.\n\n(b) Tournament predictor:\n- Maintains three tables: (1) a global predictor (like gshare), (2) a local predictor (per-branch history table + local PHT), and (3) a choice predictor (array of 2-bit counters indexed by branch address or global history).\n- The choice predictor selects between global and local predictions based on which has been more accurate for that branch recently.\n\n(c) Gshare excels: branches correlated with global path (e.g., if-else chains where the outcome of one branch predicts the next). Gshare struggles: branches with long local patterns (e.g., a loop that always iterates 7 times) where global history is not informative.\nTournament excels: workloads with a mix of globally and locally predictable branches. Struggles: very small working sets where all three tables alias heavily.\n\n(d) A tournament predictor adapts to each branch individually. Some branches are best predicted by global history, others by local history. By dynamically selecting the better predictor per branch, the tournament achieves higher accuracy than either predictor alone, which matters for deep pipelines where misprediction penalty is high.',
          rubric: [
            'Correct gshare description with XOR mechanism (3 pts)',
            'Correct tournament predictor description with three components (3 pts)',
            'Reasonable examples for each predictor (3 pts)',
            'Good explanation of Alpha 21264 design choice (3 pts)',
          ],
          points: 12,
          topic: 'branch-prediction',
        },
        {
          id: 'e2-c2',
          type: 'long-answer',
          question:
            'Design a cache with the following specifications:\n- 64 KB total capacity\n- 4-way set associative\n- 64-byte blocks\n- 48-bit physical addresses\n\n(a) Calculate: number of blocks, number of sets, offset bits, index bits, tag bits.\n(b) Draw a diagram showing how an address is split into tag, index, and offset fields (show bit ranges).\n(c) If this cache has a hit rate of 92% and hit time of 2 cycles, and the next level has 50-cycle access time, what is the AMAT?\n(d) If we double the associativity to 8-way (keeping the same total size), how do the tag, index, and offset bits change? Does this increase or decrease the AMAT? Explain.',
          answerKey:
            '(a) Number of blocks = 64 KB / 64 B = 1024 blocks\n    Number of sets = 1024 / 4 = 256 sets\n    Offset bits = log2(64) = 6 bits\n    Index bits = log2(256) = 8 bits\n    Tag bits = 48 - 8 - 6 = 34 bits\n\n(b) Address layout (48 bits total):\n    [47:14] Tag (34 bits) | [13:6] Index (8 bits) | [5:0] Offset (6 bits)\n\n(c) AMAT = Hit Time + Miss Rate * Miss Penalty\n    = 2 + 0.08 * 50\n    = 2 + 4 = 6 cycles\n\n(d) With 8-way: same 1024 blocks, but 1024/8 = 128 sets.\n    Offset: still 6 bits\n    Index: log2(128) = 7 bits (was 8)\n    Tag: 48 - 7 - 6 = 35 bits (was 34)\n\n    Higher associativity reduces conflict misses (lower miss rate), which decreases the miss penalty component of AMAT. However, higher associativity may increase hit time slightly (more comparators). The net effect depends on workload, but typically reducing conflicts provides more benefit than the marginal hit time increase, so AMAT usually improves.',
          rubric: [
            'Correct block/set/bit calculations (4 pts)',
            'Correct address layout diagram (2 pts)',
            'Correct AMAT calculation: 6 cycles (2 pts)',
            'Correct analysis of doubling associativity (4 pts)',
          ],
          points: 12,
          topic: 'cache',
        },
        {
          id: 'e2-c3',
          type: 'long-answer',
          question:
            'Explain the Rowhammer vulnerability and its defense mechanisms.\n\n(a) Describe the physical mechanism behind Rowhammer. Why does it happen?\n(b) Explain how an attacker can exploit Rowhammer to gain unauthorized access (give a concrete attack scenario).\n(c) What is double-sided Rowhammer and why is it more effective?\n(d) Describe two defense mechanisms against Rowhammer and their trade-offs.\n(e) Why does Rowhammer get worse with newer DRAM technology nodes?',
          answerKey:
            '(a) Rowhammer exploits electrical coupling between adjacent DRAM rows. When a row (aggressor) is repeatedly activated (opened and closed), the resulting electromagnetic disturbance causes charge to leak from cells in adjacent rows (victim rows). If enough charge leaks before the next refresh, bit flips occur.\n\n(b) Attack scenario: An unprivileged attacker maps a large memory region and identifies DRAM row boundaries through reverse engineering. They then hammer rows adjacent to a page table entry. If a bit flip occurs in the page table, it can change the physical page mapping, giving the attacker read/write access to arbitrary physical memory, enabling privilege escalation (e.g., gaining root access).\n\n(c) Double-sided Rowhammer hammers the rows on BOTH sides of the victim row (row N-1 and row N+1 for victim row N). This is more effective because the victim row receives disturbance from both directions, roughly doubling the interference and making bit flips occur faster and more reliably.\n\n(d) Defense 1: Targeted Row Refresh (TRR) -- monitors activation counts and refreshes victim rows when an aggressor is detected. Trade-off: adds complexity to DRAM controller; has been shown to be bypassable with sophisticated patterns (TRRespass).\nDefense 2: Increased refresh rate (doubling refresh frequency). Trade-off: doubles refresh energy and performance overhead; may not be sufficient for very aggressive hammering.\nOther defenses: PARA (probabilistic adjacent row activation), ECC (error correction codes), physical isolation of sensitive data.\n\n(e) Newer technology nodes pack cells closer together (smaller feature sizes), increasing electromagnetic coupling between adjacent rows. Additionally, smaller capacitors hold less charge, so less disturbance is needed to flip a bit. Combined, these effects make each technology generation more vulnerable to Rowhammer.',
          rubric: [
            'Correct physical mechanism (2 pts)',
            'Concrete attack scenario (3 pts)',
            'Double-sided explanation (2 pts)',
            'Two defenses with trade-offs (4 pts)',
            'Technology scaling explanation (2 pts)',
          ],
          points: 13,
          topic: 'hardware-security',
        },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// Practice Exam 3
// ═══════════════════════════════════════════════════════════════════════════════

const exam3: PracticeExam = {
  id: 'exam-3',
  title: 'Practice Final Exam 3',
  duration: 120,
  totalPoints: 80,
  sections: [
    {
      title: 'Part A: Multiple Choice',
      instructions:
        'Select the single best answer for each question. Each question is worth 1 point.',
      questions: [
        {
          id: 'e3-a1',
          type: 'mc',
          question:
            'A 2-bit predictor in state "Strongly Taken" (11) receives outcome "Not Taken". The new state is:',
          options: [
            '00 (Strongly Not Taken)',
            '01 (Weakly Not Taken)',
            '10 (Weakly Taken)',
            '11 (Strongly Taken)',
          ],
          correctAnswer: '10 (Weakly Taken)',
          points: 1,
          topic: 'branch-prediction',
        },
        {
          id: 'e3-a2',
          type: 'mc',
          question:
            'A BTB (Branch Target Buffer) stores:',
          options: [
            'Branch prediction counters',
            'Branch target addresses indexed by branch PC',
            'Cache tag information',
            'DRAM row addresses',
          ],
          correctAnswer: 'Branch target addresses indexed by branch PC',
          points: 1,
          topic: 'branch-prediction',
        },
        {
          id: 'e3-a3',
          type: 'mc',
          question:
            'A fully associative cache with N blocks has how many sets?',
          options: ['1', 'N', 'N/2', 'log2(N)'],
          correctAnswer: '1',
          points: 1,
          topic: 'cache',
        },
        {
          id: 'e3-a4',
          type: 'mc',
          question:
            'Increasing cache block size tends to:',
          options: [
            'Reduce compulsory misses but may increase conflict misses',
            'Reduce conflict misses but increase compulsory misses',
            'Reduce all types of misses',
            'Have no effect on miss rates',
          ],
          correctAnswer:
            'Reduce compulsory misses but may increase conflict misses',
          points: 1,
          topic: 'cache',
        },
        {
          id: 'e3-a5',
          type: 'mc',
          question:
            'DRAM refresh is necessary because:',
          options: [
            'DRAM cells use SRAM technology',
            'Capacitor charge leaks over time, causing data loss',
            'The row buffer must be periodically flushed',
            'Banks need to be power-cycled',
          ],
          correctAnswer:
            'Capacitor charge leaks over time, causing data loss',
          points: 1,
          topic: 'memory-systems',
        },
        {
          id: 'e3-a6',
          type: 'mc',
          question:
            'Adding more channels to a DRAM system primarily improves:',
          options: [
            'Latency of individual accesses',
            'Aggregate memory bandwidth',
            'Row buffer hit rate',
            'Refresh efficiency',
          ],
          correctAnswer: 'Aggregate memory bandwidth',
          points: 1,
          topic: 'memory-systems',
        },
        {
          id: 'e3-a7',
          type: 'mc',
          question:
            'PCM read latency compared to DRAM read latency is approximately:',
          options: [
            '10-100x slower',
            '2-4x slower',
            'About the same',
            'Faster',
          ],
          correctAnswer: '2-4x slower',
          points: 1,
          topic: 'new-memory',
        },
        {
          id: 'e3-a8',
          type: 'mc',
          question:
            'In a hybrid memory system, migrating hot pages to DRAM is beneficial because:',
          options: [
            'DRAM has better write endurance',
            'DRAM provides faster access for frequently used data',
            'PCM cannot store data reliably',
            'DRAM is non-volatile',
          ],
          correctAnswer:
            'DRAM provides faster access for frequently used data',
          points: 1,
          topic: 'new-memory',
        },
        {
          id: 'e3-a9',
          type: 'mc',
          question:
            'In Prime+Probe, the "prime" step involves:',
          options: [
            'Flushing the victim\'s cache lines',
            'Filling target cache sets with attacker data',
            'Measuring access times',
            'Executing the victim\'s code',
          ],
          correctAnswer: 'Filling target cache sets with attacker data',
          points: 1,
          topic: 'hardware-security',
        },
        {
          id: 'e3-a10',
          type: 'mc',
          question:
            'Meltdown exploits:',
          options: [
            'Branch prediction to leak data',
            'DRAM disturbance to flip bits',
            'Out-of-order execution to transiently read kernel memory from user space',
            'Cache replacement policy weaknesses',
          ],
          correctAnswer:
            'Out-of-order execution to transiently read kernel memory from user space',
          points: 1,
          topic: 'hardware-security',
        },
        {
          id: 'e3-a11',
          type: 'mc',
          question:
            'Google\'s TPU uses what computational structure at its core?',
          options: [
            'Out-of-order superscalar pipeline',
            'Systolic array',
            'VLIW processor',
            'CGRA (Coarse-grained reconfigurable array)',
          ],
          correctAnswer: 'Systolic array',
          points: 1,
          topic: 'simd-and-multicore',
        },
        {
          id: 'e3-a12',
          type: 'mc',
          question:
            'A multicore processor with 4 independent cores, each running its own thread, is classified as:',
          options: ['SISD', 'SIMD', 'MISD', 'MIMD'],
          correctAnswer: 'MIMD',
          points: 1,
          topic: 'simd-and-multicore',
        },
        {
          id: 'e3-a13',
          type: 'mc',
          question:
            'Data forwarding (bypassing) in a pipeline:',
          options: [
            'Eliminates all data hazards',
            'Routes computed results directly to where they are needed, reducing stalls',
            'Increases the number of pipeline stages',
            'Is only useful for branch instructions',
          ],
          correctAnswer:
            'Routes computed results directly to where they are needed, reducing stalls',
          points: 1,
          topic: 'pipelining',
        },
        {
          id: 'e3-a14',
          type: 'mc',
          question:
            'In the Von Neumann model, the "stored program" concept means:',
          options: [
            'Programs are stored in ROM and cannot be changed',
            'Instructions and data are stored in the same memory',
            'Programs are stored in registers',
            'The program counter is stored in memory',
          ],
          correctAnswer:
            'Instructions and data are stored in the same memory',
          points: 1,
          topic: 'fundamentals',
        },
        {
          id: 'e3-a15',
          type: 'mc',
          question:
            'RISC ISAs typically feature:',
          options: [
            'Variable-length instructions and many addressing modes',
            'Fixed-length instructions, load/store architecture, and large register file',
            'Hardware-managed stack for all operations',
            'Complex multi-cycle instructions',
          ],
          correctAnswer:
            'Fixed-length instructions, load/store architecture, and large register file',
          points: 1,
          topic: 'isa',
        },
      ],
    },
    {
      title: 'Part B: Short Answer',
      instructions:
        'Answer concisely. Show key steps for calculations.',
      questions: [
        {
          id: 'e3-b1',
          type: 'short-answer',
          question:
            'A 1-bit predictor starts predicting "Not Taken". Given the branch sequence: T, T, T, N, T, T, T, N, T, T -- how many mispredictions occur? What is the accuracy? Would a 2-bit predictor (starting at 00/SNT) do better or worse?',
          correctAnswer:
            '1-bit: Start predict NT. T->mispredict(1), now predict T. T->correct. T->correct. N->mispredict(2), now predict NT. T->mispredict(3), now predict T. T->correct. T->correct. N->mispredict(4), now predict NT. T->mispredict(5), now predict T. T->correct.\n5 mispredictions out of 10 = 50% accuracy.\n2-bit starting at 00: T->mispredict(1),01. T->mispredict(2),10. T->correct,11. N->mispredict(3),10. T->correct,11. T->correct,11. T->correct,11. N->mispredict(4),10. T->correct,11. T->correct,11.\n4 mispredictions = 60% accuracy. The 2-bit predictor is better.',
          points: 5,
          topic: 'branch-prediction',
        },
        {
          id: 'e3-b2',
          type: 'short-answer',
          question:
            'Explain the difference between spatial locality and temporal locality. Give one example of each in the context of cache design.',
          correctAnswer:
            'Temporal locality: recently accessed data is likely to be accessed again soon. Example: a loop variable that is read every iteration. Spatial locality: data near recently accessed data is likely to be accessed soon. Example: sequentially iterating through an array -- accessing element [i] means [i+1] will likely be accessed next. Caches exploit temporal locality by keeping recently accessed blocks; they exploit spatial locality by fetching entire cache blocks (which include nearby data).',
          points: 3,
          topic: 'cache',
        },
        {
          id: 'e3-b3',
          type: 'short-answer',
          question:
            'A DRAM bank has tRCD=12ns, tCAS=12ns, tRP=12ns. Calculate the latency for: (a) row buffer hit, (b) row buffer miss (bank idle), (c) row buffer conflict. If 60% of accesses are hits, 10% are misses, and 30% are conflicts, what is the average access latency?',
          correctAnswer:
            '(a) Row buffer hit: tCAS = 12ns. (b) Row buffer miss: tRCD + tCAS = 24ns. (c) Row buffer conflict: tRP + tRCD + tCAS = 36ns.\nAverage = 0.6*12 + 0.1*24 + 0.3*36 = 7.2 + 2.4 + 10.8 = 20.4ns.',
          points: 4,
          topic: 'memory-systems',
        },
        {
          id: 'e3-b4',
          type: 'short-answer',
          question:
            'Explain how Spectre v1 (Bounds Check Bypass) works. Include: (a) the role of branch prediction, (b) what happens during speculative execution, (c) how the attacker reads the leaked data.',
          correctAnswer:
            '(a) The attacker mistrains the branch predictor by repeatedly executing a bounds check with in-bounds values, causing the predictor to predict "taken" (in bounds). (b) The attacker then supplies an out-of-bounds index. The branch predictor speculatively predicts in-bounds, so the code speculatively reads secret data at the out-of-bounds address and uses it to index into a probe array, loading a cache line depending on the secret value. (c) After the misprediction is detected and speculative state is rolled back, the cache state persists. The attacker uses Flush+Reload or Prime+Probe on the probe array to determine which cache line was loaded, revealing the secret byte value.',
          points: 4,
          topic: 'hardware-security',
        },
        {
          id: 'e3-b5',
          type: 'short-answer',
          question:
            'Name the five stages of the classic MIPS pipeline and briefly state what each stage does.',
          correctAnswer:
            '1. IF (Instruction Fetch): Fetch instruction from instruction memory using PC. 2. ID (Instruction Decode / Register Read): Decode the instruction and read source registers. 3. EX (Execute): Perform ALU operation or calculate memory address. 4. MEM (Memory Access): Access data memory for loads/stores. 5. WB (Write Back): Write the result to the destination register.',
          points: 3,
          topic: 'pipelining',
        },
      ],
    },
    {
      title: 'Part C: Long Answer / Calculation',
      instructions:
        'Show all work. Partial credit will be given for correct methodology.',
      questions: [
        {
          id: 'e3-c1',
          type: 'long-answer',
          question:
            'Consider the following MIPS code executing on a 5-stage pipeline with full data forwarding. The pipeline stages are IF, ID, EX, MEM, WB.\n\n  I1: LW   R1, 0(R10)\n  I2: LW   R2, 4(R10)\n  I3: ADD  R3, R1, R2\n  I4: SW   R3, 8(R10)\n  I5: SUB  R4, R3, R1\n  I6: AND  R5, R4, R2\n\n(a) Identify all RAW data dependencies.\n(b) For each dependency, state whether forwarding resolves it or a stall is needed.\n(c) Draw a pipeline timing diagram showing all stalls.\n(d) How many cycles does it take to execute all 6 instructions? What is the CPI?',
          answerKey:
            '(a) RAW Dependencies:\n- I1->I3: R1 (LW produces at end of MEM, ADD needs at EX)\n- I2->I3: R2 (LW produces at end of MEM, ADD needs at EX)\n- I3->I4: R3 (ADD produces at end of EX, SW needs R3 at MEM for store data)\n- I3->I5: R3 (ADD produces at end of EX, SUB needs at EX)\n- I1->I5: R1 (available by then, no issue)\n- I5->I6: R4 (SUB produces at end of EX, AND needs at EX)\n- I2->I6: R2 (available by then, no issue)\n\n(b) Forwarding analysis:\n- I1->I3 (R1): Load-use hazard! LW R1 in MEM when ADD enters EX -- but ADD needs R1 at START of EX. Need to forward from MEM/WB to EX, which means ADD must stall 1 cycle.\n- I2->I3 (R2): Same situation. LW R2 is one instruction ahead of ADD. After the 1-cycle stall for R1, I2 will be in WB when I3 is in EX. Forward from MEM/WB -- this works for R2 since I2 is 2 instructions ahead (plus 1 stall). Actually, let\'s trace carefully:\n  Without stalls: I1=LW, I2=LW, I3=ADD. I3 needs R1 from I1 (2 instructions back, load-use) and R2 from I2 (1 instruction back, load-use). The critical one is I2->I3: I2 is a LW immediately before I3. This is a load-use requiring 1 stall. I1->I3: I1 is 2 instructions before I3. I1\'s LW result is available from WB when I3 is at EX (after 1 stall for I2->I3). So 1 stall suffices for both.\n\n- I3->I4 (R3): ADD result at end of EX, SW needs store data at MEM. Forward from EX/MEM to MEM. No stall.\n- I3->I5 (R3): ADD result forwarded from MEM/WB to EX. No stall (I4 is between them).\n- I5->I6 (R4): SUB result forwarded from EX/MEM to EX. No stall (consecutive, but ALU-to-ALU forward works).\n\nTotal stalls: 1 cycle (between I2 and I3 for load-use).\n\n(c) Pipeline diagram:\n         1  2  3  4  5  6  7  8  9  10 11\n  I1:   IF ID EX ME WB\n  I2:      IF ID EX ME WB\n  I3:         IF ID ** EX ME WB\n  I4:            IF ** ID EX ME WB\n  I5:               ** IF ID EX ME WB\n  I6:                     IF ID EX ME WB\n\n(** = stall/bubble)\n\n(d) 6 instructions in 11 cycles. CPI = 11/6 = 1.83.\nAlternatively: 5 + 6 + 0 stalls... base = 5 + (6-1) = 10 cycles for 6 instructions with no stalls. Plus 1 stall = 11 cycles. CPI = 11/6 = 1.83.',
          rubric: [
            'All RAW dependencies identified correctly (3 pts)',
            'Correct forwarding vs stall analysis for each (3 pts)',
            'Correct pipeline diagram with stall placement (4 pts)',
            'Correct total cycles and CPI (2 pts)',
          ],
          points: 12,
          topic: 'pipelining',
        },
        {
          id: 'e3-c2',
          type: 'long-answer',
          question:
            'A program accesses the following byte addresses in order: 0, 32, 64, 96, 128, 0, 32, 64, 96, 128.\n\nThe cache is direct-mapped, 128 bytes total, 32-byte blocks, 32-bit addresses.\n\n(a) How many blocks does the cache have? How many offset, index, and tag bits?\n(b) For each access, determine: the block address, the cache index, whether it is a hit or miss, and the miss type (compulsory, capacity, or conflict).\n(c) What is the overall hit rate?\n(d) If the cache were 2-way set associative (same total size), would any of the misses become hits? Explain.',
          answerKey:
            '(a) Cache: 128 bytes / 32 bytes per block = 4 blocks.\n    Offset bits: log2(32) = 5\n    Index bits: log2(4) = 2\n    Tag bits: 32 - 2 - 5 = 25\n\n(b) Block address = byte address / 32. Index = block address mod 4.\n\n    Addr 0:   Block 0, Index 0. MISS (compulsory). Cache[0] = Block 0.\n    Addr 32:  Block 1, Index 1. MISS (compulsory). Cache[1] = Block 1.\n    Addr 64:  Block 2, Index 2. MISS (compulsory). Cache[2] = Block 2.\n    Addr 96:  Block 3, Index 3. MISS (compulsory). Cache[3] = Block 3.\n    Addr 128: Block 4, Index 0. MISS (conflict -- evicts Block 0). Cache[0] = Block 4.\n    Addr 0:   Block 0, Index 0. MISS (conflict -- evicts Block 4). Cache[0] = Block 0.\n    Addr 32:  Block 1, Index 1. HIT.\n    Addr 64:  Block 2, Index 2. HIT.\n    Addr 96:  Block 3, Index 3. HIT.\n    Addr 128: Block 4, Index 0. MISS (conflict -- evicts Block 0). Cache[0] = Block 4.\n\n    Hits: 3 (accesses 7, 8, 9)\n    Misses: 7 (4 compulsory + 3 conflict)\n\n(c) Hit rate = 3/10 = 30%.\n\n(d) With 2-way set associative: 128 bytes / 32 bytes = 4 blocks, 4/2 = 2 sets.\n    Block 0 -> Set 0, Block 1 -> Set 1, Block 2 -> Set 0, Block 3 -> Set 1, Block 4 -> Set 0.\n    Set 0 holds 2 blocks: can hold Block 0 and Block 2, or Block 0 and Block 4.\n    \n    Addr 0: Block 0, Set 0. MISS (compulsory). Set 0 = {Block 0}.\n    Addr 32: Block 1, Set 1. MISS (compulsory). Set 1 = {Block 1}.\n    Addr 64: Block 2, Set 0. MISS (compulsory). Set 0 = {Block 0, Block 2}.\n    Addr 96: Block 3, Set 1. MISS (compulsory). Set 1 = {Block 1, Block 3}.\n    Addr 128: Block 4, Set 0. MISS (capacity/conflict -- evicts LRU, Block 0). Set 0 = {Block 2, Block 4}.\n    Addr 0: Block 0, Set 0. MISS (conflict -- evicts LRU, Block 2). Set 0 = {Block 4, Block 0}.\n    Addr 32: Block 1, Set 1. HIT.\n    Addr 64: Block 2, Set 0. MISS (conflict -- evicts LRU, Block 4). Set 0 = {Block 0, Block 2}.\n    Addr 96: Block 3, Set 1. HIT.\n    Addr 128: Block 4, Set 0. MISS (conflict -- evicts LRU, Block 0). Set 0 = {Block 2, Block 4}.\n    \n    Hit rate = 2/10 = 20%. The 2-way cache actually does worse here because Blocks 0, 2, and 4 all compete for Set 0 (only 2 ways). This is a case where increased associativity with such a small cache still cannot hold the working set.',
          rubric: [
            'Correct cache geometry (2 pts)',
            'Correct hit/miss classification for all 10 accesses (4 pts)',
            'Correct miss type identification (2 pts)',
            'Correct hit rate (1 pt)',
            'Correct 2-way analysis with explanation (3 pts)',
          ],
          points: 12,
          topic: 'cache',
        },
        {
          id: 'e3-c3',
          type: 'long-answer',
          question:
            'A data center is choosing between two memory configurations for a read-heavy analytics workload:\n\nOption A: 64 GB DRAM\n- Read latency: 50ns\n- Write latency: 50ns\n- Cost: $320\n- Refresh power: 4W\n\nOption B: 16 GB DRAM + 128 GB PCM (hybrid)\n- DRAM read/write: 50ns\n- PCM read latency: 150ns\n- PCM write latency: 500ns\n- PCM write endurance: 10^7 writes/cell\n- DRAM cost: $80, PCM cost: $128\n- No refresh for PCM; DRAM refresh: 1W\n\nAssume the workload has a hot data set of 12 GB (fits in DRAM for Option B) and 90% of accesses go to hot data.\n\n(a) Calculate the effective read latency for each option.\n(b) Calculate the total memory cost per GB for each option.\n(c) If the workload performs 10 billion writes per day uniformly across the PCM address space, estimate the PCM lifetime in years.\n(d) Which option would you recommend for this workload? Justify with the above analysis plus any other considerations.',
          answerKey:
            '(a) Effective read latency:\n    Option A: All reads at 50ns. Average = 50ns.\n    Option B: 90% hit DRAM (50ns), 10% go to PCM (150ns).\n    Average = 0.9 * 50 + 0.1 * 150 = 45 + 15 = 60ns.\n\n(b) Cost per GB:\n    Option A: $320 / 64 GB = $5.00/GB\n    Option B: ($80 + $128) / (16 + 128) GB = $208 / 144 GB = $1.44/GB\n\n(c) PCM lifetime:\n    PCM capacity: 128 GB = 128 * 2^30 bytes = ~137.4 billion bytes.\n    Assuming writes are byte-level (conservative): 10B writes/day spread across 137.4B cells = each cell written 10B/137.4B = ~0.073 times/day.\n    More realistically at cache-line (64B) granularity: each write touches a cell, so 10B writes/day across all cells.\n    Writes per cell per day = 10 * 10^9 / (128 * 2^30) = 10^10 / (1.374 * 10^11) = 0.073 writes/cell/day.\n    Days to endurance limit = 10^7 / 0.073 = 1.37 * 10^8 days = ~375,000 years.\n    Even with non-uniform distribution (hot spots get 10x more writes), lifetime is > 37,500 years. PCM endurance is not a concern for this workload.\n\n(d) Recommendation: Option B (hybrid).\n    - Read latency: Only 20% slower (60ns vs 50ns), and 90% of accesses still get DRAM speed.\n    - Capacity: 144 GB vs 64 GB -- 2.25x more capacity for analytics on larger datasets.\n    - Cost: $1.44/GB vs $5.00/GB -- 3.5x cheaper per GB.\n    - Power: Less refresh power (only 16GB DRAM + no refresh for PCM).\n    - Endurance: Not a concern for this read-heavy workload.\n    - The main trade-off is the 10% of reads hitting PCM at 150ns and PCM write latency (500ns), but for a read-heavy analytics workload, this is acceptable.',
          rubric: [
            'Correct read latency calculations (3 pts)',
            'Correct cost per GB (2 pts)',
            'Reasonable PCM lifetime estimate (4 pts)',
            'Well-justified recommendation with trade-off analysis (4 pts)',
          ],
          points: 13,
          topic: 'new-memory',
        },
      ],
    },
  ],
};

export const practiceExams: PracticeExam[] = [exam1, exam2, exam3];

export function getExamById(id: string): PracticeExam | undefined {
  return practiceExams.find((e) => e.id === id);
}
