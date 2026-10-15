import React, { useState } from 'react';
import { SimulationState, Contributor } from '../types/git';
import {
  Users,
  GitBranch,
  ArrowRight,
  GitPullRequest,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Laptop,
  Cloud,
  Check,
} from 'lucide-react';

interface MultiContributorLabProps {
  state: SimulationState;
  onExecuteCommand: (cmd: string) => void;
  onSwitchContributor: (contributorId: string) => void;
}

interface WorkflowStep {
  stepNumber: number;
  actor: string;
  avatarBg: string;
  title: string;
  studentExplanation: string;
  command: string;
  commandButtonLabel: string;
  outcomeType: 'success' | 'rejection' | 'merge';
  outcomeMessage: string;
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    stepNumber: 1,
    actor: 'Keerthana (Project Lead)',
    avatarBg: '#8957e5',
    title: '1. Keerthana creates project & pushes initial main branch',
    studentExplanation:
      'Keerthana sets up the college symposium repository on her laptop and pushes the base code to GitHub so her teammates have a starting point.',
    command: 'git push origin main',
    commandButtonLabel: 'Keerthana: git push origin main',
    outcomeType: 'success',
    outcomeMessage: '✓ origin/main is established on GitHub with initial navigation and setup.',
  },
  {
    stepNumber: 2,
    actor: 'Karthikeyan (UI Developer)',
    avatarBg: '#1f6feb',
    title: '2. Karthikeyan creates his isolated feature branch',
    studentExplanation:
      'Rule #1 of team projects: NEVER work directly on main! Karthikeyan switches to his own branch called "feature/hero" to design the hackathon banner safely.',
    command: 'git switch -c feature/hero',
    commandButtonLabel: 'Karthikeyan: git switch -c feature/hero',
    outcomeType: 'success',
    outcomeMessage: '✓ Switched to new branch "feature/hero". Keerthana’s main branch remains completely untouched.',
  },
  {
    stepNumber: 3,
    actor: 'Karthikeyan (UI Developer)',
    avatarBg: '#1f6feb',
    title: '3. Karthikeyan commits his work & pushes branch to GitHub',
    studentExplanation:
      'After polishing the hero section code, Karthikeyan snapshots his changes into a commit and pushes only his feature branch to GitHub.',
    command: 'git commit -m "feat(hero): add 3D countdown banner"',
    commandButtonLabel: 'Karthikeyan: Commit & Push branch',
    outcomeType: 'success',
    outcomeMessage: '✓ Branch "origin/feature/hero" is now published on GitHub ready for review.',
  },
  {
    stepNumber: 4,
    actor: 'Keerthana & Karthikeyan',
    avatarBg: '#238636',
    title: '4. Keerthana reviews & merges Karthikeyan’s Pull Request',
    studentExplanation:
      'Instead of immediately copying code, Keerthana reviews Karthikeyan’s code in a Pull Request, verifies the automated checks pass, and merges it into main.',
    command: 'gh pr merge 14',
    commandButtonLabel: 'Keerthana: Approve & Merge PR #14',
    outcomeType: 'merge',
    outcomeMessage: '✓ PR #14 merged! GitHub main is now ahead by Karthikeyan’s new code.',
  },
  {
    stepNumber: 5,
    actor: 'Priya (Docs & Footer)',
    avatarBg: '#d29922',
    title: '5. Priya tries to push her work without pulling first (The Crash!)',
    studentExplanation:
      'Priya has been working on her laptop for 4 hours. She tries to push directly to GitHub without checking what her team did. Watch what Git does to protect the team!',
    command: 'git push origin main',
    commandButtonLabel: 'Priya: Try to git push (Watch it fail!)',
    outcomeType: 'rejection',
    outcomeMessage:
      '💥 [rejected - non-fast-forward]! Git REFUSES to let Priya push. Why? Because GitHub already has Karthikeyan’s code, which Priya does not have on her laptop! If Git allowed her push, Karthikeyan’s work would be wiped out!',
  },
  {
    stepNumber: 6,
    actor: 'Priya (Docs & Footer)',
    avatarBg: '#d29922',
    title: '6. Priya runs `git pull` to sync, then pushes cleanly',
    studentExplanation:
      'Priya fetches the newest code from GitHub, combines it with her footer work, and now her push succeeds smoothly!',
    command: 'git pull origin main',
    commandButtonLabel: 'Priya: git pull origin main (Reconcile)',
    outcomeType: 'success',
    outcomeMessage:
      '✓ Successfully pulled! Priya’s laptop now has both Karthikeyan’s hero banner and her new footer. Team is in harmony.',
  },
];

export const MultiContributorLab: React.FC<MultiContributorLabProps> = ({
  state,
  onExecuteCommand,
  onSwitchContributor,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [stepExecuted, setStepExecuted] = useState<boolean[]>(new Array(WORKFLOW_STEPS.length).fill(false));

  const currentStep = WORKFLOW_STEPS[activeStepIndex];

  const handleRunStep = (index: number) => {
    const step = WORKFLOW_STEPS[index];
    onExecuteCommand(step.command);

    setStepExecuted((prev) => {
      const copy = [...prev];
      copy[index] = true;
      return copy;
    });

    if (index < WORKFLOW_STEPS.length - 1) {
      setActiveStepIndex(index + 1);
    }
  };

  const handleResetStory = () => {
    setActiveStepIndex(0);
    setStepExecuted(new Array(WORKFLOW_STEPS.length).fill(false));
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0d1117] space-y-6">
      {/* Header */}
      <div className="p-4 bg-[#161b22] border border-[#30363d] rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#58a6ff]" />
            <h2 className="text-base font-bold text-[#f0f6fc]">
              Team Collaboration Simulator (How College Teams Actually Use Git)
            </h2>
          </div>
          <p className="text-xs text-[#8b949e] mt-1">
            Follow the interactive story of 4 student developers building a college website together without stepping on each other's toes.
          </p>
        </div>

        <button
          onClick={handleResetStory}
          className="px-3 py-1.5 bg-[#21262d] hover:bg-[#30363d] text-xs font-mono text-[#8b949e] hover:text-white rounded border border-[#30363d] flex items-center gap-1.5 transition-colors shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Story</span>
        </button>
      </div>

      {/* The 4 Student Laptops: Who is on what branch */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {state.contributors.map((c) => {
          const isSelected = c.id === state.activeContributorId;

          return (
            <div
              key={c.id}
              onClick={() => onSwitchContributor(c.id)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-2 ${
                isSelected
                  ? 'bg-[#161b22] border-[#58a6ff] ring-1 ring-[#58a6ff]'
                  : 'bg-[#161b22]/70 border-[#30363d] hover:border-[#8b949e]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-white text-xs"
                    style={{ backgroundColor: c.avatarBg }}
                  >
                    {c.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#f0f6fc] truncate">{c.name}</h3>
                    <span className="text-[10px] text-[#8b949e] block">{c.role.split('/')[0]}</span>
                  </div>
                </div>
              </div>

              <div className="p-2 bg-[#0d1117] rounded border border-[#30363d] text-[11px] font-mono space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[#8b949e]">Laptop Branch:</span>
                  <span className="text-[#7ee787] font-bold flex items-center gap-1">
                    <GitBranch className="w-3 h-3" />
                    {c.activeBranch}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Step-by-Step Interactive Story Workflow */}
      <div className="p-6 bg-[#161b22] border border-[#30363d] rounded-xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#30363d]">
          <div>
            <h3 className="text-sm font-bold text-[#f0f6fc] font-mono">
              Interactive Story Mode: The Life of a Group Project
            </h3>
            <p className="text-xs text-[#8b949e]">
              Click through each step to see why Git behaves the way it does in teams.
            </p>
          </div>

          <span className="text-xs font-mono text-[#58a6ff]">
            Step {activeStepIndex + 1} of {WORKFLOW_STEPS.length}
          </span>
        </div>

        {/* Steps List */}
        <div className="space-y-4">
          {WORKFLOW_STEPS.map((step, idx) => {
            const isCurrent = idx === activeStepIndex;
            const isDone = stepExecuted[idx];

            return (
              <div
                key={step.stepNumber}
                className={`p-4 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-[#161b22] border-[#58a6ff] ring-1 ring-[#58a6ff]'
                    : isDone
                    ? 'bg-[#161b22]/50 border-[#2ea043]/50'
                    : 'bg-[#0d1117] border-[#30363d] opacity-60'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                        isDone
                          ? 'bg-[#238636] text-white'
                          : isCurrent
                          ? 'bg-[#1f6feb] text-white animate-pulse'
                          : 'bg-[#21262d] text-[#8b949e]'
                      }`}
                    >
                      {isDone ? <Check className="w-4 h-4" /> : step.stepNumber}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#f0f6fc]">{step.title}</span>
                      </div>
                      <p className="text-xs text-[#8b949e] leading-relaxed">
                        {step.studentExplanation}
                      </p>
                    </div>
                  </div>

                  {/* Action Button for this step */}
                  <div className="shrink-0 pl-10 sm:pl-0">
                    <button
                      onClick={() => handleRunStep(idx)}
                      className={`px-3 py-1.5 rounded text-xs font-mono font-medium flex items-center gap-1.5 transition-colors ${
                        isDone
                          ? 'bg-[#21262d] text-[#3fb950] border border-[#2ea043]'
                          : isCurrent
                          ? 'bg-[#238636] hover:bg-[#2ea043] text-white shadow'
                          : 'bg-[#21262d] text-[#8b949e] hover:text-[#f0f6fc] border border-[#30363d]'
                      }`}
                    >
                      <Play className="w-3 h-3" />
                      <span>{step.commandButtonLabel}</span>
                    </button>
                  </div>
                </div>

                {/* Outcome message if executed */}
                {isDone && (
                  <div
                    className={`mt-3 p-3 rounded-lg border font-mono text-xs whitespace-pre-wrap ${
                      step.outcomeType === 'rejection'
                        ? 'bg-[#da3633]/15 border-[#f85149] text-[#f85149]'
                        : 'bg-[#238636]/15 border-[#2ea043] text-[#3fb950]'
                    }`}
                  >
                    {step.outcomeMessage}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
