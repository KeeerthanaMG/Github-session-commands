import React, { useState, useEffect } from 'react';
import { SimulationState } from '../types/git';
import { AlertOctagon, CheckCircle2, FileCode, Check, RotateCcw, HelpCircle, Split, ShieldAlert } from 'lucide-react';

interface MergeConflictResolverProps {
  state: SimulationState;
  onResolveConflict: (filePath: string, resolvedContent: string) => void;
  onExecuteCommand: (cmd: string) => void;
}

export const MergeConflictResolver: React.FC<MergeConflictResolverProps> = ({
  state,
  onResolveConflict,
  onExecuteCommand,
}) => {
  const conflict = state.activeConflict;
  const [editedContent, setEditedContent] = useState<string>('');
  const [hasUnresolvedMarkers, setHasUnresolvedMarkers] = useState(false);
  const [isResolvedSuccess, setIsResolvedSuccess] = useState(false);

  // Default conflict scenario when none is active
  const defaultConflict = {
    path: 'src/components/Footer.jsx',
    base: '<footer className="border-t border-slate-800 py-4 text-center text-slate-500">\n  TechFest 2026\n</footer>',
    ours: '<footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">\n  TechFest 2026. Made with passion by the student developer committee.\n</footer>',
    theirs: '<footer className="border-t border-slate-700 py-8 px-6 flex justify-between text-slate-400">\n  <span>TechFest 2026 Symposium</span>\n  <a href="#github">GitHub</a>\n</footer>',
    targetBranch: 'fix/footer-styling',
    sourceBranch: 'main',
  };

  const activeData = conflict || {
    ...defaultConflict,
    currentContent: `<<<<<<< HEAD (Current Change: ${defaultConflict.sourceBranch})\n${defaultConflict.ours}\n=======\n${defaultConflict.theirs}\n>>>>>>> ${defaultConflict.targetBranch} (Incoming Change)`,
  };

  useEffect(() => {
    setEditedContent(activeData.currentContent);
  }, [activeData.currentContent]);

  useEffect(() => {
    // Check if conflict markers still exist in editor
    const markersPresent =
      editedContent.includes('<<<<<<<') ||
      editedContent.includes('=======') ||
      editedContent.includes('>>>>>>>');
    setHasUnresolvedMarkers(markersPresent);
  }, [editedContent]);

  const handleAcceptOurs = () => {
    setEditedContent(activeData.ours);
  };

  const handleAcceptTheirs = () => {
    setEditedContent(activeData.theirs);
  };

  const handleAcceptBoth = () => {
    const combined = `<footer className="border-t border-slate-800 py-6 px-6 flex justify-between text-xs text-slate-400">\n  <span>TechFest 2026. Made with passion by the student developer committee.</span>\n  <a href="#github" className="text-blue-400">GitHub</a>\n</footer>`;
    setEditedContent(combined);
  };

  const handleSaveAndStage = () => {
    if (hasUnresolvedMarkers) return;
    onResolveConflict(activeData.path, editedContent);
    setIsResolvedSuccess(true);
  };

  const handleTriggerDemoConflict = () => {
    onExecuteCommand('git merge fix/footer-styling');
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0d1117] space-y-6">
      {/* Lab Header */}
      <div className="p-4 bg-[#161b22] border border-[#30363d] rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 text-[#f85149]" />
            <h2 className="text-base font-bold text-[#f0f6fc]">
              Merge Conflict Laboratory (3-Way Resolver)
            </h2>
          </div>
          <p className="text-xs text-[#8b949e] mt-1">
            Reconcile divergent changes between <span className="text-[#58a6ff] font-mono">HEAD ({activeData.sourceBranch})</span> and <span className="text-[#a371f7] font-mono">{activeData.targetBranch}</span>.
          </p>
        </div>

        {!conflict && (
          <button
            onClick={handleTriggerDemoConflict}
            className="px-3 py-1.5 bg-[#da3633] hover:bg-[#b62324] text-white text-xs font-mono rounded flex items-center gap-1.5 transition-colors shrink-0"
          >
            <span>Trigger Demo Merge Conflict</span>
          </button>
        )}
      </div>

      {/* Why Did This Conflict Happen? Educational Box */}
      <div className="p-4 bg-[#161b22] border border-[#30363d] rounded-xl space-y-2 text-xs">
        <div className="flex items-center gap-1.5 text-[#58a6ff] font-semibold">
          <HelpCircle className="w-4 h-4" />
          <span>Why Did This Conflict Happen?</span>
        </div>
        <p className="text-[#8b949e] leading-relaxed">
          Both branches started from the same common ancestor (<span className="font-mono text-[#c9d1d9]">Base</span>). However, both Keerthana and Priya modified the <span className="text-[#f0f6fc] font-mono">&lt;footer&gt;</span> tag concurrently on the exact same lines. Because Git cannot determine which student's version is semantically correct, it stopped and inserted conflict markers:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 font-mono text-[11px] pt-1">
          <div className="p-2 bg-[#0d1117] border border-[#30363d] rounded">
            <span className="text-[#8b949e] block text-[10px] uppercase">1. Common Ancestor (Base)</span>
            <span className="text-[#c9d1d9] truncate block mt-1">Simple minimal footer</span>
          </div>
          <div className="p-2 bg-[#0d1117] border border-[#58a6ff]/40 rounded">
            <span className="text-[#58a6ff] block text-[10px] uppercase">2. Current (Ours / HEAD)</span>
            <span className="text-[#c9d1d9] truncate block mt-1">Added student committee credit</span>
          </div>
          <div className="p-2 bg-[#0d1117] border border-[#a371f7]/40 rounded">
            <span className="text-[#a371f7] block text-[10px] uppercase">3. Incoming (Theirs)</span>
            <span className="text-[#c9d1d9] truncate block mt-1">Added symposium GitHub link</span>
          </div>
        </div>
      </div>

      {/* 3-Way Versions Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Ours (Current Branch) */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden flex flex-col">
          <div className="px-3 py-2 bg-[#21262d] border-b border-[#30363d] flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-[#58a6ff]">
              Current Change (Ours: {activeData.sourceBranch})
            </span>
            <button
              onClick={handleAcceptOurs}
              className="px-2 py-0.5 bg-[#21262d] hover:bg-[#30363d] text-[#58a6ff] hover:text-white rounded text-[11px] font-mono border border-[#30363d]"
            >
              Accept Current
            </button>
          </div>
          <pre className="p-3 font-mono text-xs text-[#c9d1d9] bg-[#0d1117] flex-1 overflow-x-auto whitespace-pre-wrap">
            {activeData.ours}
          </pre>
        </div>

        {/* Theirs (Incoming Branch) */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden flex flex-col">
          <div className="px-3 py-2 bg-[#21262d] border-b border-[#30363d] flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-[#a371f7]">
              Incoming Change (Theirs: {activeData.targetBranch})
            </span>
            <button
              onClick={handleAcceptTheirs}
              className="px-2 py-0.5 bg-[#21262d] hover:bg-[#30363d] text-[#a371f7] hover:text-white rounded text-[11px] font-mono border border-[#30363d]"
            >
              Accept Incoming
            </button>
          </div>
          <pre className="p-3 font-mono text-xs text-[#c9d1d9] bg-[#0d1117] flex-1 overflow-x-auto whitespace-pre-wrap">
            {activeData.theirs}
          </pre>
        </div>
      </div>

      {/* Interactive Conflict Resolution Editor */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden">
        <div className="px-4 py-3 bg-[#21262d] border-b border-[#30363d] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-[#d29922]" />
            <span className="text-xs font-mono font-bold text-[#f0f6fc]">
              {activeData.path} — Resolution Workspace
            </span>
          </div>

          {/* Quick Resolution Buttons */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              onClick={handleAcceptBoth}
              className="px-2.5 py-1 bg-[#21262d] hover:bg-[#30363d] text-[#7ee787] rounded border border-[#30363d] font-mono"
            >
              Smart Combine (Accept Both)
            </button>
            <button
              onClick={handleAcceptOurs}
              className="px-2.5 py-1 bg-[#21262d] hover:bg-[#30363d] text-[#58a6ff] rounded border border-[#30363d] font-mono"
            >
              Accept Ours
            </button>
            <button
              onClick={handleAcceptTheirs}
              className="px-2.5 py-1 bg-[#21262d] hover:bg-[#30363d] text-[#a371f7] rounded border border-[#30363d] font-mono"
            >
              Accept Theirs
            </button>
          </div>
        </div>

        {/* Live Editable Textarea */}
        <div className="p-4 bg-[#0d1117]">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            rows={10}
            className="w-full bg-[#161b22] text-[#c9d1d9] font-mono text-xs p-3 rounded-lg border border-[#30363d] focus:outline-none focus:border-[#58a6ff] leading-relaxed resize-y"
            placeholder="Edit to resolve conflict markers..."
          />
        </div>

        {/* Validation Bar */}
        <div className="px-4 py-3 bg-[#161b22] border-t border-[#30363d] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div>
            {hasUnresolvedMarkers ? (
              <span className="flex items-center gap-1.5 text-[#f85149] font-mono font-medium">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                Unresolved conflict markers remain (&lt;&lt;&lt;&lt;&lt;&lt;&lt; / ======= / &gt;&gt;&gt;&gt;&gt;&gt;&gt;). Remove them before staging!
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-[#3fb950] font-mono font-medium">
                <Check className="w-4 h-4 shrink-0" />
                All conflict markers removed! Clean code ready to be staged.
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveAndStage}
              disabled={hasUnresolvedMarkers}
              className={`px-4 py-2 rounded font-mono font-medium flex items-center gap-1.5 transition-colors ${
                !hasUnresolvedMarkers
                  ? 'bg-[#238636] hover:bg-[#2ea043] text-white shadow'
                  : 'bg-[#21262d] text-[#8b949e] cursor-not-allowed border border-[#30363d]'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Mark as Resolved &amp; Stage (git add)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Success Notification after stage */}
      {isResolvedSuccess && (
        <div className="p-4 bg-[#238636]/15 border border-[#2ea043] rounded-xl text-xs space-y-2 font-mono">
          <div className="flex items-center gap-2 text-[#3fb950] font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Conflict in {activeData.path} successfully marked as resolved!</span>
          </div>
          <p className="text-[#8b949e]">
            Next Step: Finalize the 3-way merge by committing the result with:
          </p>
          <div className="flex items-center gap-2">
            <code className="px-2 py-1 bg-[#0d1117] border border-[#30363d] rounded text-[#f0f6fc]">
              git commit -m "fix: resolve footer conflict between main and {activeData.targetBranch}"
            </code>
            <button
              onClick={() =>
                onExecuteCommand(
                  `git commit -m "fix: resolve footer conflict between main and ${activeData.targetBranch}"`
                )
              }
              className="px-2.5 py-1 bg-[#1f6feb] hover:bg-[#388bfd] text-white rounded"
            >
              Run Commit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
