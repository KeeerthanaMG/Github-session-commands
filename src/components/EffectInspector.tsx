import React from 'react';
import { CommandResult, SimulationState } from '../types/git';
import { X, CheckCircle2, MinusCircle, FileText, GitCommit, GitBranch, Cloud } from 'lucide-react';

interface EffectInspectorProps {
  lastResult: CommandResult | null;
  state: SimulationState;
  onClose: () => void;
}

export const EffectInspector: React.FC<EffectInspectorProps> = ({
  lastResult,
  state,
  onClose,
}) => {
  if (!lastResult) return null;
  const aff = lastResult.affected;

  const sections = [
    {
      name: 'Working Tree',
      changed: aff.workingTreeChanged,
      detail: aff.workingTreeChanged ? 'Files modified, restored, or checked out' : 'Untouched',
      icon: FileText,
    },
    {
      name: 'Staging Area (Index)',
      changed: aff.stagingChanged,
      detail: aff.stagingChanged ? 'Files staged or unstaged in .git/index' : 'Untouched',
      icon: FileText,
    },
    {
      name: 'Branch References',
      changed: aff.branchesChanged,
      detail: aff.branchesChanged ? `Refs moved or updated (${state.currentBranch})` : 'Pointers unchanged',
      icon: GitBranch,
    },
    {
      name: 'HEAD Pointer',
      changed: aff.headChanged,
      detail: aff.headChanged ? `HEAD pointing to ${state.headCommitId}` : 'HEAD unchanged',
      icon: GitCommit,
    },
    {
      name: 'Commit Graph (DAG)',
      changed: aff.commitAdded,
      detail: aff.commitAdded ? 'New commit node added to object database' : 'No new commit nodes',
      icon: GitCommit,
    },
    {
      name: 'Remote Repository',
      changed: aff.remoteChanged,
      detail: aff.remoteChanged ? 'Remote tracking or push updated' : 'Local operation only (offline)',
      icon: Cloud,
    },
  ];

  return (
    <div className="border-t border-[#30363d] bg-[#161b22] p-4 text-xs font-mono space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-[#30363d]">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#f0f6fc]">Command Effect Inspector:</span>
          <span className="px-2 py-0.5 rounded bg-[#0d1117] border border-[#30363d] text-[#58a6ff]">
            $ {lastResult.command}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-[#8b949e] hover:text-[#f0f6fc] rounded hover:bg-[#21262d]"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-[11px] text-[#8b949e]">{aff.summary}</p>

      {/* Grid of Areas Changed vs Unchanged */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {sections.map((sec) => {
          const Icon = sec.icon;
          return (
            <div
              key={sec.name}
              className={`p-2.5 rounded-lg border flex flex-col justify-between ${
                sec.changed
                  ? 'bg-[#238636]/10 border-[#2ea043] text-[#3fb950]'
                  : 'bg-[#0d1117] border-[#30363d] text-[#8b949e]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-[11px] truncate">{sec.name}</span>
                {sec.changed ? (
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#3fb950]" />
                ) : (
                  <MinusCircle className="w-3.5 h-3.5 shrink-0 text-[#8b949e]" />
                )}
              </div>
              <span className="text-[10px] leading-tight block text-[#8b949e]">
                {sec.detail}
              </span>
            </div>
          );
        })}
      </div>

      {aff.filesAffected.length > 0 && (
        <div className="pt-1 text-[11px] text-[#8b949e] flex items-center gap-1.5">
          <span>Files Affected:</span>
          <span className="text-[#f0f6fc] font-semibold">{aff.filesAffected.join(', ')}</span>
        </div>
      )}
    </div>
  );
};
