import React, { useState } from 'react';
import { SimulationState } from '../types/git';
import { Archive, RotateCcw, AlertTriangle, ShieldAlert, CheckCircle2, History, Trash2, ArrowRight } from 'lucide-react';

interface StashRecoveryViewProps {
  state: SimulationState;
  onExecuteCommand: (cmd: string) => void;
}

export const StashRecoveryView: React.FC<StashRecoveryViewProps> = ({ state, onExecuteCommand }) => {
  const [resetType, setResetType] = useState<'soft' | 'mixed' | 'hard'>('soft');

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0d1117] space-y-6">
      {/* Header */}
      <div className="p-4 bg-[#161b22] border border-[#30363d] rounded-xl space-y-2">
        <div className="flex items-center gap-2">
          <Archive className="w-5 h-5 text-[#d29922]" />
          <h2 className="text-base font-bold text-[#f0f6fc]">
            Stash (Shelving) &amp; Emergency Recovery Lab
          </h2>
        </div>
        <p className="text-xs text-[#8b949e] leading-relaxed">
          Learn how to temporarily shelve dirty work to switch branches, explore the precise mechanics of <span className="text-[#f85149]">git reset</span>, and use <span className="text-[#58a6ff]">git reflog</span> to resurrect commits that appear permanently lost.
        </p>
      </div>

      {/* Part 1: Stash Stack Visualizer */}
      <div className="p-5 bg-[#161b22] border border-[#30363d] rounded-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#30363d]">
          <div className="flex items-center gap-2">
            <Archive className="w-4 h-4 text-[#d29922]" />
            <h3 className="text-sm font-bold text-[#f0f6fc]">
              Active Stash Stack ({state.stashes.length} entries)
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onExecuteCommand('git stash push -m "WIP on symposium layout"')}
              className="px-3 py-1.5 bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] hover:text-white text-xs font-mono rounded border border-[#30363d] transition-colors"
            >
              + git stash push
            </button>

            <button
              onClick={() => onExecuteCommand('git stash pop')}
              disabled={state.stashes.length === 0}
              className={`px-3 py-1.5 text-xs font-mono rounded transition-colors ${
                state.stashes.length > 0
                  ? 'bg-[#d29922] hover:bg-[#e3a830] text-black font-semibold'
                  : 'bg-[#21262d] text-[#8b949e] cursor-not-allowed border border-[#30363d]'
              }`}
            >
              git stash pop
            </button>
          </div>
        </div>

        {/* Stashes List */}
        <div className="space-y-2">
          {state.stashes.length === 0 ? (
            <div className="p-6 bg-[#0d1117] border border-[#30363d] rounded-lg text-center text-xs text-[#8b949e]">
              Stash stack is currently empty. When you have uncommitted changes and run <code className="text-[#f0f6fc]">git stash</code>, they are shelved safely here without creating a dummy commit.
            </div>
          ) : (
            state.stashes.map((s, idx) => (
              <div
                key={s.id}
                className="p-3 bg-[#0d1117] border border-[#30363d] rounded-lg flex items-center justify-between text-xs font-mono"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#d29922] font-bold">stash@{`{${idx}}`}:</span>
                    <span className="text-[#f0f6fc]">{s.message}</span>
                  </div>
                  <span className="text-[11px] text-[#8b949e]">
                    Branch: {s.branch} · Shelved {Object.keys(s.files).length} file(s)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onExecuteCommand('git stash pop')}
                    className="px-2 py-1 bg-[#21262d] hover:bg-[#30363d] text-white text-[11px] rounded border border-[#30363d]"
                  >
                    Pop
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Part 2: The Three Flavors of git reset */}
      <div className="p-5 bg-[#161b22] border border-[#30363d] rounded-xl space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#30363d]">
          <RotateCcw className="w-4 h-4 text-[#f85149]" />
          <h3 className="text-sm font-bold text-[#f0f6fc]">
            The 3 Flavors of `git reset`: Soft vs Mixed vs Hard
          </h3>
        </div>

        <p className="text-xs text-[#8b949e] leading-relaxed">
          Every Git user dreads running <code className="text-[#f85149]">git reset</code> because they don't understand which of the 3 Git areas it mutates:
        </p>

        {/* 3 Reset Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          {/* Soft */}
          <div className="p-4 bg-[#0d1117] border border-[#2ea043]/50 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[#3fb950] font-bold text-sm">--soft</span>
              <span className="text-[10px] text-[#3fb950] bg-[#238636]/10 px-1.5 py-0.5 rounded border border-[#2ea043]">
                Safest
              </span>
            </div>
            <p className="text-[11px] text-[#8b949e]">
              Moves HEAD to target commit. Leaves all files from rewound commits <strong className="text-[#3fb950]">STAGED</strong> in the index.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onExecuteCommand('git reset --soft HEAD~1')}
                className="w-full py-1.5 bg-[#238636] hover:bg-[#2ea043] text-white rounded text-xs transition-colors"
              >
                Run: git reset --soft HEAD~1
              </button>
            </div>
          </div>

          {/* Mixed */}
          <div className="p-4 bg-[#0d1117] border border-[#d29922]/50 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[#d29922] font-bold text-sm">--mixed (default)</span>
              <span className="text-[10px] text-[#d29922] bg-[#d29922]/10 px-1.5 py-0.5 rounded border border-[#d29922]">
                Medium
              </span>
            </div>
            <p className="text-[11px] text-[#8b949e]">
              Moves HEAD to target commit. <strong className="text-[#d29922]">UNSTAGES</strong> changes, but leaves modified files safely in your Working Directory.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onExecuteCommand('git reset --mixed HEAD~1')}
                className="w-full py-1.5 bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] hover:text-white rounded text-xs border border-[#30363d] transition-colors"
              >
                Run: git reset --mixed HEAD~1
              </button>
            </div>
          </div>

          {/* Hard */}
          <div className="p-4 bg-[#0d1117] border border-[#da3633]/60 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[#f85149] font-bold text-sm">--hard</span>
              <span className="text-[10px] text-[#f85149] bg-[#da3633]/20 px-1.5 py-0.5 rounded border border-[#f85149]">
                Destructive!
              </span>
            </div>
            <p className="text-[11px] text-[#8b949e]">
              Moves HEAD to target commit and <strong className="text-[#f85149]">PERMANENTLY WIPES</strong> all uncommitted changes in both staging and working directory!
            </p>
            <div className="pt-2">
              <button
                onClick={() => onExecuteCommand('git reset --hard HEAD~1')}
                className="w-full py-1.5 bg-[#da3633] hover:bg-[#b62324] text-white rounded text-xs transition-colors"
              >
                Run: git reset --hard HEAD~1
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Part 3: The Git Reflog Time Machine */}
      <div className="p-5 bg-[#161b22] border border-[#30363d] rounded-xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#30363d]">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-[#58a6ff]" />
            <h3 className="text-sm font-bold text-[#f0f6fc]">
              The Ultimate Safety Net: `git reflog`
            </h3>
          </div>
          <button
            onClick={() => onExecuteCommand('git reflog')}
            className="px-2.5 py-1 bg-[#21262d] hover:bg-[#30363d] text-xs font-mono text-[#58a6ff] rounded border border-[#30363d]"
          >
            Run git reflog in Terminal
          </button>
        </div>

        <p className="text-xs text-[#8b949e] leading-relaxed">
          Did you accidentally run <code className="text-[#f85149]">git reset --hard</code> or delete a branch? <strong>Don't panic!</strong> Git keeps a local chronological ledger of every time HEAD moved in <code className="text-[#f0f6fc]">.git/logs/HEAD</code>. Unreachable commits remain in your object store for 30–90 days before garbage collection runs.
        </p>

        {/* Reflog Feed */}
        <div className="p-3 bg-[#0d1117] border border-[#30363d] rounded-lg font-mono text-xs space-y-2 max-h-56 overflow-y-auto">
          {state.reflog.map((entry) => (
            <div
              key={entry.id}
              className="p-2 bg-[#161b22] border border-[#30363d] rounded flex items-center justify-between"
            >
              <div className="flex items-center gap-2 truncate">
                <span className="text-[#d29922] font-bold">{entry.toSha}</span>
                <span className="text-[#58a6ff]">{entry.selector}</span>
                <span className="text-[#c9d1d9] truncate">{entry.message}</span>
              </div>
              <button
                onClick={() => onExecuteCommand(`git reset --hard ${entry.toSha}`)}
                className="px-2 py-0.5 bg-[#21262d] hover:bg-[#30363d] text-[#3fb950] text-[10px] rounded border border-[#30363d] shrink-0"
              >
                Restore to here
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
