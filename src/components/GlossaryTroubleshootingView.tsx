import React, { useState } from 'react';
import { GLOSSARY, GlossaryEntry } from '../data/glossary';
import { GITHUB_STATUS_COMPARISON, TROUBLESHOOTING_GUIDES, TroubleshootingNode } from '../data/troubleshooting';
import { BookMarked, Search, ExternalLink, AlertTriangle, ShieldCheck, HelpCircle, Terminal } from 'lucide-react';

interface GlossaryTroubleshootingViewProps {
  onExecuteCommand: (cmd: string) => void;
}

export const GlossaryTroubleshootingView: React.FC<GlossaryTroubleshootingViewProps> = ({
  onExecuteCommand,
}) => {
  const [activeTab, setActiveTab] = useState<'troubleshooting' | 'status-vs-status' | 'glossary'>('troubleshooting');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGlossary = GLOSSARY.filter(
    (g) =>
      g.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0d1117] space-y-6">
      {/* Header */}
      <div className="p-4 bg-[#161b22] border border-[#30363d] rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-[#58a6ff]" />
            <h2 className="text-base font-bold text-[#f0f6fc]">
              Glossary, Emergency Recovery &amp; Service Status
            </h2>
          </div>
          <p className="text-xs text-[#8b949e] mt-1">
            Decision trees for panic moments, definitions of Git terminology, and understanding cloud service uptime.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1.5 text-xs font-mono">
          <button
            onClick={() => setActiveTab('troubleshooting')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeTab === 'troubleshooting'
                ? 'bg-[#1f6feb] text-white'
                : 'bg-[#21262d] text-[#8b949e] hover:text-[#f0f6fc]'
            }`}
          >
            Emergency Decision Tree
          </button>
          <button
            onClick={() => setActiveTab('status-vs-status')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeTab === 'status-vs-status'
                ? 'bg-[#1f6feb] text-white'
                : 'bg-[#21262d] text-[#8b949e] hover:text-[#f0f6fc]'
            }`}
          >
            git status vs GitHub Status
          </button>
          <button
            onClick={() => setActiveTab('glossary')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeTab === 'glossary'
                ? 'bg-[#1f6feb] text-white'
                : 'bg-[#21262d] text-[#8b949e] hover:text-[#f0f6fc]'
            }`}
          >
            Glossary Dictionary
          </button>
        </div>
      </div>

      {/* Tab 1: Emergency Decision Tree */}
      {activeTab === 'troubleshooting' && (
        <div className="space-y-4">
          <div className="p-4 bg-[#161b22] border border-[#30363d] rounded-xl">
            <h3 className="text-sm font-bold text-[#f0f6fc] mb-1">
              "Oh No, I Messed Up Git!" — Emergency Recovery Playbook
            </h3>
            <p className="text-xs text-[#8b949e]">
              99% of Git mistakes can be undone without losing your work. Locate your current symptom below:
            </p>
          </div>

          <div className="space-y-4">
            {TROUBLESHOOTING_GUIDES.map((guide) => (
              <div
                key={guide.id}
                className="p-5 bg-[#161b22] border border-[#30363d] rounded-xl space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#30363d]">
                  <span className="text-xs font-bold font-mono text-[#f85149] flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    {guide.scenario}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold border ${
                      guide.riskRating === 'high'
                        ? 'bg-[#da3633]/20 border-[#f85149] text-[#f85149]'
                        : guide.riskRating === 'medium'
                        ? 'bg-[#d29922]/20 border-[#d29922] text-[#d29922]'
                        : 'bg-[#238636]/20 border-[#2ea043] text-[#3fb950]'
                    }`}
                  >
                    Risk: {guide.riskRating}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-2.5 bg-[#0d1117] border border-[#30363d] rounded">
                    <span className="text-[10px] text-[#8b949e] uppercase block mb-1">Symptom:</span>
                    <span className="text-[#c9d1d9] text-[11px]">{guide.symptom}</span>
                  </div>
                  <div className="p-2.5 bg-[#0d1117] border border-[#30363d] rounded">
                    <span className="text-[10px] text-[#8b949e] uppercase block mb-1">Root Cause:</span>
                    <span className="text-[#c9d1d9] text-[11px]">{guide.rootCause}</span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-1">
                  <span className="text-xs font-bold text-[#3fb950] font-mono block">
                    Recommended Fix:
                  </span>
                  <div className="p-3 bg-[#0d1117] border border-[#2ea043]/40 rounded-lg space-y-1 font-mono text-xs text-[#c9d1d9]">
                    {guide.recommendedSteps.map((step, idx) => (
                      <div key={idx} className="leading-relaxed">
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: git status vs GitHub Status */}
      {activeTab === 'status-vs-status' && (
        <div className="p-6 bg-[#161b22] border border-[#30363d] rounded-xl space-y-6">
          <div className="space-y-2">
            <h3 className="text-base font-bold text-[#f0f6fc]">
              {GITHUB_STATUS_COMPARISON.title}
            </h3>
            <p className="text-xs text-[#8b949e] leading-relaxed">
              {GITHUB_STATUS_COMPARISON.takeaway}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Local git status */}
            <div className="p-5 bg-[#0d1117] border border-[#30363d] rounded-xl space-y-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#3fb950]" />
                <h4 className="text-sm font-bold text-[#f0f6fc]">
                  {GITHUB_STATUS_COMPARISON.localGitStatus.name}
                </h4>
              </div>
              <p className="text-xs text-[#8b949e]">
                Scope: <strong className="text-[#c9d1d9]">{GITHUB_STATUS_COMPARISON.localGitStatus.scope}</strong>
              </p>
              <p className="text-xs text-[#c9d1d9]">
                {GITHUB_STATUS_COMPARISON.localGitStatus.purpose}
              </p>
              <pre className="p-3 bg-[#161b22] border border-[#30363d] rounded text-xs font-mono text-[#7ee787]">
                {GITHUB_STATUS_COMPARISON.localGitStatus.exampleOutput}
              </pre>
            </div>

            {/* Cloud GitHub Status */}
            <div className="p-5 bg-[#0d1117] border border-[#30363d] rounded-xl space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-[#58a6ff]" />
                  <h4 className="text-sm font-bold text-[#f0f6fc]">
                    {GITHUB_STATUS_COMPARISON.cloudGitHubStatus.name}
                  </h4>
                </div>
                <p className="text-xs text-[#8b949e]">
                  Scope: <strong className="text-[#c9d1d9]">{GITHUB_STATUS_COMPARISON.cloudGitHubStatus.scope}</strong>
                </p>
                <p className="text-xs text-[#c9d1d9]">
                  {GITHUB_STATUS_COMPARISON.cloudGitHubStatus.purpose}
                </p>
              </div>

              <div className="pt-4 border-t border-[#30363d]">
                <a
                  href={GITHUB_STATUS_COMPARISON.cloudGitHubStatus.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 bg-[#1f6feb] hover:bg-[#388bfd] text-white text-xs font-mono font-medium rounded-lg flex items-center justify-center gap-2 transition-colors shadow"
                >
                  <span>Open Official githubstatus.com</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Glossary Dictionary */}
      {activeTab === 'glossary' && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-[#8b949e] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Git terminology (e.g. DAG, HEAD, cherry-pick, blob, stash)..."
              className="w-full pl-9 pr-4 py-2 bg-[#161b22] border border-[#30363d] rounded-lg text-xs font-mono text-[#f0f6fc] placeholder-[#8b949e] focus:outline-none focus:border-[#58a6ff]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGlossary.map((entry) => (
              <div
                key={entry.term}
                className="p-4 bg-[#161b22] border border-[#30363d] rounded-xl space-y-2 text-xs"
              >
                <div className="flex items-center justify-between pb-1 border-b border-[#30363d]">
                  <span className="font-bold text-[#f0f6fc] font-mono text-sm">{entry.term}</span>
                  <span className="text-[10px] text-[#58a6ff] font-mono">{entry.category}</span>
                </div>
                <p className="text-[#c9d1d9] font-medium leading-relaxed">{entry.definition}</p>
                <p className="text-[#8b949e] text-[11px] leading-relaxed">{entry.detail}</p>
                {entry.relatedCommand && (
                  <button
                    onClick={() => onExecuteCommand(entry.relatedCommand!)}
                    className="text-[11px] font-mono text-[#7ee787] hover:underline block pt-1"
                  >
                    Command: {entry.relatedCommand}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
