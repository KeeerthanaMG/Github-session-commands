import React, { useState } from 'react';
import {
  getInitialSimulationState,
  executeGitCommand,
  resolveConflictInFile,
} from './engine/simulationEngine';
import { SimulationState, ActiveTab } from './types/git';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Terminal } from './components/Terminal';
import { EffectInspector } from './components/EffectInspector';
import { SpeakerSectionModal } from './components/SpeakerSectionModal';
import { StartHereView } from './components/StartHereView';
import { FourAreasVisualizer } from './components/FourAreasVisualizer';
import { CommandsExplorerView } from './components/CommandsExplorerView';
import { CommitGraph } from './components/CommitGraph';
import { MergeVsRebaseLab } from './components/MergeVsRebaseLab';
import { MergeConflictResolver } from './components/MergeConflictResolver';
import { StashRecoveryView } from './components/StashRecoveryView';
import { MultiContributorLab } from './components/MultiContributorLab';
import { GitHubPRView } from './components/GitHubPRView';
import { GitToolsEcosystemView } from './components/GitToolsEcosystemView';
import { BestPracticesView } from './components/BestPracticesView';
import { ChallengesView } from './components/ChallengesView';
import { GlossaryTroubleshootingView } from './components/GlossaryTroubleshootingView';
import { Menu, AlertTriangle, PanelLeftOpen } from 'lucide-react';

export default function App() {
  const [state, setState] = useState<SimulationState>(getInitialSimulationState);
  const [activeTab, setActiveTab] = useState<ActiveTab>('start');
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [isSpeakersOpen, setIsSpeakersOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpenMobileSidebar, setIsOpenMobileSidebar] = useState(false);
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);

  const handleRunCommand = (command: string) => {
    const { nextState, result } = executeGitCommand(command, state);
    setState({
      ...nextState,
      lastCommandResult: result,
    });

    // If user triggered merge conflict, automatically steer them to conflict tab
    if (result.status === 'conflict') {
      setActiveTab('conflicts');
    }
  };

  const handleResetLab = () => {
    setState(getInitialSimulationState());
    setIsResetConfirmOpen(false);
    setIsInspectorOpen(false);
  };

  const handleResolveConflict = (filePath: string, resolvedContent: string) => {
    const nextState = resolveConflictInFile(state, filePath, resolvedContent);
    setState(nextState);
  };

  const handleSwitchContributor = (contributorId: string) => {
    setState((prev) => ({
      ...prev,
      activeContributorId: contributorId,
    }));
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    if (term.trim() && activeTab !== 'commands') {
      setActiveTab('commands');
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#0d1117] text-[#c9d1d9] overflow-hidden select-none">
      {/* Top Header */}
      <Header
        state={state}
        onReset={() => setIsResetConfirmOpen(true)}
        onOpenSpeakers={() => setIsSpeakersOpen(true)}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        isSidebarCollapsed={isDesktopSidebarCollapsed}
        onToggleSidebar={() => setIsDesktopSidebarCollapsed((prev) => !prev)}
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile Sidebar Hamburger Toggle */}
        <button
          onClick={() => setIsOpenMobileSidebar(true)}
          className="lg:hidden absolute bottom-20 right-4 z-20 w-10 h-10 rounded-full bg-[#1f6feb] text-white flex items-center justify-center shadow-lg border border-white/20"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Persistent & Collapsible Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          isOpenMobile={isOpenMobileSidebar}
          onCloseMobile={() => setIsOpenMobileSidebar(false)}
          hasActiveConflict={!!state.activeConflict}
          isDesktopCollapsed={isDesktopSidebarCollapsed}
          onToggleDesktopCollapse={() => setIsDesktopSidebarCollapsed((prev) => !prev)}
        />

        {/* Center Visual Simulation Canvas */}
        <main className="flex-1 flex flex-col min-w-0 bg-[#0d1117] overflow-hidden relative">
          {/* Floating Expand Sidebar Button (Shown when sidebar is collapsed in desktop teaching mode) */}
          {isDesktopSidebarCollapsed && (
            <button
              onClick={() => setIsDesktopSidebarCollapsed(false)}
              className="hidden lg:flex items-center gap-1.5 absolute top-3 left-3 z-20 px-2.5 py-1.5 rounded-md bg-[#161b22]/90 hover:bg-[#21262d] text-[#58a6ff] hover:text-[#79c0ff] border border-[#30363d] shadow-lg text-xs font-mono transition-all duration-150 backdrop-blur cursor-pointer"
              title="Expand module sidebar (Teaching mode active)"
            >
              <PanelLeftOpen className="w-3.5 h-3.5" />
              <span>Modules</span>
            </button>
          )}

          {activeTab === 'start' && (
            <StartHereView
              onNavigateTab={setActiveTab}
              onExecuteCommand={handleRunCommand}
            />
          )}

          {activeTab === 'fundamentals' && (
            <FourAreasVisualizer
              state={state}
              onExecuteCommand={handleRunCommand}
            />
          )}

          {activeTab === 'commands' && (
            <CommandsExplorerView
              onExecuteCommand={handleRunCommand}
              externalSearch={searchTerm}
            />
          )}

          {activeTab === 'graph' && (
            <CommitGraph state={state} />
          )}

          {activeTab === 'merge-rebase' && (
            <MergeVsRebaseLab />
          )}

          {activeTab === 'conflicts' && (
            <MergeConflictResolver
              state={state}
              onResolveConflict={handleResolveConflict}
              onExecuteCommand={handleRunCommand}
            />
          )}

          {activeTab === 'stash-recovery' && (
            <StashRecoveryView
              state={state}
              onExecuteCommand={handleRunCommand}
            />
          )}

          {activeTab === 'collaboration' && (
            <MultiContributorLab
              state={state}
              onExecuteCommand={handleRunCommand}
              onSwitchContributor={handleSwitchContributor}
            />
          )}

          {activeTab === 'github-pr' && (
            <GitHubPRView
              state={state}
              onExecuteCommand={handleRunCommand}
            />
          )}

          {activeTab === 'tools' && (
            <GitToolsEcosystemView />
          )}

          {activeTab === 'best-practices' && (
            <BestPracticesView />
          )}

          {activeTab === 'challenges' && (
            <ChallengesView
              state={state}
              onSetSimulationState={setState}
              onExecuteCommand={handleRunCommand}
            />
          )}

          {activeTab === 'glossary' && (
            <GlossaryTroubleshootingView
              onExecuteCommand={handleRunCommand}
            />
          )}

          {/* Collapsible Command Effect Inspector */}
          {isInspectorOpen && (
            <EffectInspector
              lastResult={state.lastCommandResult}
              state={state}
              onClose={() => setIsInspectorOpen(false)}
            />
          )}

          {/* Docked Interactive Terminal */}
          <Terminal
            onRunCommand={handleRunCommand}
            lastResult={state.lastCommandResult}
            history={state.commandHistory}
            state={state}
            onToggleInspector={() => setIsInspectorOpen(!isInspectorOpen)}
            isInspectorOpen={isInspectorOpen}
          />
        </main>
      </div>

      {/* Speaker Section Modal (Keerthana & Karthikeyan) */}
      <SpeakerSectionModal
        isOpen={isSpeakersOpen}
        onClose={() => setIsSpeakersOpen(false)}
      />

      {/* Reset Lab Confirmation Dialog */}
      {isResetConfirmOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        >
          <div className="w-full max-w-md p-6 bg-[#161b22] border border-[#30363d] rounded-xl space-y-4 text-xs font-mono shadow-2xl">
            <div className="flex items-center gap-2 text-[#f85149] font-bold text-sm">
              <AlertTriangle className="w-5 h-5" />
              <span>Confirm Simulation Reset</span>
            </div>
            <p className="text-[#c9d1d9] leading-relaxed">
              Resetting will restore the repository, branches, stashes, and contributors back to the clean initial seed state. Any uncommitted terminal experiments will be reset.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-3 py-1.5 bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] rounded border border-[#30363d]"
              >
                Cancel
              </button>
              <button
                onClick={handleResetLab}
                className="px-3.5 py-1.5 bg-[#da3633] hover:bg-[#b62324] text-white font-bold rounded"
              >
                Reset Laboratory State
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
