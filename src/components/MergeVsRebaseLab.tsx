import React, { useState } from 'react';
import { GitMerge, ArrowRight, RotateCcw, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

type OperationMode = 'initial' | 'merge' | 'rebase' | 'fastforward';

export const MergeVsRebaseLab: React.FC = () => {
  const [mode, setMode] = useState<OperationMode>('initial');

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0d1117] space-y-6">
      {/* Title & Introduction */}
      <div className="p-4 bg-[#161b22] border border-[#30363d] rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <GitMerge className="w-5 h-5 text-[#58a6ff]" />
            <h2 className="text-base font-bold text-[#f0f6fc]">
              Merge vs Rebase Learning Lab
            </h2>
          </div>
          <p className="text-xs text-[#8b949e] mt-1">
            Compare how <span className="text-[#a371f7] font-semibold">git merge</span> preserves real historical topology vs how <span className="text-[#58a6ff] font-semibold">git rebase</span> creates a linear timeline.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setMode('merge')}
            className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition-colors ${
              mode === 'merge'
                ? 'bg-[#8957e5] text-white shadow'
                : 'bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d] border border-[#30363d]'
            }`}
          >
            1. git merge main
          </button>

          <button
            onClick={() => setMode('rebase')}
            className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition-colors ${
              mode === 'rebase'
                ? 'bg-[#1f6feb] text-white shadow'
                : 'bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d] border border-[#30363d]'
            }`}
          >
            2. git rebase main
          </button>

          <button
            onClick={() => setMode('fastforward')}
            className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition-colors ${
              mode === 'fastforward'
                ? 'bg-[#238636] text-white shadow'
                : 'bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d] border border-[#30363d]'
            }`}
          >
            3. Fast-Forward
          </button>

          <button
            onClick={() => setMode('initial')}
            className="p-1.5 text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d] rounded transition-colors"
            title="Reset to initial state"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Visual Commit Graph Canvas */}
      <div className="p-6 bg-[#161b22] border border-[#30363d] rounded-xl space-y-4">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-[#8b949e]">
            ACTIVE SIMULATION: <span className="text-[#f0f6fc] uppercase font-bold">{mode}</span>
          </span>
          <span className="text-[11px] text-[#58a6ff]">
            {mode === 'initial' && 'Diverged branches: main (A-B-E) and feature (C-D)'}
            {mode === 'merge' && '3-way merge created merge commit M with two parents'}
            {mode === 'rebase' && 'Commits C and D replayed as brand-new C\' and D\''}
            {mode === 'fastforward' && 'Pointer simply moved forward without extra commit'}
          </span>
        </div>

        {/* Dynamic ASCII / SVG Graph Visualization */}
        <div className="p-6 bg-[#0d1117] border border-[#30363d] rounded-lg overflow-x-auto font-mono text-xs flex items-center justify-center min-h-[180px]">
          {mode === 'initial' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-[#8b949e] w-20">main:</span>
                <span className="px-3 py-1 rounded bg-[#21262d] border border-[#30363d] text-[#c9d1d9]">[A]</span>
                <span className="text-[#8b949e]">→</span>
                <span className="px-3 py-1 rounded bg-[#21262d] border border-[#30363d] text-[#c9d1d9]">[B]</span>
                <span className="text-[#8b949e]">→</span>
                <span className="px-3 py-1 rounded bg-[#21262d] border border-[#30363d] text-[#c9d1d9]">[E]</span>
                <span className="text-xs px-2 py-0.5 rounded bg-[#1f6feb]/20 text-[#58a6ff] border border-[#58a6ff]">main</span>
              </div>
              <div className="flex items-center gap-3 pl-36">
                <span className="text-[#8b949e]">↘</span>
                <span className="px-3 py-1 rounded bg-[#21262d] border border-[#30363d] text-[#c9d1d9]">[C]</span>
                <span className="text-[#8b949e]">→</span>
                <span className="px-3 py-1 rounded bg-[#21262d] border border-[#30363d] text-[#c9d1d9]">[D]</span>
                <span className="text-xs px-2 py-0.5 rounded bg-[#a371f7]/20 text-[#a371f7] border border-[#a371f7]">feature</span>
              </div>
            </div>
          )}

          {mode === 'merge' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-[#8b949e] w-20">main:</span>
                <span className="px-3 py-1 rounded bg-[#21262d] border border-[#30363d] text-[#c9d1d9]">[A]</span>
                <span className="text-[#8b949e]">→</span>
                <span className="px-3 py-1 rounded bg-[#21262d] border border-[#30363d] text-[#c9d1d9]">[B]</span>
                <span className="text-[#8b949e]">→</span>
                <span className="px-3 py-1 rounded bg-[#21262d] border border-[#30363d] text-[#c9d1d9]">[E]</span>
                <span className="text-[#8b949e]">↘</span>
                <span className="px-3 py-1 rounded bg-[#8957e5] border border-[#a371f7] text-white font-bold animate-pulse">[M: Merge Commit]</span>
                <span className="text-xs px-2 py-0.5 rounded bg-[#a371f7]/20 text-[#a371f7] border border-[#a371f7]">feature (HEAD)</span>
              </div>
              <div className="flex items-center gap-3 pl-36">
                <span className="text-[#8b949e]">↘</span>
                <span className="px-3 py-1 rounded bg-[#21262d] border border-[#30363d] text-[#c9d1d9]">[C]</span>
                <span className="text-[#8b949e]">→</span>
                <span className="px-3 py-1 rounded bg-[#21262d] border border-[#30363d] text-[#c9d1d9]">[D]</span>
                <span className="text-[#8b949e]">↗</span>
              </div>
            </div>
          )}

          {mode === 'rebase' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[#8b949e] w-20">linear:</span>
                <span className="px-3 py-1 rounded bg-[#21262d] border border-[#30363d] text-[#c9d1d9]">[A]</span>
                <span className="text-[#8b949e]">→</span>
                <span className="px-3 py-1 rounded bg-[#21262d] border border-[#30363d] text-[#c9d1d9]">[B]</span>
                <span className="text-[#8b949e]">→</span>
                <span className="px-3 py-1 rounded bg-[#21262d] border border-[#30363d] text-[#c9d1d9]">[E]</span>
                <span className="text-xs px-2 py-0.5 rounded bg-[#1f6feb]/20 text-[#58a6ff] border border-[#58a6ff]">main</span>
                <span className="text-[#8b949e]">→</span>
                <span className="px-3 py-1 rounded bg-[#1f6feb]/20 border border-[#58a6ff] text-[#58a6ff] font-bold">[C']</span>
                <span className="text-[#8b949e]">→</span>
                <span className="px-3 py-1 rounded bg-[#1f6feb]/20 border border-[#58a6ff] text-[#58a6ff] font-bold">[D']</span>
                <span className="text-xs px-2 py-0.5 rounded bg-[#a371f7]/20 text-[#a371f7] border border-[#a371f7]">feature (HEAD)</span>
              </div>
              <div className="text-[11px] text-[#d29922] italic pl-24">
                Note: Original commits [C] and [D] were abandoned; new commits [C'] and [D'] have new SHA hashes!
              </div>
            </div>
          )}

          {mode === 'fastforward' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-[#8b949e] w-20">history:</span>
                <span className="px-3 py-1 rounded bg-[#21262d] border border-[#30363d] text-[#c9d1d9]">[A]</span>
                <span className="text-[#8b949e]">→</span>
                <span className="px-3 py-1 rounded bg-[#21262d] border border-[#30363d] text-[#c9d1d9]">[B]</span>
                <span className="text-[#8b949e]">→</span>
                <span className="px-3 py-1 rounded bg-[#238636] border border-[#3fb950] text-white font-bold">[C]</span>
                <span className="text-xs px-2 py-0.5 rounded bg-[#3fb950]/20 text-[#3fb950] border border-[#3fb950]">main &amp; feature</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Side-by-Side Deep Dive Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strategy 1: Git Merge */}
        <div className="p-5 bg-[#161b22] border border-[#30363d] rounded-xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#8957e5]/20 text-[#a371f7] border border-[#8957e5] font-mono text-xs font-bold">
              STRATEGY A
            </span>
            <h3 className="text-sm font-bold text-[#f0f6fc]">git merge</h3>
          </div>

          <p className="text-xs text-[#8b949e] leading-relaxed">
            Preserves the exact chronological reality of when commits were authored. Creates a dedicated merge commit with two parents whenever branches have diverged.
          </p>

          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#3fb950] shrink-0 mt-0.5" />
              <span className="text-[#c9d1d9]">Completely safe for shared public branches (never rewrites history).</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#3fb950] shrink-0 mt-0.5" />
              <span className="text-[#c9d1d9]">Retains the original commit hashes without mutation.</span>
            </div>
            <div className="flex items-start gap-2 text-[#d29922]">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>Can clutter commit history with excessive "Merge branch..." bubbles if used too frequently.</span>
            </div>
          </div>
        </div>

        {/* Strategy 2: Git Rebase */}
        <div className="p-5 bg-[#161b22] border border-[#30363d] rounded-xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#1f6feb]/20 text-[#58a6ff] border border-[#1f6feb] font-mono text-xs font-bold">
              STRATEGY B
            </span>
            <h3 className="text-sm font-bold text-[#f0f6fc]">git rebase</h3>
          </div>

          <p className="text-xs text-[#8b949e] leading-relaxed">
            Replays your branch commits one by one on top of the newest target commit. Produces a pristine, perfectly linear commit graph.
          </p>

          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#3fb950] shrink-0 mt-0.5" />
              <span className="text-[#c9d1d9]">Crystal-clear linear history with zero merge clutter.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#3fb950] shrink-0 mt-0.5" />
              <span className="text-[#c9d1d9]">Simplifies bisecting and reading git log --graph.</span>
            </div>
            <div className="flex items-start gap-2 text-[#f85149]">
              <ShieldAlert className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>
                <strong>The Golden Rule:</strong> Never rebase commits that exist outside your local machine on a shared public branch!
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
