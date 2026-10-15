import React from 'react';
import { Compass, BookOpen, Layers, Terminal, GitBranch, ArrowRight, ShieldCheck, Sparkles, Folder, FileCode, Database, Cloud } from 'lucide-react';
import { ActiveTab } from '../types/git';

interface StartHereViewProps {
  onNavigateTab: (tab: ActiveTab) => void;
  onExecuteCommand: (cmd: string) => void;
}

export const StartHereView: React.FC<StartHereViewProps> = ({ onNavigateTab, onExecuteCommand }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0d1117] space-y-8">
      {/* Hero Welcome Banner */}
      <div className="p-6 sm:p-8 bg-[#161b22] border border-[#30363d] rounded-2xl relative overflow-hidden">
        <div className="max-w-2xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#1f6feb]/20 text-[#58a6ff] text-xs font-mono font-semibold border border-[#1f6feb]/40">
              Interactive Git Lab
            </span>
            <span className="text-xs text-[#8b949e]">Student Edition · No Jargon</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#f0f6fc] tracking-tight">
            Git explained in plain English.
          </h1>

          <p className="text-sm text-[#8b949e] leading-relaxed">
            Welcome to <strong className="text-[#f0f6fc]">GIT//LAB</strong>. Stop blindly copying command strings from StackOverflow. Here, every command has an observable consequence, every button shows you what changed, and you learn how real teams collaborate on GitHub.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab('fundamentals')}
              className="px-4 py-2 bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-mono font-semibold rounded-lg flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              <span>1. See The 4 Git Areas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onNavigateTab('collaboration')}
              className="px-4 py-2 bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] hover:text-white text-xs font-mono rounded-lg border border-[#30363d] transition-colors cursor-pointer"
            >
              2. Try Team Simulation Story
            </button>

            <button
              onClick={() => onNavigateTab('challenges')}
              className="px-4 py-2 bg-[#1f6feb] hover:bg-[#388bfd] text-white text-xs font-mono rounded-lg transition-colors cursor-pointer"
            >
              3. Interactive Missions
            </button>
          </div>
        </div>
      </div>

      {/* College Student Analogy: The 4 Areas */}
      <div className="p-6 bg-[#161b22] border border-[#30363d] rounded-xl space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#58a6ff]" />
          <h2 className="text-base font-bold text-[#f0f6fc]">
            The 30-Second Mental Model: Your College Desk Analogy
          </h2>
        </div>

        <p className="text-xs text-[#8b949e] leading-relaxed">
          If you have never touched Git before, think of it like working on a college group project:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1 font-mono text-xs">
          {/* Desk */}
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-[#d29922]">
              <Folder className="w-4 h-4" />
              <span className="font-bold">1. Your Study Desk</span>
            </div>
            <p className="text-[11px] text-[#8b949e] font-sans">
              <strong>(Working Directory):</strong> Where you write code in VS Code. Files can be messy, half-finished, or broken.
            </p>
          </div>

          {/* Envelope */}
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-[#58a6ff]">
              <FileCode className="w-4 h-4" />
              <span className="font-bold">2. The Submission Envelope</span>
            </div>
            <p className="text-[11px] text-[#8b949e] font-sans">
              <strong>(Staging Area / Index):</strong> When you run <code className="text-[#58a6ff]">git add</code>, you slide only the finished pages into an envelope.
            </p>
          </div>

          {/* Locker */}
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-[#a371f7]">
              <Database className="w-4 h-4" />
              <span className="font-bold">3. Your Storage Locker</span>
            </div>
            <p className="text-[11px] text-[#8b949e] font-sans">
              <strong>(Local .git Database):</strong> When you run <code className="text-[#a371f7]">git commit</code>, you seal the envelope with your signature and lock it in your locker.
            </p>
          </div>

          {/* Portal */}
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-[#3fb950]">
              <Cloud className="w-4 h-4" />
              <span className="font-bold">4. The Online Portal</span>
            </div>
            <p className="text-[11px] text-[#8b949e] font-sans">
              <strong>(GitHub Remote):</strong> When you run <code className="text-[#3fb950]">git push</code>, you upload your sealed commits to the shared cloud so teammates can review.
            </p>
          </div>
        </div>
      </div>

      {/* 4 Interactive Starting Points */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => onNavigateTab('fundamentals')}
          className="p-5 bg-[#161b22] border border-[#30363d] hover:border-[#58a6ff] rounded-xl transition-all cursor-pointer space-y-2 group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#1f6feb]/10 text-[#58a6ff] flex items-center justify-center font-bold">
            1
          </div>
          <h3 className="text-sm font-bold text-[#f0f6fc] group-hover:text-[#58a6ff]">
            The 4 Git Areas
          </h3>
          <p className="text-xs text-[#8b949e] leading-relaxed">
            Interactive buttons to move files between your desk, staging envelope, and the cloud.
          </p>
        </div>

        <div
          onClick={() => onNavigateTab('collaboration')}
          className="p-5 bg-[#161b22] border border-[#30363d] hover:border-[#3fb950] rounded-xl transition-all cursor-pointer space-y-2 group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#238636]/10 text-[#3fb950] flex items-center justify-center font-bold">
            2
          </div>
          <h3 className="text-sm font-bold text-[#f0f6fc] group-hover:text-[#3fb950]">
            Team Collaboration Story
          </h3>
          <p className="text-xs text-[#8b949e] leading-relaxed">
            See how Keerthana, Karthikeyan, Rohan, and Priya collaborate and why git push gets rejected.
          </p>
        </div>

        <div
          onClick={() => onNavigateTab('tools')}
          className="p-5 bg-[#161b22] border border-[#30363d] hover:border-[#a371f7] rounded-xl transition-all cursor-pointer space-y-2 group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#8957e5]/10 text-[#a371f7] flex items-center justify-center font-bold">
            3
          </div>
          <h3 className="text-sm font-bold text-[#f0f6fc] group-hover:text-[#a371f7]">
            Git Tools &amp; Ecosystem
          </h3>
          <p className="text-xs text-[#8b949e] leading-relaxed">
            Learn GitHub Desktop, GitHub CLI (`gh`), GitLab, VS Code Source Control, and GitLens.
          </p>
        </div>

        <div
          onClick={() => onNavigateTab('conflicts')}
          className="p-5 bg-[#161b22] border border-[#30363d] hover:border-[#f85149] rounded-xl transition-all cursor-pointer space-y-2 group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#da3633]/10 text-[#f85149] flex items-center justify-center font-bold">
            4
          </div>
          <h3 className="text-sm font-bold text-[#f0f6fc] group-hover:text-[#f85149]">
            Merge Conflict Lab
          </h3>
          <p className="text-xs text-[#8b949e] leading-relaxed">
            Solve your first merge conflict in 60 seconds with simple "Accept Ours / Theirs" buttons.
          </p>
        </div>
      </div>
    </div>
  );
};
