import React, { useState } from 'react';
import { Binary, Search, CheckCircle2, XCircle, RotateCcw, HelpCircle, ArrowRight } from 'lucide-react';

interface CommitNode {
  id: string;
  message: string;
  author: string;
  hasBug: boolean;
  status: 'untested' | 'good' | 'bad' | 'testing';
}

const INITIAL_BISECT_COMMITS: CommitNode[] = [
  { id: 'c101a01', message: 'feat: setup routing scaffold', author: 'Keerthana M G', hasBug: false, status: 'good' },
  { id: 'c102b02', message: 'feat: configure Tailwind design tokens', author: 'Keerthana M G', hasBug: false, status: 'untested' },
  { id: 'c103c03', message: 'feat: add event card grid layout', author: 'Karthikeyan', hasBug: false, status: 'untested' },
  { id: 'c104d04', message: 'feat: add filter by symposium category', author: 'Rohan', hasBug: false, status: 'untested' },
  { id: 'c105e05', message: 'perf: optimize image asset loading', author: 'Keerthana M G', hasBug: false, status: 'untested' },
  { id: 'c106f06', message: 'refactor(api): change event date parser logic', author: 'Rohan', hasBug: true, status: 'untested' }, // Culprit!
  { id: 'c107a07', message: 'feat: add prize pool display text', author: 'Priya', hasBug: true, status: 'untested' },
  { id: 'c108b08', message: 'style: align register button on mobile', author: 'Karthikeyan', hasBug: true, status: 'untested' },
  { id: 'c109c09', message: 'docs: update symposium schedule notes', author: 'Priya', hasBug: true, status: 'untested' },
  { id: 'c110d10', message: 'feat: footer committee copyright', author: 'Keerthana M G', hasBug: true, status: 'bad' },
];

export const BisectLab: React.FC = () => {
  const [commits, setCommits] = useState<CommitNode[]>(INITIAL_BISECT_COMMITS);
  const [sessionActive, setSessionActive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [culpritFound, setCulpritFound] = useState<CommitNode | null>(null);
  const [stepCount, setStepCount] = useState(0);

  const startBisect = () => {
    setSessionActive(true);
    setCulpritFound(null);
    setStepCount(1);
    // Initial test is midpoint between good (0) and bad (9): index 4 or 5
    const mid = 5;
    setCurrentIndex(mid);
    setCommits((prev) =>
      prev.map((c, idx) => ({
        ...c,
        status: idx === 0 ? 'good' : idx === 9 ? 'bad' : idx === mid ? 'testing' : 'untested',
      }))
    );
  };

  const markCurrent = (isGood: boolean) => {
    if (currentIndex === null) return;

    const currentCommit = commits[currentIndex];
    const newCommits = [...commits];
    newCommits[currentIndex] = {
      ...currentCommit,
      status: isGood ? 'good' : 'bad',
    };

    setStepCount((s) => s + 1);

    // If we tested index 5 (which hasBug === true):
    // Test index 4 next to see if bug started at 5 or earlier
    if (currentIndex === 5) {
      if (isGood) {
        // If user marked 5 as good (wrongly based on real bug state)
        setCurrentIndex(7);
      } else {
        // Mark 5 as bad, check 4
        setCurrentIndex(4);
        newCommits[4].status = 'testing';
      }
    } else if (currentIndex === 4) {
      // Index 4 has no bug, so marking it good pinpoints 5 as the culprit!
      setCulpritFound(commits[5]);
      setCurrentIndex(null);
    } else {
      // Fallback
      setCulpritFound(commits[5]);
      setCurrentIndex(null);
    }

    setCommits(newCommits);
  };

  const resetBisect = () => {
    setSessionActive(false);
    setCurrentIndex(null);
    setCulpritFound(null);
    setStepCount(0);
    setCommits(INITIAL_BISECT_COMMITS);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0d1117] space-y-6">
      {/* Header */}
      <div className="p-4 bg-[#161b22] border border-[#30363d] rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Binary className="w-5 h-5 text-[#58a6ff]" />
            <h2 className="text-base font-bold text-[#f0f6fc]">
              Git Internals &amp; Bisect Laboratory
            </h2>
          </div>
          <p className="text-xs text-[#8b949e] mt-1">
            Simulate <span className="text-[#7ee787] font-mono">git bisect</span>: find the exact breaking commit in <span className="text-[#58a6ff] font-mono">O(log N)</span> binary search steps.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {!sessionActive ? (
            <button
              onClick={startBisect}
              className="px-3.5 py-1.5 bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-mono font-medium rounded transition-colors"
            >
              Start: git bisect start
            </button>
          ) : (
            <button
              onClick={resetBisect}
              className="px-3 py-1.5 bg-[#21262d] hover:bg-[#30363d] text-xs font-mono text-[#8b949e] hover:text-white rounded border border-[#30363d] flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>git bisect reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Under the hood of .git: 4 Object Types */}
      <div className="p-4 bg-[#161b22] border border-[#30363d] rounded-xl space-y-3">
        <span className="text-xs font-bold text-[#f0f6fc] uppercase tracking-wider block font-mono">
          Under the Hood: The 4 Core Git Objects in .git/objects/
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 bg-[#0d1117] border border-[#30363d] rounded space-y-1">
            <span className="text-[#58a6ff] font-bold block">1. Blob</span>
            <p className="text-[11px] text-[#8b949e]">Stores pure file contents. No filenames or permissions.</p>
          </div>
          <div className="p-3 bg-[#0d1117] border border-[#30363d] rounded space-y-1">
            <span className="text-[#3fb950] font-bold block">2. Tree</span>
            <p className="text-[11px] text-[#8b949e]">Represents directories. Lists blob hashes, filenames, and subtrees.</p>
          </div>
          <div className="p-3 bg-[#0d1117] border border-[#30363d] rounded space-y-1">
            <span className="text-[#a371f7] font-bold block">3. Commit</span>
            <p className="text-[11px] text-[#8b949e]">Points to a root Tree, parent commit(s), author, and message.</p>
          </div>
          <div className="p-3 bg-[#0d1117] border border-[#30363d] rounded space-y-1">
            <span className="text-[#d29922] font-bold block">4. Tag</span>
            <p className="text-[11px] text-[#8b949e]">Permanent annotated release reference with GPG signature &amp; date.</p>
          </div>
        </div>
      </div>

      {/* Bisect Interactive Interactive Timeline */}
      <div className="p-6 bg-[#161b22] border border-[#30363d] rounded-xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <span className="text-[#f0f6fc] font-bold">
            10-Commit Linear History (Oldest → Newest)
          </span>
          <span className="text-[#8b949e]">
            {sessionActive
              ? `Step ${stepCount} · ~${Math.ceil(Math.log2(10)) - stepCount + 1} binary steps remaining`
              : 'Click "Start: git bisect start" to begin hunting'}
          </span>
        </div>

        {/* Commit Nodes Timeline */}
        <div className="space-y-2">
          {commits.map((c, idx) => {
            const isTesting = currentIndex === idx;
            const isCulprit = culpritFound?.id === c.id;

            return (
              <div
                key={c.id}
                className={`p-3 rounded-lg border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono transition-all ${
                  isCulprit
                    ? 'bg-[#da3633]/20 border-[#f85149] ring-2 ring-[#f85149]'
                    : isTesting
                    ? 'bg-[#1f6feb]/20 border-[#58a6ff] ring-1 ring-[#58a6ff]'
                    : c.status === 'good'
                    ? 'bg-[#238636]/10 border-[#2ea043]'
                    : c.status === 'bad'
                    ? 'bg-[#da3633]/10 border-[#da3633]'
                    : 'bg-[#0d1117] border-[#30363d]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] ${
                      c.status === 'good'
                        ? 'bg-[#238636] text-white'
                        : c.status === 'bad'
                        ? 'bg-[#da3633] text-white'
                        : isTesting
                        ? 'bg-[#1f6feb] text-white animate-pulse'
                        : 'bg-[#21262d] text-[#8b949e]'
                    }`}
                  >
                    {idx + 1}
                  </span>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#58a6ff]">{c.id}</span>
                      <span className="text-[#f0f6fc] font-medium">{c.message}</span>
                    </div>
                    <span className="text-[11px] text-[#8b949e]">{c.author}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {isTesting && (
                    <span className="px-2 py-0.5 rounded bg-[#1f6feb] text-white text-[10px] font-bold animate-pulse">
                      TESTING NOW
                    </span>
                  )}
                  {isCulprit && (
                    <span className="px-2 py-0.5 rounded bg-[#f85149] text-white text-[10px] font-bold">
                      BUG INTRODUCED HERE!
                    </span>
                  )}
                  <span className="text-[11px] text-[#8b949e] capitalize">{c.status}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Test Prompt when in session */}
        {sessionActive && currentIndex !== null && (
          <div className="p-4 bg-[#0d1117] border border-[#58a6ff]/50 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1 text-xs">
              <span className="text-[#58a6ff] font-bold font-mono">
                Testing Commit: {commits[currentIndex].id} ({commits[currentIndex].message})
              </span>
              <p className="text-[#8b949e]">
                Does your application pass automated tests or exhibit the date parser bug at this commit?
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => markCurrent(true)}
                className="px-3 py-1.5 bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-mono font-bold rounded flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>git bisect good</span>
              </button>
              <button
                onClick={() => markCurrent(false)}
                className="px-3 py-1.5 bg-[#da3633] hover:bg-[#b62324] text-white text-xs font-mono font-bold rounded flex items-center gap-1.5"
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>git bisect bad</span>
              </button>
            </div>
          </div>
        )}

        {/* Culprit Isolated Banner */}
        {culpritFound && (
          <div className="p-4 bg-[#da3633]/20 border border-[#f85149] rounded-xl text-xs space-y-2 font-mono">
            <div className="flex items-center gap-2 text-[#f85149] font-bold text-sm">
              <Search className="w-4 h-4" />
              <span>{culpritFound.id} is the first bad commit</span>
            </div>
            <p className="text-[#c9d1d9]">
              Author: {culpritFound.author} · Commit: "{culpritFound.message}"
            </p>
            <p className="text-[#8b949e]">
              In just {stepCount} binary search steps, Git pinpointed the exact commit out of 10 revisions without needing to test all of them linearly!
            </p>
            <div className="pt-2">
              <button
                onClick={resetBisect}
                className="px-3 py-1.5 bg-[#21262d] hover:bg-[#30363d] text-white rounded border border-[#30363d]"
              >
                git bisect reset (Return to main)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
