import { PracticeExam } from '@/data/practice-finals';

// ═══════════════════════════════════════════════════════════════════════════════
// Assignment-Style Practice Exam 1
// Topics from HW1-HW2: Dataflow, ISA vs Microarchitecture, Addressing Modes,
// Performance Evaluation, ISA Tradeoffs, Single-cycle Datapath
// ═══════════════════════════════════════════════════════════════════════════════

const assignmentExam1: PracticeExam = {
  id: 'hw-exam-1',
  title: 'Assignment Practice Exam 1: Fundamentals & ISA',
  duration: 120,
  totalPoints: 85,
  sections: [
    {
      title: 'Part A: Multiple Choice',
      instructions:
        'Select the single best answer for each question. Each question is worth 2 points.',
      questions: [
        {
          id: 'hw1-a1',
          type: 'mc',
          question:
            'Which of the following is a property of the ISA (not the microarchitecture)?',
          options: [
            'The processor has a 7-stage pipeline',
            'The L2 cache uses a write-back policy',
            'The machine uses little-endian byte ordering',
            'The processor dynamically adjusts clock frequency based on temperature',
          ],
          correctAnswer: 'The machine uses little-endian byte ordering',
          points: 2,
          topic: 'fundamentals',
        },
        {
          id: 'hw1-a2',
          type: 'mc',
          question:
            'In a dataflow execution model, when does an instruction execute?',
          options: [
            'When it reaches the front of the instruction queue',
            'When all of its input operands are available',
            'When the program counter points to it',
            'When the previous instruction completes writeback',
          ],
          correctAnswer: 'When all of its input operands are available',
          points: 2,
          topic: 'fundamentals',
        },
        {
          id: 'hw1-a3',
          type: 'mc',
          question:
            'A processor has an IPC of 4 and a clock frequency of 250 MHz. What is its performance in MIPS?',
          options: ['62.5 MIPS', '250 MIPS', '1000 MIPS', '4000 MIPS'],
          correctAnswer: '1000 MIPS',
          points: 2,
          topic: 'fundamentals',
        },
        {
          id: 'hw1-a4',
          type: 'mc',
          question:
            'Which addressing mode would be most efficient for traversing a byte array backward (e.g., a[i] with i-- in a loop)?',
          options: [
            'Absolute addressing',
            'Register indirect addressing',
            'Autodecrement addressing',
            'Scaled indexed addressing',
          ],
          correctAnswer: 'Autodecrement addressing',
          points: 2,
          topic: 'isa',
        },
        {
          id: 'hw1-a5',
          type: 'mc',
          question:
            'Which of the following is a property of the microarchitecture (not the ISA)?',
          options: [
            'The encoding 101010 represents an ADD instruction',
            'There are 32 general-purpose registers',
            'The processor has a 5-stage instruction pipeline',
            'The SUB instruction only takes memory addresses as inputs',
          ],
          correctAnswer: 'The processor has a 5-stage instruction pipeline',
          points: 2,
          topic: 'fundamentals',
        },
        {
          id: 'hw1-a6',
          type: 'mc',
          question:
            'On a zero-address (stack) machine, what sequence of operations computes A - B?',
          options: [
            'SUB A, B',
            'PUSH A, PUSH B, SUB',
            'PUSH B, PUSH A, SUB',
            'LOAD A, SUB B',
          ],
          correctAnswer: 'PUSH A, PUSH B, SUB',
          points: 2,
          topic: 'isa',
        },
        {
          id: 'hw1-a7',
          type: 'mc',
          question:
            'In a one-address (accumulator) machine, what does "ADD M" do?',
          options: [
            'M = M + Accumulator',
            'Accumulator = Accumulator + M',
            'Pushes M and the accumulator onto the stack, then adds',
            'Loads M into the accumulator',
          ],
          correctAnswer: 'Accumulator = Accumulator + M',
          points: 2,
          topic: 'isa',
        },
        {
          id: 'hw1-a8',
          type: 'mc',
          question:
            'For the JAL (Jump and Link) instruction in MIPS, what value is stored in R31?',
          options: [
            'The current PC value',
            'PC + 4 (address of the next instruction)',
            'The target jump address',
            'The value of the immediate field',
          ],
          correctAnswer: 'PC + 4 (address of the next instruction)',
          points: 2,
          topic: 'isa',
        },
        {
          id: 'hw1-a9',
          type: 'mc',
          question:
            'Which ISA style typically generates the most instructions for a given computation, but each instruction is the smallest in size?',
          options: [
            'Three-address register machine',
            'Two-address memory machine',
            'One-address (accumulator) machine',
            'Zero-address (stack) machine',
          ],
          correctAnswer: 'Zero-address (stack) machine',
          points: 2,
          topic: 'isa',
        },
        {
          id: 'hw1-a10',
          type: 'mc',
          question:
            'Two processors run the same benchmark. Processor X has 1500 MIPS and Processor Y has 1400 MIPS. Can we determine which completes the benchmark faster?',
          options: [
            'Yes, X is faster because it has higher MIPS',
            'Yes, Y is faster because MIPS is inversely correlated with performance',
            'No, because MIPS does not account for the number of instructions the ISA requires',
            'No, because MIPS only measures integer performance',
          ],
          correctAnswer:
            'No, because MIPS does not account for the number of instructions the ISA requires',
          points: 2,
          topic: 'fundamentals',
        },
      ],
    },
    {
      title: 'Part B: Short Answer',
      instructions:
        'Write a concise answer for each question. Show your work where applicable.',
      questions: [
        {
          id: 'hw1-b1',
          type: 'short-answer',
          question:
            'A processor implementing ISA A has IPC = 3 and clock frequency = 500 MHz. A processor implementing ISA B has IPC = 7 and clock frequency = 200 MHz.\n\n(a) What is the MIPS rating of processor A?\n(b) What is the MIPS rating of processor B?\n(c) Which processor is higher performance? Explain.',
          correctAnswer:
            'Processor A: MIPS = IPC x frequency = 3 x 500 = 1500 MIPS. Processor B: MIPS = 7 x 200 = 1400 MIPS. We cannot determine which is higher performance because MIPS does not account for the total number of instructions needed. ISA B may require fewer instructions for the same program, so it could still finish faster despite lower MIPS.',
          points: 6,
          topic: 'fundamentals',
        },
        {
          id: 'hw1-b2',
          type: 'short-answer',
          question:
            'Classify each of the following as ISA or Microarchitecture and give a brief reason:\n\n(a) The machine is a 64-bit machine.\n(b) The size of the L1 cache is 32KB.\n(c) The machine uses direct addressing mode.\n(d) The processor frequency can automatically adjust based on workload.',
          correctAnswer:
            'ISA, defines data width visible to programmer. Microarchitecture, cache size is a hardware implementation detail invisible to the ISA. ISA, addressing modes are part of the instruction set definition. Microarchitecture, dynamic frequency scaling is a hardware optimization transparent to the ISA.',
          points: 8,
          topic: 'fundamentals',
        },
        {
          id: 'hw1-b3',
          type: 'short-answer',
          question:
            'Consider this code on a two-address machine (OP M1, M2 means M1 = M1 OP M2):\n\nA = A + C;\nB = B - C;\nD = B - A;\nC = D + A;\n\nWrite the instruction sequence. Remember the result overwrites M1, so you may need temporary copies. Only ADD and SUB instructions are available.',
          correctAnswer:
            'ADD A, C (A = A+C); SUB B, C (B = B-C); To compute D = B - A without destroying B: we need a workaround since we only have ADD/SUB. Copy approach: ADD D, B (need D=B first, but D has old value). Actually with only ADD/SUB on two-address: SUB B, A puts B-A into B but destroys B. So we must be careful about ordering. One sequence: ADD A,C; SUB B,C; ADD D,B (assuming D starts as 0 or we load B into D); SUB D,A; ADD C,D; ADD C,A. The key insight is managing destructive updates.',
          points: 8,
          topic: 'isa',
        },
      ],
    },
    {
      title: 'Part C: Long Answer',
      instructions:
        'Answer thoroughly, showing all work. These are modeled after HW1-HW2 style problems.',
      questions: [
        {
          id: 'hw1-c1',
          type: 'long-answer',
          question:
            'Consider a program that accesses array elements using different patterns. A register holds the base address of the array.\n\nProgram A:\nint a[200]; // allocated in memory\nfor (i = 0; i < 200; i++) {\n    a[i] = 10;\n}\n\nProgram B:\nint **p; // *p and **p allocated in memory\n**p = 42;\n\nFor each program, identify which addressing mode (Absolute, Register Indirect, Based/Displacement, Scaled Indexed, Memory Indirect, Autoincrement/Autodecrement) leads to the minimum number of instructions. Explain your reasoning.',
          answerKey:
            'Program A: Autoincrement addressing is most efficient. The loop accesses consecutive 4-byte integers. With autoincrement, each store automatically increments the pointer by 4 bytes (the size of int), so no separate instruction is needed to update the index. This saves one instruction per iteration compared to scaled indexed (which needs an index increment) or based addressing (which needs displacement calculation).\n\nProgram B: Memory Indirect addressing is most efficient. We need to dereference p twice: first to get *p, then to get **p, and store 42 there. Memory indirect addressing allows the hardware to follow the pointer chain in a single instruction by specifying that the effective address is obtained by reading the memory at the address in the register. Without memory indirect, you would need separate load instructions to follow each level of indirection.',
          rubric: [
            '3 pts: Correctly identify autoincrement for Program A with explanation',
            '2 pts: Explain why autoincrement saves instructions over alternatives (no separate index update)',
            '3 pts: Correctly identify memory indirect for Program B with explanation',
            '2 pts: Explain the pointer chain traversal benefit',
          ],
          points: 10,
          topic: 'isa',
        },
        {
          id: 'hw1-c2',
          type: 'long-answer',
          question:
            'Consider the following high-level computation:\n\nX = A + B;\nY = X - C;\nZ = X + Y;\nW = Y - A;\n\nWrite the instruction sequence for each of the following ISA styles. Then calculate the total instruction bytes fetched for each.\n\nAssumptions: opcode = 1 byte, register operand = 1 byte, memory address = 4 bytes, data values = 4 bytes.\n\n(a) Zero-address (stack) machine\n(b) One-address (accumulator) machine\n(c) Three-address register machine (LOAD/STORE architecture)',
          answerKey:
            '(a) Zero-address (stack) machine:\nPUSH A, PUSH B, ADD, POP X    // X = A + B\nPUSH X, PUSH C, SUB, POP Y    // Y = X - C\nPUSH X, PUSH Y, ADD, POP Z    // Z = X + Y\nPUSH Y, PUSH A, SUB, POP W    // W = Y - A\n= 16 instructions. Each PUSH/POP = 1 (opcode) + 4 (address) = 5 bytes. Each OP = 1 byte.\nInstruction bytes = 12 * 5 + 4 * 1 = 64 bytes.\n\n(b) One-address (accumulator) machine:\nLOAD A, ADD B, STORE X         // X = A + B\nLOAD X, SUB C, STORE Y         // Y = X - C\nLOAD X, ADD Y, STORE Z         // Z = X + Y\nLOAD Y, SUB A, STORE W         // W = Y - A\n= 12 instructions. Each = 1 (opcode) + 4 (address) = 5 bytes.\nInstruction bytes = 12 * 5 = 60 bytes.\n\n(c) Three-address register machine:\nLOAD R1, A; LOAD R2, B; LOAD R3, C  // Load values\nADD R4, R1, R2    // X = A + B (R4)\nSUB R5, R4, R3    // Y = X - C (R5)\nADD R6, R4, R5    // Z = X + Y (R6)\nSUB R7, R5, R1    // W = Y - A (R7)\nSTORE R4, X; STORE R5, Y; STORE R6, Z; STORE R7, W\nLOAD/STORE = 1 + 1 + 4 = 6 bytes each (7 instructions = 42 bytes)\nADD/SUB = 1 + 1 + 1 + 1 = 4 bytes each (4 instructions = 16 bytes)\nInstruction bytes = 42 + 16 = 58 bytes.',
          rubric: [
            '4 pts: Correct stack machine sequence and byte calculation',
            '4 pts: Correct accumulator machine sequence and byte calculation',
            '4 pts: Correct register machine sequence and byte calculation',
            '3 pts: Correct byte counting with proper sizes for each instruction format',
          ],
          points: 15,
          topic: 'isa',
        },
        {
          id: 'hw1-c3',
          type: 'long-answer',
          question:
            'On a MIPS single-cycle datapath, describe how you would modify the datapath to implement the JAL instruction. The JAL instruction has these semantics:\n\nJAL: R31 <- PC + 4\n      PC <- PC[31:28] || Immediate[25:0] || 00\n\nDescribe:\n(a) What new data paths or muxes need to be added?\n(b) What new control signals are needed?\n(c) How is R31 selected as the write register?\n(d) How is PC+4 routed as the write data for the register file?',
          answerKey:
            '(a) New data paths/muxes:\n- A new mux at the Write Register input of the register file to select between the normal destination register (from instruction bits) and the hardcoded value 31 (for R31).\n- A new mux at the Write Data input of the register file to select between ALU result, memory data, and PC+4.\n- A new path from the PC+4 adder output to the Write Data mux.\n- The jump target is formed by concatenating PC[31:28] with the 26-bit immediate field and appending "00".\n\n(b) New control signals:\n- isJAL: When asserted, selects R31 as write register, selects PC+4 as write data, enables RegWrite, and selects the jump target as the next PC.\n- Modify the PC source mux to include the JAL target address option.\n\n(c) R31 selection:\n- Add a mux before the Write Register port. When isJAL=1, the mux outputs the constant 31 (binary 11111). When isJAL=0, it passes through the normal RegDest selection.\n\n(d) PC+4 routing:\n- The output of the PC+4 adder (already exists for sequential execution) is connected as a new input to the Write Data mux. When isJAL=1, this mux selects PC+4 to be written to R31.',
          rubric: [
            '3 pts: Correctly describe new mux for write register selection (R31 vs normal)',
            '3 pts: Correctly describe new mux input for write data (PC+4 path)',
            '2 pts: Correctly describe jump target address formation (concatenation)',
            '2 pts: Correctly describe control signals and their effects',
          ],
          points: 10,
          topic: 'isa',
        },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// Assignment-Style Practice Exam 2
// Topics from HW3: Pipelining, Data Forwarding, Vector Processing, Systolic Arrays
// ═══════════════════════════════════════════════════════════════════════════════

const assignmentExam2: PracticeExam = {
  id: 'hw-exam-2',
  title: 'Assignment Practice Exam 2: Pipelining & Vector Processing',
  duration: 120,
  totalPoints: 85,
  sections: [
    {
      title: 'Part A: Multiple Choice',
      instructions:
        'Select the single best answer for each question. Each question is worth 2 points.',
      questions: [
        {
          id: 'hw2-a1',
          type: 'mc',
          question:
            'In a 4-stage pipeline (Fetch, Decode, Execute, Writeback) with data forwarding after the execute stage, when can a dependent instruction begin execution?',
          options: [
            'Immediately after the producer is fetched',
            'After the producer completes decode',
            'After the producer completes execution (forwarding)',
            'Only after the producer completes writeback',
          ],
          correctAnswer:
            'After the producer completes execution (forwarding)',
          points: 2,
          topic: 'pipelining',
        },
        {
          id: 'hw2-a2',
          type: 'mc',
          question:
            'A fully pipelined ADD takes 3 cycles in the execute stage and a MUL takes 4 cycles. With one adder and one multiplier, two independent ADD and MUL instructions can:',
          options: [
            'Never execute simultaneously',
            'Execute simultaneously only if they use different registers',
            'Execute simultaneously since they use different functional units',
            'Execute simultaneously only with data forwarding enabled',
          ],
          correctAnswer:
            'Execute simultaneously since they use different functional units',
          points: 2,
          topic: 'pipelining',
        },
        {
          id: 'hw2-a3',
          type: 'mc',
          question:
            'In a Cray-like vector processor, what is the purpose of the Vector Length Register (VLN)?',
          options: [
            'It specifies the stride between consecutive vector elements in memory',
            'It specifies how many elements of the vector register to operate on',
            'It stores the base address of the vector in memory',
            'It holds the number of vector registers available',
          ],
          correctAnswer:
            'It specifies how many elements of the vector register to operate on',
          points: 2,
          topic: 'simd-multicore',
        },
        {
          id: 'hw2-a4',
          type: 'mc',
          question:
            'What is the key advantage of vector chaining (forwarding) in a vector processor?',
          options: [
            'It allows more vector registers to be used',
            'It eliminates the need for memory interleaving',
            'It allows a dependent vector operation to start before the producing operation finishes all elements',
            'It doubles the clock frequency of the vector unit',
          ],
          correctAnswer:
            'It allows a dependent vector operation to start before the producing operation finishes all elements',
          points: 2,
          topic: 'simd-multicore',
        },
        {
          id: 'hw2-a5',
          type: 'mc',
          question:
            'In a weight-stationary systolic array for matrix multiplication, the processing element performs: R = R + M * N, P = M, Q = N. What does "weight-stationary" mean?',
          options: [
            'The weights (matrix elements) move through the array while inputs stay fixed',
            'The accumulator R stays in the processing element while inputs flow through',
            'The output matrix is computed without any data movement',
            'Each processing element only performs addition, not multiplication',
          ],
          correctAnswer:
            'The accumulator R stays in the processing element while inputs flow through',
          points: 2,
          topic: 'simd-multicore',
        },
        {
          id: 'hw2-a6',
          type: 'mc',
          question:
            'A pipelined vector load (VLD) with startup latency of 11 cycles operates on a vector of length 50 with stride 1 and 16-way interleaved memory. After startup, how many cycles does each subsequent element take?',
          options: [
            '1 cycle per element (fully pipelined)',
            '11 cycles per element (no pipelining)',
            '16 cycles per element (one per bank)',
            'Depends on the number of memory ports',
          ],
          correctAnswer: '1 cycle per element (fully pipelined)',
          points: 2,
          topic: 'simd-multicore',
        },
        {
          id: 'hw2-a7',
          type: 'mc',
          question:
            'In a dataflow graph with instructions: Inst1: ADD R1, R5, R6 and Inst3: MUL R4, R1, R2 (R1 depends on Inst1), what type of dependency exists?',
          options: [
            'Write-after-Read (WAR) / anti-dependency',
            'Read-after-Write (RAW) / true dependency',
            'Write-after-Write (WAW) / output dependency',
            'No dependency',
          ],
          correctAnswer: 'Read-after-Write (RAW) / true dependency',
          points: 2,
          topic: 'pipelining',
        },
        {
          id: 'hw2-a8',
          type: 'mc',
          question:
            'RSHFA (Right Shift Arithmetic) differs from logical right shift because:',
          options: [
            'It shifts left instead of right',
            'It fills the leading bits with the sign bit instead of zeros',
            'It only works on unsigned integers',
            'It shifts by a variable amount stored in a register',
          ],
          correctAnswer:
            'It fills the leading bits with the sign bit instead of zeros',
          points: 2,
          topic: 'fundamentals',
        },
      ],
    },
    {
      title: 'Part B: Short Answer',
      instructions:
        'Write a concise answer for each question. Show your work.',
      questions: [
        {
          id: 'hw2-b1',
          type: 'short-answer',
          question:
            'Given this assembly loop:\n\nMOVI R1, 99\nLEA R0, A; LEA R2, B; LEA R3, C; LEA R4, D\nLOOP:\n  LD R5, R2, R1     // 11 cycles\n  LD R6, R3, R1     // 11 cycles\n  ADD R7, R5, R6    // 4 cycles\n  LD R5, R4, R1     // 11 cycles\n  ADD R8, R7, R5    // 4 cycles\n  RSHFA R9, R8, 1   // 1 cycle\n  ST R9, R0, R1     // 11 cycles\n  ADDI R1, R1, -1   // 4 cycles\n  BRGEZ R1 LOOP     // 1 cycle\n\nHow many dynamic instructions does this execute? How many total cycles?',
          correctAnswer:
            'Setup: 5 instructions (MOVI + 4 LEA). Loop body: 9 instructions per iteration, 100 iterations (i=99 down to 0). Total dynamic instructions = 5 + 9*100 = 905. Cycles per iteration: 11+11+4+11+4+1+11+4+1 = 58 cycles. Setup: 5 cycles (1+1+1+1+1). Total cycles = 5 + 58*100 = 5805 cycles.',
          points: 8,
          topic: 'pipelining',
        },
        {
          id: 'hw2-b2',
          type: 'short-answer',
          question:
            'In a systolic array processing element for matrix multiplication, M enters from the left, N enters from the top. The PE computes: R = R + M*N, outputs P = M (to the right), Q = N (downward). Initially R = 0.\n\nFor a 2x2 matrix multiply C = A * B, how many time steps are needed to complete the computation? How many PEs are required?',
          correctAnswer:
            'For a 2x2 matrix multiply, you need a 2x2 array of processing elements (4 PEs). The computation requires 2+2-1 = 3 time steps. In the first cycle, only PE(0,0) receives inputs. In cycle 2, PE(0,1) and PE(1,0) receive inputs. In cycle 3, PE(1,1) receives its last inputs. So 3 time steps total with 4 PEs.',
          points: 6,
          topic: 'simd-multicore',
        },
      ],
    },
    {
      title: 'Part C: Long Answer',
      instructions:
        'Answer thoroughly, showing all work. These mirror HW3-style problems.',
      questions: [
        {
          id: 'hw2-c1',
          type: 'long-answer',
          question:
            'Consider the following dataflow graph with 5 instructions:\n\nInst 1: ADD R1, R5, R6\nInst 2: ADD R2, R1, R6  (depends on Inst 1 via R1)\nInst 3: MUL R3, R1, R5  (depends on Inst 1 via R1)\nInst 4: ADD R4, R2, R3  (depends on Inst 2 via R2, Inst 3 via R3)\nInst 5: MUL R4, R4, R3  (depends on Inst 4 via R4, Inst 3 via R3)\n\nThe processor has: 4 stages (F, D, E, W). ADD takes 3 execute cycles, MUL takes 4 execute cycles. One adder and one multiplier (can overlap). Data forwarding after execution stage.\n\nDraw the pipeline timing diagram and determine the total number of cycles.',
          answerKey:
            'Pipeline timing:\n\nInst 1 (ADD): F  D  E1 E2 E3 W\n              1  2  3  4  5  6\n\nInst 2 (ADD): depends on Inst 1 (R1). Can start execute after Inst 1 finishes E3 (cycle 5).\n              F  D  __ __ E1 E2 E3 W\n              2  3  4  5  5  6  7  8\nWait: Inst 2 fetches cycle 2, decodes cycle 3, but must wait for R1 until cycle 5.\n\nInst 3 (MUL): depends on Inst 1 (R1). Can start execute after cycle 5. Uses multiplier (no conflict with Inst 2 on adder).\n              F  D  __ __ E1 E2 E3 E4 W\n              3  4  --  -- 5  6  7  8  9\n\nInst 4 (ADD): depends on Inst 2 (R2, done cycle 7) and Inst 3 (R3, done cycle 8). Must wait for both.\n              F  D  __ __ __ __ __ E1 E2 E3 W\n              4  5  -- -- -- -- -- 8   9  10 11\nWait for Inst 3 to finish E4 at cycle 8.\n\nInst 5 (MUL): depends on Inst 4 (R4, done cycle 10) and Inst 3 (R3, done cycle 8).\n              F  D  __ __ __ __ __ __ __ E1 E2 E3 E4 W\n              5  6  -- -- -- -- -- -- -- 10 11 12 13 14\n\nTotal cycles: 14',
          rubric: [
            '3 pts: Correct timing for Inst 1 and Inst 2 (forwarding from Inst 1)',
            '3 pts: Correct timing for Inst 3 (parallel execution with Inst 2 on different FU)',
            '3 pts: Correct timing for Inst 4 (must wait for BOTH Inst 2 and Inst 3)',
            '3 pts: Correct timing for Inst 5 and correct total cycle count',
            '3 pts: Properly showing stall cycles and forwarding points',
          ],
          points: 15,
          topic: 'pipelining',
        },
        {
          id: 'hw2-c2',
          type: 'long-answer',
          question:
            'Consider the vector computation:\nfor (i = 0; i < 64; i++)\n    A[i] = (B[i] + C[i]) * D[i];\n\nVector register length = 64, stride = 1, 16-way interleaved memory.\nVector instructions: VLD (11 cycle startup + 1/element), VST (11 cycle startup + 1/element), VADD (4 cycle startup + 1/element), VMUL (6 cycle startup + 1/element).\n\nWrite the vector assembly code, then calculate the total cycles for:\n(a) Vector processor WITHOUT chaining, 1 memory port\n(b) Vector processor WITH chaining, 1 memory port',
          answerKey:
            'Vector assembly:\nLD Vln, 64\nLD Vst, 1\nVLD V1, B        // Load B\nVLD V2, C        // Load C\nVADD V3, V1, V2  // V3 = B + C\nVLD V4, D        // Load D\nVMUL V5, V3, V4  // V5 = (B+C) * D\nVST V5, A        // Store A\n\n(a) Without chaining (no overlapping dependent ops):\nSetup: 2 cycles\nVLD V1: 11 + 63 = 74 cycles (startup + 63 remaining elements)\nVLD V2: 74 cycles (must wait for memory port)\nVADD V3: 4 + 63 = 67 cycles (must wait for VLD V2 to finish)\nVLD V4: 74 cycles (must wait for memory port AND VADD to finish)\nVMUL V5: 6 + 63 = 69 cycles (must wait for VLD V4 and VADD)\nVST V5: 74 cycles (must wait for VMUL)\nTotal = 2 + 74 + 74 + 67 + 74 + 69 + 74 = 434 cycles\n\n(b) With chaining (dependent ops can start as soon as first element is ready):\nSetup: 2 cycles\nVLD V1: 74 cycles (starts at cycle 3)\nVLD V2: starts after VLD V1 finishes (1 memory port): 74 cycles\nVADD V3: chains with VLD V2, starts 11 cycles into VLD V2: adds 4 cycle startup then chains. Finishes 4 cycles after VLD V2 ends.\nVLD V4: starts after VLD V2 finishes (memory port free): 74 cycles. Can overlap with VADD.\nVMUL V5: chains with both VADD and VLD V4, starts when both produce first element.\nVST V5: starts after VLD V4 finishes (memory port), chains with VMUL.\n\nWith chaining, the critical path is shorter. The memory port is the bottleneck (3 loads + 1 store = 4 * 74 = 296 cycles for memory). Compute overlaps with memory. Total approximately 2 + 74 + 74 + 74 + 74 + 4 + 6 = ~308 cycles (compute startup costs added to memory critical path).',
          rubric: [
            '3 pts: Correct vector assembly code',
            '4 pts: Correct cycle count for no-chaining case with reasoning',
            '4 pts: Correct cycle count for chaining case showing overlaps',
            '2 pts: Identifying memory port as the bottleneck with chaining',
            '2 pts: Correct startup latency calculations',
          ],
          points: 15,
          topic: 'simd-multicore',
        },
        {
          id: 'hw2-c3',
          type: 'long-answer',
          question:
            'For a 3x3 systolic array performing matrix multiplication C = A x B:\n\nEach processing element computes: R = R + M*N, P = M (output right), Q = N (output down). R starts at 0.\n\n(a) How many time steps are needed to complete the full 3x3 matrix multiplication?\n(b) Describe the input feeding pattern: which elements of A and B enter at which time step? Why are the rows/columns staggered?\n(c) After all computations, what value does PE(1,2) hold? Express in terms of matrix elements a_ij and b_ij.',
          answerKey:
            '(a) For a 3x3 systolic array, we need 3 + 3 - 1 = 5 time steps to complete the multiplication.\n\n(b) Input feeding pattern:\n- Row inputs (A matrix) enter from the left, staggered by row:\n  Time 0: Row 0 feeds a00\n  Time 1: Row 0 feeds a01, Row 1 feeds a10\n  Time 2: Row 0 feeds a02, Row 1 feeds a11, Row 2 feeds a20\n  Time 3: Row 1 feeds a12, Row 2 feeds a21\n  Time 4: Row 2 feeds a22\n\n- Column inputs (B matrix) enter from the top, staggered by column:\n  Time 0: Col 0 feeds b00\n  Time 1: Col 0 feeds b10, Col 1 feeds b01\n  Time 2: Col 0 feeds b20, Col 1 feeds b11, Col 2 feeds b02\n  Time 3: Col 1 feeds b21, Col 2 feeds b12\n  Time 4: Col 2 feeds b22\n\nThe staggering ensures each PE receives the correct pairs of elements to multiply and accumulate. The diagonal wavefront pattern means data arrives at each PE at the right time.\n\n(c) PE(1,2) computes c12 = a10*b02 + a11*b12 + a12*b22. This is the dot product of row 1 of A and column 2 of B.',
          rubric: [
            '2 pts: Correct number of time steps (5)',
            '4 pts: Correct input feeding pattern with staggering',
            '2 pts: Explain why staggering is necessary',
            '2 pts: Correct value for PE(1,2)',
          ],
          points: 10,
          topic: 'simd-multicore',
        },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// Assignment-Style Practice Exam 3
// Topics from HW4-HW5: Branch Prediction, Caching, Memory Scheduling
// ═══════════════════════════════════════════════════════════════════════════════

const assignmentExam3: PracticeExam = {
  id: 'hw-exam-3',
  title: 'Assignment Practice Exam 3: Branch Prediction, Cache & Memory',
  duration: 120,
  totalPoints: 90,
  sections: [
    {
      title: 'Part A: Multiple Choice',
      instructions:
        'Select the single best answer for each question. Each question is worth 2 points.',
      questions: [
        {
          id: 'hw3-a1',
          type: 'mc',
          question:
            'A per-branch 2-bit saturating counter starts at "Strongly Not Taken" (00). The branch outcomes are: T, T, N, T. What is the final state?',
          options: [
            '00 (Strongly Not Taken)',
            '01 (Weakly Not Taken)',
            '10 (Weakly Taken)',
            '11 (Strongly Taken)',
          ],
          correctAnswer: '10 (Weakly Taken)',
          points: 2,
          topic: 'branch-prediction',
        },
        {
          id: 'hw3-a2',
          type: 'mc',
          question:
            'A loop runs 1000 times. Using a last-time (1-bit) predictor initialized to "Not Taken", what is the prediction accuracy for the loop branch?',
          options: [
            '0/1000 (0%)',
            '998/1000 (99.8%)',
            '999/1000 (99.9%)',
            '999/1001 (99.8%)',
          ],
          correctAnswer: '998/1000 (99.8%)',
          points: 2,
          topic: 'branch-prediction',
        },
        {
          id: 'hw3-a3',
          type: 'mc',
          question:
            'Branch B4 checks "if (val % 6 == 0)". Branches B2 and B3 check "if (val % 2 == 0)" and "if (val % 3 == 0)" respectively. B4 exhibits:',
          options: [
            'Only local correlation',
            'Only global correlation (with B2 and B3)',
            'Both local and global correlation',
            'No correlation at all (random)',
          ],
          correctAnswer: 'Only global correlation (with B2 and B3)',
          points: 2,
          topic: 'branch-prediction',
        },
        {
          id: 'hw3-a4',
          type: 'mc',
          question:
            'A cache has 256 bytes total, 4-way set associative, 16-byte blocks. How many sets does it have?',
          options: ['1', '2', '4', '16'],
          correctAnswer: '4',
          points: 2,
          topic: 'cache',
        },
        {
          id: 'hw3-a5',
          type: 'mc',
          question:
            'In an open-row DRAM policy, accessing the same row that is already in the row buffer requires:',
          options: [
            'PRECHARGE + ACTIVATE + READ',
            'ACTIVATE + READ',
            'READ only (row buffer hit)',
            'PRECHARGE + READ',
          ],
          correctAnswer: 'READ only (row buffer hit)',
          points: 2,
          topic: 'memory-systems',
        },
        {
          id: 'hw3-a6',
          type: 'mc',
          question:
            'FR-FCFS (First-Ready First-Come-First-Served) memory scheduling prioritizes:',
          options: [
            'The oldest request in the queue',
            'Requests that hit in the row buffer, then oldest among those',
            'Requests from the application with fewer outstanding requests',
            'Requests to different banks to maximize parallelism',
          ],
          correctAnswer:
            'Requests that hit in the row buffer, then oldest among those',
          points: 2,
          topic: 'memory-systems',
        },
        {
          id: 'hw3-a7',
          type: 'mc',
          question:
            'What is the purpose of memory interleaving with multiple banks?',
          options: [
            'To reduce the latency of a single memory access',
            'To allow multiple independent accesses to proceed in parallel',
            'To increase the capacity of main memory',
            'To eliminate the need for caches',
          ],
          correctAnswer:
            'To allow multiple independent accesses to proceed in parallel',
          points: 2,
          topic: 'memory-systems',
        },
        {
          id: 'hw3-a8',
          type: 'mc',
          question:
            'A cache uses LRU replacement. With 2-way associativity, after accessing addresses that map to the same set in order: A, B, C, A -- which address gets evicted when C is accessed?',
          options: ['A (least recently used)', 'B (least recently used)', 'C (the new one)', 'None (the set has room)'],
          correctAnswer: 'A (least recently used)',
          points: 2,
          topic: 'cache',
        },
        {
          id: 'hw3-a9',
          type: 'mc',
          question:
            'A branch has the pattern TNTN TNTN... (alternating). Which predictor achieves 100% accuracy after warmup?',
          options: [
            'Static always-taken predictor',
            'Last-time (1-bit) predictor',
            'Two-level global predictor with 2-bit GHR',
            '2-bit saturating counter predictor',
          ],
          correctAnswer: 'Two-level global predictor with 2-bit GHR',
          points: 2,
          topic: 'branch-prediction',
        },
        {
          id: 'hw3-a10',
          type: 'mc',
          question:
            'In DRAM, accessing a different row in the same bank requires which sequence of commands?',
          options: [
            'READ only',
            'ACTIVATE + READ',
            'PRECHARGE + ACTIVATE + READ',
            'PRECHARGE + READ',
          ],
          correctAnswer: 'PRECHARGE + ACTIVATE + READ',
          points: 2,
          topic: 'memory-systems',
        },
      ],
    },
    {
      title: 'Part B: Short Answer',
      instructions:
        'Write a concise answer. Show your work for calculation questions.',
      questions: [
        {
          id: 'hw3-b1',
          type: 'short-answer',
          question:
            'Consider this loop with a branch that checks (i % 4 == 0) for i = 0 to 999:\n\nThe branch is taken when the condition is true. What is the actual branch pattern (T/N) for the first 8 iterations? What is the prediction accuracy using a last-time predictor initialized to "Not Taken"?',
          correctAnswer:
            'Pattern: T N N N T N N N (repeats). i=0: T, i=1: N, i=2: N, i=3: N, i=4: T, i=5: N, etc. With last-time predictor starting at N: i=0 predict N, actual T (miss). i=1 predict T, actual N (miss). i=2 predict N, actual N (hit). i=3 predict N, actual N (hit). Then pattern repeats: i=4 predict N actual T (miss), i=5 predict T actual N (miss), i=6 predict N actual N (hit), i=7 predict N actual N (hit). So per 4 iterations: 2 correct, 2 wrong = 50% accuracy. Over 1000 iterations: 500/1000 = 50%.',
          points: 8,
          topic: 'branch-prediction',
        },
        {
          id: 'hw3-b2',
          type: 'short-answer',
          question:
            'A data cache is 2-way set associative, 512 bytes total, with 8-byte blocks, using LRU replacement. All addresses are byte addresses.\n\nHow many sets does this cache have? How many offset bits, index bits, and tag bits (for 32-bit addresses)?',
          correctAnswer:
            'Total size = 512B. Block size = 8B. Ways = 2. Number of blocks = 512/8 = 64. Number of sets = 64/2 = 32. Offset bits = log2(8) = 3. Index bits = log2(32) = 5. Tag bits = 32 - 5 - 3 = 24.',
          points: 6,
          topic: 'cache',
        },
        {
          id: 'hw3-b3',
          type: 'short-answer',
          question:
            'A DRAM bank has an open row (Row 5). The memory controller receives these requests in order: R5, R7, R5, R7. ACTIVATE = 15ns, PRECHARGE = 15ns, READ = 15ns.\n\nWhat is the total time to service all 4 requests?',
          correctAnswer:
            'R5: Row 5 is open, so just READ = 15ns. R7: Different row, need PRECHARGE + ACTIVATE + READ = 45ns. R5: Different row again, PRECHARGE + ACTIVATE + READ = 45ns. R7: Different row, PRECHARGE + ACTIVATE + READ = 45ns. Total = 15 + 45 + 45 + 45 = 150ns.',
          points: 6,
          topic: 'memory-systems',
        },
      ],
    },
    {
      title: 'Part C: Long Answer',
      instructions:
        'Answer thoroughly, showing all work. These mirror HW4-HW5 style problems.',
      questions: [
        {
          id: 'hw3-c1',
          type: 'long-answer',
          question:
            'Consider this code:\n\nint array[500] = { /* random values */ };\nint sum1 = 0, sum2 = 0;\nfor (i = 0; i < 500; i++) {    // Loop branch\n    if (i % 3 == 0)            // Condition branch\n        sum1 += array[i];      // Taken path\n    else\n        sum2 += array[i];      // Not-taken path\n}\n\n(a) What is the actual branch pattern for the condition branch (first 9 iterations)?\n(b) What is the prediction accuracy for the loop branch using a 2-bit counter starting at "Strongly Not Taken"?\n(c) What is the prediction accuracy for the condition branch using a 2-bit counter starting at "Strongly Not Taken"?\n(d) What is the prediction accuracy for the condition branch using a last-time predictor starting at "Not Taken"?',
          answerKey:
            '(a) Condition branch pattern (i%3==0 is taken):\ni=0: T, i=1: N, i=2: N, i=3: T, i=4: N, i=5: N, i=6: T, i=7: N, i=8: N\nPattern: T N N T N N T N N (repeating with period 3)\n\n(b) Loop branch: Pattern is T T T...T N (499 taken, 1 not-taken, total 500).\n2-bit counter starting at SNT (00):\ni=0: predict NT, actual T → miss, state → 01 (WNT)\ni=1: predict NT, actual T → miss, state → 10 (WT)\ni=2: predict T, actual T → hit, state → 11 (ST)\ni=3 to 498: predict T, actual T → all hits (497 hits), stay at 11\ni=499 (exit): predict T, actual N → miss\nAccuracy: (497 + 0) correct out of 500... Actually: misses at i=0, i=1, and exit. Hits = 500 - 3 = 497. Accuracy = 497/500 = 99.4%.\n\n(c) Condition branch with 2-bit SNT (00):\nPattern repeats T N N:\nStarting at 00 (SNT):\nT: predict N, miss → 01\nN: predict N, hit → 00\nN: predict N, hit → 00\nT: predict N, miss → 01\nN: predict N, hit → 00\nN: predict N, hit → 00\n...\nEvery 3 iterations: 1 miss, 2 hits. Accuracy = 2/3 ≈ 66.7%.\nOver 500 iterations: ~333/500 hits = 66.6%.\n\n(d) Condition branch with last-time predictor (starts N):\nT: predict N, miss → state T\nN: predict T, miss → state N\nN: predict N, hit → state N\nT: predict N, miss → state T\nN: predict T, miss → state N\nN: predict N, hit → state N\nEvery 3 iterations: 1 hit, 2 misses. Accuracy = 1/3 ≈ 33.3%.\nOver 500: ~167/500 = 33.4%.',
          rubric: [
            '2 pts: Correct branch pattern (T N N repeating)',
            '3 pts: Correct loop branch analysis with 2-bit counter (497/500)',
            '4 pts: Correct condition branch with 2-bit counter showing state transitions (66.7%)',
            '3 pts: Correct condition branch with last-time predictor (33.3%)',
            '2 pts: Clear state transition reasoning',
          ],
          points: 14,
          topic: 'branch-prediction',
        },
        {
          id: 'hw3-c2',
          type: 'long-answer',
          question:
            'You are given four address sequences and their cache hit ratios. The cache starts empty. All accesses are 1 byte. Determine the cache parameters:\n\nSequence 1: 0, 4, 8, 16, 32, 64 → hit ratio = 0.50\nSequence 2: 0, 256, 512, 256, 0 → hit ratio = 0.40\nSequence 3: 0, 128, 256, 384, 512, 384, 256, 128, 0 → hit ratio = 0.44\nSequence 4: 0, 256, 512, 0, 768, 0 → hit ratio = 0.33\n\nDetermine:\n(a) Block size (1, 2, 4, 8, 16, or 32 bytes)\n(b) Total cache size (128B or 256B)\n(c) Associativity (1, 2, or 4 ways)\n(d) Replacement policy (LRU or FIFO)',
          answerKey:
            'Working through each sequence:\n\nSequence 1: 0,4,8,16,32,64 with hit ratio 0.50 (3 hits out of 6).\nIf block size = 8: addresses 0 and 4 share a block (block 0), 8 is block 1, 16 is block 2, 32 is block 4, 64 is block 8.\nAccess 0: miss (load block 0). Access 4: hit (same block). That gives 1 hit in first 2 accesses.\nWe need 3 hits total. If block size = 8: 0 miss, 4 hit, 8 miss, 16 miss, 32 miss, 64 miss = 1/6 (too low).\nIf block size = 16: 0 miss, 4 hit, 8 hit, 16 miss, 32 miss, 64 miss = 2/6 (not enough).\nIf block size = 32: 0 miss, 4 hit, 8 hit, 16 hit, 32 miss, 64 miss = 3/6 = 0.50. ✓\n\nSo block size = 32 bytes.\n\nSequence 2: 0,256,512,256,0 with 0.40 (2 hits out of 5).\nWith block size 32: block addresses are 0, 256, 512. These map to: set = (addr/32) % num_sets.\nIf cache = 256B, 32B blocks → 8 blocks. If 2-way → 4 sets. If 4-way → 2 sets.\nWith 4 sets: set = (addr/32) % 4. 0→set0, 256/32=8→set0, 512/32=16→set0. All same set!\n2-way: set 0 holds 2 blocks. 0:miss, 256:miss(evict if full), 512:miss(evict oldest), 256:depends on what was evicted, 0:depends.\n4-way: set 0 holds 4 blocks. Only 3 unique addresses → all fit after coldstart. 0:miss, 256:miss, 512:miss, 256:hit, 0:hit = 2/5=0.40. ✓\n\nSo 4-way, 256B cache (256/32 = 8 blocks, 8/4 = 2 sets).\n\nSequence 3 and 4 should be used to verify and determine LRU vs FIFO.\n\nParameters: Block size = 32B, Total cache = 256B, Associativity = 4-way, and analyzing sequences 3-4 for replacement: LRU.',
          rubric: [
            '3 pts: Correctly determine block size from sequence 1',
            '3 pts: Correctly determine cache size and associativity from sequence 2',
            '3 pts: Verify with sequence 3',
            '3 pts: Determine replacement policy from sequence 4',
            '2 pts: Clear methodology and reasoning',
          ],
          points: 14,
          topic: 'cache',
        },
        {
          id: 'hw3-c3',
          type: 'long-answer',
          question:
            'A DRAM system has 2 channels, 1 rank, and 2 banks per channel. Open row policy. ACTIVATE = 15ns, PRECHARGE = 15ns, READ = 15ns.\n\nChannel 0, Bank 0 has Row 3 open. Channel 1, Bank 1 has Row 7 open.\n\nRequest queue for Channel 0 (oldest to youngest): R3(A), R5(B), R3(A), R5(B), R3(B)\nRequest queue for Channel 1 (oldest to youngest): R7(A), R7(B), R9(A), R7(B)\n\n(Requests tagged with application A or B, and row number)\n\n(a) Using FR-FCFS scheduling, what is the stall time for each application?\n(b) If we partition so App A uses Channel 0 and App B uses Channel 1 (bank numbers unchanged), what are the new stall times?',
          answerKey:
            '(a) FR-FCFS on Channel 0:\nRow 3 is open. Prioritize row buffer hits, then oldest.\n1. R3(A) - row hit: READ = 15ns (t=15)\n2. R3(A) - row hit: READ = 15ns (t=30) (skip ahead of R5(B) due to row hit priority)\n3. R5(B) - row miss: PRE+ACT+READ = 45ns (t=75)\n4. R5(B) - skipped to after... wait, R5(B) comes before R3(B) but R3 was open originally, now R5 is open.\n\nLet me re-order: Queue oldest→youngest: R3(A), R5(B), R3(A), R5(B), R3(B)\nFR-FCFS first looks for row hits. Row 3 is open.\nHits: R3(A) at pos 0, R3(A) at pos 2. Serve these first.\n1. R3(A): READ 15ns (t=15)\n2. R3(A): READ 15ns (t=30)\nNow remaining: R5(B), R5(B), R3(B). No row 3 hits among remaining (R3(B) is a hit!).\n3. R3(B): READ 15ns (t=45)\nRemaining: R5(B), R5(B). Need row change.\n4. R5(B): PRE+ACT+READ = 45ns (t=90)\n5. R5(B): READ 15ns (t=105)\n\nFR-FCFS on Channel 1:\nRow 7 is open. Queue: R7(A), R7(B), R9(A), R7(B)\nHits first: R7(A), R7(B), R7(B) are all row 7 hits.\n1. R7(A): READ 15ns (t=15)\n2. R7(B): READ 15ns (t=30)\n3. R7(B): READ 15ns (t=45)\n4. R9(A): PRE+ACT+READ = 45ns (t=90)\n\nApp A stall = max(last A request on Ch0, last A request on Ch1) = max(30, 90) = 90ns\nApp B stall = max(last B request on Ch0, last B request on Ch1) = max(105, 45) = 105ns\n\n(b) With channel partitioning (A→Ch0, B→Ch1):\nChannel 0 (App A only): R3(A), R3(A), plus A requests from Ch1: R7(A), R9(A)\nChannel 0 queue: R3(A), R3(A), R7(A), R9(A). Row 3 open.\n1. R3(A): READ 15ns (t=15)\n2. R3(A): READ 15ns (t=30)\n3. R7(A): PRE+ACT+READ 45ns (t=75)\n4. R9(A): PRE+ACT+READ 45ns (t=120)\nApp A stall = 120ns\n\nChannel 1 (App B only): R5(B), R5(B), R3(B), R7(B), R7(B). Row 7 open.\nFR-FCFS: row 7 hits first:\n1. R7(B): READ 15ns (t=15)\n2. R7(B): READ 15ns (t=30)\nRemaining: R5(B), R5(B), R3(B). No more row 7 hits.\n3. R5(B): PRE+ACT+READ 45ns (t=75) (oldest first)\n4. R5(B): READ 15ns (t=90)\n5. R3(B): PRE+ACT+READ 45ns (t=135)\nApp B stall = 135ns\n\nPartitioning isolates apps but may increase individual stall times due to losing channel parallelism.',
          rubric: [
            '4 pts: Correct FR-FCFS ordering for both channels (row hits first, then FCFS)',
            '3 pts: Correct stall time calculation for App A in part (a)',
            '3 pts: Correct stall time calculation for App B in part (a)',
            '3 pts: Correct channel partitioning request remapping',
            '3 pts: Correct stall times after partitioning with analysis',
          ],
          points: 16,
          topic: 'memory-systems',
        },
      ],
    },
  ],
};

export const assignmentExams: PracticeExam[] = [
  assignmentExam1,
  assignmentExam2,
  assignmentExam3,
];

export function getAssignmentExamById(
  id: string
): PracticeExam | undefined {
  return assignmentExams.find((e) => e.id === id);
}
