import React from 'react';
import {
  GitBranch,
  RotateCcw,
  Users,
  Search,
  FolderGit2,
  AlertTriangle,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import { SimulationState } from '../types/git';

interface HeaderProps {
  state: SimulationState;
  onReset: () => void;
  onOpenSpeakers: () => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  state,
  onReset,
  onOpenSpeakers,
  searchTerm,
  onSearchChange,
  isSidebarCollapsed,
  onToggleSidebar,
}) => {
  return (
    <header className="h-14 border-b border-[#30363d] bg-[#161b22] px-3 sm:px-4 md:px-6 flex items-center justify-between gap-3 sm:gap-4 select-none shrink-0 z-30">
      {/* Zone 1: Sidebar Toggle & Brand Wordmark */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Desktop Sidebar Collapse / Expand Toggle Button */}
        <button
          onClick={onToggleSidebar}
          className={`p-1.5 rounded-lg border transition-colors cursor-pointer flex items-center justify-center ${
            isSidebarCollapsed
              ? 'bg-[#1f6feb]/20 border-[#1f6feb]/50 text-[#58a6ff] hover:bg-[#1f6feb]/30'
              : 'text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d] border-transparent hover:border-[#30363d]'
          }`}
          title={isSidebarCollapsed ? 'Expand sidebar navigation (Exit presentation mode)' : 'Collapse sidebar for full-screen presentation'}
          aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isSidebarCollapsed ? (
            <PanelLeftOpen className="w-4 h-4 text-[#58a6ff]" />
          ) : (
            <PanelLeftClose className="w-4 h-4" />
          )}
        </button>

        <a href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-[#21262d] border border-[#30363d] flex items-center justify-center text-[#58a6ff] group-hover:border-[#58a6ff] transition-colors">
            <FolderGit2 className="w-4 h-4" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-bold tracking-tight text-white font-mono text-base">GIT//LAB</span>
            <span className="text-[10px] text-[#8b949e] hidden sm:inline uppercase tracking-widest font-mono">Sim</span>
          </div>
        </a>

        {/* Repository Context Badge */}
        <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-[#30363d] text-xs">
          <span className="text-[#8b949e]">repo:</span>
          <span className="font-mono font-medium text-[#f0f6fc] bg-[#21262d] px-2 py-0.5 rounded border border-[#30363d]">
            {state.repositoryName}
          </span>
          <span className="text-[#8b949e] flex items-center gap-1 font-mono">
            <GitBranch className="w-3.5 h-3.5 text-[#58a6ff]" />
            <span className={state.detachedHead ? 'text-[#d29922]' : 'text-[#7ee787]'}>
              {state.detachedHead ? `(detached at ${state.headCommitId})` : state.currentBranch}
            </span>
          </span>
        </div>
      </div>

      {/* Zone 2: Search */}
      <div className="flex-1 max-w-md hidden sm:block">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-[#8b949e] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search commands, lessons, tools (e.g. remote, rebase, Desktop, stash)..."
            className="w-full pl-9 pr-3 py-1.5 bg-[#0d1117] border border-[#30363d] rounded-md text-xs text-[#c9d1d9] placeholder-[#8b949e] focus:outline-none focus:border-[#58a6ff] transition-colors font-mono"
          />
        </div>
      </div>

      {/* Zone 3: Actions */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Active Conflict Warning Indicator */}
        {state.activeConflict && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#da3633]/20 border border-[#f85149] text-[#f85149] text-xs font-mono animate-pulse">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Conflict Active</span>
          </div>
        )}

        {/* Speaker / Creators Section Toggle */}
        <button
          onClick={onOpenSpeakers}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#c9d1d9] bg-[#21262d] hover:bg-[#30363d] hover:text-white border border-[#30363d] rounded-md transition-colors whitespace-nowrap cursor-pointer"
          title="Meet the creators: Keerthana M G & Karthikeyan"
        >
          <Users className="w-3.5 h-3.5 text-[#a371f7]" />
          <span>Speakers</span>
        </button>

        {/* Reset Lab Button */}
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#c9d1d9] bg-[#21262d] hover:bg-[#30363d] hover:text-[#f85149] border border-[#30363d] rounded-md transition-colors whitespace-nowrap cursor-pointer"
          title="Reset simulation to default state"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset Lab</span>
        </button>
      </div>
    </header>
  );
};
