export interface Topic {
  slug: string;
  title: string;
  lectures: string[];
  weight: 'post-midterm' | 'pre-midterm';
  icon: string;
  color: string;
  subtopics: string[];
  description: string;
}

export const topics: Topic[] = [
  // Post-midterm topics (~85% of final)
  {
    slug: 'branch-prediction',
    title: 'Branch Prediction',
    lectures: ['L10', 'L11'],
    weight: 'post-midterm',
    icon: '🎯',
    color: 'from-indigo-500 to-purple-600',
    description: 'Predict branch outcomes to keep the pipeline full',
    subtopics: [
      'Branch Target Buffer (BTB)',
      'Last-time (1-bit) predictor',
      '2-bit saturating counter',
      'Two-level global prediction (GHR + PHT)',
      'Gshare predictor (GHR XOR PC)',
      'Two-level local prediction',
      'Tournament/hybrid predictors',
      'Alpha 21264 predictor',
    ],
  },
  {
    slug: 'cache',
    title: 'Cache Design',
    lectures: ['L12', 'L13'],
    weight: 'post-midterm',
    icon: '💾',
    color: 'from-cyan-500 to-blue-600',
    description: 'Memory hierarchy, cache organization, and optimization',
    subtopics: [
      'SRAM vs DRAM',
      'Memory hierarchy & locality',
      'Direct-mapped cache',
      'Set-associative cache',
      'Cache metrics (AMAT, hit/miss rate)',
      'Replacement policies (LRU, random)',
      '3 Cs of cache misses',
      'Improving cache performance',
      'Non-blocking caches & MSHRs',
      'Write policies',
    ],
  },
  {
    slug: 'memory-systems',
    title: 'Memory Systems',
    lectures: ['L15', 'L16'],
    weight: 'post-midterm',
    icon: '🧠',
    color: 'from-emerald-500 to-teal-600',
    description: 'DRAM organization, timing, and scheduling',
    subtopics: [
      'DRAM organization (channel/DIMM/rank/chip/bank)',
      'Page mode DRAM & row buffer',
      'Row buffer hit/miss/conflict',
      'DRAM refresh (burst vs distributed)',
      'Bank interleaving & channels',
      'Address mapping',
      'DRAM scheduling (FCFS, FR-FCFS)',
      'Latency components',
    ],
  },
  {
    slug: 'new-memory',
    title: 'New Memory Technologies',
    lectures: ['L17', 'L18'],
    weight: 'post-midterm',
    icon: '⚡',
    color: 'from-amber-500 to-orange-600',
    description: 'PCM, hybrid memory, and emerging technologies',
    subtopics: [
      'DRAM scaling challenges',
      'Phase Change Memory (PCM)',
      'PCM advantages & disadvantages',
      'Hybrid memory systems (DRAM + PCM)',
      'Data allocation & movement',
      'Wear leveling',
    ],
  },
  {
    slug: 'hardware-security',
    title: 'Hardware Security',
    lectures: ['L18'],
    weight: 'post-midterm',
    icon: '🔒',
    color: 'from-red-500 to-rose-600',
    description: 'Side channel attacks and hardware vulnerabilities',
    subtopics: [
      'Side channel attacks overview',
      'Cache side channels (Prime+Probe, Flush+Reload)',
      'Memory side channels (DRAMA)',
      'Rowhammer',
      'Spectre & Meltdown',
      'Branch predictor side channels',
    ],
  },
  {
    slug: 'microarch-simulation',
    title: 'Microarch Simulation',
    lectures: ['L14'],
    weight: 'post-midterm',
    icon: '🔬',
    color: 'from-violet-500 to-purple-600',
    description: 'Simulation tools and methodologies for computer architecture',
    subtopics: [
      'Why simulate',
      'Simulation types',
      'Performance metrics',
      'Simulator design',
    ],
  },
  // Pre-midterm topics (~15% of final)
  {
    slug: 'fundamentals',
    title: 'Fundamental Concepts',
    lectures: ['L1', 'L2'],
    weight: 'pre-midterm',
    icon: '📐',
    color: 'from-slate-500 to-zinc-600',
    description: 'Von Neumann model, dataflow, and computation models',
    subtopics: [
      'Von Neumann model',
      'Dataflow computing',
      'Data flow advantages & disadvantages',
      'ISA vs Microarchitecture',
    ],
  },
  {
    slug: 'isa',
    title: 'Instruction Set Architecture',
    lectures: ['L3', 'L4', 'L5'],
    weight: 'pre-midterm',
    icon: '📋',
    color: 'from-slate-500 to-zinc-600',
    description: 'ISA design, addressing modes, CISC vs RISC',
    subtopics: [
      'Elements of an ISA',
      'Addressing modes',
      'Instruction processing styles (0/1/2/3 address)',
      'CISC vs RISC',
      'Fixed vs variable length instructions',
      'Uniform vs non-uniform decode',
      'Load/store vs register/memory',
    ],
  },
  {
    slug: 'pipelining',
    title: 'Pipelining & Dependencies',
    lectures: ['L5', 'L6', 'L7', 'L8'],
    weight: 'pre-midterm',
    icon: '🔗',
    color: 'from-slate-500 to-zinc-600',
    description: 'Pipeline design, data/control dependencies, forwarding',
    subtopics: [
      'Single-cycle machine (MIPS datapath)',
      'Pipelining basics (IF/ID/EX/MEM/WB)',
      'Pipeline throughput formulas',
      'Data dependencies (RAW, WAR, WAW)',
      'Data forwarding/bypassing',
      'Control dependencies',
      'Pipeline stalls and bubbles',
    ],
  },
  {
    slug: 'simd-and-multicore',
    title: 'SIMD, Multicore & Accelerators',
    lectures: ['L9', 'L10'],
    weight: 'pre-midterm',
    icon: '🔀',
    color: 'from-slate-500 to-zinc-600',
    description: 'Flynn\'s taxonomy, vectorization, systolic arrays, TPU',
    subtopics: [
      'Flynn\'s taxonomy (SISD/SIMD/MISD/MIMD)',
      'SIMD/vector processing',
      'Vector chaining',
      'Memory banking',
      'Amdahl\'s law',
      'Multi-core processors',
      'Systolic arrays',
      'TPU architecture',
    ],
  },
];

export const postMidtermTopics = topics.filter(t => t.weight === 'post-midterm');
export const preMidtermTopics = topics.filter(t => t.weight === 'pre-midterm');

export function getTopicBySlug(slug: string): Topic | undefined {
  return topics.find(t => t.slug === slug);
}
