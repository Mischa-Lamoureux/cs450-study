export interface NoteSection {
  id: string;
  title: string;
  content: string; // HTML
  keyPoints: string[];
  examTip?: string;
}

export const notesContent: Record<string, NoteSection[]> = {
  'branch-prediction': [
    {
      id: 'bp-why',
      title: 'Why Branch Prediction Matters',
      content: `
        <p>Modern processors use deep pipelines (15-20+ stages). When a branch instruction is fetched, the outcome (taken/not-taken) and the target address are not known until several stages later. Without prediction, the processor must <b>stall</b> or <b>flush</b> incorrectly fetched instructions.</p>
        <ul>
          <li><b>Minimum branch penalty:</b> ~7 cycles in modern processors</li>
          <li><b>Typical misprediction penalty:</b> 11+ cycles (some architectures even more)</li>
          <li>Branches are ~20% of all instructions, so even small misprediction rates cause significant performance loss</li>
        </ul>
        <p>The goal: predict <i>direction</i> (taken vs. not-taken) and <i>target address</i> as early as possible, ideally at the fetch stage.</p>
      `,
      keyPoints: [
        'Branch penalty = number of pipeline stages wasted on misprediction',
        'Min penalty ~7 cycles, typical 11+ cycles',
        'Branches are ~20% of instructions — prediction accuracy is critical',
        'Must predict both direction AND target address',
      ],
      examTip: 'Know the difference between branch direction prediction and branch target prediction. Questions often ask you to calculate CPI impact of misprediction rate.',
    },
    {
      id: 'bp-btb',
      title: 'Branch Target Buffer (BTB)',
      content: `
        <p>The <b>Branch Target Buffer (BTB)</b> is a hardware cache that stores the <i>target address</i> of previously taken branches. It is indexed by the PC of the branch instruction.</p>
        <ul>
          <li>Lookup happens at <b>fetch stage</b> — before the instruction is even decoded</li>
          <li>If the PC is found in the BTB, the processor fetches from the predicted target</li>
          <li>If not found, the processor assumes <b>not-taken</b> (fetches PC+4)</li>
          <li>BTB stores: <code>Tag (PC) | Target Address | Valid bit</code></li>
        </ul>
        <p>The BTB only tells you <i>where</i> to go if the branch is taken. A separate <b>direction predictor</b> determines <i>whether</i> the branch is taken or not-taken.</p>
        <p><b>BTB miss scenarios:</b></p>
        <ul>
          <li>First time seeing this branch (compulsory miss)</li>
          <li>BTB capacity exceeded (capacity miss)</li>
          <li>Conflict in BTB indexing (conflict miss)</li>
        </ul>
      `,
      keyPoints: [
        'BTB caches target addresses of previously taken branches',
        'Indexed by PC, looked up at fetch stage',
        'BTB miss → assume not-taken (fetch PC+4)',
        'BTB provides target; direction predictor provides taken/not-taken',
      ],
      examTip: 'BTB is about TARGET prediction, not direction prediction. They are separate mechanisms that work together.',
    },
    {
      id: 'bp-1bit',
      title: 'Last-Time (1-Bit) Predictor',
      content: `
        <p>The simplest direction predictor: store <b>1 bit</b> per branch indicating the last outcome.</p>
        <ul>
          <li>Predict the same direction as the last time this branch was executed</li>
          <li>State machine with 2 states: <b>Taken (T)</b> and <b>Not-Taken (NT)</b></li>
          <li>On misprediction, flip the bit</li>
        </ul>
        <p><b>Problem with loops:</b> For a loop that executes N times, the 1-bit predictor mispredicts <b>twice per loop invocation</b>:</p>
        <ol>
          <li>On the <b>last iteration</b> (predicts Taken, but loop exits → Not-Taken)</li>
          <li>On the <b>first iteration of the next invocation</b> (predicts Not-Taken from last exit, but loop enters → Taken)</li>
        </ol>
        <p>Loop accuracy: <code>(N-2)/N</code> for each full invocation (2 mispredictions per N iterations).</p>
      `,
      keyPoints: [
        '1-bit predictor = "predict same as last time"',
        'Two states: Taken, Not-Taken',
        'Mispredicts twice per loop invocation (on exit and re-entry)',
        'Loop accuracy = (N-2)/N per invocation',
      ],
      examTip: 'Be careful: the question may ask per-iteration accuracy vs. per-invocation accuracy. For a loop running N iterations, you get 2 mispredictions → accuracy (N-2)/N.',
    },
    {
      id: 'bp-2bit',
      title: '2-Bit Saturating Counter Predictor',
      content: `
        <p>Uses a <b>2-bit saturating counter</b> per branch. The counter has 4 states:</p>
        <table style="border-collapse: collapse; margin: 1rem 0;">
          <tr style="border-bottom: 1px solid #333;">
            <th style="padding: 4px 12px; text-align: left;">State</th>
            <th style="padding: 4px 12px; text-align: left;">Value</th>
            <th style="padding: 4px 12px; text-align: left;">Prediction</th>
          </tr>
          <tr><td style="padding: 4px 12px;">Strongly Not-Taken</td><td style="padding: 4px 12px;"><code>00</code></td><td style="padding: 4px 12px;">Not-Taken</td></tr>
          <tr><td style="padding: 4px 12px;">Weakly Not-Taken</td><td style="padding: 4px 12px;"><code>01</code></td><td style="padding: 4px 12px;">Not-Taken</td></tr>
          <tr><td style="padding: 4px 12px;">Weakly Taken</td><td style="padding: 4px 12px;"><code>10</code></td><td style="padding: 4px 12px;">Taken</td></tr>
          <tr><td style="padding: 4px 12px;">Strongly Taken</td><td style="padding: 4px 12px;"><code>11</code></td><td style="padding: 4px 12px;">Taken</td></tr>
        </table>
        <p><b>Transitions:</b></p>
        <ul>
          <li>On <b>Taken</b> outcome: increment (saturate at 11)</li>
          <li>On <b>Not-Taken</b> outcome: decrement (saturate at 00)</li>
        </ul>
        <p><b>Key advantage over 1-bit:</b> A single anomalous outcome does not flip the prediction. The predictor must see <i>two consecutive</i> mispredictions to change direction.</p>
        <p><b>Loop accuracy:</b> For a loop of N iterations, only <b>1 misprediction</b> per invocation (on the exit). The re-entry is correctly predicted because the counter only drops to "weakly taken" (10), still predicting Taken. Accuracy = <code>(N-1)/N</code>.</p>
      `,
      keyPoints: [
        '4 states: 00 (Strongly NT), 01 (Weakly NT), 10 (Weakly T), 11 (Strongly T)',
        'Saturating: increment on Taken, decrement on Not-Taken, no wrap-around',
        'Requires two consecutive mispredictions to change predicted direction',
        'Loop accuracy = (N-1)/N — only mispredicts the loop exit',
      ],
      examTip: 'This is extremely common on exams. Be able to trace through the state transitions for a given branch pattern (e.g., TTTNT TTTNT). Know the 4 states and their binary encodings.',
    },
    {
      id: 'bp-twolevel-global',
      title: 'Two-Level Global Prediction (GHR + PHT)',
      content: `
        <p>The idea: branch outcomes are often <b>correlated</b> with the outcomes of <i>recent branches</i>. A global predictor captures this inter-branch correlation.</p>
        <p><b>Components:</b></p>
        <ul>
          <li><b>Global History Register (GHR):</b> A single shift register (shared by all branches) that records the last <i>k</i> branch outcomes (1 = Taken, 0 = Not-Taken)</li>
          <li><b>Pattern History Table (PHT):</b> An array of 2<sup>k</sup> entries, each a 2-bit saturating counter</li>
        </ul>
        <p><b>Operation:</b></p>
        <ol>
          <li>Use the GHR value (k bits) to index into the PHT</li>
          <li>The selected 2-bit counter provides the prediction</li>
          <li>After the branch resolves, update the GHR (shift in the outcome) and update the PHT counter</li>
        </ol>
        <p><b>Limitation:</b> Different branches with the same global history map to the same PHT entry → <b>aliasing/interference</b>. Two branches that have nothing to do with each other can corrupt each other's predictions.</p>
      `,
      keyPoints: [
        'GHR = single shift register recording last k branch outcomes',
        'PHT = 2^k entries of 2-bit saturating counters',
        'GHR indexes the PHT to get prediction',
        'Captures inter-branch correlation (global patterns)',
        'Suffers from aliasing: different branches, same GHR → same PHT entry',
      ],
      examTip: 'Understand the difference between global correlation (captured by GHR) and per-branch patterns (captured by local predictors). Exam questions may ask which predictor is better for which pattern.',
    },
    {
      id: 'bp-gshare',
      title: 'Gshare Predictor (GHR XOR PC)',
      content: `
        <p><b>Gshare</b> reduces aliasing in global prediction by <b>XOR-ing</b> the GHR with the branch PC to index the PHT.</p>
        <p><b>Index = GHR XOR PC[k:0]</b></p>
        <ul>
          <li>Same PHT structure as two-level global (2<sup>k</sup> entries of 2-bit counters)</li>
          <li>XOR spreads different branches across different PHT entries even when they share the same global history</li>
          <li>Simple hardware: just XOR gates, no extra storage</li>
        </ul>
        <p><b>Why it works:</b> Two branches at different PCs with the same GHR value now index <i>different</i> PHT entries, reducing destructive aliasing.</p>
        <p><b>Limitation:</b> Still a global predictor — does not capture per-branch (local) patterns well. Some branches have periodic patterns (e.g., TNTNTN) that are better captured by local history.</p>
      `,
      keyPoints: [
        'Index = GHR XOR PC — reduces aliasing vs. pure GHR indexing',
        'Same PHT of 2-bit counters',
        'Simple to implement, better accuracy than pure global',
        'Still a global predictor — misses per-branch local patterns',
      ],
      examTip: 'Gshare is one of the most common predictors asked about. Know that XOR of GHR and PC is the key innovation over basic two-level global.',
    },
    {
      id: 'bp-twolevel-local',
      title: 'Two-Level Local Prediction',
      content: `
        <p>Instead of one global history, keep a <b>separate history register per branch</b>. This captures per-branch patterns (e.g., alternating T/NT).</p>
        <p><b>Components:</b></p>
        <ul>
          <li><b>Branch History Table (BHT):</b> Array of per-branch shift registers, indexed by PC. Each stores the last <i>k</i> outcomes of <i>that specific branch</i>.</li>
          <li><b>Pattern History Table (PHT):</b> Shared array of 2-bit counters, indexed by the per-branch history</li>
        </ul>
        <p><b>Operation:</b></p>
        <ol>
          <li>Use PC to look up the branch's local history register in the BHT</li>
          <li>Use the local history value to index the PHT</li>
          <li>Get prediction from the 2-bit counter</li>
          <li>After resolution, update BHT (shift in outcome) and PHT counter</li>
        </ol>
        <p><b>Advantage:</b> Captures branch-specific periodic patterns (loops, alternating, etc.).</p>
        <p><b>Disadvantage:</b> Cannot capture correlations <i>between</i> different branches.</p>
      `,
      keyPoints: [
        'Per-branch history registers in BHT (indexed by PC)',
        'Local history indexes shared PHT of 2-bit counters',
        'Excellent for branch-specific patterns (TNTNTN, loops)',
        'Cannot see inter-branch correlations like global predictors',
      ],
    },
    {
      id: 'bp-tournament',
      title: 'Tournament/Hybrid Predictor (Alpha 21264)',
      content: `
        <p>A <b>tournament predictor</b> combines a local and a global predictor, using a <b>choice predictor</b> to select which one to trust for each branch.</p>
        <p><b>Alpha 21264 Tournament Predictor:</b></p>
        <ul>
          <li><b>Local History Table (LHT):</b> 1024 entries x 10-bit histories (indexed by PC)</li>
          <li><b>Local Prediction Table:</b> 1024 entries x 3-bit counters (indexed by local history)</li>
          <li><b>Global Prediction Table:</b> 4096 entries x 2-bit counters (indexed by 12-bit GHR)</li>
          <li><b>Choice Prediction Table:</b> 4096 entries x 2-bit counters (indexed by 12-bit GHR)</li>
        </ul>
        <p><b>How it works:</b></p>
        <ol>
          <li>Both the local and global predictors produce a prediction</li>
          <li>The choice predictor decides which to use</li>
          <li>Choice counter: ≥2 → use global, &lt;2 → use local</li>
          <li>Choice counter is updated when the two predictors <i>disagree</i>: if global was correct, increment; if local was correct, decrement</li>
        </ol>
        <p><b>Key insight:</b> The choice predictor only trains when the two sub-predictors disagree. If both predict the same thing, the choice doesn't matter.</p>
        <p><b>Result:</b> Gets the best of both worlds — local patterns AND global correlations. The Alpha 21264 achieved &gt;95% accuracy on most benchmarks.</p>
      `,
      keyPoints: [
        'Combines local + global predictor with a choice predictor',
        'Alpha 21264: LHT 1024x10, Local Pred 1024x3, Global Pred 4096x2, Choice Pred 4096x2',
        'Choice updated only when local and global disagree',
        'Achieves best of both: local patterns + global correlations',
      ],
      examTip: 'Memorize the Alpha 21264 table sizes (1024x10, 1024x3, 4096x2, 4096x2). Know the choice predictor update rule: only updates when local and global disagree.',
    },
  ],

  'cache': [
    {
      id: 'cache-sram-dram',
      title: 'SRAM vs DRAM',
      content: `
        <p>Two fundamental memory technologies used in modern systems:</p>
        <table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">
          <tr style="border-bottom: 1px solid #333;">
            <th style="padding: 6px 12px; text-align: left;">Property</th>
            <th style="padding: 6px 12px; text-align: left;">SRAM</th>
            <th style="padding: 6px 12px; text-align: left;">DRAM</th>
          </tr>
          <tr><td style="padding: 4px 12px;">Cell structure</td><td style="padding: 4px 12px;">6 transistors (6T cell)</td><td style="padding: 4px 12px;">1 transistor + 1 capacitor (1T1C)</td></tr>
          <tr><td style="padding: 4px 12px;">Speed</td><td style="padding: 4px 12px;">Fast (~1-2 ns)</td><td style="padding: 4px 12px;">Slower (~50-100 ns)</td></tr>
          <tr><td style="padding: 4px 12px;">Density</td><td style="padding: 4px 12px;">Lower (6T per bit)</td><td style="padding: 4px 12px;">Higher (1T1C per bit)</td></tr>
          <tr><td style="padding: 4px 12px;">Refresh needed?</td><td style="padding: 4px 12px;">No (static latch)</td><td style="padding: 4px 12px;">Yes (capacitor leaks charge)</td></tr>
          <tr><td style="padding: 4px 12px;">Read type</td><td style="padding: 4px 12px;">Non-destructive</td><td style="padding: 4px 12px;">Destructive (must write-back)</td></tr>
          <tr><td style="padding: 4px 12px;">Cost</td><td style="padding: 4px 12px;">Expensive</td><td style="padding: 4px 12px;">Cheap per bit</td></tr>
          <tr><td style="padding: 4px 12px;">Use</td><td style="padding: 4px 12px;">Caches (L1, L2, L3)</td><td style="padding: 4px 12px;">Main memory</td></tr>
        </table>
        <p><b>DRAM destructive reads:</b> Reading a DRAM cell discharges the capacitor. After every read, the sense amplifier must <b>write back</b> the data to restore the charge. This adds latency.</p>
      `,
      keyPoints: [
        'SRAM: 6T cell, fast, no refresh, lower density, used for caches',
        'DRAM: 1T1C cell, destructive reads, needs refresh every ~64ms, higher density, used for main memory',
        'SRAM is ~10-100x faster than DRAM but ~10x more expensive per bit',
        'DRAM reads are destructive — must write-back after each read',
      ],
      examTip: 'Know why DRAM needs refresh (capacitor leaks) and why reads are destructive (charge sharing). These are fundamental concepts that underpin memory hierarchy design.',
    },
    {
      id: 'cache-hierarchy',
      title: 'Memory Hierarchy & Locality',
      content: `
        <p>The <b>memory hierarchy</b> exploits the trade-off between speed, size, and cost:</p>
        <ul>
          <li><b>Registers:</b> sub-nanosecond, bytes, in the CPU core</li>
          <li><b>L1 Cache:</b> ~1 ns, ~32 KB, per-core</li>
          <li><b>L2 Cache:</b> ~3-10 ns, 256 KB - 1 MB, per-core or shared</li>
          <li><b>L3 Cache:</b> ~10-30 ns, several MB, shared across cores</li>
          <li><b>Main Memory (DRAM):</b> ~50-100 ns, GBs</li>
          <li><b>Disk/SSD:</b> ~10 ms (HDD) / ~100 us (SSD), TBs</li>
        </ul>
        <p><b>Why it works — Locality:</b></p>
        <ul>
          <li><b>Temporal locality:</b> Recently accessed data is likely to be accessed again soon (e.g., loop variables, hot data structures)</li>
          <li><b>Spatial locality:</b> Data near recently accessed data is likely to be accessed soon (e.g., array traversals, sequential instruction fetch)</li>
        </ul>
        <p>Caches exploit temporal locality by keeping recently-used data close to the processor. They exploit spatial locality by fetching entire <b>cache blocks</b> (typically 64 bytes) at a time.</p>
      `,
      keyPoints: [
        'Hierarchy: Registers (sub-ns) → L1 (~1ns, 32KB) → L2 (~10ns, 512KB) → L3 → DRAM (~100ns, GBs) → Disk (~10ms)',
        'Temporal locality: recently used → likely used again soon',
        'Spatial locality: nearby data → likely accessed soon',
        'Cache blocks (64B typical) exploit spatial locality',
      ],
    },
    {
      id: 'cache-basics',
      title: 'Cache Basics: Organization & Addressing',
      content: `
        <p>A cache consists of:</p>
        <ul>
          <li><b>Data store:</b> holds the actual cache blocks (lines)</li>
          <li><b>Tag store:</b> holds metadata for each block (tag bits, valid bit, dirty bit, replacement info)</li>
        </ul>
        <p><b>Address decomposition (for a direct-mapped cache):</b></p>
        <pre>| Tag (upper bits) | Index (middle bits) | Block Offset (lower bits) |</pre>
        <ul>
          <li><b>Block Offset:</b> log<sub>2</sub>(block size) bits — selects byte within the block</li>
          <li><b>Index:</b> log<sub>2</sub>(number of sets) bits — selects which set to look in</li>
          <li><b>Tag:</b> remaining upper bits — identifies which block from memory is stored</li>
        </ul>
        <p><b>Terminology:</b></p>
        <ul>
          <li><b>Hit:</b> requested data found in cache → fast access</li>
          <li><b>Miss:</b> data not in cache → must fetch from next level</li>
          <li><b>Hit rate:</b> fraction of accesses that hit in cache</li>
          <li><b>Miss rate:</b> 1 - hit rate</li>
        </ul>
      `,
      keyPoints: [
        'Cache has tag store + data store',
        'Address split: Tag | Index | Block Offset',
        'Offset bits = log2(block size), Index bits = log2(num sets)',
        'Tag uniquely identifies which memory block is cached in that set',
      ],
      examTip: 'Given cache size, block size, and associativity, be able to calculate number of sets, and the bit widths of tag/index/offset fields. This is a very common calculation question.',
    },
    {
      id: 'cache-directmapped',
      title: 'Direct-Mapped Cache',
      content: `
        <p>In a <b>direct-mapped cache</b>, each memory block maps to <b>exactly one</b> cache set (1-way associative).</p>
        <ul>
          <li>Number of sets = Cache size / Block size</li>
          <li>Set index = (Block address) mod (Number of sets)</li>
          <li>On access: check the tag at the indexed set. If tag matches and valid bit is set → hit</li>
          <li>On miss: the existing block at that index is <b>evicted</b> (no choice — only one place)</li>
        </ul>
        <p><b>Advantages:</b> Simple, fast lookup (single comparator), low power.</p>
        <p><b>Disadvantages:</b> High <b>conflict miss</b> rate — two blocks that map to the same index will keep evicting each other (ping-pong / thrashing).</p>
        <p><b>Example:</b> If blocks A and B both map to set 5, accessing A, B, A, B causes 100% miss rate even if the cache has room elsewhere.</p>
      `,
      keyPoints: [
        'Each block maps to exactly one set — 1 comparator needed',
        'Simple and fast, but susceptible to conflict misses',
        'Thrashing: two blocks mapping to same set evict each other repeatedly',
        'Number of sets = Cache size / Block size',
      ],
    },
    {
      id: 'cache-setassoc',
      title: 'Set-Associative Cache',
      content: `
        <p>An <b>N-way set-associative cache</b> has N blocks (ways) per set. A memory block can go in <i>any</i> of the N ways within its mapped set.</p>
        <ul>
          <li>Number of sets = Cache size / (Block size x Associativity)</li>
          <li>On access: index selects the set, then <b>N parallel comparators</b> check all tags</li>
          <li>On miss: one of the N blocks in the set must be evicted (replacement policy decides which)</li>
        </ul>
        <p><b>Spectrum:</b></p>
        <ul>
          <li>1-way = direct-mapped</li>
          <li>N-way = set-associative (typical: 2, 4, 8, 16 ways)</li>
          <li>If #sets = 1, it's <b>fully associative</b> (any block can go anywhere)</li>
        </ul>
        <p><b>Trade-off:</b> More associativity → fewer conflict misses, but more comparators, higher latency, more power.</p>
      `,
      keyPoints: [
        'N ways per set — N parallel tag comparisons needed',
        'Reduces conflict misses compared to direct-mapped',
        'More associativity = fewer conflicts but slower/more expensive',
        '#sets = CacheSize / (BlockSize x Associativity)',
      ],
    },
    {
      id: 'cache-amat',
      title: 'AMAT and Performance Metrics',
      content: `
        <p><b>Average Memory Access Time (AMAT)</b> is the key metric for cache performance:</p>
        <pre>AMAT = Hit_Rate × Hit_Latency + Miss_Rate × Miss_Latency</pre>
        <p>Or equivalently:</p>
        <pre>AMAT = Hit_Latency + Miss_Rate × Miss_Penalty</pre>
        <p>where Miss_Penalty = Miss_Latency - Hit_Latency (time to service the miss).</p>
        <p><b>For multi-level caches:</b></p>
        <pre>AMAT = L1_hit_time + L1_miss_rate × (L2_hit_time + L2_miss_rate × L2_miss_penalty)</pre>
        <p><b>Local vs. Global miss rate:</b></p>
        <ul>
          <li><b>Local miss rate:</b> misses at this level / accesses to this level</li>
          <li><b>Global miss rate:</b> misses at this level / total CPU memory accesses</li>
          <li>Global L2 miss rate = L1 miss rate × L2 local miss rate</li>
        </ul>
      `,
      keyPoints: [
        'AMAT = Hit_Time + Miss_Rate × Miss_Penalty',
        'Multi-level: AMAT = L1_hit + L1_miss_rate × (L2_hit + L2_miss_rate × L2_penalty)',
        'Local miss rate = misses / accesses to that level',
        'Global miss rate = misses / total CPU accesses',
      ],
      examTip: 'AMAT calculations are bread and butter for cache exam questions. Practice the multi-level version. Watch for whether the question gives local or global miss rates.',
    },
    {
      id: 'cache-3cs',
      title: 'Three C\'s of Cache Misses',
      content: `
        <p>All cache misses can be classified into three categories:</p>
        <ol>
          <li><b>Compulsory (Cold) Misses:</b> First access to a block that has never been in the cache. Unavoidable unless you prefetch. These occur even in an infinite cache.</li>
          <li><b>Capacity Misses:</b> The working set is larger than the cache. Even a fully-associative cache of the same size would miss. Occurs because the cache simply cannot hold all needed data.</li>
          <li><b>Conflict Misses:</b> Multiple blocks map to the same set, causing evictions even though the cache has unused space in other sets. Only occur in direct-mapped and set-associative caches (NOT in fully-associative).</li>
        </ol>
        <p><b>How to identify miss type:</b></p>
        <ul>
          <li>Simulate with infinite cache → remaining misses are <b>compulsory</b></li>
          <li>Simulate with same-size fully-associative cache → additional misses beyond compulsory are <b>capacity</b></li>
          <li>Simulate with actual associativity → additional misses beyond capacity are <b>conflict</b></li>
        </ul>
      `,
      keyPoints: [
        'Compulsory: first-ever access to block (infinite cache still misses)',
        'Capacity: working set > cache size (fully-assoc same-size cache still misses)',
        'Conflict: blocks mapping to same set evict each other (only in limited associativity)',
        'Reducing: compulsory (prefetching), capacity (bigger cache), conflict (more associativity)',
      ],
      examTip: 'A common exam question: given an access trace, classify each miss as compulsory, capacity, or conflict. Remember: compare against infinite cache, then fully-associative same-size, then actual.',
    },
    {
      id: 'cache-replacement',
      title: 'Replacement Policies',
      content: `
        <p>When a miss occurs in a set-associative cache and the set is full, a <b>replacement policy</b> decides which existing block to evict.</p>
        <ul>
          <li><b>LRU (Least Recently Used):</b> Evict the block that hasn't been accessed for the longest time. Optimal for many workloads but expensive to implement (need to track access order of all ways).</li>
          <li><b>Approximate LRU — Not-MRU:</b> Don't track full order; just track which block was Most Recently Used and never evict it. Randomly pick from the rest. Much cheaper hardware.</li>
          <li><b>Hierarchical LRU:</b> Divide ways into groups, do LRU within groups, approximate LRU across groups.</li>
          <li><b>Random:</b> Pick a random victim. Surprisingly competitive with LRU for high associativity. Very simple hardware.</li>
        </ul>
        <p><b>Set thrashing:</b> When the working set in a particular set exceeds the associativity, even LRU performs poorly — it keeps evicting blocks that will be needed soon. This is the <b>Belady's anomaly</b>-like problem for caches. Working set &gt; associativity → every access can miss.</p>
      `,
      keyPoints: [
        'LRU: evict least recently used — best but most expensive (track full order)',
        'Not-MRU: protect most recently used, evict randomly from rest — cheap',
        'Random: surprisingly good at high associativity, trivial hardware',
        'Set thrashing: when working set in a set > associativity, performance degrades',
      ],
    },
    {
      id: 'cache-write',
      title: 'Write Policies',
      content: `
        <p>Two orthogonal decisions for handling writes:</p>
        <p><b>Write Hit Policy:</b></p>
        <ul>
          <li><b>Write-back:</b> Write only to cache. Mark block as <b>dirty</b>. Write to memory only on eviction. Reduces memory traffic but requires dirty bits and write-back on eviction.</li>
          <li><b>Write-through:</b> Write to both cache and memory simultaneously. Simpler, memory always up-to-date, but more memory traffic. Often uses a <b>write buffer</b> to avoid stalling.</li>
        </ul>
        <p><b>Write Miss Policy:</b></p>
        <ul>
          <li><b>Write-allocate:</b> On write miss, fetch the block into cache, then write to it. Makes sense with write-back (exploit temporal locality on future writes).</li>
          <li><b>No-write-allocate (write-around):</b> On write miss, write directly to next level, don't bring block into cache. Makes sense with write-through.</li>
        </ul>
        <p><b>Common pairings:</b></p>
        <ul>
          <li>Write-back + Write-allocate (most common in modern caches)</li>
          <li>Write-through + No-write-allocate</li>
        </ul>
      `,
      keyPoints: [
        'Write-back: write to cache only, mark dirty, write to memory on eviction',
        'Write-through: write to cache + memory, simpler but more traffic',
        'Write-allocate: fetch block into cache on write miss',
        'No-write-allocate: write directly to memory, skip cache',
        'Common pairing: write-back + write-allocate',
      ],
      examTip: 'Know the common pairings and why they make sense. Write-back + write-allocate reduces memory bandwidth by batching writes.',
    },
    {
      id: 'cache-improve',
      title: 'Improving Cache Performance',
      content: `
        <p>Using the AMAT formula, we can improve performance by reducing miss rate, reducing miss latency, or reducing hit time.</p>
        <p><b>Reducing Miss Rate:</b></p>
        <ul>
          <li>Increase associativity → reduces conflict misses</li>
          <li>Increase cache size → reduces capacity misses</li>
          <li><b>Victim cache:</b> Small fully-associative cache between L1 and L2 that stores recently evicted blocks. Catches conflict misses cheaply.</li>
          <li>Software optimization: loop interchange, loop fusion, tiling/blocking</li>
        </ul>
        <p><b>Reducing Miss Latency:</b></p>
        <ul>
          <li><b>Multi-level caches:</b> L1 fast but small, L2 larger with moderate latency → catches many L1 misses without going to DRAM</li>
          <li><b>Critical word first:</b> Request the needed word first from memory, send it to processor immediately while filling rest of block</li>
          <li><b>MSHRs (Miss Status Holding Registers):</b> Track outstanding cache misses. Enable <b>non-blocking caches</b> — the cache can continue servicing hits (and even other misses) while a miss is being resolved. Without MSHRs, a miss stalls all subsequent accesses.</li>
        </ul>
        <p><b>Software optimizations:</b></p>
        <ul>
          <li><b>Loop interchange:</b> Change loop nesting order to access arrays in row-major order (better spatial locality)</li>
          <li><b>Loop fusion:</b> Merge loops over the same array to improve temporal locality</li>
        </ul>
      `,
      keyPoints: [
        'Victim cache: small fully-assoc cache for recently evicted blocks',
        'Multi-level caches reduce effective miss latency',
        'Critical word first: send needed word to CPU immediately',
        'MSHRs enable non-blocking caches (continue on hit while miss outstanding)',
        'Software: loop interchange (spatial), loop fusion (temporal)',
      ],
      examTip: 'Know what MSHRs do and why non-blocking caches matter. Also understand victim caches — they catch conflict misses with minimal hardware.',
    },
  ],

  'memory-systems': [
    {
      id: 'mem-org',
      title: 'DRAM Subsystem Organization',
      content: `
        <p>The DRAM subsystem has a deep hierarchy:</p>
        <ul>
          <li><b>Channel:</b> Independent memory controller connection with its own data bus (e.g., 64-bit wide). Multiple channels multiply bandwidth.</li>
          <li><b>DIMM (Dual Inline Memory Module):</b> Physical stick of memory containing multiple chips. Multiple DIMMs can share a channel.</li>
          <li><b>Rank:</b> A group of DRAM chips that operate in lockstep on the same DIMM. A 64-bit channel uses 8 chips per rank (each chip contributes 8 bits).</li>
          <li><b>Chip:</b> Individual DRAM chip containing multiple banks.</li>
          <li><b>Bank:</b> Independent array within a chip with its own row buffer (sense amplifiers). Banks can be accessed concurrently.</li>
          <li><b>Row/Column:</b> Within a bank, data is organized as a 2D array. A row is activated into the row buffer; columns are read from the row buffer.</li>
        </ul>
        <p><b>Key hierarchy:</b> Channel &gt; DIMM &gt; Rank &gt; Chip &gt; Bank &gt; Row/Column</p>
        <p><b>Transferring a 64-byte cache block:</b> Across a rank, each of 8 chips contributes 8 bytes. This requires 8 column reads (each 8B burst) to fill a 64B cache line.</p>
      `,
      keyPoints: [
        'Hierarchy: Channel > DIMM > Rank > Chip > Bank > Row/Column',
        'Channel = independent data bus (64-bit wide)',
        'Rank = group of chips operating in lockstep (8 chips x 8 bits = 64 bits)',
        'Bank = independent array with own row buffer, enables concurrency',
        '64B cache line = 8 chips each contributing 8 bytes across the rank',
      ],
      examTip: 'The hierarchy is crucial. Know how a cache block is spread across chips in a rank and why multiple banks/channels improve bandwidth.',
    },
    {
      id: 'mem-pagemode',
      title: 'Page Mode DRAM & Row Buffer',
      content: `
        <p>DRAM banks use a <b>row buffer</b> (implemented by sense amplifiers) to hold an entire activated row.</p>
        <p><b>Three DRAM commands:</b></p>
        <ol>
          <li><b>ACTIVATE (ACT / RAS):</b> Opens a row — copies the entire row from the DRAM array into the row buffer. Destructive to the array (must write back eventually). Takes <code>t_RAS</code> time.</li>
          <li><b>READ/WRITE (CAS):</b> Accesses a specific column within the open row buffer. Much faster than a full row activation. Takes <code>t_CAS</code> time.</li>
          <li><b>PRECHARGE (PRE):</b> Closes the current row — writes the row buffer contents back to the array and prepares the bank for a new row activation. Takes <code>t_RP</code> time.</li>
        </ol>
        <p><b>Row buffer states:</b></p>
        <ul>
          <li><b>Row buffer hit:</b> Requested row is already open in the row buffer → just CAS → fastest (t_CAS)</li>
          <li><b>Row buffer miss (closed bank):</b> No row is open → ACT + CAS (t_RAS + t_CAS)</li>
          <li><b>Row buffer conflict:</b> A <i>different</i> row is open → PRE + ACT + CAS → slowest (t_RP + t_RAS + t_CAS)</li>
        </ul>
      `,
      keyPoints: [
        'Row buffer = sense amplifiers holding one activated row',
        'ACT opens a row (t_RAS), CAS reads/writes column (t_CAS), PRE closes row (t_RP)',
        'Row hit: CAS only (fast)',
        'Row miss (closed): ACT + CAS (medium)',
        'Row conflict (wrong row open): PRE + ACT + CAS (slow)',
      ],
      examTip: 'Distinguish the three row buffer states clearly. Many exam questions give access patterns and ask for the total latency based on hit/miss/conflict.',
    },
    {
      id: 'mem-refresh',
      title: 'DRAM Refresh',
      content: `
        <p>DRAM capacitors leak charge and must be <b>refreshed</b> periodically (typically every <b>64 ms</b> for the entire memory).</p>
        <p><b>Refresh strategies:</b></p>
        <ul>
          <li><b>Burst refresh:</b> Refresh all rows back-to-back. Memory is unavailable for a long burst. Simpler but causes long stalls.</li>
          <li><b>Distributed refresh:</b> Spread refresh commands throughout the 64ms window. Each refresh command handles a few rows. Shorter individual stalls but more frequent interruptions.</li>
        </ul>
        <p><b>Impact:</b> During refresh, the bank being refreshed cannot service memory requests → <b>performance and energy overhead</b>. As DRAM capacity grows, more rows need refreshing → refresh overhead increases.</p>
        <p><b>Refresh penalty grows with capacity:</b> More rows → more refresh commands → more time spent refreshing → less time available for actual accesses.</p>
      `,
      keyPoints: [
        'DRAM must be refreshed every ~64ms (capacitor charge leaks)',
        'Burst refresh: all at once (long stall), distributed: spread out (shorter stalls)',
        'Refresh blocks the bank — no accesses during refresh',
        'Refresh overhead grows with DRAM capacity (more rows to refresh)',
      ],
    },
    {
      id: 'mem-banks-channels',
      title: 'Multiple Banks & Channels',
      content: `
        <p><b>Multiple banks</b> within a chip/rank enable <b>bank-level parallelism</b>:</p>
        <ul>
          <li>Each bank has its own row buffer and operates independently</li>
          <li>While one bank is activating a row, another can be servicing a CAS</li>
          <li>Interleaving accesses across banks hides latency</li>
        </ul>
        <p><b>Multiple channels</b> provide additional <b>bandwidth</b>:</p>
        <ul>
          <li>Each channel has its own data bus, command bus, and memory controller port</li>
          <li>Channels operate completely independently</li>
          <li>Two channels → 2x peak bandwidth</li>
        </ul>
        <p><b>Address mapping/interleaving:</b> How physical addresses are mapped to channels, ranks, banks, rows, and columns significantly affects performance.</p>
        <ul>
          <li>Using <b>lower address bits</b> for bank/channel selection provides better interleaving because lower bits have more <b>entropy</b> (vary more across consecutive accesses)</li>
          <li>Row interleaving: consecutive cache blocks go to different banks → maximizes bank-level parallelism for sequential access patterns</li>
        </ul>
      `,
      keyPoints: [
        'Multiple banks enable bank-level parallelism (concurrent operations)',
        'Multiple channels multiply bandwidth (independent data buses)',
        'Address interleaving: use lower bits for bank/channel selection (more entropy)',
        'Good interleaving maximizes parallelism across banks/channels',
      ],
      examTip: 'Understand address interleaving — which bits map to which part of the hierarchy. Lower bits change more frequently, so mapping them to bank/channel spreads accesses evenly.',
    },
    {
      id: 'mem-scheduling',
      title: 'DRAM Scheduling Policies',
      content: `
        <p>The <b>memory controller</b> decides the order in which queued memory requests are serviced. This order significantly impacts performance.</p>
        <p><b>FCFS (First-Come, First-Served):</b></p>
        <ul>
          <li>Service requests in arrival order</li>
          <li>Simple, fair, but ignores row buffer state</li>
          <li>May cause unnecessary row conflicts when a row hit request is waiting behind a row conflict request</li>
        </ul>
        <p><b>FR-FCFS (First-Ready, First-Come, First-Served):</b></p>
        <ul>
          <li><b>Priority 1:</b> Row buffer hits first (they're fastest — CAS only)</li>
          <li><b>Priority 2:</b> Among equal-priority requests, oldest first (FCFS)</li>
          <li>Maximizes row buffer hit rate → maximizes DRAM throughput</li>
          <li>But can be <b>unfair</b> — streaming accesses (many hits to same row) can starve other requests</li>
        </ul>
        <p><b>Key insight:</b> FR-FCFS prioritizes throughput over fairness. This can cause quality-of-service issues in multi-core/multi-application systems.</p>
      `,
      keyPoints: [
        'FCFS: simple, fair, but misses row buffer optimization opportunities',
        'FR-FCFS: prioritize row hits → maximize throughput, then FCFS for ties',
        'FR-FCFS maximizes row buffer hit rate but can be unfair',
        'Memory scheduling directly impacts both throughput and fairness',
      ],
      examTip: 'Know how to trace through a sequence of memory requests under both FCFS and FR-FCFS and calculate total latency. FR-FCFS reorders to exploit row buffer hits.',
    },
    {
      id: 'mem-latency',
      title: 'Memory Latency Components',
      content: `
        <p>The total memory access latency has several components:</p>
        <ol>
          <li><b>CPU to memory controller:</b> On-chip interconnect latency</li>
          <li><b>Controller latency / queuing:</b> Time spent waiting in the memory controller queue + scheduling decision time</li>
          <li><b>Controller to DRAM:</b> Bus transfer of command (address/command bus)</li>
          <li><b>Bank access latency:</b>
            <ul>
              <li>Row hit: <code>t_CAS</code> (Column Access Strobe)</li>
              <li>Row miss (closed): <code>t_RAS + t_CAS</code></li>
              <li>Row conflict: <code>t_RP + t_RAS + t_CAS</code> (Precharge + Activate + CAS)</li>
            </ul>
          </li>
          <li><b>DRAM to controller (data bus):</b> Data transfer across the memory bus. For a 64B cache line at 64-bit bus width: 8 transfers (each 8 bytes)</li>
          <li><b>Controller to CPU:</b> On-chip interconnect back to the processor</li>
        </ol>
        <p>Total latency can easily be <b>100+ ns</b> for a row conflict, vs. ~50 ns for a row buffer hit.</p>
      `,
      keyPoints: [
        'Latency path: CPU→controller→DRAM command→bank access→data bus→controller→CPU',
        'Bank latency dominates: t_CAS (hit), t_RAS+t_CAS (miss), t_RP+t_RAS+t_CAS (conflict)',
        'Data transfer: 64B line = 8 transfers on 64-bit bus',
        'Total memory latency is typically 50-100+ ns',
      ],
    },
  ],

  'new-memory': [
    {
      id: 'nm-scaling',
      title: 'DRAM Scaling Challenges',
      content: `
        <p>DRAM technology faces fundamental scaling problems as we approach physical limits:</p>
        <ul>
          <li><b>Capacity:</b> Capacitor size shrinks with process technology, making it harder to store enough charge for reliable sensing. Need more capacity for data-intensive workloads.</li>
          <li><b>Bandwidth:</b> Off-chip pin count limited; bus speeds approaching signal integrity limits. Memory bandwidth is not scaling as fast as compute.</li>
          <li><b>Quality of Service (QoS):</b> In multi-core systems, shared memory causes interference between applications. Hard to guarantee predictable latency.</li>
          <li><b>Energy:</b> DRAM refresh consumes significant energy even when idle. Leakage power grows with capacity. Refresh overhead grows as more rows need refreshing in the 64ms window.</li>
          <li><b>Reliability:</b> Smaller cells → more vulnerable to disturbance (Rowhammer), particle strikes, etc.</li>
        </ul>
        <p>These challenges motivate research into <b>new memory technologies</b> that can complement or replace DRAM.</p>
      `,
      keyPoints: [
        'DRAM scaling is slowing: smaller capacitors harder to sense reliably',
        'Bandwidth wall: off-chip pins and bus speeds limiting',
        'Energy problem: refresh power grows with capacity',
        'Multi-core QoS: shared memory causes interference',
        'Motivates new memory technologies like PCM',
      ],
    },
    {
      id: 'nm-pcm',
      title: 'Phase Change Memory (PCM)',
      content: `
        <p><b>Phase Change Memory (PCM)</b> uses chalcogenide glass that can exist in two phases:</p>
        <ul>
          <li><b>Crystalline:</b> Low resistance → represents one bit value. Achieved by slow cooling (SET operation).</li>
          <li><b>Amorphous:</b> High resistance → represents other bit value. Achieved by rapid heating + quenching (RESET operation).</li>
        </ul>
        <p><b>Advantages of PCM:</b></p>
        <ul>
          <li><b>Better scaling:</b> Scales to smaller process nodes than DRAM</li>
          <li><b>Higher density:</b> Can store multi-bit per cell (MLC) — resistance levels, not just binary capacitor charge</li>
          <li><b>Non-volatile:</b> Retains data without power for 10+ years. No refresh needed!</li>
          <li><b>Low idle power:</b> No refresh energy when not being accessed</li>
        </ul>
        <p><b>Disadvantages of PCM:</b></p>
        <ul>
          <li><b>Slow writes:</b> Write latency ~10x longer than DRAM (heating/cooling the material takes time)</li>
          <li><b>Limited write endurance:</b> Each cell can only be written ~10<sup>8</sup> - 10<sup>9</sup> times before wearing out (vs. effectively unlimited for DRAM). This is called <b>write wearout</b>.</li>
          <li><b>High write energy:</b> Heating the material to change phase requires significant current</li>
          <li><b>Read is asymmetric with write:</b> Reads are much faster than writes</li>
        </ul>
      `,
      keyPoints: [
        'Two phases: crystalline (low R, SET) and amorphous (high R, RESET)',
        'Advantages: better scaling, multi-bit/cell, non-volatile, no refresh, low idle power',
        'Disadvantages: slow writes (~10x DRAM), limited endurance (~10^8-10^9 writes), high write energy',
        'Non-volatile: retains data 10+ years without power',
      ],
      examTip: 'Know both the advantages and disadvantages of PCM vs DRAM. Exam questions often ask you to compare them or explain why hybrid systems are needed.',
    },
    {
      id: 'nm-hybrid',
      title: 'Hybrid Memory Systems (DRAM + PCM)',
      content: `
        <p>Since neither DRAM nor PCM is perfect alone, <b>hybrid memory systems</b> combine them to get the best of both:</p>
        <table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">
          <tr style="border-bottom: 1px solid #333;">
            <th style="padding: 4px 12px; text-align: left;">Property</th>
            <th style="padding: 4px 12px; text-align: left;">DRAM</th>
            <th style="padding: 4px 12px; text-align: left;">PCM</th>
          </tr>
          <tr><td style="padding: 4px 12px;">Speed</td><td style="padding: 4px 12px;">Fast (reads & writes)</td><td style="padding: 4px 12px;">Fast reads, slow writes</td></tr>
          <tr><td style="padding: 4px 12px;">Endurance</td><td style="padding: 4px 12px;">Unlimited</td><td style="padding: 4px 12px;">Limited (~10^8)</td></tr>
          <tr><td style="padding: 4px 12px;">Capacity</td><td style="padding: 4px 12px;">Limited by scaling</td><td style="padding: 4px 12px;">Large (denser)</td></tr>
          <tr><td style="padding: 4px 12px;">Volatility</td><td style="padding: 4px 12px;">Volatile (needs refresh)</td><td style="padding: 4px 12px;">Non-volatile</td></tr>
          <tr><td style="padding: 4px 12px;">Idle power</td><td style="padding: 4px 12px;">High (refresh leakage)</td><td style="padding: 4px 12px;">Low</td></tr>
          <tr><td style="padding: 4px 12px;">Cost/bit</td><td style="padding: 4px 12px;">Higher</td><td style="padding: 4px 12px;">Lower</td></tr>
        </table>
        <p><b>Design approaches:</b></p>
        <ul>
          <li><b>DRAM as a cache for PCM:</b> Hardware-managed. DRAM acts like another level of cache in front of PCM main memory. Simple for software but limited by DRAM cache management overhead.</li>
          <li><b>DRAM and PCM as flat main memory:</b> OS-managed. Both are part of the physical address space. OS places pages in DRAM or PCM based on access patterns. More flexible.</li>
        </ul>
        <p><b>Key challenges:</b></p>
        <ul>
          <li>Data allocation: Which data goes in DRAM vs PCM? (Write-intensive → DRAM, read-mostly → PCM)</li>
          <li>Data movement: When/how to migrate pages between DRAM and PCM</li>
          <li><b>Wear leveling:</b> Distribute writes evenly across PCM cells to avoid premature wearout of hot cells</li>
          <li>Requires changes across the stack: cache hierarchy, memory controller, OS page management</li>
        </ul>
      `,
      keyPoints: [
        'Hybrid = DRAM (fast, durable, small, volatile) + PCM (large, non-volatile, slow writes, wears out)',
        'DRAM as cache for PCM (hardware-managed) vs. flat address space (OS-managed)',
        'Write-intensive data → DRAM; read-mostly data → PCM',
        'Wear leveling is critical: spread writes evenly across PCM cells',
        'Requires co-design of cache hierarchy, memory controller, and OS',
      ],
      examTip: 'Be able to explain the design trade-offs of hybrid memory. Know why you would put certain data in DRAM vs PCM, and why wear leveling matters.',
    },
  ],

  'hardware-security': [
    {
      id: 'sec-sidechannel',
      title: 'Side Channel Attacks Overview',
      content: `
        <p>A <b>side channel</b> is an unintended information leakage path that does not use the normal input/output interface of a system.</p>
        <p><b>Characteristics:</b></p>
        <ul>
          <li><b>Non-invasive:</b> Does not require physical modification of the hardware</li>
          <li><b>Stealthy:</b> Hard to detect — the attacker uses normal instructions</li>
          <li><b>Hard to fix:</b> The leakage is inherent in how hardware optimizations work (caches, branch predictors, etc.)</li>
          <li>Exploits <b>shared resources</b> between attacker and victim</li>
        </ul>
        <p><b>Common side channels in hardware:</b></p>
        <ul>
          <li><b>Timing:</b> Measure how long an operation takes (cache hit vs. miss, branch prediction hit vs. miss)</li>
          <li><b>Power:</b> Measure power consumption patterns (different instructions consume different power)</li>
          <li><b>Electromagnetic:</b> Measure EM emissions from the chip</li>
        </ul>
        <p>In CS 450, we focus on <b>timing-based microarchitectural side channels</b> — specifically cache and memory side channels.</p>
      `,
      keyPoints: [
        'Side channel = unintended information leakage, not through normal I/O',
        'Non-invasive, stealthy, hard to fix — inherent in hardware optimizations',
        'Exploits shared resources (caches, memory, branch predictors)',
        'Timing-based: measure cache hit/miss or DRAM row buffer hit/miss latency',
      ],
    },
    {
      id: 'sec-cache',
      title: 'Cache Side Channels: Prime+Probe & Flush+Reload',
      content: `
        <p>Cache side channels exploit the fact that cache hit/miss timing is observable and depends on what the <i>victim</i> has accessed.</p>
        <p><b>General procedure:</b></p>
        <ol>
          <li>Set cache to a known state</li>
          <li>Wait for victim to execute</li>
          <li>Check what changed in the cache (via timing)</li>
        </ol>
        <p><b>Prime+Probe:</b></p>
        <ol>
          <li><b>Prime:</b> Attacker fills specific cache sets with their own data (accesses enough addresses to fill every way in target sets)</li>
          <li><b>Wait:</b> Victim runs and potentially evicts some of the attacker's data</li>
          <li><b>Probe:</b> Attacker re-accesses their data and times each access. If an access is <b>slow</b> (cache miss), the victim must have accessed that set → information leaked!</li>
        </ol>
        <p><b>Flush+Reload:</b> (requires shared memory, e.g., shared libraries)</p>
        <ol>
          <li><b>Flush:</b> Attacker uses <code>clflush</code> to evict a shared cache line</li>
          <li><b>Wait:</b> Victim runs</li>
          <li><b>Reload:</b> Attacker accesses the same line and times it. If <b>fast</b> (cache hit), the victim accessed it. If <b>slow</b> (miss), the victim didn't.</li>
        </ol>
        <p>Flush+Reload has higher resolution (per cache line vs. per set) but requires shared memory pages.</p>
      `,
      keyPoints: [
        'Cache side channels: hit/miss timing reveals victim access patterns',
        'Prime+Probe: fill sets → wait → re-access and time (slow = victim used that set)',
        'Flush+Reload: flush shared line → wait → reload and time (fast = victim used it)',
        'Flush+Reload has finer granularity but requires shared memory',
      ],
      examTip: 'Be able to describe the 3 steps of each attack. Know the difference: Prime+Probe works without shared memory, Flush+Reload needs it but is more precise.',
    },
    {
      id: 'sec-memory',
      title: 'Memory Side Channels (DRAMA)',
      content: `
        <p>The <b>DRAMA</b> attack exploits DRAM row buffer timing as a side channel:</p>
        <ul>
          <li>A <b>row buffer hit</b> is faster than a <b>row buffer miss/conflict</b></li>
          <li>If the attacker and victim share a DRAM bank, the attacker can detect which row the victim accessed by observing row buffer hit/miss timing</li>
        </ul>
        <p><b>Attack procedure:</b></p>
        <ol>
          <li>Attacker accesses an address that maps to a specific bank and row (opens that row)</li>
          <li>Victim accesses memory</li>
          <li>Attacker re-accesses the same address. If <b>fast</b> (row hit), the victim did NOT access a different row in that bank. If <b>slow</b> (row conflict), the victim accessed a different row in the same bank → leaked info.</li>
        </ol>
        <p>This is harder to mitigate than cache side channels because you cannot easily "flush" a row buffer, and DRAM is even more fundamental than caches.</p>
      `,
      keyPoints: [
        'DRAMA: row buffer hit/miss timing leaks which DRAM rows were accessed',
        'Requires attacker and victim to share a DRAM bank',
        'Row hit (fast) = victim didn\'t change the row; row conflict (slow) = victim used different row',
        'Harder to mitigate than cache side channels — row buffer is fundamental to DRAM',
      ],
    },
    {
      id: 'sec-rowhammer',
      title: 'Rowhammer',
      content: `
        <p><b>Rowhammer</b> is a hardware vulnerability where repeatedly activating (hammering) a DRAM row causes <b>bit flips</b> in adjacent rows.</p>
        <p><b>Mechanism:</b></p>
        <ul>
          <li>When a row is activated, the electrical disturbance affects neighboring rows</li>
          <li>A single activation causes negligible disturbance, but <b>thousands of rapid activations</b> (within a refresh interval) can cause enough charge leakage in adjacent cells to flip bits</li>
          <li>The attacked row is called the <b>aggressor row</b>; the row with bit flips is the <b>victim row</b></li>
        </ul>
        <p><b>Why it's dangerous:</b></p>
        <ul>
          <li>An unprivileged user program can flip bits in memory it does NOT own</li>
          <li>Can flip bits in page tables → <b>privilege escalation</b></li>
          <li>Can flip bits in other processes' data → <b>data corruption</b></li>
          <li>Demonstrated: user-level program gaining kernel privileges by flipping page table bits</li>
        </ul>
        <p><b>Root cause:</b> Electromagnetic interference between adjacent DRAM rows, worsened by smaller cell sizes and tighter row spacing in modern DRAM.</p>
        <p><b>Mitigations:</b> Increased refresh rate (but costs energy/performance), targeted row refresh (refresh victim rows when aggressor is hammered), ECC (but multi-bit flips can bypass it).</p>
      `,
      keyPoints: [
        'Repeated activation of aggressor row causes bit flips in adjacent victim rows',
        'Electromagnetic interference between tightly packed DRAM rows',
        'Can be exploited for privilege escalation (flip page table bits)',
        'Worsens with smaller process technology (tighter spacing)',
        'Mitigations: faster refresh, targeted refresh, ECC (limited)',
      ],
      examTip: 'Know the mechanism (repeated row activation → adjacent row bit flips) and why it enables security attacks (flip bits you don\'t own, e.g., page table entries).',
    },
    {
      id: 'sec-spectre',
      title: 'Spectre',
      content: `
        <p><b>Spectre</b> exploits <b>speculative execution</b> combined with a <b>cache side channel</b> to leak secret data.</p>
        <p><b>Key insight:</b> When the CPU speculatively executes instructions down a mispredicted path, those instructions can access secret data. Even though the architectural results are rolled back, the <b>cache state changes persist</b> (cache is not rolled back on a squash).</p>
        <p><b>Spectre v1 (Bounds Check Bypass) — simplified:</b></p>
        <pre>
if (x &lt; array1_size) {         // branch mispredicted as taken
    y = array2[array1[x] * 256]; // speculatively executed
}
        </pre>
        <ol>
          <li>Attacker trains the branch predictor to predict "taken"</li>
          <li>Attacker provides a malicious <code>x</code> that is out-of-bounds (reads secret data from <code>array1[x]</code>)</li>
          <li>The speculative load <code>array2[secret * 256]</code> brings a cache line into the cache that <b>depends on the secret value</b></li>
          <li>Even after the branch resolves and speculative results are squashed, the cache line remains</li>
          <li>Attacker uses Flush+Reload or Prime+Probe on <code>array2</code> to determine which cache line was loaded → reveals the secret value</li>
        </ol>
        <p><b>Why it's hard to fix:</b> Speculative execution is fundamental to performance. Preventing all speculative side effects would severely degrade performance.</p>
      `,
      keyPoints: [
        'Speculative execution + cache side channel = leak secret data',
        'Speculative instructions modify cache state, which is NOT rolled back',
        'Attacker trains branch predictor, provides out-of-bounds index, reads secret speculatively',
        'Secret value encoded in cache state, extracted via Flush+Reload or Prime+Probe',
        'Hard to fix: speculative execution is critical for performance',
      ],
      examTip: 'Understand the two key components: (1) speculative execution accesses secret data, (2) cache side channel extracts the secret. Know why the cache is not rolled back.',
    },
  ],

  'microarch-simulation': [
    {
      id: 'sim-why',
      title: 'Why Simulate?',
      content: `
        <p>Computer architects need simulation because:</p>
        <ul>
          <li><b>Hardware is expensive and slow to build:</b> Fabricating a chip takes months and millions of dollars. You need to evaluate design ideas before committing to silicon.</li>
          <li><b>Design space is enormous:</b> Cache size, associativity, pipeline depth, branch predictor type, memory scheduling policy — too many combinations to build them all.</li>
          <li><b>Workload diversity:</b> Need to test designs against many different applications and input sets.</li>
          <li><b>What-if analysis:</b> "What if I double L2 cache?" "What if I add a victim cache?" Simulation lets you answer these quickly.</li>
        </ul>
        <p><b>Types of simulators:</b></p>
        <ul>
          <li><b>Functional simulator:</b> Only models correctness (does the ISA produce the right results?). Fast but no timing information.</li>
          <li><b>Timing simulator:</b> Models the <i>performance</i> of the microarchitecture (cycle-by-cycle). Slow but gives CPI, cache miss rates, etc.</li>
          <li><b>Trace-driven:</b> Replay a recorded instruction trace. Faster but cannot model wrong-path effects (speculative execution).</li>
          <li><b>Execution-driven:</b> Actually executes the program, modeling microarchitecture effects. Can model speculation correctly. Slower.</li>
        </ul>
      `,
      keyPoints: [
        'Simulation enables design exploration before expensive fabrication',
        'Functional sim: correctness only, fast. Timing sim: performance modeling, slow',
        'Trace-driven: replay recorded traces (fast, no wrong-path). Execution-driven: runs code (accurate, slower)',
        'Key metrics: CPI, cache miss rate, branch misprediction rate, IPC',
      ],
    },
  ],

  'fundamentals': [
    {
      id: 'fund-vonneumann',
      title: 'Von Neumann Model',
      content: `
        <p>The <b>Von Neumann architecture</b> (stored-program computer) consists of:</p>
        <ul>
          <li><b>Memory:</b> Stores both instructions and data (unified memory). Connected to CPU via:
            <ul>
              <li><b>MAR (Memory Address Register):</b> Holds the address of the memory location to access</li>
              <li><b>MDR (Memory Data Register):</b> Holds the data read from or to be written to memory</li>
            </ul>
          </li>
          <li><b>Processing Unit:</b> Performs computation.
            <ul>
              <li><b>ALU (Arithmetic Logic Unit):</b> Performs arithmetic and logical operations</li>
              <li><b>TEMP registers:</b> Hold intermediate values during computation</li>
            </ul>
          </li>
          <li><b>Control Unit:</b> Directs the operation of the processor.
            <ul>
              <li><b>IP (Instruction Pointer) / PC (Program Counter):</b> Points to the next instruction to fetch</li>
              <li><b>IR (Instruction Register):</b> Holds the currently executing instruction</li>
            </ul>
          </li>
          <li><b>I/O:</b> Interface to the outside world (keyboard, display, disk, network, etc.)</li>
        </ul>
        <p><b>Key property:</b> Instructions are fetched and executed <i>sequentially</i> (one at a time, in program order). The IP is incremented after each instruction (unless a branch changes it).</p>
        <p><b>Von Neumann bottleneck:</b> The single bus between memory and CPU limits bandwidth. Both instruction fetches and data accesses compete for the same bus.</p>
      `,
      keyPoints: [
        'Stored-program: instructions and data in the same memory',
        'Components: Memory (MAR/MDR), Processing (ALU/TEMP), Control (IP/IR), I/O',
        'Sequential execution: fetch → decode → execute → writeback, one at a time',
        'Von Neumann bottleneck: instruction and data share the same memory bus',
      ],
      examTip: 'Know the specific registers (MAR, MDR, IP/PC, IR) and what each does. The Von Neumann bottleneck concept comes up often.',
    },
    {
      id: 'fund-dataflow',
      title: 'Dataflow Computing',
      content: `
        <p><b>Dataflow computing</b> is an alternative model where execution is driven by <b>data availability</b>, not a program counter.</p>
        <p><b>Program representation:</b> A directed graph where:</p>
        <ul>
          <li>Nodes represent operations (add, multiply, etc.)</li>
          <li>Edges represent data dependencies</li>
        </ul>
        <p><b>Firing rule:</b> A node <b>fires</b> (executes) when <b>all its input operands are ready</b>. No program counter — multiple nodes can fire simultaneously if their inputs are available.</p>
        <p><b>Advantages:</b></p>
        <ul>
          <li>Exploits <b>irregular parallelism</b> naturally — any independent operations execute in parallel</li>
          <li>Only <b>true (data) dependencies</b> constrain execution order</li>
          <li>No false dependencies (WAR, WAW) since each value is produced once</li>
          <li>Tolerant of latency — other nodes can fire while waiting for slow operations</li>
        </ul>
        <p><b>Disadvantages:</b></p>
        <ul>
          <li><b>No precise state:</b> Cannot stop and say "this is the exact state of computation at this point" — makes debugging and exceptions very difficult</li>
          <li><b>Too much parallelism:</b> In large programs, too many nodes become ready simultaneously → overwhelms hardware resources. Need flow control mechanisms.</li>
          <li><b>High bookkeeping overhead:</b> Tracking which operands are ready, matching tokens, managing the graph is expensive in hardware</li>
          <li><b>Poor locality:</b> Data flows through the graph without regard for cache/memory locality</li>
        </ul>
      `,
      keyPoints: [
        'Program = graph of nodes (operations) with edges (data dependencies)',
        'Firing rule: node executes when ALL inputs are ready (no PC)',
        'Advantages: exploits irregular parallelism, only true dependencies matter',
        'Disadvantages: no precise state, too much parallelism, high bookkeeping, poor locality',
      ],
      examTip: 'Contrast dataflow with Von Neumann. Know the 4 advantages and 4 disadvantages. Dataflow is conceptually important even though pure dataflow machines are rare.',
    },
  ],

  'isa': [
    {
      id: 'isa-elements',
      title: 'Elements of an ISA',
      content: `
        <p>An <b>ISA (Instruction Set Architecture)</b> is the contract between software and hardware. It specifies:</p>
        <ul>
          <li><b>Instruction sequencing model:</b>
            <ul>
              <li><b>Control flow:</b> Sequential execution with explicit branches (Von Neumann — most common)</li>
              <li><b>Data flow:</b> Execution determined by data availability (dataflow model)</li>
            </ul>
          </li>
          <li><b>Processing style (operand model):</b>
            <ul>
              <li><b>0-address (stack):</b> Operands implicit on top of stack. E.g., <code>PUSH A; PUSH B; ADD</code> → pops top 2, pushes result. Compact code but limited parallelism.</li>
              <li><b>1-address (accumulator):</b> One implicit operand is the accumulator register. E.g., <code>LOAD A; ADD B</code> → ACC = ACC + B. Simple but accumulator is a bottleneck.</li>
              <li><b>2-address:</b> Source is also the destination. E.g., <code>ADD R1, R2</code> → R1 = R1 + R2. Destroys one source operand.</li>
              <li><b>3-address:</b> Separate source and destination. E.g., <code>ADD R1, R2, R3</code> → R1 = R2 + R3. Most flexible, longest instructions.</li>
            </ul>
          </li>
          <li><b>Data types, registers, memory addressing, condition codes, etc.</b></li>
        </ul>
      `,
      keyPoints: [
        '0-address (stack): implicit operands on stack — compact but serial',
        '1-address (accumulator): ACC is implicit — simple but bottleneck',
        '2-address: source = destination — destroys one operand',
        '3-address: separate src/dest — most flexible, longest encoding',
      ],
    },
    {
      id: 'isa-addressing',
      title: 'Addressing Modes',
      content: `
        <p>Addressing modes specify <b>how to compute the effective address</b> of an operand:</p>
        <ul>
          <li><b>Absolute (Direct):</b> Address is in the instruction. <code>LOAD R1, [0x1000]</code></li>
          <li><b>Register Indirect:</b> Address is in a register. <code>LOAD R1, [R2]</code></li>
          <li><b>Displaced (Based):</b> Register + constant offset. <code>LOAD R1, [R2 + 100]</code>. Common for struct field access, stack frames.</li>
          <li><b>Indexed:</b> Base register + index register (possibly scaled). <code>LOAD R1, [R2 + R3*4]</code>. Common for array access.</li>
          <li><b>Memory Indirect:</b> Address in memory points to the actual address. <code>LOAD R1, [[R2]]</code>. Pointer dereference. Requires two memory accesses.</li>
          <li><b>Auto-increment/decrement:</b> Register is updated after/before access. <code>LOAD R1, [R2++]</code>. Useful for sequential array traversal.</li>
        </ul>
        <p><b>Trade-off:</b> More addressing modes → more flexible for programmer/compiler, but harder to decode and potentially slower.</p>
      `,
      keyPoints: [
        'Absolute: address in instruction. Register indirect: address in register',
        'Displaced: reg + offset (struct fields, stack). Indexed: reg + reg*scale (arrays)',
        'Memory indirect: pointer-to-pointer (2 memory accesses)',
        'Auto inc/dec: update register after access (array traversal)',
        'More modes = more flexibility but harder to decode',
      ],
    },
    {
      id: 'isa-cisc-risc',
      title: 'CISC vs RISC & Instruction Encoding',
      content: `
        <p><b>CISC (Complex Instruction Set Computer):</b> e.g., x86</p>
        <ul>
          <li>Many complex instructions (string ops, BCD arithmetic, etc.)</li>
          <li>Variable-length instructions (1-15 bytes in x86)</li>
          <li>Instructions can access memory directly (register-memory architecture)</li>
          <li>Non-uniform decode (different formats per instruction class)</li>
          <li>Fewer instructions per program, but each takes more cycles</li>
        </ul>
        <p><b>RISC (Reduced Instruction Set Computer):</b> e.g., MIPS, ARM, RISC-V</p>
        <ul>
          <li>Simple, regular instructions</li>
          <li>Fixed-length instructions (32 bits typically)</li>
          <li><b>Load/store architecture:</b> Only load/store instructions access memory; ALU operates on registers only</li>
          <li>Uniform decode (few formats, regular field positions)</li>
          <li>More instructions per program, but each completes in fewer cycles</li>
        </ul>
        <p><b>Instruction length trade-offs:</b></p>
        <ul>
          <li><b>Fixed length:</b> Easier decode, simpler fetch (always know where next instruction starts), but wastes bits (padding for short instructions)</li>
          <li><b>Variable length:</b> More compact code (good for I-cache), but complex decode (must parse instruction to find length and next instruction)</li>
        </ul>
        <p><b>Uniform vs non-uniform decode:</b></p>
        <ul>
          <li><b>Uniform:</b> Same bits always mean the same thing (opcode always in same position) → fast, simple decode</li>
          <li><b>Non-uniform:</b> Field meanings depend on opcode → requires more complex decode logic</li>
        </ul>
        <p><b>Load/store vs register/memory:</b></p>
        <ul>
          <li><b>Load/store:</b> Only explicit load/store instructions touch memory. ALU instructions only use registers. Simple pipeline, easy to determine when memory is needed.</li>
          <li><b>Register/memory:</b> ALU instructions can have memory operands. More compact code but complicates pipeline (memory access stage needed for ALU instructions).</li>
        </ul>
      `,
      keyPoints: [
        'CISC: complex instructions, variable-length, register-memory, non-uniform decode',
        'RISC: simple instructions, fixed-length, load/store, uniform decode',
        'Fixed length = easy decode but wasted bits; variable = compact but hard decode',
        'Load/store: only loads/stores touch memory (simpler pipeline)',
        'Register/memory: ALU can use memory operands (compact but complex pipeline)',
      ],
      examTip: 'Know the 4 key RISC properties: fixed-length, load/store, uniform decode, simple instructions. Understand WHY each property simplifies the microarchitecture.',
    },
  ],

  'pipelining': [
    {
      id: 'pipe-singlecycle',
      title: 'Single-Cycle Machine (MIPS Datapath)',
      content: `
        <p>In a <b>single-cycle machine</b>, every instruction completes in <b>one clock cycle</b>. The clock period must be long enough for the <b>slowest instruction</b> (typically a load: IF + ID + EX + MEM + WB all in one cycle).</p>
        <p><b>MIPS datapath stages</b> (which become pipeline stages):</p>
        <ol>
          <li><b>IF (Instruction Fetch):</b> Read instruction from I-cache using PC</li>
          <li><b>ID (Instruction Decode):</b> Decode instruction, read register file</li>
          <li><b>EX (Execute):</b> ALU operation, address calculation, branch resolution</li>
          <li><b>MEM (Memory Access):</b> Load/store access D-cache</li>
          <li><b>WB (Write Back):</b> Write result to register file</li>
        </ol>
        <p><b>Problem:</b> The clock cycle time is determined by the longest instruction. A simple ADD doesn't need MEM, but it still takes the full cycle. This wastes time for fast instructions.</p>
        <p><b>Solution:</b> Pipelining — divide execution into stages and overlap multiple instructions.</p>
      `,
      keyPoints: [
        'Single-cycle: one instruction per cycle, clock = slowest instruction time',
        'MIPS stages: IF → ID → EX → MEM → WB',
        'Problem: fast instructions wait for slow instruction\'s cycle time',
        'Motivation for pipelining: overlap instructions in different stages',
      ],
    },
    {
      id: 'pipe-basics',
      title: 'Pipelining Basics',
      content: `
        <p><b>Pipelining</b> overlaps the execution of multiple instructions. While one instruction is in EX, the next is in ID, and the one after is in IF.</p>
        <p><b>Ideal pipeline assumptions:</b></p>
        <ul>
          <li>All operations are <b>identical</b> (take the same time)</li>
          <li>All operations are <b>independent</b> (no dependencies)</li>
          <li>Sub-operations are <b>uniform</b> (all stages take the same time)</li>
        </ul>
        <p><b>Throughput formula</b> for k-stage pipeline processing N instructions:</p>
        <pre>BW = N / (k + N - 1) cycles</pre>
        <p>With latch (pipeline register) overhead S per stage:</p>
        <pre>BW_k = 1 / (T/k + S)</pre>
        <p>where T = total unpipelined delay, k = number of stages, S = latch delay per stage.</p>
        <p><b>Ideal speedup:</b> k (equal to number of stages). In practice, always less due to:</p>
        <ul>
          <li><b>Pipeline stalls:</b> Dependencies force bubbles (empty cycles)</li>
          <li><b>Latch overhead:</b> Each stage boundary adds S time</li>
          <li><b>Non-uniform stages:</b> Clock period = longest stage → shorter stages waste time (<b>internal fragmentation</b>)</li>
          <li><b>External fragmentation:</b> Not all operations use all stages (e.g., ADD doesn't need MEM)</li>
        </ul>
      `,
      keyPoints: [
        'Pipeline overlaps multiple instructions in different stages',
        'Ideal: all ops identical, independent, uniform sub-operations',
        'Throughput: BW_k = 1/(T/k + S), ideal speedup = k stages',
        'Reality: stalls, latch overhead, non-uniform stages reduce speedup',
        'Internal fragmentation: clock = longest stage; External: not all ops use all stages',
      ],
      examTip: 'Be able to calculate throughput with the BW formula. Know the three ideal pipeline assumptions and what happens when each is violated.',
    },
    {
      id: 'pipe-dependencies',
      title: 'Data Dependencies & Hazards',
      content: `
        <p>Dependencies between instructions cause pipeline <b>hazards</b> that require stalls or special handling.</p>
        <p><b>Types of data dependencies:</b></p>
        <ul>
          <li><b>RAW (Read After Write) — True dependency:</b> Instruction B reads a value that instruction A writes. B must wait for A's result. <code>ADD R1,R2,R3; SUB R4,R1,R5</code> (SUB reads R1 that ADD writes).</li>
          <li><b>WAR (Write After Read) — Anti-dependency:</b> Instruction B writes a register that A reads. Only a problem in out-of-order execution. <code>ADD R1,R2,R3; SUB R2,R4,R5</code> (SUB writes R2 that ADD reads).</li>
          <li><b>WAW (Write After Write) — Output dependency:</b> Both A and B write the same register. Only a problem with out-of-order or multi-cycle operations. <code>ADD R1,R2,R3; SUB R1,R4,R5</code>.</li>
        </ul>
        <p><b>In a simple in-order pipeline:</b> Only <b>RAW</b> dependencies cause hazards (WAR and WAW are handled by in-order execution naturally).</p>
        <p><b>Control dependencies:</b> A branch instruction determines whether subsequent instructions should execute. If the branch is not yet resolved, subsequent instructions may be wrong-path.</p>
      `,
      keyPoints: [
        'RAW (true): B reads what A writes — always a real dependency',
        'WAR (anti): B writes what A reads — problem only in out-of-order',
        'WAW (output): both write same register — problem in out-of-order / multi-cycle',
        'In-order pipeline: only RAW causes stalls',
        'Control dependency: branch outcome determines subsequent instructions',
      ],
    },
    {
      id: 'pipe-forwarding',
      title: 'Data Forwarding / Bypassing',
      content: `
        <p><b>Forwarding (bypassing)</b> is a hardware technique to resolve RAW hazards <b>without stalling</b> (when possible).</p>
        <p><b>Key insight:</b> The result is computed at the end of the <b>EX stage</b> (or MEM for loads), but is not written to the register file until the <b>WB stage</b>. A dependent instruction needs the value at the start of its EX stage.</p>
        <p><b>Without forwarding:</b> Must stall until the producing instruction writes back (2 cycle bubble for EX→EX dependency).</p>
        <p><b>With forwarding:</b></p>
        <ul>
          <li>Add multiplexers at ALU inputs</li>
          <li>Forward the result directly from the output of EX (or MEM) to the input of EX for the dependent instruction</li>
          <li><b>EX-to-EX forwarding:</b> Result from EX of instruction i is forwarded to EX of instruction i+1. No stall needed.</li>
          <li><b>MEM-to-EX forwarding:</b> Result from MEM of instruction i forwarded to EX of instruction i+1. Also no stall if available in time.</li>
        </ul>
        <p><b>Load-use dependency:</b> Even with forwarding, a <b>load</b> followed by a dependent instruction still requires <b>1 cycle stall</b>. The load data is only available after MEM, but the dependent instruction needs it at EX — there's a 1-cycle gap that cannot be forwarded away.</p>
        <p><b>The register file is a communication abstraction:</b> Forwarding "short-circuits" the register file to get data to dependent instructions sooner.</p>
      `,
      keyPoints: [
        'Forwarding: send result directly from EX/MEM output to next instruction\'s EX input',
        'Eliminates most RAW stalls (EX→EX, MEM→EX forwarding)',
        'Load-use hazard: load + dependent instruction still needs 1-cycle stall',
        'Register file = communication abstraction; forwarding bypasses it for speed',
      ],
      examTip: 'Draw pipeline diagrams with forwarding paths. The load-use case (1 stall even with forwarding) is a classic exam question. Be able to identify where stalls are unavoidable.',
    },
  ],

  'simd-and-multicore': [
    {
      id: 'simd-flynn',
      title: 'Flynn\'s Taxonomy',
      content: `
        <p><b>Flynn's taxonomy</b> classifies architectures by the number of instruction and data streams:</p>
        <table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">
          <tr style="border-bottom: 1px solid #333;">
            <th style="padding: 4px 12px;"></th>
            <th style="padding: 4px 12px;">Single Data</th>
            <th style="padding: 4px 12px;">Multiple Data</th>
          </tr>
          <tr>
            <td style="padding: 4px 12px;"><b>Single Instruction</b></td>
            <td style="padding: 4px 12px;"><b>SISD:</b> Traditional uniprocessor (Von Neumann)</td>
            <td style="padding: 4px 12px;"><b>SIMD:</b> Array/vector processors. Same op on multiple data elements</td>
          </tr>
          <tr>
            <td style="padding: 4px 12px;"><b>Multiple Instruction</b></td>
            <td style="padding: 4px 12px;"><b>MISD:</b> Rare (systolic arrays sometimes classified here)</td>
            <td style="padding: 4px 12px;"><b>MIMD:</b> Multi-core processors. Each core runs its own program on its own data</td>
          </tr>
        </table>
        <ul>
          <li><b>SISD:</b> One instruction stream, one data stream. Classic single-core processor.</li>
          <li><b>SIMD:</b> One instruction controls many processing elements, each operating on different data. GPUs, vector extensions (AVX, SSE).</li>
          <li><b>MISD:</b> Multiple instructions on same data. Very rare; sometimes fault-tolerant systems.</li>
          <li><b>MIMD:</b> Multiple independent processors, each with own instruction and data. Multi-core CPUs, clusters.</li>
        </ul>
      `,
      keyPoints: [
        'SISD: single core, single data stream (classic Von Neumann)',
        'SIMD: one instruction, multiple data (vector/array processors, GPUs)',
        'MISD: multiple instructions, single data (rare)',
        'MIMD: multiple cores, each independent (multi-core, clusters)',
      ],
    },
    {
      id: 'simd-vector',
      title: 'SIMD / Vector Processing',
      content: `
        <p><b>Vector processing</b> applies the same operation to an entire vector (array) of data elements with a single instruction.</p>
        <p><b>Key components:</b></p>
        <ul>
          <li><b>Vector registers:</b> Each holds N data elements (e.g., 64 doubles)</li>
          <li><b>Vector functional units:</b> Pipelined units that process one element per cycle</li>
          <li><b>Vector instructions:</b> <code>VLD</code> (vector load), <code>VST</code> (vector store), <code>VADD</code> (vector add), <code>VMUL</code>, <code>VSHFR</code> (vector shift right), etc.</li>
        </ul>
        <p><b>Advantages over SISD:</b></p>
        <ul>
          <li>One instruction replaces an entire loop → fewer instruction fetches and decodes</li>
          <li>Known regular access pattern → better memory/cache behavior</li>
          <li>No control flow within vector op → no branch mispredictions</li>
          <li>Parallelism at the data level, amortizing instruction overhead</li>
        </ul>
        <p><b>Vector chaining:</b> The output of one vector functional unit is <b>forwarded directly</b> as input to the next vector functional unit, without waiting for the entire vector to complete. Analogous to data forwarding in a scalar pipeline.</p>
        <p>Example: <code>VMUL V3, V1, V2</code> followed by <code>VADD V5, V3, V4</code> — as each element of V3 is produced by VMUL, it's immediately consumed by VADD.</p>
      `,
      keyPoints: [
        'Vector register holds N elements; one instruction operates on all',
        'VLD, VST, VADD, VMUL, VSHFR — vector ISA instructions',
        'Advantages: fewer fetches/decodes, regular memory access, no branches',
        'Vector chaining: forward elements between vector FUs as they\'re produced',
      ],
    },
    {
      id: 'simd-membank',
      title: 'Memory Banking for Vector Access',
      content: `
        <p>Vector loads/stores need to supply one element per cycle to the vector unit. A single memory bank cannot sustain this bandwidth.</p>
        <p><b>Solution: Multiple independent memory banks</b></p>
        <ul>
          <li>Distribute consecutive addresses across different banks</li>
          <li>If there are B banks, consecutive elements go to banks 0, 1, 2, ..., B-1, 0, 1, ...</li>
          <li>Access to different banks can proceed in parallel</li>
          <li>Need enough banks to hide the access latency of each bank</li>
        </ul>
        <p><b>Bank conflict:</b> If two accesses go to the same bank simultaneously, one must wait. Stride-N accesses with N being a multiple of B cause systematic bank conflicts.</p>
        <p><b>Rule of thumb:</b> Need at least as many banks as the memory access latency (in cycles) to sustain one element per cycle.</p>
      `,
      keyPoints: [
        'Multiple banks enable parallel memory accesses for vector loads',
        'Consecutive elements interleaved across banks',
        'Bank conflict: two accesses to same bank must serialize',
        'Need #banks >= memory latency to sustain 1 element/cycle',
      ],
    },
    {
      id: 'simd-amdahl',
      title: 'Amdahl\'s Law',
      content: `
        <p><b>Amdahl's Law</b> gives the theoretical maximum speedup of a program when only a fraction of it can be parallelized:</p>
        <pre>Speedup = 1 / ((1 - f) + f/S)</pre>
        <p>where:</p>
        <ul>
          <li><b>f</b> = fraction of execution time that can be sped up (parallelizable portion)</li>
          <li><b>S</b> = speedup factor for the parallelizable portion (e.g., number of cores)</li>
          <li><b>(1-f)</b> = serial (non-parallelizable) portion</li>
        </ul>
        <p><b>Key implications:</b></p>
        <ul>
          <li>Even with infinite speedup of the parallel portion (S → infinity), the maximum speedup is <code>1/(1-f)</code></li>
          <li>If 10% of the program is serial (f=0.9), maximum speedup is 10x, no matter how many cores</li>
          <li><b>Focus on the common case:</b> To maximize overall speedup, the fraction f should be as large as possible AND S should be as large as possible</li>
          <li>Diminishing returns: doubling cores from 100 to 200 helps far less than doubling from 1 to 2</li>
        </ul>
      `,
      keyPoints: [
        'Speedup = 1/((1-f) + f/S) where f = parallelizable fraction, S = speedup of that fraction',
        'Max speedup with infinite S: 1/(1-f) — limited by serial portion',
        'Make the common case fast: maximize both f and S',
        'Diminishing returns with more parallelism if serial portion exists',
      ],
      examTip: 'Be able to calculate speedup given f and S. Also know how to solve for f given a desired speedup. Very commonly tested formula.',
    },
    {
      id: 'simd-multicore',
      title: 'Multi-Core Processors',
      content: `
        <p><b>Multi-core</b> = multiple independent processor cores on the same die.</p>
        <p><b>Why multi-core?</b> Power wall — increasing single-core frequency hit diminishing returns due to cubic power scaling (P proportional to V<sup>2</sup>f, and V must increase with f). Instead, use multiple simpler cores at lower frequency.</p>
        <p><b>Advantages:</b></p>
        <ul>
          <li>More power-efficient than a single fast core (2 cores at half freq ≈ same perf at 1/4 power)</li>
          <li>Simpler individual cores → easier to design and verify</li>
          <li>Higher aggregate throughput for parallel workloads</li>
        </ul>
        <p><b>Disadvantages:</b></p>
        <ul>
          <li>Requires <b>parallel software</b> — single-threaded programs don't benefit</li>
          <li>Shared resources (caches, memory, interconnect) cause <b>interference</b> between cores</li>
          <li>Single-thread performance may decrease due to shared resource contention</li>
          <li>Programming complexity: synchronization, deadlocks, data races</li>
        </ul>
      `,
      keyPoints: [
        'Multiple cores on one die — motivated by power wall',
        'More power-efficient: 2 cores at half freq ≈ 1/4 power of one fast core',
        'Requires parallel software — Amdahl\'s law limits speedup',
        'Shared resources cause interference between applications',
      ],
    },
    {
      id: 'simd-systolic',
      title: 'Systolic Arrays & TPU',
      content: `
        <p>A <b>systolic array</b> is a grid of processing elements (PEs) where data flows rhythmically through the array (like blood through the heart — hence "systolic").</p>
        <p><b>Key properties:</b></p>
        <ul>
          <li>Each PE performs a simple operation (typically multiply-accumulate)</li>
          <li>Data flows between neighboring PEs in a regular pattern</li>
          <li>High throughput with minimal memory bandwidth — data is reused as it flows</li>
          <li>Very regular structure — easy to layout in silicon</li>
        </ul>
        <p><b>Convolution example (W1 design):</b></p>
        <ul>
          <li>Weights <b>stay fixed</b> in the PEs (weight-stationary)</li>
          <li>Input data (x values) flow from left to right</li>
          <li>Output data (y values) flow from right to left (opposite direction)</li>
          <li>Each PE computes: <code>y_out = y_in + weight × x_in</code> and passes x to the right</li>
        </ul>
        <p><b>Matrix Multiplication:</b> Systolic arrays naturally compute matrix multiplication — one matrix flows through rows, the other through columns, results accumulate in each PE.</p>
        <p><b>Google TPU (Tensor Processing Unit):</b></p>
        <ul>
          <li>Contains a <b>256 × 256 systolic array</b> of 8-bit multiply-accumulate (MAC) units</li>
          <li>Total: 256 × 256 = <b>65,536 MACs</b></li>
          <li>Designed for neural network inference (matrix multiplications are the core operation)</li>
          <li>Weight-stationary dataflow: weights loaded into PEs, activations flow through</li>
          <li>Achieves very high throughput for matrix operations with minimal memory bandwidth</li>
        </ul>
      `,
      keyPoints: [
        'Systolic array: grid of PEs, data flows rhythmically through the array',
        'W1 convolution: weights stay, x flows right, y flows left',
        'Naturally computes matrix multiplication and convolution',
        'Google TPU: 256x256 systolic array, 65536 8-bit MACs',
        'Weight-stationary: weights preloaded, activations flow through',
      ],
      examTip: 'Know the W1 systolic array design for convolution: which data stays, which moves, and in what direction. Also know TPU specs: 256x256, 8-bit MACs, 65536 units. Be able to trace through a small systolic array computation.',
    },
  ],
};
