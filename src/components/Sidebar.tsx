import React from 'react';
import {
  Compass,
  Layers,
  Terminal,
  GitBranch,
  GitMerge,
  AlertOctagon,
  Archive,
  Users2,
  GitPullRequest,
  Laptop,
  CheckCheck,
  Trophy,
  BookMarked,
  ChevronRight,
  PanelLeftClose,
} from 'lucide-react';
import { ActiveTab } from '../types/git';

interface SidebarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  hasActiveConflict: boolean;
  isDesktopCollapsed?: boolean;
  onToggleDesktopCollapse?: () => void;
}

interface NavItem {
  id: ActiveTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeType?: 'warning' | 'accent' | 'success';
}

const NAV_ITEMS: NavItem[] = [
  { id: 'start', label: '1. Start Here', icon: Compass },
  { id: 'fundamentals', label: '2. Git Fundamentals (4 Areas)', icon: Layers },
  { id: 'commands', label: '3. Commands Explorer', icon: Terminal, badge: 'A-J' },
  { id: 'graph', label: '4. Branches & Commit Graph', icon: GitBranch },
  { id: 'merge-rebase', label: '5. Merge vs Rebase Lab', icon: GitMerge },
  { id: 'conflicts', label: '6. Merge Conflict Lab', icon: AlertOctagon, badge: '3-Way' },
  { id: 'stash-recovery', label: '7. Stash & Recovery (Reflog)', icon: Archive },
  { id: 'collaboration', label: '8. Team Collaboration Lab', icon: Users2, badge: 'Story' },
  { id: 'github-pr', label: '9. GitHub PRs & CLI', icon: GitPullRequest },
  { id: 'tools', label: '10. Git Tools (Desktop, CLI, GitLab, VS Code)', icon: Laptop, badge: 'Guide' },
  { id: 'best-practices', label: '11. Best Practices (Good vs Bad)', icon: CheckCheck },
  { id: 'challenges', label: '12. Interactive Missions', icon: Trophy, badge: 'Simulator', badgeType: 'success' },
  { id: 'glossary', label: '13. Glossary & Troubleshooting', icon: BookMarked },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isOpenMobile,
  onCloseMobile,
  hasActiveConflict,
  isDesktopCollapsed = false,
  onToggleDesktopCollapse,
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-xs"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static top-14 bottom-0 left-0 z-40 bg-[#0d1117] border-r border-[#30363d] flex flex-col shrink-0 transition-all duration-200 ease-in-out ${
          isOpenMobile
            ? 'translate-x-0 w-72'
            : '-translate-x-full lg:translate-x-0'
        } ${
          isDesktopCollapsed
            ? 'lg:w-0 lg:overflow-hidden lg:border-r-0 lg:opacity-0 pointer-events-none lg:pointer-events-none'
            : 'lg:w-72 lg:opacity-100'
        }`}
      >
        {/* Navigation Section Title */}
        <div className="px-4 py-3 border-b border-[#21262d] flex items-center justify-between">
          <span className="text-[11px] font-semibold text-[#8b949e] uppercase tracking-wider font-mono">
            Learning Library
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#58a6ff] font-mono">v1.2</span>
            {onToggleDesktopCollapse && (
              <button
                onClick={onToggleDesktopCollapse}
                className="hidden lg:flex p-1 text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d] rounded transition-colors cursor-pointer"
                title="Collapse sidebar for full-screen presentation"
                aria-label="Collapse sidebar"
              >
                <PanelLeftClose className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Nav Item List */}
        <nav className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const isConflictTab = item.id === 'conflicts' && hasActiveConflict;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-colors group text-left ${
                  isActive
                    ? 'bg-[#161b22] text-[#58a6ff] border border-[#30363d]'
                    : isConflictTab
                    ? 'bg-[#da3633]/15 text-[#f85149] border border-[#f85149]/40'
                    : 'text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#161b22]'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive
                        ? 'text-[#58a6ff]'
                        : isConflictTab
                        ? 'text-[#f85149]'
                        : 'text-[#8b949e] group-hover:text-[#c9d1d9]'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  {isConflictTab && (
                    <span className="text-[10px] font-mono text-[#f85149] animate-pulse">
                      CONFLICT!
                    </span>
                  )}
                  {item.badge && !isConflictTab && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${
                        item.badgeType === 'success'
                          ? 'bg-[#238636]/20 border-[#2ea043] text-[#3fb950]'
                          : 'bg-[#21262d] border-[#30363d] text-[#8b949e]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight
                    className={`w-3.5 h-3.5 text-[#8b949e] opacity-0 group-hover:opacity-100 transition-opacity ${
                      isActive ? 'opacity-100 text-[#58a6ff]' : ''
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </nav>

        {/* Footer info in sidebar */}
        <div className="p-3 border-t border-[#21262d] bg-[#161b22]/50 text-[11px] text-[#8b949e]">
          <div className="flex items-center justify-between font-mono">
            <span>Terminal status:</span>
            <span className="text-[#7ee787]">Ready</span>
          </div>
        </div>
      </aside>
    </>
  );
};
