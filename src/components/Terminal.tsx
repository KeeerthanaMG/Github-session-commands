import React, { useState, useRef, useEffect } from 'react';
import {
  Terminal as TerminalIcon,
  CornerDownLeft,
  Trash2,
  Copy,
  Check,
  ChevronUp,
  ChevronDown,
  Info,
  SlidersHorizontal,
} from 'lucide-react';
import { CommandResult, SimulationState } from '../types/git';

interface TerminalProps {
  onRunCommand: (command: string) => void;
  lastResult: CommandResult | null;
  history: string[];
  state: SimulationState;
  onToggleInspector: () => void;
  isInspectorOpen: boolean;
}

export const Terminal: React.FC<TerminalProps> = ({
  onRunCommand,
  lastResult,
  history,
  state,
  onToggleInspector,
  isInspectorOpen,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [terminalLogs, setTerminalLogs] = useState<
    { command: string; result: CommandResult }[]
  >([]);
  const [isCopied, setIsCopied] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Suggested commands for autocomplete
  const quickSuggestions = [
    'git status',
    'git remote -v',
    'git diff',
    'git add src/App.jsx',
    'git commit -m "feat: update portal"',
    'git log --oneline --graph',
    'git branch',
    'git switch -c feature/symposium-faq',
    'git merge feature/events',
    'git rebase main',
    'git stash push -m "wip"',
    'git stash pop',
    'git reflog',
  ];

  // Sync new results into logs
  useEffect(() => {
    if (lastResult) {
      if (lastResult.command === 'clear') {
        setTerminalLogs([]);
        return;
      }
      setTerminalLogs((prev) => [...prev.slice(-40), { command: lastResult.command, result: lastResult }]);
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 30);
    }
  }, [lastResult?.id, lastResult?.timestamp]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    onRunCommand(inputVal);
    setInputVal('');
    setHistoryIndex(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInputVal(history[nextIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (history.length === 0 || historyIndex === null) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= history.length) {
        setHistoryIndex(null);
        setInputVal('');
      } else {
        setHistoryIndex(nextIdx);
        setInputVal(history[nextIdx] || '');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple tab completion against suggestions
      const match = quickSuggestions.find((s) => s.startsWith(inputVal.trim()));
      if (match) {
        setInputVal(match);
      }
    }
  };

  const handleCopyLogs = () => {
    const text = terminalLogs
      .map((log) => `$ ${log.command}\n${log.result.output || '(no output)'}`)
      .join('\n\n');
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  };

  const handleClear = () => {
    setTerminalLogs([]);
  };

  return (
    <div className="border-t border-[#30363d] bg-[#0d1117] flex flex-col shrink-0 transition-all duration-200">
      {/* Terminal Title Bar */}
      <div className="h-9 px-4 bg-[#161b22] border-b border-[#30363d] flex items-center justify-between text-xs select-none">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-[#58a6ff]" />
          <span className="font-mono font-medium text-[#f0f6fc]">Terminal</span>
          <span className="text-[#8b949e] font-mono text-[11px] hidden sm:inline">
            ~/projects/{state.repositoryName} ({state.detachedHead ? `HEAD detached` : state.currentBranch})
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Show what changed Inspector Button */}
          <button
            onClick={onToggleInspector}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono border transition-colors ${
              isInspectorOpen
                ? 'bg-[#1f6feb]/20 border-[#1f6feb] text-[#58a6ff]'
                : 'bg-[#21262d] border-[#30363d] text-[#c9d1d9] hover:bg-[#30363d]'
            }`}
          >
            <SlidersHorizontal className="w-3 h-3" />
            <span>Inspector</span>
          </button>

          {/* Copy output button */}
          <button
            onClick={handleCopyLogs}
            className="p-1 text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d] rounded transition-colors"
            title="Copy terminal session"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-[#3fb950]" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          {/* Clear button */}
          <button
            onClick={handleClear}
            className="p-1 text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d] rounded transition-colors"
            title="Clear terminal"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          {/* Collapse/Expand toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d] rounded transition-colors"
          >
            {isCollapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Terminal Output Body */}
      {!isCollapsed && (
        <div
          ref={scrollRef}
          className="h-44 md:h-52 overflow-y-auto p-3 font-mono text-xs space-y-3 leading-relaxed"
          onClick={() => inputRef.current?.focus()}
        >
          {terminalLogs.length === 0 ? (
            <div className="text-[#8b949e] space-y-1">
              <p>Type any Git command below or click a suggestion pill.</p>
              <p className="text-[11px] text-[#484f58]">
                Examples: `git status`, `git add src/App.jsx`, `git commit -m "feat: new feature"`, `git switch -c feature/new`
              </p>
            </div>
          ) : (
            terminalLogs.map((log, idx) => (
              <div key={idx} className="space-y-1">
                {/* Command Line Prompt */}
                <div className="flex items-center gap-2 text-[#8b949e]">
                  <span className="text-[#3fb950]">student@git-lab</span>
                  <span>:</span>
                  <span className="text-[#58a6ff]">~/{state.repositoryName}</span>
                  <span className="text-[#c9d1d9]">$ {log.command}</span>
                </div>

                {/* Output with Color Status */}
                {log.result.output && (
                  <pre
                    className={`whitespace-pre-wrap pl-3 border-l-2 py-0.5 ${
                      log.result.status === 'error'
                        ? 'text-[#f85149] border-[#da3633] bg-[#da3633]/5'
                        : log.result.status === 'conflict'
                        ? 'text-[#f85149] border-[#f85149] bg-[#da3633]/10'
                        : log.result.status === 'warning'
                        ? 'text-[#d29922] border-[#d29922] bg-[#d29922]/5'
                        : 'text-[#c9d1d9] border-[#30363d]'
                    }`}
                  >
                    {log.result.output}
                  </pre>
                )}

                {/* Plain-English Learning Explanation */}
                {log.result.explanation && (
                  <div className="flex items-start gap-1.5 text-[11px] text-[#58a6ff] pl-3 py-0.5">
                    <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>{log.result.explanation}</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Suggested Command Quick Pills */}
      {!isCollapsed && (
        <div className="px-3 py-1.5 bg-[#161b22]/70 border-t border-[#21262d] flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono no-scrollbar">
          <span className="text-[#8b949e] shrink-0 text-[10px] uppercase tracking-wider">Click to Run:</span>
          {quickSuggestions.slice(0, 10).map((cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={() => {
                onRunCommand(cmd);
              }}
              className="px-2 py-0.5 bg-[#21262d] hover:bg-[#1f6feb] text-[#c9d1d9] hover:text-white rounded border border-[#30363d] shrink-0 transition-colors cursor-pointer"
            >
              {cmd}
            </button>
          ))}
        </div>
      )}

      {/* Input Prompt Form */}
      <form onSubmit={handleSubmit} className="p-2.5 bg-[#0d1117] border-t border-[#30363d] flex items-center gap-2">
        <span className="text-[#3fb950] font-mono text-xs font-bold shrink-0">$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a git command (e.g. git status, git add src/App.jsx, git commit -m '...')..."
          className="flex-1 bg-transparent border-none text-xs font-mono text-[#f0f6fc] placeholder-[#484f58] focus:outline-none"
        />
        <button
          type="submit"
          className="px-2.5 py-1 bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-mono rounded flex items-center gap-1 transition-colors shrink-0"
        >
          <span>Run</span>
          <CornerDownLeft className="w-3 h-3" />
        </button>
      </form>
    </div>
  );
};
