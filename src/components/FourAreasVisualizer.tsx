import React from 'react';
import { SimulationState } from '../types/git';
import { ArrowRight, Folder, FileCode, CheckCircle, Database, Cloud, Play } from 'lucide-react';

interface FourAreasVisualizerProps {
  state: SimulationState;
  onExecuteCommand: (cmd: string) => void;
}

export const FourAreasVisualizer: React.FC<FourAreasVisualizerProps> = ({
  state,
  onExecuteCommand,
}) => {
  // Categorize files into the 4 areas
  const workingDirFiles = Object.values(state.files).filter(
    (f) => f.status === 'modified' || f.status === 'untracked' || f.status === 'conflicted'
  );

  const stagingAreaFiles = Object.values(state.files).filter((f) => f.status === 'staged');

  const localRepoCommits = Object.values(state.commits);
  const headCommit = state.commits[state.headCommitId];

  const remoteBranchCommitId = state.remotes.origin?.branches[state.currentBranch];
  const isRemoteSynced = remoteBranchCommitId === state.headCommitId;

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0d1117] space-y-6">
      {/* Educational Header */}
      <div className="p-4 bg-[#161b22] border border-[#30363d] rounded-xl space-y-2">
        <h2 className="text-base font-bold text-[#f0f6fc]">
          The 4 Logical Areas of Git
        </h2>
        <p className="text-xs text-[#8b949e] leading-relaxed">
          Git does not simply copy files to a cloud server. It moves content through <span className="text-[#58a6ff]">four distinct staging environments</span>: your active file system (Working Directory), a curated preparation index (Staging Area), your local cryptographic database (.git), and the remote collaboration hub (GitHub).
        </p>
      </div>

      {/* 4 Connected Area Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Column 1: Working Directory */}
        <div className="flex flex-col bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden">
          <div className="p-3 bg-[#21262d] border-b border-[#30363d] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Folder className="w-4 h-4 text-[#d29922]" />
              <span className="text-xs font-bold text-[#f0f6fc]">1. Working Directory</span>
            </div>
            <span className="text-[10px] font-mono text-[#d29922] bg-[#d29922]/10 px-1.5 py-0.5 rounded border border-[#d29922]/30">
              {workingDirFiles.length} dirty
            </span>
          </div>

          <div className="p-3 text-[11px] text-[#8b949e] border-b border-[#21262d]">
            Files on your real file system you are actively editing in VS Code.
          </div>

          <div className="flex-1 p-3 space-y-2 overflow-y-auto min-h-[140px]">
            {workingDirFiles.length === 0 ? (
              <div className="text-xs text-[#8b949e] italic p-3 text-center space-y-2">
                <p>Working directory is clean. No uncommitted modifications.</p>
                <button
                  onClick={() => onExecuteCommand('git status')}
                  className="px-2.5 py-1 bg-[#21262d] hover:bg-[#30363d] text-[#58a6ff] rounded text-[11px] font-mono border border-[#30363d] cursor-pointer"
                >
                  Check status (git status)
                </button>
              </div>
            ) : (
              workingDirFiles.map((file) => (
                <div
                  key={file.path}
                  className="p-2 bg-[#0d1117] border border-[#30363d] rounded text-xs font-mono space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[#c9d1d9] truncate">{file.path}</span>
                    <span
                      className={`text-[10px] font-bold ${
                        file.status === 'conflicted'
                          ? 'text-[#f85149]'
                          : file.status === 'modified'
                          ? 'text-[#d29922]'
                          : 'text-[#3fb950]'
                      }`}
                    >
                      {file.status}
                    </span>
                  </div>
                  <div className="flex gap-1.5 pt-1">
                    <button
                      onClick={() => onExecuteCommand(`git add ${file.path}`)}
                      className="px-2 py-0.5 bg-[#21262d] hover:bg-[#30363d] text-[#58a6ff] hover:text-white rounded text-[10px] border border-[#30363d] flex items-center gap-1"
                    >
                      <span>Stage (git add)</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-2 bg-[#0d1117] border-t border-[#21262d] text-center">
            <button
              onClick={() => onExecuteCommand('git add .')}
              className="w-full py-1.5 px-3 bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-mono font-medium rounded transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Stage All: git add .</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Column 2: Staging Area (Index) */}
        <div className="flex flex-col bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden">
          <div className="p-3 bg-[#21262d] border-b border-[#30363d] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-[#58a6ff]" />
              <span className="text-xs font-bold text-[#f0f6fc]">2. Staging Area (Index)</span>
            </div>
            <span className="text-[10px] font-mono text-[#58a6ff] bg-[#58a6ff]/10 px-1.5 py-0.5 rounded border border-[#58a6ff]/30">
              {stagingAreaFiles.length} staged
            </span>
          </div>

          <div className="p-3 text-[11px] text-[#8b949e] border-b border-[#21262d]">
            Curated snapshot file (.git/index) holding changes ready for the next commit.
          </div>

          <div className="flex-1 p-3 space-y-2 overflow-y-auto min-h-[140px]">
            {stagingAreaFiles.length === 0 ? (
              <div className="text-xs text-[#8b949e] italic p-3 text-center">
                Staging area is empty. Stage files with "git add".
              </div>
            ) : (
              stagingAreaFiles.map((file) => (
                <div
                  key={file.path}
                  className="p-2 bg-[#0d1117] border border-[#58a6ff]/40 rounded text-xs font-mono space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[#58a6ff] truncate">{file.path}</span>
                    <span className="text-[10px] text-[#3fb950] font-bold">STAGED</span>
                  </div>
                  <div className="flex gap-1.5 pt-1">
                    <button
                      onClick={() => onExecuteCommand(`git restore --staged ${file.path}`)}
                      className="px-2 py-0.5 bg-[#21262d] hover:bg-[#30363d] text-[#8b949e] hover:text-[#f85149] rounded text-[10px] border border-[#30363d]"
                    >
                      Unstage
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-2 bg-[#0d1117] border-t border-[#21262d] text-center">
            <button
              onClick={() => onExecuteCommand('git commit -m "feat: snapshot staged files"')}
              disabled={stagingAreaFiles.length === 0}
              className={`w-full py-1.5 px-3 text-xs font-mono font-medium rounded transition-colors flex items-center justify-center gap-1.5 ${
                stagingAreaFiles.length > 0
                  ? 'bg-[#1f6feb] hover:bg-[#388bfd] text-white'
                  : 'bg-[#21262d] text-[#8b949e] cursor-not-allowed'
              }`}
            >
              <span>Commit: git commit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Column 3: Local Repository (.git) */}
        <div className="flex flex-col bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden">
          <div className="p-3 bg-[#21262d] border-b border-[#30363d] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-[#8957e5]" />
              <span className="text-xs font-bold text-[#f0f6fc]">3. Local Repository</span>
            </div>
            <span className="text-[10px] font-mono text-[#a371f7] bg-[#8957e5]/10 px-1.5 py-0.5 rounded border border-[#8957e5]/30">
              HEAD: {state.headCommitId}
            </span>
          </div>

          <div className="p-3 text-[11px] text-[#8b949e] border-b border-[#21262d]">
            Permanent cryptographic object database (.git) stored right on your machine.
          </div>

          <div className="flex-1 p-3 space-y-2 overflow-y-auto min-h-[140px]">
            {headCommit && (
              <div className="p-2 bg-[#0d1117] border border-[#30363d] rounded text-xs font-mono space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[#a371f7] font-bold">HEAD Commit</span>
                  <span className="text-[#c9d1d9]">{headCommit.id}</span>
                </div>
                <p className="text-[11px] text-[#f0f6fc] truncate">{headCommit.message}</p>
                <div className="text-[10px] text-[#8b949e]">
                  Branch: <span className="text-[#7ee787]">{state.currentBranch}</span>
                </div>
              </div>
            )}
            <div className="text-[11px] text-[#8b949e] pt-1">
              Total commits stored locally: <span className="text-[#f0f6fc]">{localRepoCommits.length}</span>
            </div>
          </div>

          <div className="p-2 bg-[#0d1117] border-t border-[#21262d] text-center">
            <button
              onClick={() => onExecuteCommand(`git push origin ${state.currentBranch}`)}
              className="w-full py-1.5 px-3 bg-[#8957e5] hover:bg-[#a371f7] text-white text-xs font-mono font-medium rounded transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Push: git push origin</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Column 4: Remote Repository (GitHub) */}
        <div className="flex flex-col bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden">
          <div className="p-3 bg-[#21262d] border-b border-[#30363d] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cloud className="w-4 h-4 text-[#3fb950]" />
              <span className="text-xs font-bold text-[#f0f6fc]">4. Remote (GitHub)</span>
            </div>
            <span
              className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                isRemoteSynced
                  ? 'bg-[#238636]/15 border-[#2ea043] text-[#3fb950]'
                  : 'bg-[#d29922]/15 border-[#d29922] text-[#d29922]'
              }`}
            >
              {isRemoteSynced ? 'Synced' : 'Ahead/Behind'}
            </span>
          </div>

          <div className="p-3 text-[11px] text-[#8b949e] border-b border-[#21262d]">
            Hosted cloud copy (github.com) accessible to teammates and CI/CD pipelines.
          </div>

          <div className="flex-1 p-3 space-y-2 overflow-y-auto min-h-[140px]">
            <div className="p-2 bg-[#0d1117] border border-[#30363d] rounded text-xs font-mono space-y-1">
              <span className="text-[#8b949e] text-[10px] block">Remote Tracking:</span>
              <span className="text-[#7ee787] block">origin/{state.currentBranch}</span>
              <span className="text-[11px] text-[#8b949e]">
                Commit: {remoteBranchCommitId || 'None'}
              </span>
            </div>
          </div>

          <div className="p-2 bg-[#0d1117] border-t border-[#21262d] text-center">
            <button
              onClick={() => onExecuteCommand('git fetch origin')}
              className="w-full py-1.5 px-3 bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] hover:text-white text-xs font-mono font-medium rounded transition-colors flex items-center justify-center gap-1.5 border border-[#30363d]"
            >
              <span>Fetch: git fetch origin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Visual Flow Animation Explanation */}
      <div className="p-4 bg-[#161b22] border border-[#30363d] rounded-xl space-y-3 font-mono text-xs">
        <span className="text-xs font-bold text-[#f0f6fc] uppercase tracking-wider block font-sans">
          The Lifecycle of Code Modifications
        </span>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[#c9d1d9] bg-[#0d1117] p-3 rounded-lg border border-[#30363d]">
          <div className="text-center">
            <span className="text-[#d29922] font-bold block">1. Edit Code</span>
            <span className="text-[10px] text-[#8b949e]">Working Directory</span>
          </div>
          <ArrowRight className="w-4 h-4 text-[#8b949e] rotate-90 sm:rotate-0" />
          <div className="text-center">
            <span className="text-[#58a6ff] font-bold block">2. git add</span>
            <span className="text-[10px] text-[#8b949e]">Staging Index</span>
          </div>
          <ArrowRight className="w-4 h-4 text-[#8b949e] rotate-90 sm:rotate-0" />
          <div className="text-center">
            <span className="text-[#a371f7] font-bold block">3. git commit</span>
            <span className="text-[10px] text-[#8b949e]">Local Repository</span>
          </div>
          <ArrowRight className="w-4 h-4 text-[#8b949e] rotate-90 sm:rotate-0" />
          <div className="text-center">
            <span className="text-[#3fb950] font-bold block">4. git push</span>
            <span className="text-[10px] text-[#8b949e]">GitHub Remote</span>
          </div>
        </div>
      </div>
    </div>
  );
};
