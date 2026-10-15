import React, { useState } from 'react';
import { GitCommit, GitBranch, SimulationState } from '../types/git';
import { GitCommit as CommitIcon, GitBranch as BranchIcon, ArrowUp, Calendar, User, Eye, Layers } from 'lucide-react';

interface CommitGraphProps {
  state: SimulationState;
  onSelectCommit?: (commit: GitCommit) => void;
}

export const CommitGraph: React.FC<CommitGraphProps> = ({ state, onSelectCommit }) => {
  const [selectedCommitId, setSelectedCommitId] = useState<string | null>(state.headCommitId);
  const [isCompact, setIsCompact] = useState(false);

  const commitsList = Object.values(state.commits);

  // Sort commits topologically: oldest to newest
  const sortedCommits = [...commitsList].sort((a, b) => {
    // If a is parent of b, a should come before b
    if (b.parentIds.includes(a.id)) return -1;
    if (a.parentIds.includes(b.id)) return 1;
    return a.id.localeCompare(b.id);
  });

  const selectedCommit = selectedCommitId ? state.commits[selectedCommitId] : null;

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0d1117] overflow-hidden">
      {/* Graph Toolbar */}
      <div className="h-10 px-4 bg-[#161b22] border-b border-[#30363d] flex items-center justify-between text-xs select-none shrink-0">
        <div className="flex items-center gap-2">
          <CommitIcon className="w-4 h-4 text-[#58a6ff]" />
          <span className="font-semibold text-[#f0f6fc]">Commit Graph (DAG)</span>
          <span className="text-[#8b949e] font-mono text-[11px]">
            {commitsList.length} commits · {Object.keys(state.branches).length} branches
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCompact(!isCompact)}
            className={`px-2 py-1 rounded text-[11px] font-mono border transition-colors ${
              isCompact
                ? 'bg-[#1f6feb]/20 border-[#1f6feb] text-[#58a6ff]'
                : 'bg-[#21262d] border-[#30363d] text-[#c9d1d9] hover:bg-[#30363d]'
            }`}
          >
            {isCompact ? 'Compact View' : 'Detailed View'}
          </button>
        </div>
      </div>

      {/* Main Graph Canvas and Detail Pane */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left/Center: Visual Graph Nodes List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono">
          <div className="text-[11px] text-[#8b949e] mb-2">
            Topological order (most recent at top). Arrows indicate parent relationships.
          </div>

          <div className="relative pl-6 space-y-4">
            {/* Vertical connector trunk */}
            <div className="absolute left-[31px] top-4 bottom-4 w-0.5 bg-[#30363d] -z-0" />

            {sortedCommits.slice().reverse().map((commit) => {
              const isHead = state.headCommitId === commit.id;
              const isSelected = selectedCommitId === commit.id;

              // Find branches pointing to this commit
              const branchesHere = Object.values(state.branches).filter(
                (b) => b.commitId === commit.id
              );

              // Find remote branches
              const remoteBranchesHere: string[] = [];
              Object.entries(state.remotes).forEach(([remName, remObj]) => {
                Object.entries(remObj.branches).forEach(([bName, bCommit]) => {
                  if (bCommit === commit.id) {
                    remoteBranchesHere.push(`${remName}/${bName}`);
                  }
                });
              });

              return (
                <div
                  key={commit.id}
                  onClick={() => {
                    setSelectedCommitId(commit.id);
                    if (onSelectCommit) onSelectCommit(commit);
                  }}
                  className={`relative z-10 flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#161b22] border-[#58a6ff] shadow-sm'
                      : 'bg-[#161b22]/60 border-[#30363d] hover:border-[#8b949e]'
                  }`}
                >
                  {/* Commit Node Circle */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border-2 font-mono text-[10px] font-bold ${
                      isHead
                        ? 'bg-[#238636] border-[#3fb950] text-white'
                        : commit.isMerge
                        ? 'bg-[#8957e5] border-[#a371f7] text-white'
                        : 'bg-[#21262d] border-[#58a6ff] text-[#58a6ff]'
                    }`}
                  >
                    {commit.id.substring(0, 2)}
                  </div>

                  {/* Commit Content */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    {/* Top Row: Ref badges (HEAD, branches, remote) */}
                    <div className="flex flex-wrap items-center gap-1.5 text-xs">
                      {isHead && (
                        <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#238636]/20 border border-[#3fb950] text-[#3fb950] font-bold text-[10px]">
                          HEAD {state.detachedHead && '(detached)'}
                        </span>
                      )}

                      {branchesHere.map((b) => (
                        <span
                          key={b.name}
                          className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#1f6feb]/20 border border-[#58a6ff] text-[#58a6ff] text-[10px] font-bold"
                        >
                          <BranchIcon className="w-2.5 h-2.5" />
                          {b.name}
                        </span>
                      ))}

                      {remoteBranchesHere.map((rb) => (
                        <span
                          key={rb}
                          className="px-1.5 py-0.5 rounded bg-[#d29922]/20 border border-[#d29922] text-[#d29922] text-[10px]"
                        >
                          {rb}
                        </span>
                      ))}

                      <span className="text-[#8b949e] text-xs font-mono ml-auto">
                        {commit.id}
                      </span>
                    </div>

                    {/* Commit Message */}
                    <p className="text-xs font-semibold text-[#f0f6fc] break-words">
                      {commit.message}
                    </p>

                    {/* Parent pointers and author */}
                    {!isCompact && (
                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#8b949e] pt-1">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {commit.author}
                        </span>

                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {commit.timestamp}
                        </span>

                        {commit.parentIds.length > 0 && (
                          <span className="flex items-center gap-1 text-[#58a6ff]">
                            <ArrowUp className="w-3 h-3" />
                            parents: {commit.parentIds.join(', ')}
                          </span>
                        )}

                        {commit.isMerge && (
                          <span className="text-[#a371f7] text-[10px] border border-[#a371f7]/50 px-1 rounded">
                            3-way merge commit
                          </span>
                        )}

                        {commit.isRebased && (
                          <span className="text-[#d29922] text-[10px] border border-[#d29922]/50 px-1 rounded">
                            rebased
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Pane: Selected Commit Inspector */}
        {selectedCommit && (
          <div className="w-full lg:w-80 bg-[#161b22] border-t lg:border-t-0 lg:border-l border-[#30363d] p-4 flex flex-col shrink-0 overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#30363d]">
              <span className="text-xs font-semibold text-[#f0f6fc] flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-[#58a6ff]" />
                Commit Snapshot
              </span>
              <span className="text-xs font-mono text-[#58a6ff]">{selectedCommit.id}</span>
            </div>

            <div className="py-3 space-y-3 text-xs">
              <div>
                <span className="text-[#8b949e] text-[11px] uppercase tracking-wider block mb-1">
                  Message:
                </span>
                <p className="text-[#f0f6fc] font-medium bg-[#0d1117] p-2 rounded border border-[#30363d]">
                  {selectedCommit.message}
                </p>
              </div>

              <div>
                <span className="text-[#8b949e] text-[11px] uppercase tracking-wider block mb-1">
                  Full Hash (SHA):
                </span>
                <p className="font-mono text-[10px] text-[#8b949e] break-all bg-[#0d1117] p-1.5 rounded border border-[#30363d]">
                  {selectedCommit.fullSha}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="bg-[#0d1117] p-2 rounded border border-[#30363d]">
                  <span className="text-[#8b949e] block">Author:</span>
                  <span className="text-[#c9d1d9] truncate block">{selectedCommit.author}</span>
                </div>
                <div className="bg-[#0d1117] p-2 rounded border border-[#30363d]">
                  <span className="text-[#8b949e] block">Date:</span>
                  <span className="text-[#c9d1d9] truncate block">{selectedCommit.timestamp}</span>
                </div>
              </div>

              {/* Snapshot Files in this commit */}
              <div>
                <span className="text-[#8b949e] text-[11px] uppercase tracking-wider block mb-1.5">
                  Snapshot Tree ({Object.keys(selectedCommit.snapshot || {}).length} files):
                </span>
                <div className="space-y-1 font-mono text-[11px]">
                  {Object.keys(selectedCommit.snapshot || {}).map((path) => (
                    <div
                      key={path}
                      className="px-2 py-1 bg-[#0d1117] border border-[#30363d] rounded flex items-center justify-between text-[#c9d1d9]"
                    >
                      <span className="truncate">{path}</span>
                      <span className="text-[#3fb950] text-[10px]">blob</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
