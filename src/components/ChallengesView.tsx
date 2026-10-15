import React, { useState } from 'react';
import { CHALLENGES } from '../data/challenges';
import { Challenge, SimulationState } from '../types/git';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Play,
  RotateCcw,
  Clock,
  Target,
  Sparkles,
  ArrowRight,
  Folder,
  FileCode,
  Check,
} from 'lucide-react';

interface ChallengesViewProps {
  state: SimulationState;
  onSetSimulationState: (newState: SimulationState) => void;
  onExecuteCommand: (cmd: string) => void;
}

export const ChallengesView: React.FC<ChallengesViewProps> = ({
  state,
  onSetSimulationState,
  onExecuteCommand,
}) => {
  const [selectedChallengeId, setSelectedChallengeId] = useState<string>(CHALLENGES[0].id);
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});
  const [validationResults, setValidationResults] = useState<
    Record<string, { passed: boolean; message: string }>
  >({});

  const activeChallenge =
    CHALLENGES.find((c) => c.id === selectedChallengeId) || CHALLENGES[0];

  const handleStartMission = (challenge: Challenge) => {
    const preparedState = challenge.setupState(state);
    onSetSimulationState(preparedState);
    setValidationResults((prev) => ({ ...prev, [challenge.id]: undefined as any }));
  };

  const handleVerifyMission = (challenge: Challenge) => {
    const result = challenge.checkCompletion(state);
    setValidationResults((prev) => ({ ...prev, [challenge.id]: result }));
  };

  const handleRunActionButton = (cmd: string, challenge: Challenge) => {
    onExecuteCommand(cmd);
    // Auto-check after running action
    setTimeout(() => {
      // Re-evaluate against the next state
      handleVerifyMission(challenge);
    }, 150);
  };

  const toggleHint = (id: string) => {
    setShowHints((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Inspect what's currently in state for the mission
  const modifiedFiles = Object.values(state.files).filter((f) => f.status === 'modified');
  const stagedFiles = Object.values(state.files).filter((f) => f.status === 'staged');
  const committedFiles = Object.values(state.files).filter((f) => f.status === 'committed');

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0d1117] space-y-6">
      {/* Header */}
      <div className="p-4 bg-[#161b22] border border-[#30363d] rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#3fb950]" />
            <h2 className="text-base font-bold text-[#f0f6fc]">
              Interactive Student Missions
            </h2>
          </div>
          <p className="text-xs text-[#8b949e] mt-1">
            Solve real-world challenges using simple action buttons or typing in the terminal. No confusing tests—just practical engineering habits.
          </p>
        </div>

        <button
          onClick={() => handleStartMission(activeChallenge)}
          className="px-3.5 py-1.5 bg-[#21262d] hover:bg-[#30363d] text-xs font-mono text-[#58a6ff] rounded border border-[#30363d] flex items-center gap-1.5 transition-colors shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Current Mission</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Mission Selector List */}
        <div className="space-y-2 lg:col-span-1">
          <span className="text-[11px] font-mono text-[#8b949e] uppercase tracking-wider block mb-1">
            Pick a Mission:
          </span>

          {CHALLENGES.map((ch, idx) => {
            const isSelected = ch.id === activeChallenge.id;
            const res = validationResults[ch.id];

            return (
              <div
                key={ch.id}
                onClick={() => {
                  setSelectedChallengeId(ch.id);
                  handleStartMission(ch);
                }}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#161b22] border-[#58a6ff] shadow-sm ring-1 ring-[#58a6ff]'
                    : 'bg-[#161b22]/70 border-[#30363d] hover:border-[#8b949e]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono text-[#58a6ff] font-bold">
                    Mission {idx + 1}
                  </span>

                  <span className="text-[10px] font-mono text-[#8b949e]">
                    {ch.difficulty} · {ch.timeEstimate}
                  </span>
                </div>

                <h3 className="text-xs font-bold text-[#f0f6fc]">{ch.title}</h3>

                {res && (
                  <div className="mt-2 pt-2 border-t border-[#30363d] flex items-center gap-1.5 text-[11px] font-mono">
                    {res.passed ? (
                      <span className="text-[#3fb950] font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        PASSED!
                      </span>
                    ) : (
                      <span className="text-[#f85149] font-medium flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5" />
                        In Progress
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right: Active Mission Workbench */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-6 bg-[#161b22] border border-[#30363d] rounded-xl space-y-5">
            {/* Title & Difficulty */}
            <div className="pb-3 border-b border-[#30363d] space-y-1">
              <span className="text-xs font-mono text-[#58a6ff]">
                Category: {activeChallenge.category}
              </span>
              <h3 className="text-lg font-bold text-[#f0f6fc]">{activeChallenge.title}</h3>
            </div>

            {/* Simple Student Analogy Box */}
            <div className="p-3.5 bg-[#0d1117] border border-[#58a6ff]/30 rounded-lg flex items-start gap-3 text-xs leading-relaxed">
              <Sparkles className="w-4 h-4 text-[#58a6ff] shrink-0 mt-0.5" />
              <div>
                <span className="text-[#58a6ff] font-bold block mb-0.5">Simple Analogy:</span>
                <p className="text-[#c9d1d9]">{activeChallenge.studentAnalogy}</p>
              </div>
            </div>

            {/* The Goal */}
            <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg space-y-1.5 text-xs">
              <span className="text-xs font-bold text-[#f0f6fc] flex items-center gap-1.5">
                <Target className="w-4 h-4 text-[#3fb950]" />
                Your Goal:
              </span>
              <p className="text-[#c9d1d9] pl-5 leading-relaxed">{activeChallenge.objective}</p>
            </div>

            {/* Live Machine State Inspector */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-[#8b949e] uppercase tracking-wider block">
                Live State on Your Simulated Machine:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                {/* Working files */}
                <div className="p-3 bg-[#0d1117] border border-[#30363d] rounded-lg space-y-1">
                  <span className="text-[#d29922] font-bold block text-[11px]">
                    1. Working Files ({modifiedFiles.length})
                  </span>
                  {modifiedFiles.length === 0 ? (
                    <span className="text-[#8b949e] text-[11px] italic">Clean</span>
                  ) : (
                    modifiedFiles.map((f) => (
                      <span key={f.path} className="text-[#f85149] block text-[11px] truncate">
                        • {f.path} (modified)
                      </span>
                    ))
                  )}
                </div>

                {/* Staged files */}
                <div className="p-3 bg-[#0d1117] border border-[#30363d] rounded-lg space-y-1">
                  <span className="text-[#58a6ff] font-bold block text-[11px]">
                    2. Staging Index ({stagedFiles.length})
                  </span>
                  {stagedFiles.length === 0 ? (
                    <span className="text-[#8b949e] text-[11px] italic">Empty</span>
                  ) : (
                    stagedFiles.map((f) => (
                      <span key={f.path} className="text-[#3fb950] block text-[11px] truncate">
                        ✓ {f.path} (staged)
                      </span>
                    ))
                  )}
                </div>

                {/* Active branch & HEAD */}
                <div className="p-3 bg-[#0d1117] border border-[#30363d] rounded-lg space-y-1">
                  <span className="text-[#a371f7] font-bold block text-[11px]">
                    3. Branch &amp; HEAD
                  </span>
                  <span className="text-[#7ee787] block text-[11px] truncate">
                    Branch: {state.currentBranch}
                  </span>
                  <span className="text-[#8b949e] block text-[11px]">
                    HEAD: {state.headCommitId}
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Interactive Action Buttons */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-mono text-[#f0f6fc] font-bold block">
                Interactive Controls: Click to Run or type below in terminal:
              </span>

              <div className="flex flex-wrap items-center gap-2">
                {activeChallenge.actionButtons.map((btn, i) => (
                  <button
                    key={i}
                    onClick={() => handleRunActionButton(btn.command, activeChallenge)}
                    className="px-3.5 py-2 bg-[#21262d] hover:bg-[#1f6feb] text-white text-xs font-mono font-medium rounded-lg border border-[#30363d] flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                  >
                    <Play className="w-3.5 h-3.5 text-[#58a6ff]" />
                    <span>{btn.label}</span>
                  </button>
                ))}

                <button
                  onClick={() => handleVerifyMission(activeChallenge)}
                  className="px-4 py-2 bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-mono font-bold rounded-lg flex items-center gap-1.5 transition-colors shadow ml-auto"
                >
                  <Check className="w-4 h-4" />
                  <span>Verify My Work</span>
                </button>
              </div>
            </div>

            {/* Hints Accordion */}
            <div className="pt-2">
              <button
                onClick={() => toggleHint(activeChallenge.id)}
                className="text-xs text-[#d29922] font-mono hover:underline flex items-center gap-1"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>{showHints[activeChallenge.id] ? 'Hide Clues' : 'Stuck? Click for Step-by-Step Clues'}</span>
              </button>

              {showHints[activeChallenge.id] && (
                <div className="mt-2 p-3 bg-[#0d1117] border border-[#d29922]/40 rounded-lg text-xs font-mono space-y-1">
                  {activeChallenge.hints.map((hint, i) => (
                    <div key={i} className="text-[#c9d1d9] leading-relaxed">
                      {hint}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Verification Result Banner */}
            {validationResults[activeChallenge.id] && (
              <div
                className={`p-4 rounded-xl border font-mono text-xs space-y-1.5 ${
                  validationResults[activeChallenge.id].passed
                    ? 'bg-[#238636]/15 border-[#2ea043] text-[#3fb950]'
                    : 'bg-[#da3633]/15 border-[#f85149] text-[#f85149]'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm">
                  {validationResults[activeChallenge.id].passed ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>MISSION COMPLETE!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4" />
                      <span>NOT QUITE DONE YET</span>
                    </>
                  )}
                </div>
                <p className="text-[#c9d1d9] pl-6 leading-relaxed">
                  {validationResults[activeChallenge.id].message}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
