import React, { useState } from 'react';
import { SimulationState, PullRequest } from '../types/git';
import {
  GitPullRequest,
  CheckCircle2,
  XCircle,
  Clock,
  MessageSquare,
  FileDiff,
  ShieldCheck,
  GitMerge,
  Layers,
  Terminal,
  ExternalLink,
} from 'lucide-react';

interface GitHubPRViewProps {
  state: SimulationState;
  onExecuteCommand: (cmd: string) => void;
}

export const GitHubPRView: React.FC<GitHubPRViewProps> = ({ state, onExecuteCommand }) => {
  const prs = state.pullRequests;
  const [selectedPrId, setSelectedPrId] = useState<string>(prs[0]?.id || 'pr-1');
  const [activeTab, setActiveTab] = useState<'conversation' | 'diff' | 'checks' | 'cli' | 'stacked'>('conversation');
  const [reviewInput, setReviewInput] = useState('');

  const selectedPr = prs.find((p) => p.id === selectedPrId) || prs[0];

  const handleMergePR = () => {
    if (!selectedPr || !selectedPr.canMerge) return;
    onExecuteCommand(`gh pr merge ${selectedPr.number}`);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0d1117] space-y-6">
      {/* Header */}
      <div className="p-4 bg-[#161b22] border border-[#30363d] rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <GitPullRequest className="w-5 h-5 text-[#8957e5]" />
            <h2 className="text-base font-bold text-[#f0f6fc]">
              GitHub Collaboration &amp; Pull Requests
            </h2>
          </div>
          <p className="text-xs text-[#8b949e] mt-1">
            Simulated web UI for code reviews, automated CI status checks, and branch protection merge policies.
          </p>
        </div>

        {/* PR Selector Pills */}
        <div className="flex items-center gap-2">
          {prs.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPrId(p.id)}
              className={`px-3 py-1.5 rounded text-xs font-mono transition-colors flex items-center gap-1.5 border ${
                selectedPrId === p.id
                  ? 'bg-[#1f6feb]/20 border-[#58a6ff] text-[#58a6ff]'
                  : 'bg-[#21262d] border-[#30363d] text-[#8b949e] hover:text-[#c9d1d9]'
              }`}
            >
              <span>#{p.number}</span>
              <span className="hidden sm:inline truncate max-w-[120px]">{p.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected PR Workspace */}
      {selectedPr && (
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden flex flex-col">
          {/* PR Header Bar */}
          <div className="p-5 border-b border-[#30363d] space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-bold text-[#f0f6fc]">
                {selectedPr.title}{' '}
                <span className="text-[#8b949e] font-mono font-normal">#{selectedPr.number}</span>
              </h3>

              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-1 rounded text-xs font-mono font-bold flex items-center gap-1.5 ${
                    selectedPr.status === 'merged'
                      ? 'bg-[#8957e5]/20 text-[#a371f7] border border-[#8957e5]'
                      : selectedPr.status === 'open'
                      ? 'bg-[#238636]/20 text-[#3fb950] border border-[#2ea043]'
                      : 'bg-[#da3633]/20 text-[#f85149] border border-[#f85149]'
                  }`}
                >
                  <GitPullRequest className="w-3.5 h-3.5" />
                  {selectedPr.status.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs text-[#8b949e]">
              <span className="text-[#f0f6fc] font-semibold">{selectedPr.author}</span> wants to merge
              into <span className="font-mono text-[#58a6ff] bg-[#0d1117] px-1.5 py-0.5 rounded border border-[#30363d]">{selectedPr.targetBranch}</span> from{' '}
              <span className="font-mono text-[#a371f7] bg-[#0d1117] px-1.5 py-0.5 rounded border border-[#30363d]">{selectedPr.sourceBranch}</span> · {selectedPr.createdAt}
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 pt-2 border-t border-[#30363d] text-xs font-mono overflow-x-auto">
              <button
                onClick={() => setActiveTab('conversation')}
                className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 ${
                  activeTab === 'conversation'
                    ? 'bg-[#21262d] text-[#f0f6fc] border border-[#30363d]'
                    : 'text-[#8b949e] hover:text-[#c9d1d9]'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Conversation</span>
              </button>

              <button
                onClick={() => setActiveTab('diff')}
                className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 ${
                  activeTab === 'diff'
                    ? 'bg-[#21262d] text-[#f0f6fc] border border-[#30363d]'
                    : 'text-[#8b949e] hover:text-[#c9d1d9]'
                }`}
              >
                <FileDiff className="w-3.5 h-3.5" />
                <span>Files Changed ({selectedPr.changedFiles.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('checks')}
                className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 ${
                  activeTab === 'checks'
                    ? 'bg-[#21262d] text-[#f0f6fc] border border-[#30363d]'
                    : 'text-[#8b949e] hover:text-[#c9d1d9]'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>CI Checks ({selectedPr.checks.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('cli')}
                className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 ${
                  activeTab === 'cli'
                    ? 'bg-[#21262d] text-[#f0f6fc] border border-[#30363d]'
                    : 'text-[#8b949e] hover:text-[#c9d1d9]'
                }`}
              >
                <Terminal className="w-3.5 h-3.5 text-[#58a6ff]" />
                <span>GitHub CLI (gh)</span>
              </button>

              <button
                onClick={() => setActiveTab('stacked')}
                className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 ${
                  activeTab === 'stacked'
                    ? 'bg-[#21262d] text-[#f0f6fc] border border-[#30363d]'
                    : 'text-[#8b949e] hover:text-[#c9d1d9]'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-[#a371f7]" />
                <span>Stacked PRs (gh stack)</span>
              </button>
            </div>
          </div>

          {/* Tab 1: Conversation & Timeline */}
          {activeTab === 'conversation' && (
            <div className="p-6 space-y-6">
              {/* Description Body */}
              <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg space-y-2">
                <span className="text-xs text-[#8b949e] font-mono">Original Description:</span>
                <p className="text-sm text-[#f0f6fc] leading-relaxed">{selectedPr.description}</p>
              </div>

              {/* Review Comments */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-[#8b949e] uppercase tracking-wider block font-mono">
                  Peer Code Reviews:
                </span>

                {selectedPr.reviews.map((rev) => (
                  <div key={rev.id} className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#8957e5] text-white flex items-center justify-center font-bold text-[10px]">
                          {rev.author.charAt(0)}
                        </span>
                        <span className="font-semibold text-[#f0f6fc]">{rev.author}</span>
                        <span className="text-[#8b949e]">{rev.date}</span>
                      </div>
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                          rev.state === 'APPROVED'
                            ? 'bg-[#238636]/20 border-[#2ea043] text-[#3fb950]'
                            : 'bg-[#da3633]/20 border-[#f85149] text-[#f85149]'
                        }`}
                      >
                        {rev.state}
                      </span>
                    </div>
                    <p className="text-xs text-[#c9d1d9] pl-7">{rev.comment}</p>
                  </div>
                ))}
              </div>

              {/* Merge Box (Branch Protection & Mergeability) */}
              <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {selectedPr.canMerge ? (
                      <CheckCircle2 className="w-5 h-5 text-[#3fb950]" />
                    ) : (
                      <XCircle className="w-5 h-5 text-[#f85149]" />
                    )}
                    <div>
                      <h4 className="text-xs font-bold text-[#f0f6fc]">
                        {selectedPr.status === 'merged'
                          ? 'Pull request successfully merged and closed'
                          : selectedPr.canMerge
                          ? 'This branch has no conflicts with the base branch'
                          : 'This branch has conflicts that must be resolved'}
                      </h4>
                      <p className="text-[11px] text-[#8b949e]">
                        {selectedPr.canMerge
                          ? 'All automated CI checks have passed. Merging can be performed.'
                          : 'Conflicting files exist. Merge conflict resolution required.'}
                      </p>
                    </div>
                  </div>

                  {selectedPr.status === 'open' && (
                    <button
                      onClick={handleMergePR}
                      disabled={!selectedPr.canMerge}
                      className={`px-4 py-2 rounded text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors ${
                        selectedPr.canMerge
                          ? 'bg-[#238636] hover:bg-[#2ea043] text-white shadow'
                          : 'bg-[#21262d] text-[#8b949e] cursor-not-allowed border border-[#30363d]'
                      }`}
                    >
                      <GitMerge className="w-3.5 h-3.5" />
                      <span>Merge Pull Request</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Files Changed Diff */}
          {activeTab === 'diff' && (
            <div className="p-6 space-y-4">
              {selectedPr.changedFiles.map((f) => (
                <div key={f.path} className="border border-[#30363d] rounded-lg overflow-hidden bg-[#0d1117]">
                  <div className="px-3 py-2 bg-[#161b22] border-b border-[#30363d] flex items-center justify-between text-xs font-mono">
                    <span className="text-[#f0f6fc] font-semibold">{f.path}</span>
                    <div className="flex items-center gap-2 text-[11px]">
                      <span className="text-[#3fb950]">+{f.additions}</span>
                      <span className="text-[#f85149]">-{f.deletions}</span>
                    </div>
                  </div>
                  <pre className="p-3 text-xs font-mono overflow-x-auto whitespace-pre leading-relaxed text-[#c9d1d9]">
                    {f.diff}
                  </pre>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: CI Checks */}
          {activeTab === 'checks' && (
            <div className="p-6 space-y-3">
              <span className="text-xs font-bold text-[#8b949e] uppercase tracking-wider block font-mono">
                Automated Continuous Integration (CI) Checks:
              </span>

              {selectedPr.checks.map((chk) => (
                <div
                  key={chk.id}
                  className="p-3 bg-[#0d1117] border border-[#30363d] rounded-lg flex items-center justify-between text-xs font-mono"
                >
                  <div className="flex items-center gap-2">
                    {chk.conclusion === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 text-[#3fb950]" />
                    ) : (
                      <XCircle className="w-4 h-4 text-[#f85149]" />
                    )}
                    <span className="text-[#f0f6fc]">{chk.name}</span>
                  </div>
                  <span className="text-[#8b949e] text-[11px]">{chk.duration}</span>
                </div>
              ))}
            </div>
          )}

          {/* Tab 4: GitHub CLI Reference */}
          {activeTab === 'cli' && (
            <div className="p-6 space-y-4 text-xs">
              <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg space-y-2">
                <span className="text-xs font-bold text-[#58a6ff] block font-mono">
                  GitHub CLI (`gh`) Command Reference
                </span>
                <p className="text-[#8b949e] leading-relaxed">
                  The official GitHub CLI brings pull requests, issues, and workflows directly to your terminal without leaving the shell.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-[11px]">
                <div className="p-3 bg-[#0d1117] border border-[#30363d] rounded space-y-1">
                  <span className="text-[#7ee787] font-bold block">gh pr list</span>
                  <span className="text-[#8b949e]">Lists all open PRs in current repository.</span>
                </div>
                <div className="p-3 bg-[#0d1117] border border-[#30363d] rounded space-y-1">
                  <span className="text-[#7ee787] font-bold block">gh pr checkout 14</span>
                  <span className="text-[#8b949e]">Checks out PR branch locally for manual testing.</span>
                </div>
                <div className="p-3 bg-[#0d1117] border border-[#30363d] rounded space-y-1">
                  <span className="text-[#7ee787] font-bold block">gh pr checks</span>
                  <span className="text-[#8b949e]">Inspects live CI status and build logs.</span>
                </div>
                <div className="p-3 bg-[#0d1117] border border-[#30363d] rounded space-y-1">
                  <span className="text-[#7ee787] font-bold block">gh pr merge 14</span>
                  <span className="text-[#8b949e]">Merges approved PR using selected merge strategy.</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: Stacked Pull Requests (gh stack) */}
          {activeTab === 'stacked' && (
            <div className="p-6 space-y-4 text-xs">
              <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#a371f7]/20 border border-[#a371f7] text-[#a371f7] font-mono text-[10px] font-bold">
                    CLI EXTENSION
                  </span>
                  <h4 className="text-xs font-bold text-[#f0f6fc]">
                    Stacked Pull Requests (`gh stack` &amp; Graphite Workflow)
                  </h4>
                </div>
                <p className="text-[#8b949e] leading-relaxed">
                  Notice: <span className="text-[#f0f6fc] font-mono">gh stack</span> is provided by CLI extensions (such as Graphite, gh-stack) rather than a built-in core Git command. Stacked PRs allow engineers to break large multi-layer features into dependent, reviewable micro-PRs:
                </p>
              </div>

              {/* Stack Dependency Tree */}
              <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg space-y-3 font-mono text-xs">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded bg-[#238636] text-white flex items-center justify-center font-bold text-xs">
                    3
                  </span>
                  <div className="p-2 bg-[#161b22] border border-[#30363d] rounded flex-1 flex items-center justify-between">
                    <span className="text-[#c9d1d9]">PR #16: Frontend Event Schedule UI (based on #15)</span>
                    <span className="text-[#8b949e] text-[10px]">Awaiting base merge</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pl-3">
                  <span className="text-[#8b949e]">↑ depends on</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded bg-[#1f6feb] text-white flex items-center justify-center font-bold text-xs">
                    2
                  </span>
                  <div className="p-2 bg-[#161b22] border border-[#30363d] rounded flex-1 flex items-center justify-between">
                    <span className="text-[#58a6ff]">PR #15: Backend REST API for Symposium Schedule</span>
                    <span className="text-[#3fb950] text-[10px]">Under Review</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pl-3">
                  <span className="text-[#8b949e]">↑ depends on</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded bg-[#8957e5] text-white flex items-center justify-center font-bold text-xs">
                    1
                  </span>
                  <div className="p-2 bg-[#161b22] border border-[#8957e5] rounded flex-1 flex items-center justify-between">
                    <span className="text-[#a371f7]">PR #14: Database Schema Migration for Events</span>
                    <span className="text-[#3fb950] text-[10px] font-bold">Approved &amp; Ready</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
