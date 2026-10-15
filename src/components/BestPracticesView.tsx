import React, { useState } from 'react';
import { GOOD_VS_BAD_PRS, CONVENTIONAL_COMMITS, COMMIT_METADATA_GUIDE } from '../data/bestPractices';
import { CheckCircle2, XCircle, ShieldCheck, AlertTriangle, GitCommit, FileCode, Clock } from 'lucide-react';

export const BestPracticesView: React.FC = () => {
  const [activePrView, setActivePrView] = useState<'compare' | 'conventional' | 'dates' | 'gitignore'>('compare');

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0d1117] space-y-6">
      {/* Header */}
      <div className="p-4 bg-[#161b22] border border-[#30363d] rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#3fb950]" />
            <h2 className="text-base font-bold text-[#f0f6fc]">
              Engineering Best Practices Handbook
            </h2>
          </div>
          <p className="text-xs text-[#8b949e] mt-1">
            Proven engineering habits for college projects, hackathons, and professional software teams.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-mono">
          <button
            onClick={() => setActivePrView('compare')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activePrView === 'compare'
                ? 'bg-[#1f6feb] text-white'
                : 'bg-[#21262d] text-[#8b949e] hover:text-[#f0f6fc]'
            }`}
          >
            Bad vs Good PR
          </button>
          <button
            onClick={() => setActivePrView('conventional')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activePrView === 'conventional'
                ? 'bg-[#1f6feb] text-white'
                : 'bg-[#21262d] text-[#8b949e] hover:text-[#f0f6fc]'
            }`}
          >
            Commit Standards
          </button>
          <button
            onClick={() => setActivePrView('dates')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activePrView === 'dates'
                ? 'bg-[#1f6feb] text-white'
                : 'bg-[#21262d] text-[#8b949e] hover:text-[#f0f6fc]'
            }`}
          >
            Author vs Committer Date
          </button>
          <button
            onClick={() => setActivePrView('gitignore')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activePrView === 'gitignore'
                ? 'bg-[#1f6feb] text-white'
                : 'bg-[#21262d] text-[#8b949e] hover:text-[#f0f6fc]'
            }`}
          >
            .gitignore &amp; Secrets
          </button>
        </div>
      </div>

      {/* Tab 1: Bad PR vs Good PR Side-by-Side */}
      {activePrView === 'compare' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* The Bad PR */}
            <div className="p-6 bg-[#161b22] border border-[#da3633]/60 rounded-xl space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-[#da3633]/20 border border-[#f85149] text-[#f85149] font-mono text-xs font-bold flex items-center gap-1.5">
                    <XCircle className="w-3.5 h-3.5" />
                    ANTI-PATTERN: The Monster PR
                  </span>
                  <span className="text-xs font-mono text-[#f85149]">
                    +{GOOD_VS_BAD_PRS.bad.stats.additions} / -{GOOD_VS_BAD_PRS.bad.stats.deletions}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#f0f6fc] font-mono">
                  {GOOD_VS_BAD_PRS.bad.title}
                </h3>
                <p className="text-xs text-[#8b949e] italic font-mono bg-[#0d1117] p-2.5 rounded border border-[#30363d]">
                  "{GOOD_VS_BAD_PRS.bad.description}"
                </p>

                {/* Code snippet showing flaws */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono text-[#8b949e] block">Code Snippet:</span>
                  <pre className="p-3 bg-[#0d1117] border border-[#da3633]/40 rounded-lg text-xs font-mono text-[#f85149] overflow-x-auto whitespace-pre">
                    {GOOD_VS_BAD_PRS.bad.codeSnippet}
                  </pre>
                </div>

                {/* Checklist */}
                <div className="space-y-2 pt-2">
                  {GOOD_VS_BAD_PRS.bad.checklist.map((c, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs">
                      <XCircle className="w-4 h-4 text-[#f85149] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-[#f0f6fc]">{c.item}: </span>
                        <span className="text-[#8b949e]">{c.note}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* The Good PR */}
            <div className="p-6 bg-[#161b22] border border-[#2ea043]/60 rounded-xl space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-[#238636]/20 border border-[#2ea043] text-[#3fb950] font-mono text-xs font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    BEST PRACTICE: The Focused PR
                  </span>
                  <span className="text-xs font-mono text-[#3fb950]">
                    +{GOOD_VS_BAD_PRS.good.stats.additions} / -{GOOD_VS_BAD_PRS.good.stats.deletions}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#f0f6fc] font-mono">
                  {GOOD_VS_BAD_PRS.good.title}
                </h3>
                <pre className="text-xs text-[#c9d1d9] font-mono bg-[#0d1117] p-2.5 rounded border border-[#30363d] overflow-x-auto whitespace-pre-wrap">
                  {GOOD_VS_BAD_PRS.good.description}
                </pre>

                {/* Code snippet showing clean code */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono text-[#8b949e] block">Code Snippet:</span>
                  <pre className="p-3 bg-[#0d1117] border border-[#2ea043]/40 rounded-lg text-xs font-mono text-[#3fb950] overflow-x-auto whitespace-pre">
                    {GOOD_VS_BAD_PRS.good.codeSnippet}
                  </pre>
                </div>

                {/* Checklist */}
                <div className="space-y-2 pt-2">
                  {GOOD_VS_BAD_PRS.good.checklist.map((c, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs">
                      <CheckCircle2 className="w-4 h-4 text-[#3fb950] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-[#f0f6fc]">{c.item}: </span>
                        <span className="text-[#8b949e]">{c.note}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Conventional Commits */}
      {activePrView === 'conventional' && (
        <div className="p-6 bg-[#161b22] border border-[#30363d] rounded-xl space-y-4">
          <div className="flex items-center gap-2">
            <GitCommit className="w-5 h-5 text-[#58a6ff]" />
            <h3 className="text-base font-bold text-[#f0f6fc]">
              Conventional Commits Specification
            </h3>
          </div>

          <p className="text-xs text-[#8b949e] leading-relaxed">
            Format: <code className="text-[#f0f6fc] bg-[#0d1117] px-2 py-0.5 rounded">&lt;type&gt;[optional scope]: &lt;description&gt;</code>. Standardizing commit messages allows automated changelog generators, semantic versioning, and makes git log readable for peer reviewers.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs pt-2">
            {CONVENTIONAL_COMMITS.map((item) => (
              <div key={item.prefix} className="p-3 bg-[#0d1117] border border-[#30363d] rounded-lg space-y-1">
                <span className="text-[#58a6ff] font-bold block">{item.prefix}</span>
                <p className="text-[#c9d1d9] text-[11px]">{item.description}</p>
                <code className="text-[10px] text-[#7ee787] block truncate">
                  Ex: {item.example}
                </code>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Author vs Committer Date */}
      {activePrView === 'dates' && (
        <div className="p-6 bg-[#161b22] border border-[#30363d] rounded-xl space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#d29922]" />
            <h3 className="text-base font-bold text-[#f0f6fc]">
              {COMMIT_METADATA_GUIDE.title}
            </h3>
          </div>

          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg text-xs leading-relaxed text-[#c9d1d9] whitespace-pre-wrap font-mono">
            {COMMIT_METADATA_GUIDE.explanation}
          </div>
        </div>
      )}

      {/* Tab 4: .gitignore and Secrets */}
      {activePrView === 'gitignore' && (
        <div className="p-6 bg-[#161b22] border border-[#30363d] rounded-xl space-y-4">
          <div className="flex items-center gap-2">
            <FileCode className="w-5 h-5 text-[#f85149]" />
            <h3 className="text-base font-bold text-[#f0f6fc]">
              .gitignore Best Practices &amp; Secret Leaks
            </h3>
          </div>

          <p className="text-xs text-[#8b949e] leading-relaxed">
            Never commit dependencies (<code className="text-[#f0f6fc]">node_modules</code>), generated build folders (<code className="text-[#f0f6fc]">dist/</code>, <code className="text-[#f0f6fc]">build/</code>), or private API credentials (<code className="text-[#f85149]">.env</code>).
          </p>

          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg font-mono text-xs text-[#7ee787] space-y-1">
            <div className="text-[#8b949e]"># Recommended .gitignore template:</div>
            <div>node_modules/</div>
            <div>.env</div>
            <div>.env.local</div>
            <div>*.log</div>
            <div>dist/</div>
            <div>build/</div>
            <div>.DS_Store</div>
          </div>
        </div>
      )}
    </div>
  );
};
