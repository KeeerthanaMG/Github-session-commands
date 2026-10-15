import React, { useState } from 'react';
import {
  Laptop,
  Terminal,
  Globe,
  Layers,
  Sparkles,
  ExternalLink,
  Shield,
  Smartphone,
  CheckCircle2,
  Code2,
  Workflow,
  Download,
} from 'lucide-react';

interface ToolCategory {
  id: string;
  name: string;
}

const CATEGORIES: ToolCategory[] = [
  { id: 'all', name: 'All Tools' },
  { id: 'gui', name: 'Desktop & GUIs' },
  { id: 'cli', name: 'Command Line Tools' },
  { id: 'platforms', name: 'Cloud Platforms' },
  { id: 'extensions', name: 'Editor Extensions' },
  { id: 'automation', name: 'Hooks & Quality' },
];

interface ToolItem {
  name: string;
  category: 'gui' | 'cli' | 'platforms' | 'extensions' | 'automation';
  tagline: string;
  whatItDoes: string;
  whyStudentsLoveIt: string;
  whenToUseIt: string;
  officialLink?: string;
  keyCommandsOrFeatures: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const TOOLS_LIST: ToolItem[] = [
  {
    name: 'GitHub Desktop',
    category: 'gui',
    tagline: 'Visual Git client for Windows and macOS',
    whatItDoes:
      'A graphical desktop app that lets you stage files, view side-by-side code diffs, switch branches, create commits, and resolve merge conflicts using your mouse instead of typing terminal commands.',
    whyStudentsLoveIt:
      'Zero terminal anxiety. You can clearly see modified files with green and red highlighting before committing.',
    whenToUseIt:
      'Great for beginners, hackathon projects, reviewing large image/CSS changes, or resolving messy conflicts visually.',
    officialLink: 'https://desktop.github.com/',
    keyCommandsOrFeatures: [
      'Visual Side-by-Side Diff Inspector',
      'One-click Branch Switching & Pulling',
      'Interactive Merge Conflict Resolution',
      'Discard Unwanted Changes with 1 Click',
    ],
    difficulty: 'Beginner',
  },
  {
    name: 'GitHub CLI (`gh`)',
    category: 'cli',
    tagline: 'Run GitHub pull requests, issues, and checks right in your terminal',
    whatItDoes:
      'Brings GitHub features directly into your shell. You can create PRs, check test results, checkout team members’ PR branches, and view issues without ever opening your web browser.',
    whyStudentsLoveIt:
      'Saves huge amounts of context switching. Instead of leaving VS Code to open Chrome, you run one fast command.',
    whenToUseIt:
      'Creating pull requests instantly with `gh pr create`, checking CI status with `gh pr checks`, and cloning team repos.',
    officialLink: 'https://cli.github.com/',
    keyCommandsOrFeatures: [
      'gh pr create --fill (open a PR in 2 seconds)',
      'gh pr checkout <number> (test a classmate’s PR locally)',
      'gh pr checks (watch automated tests live)',
      'gh repo clone <owner/repo> (clone with auth handled)',
    ],
    difficulty: 'Intermediate',
  },
  {
    name: 'GitLab',
    category: 'platforms',
    tagline: 'All-in-one DevOps platform & open-source Git host',
    whatItDoes:
      'The leading alternative to GitHub. GitLab provides Git repository hosting plus a built-in CI/CD engine (GitLab CI) that many university research labs, defense labs, and companies host on their own private servers.',
    whyStudentsLoveIt:
      'Free private repositories with generous built-in CI/CD pipelines. Frequently used by university CS departments for automated assignment grading.',
    whenToUseIt:
      'When your college department or internship employer hosts their code on private, on-premise servers rather than public GitHub.',
    officialLink: 'https://about.gitlab.com/',
    keyCommandsOrFeatures: [
      '.gitlab-ci.yml for powerful auto-testing',
      'Self-hosted privacy on campus servers',
      'Integrated issue tracking & kanban boards',
      'Container Registry & Kubernetes integration',
    ],
    difficulty: 'Intermediate',
  },
  {
    name: 'Bitbucket',
    category: 'platforms',
    tagline: 'Git platform deeply connected to Jira and Confluence',
    whatItDoes:
      'Atlassian’s Git solution. It links your Git commits and pull requests directly to Jira task tickets and Confluence documentation pages.',
    whyStudentsLoveIt:
      'Students doing corporate internships will encounter Bitbucket whenever their company relies heavily on Jira for agile project management.',
    whenToUseIt:
      'Enterprise teams and startups running Jira sprints.',
    officialLink: 'https://bitbucket.org/',
    keyCommandsOrFeatures: [
      'Automatic linking of commits to Jira tickets (e.g. PROJ-102)',
      'Tighter permission controls for enterprise repos',
      'Bitbucket Pipelines CI/CD',
    ],
    difficulty: 'Intermediate',
  },
  {
    name: 'VS Code Built-in Git & Source Control',
    category: 'extensions',
    tagline: 'The Git power built right into your code editor',
    whatItDoes:
      'Visual Studio Code includes a native Git interface on the left sidebar (Source Control). It highlights modified files, shows colored lines in the gutter, and provides inline conflict resolution buttons.',
    whyStudentsLoveIt:
      'Already installed! No extra setup required. You can stage individual lines of code instead of entire files.',
    whenToUseIt:
      'Every day while coding in VS Code. Use the gutter colors (Green = new lines, Blue = modified, Red triangle = deleted).',
    officialLink: 'https://code.visualstudio.com/docs/sourcecontrol/overview',
    keyCommandsOrFeatures: [
      'Gutter Color Indicators for instant feedback',
      'Stage Selected Ranges (atomic commits made easy)',
      'Inline 3-Way Merge Editor with "Accept Current / Incoming"',
      'Commit message box with Ctrl+Enter shortcut',
    ],
    difficulty: 'Beginner',
  },
  {
    name: 'GitLens (VS Code Extension)',
    category: 'extensions',
    tagline: 'Supercharge Git inside VS Code with line-by-line blame',
    whatItDoes:
      'Displays subtle inline text next to your cursor showing who last edited that exact line of code, when they wrote it, and what commit message they used.',
    whyStudentsLoveIt:
      'Helps you quickly find out which teammate wrote a bug without having to run complicated terminal commands.',
    whenToUseIt:
      'When navigating a large team codebase or trying to understand why a specific function was written.',
    officialLink: 'https://www.gitkraken.com/gitlens',
    keyCommandsOrFeatures: [
      'Current Line Blame (who touched this line and why)',
      'Visual File History Heatmaps',
      'Revision Navigation Slider',
      'Compare branch diffs directly in the sidebar',
    ],
    difficulty: 'Beginner',
  },
  {
    name: 'Git Graph (VS Code Extension)',
    category: 'extensions',
    tagline: 'Interactive visual branch tree right in your editor',
    whatItDoes:
      'Draws an interactive, colorful railroad branch diagram inside VS Code showing all commits, merges, and tags across every local and remote branch.',
    whyStudentsLoveIt:
      'You can right-click any commit to cherry-pick, rebase, checkout, or create a tag without memorizing syntax.',
    whenToUseIt:
      'Whenever you want to visualize how your feature branch connects to your teammate’s branch before merging.',
    officialLink: 'https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph',
    keyCommandsOrFeatures: [
      'Colorful branch railway diagram',
      'Right-click to Checkout, Rebase, or Cherry-pick',
      'Inspect commit snapshots and file diffs on click',
    ],
    difficulty: 'Beginner',
  },
  {
    name: 'LazyGit',
    category: 'cli',
    tagline: 'Blazing fast Terminal UI (TUI) for keyboard lovers',
    whatItDoes:
      'A full-screen, terminal-based graphical interface for Git written in Go. You navigate files, branches, commits, and stashes using single keystrokes like spacebar to stage, "c" to commit, and "p" to push.',
    whyStudentsLoveIt:
      'Super cool terminal aesthetic. 10x faster than typing out long commands once you learn the keys.',
    whenToUseIt:
      'When working on remote Linux servers via SSH or for students who prefer staying inside the terminal.',
    officialLink: 'https://github.com/jesseduffield/lazygit',
    keyCommandsOrFeatures: [
      'Space to Stage / Unstage instantly',
      'Single keystroke interactive rebasing',
      'Instant stash shelving & inspection',
      'Full keyboard-driven workflow (no mouse needed)',
    ],
    difficulty: 'Intermediate',
  },
  {
    name: 'Husky & pre-commit Hooks',
    category: 'automation',
    tagline: 'Automate safety checks before code ever leaves your laptop',
    whatItDoes:
      'Runs automated scripts whenever you type `git commit` or `git push`. For example, it automatically runs Prettier to format your code, runs ESLint to catch syntax errors, and blocks commits if you accidentally included API keys.',
    whyStudentsLoveIt:
      'Guarantees your college group project code is always properly formatted and prevents embarrassing build failures in front of professors.',
    whenToUseIt:
      'In any multi-student project repository to enforce clean formatting and code quality automatically.',
    officialLink: 'https://typicode.github.io/husky/',
    keyCommandsOrFeatures: [
      'Pre-commit: Auto-format with Prettier & lint with ESLint',
      'Secret Scanner: Blocks commits containing .env passwords',
      'Commit-msg: Validates Conventional Commit message formats',
    ],
    difficulty: 'Intermediate',
  },
  {
    name: 'GitHub Mobile App',
    category: 'platforms',
    tagline: 'Manage repositories & approve PRs on iOS and Android',
    whatItDoes:
      'The official mobile app for GitHub. Lets you read code diffs, leave review comments, approve classmates’ pull requests, and triage project issues right from your smartphone.',
    whyStudentsLoveIt:
      'You can unblock your hackathon teammates and merge their PRs while walking across campus or riding the bus.',
    whenToUseIt:
      'During hackathons or team deadlines when you need to quickly review and merge code on the go.',
    officialLink: 'https://github.com/mobile',
    keyCommandsOrFeatures: [
      'Approve & merge Pull Requests from your phone',
      'Review code changes with syntax highlighting',
      'Reply to discussion threads and issue comments',
      'Receive instant mobile push notifications on PR reviews',
    ],
    difficulty: 'Beginner',
  },
];

export const GitToolsEcosystemView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredTools = TOOLS_LIST.filter((tool) => {
    const matchesCat = selectedCategory === 'all' || tool.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !query ||
      tool.name.toLowerCase().includes(query) ||
      tool.tagline.toLowerCase().includes(query) ||
      tool.whatItDoes.toLowerCase().includes(query);

    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0d1117] space-y-6">
      {/* Header */}
      <div className="p-4 bg-[#161b22] border border-[#30363d] rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Laptop className="w-5 h-5 text-[#58a6ff]" />
            <h2 className="text-base font-bold text-[#f0f6fc]">
              Git Tools &amp; Ecosystem Guide
            </h2>
          </div>
          <p className="text-xs text-[#8b949e] mt-1">
            Real developers don't rely only on bare terminal commands. Explore essential apps, editor extensions, and tools like <span className="text-[#f0f6fc]">GitHub Desktop</span>, <span className="text-[#58a6ff]">GitHub CLI</span>, <span className="text-[#a371f7]">GitLab</span>, and <span className="text-[#7ee787]">GitLens</span>.
          </p>
        </div>

        <span className="text-xs font-mono text-[#58a6ff] bg-[#1f6feb]/10 px-2.5 py-1 rounded border border-[#58a6ff]/30 shrink-0">
          {filteredTools.length} Tools
        </span>
      </div>

      {/* When to use Terminal vs GUI: College Student Cheat Sheet */}
      <div className="p-5 bg-[#161b22] border border-[#30363d] rounded-xl space-y-3">
        <h3 className="text-xs font-bold text-[#f0f6fc] uppercase tracking-wider font-mono">
          Quick Guide: Terminal vs. GUI — When should you use which?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-3 bg-[#0d1117] border border-[#30363d] rounded-lg space-y-2">
            <span className="text-[#3fb950] font-bold block flex items-center gap-1.5">
              <Terminal className="w-4 h-4" />
              Use the Terminal (CLI) when:
            </span>
            <ul className="list-disc list-inside space-y-1 text-[#8b949e] text-[11px]">
              <li>Running everyday fast commits: <code className="text-[#c9d1d9]">git commit -m "..."</code></li>
              <li>Switching branches and pulling updates: <code className="text-[#c9d1d9]">git switch feature</code></li>
              <li>Automating deployments, CI/CD scripts, or working on cloud servers</li>
              <li>Performing advanced rebasing and history operations</li>
            </ul>
          </div>

          <div className="p-3 bg-[#0d1117] border border-[#30363d] rounded-lg space-y-2">
            <span className="text-[#58a6ff] font-bold block flex items-center gap-1.5">
              <Laptop className="w-4 h-4" />
              Use a Visual Tool (GUI / VS Code) when:
            </span>
            <ul className="list-disc list-inside space-y-1 text-[#8b949e] text-[11px]">
              <li>Reviewing large multi-file diffs before submitting a pull request</li>
              <li>Resolving messy merge conflicts with side-by-side click buttons</li>
              <li>Staging only 2 specific lines inside a 200-line file</li>
              <li>Looking at complex branch railroad graphs (Git Graph)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter tools (e.g. desktop, vs code, gitlens, gitlab, hooks, mobile)..."
          className="w-full px-3 py-2 bg-[#161b22] border border-[#30363d] rounded-lg text-xs font-mono text-[#f0f6fc] placeholder-[#8b949e] focus:outline-none focus:border-[#58a6ff]"
        />

        <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-mono no-scrollbar">
          {CATEGORIES.map((cat) => (
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

      {/* Tools Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredTools.map((tool) => (
          <div
            key={tool.name}
            className="p-5 bg-[#161b22] border border-[#30363d] hover:border-[#8b949e] rounded-xl transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2 pb-2 border-b border-[#30363d]">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-[#f0f6fc]">{tool.name}</h3>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase border ${
                        tool.difficulty === 'Beginner'
                          ? 'bg-[#238636]/15 border-[#2ea043] text-[#3fb950]'
                          : 'bg-[#1f6feb]/15 border-[#58a6ff] text-[#58a6ff]'
                      }`}
                    >
                      {tool.difficulty}
                    </span>
                  </div>
                  <p className="text-xs text-[#58a6ff] font-mono mt-0.5">{tool.tagline}</p>
                </div>

                {tool.officialLink && (
                  <a
                    href={tool.officialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-[#8b949e] hover:text-white hover:bg-[#21262d] rounded transition-colors shrink-0"
                    title={`Open ${tool.name} official site`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>

              {/* What it does in simple terms */}
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono text-[#8b949e] font-bold block">
                  What it does:
                </span>
                <p className="text-xs text-[#c9d1d9] leading-relaxed">{tool.whatItDoes}</p>
              </div>

              {/* Why Students Love It */}
              <div className="p-2.5 bg-[#0d1117] border border-[#30363d] rounded-lg text-xs space-y-1">
                <span className="text-[10px] uppercase font-mono text-[#7ee787] font-bold block">
                  Why it matters for students:
                </span>
                <p className="text-[#8b949e] text-[11px] leading-relaxed">{tool.whyStudentsLoveIt}</p>
              </div>

              {/* Key Features / Commands */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] uppercase font-mono text-[#8b949e] font-bold block">
                  Highlights &amp; Top Features:
                </span>
                <div className="space-y-1">
                  {tool.keyCommandsOrFeatures.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-mono text-[#c9d1d9]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#3fb950] shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* When to use footer */}
            <div className="pt-3 border-t border-[#30363d] text-[11px] text-[#8b949e]">
              <strong className="text-[#f0f6fc]">When to reach for it:</strong> {tool.whenToUseIt}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
