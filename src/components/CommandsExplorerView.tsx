import React, { useState } from 'react';
import { COMMANDS_CATALOGUE, COMMAND_CATEGORIES, CommandCatalogueItem } from '../data/commandsCatalogue';
import { Search, Play, AlertTriangle, ShieldCheck, ShieldAlert, Terminal, Info, ArrowRight } from 'lucide-react';

interface CommandsExplorerViewProps {
  onExecuteCommand: (cmd: string) => void;
  externalSearch?: string;
}

export const CommandsExplorerView: React.FC<CommandsExplorerViewProps> = ({
  onExecuteCommand,
  externalSearch = '',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filterQuery, setFilterQuery] = useState<string>('');

  const activeQuery = (externalSearch || filterQuery).toLowerCase();

  const filteredCommands = COMMANDS_CATALOGUE.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      !activeQuery ||
      item.command.toLowerCase().includes(activeQuery) ||
      item.syntax.toLowerCase().includes(activeQuery) ||
      item.description.toLowerCase().includes(activeQuery) ||
      item.categoryName.toLowerCase().includes(activeQuery);

    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0d1117] space-y-6">
      {/* Title */}
      <div className="p-4 bg-[#161b22] border border-[#30363d] rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-[#58a6ff]" />
            <h2 className="text-base font-bold text-[#f0f6fc]">
              Comprehensive Git Command Explorer
            </h2>
          </div>
          <p className="text-xs text-[#8b949e] mt-1">
            Searchable catalogue across 10 categories (A through J). Every command includes syntax, mechanics, prerequisites, safety levels, and runnable examples.
          </p>
        </div>

        <span className="text-xs font-mono text-[#58a6ff] bg-[#1f6feb]/10 px-2.5 py-1 rounded border border-[#58a6ff]/30 shrink-0">
          {filteredCommands.length} of {COMMANDS_CATALOGUE.length} commands
        </span>
      </div>

      {/* Filter and Category Pills */}
      <div className="space-y-3">
        {/* Search input if not using global */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#8b949e] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Filter commands by keyword (e.g. cherry-pick, reset, rebase, branch, amend)..."
            className="w-full pl-9 pr-4 py-2 bg-[#161b22] border border-[#30363d] rounded-lg text-xs font-mono text-[#f0f6fc] placeholder-[#8b949e] focus:outline-none focus:border-[#58a6ff]"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-mono no-scrollbar">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded-md shrink-0 transition-colors border ${
              selectedCategory === 'all'
                ? 'bg-[#1f6feb] text-white border-[#58a6ff]'
                : 'bg-[#161b22] text-[#8b949e] hover:text-[#f0f6fc] border-[#30363d]'
            }`}
          >
            All Categories
          </button>
          {COMMAND_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-md shrink-0 transition-colors border ${
                selectedCategory === cat.id
                  ? 'bg-[#1f6feb] text-white border-[#58a6ff]'
                  : 'bg-[#161b22] text-[#8b949e] hover:text-[#f0f6fc] border-[#30363d]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Command Cards Grid */}
      <div className="space-y-4">
        {filteredCommands.map((item) => (
          <div
            key={item.id}
            className="p-5 bg-[#161b22] border border-[#30363d] hover:border-[#8b949e] rounded-xl transition-all space-y-4"
          >
            {/* Command Header */}
            <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-[#30363d]">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[#f0f6fc] font-mono">{item.command}</h3>
                  {/* Safety Rating Badge */}
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border flex items-center gap-1 ${
                      item.safetyLevel === 'safe'
                        ? 'bg-[#238636]/15 border-[#2ea043] text-[#3fb950]'
                        : item.safetyLevel === 'caution'
                        ? 'bg-[#d29922]/15 border-[#d29922] text-[#d29922]'
                        : 'bg-[#da3633]/15 border-[#f85149] text-[#f85149]'
                    }`}
                  >
                    {item.safetyLevel === 'safe' ? (
                      <ShieldCheck className="w-3 h-3" />
                    ) : item.safetyLevel === 'caution' ? (
                      <AlertTriangle className="w-3 h-3" />
                    ) : (
                      <ShieldAlert className="w-3 h-3" />
                    )}
                    {item.safetyLevel}
                  </span>

                  {/* Simulation Status Badge */}
                  <span className="text-[10px] font-mono text-[#8b949e] bg-[#21262d] px-1.5 py-0.5 rounded">
                    {item.simulationStatus.replace('_', ' ')}
                  </span>
                </div>
                <code className="text-xs text-[#58a6ff] font-mono mt-1 block">{item.syntax}</code>
              </div>

              {/* Run in Terminal CTA Button */}
              {item.quickActionCmd && (
                <button
                  onClick={() => onExecuteCommand(item.quickActionCmd!)}
                  className="px-3 py-1.5 bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-mono font-medium rounded flex items-center gap-1.5 transition-colors shadow shrink-0"
                >
                  <Play className="w-3 h-3" />
                  <span>Run: {item.quickActionCmd}</span>
                </button>
              )}
            </div>

            {/* Plain English Explanation */}
            <p className="text-xs text-[#c9d1d9] leading-relaxed">{item.description}</p>

            {/* Mechanics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 bg-[#0d1117] border border-[#30363d] rounded space-y-1">
                <span className="text-[10px] uppercase text-[#8b949e] font-sans font-bold block">
                  Prerequisites:
                </span>
                <span className="text-[#c9d1d9] text-[11px] block">{item.prerequisites}</span>
              </div>

              <div className="p-3 bg-[#0d1117] border border-[#30363d] rounded space-y-1">
                <span className="text-[10px] uppercase text-[#8b949e] font-sans font-bold block">
                  Files / Commits Affected:
                </span>
                <span className="text-[#c9d1d9] text-[11px] block">{item.filesAndCommitsAffected}</span>
              </div>
            </div>

            {/* Before vs After States */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-2.5 bg-[#0d1117] border border-[#30363d] rounded">
                <span className="text-[#d29922] text-[10px] uppercase block mb-1">State Before:</span>
                <span className="text-[11px] text-[#8b949e]">{item.beforeState}</span>
              </div>
              <div className="p-2.5 bg-[#0d1117] border border-[#30363d] rounded">
                <span className="text-[#3fb950] text-[10px] uppercase block mb-1">State After:</span>
                <span className="text-[11px] text-[#8b949e]">{item.afterState}</span>
              </div>
            </div>

            {/* Common Mistakes Warning */}
            <div className="p-3 bg-[#da3633]/5 border border-[#da3633]/30 rounded text-xs space-y-1">
              <span className="text-[#f85149] font-bold text-[11px] flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                Common Engineering Mistake:
              </span>
              <p className="text-[#8b949e] text-[11px] leading-relaxed">{item.commonMistake}</p>
            </div>

            {/* Related commands */}
            {item.relatedCommands.length > 0 && (
              <div className="flex items-center gap-2 text-xs text-[#8b949e] font-mono pt-1">
                <span className="text-[11px]">Related:</span>
                {item.relatedCommands.map((rel) => (
                  <button
                    key={rel}
                    onClick={() => onExecuteCommand(rel)}
                    className="hover:text-[#58a6ff] hover:underline"
                  >
                    {rel}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
