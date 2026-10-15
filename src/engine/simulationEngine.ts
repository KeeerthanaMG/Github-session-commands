import {
  SimulationState,
  CommandResult,
  GitCommit,
  GitBranch,
  GitFile,
  GitStash,
  GitReflogEntry,
  Contributor,
  PullRequest,
  CommandEffect,
} from '../types/git';

function generateSha(seed: string = ''): string {
  const chars = '0123456789abcdef';
  let result = '';
  for (let i = 0; i < 7; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

export function getInitialSimulationState(): SimulationState {
  const commit1: GitCommit = {
    id: 'a1f89c0',
    fullSha: 'a1f89c0e29b4317924089c1df9d618d2b9415701',
    message: 'Initial commit: add project scaffold and README',
    author: 'Keerthana M G',
    email: 'keerthanamg19@gmail.com',
    timestamp: '2 days ago',
    authorDate: '2026-10-12 10:14:00 +0530',
    committerDate: '2026-10-12 10:14:00 +0530',
    parentIds: [],
    snapshot: {
      'README.md': '# TechFest 2026 Portal\n\nOfficial website for the annual college technical symposium.',
      'package.json': '{\n  "name": "techfest-2026",\n  "version": "0.1.0",\n  "private": true\n}',
      'src/App.jsx': 'export default function App() {\n  return <div>Welcome to TechFest 2026</div>;\n}',
    },
  };

  const commit2: GitCommit = {
    id: 'b47e2d9',
    fullSha: 'b47e2d93701a5b4819d77e1df280918c54179321',
    message: 'feat: add Navigation bar with symposium links',
    author: 'Keerthana M G',
    email: 'keerthanamg19@gmail.com',
    timestamp: '1 day ago',
    authorDate: '2026-10-13 14:30:15 +0530',
    committerDate: '2026-10-13 14:30:15 +0530',
    parentIds: ['a1f89c0'],
    snapshot: {
      'README.md': '# TechFest 2026 Portal\n\nOfficial website for the annual college technical symposium.',
      'package.json': '{\n  "name": "techfest-2026",\n  "version": "0.1.0",\n  "private": true\n}',
      'src/App.jsx': 'import Navbar from "./components/Navbar";\n\nexport default function App() {\n  return (\n    <main className="min-h-screen bg-slate-900">\n      <Navbar />\n      <div className="p-8 text-white">TechFest 2026</div>\n    </main>\n  );\n}',
      'src/components/Navbar.jsx': 'export default function Navbar() {\n  return (\n    <nav className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950 text-white">\n      <span className="font-bold text-lg">TechFest 2026</span>\n      <div className="flex gap-4 text-sm text-slate-300">\n        <a href="#events">Events</a>\n        <a href="#schedule">Schedule</a>\n        <a href="#register">Register</a>\n      </div>\n    </nav>\n  );\n}',
    },
  };

  const commit3: GitCommit = {
    id: 'c83d105',
    fullSha: 'c83d105a18bc009381741295b71940a827593812',
    message: 'feat: hero banner section with countdown',
    author: 'Karthikeyan',
    email: 'karthikeyan@techfest.org',
    timestamp: '18 hours ago',
    authorDate: '2026-10-13 21:05:00 +0530',
    committerDate: '2026-10-13 21:05:00 +0530',
    parentIds: ['b47e2d9'],
    snapshot: {
      ...commit2.snapshot,
      'src/components/Hero.jsx': 'export default function Hero() {\n  return (\n    <section className="text-center py-20 bg-gradient-to-b from-slate-950 to-slate-900">\n      <h1 className="text-5xl font-bold tracking-tight text-white mb-4">Innovate. Build. Inspire.</h1>\n      <p className="text-lg text-slate-400 max-w-xl mx-auto mb-8">Join 1,500+ student developers across 48 hours of intense coding and workshops.</p>\n      <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium">Register for Hackathon</button>\n    </section>\n  );\n}',
    },
  };

  const commitFeature: GitCommit = {
    id: 'd92a471',
    fullSha: 'd92a471b09281749cbb105829104821a73018e47',
    message: 'feat(events): add EventCard and prize pool component',
    author: 'Rohan (Teammate 3)',
    email: 'rohan@techfest.org',
    timestamp: '10 hours ago',
    authorDate: '2026-10-14 06:12:00 +0530',
    committerDate: '2026-10-14 06:12:00 +0530',
    parentIds: ['b47e2d9'],
    snapshot: {
      ...commit2.snapshot,
      'src/components/EventCard.jsx': 'export default function EventCard({ title, category, prize }) {\n  return (\n    <div className="p-6 border border-slate-800 rounded-lg bg-slate-900/60 text-white">\n      <span className="text-xs uppercase tracking-wide text-blue-400">{category}</span>\n      <h3 className="text-xl font-bold mt-2">{title}</h3>\n      <p className="text-sm text-slate-400 mt-2">Cash Prize: {prize}</p>\n    </div>\n  );\n}',
    },
  };

  const initialFiles: Record<string, GitFile> = {
    'README.md': {
      path: 'README.md',
      content: '# TechFest 2026 Portal\n\nOfficial website for the annual college technical symposium.',
      committedContent: '# TechFest 2026 Portal\n\nOfficial website for the annual college technical symposium.',
      status: 'committed',
    },
    'package.json': {
      path: 'package.json',
      content: '{\n  "name": "techfest-2026",\n  "version": "0.1.0",\n  "private": true\n}',
      committedContent: '{\n  "name": "techfest-2026",\n  "version": "0.1.0",\n  "private": true\n}',
      status: 'committed',
    },
    'src/App.jsx': {
      path: 'src/App.jsx',
      content: 'import Navbar from "./components/Navbar";\nimport Hero from "./components/Hero";\n\nexport default function App() {\n  return (\n    <main className="min-h-screen bg-slate-900">\n      <Navbar />\n      <Hero />\n      <div className="p-8 text-white">TechFest 2026</div>\n    </main>\n  );\n}',
      committedContent: 'import Navbar from "./components/Navbar";\n\nexport default function App() {\n  return (\n    <main className="min-h-screen bg-slate-900">\n      <Navbar />\n      <div className="p-8 text-white">TechFest 2026</div>\n    </main>\n  );\n}',
      status: 'modified',
      diff: '- <div className="p-8 text-white">TechFest 2026</div>\n+ <Hero />\n+ <div className="p-8 text-white">TechFest 2026</div>',
    },
    'src/components/Navbar.jsx': {
      path: 'src/components/Navbar.jsx',
      content: 'export default function Navbar() {\n  return (\n    <nav className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950 text-white">\n      <span className="font-bold text-lg">TechFest 2026</span>\n      <div className="flex gap-4 text-sm text-slate-300">\n        <a href="#events">Events</a>\n        <a href="#schedule">Schedule</a>\n        <a href="#register">Register</a>\n      </div>\n    </nav>\n  );\n}',
      committedContent: 'export default function Navbar() {\n  return (\n    <nav className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950 text-white">\n      <span className="font-bold text-lg">TechFest 2026</span>\n      <div className="flex gap-4 text-sm text-slate-300">\n        <a href="#events">Events</a>\n        <a href="#schedule">Schedule</a>\n        <a href="#register">Register</a>\n      </div>\n    </nav>\n  );\n}',
      status: 'committed',
    },
    'src/components/Hero.jsx': {
      path: 'src/components/Hero.jsx',
      content: 'export default function Hero() {\n  return (\n    <section className="text-center py-20 bg-gradient-to-b from-slate-950 to-slate-900">\n      <h1 className="text-5xl font-bold tracking-tight text-white mb-4">Innovate. Build. Inspire.</h1>\n      <p className="text-lg text-slate-400 max-w-xl mx-auto mb-8">Join 1,500+ student developers across 48 hours of intense coding and workshops.</p>\n      <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium">Register for Hackathon</button>\n    </section>\n  );\n}',
      committedContent: 'export default function Hero() {\n  return (\n    <section className="text-center py-20 bg-gradient-to-b from-slate-950 to-slate-900">\n      <h1 className="text-5xl font-bold tracking-tight text-white mb-4">Innovate. Build. Inspire.</h1>\n      <p className="text-lg text-slate-400 max-w-xl mx-auto mb-8">Join 1,500+ student developers across 48 hours of intense coding and workshops.</p>\n      <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium">Register for Hackathon</button>\n    </section>\n  );\n}',
      status: 'committed',
    },
    'src/components/Footer.jsx': {
      path: 'src/components/Footer.jsx',
      content: 'export default function Footer() {\n  return (\n    <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">\n      TechFest 2026. Made with passion by the student developer committee.\n    </footer>\n  );\n}',
      status: 'untracked',
    },
  };

  const initialPullRequests: PullRequest[] = [
    {
      id: 'pr-1',
      number: 14,
      title: 'feat: add event listings & prize showcase',
      author: 'Rohan (Teammate 3)',
      authorAvatarBg: '#238636',
      sourceBranch: 'feature/events',
      targetBranch: 'main',
      status: 'open',
      description: 'Creates the interactive event card catalog with prize information and team size limit filters.',
      createdAt: '4 hours ago',
      canMerge: true,
      conflict: false,
      labels: ['feature', 'ready-for-review'],
      reviews: [
        {
          id: 'rev-1',
          author: 'Keerthana M G',
          avatarBg: '#8957e5',
          state: 'APPROVED',
          comment: 'Clean implementation! Verified the card responsiveness on mobile.',
          date: '2 hours ago',
        },
      ],
      checks: [
        { id: 'c-1', name: 'Lint & TypeScript Check', status: 'completed', conclusion: 'success', duration: '24s' },
        { id: 'c-2', name: 'Unit Tests (Jest)', status: 'completed', conclusion: 'success', duration: '41s' },
        { id: 'c-3', name: 'Vercel Preview Deployment', status: 'completed', conclusion: 'success', duration: '1m 12s' },
      ],
      changedFiles: [
        {
          path: 'src/components/EventCard.jsx',
          additions: 12,
          deletions: 0,
          status: 'added',
          diff: '+ export default function EventCard({ title, category, prize }) {\n+   return (\n+     <div className="p-6 border border-slate-800 rounded-lg bg-slate-900/60 text-white">\n+       <span className="text-xs uppercase tracking-wide text-blue-400">{category}</span>\n+       <h3 className="text-xl font-bold mt-2">{title}</h3>\n+       <p className="text-sm text-slate-400 mt-2">Cash Prize: {prize}</p>\n+     </div>\n+   );\n+ }',
        },
      ],
    },
    {
      id: 'pr-2',
      number: 15,
      title: 'fix: align footer links and social handles',
      author: 'Priya (Teammate 4)',
      authorAvatarBg: '#d29922',
      sourceBranch: 'fix/footer-styling',
      targetBranch: 'main',
      status: 'open',
      description: 'Aligns the copyright bar and adds links to the student developer committee.',
      createdAt: '1 hour ago',
      canMerge: false,
      conflict: true,
      labels: ['bugfix', 'conflict'],
      reviews: [
        {
          id: 'rev-2',
          author: 'Karthikeyan',
          avatarBg: '#1f6feb',
          state: 'CHANGES_REQUESTED',
          comment: 'Please resolve the merge conflict with main before merging.',
          date: '35m ago',
        },
      ],
      checks: [
        { id: 'c-4', name: 'Lint & TypeScript Check', status: 'completed', conclusion: 'success', duration: '19s' },
        { id: 'c-5', name: 'Branch Conflict Check', status: 'completed', conclusion: 'failure', duration: '5s' },
      ],
      changedFiles: [
        {
          path: 'src/components/Footer.jsx',
          additions: 8,
          deletions: 4,
          status: 'modified',
          diff: '<<<<<<< HEAD\n<footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">\n=======\n<footer className="border-t border-slate-700 py-8 px-6 flex justify-between text-slate-400">\n>>>>>>> fix/footer-styling',
        },
      ],
    },
  ];

  const initialContributors: Contributor[] = [
    {
      id: 'keerthana',
      name: 'Keerthana M G',
      role: 'Lead Architect / Navigation & Core Layout',
      email: 'keerthanamg19@gmail.com',
      avatarBg: '#8957e5',
      activeBranch: 'main',
      unpushedCount: 0,
      dirtyFilesCount: 0,
      workingFiles: {},
      stagedFiles: {},
      currentTask: 'Reviewing PR #14 and setting up symposium schedule routing',
    },
    {
      id: 'karthikeyan',
      name: 'Karthikeyan',
      role: 'UI Engineer / Hero Section & Landing',
      email: 'karthikeyan@techfest.org',
      avatarBg: '#1f6feb',
      activeBranch: 'feature/hero-redesign',
      unpushedCount: 1,
      dirtyFilesCount: 1,
      workingFiles: {
        'src/components/Hero.jsx': '// Enhanced 3D banner lighting effect\n...',
      },
      stagedFiles: {},
      currentTask: 'Polishing hackathon registration call-to-action button',
    },
    {
      id: 'rohan',
      name: 'Rohan',
      role: 'Teammate 3 / Event Listings & API',
      email: 'rohan@techfest.org',
      avatarBg: '#238636',
      activeBranch: 'feature/events',
      unpushedCount: 0,
      dirtyFilesCount: 0,
      workingFiles: {},
      stagedFiles: {},
      currentTask: 'Awaiting PR #14 merge into main',
    },
    {
      id: 'priya',
      name: 'Priya',
      role: 'Teammate 4 / Footer & Documentation',
      email: 'priya@techfest.org',
      avatarBg: '#d29922',
      activeBranch: 'fix/footer-styling',
      unpushedCount: 1,
      dirtyFilesCount: 1,
      workingFiles: {
        'src/components/Footer.jsx': 'Conflicted local changes awaiting rebase...',
      },
      stagedFiles: {},
      currentTask: 'Resolving merge conflict with updated main branch',
    },
  ];

  const initialReflog: GitReflogEntry[] = [
    {
      id: 'ref-1',
      index: 0,
      selector: 'HEAD@{0}',
      action: 'commit',
      fromSha: 'b47e2d9',
      toSha: 'c83d105',
      message: 'commit: feat: hero banner section with countdown',
      timestamp: '18 hours ago',
    },
    {
      id: 'ref-2',
      index: 1,
      selector: 'HEAD@{1}',
      action: 'commit',
      fromSha: 'a1f89c0',
      toSha: 'b47e2d9',
      message: 'commit: feat: add Navigation bar with symposium links',
      timestamp: '1 day ago',
    },
    {
      id: 'ref-3',
      index: 2,
      selector: 'HEAD@{2}',
      action: 'commit (initial)',
      fromSha: '0000000',
      toSha: 'a1f89c0',
      message: 'commit (initial): Initial commit: add project scaffold and README',
      timestamp: '2 days ago',
    },
  ];

  return {
    repositoryName: 'college-fest-portal',
    files: initialFiles,
    commits: {
      'a1f89c0': commit1,
      'b47e2d9': commit2,
      'c83d105': commit3,
      'd92a471': commitFeature,
    },
    branches: {
      main: { name: 'main', commitId: 'c83d105', upstream: 'origin/main' },
      'feature/events': { name: 'feature/events', commitId: 'd92a471', upstream: 'origin/feature/events' },
      'feature/hero-redesign': { name: 'feature/hero-redesign', commitId: 'c83d105' },
      'fix/footer-styling': { name: 'fix/footer-styling', commitId: 'b47e2d9' },
    },
    currentBranch: 'main',
    headCommitId: 'c83d105',
    detachedHead: false,
    remotes: {
      origin: {
        name: 'origin',
        url: 'https://github.com/techfest-engineering/college-fest-portal.git',
        branches: {
          main: 'c83d105',
          'feature/events': 'd92a471',
        },
      },
    },
    stashes: [],
    reflog: initialReflog,
    tags: {
      'v0.1.0': {
        name: 'v0.1.0',
        commitId: 'a1f89c0',
        message: 'Initial alpha prototype for campus committee review',
        tagger: 'Keerthana M G',
        date: '2026-10-12',
      },
    },
    pullRequests: initialPullRequests,
    contributors: initialContributors,
    activeContributorId: 'keerthana',
    activeConflict: null,
    bisect: {
      active: false,
      goodSha: null,
      badSha: null,
      currentTestSha: null,
      stepsRemaining: 0,
      candidateShas: [],
      identifiedCulprit: null,
    },
    lastCommandResult: {
      command: 'git status',
      success: true,
      status: 'success',
      output: `On branch main\nYour branch is up to date with 'origin/main'.\n\nChanges not staged for commit:\n  (use "git add <file>..." to update what will be committed)\n\n\tmodified:   src/App.jsx\n\nUntracked files:\n  (use "git add <file>..." to include in what will be committed)\n\n\tsrc/components/Footer.jsx\n\nno changes added to commit (use "git add" to track)`,
      explanation: 'Working tree contains 1 modified file (src/App.jsx) and 1 untracked file (src/components/Footer.jsx). Staging area is currently empty.',
      affected: {
        workingTreeChanged: false,
        stagingChanged: false,
        branchesChanged: false,
        headChanged: false,
        commitAdded: false,
        remoteChanged: false,
        filesAffected: ['src/App.jsx', 'src/components/Footer.jsx'],
        summary: 'Queried working directory and index state. No state was mutated.',
      },
      nextSteps: [
        'Run "git add src/App.jsx" to stage the modified file.',
        'Run "git diff" to inspect unstaged changes.',
        'Run "git add ." to stage all pending changes.',
      ],
    },
    commandHistory: ['git status'],
  };
}

export function executeGitCommand(
  rawInput: string,
  state: SimulationState
): { nextState: SimulationState; result: CommandResult } {
  const { nextState, result } = dispatchGitCommand(rawInput, state);
  const enrichedResult: CommandResult = {
    ...result,
    id: `res-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    timestamp: Date.now(),
  };

  return {
    nextState: {
      ...nextState,
      lastCommandResult: enrichedResult,
    },
    result: enrichedResult,
  };
}

function dispatchGitCommand(
  rawInput: string,
  state: SimulationState
): { nextState: SimulationState; result: CommandResult } {
  let trimmed = rawInput.trim();
  if (!trimmed) {
    return {
      nextState: state,
      result: {
        command: '',
        success: true,
        status: 'success',
        output: '',
        explanation: 'No command entered.',
        affected: createEmptyEffect(),
      },
    };
  }

  // Strip leading terminal prompts like '$ ', '> ', '# ' if pasted by user
  trimmed = trimmed.replace(/^[\$#>]\s*/, '').trim();

  // Support direct "clear"
  if (trimmed.toLowerCase() === 'clear') {
    return {
      nextState: state,
      result: {
        command: 'clear',
        success: true,
        status: 'success',
        output: '',
        explanation: 'Terminal display cleared.',
        affected: createEmptyEffect(),
      },
    };
  }

  // Handle common typo "git remote-v" -> "git remote -v"
  if (trimmed.toLowerCase() === 'git remote-v' || trimmed.toLowerCase() === 'remote-v') {
    trimmed = 'git remote -v';
  }

  const parts = trimmed.split(/\s+/);
  let binary = parts[0]?.toLowerCase() || '';
  let subCommand = parts[1]?.toLowerCase() || '';

  // Auto-prepend 'git' if user directly entered a Git subcommand without typing 'git'
  const commonGitSubcommands = [
    'status', 'add', 'commit', 'branch', 'switch', 'checkout', 'merge', 'rebase',
    'diff', 'log', 'stash', 'reset', 'revert', 'cherry-pick', 'push', 'pull',
    'fetch', 'restore', 'rm', 'reflog', 'tag', 'remote', 'init', 'clone', 'config', 'bisect'
  ];

  let effectiveParts = parts;
  if (commonGitSubcommands.includes(binary)) {
    subCommand = binary;
    binary = 'git';
    trimmed = `git ${trimmed}`;
    effectiveParts = trimmed.split(/\s+/);
  }

  // Record command in history
  const updatedHistory = [...state.commandHistory, trimmed];

  // If command is GitHub CLI (gh)
  if (binary === 'gh') {
    return handleGhCommand(effectiveParts, { ...state, commandHistory: updatedHistory });
  }

  if (binary !== 'git') {
    return {
      nextState: { ...state, commandHistory: updatedHistory },
      result: {
        command: trimmed,
        success: false,
        status: 'error',
        output: `zsh: command not found: ${binary}\nType 'git <command>' (e.g., git status, git add ., git commit -m "...") or 'gh <command>'`,
        explanation: `Unknown command "${binary}". Try "git status", "git add .", or "git branch".`,
        affected: createEmptyEffect(),
      },
    };
  }

  if (!subCommand || subCommand === '--help' || subCommand === 'help') {
    return {
      nextState: { ...state, commandHistory: updatedHistory },
      result: {
        command: trimmed,
        success: true,
        status: 'success',
        output: `usage: git [--version] [--help] <command> [<args>]\n\nCommon commands for college developers:\n  status     Show the working tree status\n  add        Stage changes to prepare for commit\n  commit     Record changes to the repository\n  branch     List, create, or delete branches\n  switch     Switch branches\n  merge      Join two or more development histories\n  rebase     Reapply commits on top of another base tip\n  stash      Shelve the changes in a dirty working directory\n  diff       Show changes between commits, commit and working tree, etc\n  log        Show commit logs\n  push       Update remote refs along with associated objects\n  pull       Fetch from and integrate with another repository\n  remote -v  List remote repository URLs`,
        explanation: 'Quick overview of supported Git commands.',
        affected: createEmptyEffect(),
      },
    };
  }

  // Handle Git subcommands
  switch (subCommand) {
    case 'status':
      return handleStatus(trimmed, { ...state, commandHistory: updatedHistory });

    case 'add':
      return handleAdd(effectiveParts.slice(2), trimmed, { ...state, commandHistory: updatedHistory });

    case 'commit':
      return handleCommit(effectiveParts.slice(2), trimmed, { ...state, commandHistory: updatedHistory });

    case 'switch':
      return handleSwitch(effectiveParts.slice(2), trimmed, { ...state, commandHistory: updatedHistory });

    case 'checkout':
      return handleCheckout(effectiveParts.slice(2), trimmed, { ...state, commandHistory: updatedHistory });

    case 'branch':
      return handleBranch(effectiveParts.slice(2), trimmed, { ...state, commandHistory: updatedHistory });

    case 'merge':
      return handleMerge(effectiveParts.slice(2), trimmed, { ...state, commandHistory: updatedHistory });

    case 'rebase':
      return handleRebase(effectiveParts.slice(2), trimmed, { ...state, commandHistory: updatedHistory });

    case 'diff':
      return handleDiff(effectiveParts.slice(2), trimmed, { ...state, commandHistory: updatedHistory });

    case 'log':
      return handleLog(effectiveParts.slice(2), trimmed, { ...state, commandHistory: updatedHistory });

    case 'stash':
      return handleStash(effectiveParts.slice(2), trimmed, { ...state, commandHistory: updatedHistory });

    case 'reset':
      return handleReset(effectiveParts.slice(2), trimmed, { ...state, commandHistory: updatedHistory });

    case 'revert':
      return handleRevert(effectiveParts.slice(2), trimmed, { ...state, commandHistory: updatedHistory });

    case 'cherry-pick':
      return handleCherryPick(effectiveParts.slice(2), trimmed, { ...state, commandHistory: updatedHistory });

    case 'push':
      return handlePush(effectiveParts.slice(2), trimmed, { ...state, commandHistory: updatedHistory });

    case 'pull':
      return handlePull(effectiveParts.slice(2), trimmed, { ...state, commandHistory: updatedHistory });

    case 'fetch':
      return handleFetch(effectiveParts.slice(2), trimmed, { ...state, commandHistory: updatedHistory });

    case 'restore':
      return handleRestore(effectiveParts.slice(2), trimmed, { ...state, commandHistory: updatedHistory });

    case 'rm':
      return handleRm(effectiveParts.slice(2), trimmed, { ...state, commandHistory: updatedHistory });

    case 'reflog':
      return handleReflog(trimmed, { ...state, commandHistory: updatedHistory });

    case 'tag':
      return handleTag(effectiveParts.slice(2), trimmed, { ...state, commandHistory: updatedHistory });

    case 'remote':
      return handleRemote(effectiveParts.slice(2), trimmed, { ...state, commandHistory: updatedHistory });

    case 'bisect':
      return handleBisect(effectiveParts.slice(2), trimmed, { ...state, commandHistory: updatedHistory });

    case 'init':
      return {
        nextState: { ...state, commandHistory: updatedHistory },
        result: {
          command: trimmed,
          success: true,
          status: 'warning',
          output: `Reinitialized existing Git repository in /home/student/projects/${state.repositoryName}/.git/`,
          explanation: 'Repository is already initialized. "git init" in an existing repository reinitializes metadata without modifying current files or branches.',
          affected: createEmptyEffect(),
        },
      };

    default:
      return {
        nextState: { ...state, commandHistory: updatedHistory },
        result: {
          command: trimmed,
          success: false,
          status: 'error',
          output: `git: '${subCommand}' is not a git command. See 'git --help'.\n\nTry: git status, git add ., git commit -m "...", git branch, git switch, git log`,
          explanation: `Unrecognized Git command "${subCommand}". Check spelling or click one of the quick command buttons below.`,
          affected: createEmptyEffect(),
        },
      };
  }
}

function createEmptyEffect(): CommandEffect {
  return {
    workingTreeChanged: false,
    stagingChanged: false,
    branchesChanged: false,
    headChanged: false,
    commitAdded: false,
    remoteChanged: false,
    filesAffected: [],
    summary: 'No repository state modified.',
  };
}

function handleStatus(cmd: string, state: SimulationState) {
  const staged = Object.values(state.files).filter((f) => f.status === 'staged');
  const modified = Object.values(state.files).filter((f) => f.status === 'modified');
  const untracked = Object.values(state.files).filter((f) => f.status === 'untracked');
  const conflicted = Object.values(state.files).filter((f) => f.status === 'conflicted');

  let output = `On branch ${state.detachedHead ? `HEAD detached at ${state.headCommitId}` : state.currentBranch}\n`;

  const currentBranchObj = state.branches[state.currentBranch];
  if (currentBranchObj?.upstream) {
    output += `Your branch is up to date with '${currentBranchObj.upstream}'.\n\n`;
  } else {
    output += `\n`;
  }

  if (conflicted.length > 0) {
    output += `You have unmerged paths.\n  (fix conflicts and run "git commit")\n  (use "git merge --abort" to abort the merge)\n\nUnmerged paths:\n`;
    conflicted.forEach((f) => {
      output += `\tboth modified:   ${f.path}\n`;
    });
    output += `\n`;
  }

  if (staged.length > 0) {
    output += `Changes to be committed:\n  (use "git restore --staged <file>..." to unstage)\n\n`;
    staged.forEach((f) => {
      output += `\tmodified:   ${f.path}\n`;
    });
    output += `\n`;
  }

  if (modified.length > 0) {
    output += `Changes not staged for commit:\n  (use "git add <file>..." to update what will be committed)\n  (use "git restore <file>..." to discard changes in working directory)\n\n`;
    modified.forEach((f) => {
      output += `\tmodified:   ${f.path}\n`;
    });
    output += `\n`;
  }

  if (untracked.length > 0) {
    output += `Untracked files:\n  (use "git add <file>..." to include in what will be committed)\n\n`;
    untracked.forEach((f) => {
      output += `\t${f.path}\n`;
    });
    output += `\n`;
  }

  if (staged.length === 0 && modified.length === 0 && untracked.length === 0 && conflicted.length === 0) {
    output += `nothing to commit, working tree clean`;
  }

  return {
    nextState: state,
    result: {
      command: cmd,
      success: true,
      status: 'success' as const,
      output,
      explanation: `Inspected working tree and index. Branch "${state.currentBranch}" at commit ${state.headCommitId}. Staged: ${staged.length}, Modified: ${modified.length}, Untracked: ${untracked.length}.`,
      affected: {
        ...createEmptyEffect(),
        summary: 'Status queried; no files or references were modified.',
      },
      nextSteps:
        staged.length > 0
          ? ['Run "git commit -m \\"<message>\\"" to record staged snapshot.']
          : modified.length > 0
          ? ['Run "git add <file>" or "git add ." to stage changes.']
          : ['Working tree is clean. Ready to branch, pull, or write code!'],
    },
  };
}

function handleAdd(args: string[], cmd: string, state: SimulationState) {
  if (args.length === 0) {
    return {
      nextState: state,
      result: {
        command: cmd,
        success: false,
        status: 'error' as const,
        output: 'Nothing specified, nothing added.\nMaybe you wanted to say "git add ." or "git add <filename>"?',
        explanation: 'git add requires a file path or "." to stage all modified and untracked files.',
        affected: createEmptyEffect(),
      },
    };
  }

  const target = args[0];
  const newFiles = { ...state.files };
  const stagedPaths: string[] = [];

  if (target === '.' || target === '-A' || target === '--all') {
    Object.keys(newFiles).forEach((p) => {
      const file = newFiles[p];
      if (file.status === 'modified' || file.status === 'untracked') {
        newFiles[p] = {
          ...file,
          status: 'staged',
          stagedContent: file.content,
        };
        stagedPaths.push(p);
      }
    });
  } else {
    // Specific file
    if (!newFiles[target]) {
      return {
        nextState: state,
        result: {
          command: cmd,
          success: false,
          status: 'error' as const,
          output: `fatal: pathspec '${target}' did not match any files`,
          explanation: `File "${target}" was not found in the working tree. Use "git status" to view available files.`,
          affected: createEmptyEffect(),
        },
      };
    }

    const file = newFiles[target];
    newFiles[target] = {
      ...file,
      status: 'staged',
      stagedContent: file.content,
    };
    stagedPaths.push(target);
  }

  if (stagedPaths.length === 0) {
    return {
      nextState: state,
      result: {
        command: cmd,
        success: true,
        status: 'warning' as const,
        output: 'No changes to add. Working tree has no unstaged modifications.',
        explanation: 'Files are already staged or have no modifications compared to HEAD.',
        affected: createEmptyEffect(),
      },
    };
  }

  const nextState: SimulationState = {
    ...state,
    files: newFiles,
  };

  return {
    nextState,
    result: {
      command: cmd,
      success: true,
      status: 'success' as const,
      output: '',
      explanation: `Staged ${stagedPaths.length} file(s) into the index (${stagedPaths.join(', ')}). The staging area is now prepared for commit.`,
      affected: {
        workingTreeChanged: false,
        stagingChanged: true,
        branchesChanged: false,
        headChanged: false,
        commitAdded: false,
        remoteChanged: false,
        filesAffected: stagedPaths,
        summary: `Moved ${stagedPaths.length} file(s) to the Staging Area (index).`,
      },
      nextSteps: [
        'Run "git commit -m \\"<message>\\"" to store these changes in the local repository.',
        'Run "git status" to verify staged items.',
        'Run "git diff --cached" to inspect the staged diff.',
      ],
    },
  };
}

function handleCommit(args: string[], cmd: string, state: SimulationState) {
  // Extract message
  const msgIndex = args.indexOf('-m');
  const isAmend = args.includes('--amend');

  let commitMessage = '';
  if (msgIndex !== -1 && args[msgIndex + 1]) {
    commitMessage = args.slice(msgIndex + 1).join(' ').replace(/^["']|["']$/g, '');
  }

  if (!commitMessage) {
    if (isAmend) {
      commitMessage = state.commits[state.headCommitId]?.message || 'Amended commit';
    } else {
      return {
        nextState: state,
        result: {
          command: cmd,
          success: false,
          status: 'error' as const,
          output: 'error: switch `m` requires a value\nAborting commit due to empty commit message.',
          explanation: 'Git requires a descriptive commit message. Provide one with: git commit -m "Your descriptive message"',
          affected: createEmptyEffect(),
        },
      };
    }
  }

  // Check what is staged
  const stagedFiles = Object.values(state.files).filter((f) => f.status === 'staged');
  if (stagedFiles.length === 0 && !isAmend) {
    return {
      nextState: state,
      result: {
        command: cmd,
        success: false,
        status: 'warning' as const,
        output: 'On branch ' + state.currentBranch + '\nChanges not staged for commit:\nno changes added to commit (use "git add" to track)',
        explanation: 'Cannot commit: the staging area is empty! You must first stage files with "git add <file>".',
        affected: createEmptyEffect(),
        nextSteps: ['Run "git add <file>" or "git add ." before committing.'],
      },
    };
  }

  const newSha = generateSha();
  const parentId = isAmend
    ? state.commits[state.headCommitId]?.parentIds[0] || ''
    : state.headCommitId;

  // Build snapshot of current repo
  const newSnapshot: Record<string, string> = {
    ...(state.commits[state.headCommitId]?.snapshot || {}),
  };

  const newFiles = { ...state.files };
  const committedPaths: string[] = [];

  Object.keys(newFiles).forEach((p) => {
    const f = newFiles[p];
    if (f.status === 'staged') {
      newSnapshot[p] = f.stagedContent || f.content;
      newFiles[p] = {
        ...f,
        status: 'committed',
        committedContent: f.stagedContent || f.content,
        diff: undefined,
      };
      committedPaths.push(p);
    }
  });

  const now = new Date();
  const newCommit: GitCommit = {
    id: newSha,
    fullSha: newSha + '7b8c91a03f' + Math.random().toString(36).substring(2, 9),
    message: commitMessage,
    author: state.contributors.find((c) => c.id === state.activeContributorId)?.name || 'Keerthana M G',
    email: state.contributors.find((c) => c.id === state.activeContributorId)?.email || 'keerthanamg19@gmail.com',
    timestamp: 'just now',
    authorDate: now.toISOString(),
    committerDate: now.toISOString(),
    parentIds: parentId ? [parentId] : [],
    snapshot: newSnapshot,
    branch: state.currentBranch,
  };

  const newCommits = { ...state.commits, [newSha]: newCommit };
  const newBranches = { ...state.branches };

  if (!state.detachedHead && state.branches[state.currentBranch]) {
    newBranches[state.currentBranch] = {
      ...state.branches[state.currentBranch],
      commitId: newSha,
    };
  }

  const newReflog: GitReflogEntry = {
    id: `ref-${Date.now()}`,
    index: 0,
    selector: 'HEAD@{0}',
    action: isAmend ? 'commit (amend)' : 'commit',
    fromSha: state.headCommitId,
    toSha: newSha,
    message: `commit${isAmend ? ' (amend)' : ''}: ${commitMessage}`,
    timestamp: 'just now',
  };

  const nextState: SimulationState = {
    ...state,
    files: newFiles,
    commits: newCommits,
    branches: newBranches,
    headCommitId: newSha,
    reflog: [newReflog, ...state.reflog.map((r, idx) => ({ ...r, index: idx + 1 }))],
  };

  return {
    nextState,
    result: {
      command: cmd,
      success: true,
      status: 'success' as const,
      output: `[${state.currentBranch} ${newSha}] ${commitMessage}\n ${committedPaths.length || 1} file changed, ${committedPaths.length * 15} insertions(+)`,
      explanation: `Created new commit ${newSha} on branch "${state.currentBranch}". HEAD advanced to this new commit node with parent ${parentId}.`,
      affected: {
        workingTreeChanged: false,
        stagingChanged: true,
        branchesChanged: !state.detachedHead,
        headChanged: true,
        commitAdded: true,
        remoteChanged: false,
        filesAffected: committedPaths,
        summary: `Commit node [${newSha}] created in local repository DAG.`,
      },
      nextSteps: [
        'Run "git log --oneline --graph" to see the updated commit ancestry.',
        'Run "git push" to synchronize this commit with the simulated remote repository.',
      ],
    },
  };
}

function handleSwitch(args: string[], cmd: string, state: SimulationState) {
  if (args.length === 0) {
    return {
      nextState: state,
      result: {
        command: cmd,
        success: false,
        status: 'error' as const,
        output: 'fatal: missing branch or commit argument',
        explanation: 'git switch requires a branch name. Example: git switch feature/navbar or git switch -c new-feature',
        affected: createEmptyEffect(),
      },
    };
  }

  const isCreate = args[0] === '-c' || args[0] === '-C';
  const targetBranchName = isCreate ? args[1] : args[0];

  if (!targetBranchName) {
    return {
      nextState: state,
      result: {
        command: cmd,
        success: false,
        status: 'error' as const,
        output: 'fatal: missing branch name for -c',
        explanation: 'Provide a branch name after -c: git switch -c <new-branch>',
        affected: createEmptyEffect(),
      },
    };
  }

  // Creating new branch
  if (isCreate) {
    if (state.branches[targetBranchName]) {
      return {
        nextState: state,
        result: {
          command: cmd,
          success: false,
          status: 'error' as const,
          output: `fatal: a branch named '${targetBranchName}' already exists`,
          explanation: `Branch "${targetBranchName}" already exists. Use "git switch ${targetBranchName}" to switch to it without -c.`,
          affected: createEmptyEffect(),
        },
      };
    }

    const newBranch: GitBranch = {
      name: targetBranchName,
      commitId: state.headCommitId,
    };

    const newBranches = {
      ...state.branches,
      [targetBranchName]: newBranch,
    };

    const nextState: SimulationState = {
      ...state,
      branches: newBranches,
      currentBranch: targetBranchName,
      detachedHead: false,
    };

    return {
      nextState,
      result: {
        command: cmd,
        success: true,
        status: 'success' as const,
        output: `Switched to a new branch '${targetBranchName}'`,
        explanation: `Created new branch "${targetBranchName}" pointing to commit ${state.headCommitId} and moved HEAD to point to it.`,
        affected: {
          ...createEmptyEffect(),
          branchesChanged: true,
          headChanged: true,
          summary: `Created and checked out branch "${targetBranchName}".`,
        },
        nextSteps: [
          'Make modifications and commit to keep your feature isolated.',
          'Run "git branch" to list all local branches.',
        ],
      },
    };
  }

  // Switching to existing branch
  if (!state.branches[targetBranchName]) {
    return {
      nextState: state,
      result: {
        command: cmd,
        success: false,
        status: 'error' as const,
        output: `fatal: invalid reference: ${targetBranchName}`,
        explanation: `Branch "${targetBranchName}" does not exist. Use "git switch -c ${targetBranchName}" to create it.`,
        affected: createEmptyEffect(),
      },
    };
  }

  const targetBranch = state.branches[targetBranchName];
  const targetCommit = state.commits[targetBranch.commitId];

  // Update working files to match target commit snapshot
  const updatedFiles = { ...state.files };
  if (targetCommit?.snapshot) {
    Object.keys(targetCommit.snapshot).forEach((p) => {
      updatedFiles[p] = {
        path: p,
        content: targetCommit.snapshot[p],
        committedContent: targetCommit.snapshot[p],
        status: 'committed',
      };
    });
  }

  const nextState: SimulationState = {
    ...state,
    files: updatedFiles,
    currentBranch: targetBranchName,
    headCommitId: targetBranch.commitId,
    detachedHead: false,
  };

  return {
    nextState,
    result: {
      command: cmd,
      success: true,
      status: 'success' as const,
      output: `Switched to branch '${targetBranchName}'`,
      explanation: `HEAD moved to branch "${targetBranchName}" at commit ${targetBranch.commitId}. Working tree updated to reflect that commit's snapshot.`,
      affected: {
        workingTreeChanged: true,
        stagingChanged: false,
        branchesChanged: false,
        headChanged: true,
        commitAdded: false,
        remoteChanged: false,
        filesAffected: Object.keys(targetCommit?.snapshot || {}),
        summary: `Switched active branch to "${targetBranchName}".`,
      },
      nextSteps: [
        'Run "git status" to verify the clean working tree.',
        'Run "git log --oneline" to view history on this branch.',
      ],
    },
  };
}

function handleCheckout(args: string[], cmd: string, state: SimulationState) {
  if (args.length === 0) {
    return {
      nextState: state,
      result: {
        command: cmd,
        success: false,
        status: 'error' as const,
        output: 'fatal: missing arguments for checkout',
        explanation: 'git checkout has historical dual purposes: switching branches or restoring files. Consider modern "git switch" or "git restore".',
        affected: createEmptyEffect(),
      },
    };
  }

  // git checkout -b <name>
  if (args[0] === '-b') {
    return handleSwitch(['-c', args[1]], cmd, state);
  }

  const target = args[0];

  // If target is a branch
  if (state.branches[target]) {
    return handleSwitch([target], cmd, state);
  }

  // If target is a commit hash (Detached HEAD)
  if (state.commits[target]) {
    const commit = state.commits[target];
    const updatedFiles = { ...state.files };
    Object.keys(commit.snapshot).forEach((p) => {
      updatedFiles[p] = {
        path: p,
        content: commit.snapshot[p],
        committedContent: commit.snapshot[p],
        status: 'committed',
      };
    });

    const nextState: SimulationState = {
      ...state,
      files: updatedFiles,
      headCommitId: target,
      detachedHead: true,
      currentBranch: `(HEAD detached at ${target})`,
    };

    return {
      nextState,
      result: {
        command: cmd,
        success: true,
        status: 'warning' as const,
        output: `Note: switching to '${target}'.\n\nYou are in 'detached HEAD' state. You can look around, make experimental\nchanges and commit them, and you can discard any commits you make in this\nstate without impacting any branches by switching back to a branch.\n\nHEAD is now at ${target} ${commit.message}`,
        explanation: `HEAD is now directly pointing to commit ${target} instead of a named branch pointer! Any commits made here will not belong to any branch unless a new branch is created.`,
        affected: {
          workingTreeChanged: true,
          stagingChanged: false,
          branchesChanged: false,
          headChanged: true,
          commitAdded: false,
          remoteChanged: false,
          filesAffected: Object.keys(commit.snapshot),
          summary: 'HEAD detached from branch pointer.',
        },
        nextSteps: [
          'To create a new branch from here: "git switch -c <new-branch-name>"',
          'To return to main safely: "git switch main"',
        ],
      },
    };
  }

  return {
    nextState: state,
    result: {
      command: cmd,
      success: false,
      status: 'error' as const,
      output: `error: pathspec '${target}' did not match any file(s) known to git`,
      explanation: `Target "${target}" was neither a branch nor a known commit hash.`,
      affected: createEmptyEffect(),
    },
  };
}

function handleBranch(args: string[], cmd: string, state: SimulationState) {
  // git branch without args: list branches
  if (args.length === 0 || args[0] === '-a' || args[0] === '--all') {
    let output = '';
    Object.keys(state.branches).forEach((b) => {
      if (b === state.currentBranch && !state.detachedHead) {
        output += `* \x1b[32m${b}\x1b[0m\n`;
      } else {
        output += `  ${b}\n`;
      }
    });

    if (args[0] === '-a' || args[0] === '--all') {
      Object.keys(state.remotes).forEach((rem) => {
        const remoteObj = state.remotes[rem];
        Object.keys(remoteObj.branches).forEach((rb) => {
          output += `  remotes/${rem}/${rb}\n`;
        });
      });
    }

    return {
      nextState: state,
      result: {
        command: cmd,
        success: true,
        status: 'success' as const,
        output,
        explanation: 'Listed all local and remote-tracking branch pointers. The asterisk (*) indicates current checked-out branch.',
        affected: createEmptyEffect(),
      },
    };
  }

  // Delete branch: -d or -D
  if (args[0] === '-d' || args[0] === '-D') {
    const toDelete = args[1];
    if (!toDelete) {
      return {
        nextState: state,
        result: {
          command: cmd,
          success: false,
          status: 'error' as const,
          output: 'fatal: branch name required',
          explanation: 'Specify the branch name to delete: git branch -d <branch-name>',
          affected: createEmptyEffect(),
        },
      };
    }

    if (toDelete === state.currentBranch) {
      return {
        nextState: state,
        result: {
          command: cmd,
          success: false,
          status: 'error' as const,
          output: `error: Cannot delete branch '${toDelete}' checked out at '/home/student/projects/${state.repositoryName}'`,
          explanation: 'You cannot delete the branch you are currently on. Switch to another branch first (e.g. "git switch main") then delete.',
          affected: createEmptyEffect(),
        },
      };
    }

    if (!state.branches[toDelete]) {
      return {
        nextState: state,
        result: {
          command: cmd,
          success: false,
          status: 'error' as const,
          output: `error: branch '${toDelete}' not found.`,
          explanation: `Branch "${toDelete}" does not exist in local references.`,
          affected: createEmptyEffect(),
        },
      };
    }

    const newBranches = { ...state.branches };
    delete newBranches[toDelete];

    return {
      nextState: { ...state, branches: newBranches },
      result: {
        command: cmd,
        success: true,
        status: 'success' as const,
        output: `Deleted branch ${toDelete} (was ${state.branches[toDelete].commitId}).`,
        explanation: `Removed branch pointer "${toDelete}". Note that commit objects remain in the graph and can still be retrieved via reflog until pruned by garbage collection.`,
        affected: {
          ...createEmptyEffect(),
          branchesChanged: true,
          summary: `Deleted branch pointer "${toDelete}".`,
        },
      },
    };
  }

  // Create branch: git branch <name>
  const newBranchName = args[0];
  if (state.branches[newBranchName]) {
    return {
      nextState: state,
      result: {
        command: cmd,
        success: false,
        status: 'error' as const,
        output: `fatal: a branch named '${newBranchName}' already exists`,
        explanation: `Branch "${newBranchName}" already exists. Choose a different name or switch to it.`,
        affected: createEmptyEffect(),
      },
    };
  }

  const newBranch: GitBranch = {
    name: newBranchName,
    commitId: state.headCommitId,
  };

  return {
    nextState: {
      ...state,
      branches: { ...state.branches, [newBranchName]: newBranch },
    },
    result: {
      command: cmd,
      success: true,
      status: 'success' as const,
      output: '',
      explanation: `Created branch pointer "${newBranchName}" pointing to commit ${state.headCommitId}. Notice HEAD was NOT switched (HEAD still points to ${state.currentBranch}).`,
      affected: {
        ...createEmptyEffect(),
        branchesChanged: true,
        summary: `Created branch pointer "${newBranchName}".`,
      },
      nextSteps: [
        `Run "git switch ${newBranchName}" to switch to your new branch.`,
      ],
    },
  };
}

function handleMerge(args: string[], cmd: string, state: SimulationState) {
  if (args.length === 0) {
    return {
      nextState: state,
      result: {
        command: cmd,
        success: false,
        status: 'error' as const,
        output: 'fatal: No commit specified to merge',
        explanation: 'git merge requires the branch or commit name to integrate into current branch. Example: git merge feature/events',
        affected: createEmptyEffect(),
      },
    };
  }

  const targetBranchName = args[0];
  if (!state.branches[targetBranchName]) {
    return {
      nextState: state,
      result: {
        command: cmd,
        success: false,
        status: 'error' as const,
        output: `merge: ${targetBranchName} - not something we can merge`,
        explanation: `Branch "${targetBranchName}" does not exist.`,
        affected: createEmptyEffect(),
      },
    };
  }

  const targetBranch = state.branches[targetBranchName];
  const currentHeadSha = state.headCommitId;
  const targetCommitSha = targetBranch.commitId;

  if (currentHeadSha === targetCommitSha) {
    return {
      nextState: state,
      result: {
        command: cmd,
        success: true,
        status: 'success' as const,
        output: 'Already up to date.',
        explanation: `Current branch "${state.currentBranch}" already contains all commits from "${targetBranchName}".`,
        affected: createEmptyEffect(),
      },
    };
  }

  // Conflict Scenario Check: If merging fix/footer-styling into main, trigger interactive conflict!
  if (targetBranchName === 'fix/footer-styling' || targetBranchName.includes('footer')) {
    const conflictFile: GitFile = {
      path: 'src/components/Footer.jsx',
      content: `<<<<<<< HEAD\n<footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">\n  TechFest 2026. Made with passion by the student developer committee.\n</footer>\n=======\n<footer className="border-t border-slate-700 py-8 px-6 flex justify-between text-slate-400">\n  <span>TechFest 2026 Symposium</span>\n  <a href="#github">GitHub</a>\n</footer>\n>>>>>>> ${targetBranchName}`,
      status: 'conflicted',
      conflict: {
        base: '<footer className="border-t border-slate-800 py-4 text-center text-slate-500">\nTechFest 2026\n</footer>',
        ours: '<footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">\n  TechFest 2026. Made with passion by the student developer committee.\n</footer>',
        theirs: '<footer className="border-t border-slate-700 py-8 px-6 flex justify-between text-slate-400">\n  <span>TechFest 2026 Symposium</span>\n  <a href="#github">GitHub</a>\n</footer>',
        markers: `<<<<<<< HEAD\n...\n=======\n...\n>>>>>>> ${targetBranchName}`,
      },
    };

    const nextFiles = { ...state.files, 'src/components/Footer.jsx': conflictFile };

    const nextState: SimulationState = {
      ...state,
      files: nextFiles,
      activeConflict: {
        path: 'src/components/Footer.jsx',
        base: conflictFile.conflict!.base,
        ours: conflictFile.conflict!.ours,
        theirs: conflictFile.conflict!.theirs,
        currentContent: conflictFile.content,
        targetBranch: targetBranchName,
        sourceBranch: state.currentBranch,
        operationType: 'merge',
      },
    };

    return {
      nextState,
      result: {
        command: cmd,
        success: false,
        status: 'conflict' as const,
        output: `Auto-merging src/components/Footer.jsx\nCONFLICT (content): Merge conflict in src/components/Footer.jsx\nAutomatic merge failed; fix conflicts and then commit the result.`,
        explanation: `Git attempted a 3-way merge using common ancestor commit b47e2d9. Both branches modified src/components/Footer.jsx concurrently in overlapping lines. Git wrote conflict markers into the file and stopped for manual resolution.`,
        affected: {
          workingTreeChanged: true,
          stagingChanged: false,
          branchesChanged: false,
          headChanged: false,
          commitAdded: false,
          remoteChanged: false,
          filesAffected: ['src/components/Footer.jsx'],
          summary: 'Merge stopped due to conflict in src/components/Footer.jsx.',
        },
        nextSteps: [
          'Open the Merge Conflict Lab to view side-by-side versions.',
          'Edit src/components/Footer.jsx and remove the conflict markers.',
          'Run "git add src/components/Footer.jsx" to mark as resolved.',
          'Run "git commit" to finalize the merge commit.',
        ],
      },
    };
  }

  // Fast-Forward vs 3-Way Merge
  const targetCommit = state.commits[targetCommitSha];
  const isFastForward = targetCommit?.parentIds.includes(currentHeadSha);

  if (isFastForward) {
    // Fast forward: move branch pointer directly to target commit
    const newBranches = {
      ...state.branches,
      [state.currentBranch]: {
        ...state.branches[state.currentBranch],
        commitId: targetCommitSha,
      },
    };

    const nextState: SimulationState = {
      ...state,
      branches: newBranches,
      headCommitId: targetCommitSha,
      files: {
        ...state.files,
        ...(targetCommit?.snapshot
          ? Object.fromEntries(
              Object.entries(targetCommit.snapshot).map(([k, v]) => [
                k,
                { path: k, content: v, committedContent: v, status: 'committed' as const },
              ])
            )
          : {}),
      },
    };

    return {
      nextState,
      result: {
        command: cmd,
        success: true,
        status: 'success' as const,
        output: `Updating ${currentHeadSha}..${targetCommitSha}\nFast-forward\n src/components/EventCard.jsx | 12 ++++++++++++\n 1 file changed, 12 insertions(+)`,
        explanation: `Fast-forward merge executed! Because current branch "${state.currentBranch}" had no new commits since the branch point, Git simply moved the branch pointer forward without creating an extra merge commit node.`,
        affected: {
          workingTreeChanged: true,
          stagingChanged: false,
          branchesChanged: true,
          headChanged: true,
          commitAdded: false,
          remoteChanged: false,
          filesAffected: Object.keys(targetCommit?.snapshot || {}),
          summary: `Fast-forwarded branch "${state.currentBranch}" to ${targetCommitSha}.`,
        },
      },
    };
  }

  // 3-way merge: create a merge commit with 2 parents!
  const mergeSha = generateSha();
  const mergeCommit: GitCommit = {
    id: mergeSha,
    fullSha: mergeSha + '7b8c91a03f' + Math.random().toString(36).substring(2, 9),
    message: `Merge branch '${targetBranchName}' into ${state.currentBranch}`,
    author: state.contributors.find((c) => c.id === state.activeContributorId)?.name || 'Keerthana M G',
    email: state.contributors.find((c) => c.id === state.activeContributorId)?.email || 'keerthanamg19@gmail.com',
    timestamp: 'just now',
    authorDate: new Date().toISOString(),
    committerDate: new Date().toISOString(),
    parentIds: [currentHeadSha, targetCommitSha],
    snapshot: {
      ...(state.commits[currentHeadSha]?.snapshot || {}),
      ...(targetCommit?.snapshot || {}),
    },
    branch: state.currentBranch,
    isMerge: true,
  };

  const nextState: SimulationState = {
    ...state,
    commits: { ...state.commits, [mergeSha]: mergeCommit },
    branches: {
      ...state.branches,
      [state.currentBranch]: {
        ...state.branches[state.currentBranch],
        commitId: mergeSha,
      },
    },
    headCommitId: mergeSha,
  };

  return {
    nextState,
    result: {
      command: cmd,
      success: true,
      status: 'success' as const,
      output: `Merge made by the 'ort' strategy.\n src/components/EventCard.jsx | 12 ++++++++++++\n 1 file changed, 12 insertions(+)`,
      explanation: `Three-way merge created merge commit node ${mergeSha} with two parent commits (${currentHeadSha} and ${targetCommitSha}). Both branches had diverged, so a dedicated integration commit was recorded.`,
      affected: {
        workingTreeChanged: true,
        stagingChanged: false,
        branchesChanged: true,
        headChanged: true,
        commitAdded: true,
        remoteChanged: false,
        filesAffected: ['src/components/EventCard.jsx'],
        summary: `Created 3-way merge commit [${mergeSha}] with 2 parents.`,
      },
    },
  };
}

function handleRebase(args: string[], cmd: string, state: SimulationState) {
  if (args.length === 0) {
    return {
      nextState: state,
      result: {
        command: cmd,
        success: false,
        status: 'error' as const,
        output: 'fatal: No target branch specified to rebase onto',
        explanation: 'git rebase requires the new base branch. Example: git rebase main',
        affected: createEmptyEffect(),
      },
    };
  }

  const targetBaseName = args[0];
  if (!state.branches[targetBaseName]) {
    return {
      nextState: state,
      result: {
        command: cmd,
        success: false,
        status: 'error' as const,
        output: `fatal: invalid upstream '${targetBaseName}'`,
        explanation: `Target branch "${targetBaseName}" does not exist.`,
        affected: createEmptyEffect(),
      },
    };
  }

  const baseCommitId = state.branches[targetBaseName].commitId;
  const currentHeadCommit = state.commits[state.headCommitId];

  // Replay commit with a NEW commit identity (SHA)!
  const rebasedSha = generateSha();
  const rebasedCommit: GitCommit = {
    ...currentHeadCommit,
    id: rebasedSha,
    fullSha: rebasedSha + 'fe72019481b' + Math.random().toString(36).substring(2, 9),
    parentIds: [baseCommitId],
    message: currentHeadCommit.message,
    timestamp: 'just now (rebased)',
    isRebased: true,
  };

  const nextCommits = { ...state.commits, [rebasedSha]: rebasedCommit };
  const nextBranches = {
    ...state.branches,
    [state.currentBranch]: {
      ...state.branches[state.currentBranch],
      commitId: rebasedSha,
    },
  };

  const nextState: SimulationState = {
    ...state,
    commits: nextCommits,
    branches: nextBranches,
    headCommitId: rebasedSha,
  };

  return {
    nextState,
    result: {
      command: cmd,
      success: true,
      status: 'success' as const,
      output: `Successfully rebased and updated refs/heads/${state.currentBranch}.\nReplayed 1 commit onto ${targetBaseName} (${baseCommitId}).\nNew commit identity: ${rebasedSha}`,
      explanation: `Rebase replayed your commits on top of "${targetBaseName}" (${baseCommitId}). Crucial concept: The rebased commit gets a completely NEW SHA (${rebasedSha}) because its parent pointer changed! Never rebase commits that have already been shared on a public repository.`,
      affected: {
        workingTreeChanged: true,
        stagingChanged: false,
        branchesChanged: true,
        headChanged: true,
        commitAdded: true,
        remoteChanged: false,
        filesAffected: Object.keys(rebasedCommit.snapshot),
        summary: `Rebased commits onto ${targetBaseName}. New commit SHA: ${rebasedSha}.`,
      },
      nextSteps: [
        'Inspect the linear commit graph without any merge bubble.',
        'If pushing to remote after rebase: requires "git push --force-with-lease".',
      ],
    },
  };
}

function handleDiff(args: string[], cmd: string, state: SimulationState) {
  const isCached = args.includes('--cached') || args.includes('--staged');
  const isHead = args.includes('HEAD');

  let output = '';
  if (isCached) {
    const staged = Object.values(state.files).filter((f) => f.status === 'staged');
    if (staged.length === 0) {
      output = '';
    } else {
      staged.forEach((f) => {
        output += `diff --git a/${f.path} b/${f.path}\nindex 100644\n--- a/${f.path}\n+++ b/${f.path}\n`;
        output += `@@ -1,4 +1,8 @@\n+ // Staged modifications ready for snapshot\n+ ${f.stagedContent?.split('\n')[0] || ''}\n`;
      });
    }
  } else {
    const modified = Object.values(state.files).filter((f) => f.status === 'modified');
    if (modified.length === 0) {
      output = '';
    } else {
      modified.forEach((f) => {
        output += `diff --git a/${f.path} b/${f.path}\nindex 100644\n--- a/${f.path}\n+++ b/${f.path}\n`;
        output += f.diff || `@@ -1,3 +1,5 @@\n- old line\n+ new line`;
        output += '\n';
      });
    }
  }

  return {
    nextState: state,
    result: {
      command: cmd,
      success: true,
      status: 'success' as const,
      output: output || '(no diff)',
      explanation: isCached
        ? 'Inspecting staged changes (index vs HEAD). These are the modifications that will be included in the next commit.'
        : 'Inspecting unstaged changes (working directory vs index).',
      affected: createEmptyEffect(),
    },
  };
}

function handleLog(args: string[], cmd: string, state: SimulationState) {
  const isOneLine = args.includes('--oneline');
  let output = '';

  let currId: string | undefined = state.headCommitId;
  const visited = new Set<string>();

  while (currId && state.commits[currId] && !visited.has(currId)) {
    visited.add(currId);
    const commitObj: GitCommit = state.commits[currId];
    const branchLabel = Object.values(state.branches)
      .filter((b) => b.commitId === commitObj.id)
      .map((b) => b.name)
      .join(', ');

    const refString =
      commitObj.id === state.headCommitId
        ? `\x1b[36m(HEAD -> \x1b[32m${state.currentBranch}\x1b[36m${branchLabel ? `, ${branchLabel}` : ''})\x1b[0m`
        : branchLabel
        ? `\x1b[33m(${branchLabel})\x1b[0m`
        : '';

    if (isOneLine) {
      output += `\x1b[33m${commitObj.id}\x1b[0m ${refString} ${commitObj.message}\n`;
    } else {
      output += `commit \x1b[33m${commitObj.fullSha}\x1b[0m ${refString}\n`;
      output += `Author: ${commitObj.author} <${commitObj.email}>\n`;
      output += `Date:   ${commitObj.authorDate || commitObj.timestamp}\n\n`;
      output += `    ${commitObj.message}\n\n`;
    }

    currId = commitObj.parentIds[0];
  }

  return {
    nextState: state,
    result: {
      command: cmd,
      success: true,
      status: 'success' as const,
      output,
      explanation: `Traversed Directed Acyclic Graph (DAG) backwards starting from current HEAD (${state.headCommitId}).`,
      affected: createEmptyEffect(),
    },
  };
}

function handleStash(args: string[], cmd: string, state: SimulationState) {
  const sub = args[0] || 'push';

  if (sub === 'list') {
    if (state.stashes.length === 0) {
      return {
        nextState: state,
        result: {
          command: cmd,
          success: true,
          status: 'success' as const,
          output: '',
          explanation: 'Stash list is currently empty. No shelved working directory changes.',
          affected: createEmptyEffect(),
        },
      };
    }

    const output = state.stashes
      .map((s, idx) => `stash@{${idx}}: ${s.branch}: ${s.message}`)
      .join('\n');

    return {
      nextState: state,
      result: {
        command: cmd,
        success: true,
        status: 'success' as const,
        output,
        explanation: `Listed ${state.stashes.length} stashed snapshot(s).`,
        affected: createEmptyEffect(),
      },
    };
  }

  if (sub === 'pop' || sub === 'apply') {
    if (state.stashes.length === 0) {
      return {
        nextState: state,
        result: {
          command: cmd,
          success: false,
          status: 'error' as const,
          output: 'error: No stash entries found.',
          explanation: 'Cannot pop or apply: the stash stack is empty.',
          affected: createEmptyEffect(),
        },
      };
    }

    const popped = state.stashes[0];
    const newFiles = { ...state.files };

    Object.keys(popped.files).forEach((p) => {
      const sf = popped.files[p];
      newFiles[p] = {
        path: p,
        content: sf.content,
        stagedContent: sf.stagedContent,
        status: sf.status,
      };
    });

    const nextStashes = sub === 'pop' ? state.stashes.slice(1) : state.stashes;

    return {
      nextState: {
        ...state,
        files: newFiles,
        stashes: nextStashes,
      },
      result: {
        command: cmd,
        success: true,
        status: 'success' as const,
        output: `On branch ${state.currentBranch}\nChanges not staged for commit:\n\tmodified:   src/App.jsx\n${sub === 'pop' ? 'Dropped refs/stash@{0}' : ''}`,
        explanation: `Restored dirty working directory modifications from stash@{0} ("${popped.message}"). ${sub === 'pop' ? 'Removed entry from stash stack.' : 'Retained entry in stash.'}`,
        affected: {
          workingTreeChanged: true,
          stagingChanged: true,
          branchesChanged: false,
          headChanged: false,
          commitAdded: false,
          remoteChanged: false,
          filesAffected: Object.keys(popped.files),
          summary: `Restored files from stash.`,
        },
      },
    };
  }

  // Push stash
  const modifiedFiles = Object.values(state.files).filter(
    (f) => f.status === 'modified' || f.status === 'staged'
  );

  if (modifiedFiles.length === 0) {
    return {
      nextState: state,
      result: {
        command: cmd,
        success: true,
        status: 'warning' as const,
        output: 'No local changes to save',
        explanation: 'Working tree is clean. Nothing to stash.',
        affected: createEmptyEffect(),
      },
    };
  }

  const msgIdx = args.indexOf('-m');
  const stashMsg = msgIdx !== -1 && args[msgIdx + 1] ? args[msgIdx + 1] : 'WIP on ' + state.currentBranch;

  const stashedFilesMap: Record<string, { status: any; content: string; stagedContent?: string }> = {};
  const cleanedFiles = { ...state.files };

  modifiedFiles.forEach((f) => {
    stashedFilesMap[f.path] = {
      status: f.status,
      content: f.content,
      stagedContent: f.stagedContent,
    };
    cleanedFiles[f.path] = {
      ...f,
      status: 'committed',
      content: f.committedContent || f.content,
      stagedContent: undefined,
      diff: undefined,
    };
  });

  const newStash: GitStash = {
    id: `stash-${Date.now()}`,
    index: 0,
    message: stashMsg,
    branch: state.currentBranch,
    files: stashedFilesMap,
    timestamp: Date.now(),
  };

  const nextState: SimulationState = {
    ...state,
    files: cleanedFiles,
    stashes: [newStash, ...state.stashes],
  };

  return {
    nextState,
    result: {
      command: cmd,
      success: true,
      status: 'success' as const,
      output: `Saved working directory and index state "${stashMsg}"\nHEAD is now at ${state.headCommitId}`,
      explanation: `Shelved ${modifiedFiles.length} modified/staged file(s) into stash stack and reset working tree to clean HEAD state. You can now safely pull or switch branches!`,
      affected: {
        workingTreeChanged: true,
        stagingChanged: true,
        branchesChanged: false,
        headChanged: false,
        commitAdded: false,
        remoteChanged: false,
        filesAffected: modifiedFiles.map((f) => f.path),
        summary: `Shelved uncommitted changes into stash@{0}.`,
      },
      nextSteps: [
        'Perform your pull or branch switch on a clean directory.',
        'Run "git stash pop" when you are ready to resume work.',
      ],
    },
  };
}

function handleReset(args: string[], cmd: string, state: SimulationState) {
  const isSoft = args.includes('--soft');
  const isHard = args.includes('--hard');
  const isMixed = args.includes('--mixed') || (!isSoft && !isHard);

  const targetSha = args.find((a) => !a.startsWith('-')) || 'HEAD~1';
  let resolvedSha = targetSha;

  if (targetSha === 'HEAD~1') {
    const parentId = state.commits[state.headCommitId]?.parentIds[0];
    if (!parentId) {
      return {
        nextState: state,
        result: {
          command: cmd,
          success: false,
          status: 'error' as const,
          output: 'fatal: cannot do HEAD~1 on initial commit',
          explanation: 'There is no parent commit prior to the initial commit.',
          affected: createEmptyEffect(),
        },
      };
    }
    resolvedSha = parentId;
  }

  if (!state.commits[resolvedSha]) {
    return {
      nextState: state,
      result: {
        command: cmd,
        success: false,
        status: 'error' as const,
        output: `fatal: ambiguous argument '${targetSha}': unknown revision`,
        explanation: `Commit revision "${targetSha}" could not be resolved.`,
        affected: createEmptyEffect(),
      },
    };
  }

  const targetCommit = state.commits[resolvedSha];
  const newFiles = { ...state.files };

  if (isHard) {
    // Hard: discard working tree and staging, snap to target commit
    Object.keys(targetCommit.snapshot).forEach((p) => {
      newFiles[p] = {
        path: p,
        content: targetCommit.snapshot[p],
        committedContent: targetCommit.snapshot[p],
        status: 'committed',
      };
    });
  } else if (isMixed) {
    // Mixed: unstage all changes, keep working tree
    Object.keys(newFiles).forEach((p) => {
      if (newFiles[p].status === 'staged') {
        newFiles[p] = {
          ...newFiles[p],
          status: 'modified',
          stagedContent: undefined,
        };
      }
    });
  }
  // Soft: leave working tree and staging untouched!

  const nextBranches = { ...state.branches };
  if (!state.detachedHead && state.branches[state.currentBranch]) {
    nextBranches[state.currentBranch] = {
      ...state.branches[state.currentBranch],
      commitId: resolvedSha,
    };
  }

  const newReflog: GitReflogEntry = {
    id: `ref-${Date.now()}`,
    index: 0,
    selector: 'HEAD@{0}',
    action: `reset: moving to ${resolvedSha}`,
    fromSha: state.headCommitId,
    toSha: resolvedSha,
    message: `reset --${isHard ? 'hard' : isSoft ? 'soft' : 'mixed'} ${targetSha}`,
    timestamp: 'just now',
  };

  const nextState: SimulationState = {
    ...state,
    files: newFiles,
    branches: nextBranches,
    headCommitId: resolvedSha,
    reflog: [newReflog, ...state.reflog.map((r, idx) => ({ ...r, index: idx + 1 }))],
  };

  return {
    nextState,
    result: {
      command: cmd,
      success: true,
      status: isHard ? ('warning' as const) : ('success' as const),
      output: `HEAD is now at ${resolvedSha} ${targetCommit.message}`,
      explanation: isHard
        ? `[DANGEROUS] git reset --hard moved HEAD and current branch to ${resolvedSha}. All working directory and staging modifications were permanently discarded!`
        : isSoft
        ? `git reset --soft moved HEAD and current branch to ${resolvedSha}. All files from discarded commits remain staged in the index ready for re-committing!`
        : `git reset --mixed moved HEAD and current branch to ${resolvedSha}. Changes were unstaged but preserved in your working tree.`,
      affected: {
        workingTreeChanged: isHard,
        stagingChanged: isHard || isMixed,
        branchesChanged: !state.detachedHead,
        headChanged: true,
        commitAdded: false,
        remoteChanged: false,
        filesAffected: Object.keys(targetCommit.snapshot),
        summary: `Reset HEAD pointer to ${resolvedSha} (${isHard ? 'hard' : isSoft ? 'soft' : 'mixed'}).`,
      },
      nextSteps: isHard
        ? ['If this was a mistake, use "git reflog" and "git reset --hard HEAD@{1}" to recover!']
        : ['Inspect status with "git status".'],
    },
  };
}

function handleRevert(args: string[], cmd: string, state: SimulationState) {
  const targetSha = args[0] || state.headCommitId;
  const targetCommit = state.commits[targetSha];

  if (!targetCommit) {
    return {
      nextState: state,
      result: {
        command: cmd,
        success: false,
        status: 'error' as const,
        output: `fatal: bad revision '${targetSha}'`,
        explanation: `Commit revision "${targetSha}" not found.`,
        affected: createEmptyEffect(),
      },
    };
  }

  const revertSha = generateSha();
  const revertMsg = `Revert "${targetCommit.message}"`;

  // Find parent commit to restore that state
  const parentSha = targetCommit.parentIds[0];
  const parentCommit = parentSha ? state.commits[parentSha] : null;

  const restoredSnapshot = parentCommit ? parentCommit.snapshot : targetCommit.snapshot;

  const newCommit: GitCommit = {
    id: revertSha,
    fullSha: revertSha + '89a01f92e7' + Math.random().toString(36).substring(2, 9),
    message: revertMsg,
    author: 'Keerthana M G',
    email: 'keerthanamg19@gmail.com',
    timestamp: 'just now',
    authorDate: new Date().toISOString(),
    committerDate: new Date().toISOString(),
    parentIds: [state.headCommitId],
    snapshot: restoredSnapshot,
    branch: state.currentBranch,
  };

  const nextBranches = { ...state.branches };
  if (!state.detachedHead && state.branches[state.currentBranch]) {
    nextBranches[state.currentBranch] = {
      ...state.branches[state.currentBranch],
      commitId: revertSha,
    };
  }

  const nextState: SimulationState = {
    ...state,
    commits: { ...state.commits, [revertSha]: newCommit },
    branches: nextBranches,
    headCommitId: revertSha,
  };

  return {
    nextState,
    result: {
      command: cmd,
      success: true,
      status: 'success' as const,
      output: `[${state.currentBranch} ${revertSha}] ${revertMsg}\n 1 file changed, 4 deletions(-)`,
      explanation: `git revert safely created a forward-moving commit (${revertSha}) that inverts the changes of commit ${targetSha}. Unlike reset, revert does NOT rewrite history, making it completely safe for shared public branches!`,
      affected: {
        workingTreeChanged: true,
        stagingChanged: false,
        branchesChanged: true,
        headChanged: true,
        commitAdded: true,
        remoteChanged: false,
        filesAffected: Object.keys(restoredSnapshot),
        summary: `Created revert commit [${revertSha}].`,
      },
    },
  };
}

function handleCherryPick(args: string[], cmd: string, state: SimulationState) {
  const targetSha = args[0];
  if (!targetSha || !state.commits[targetSha]) {
    return {
      nextState: state,
      result: {
        command: cmd,
        success: false,
        status: 'error' as const,
        output: `fatal: bad revision '${targetSha || ''}'`,
        explanation: 'git cherry-pick requires a valid commit SHA to copy. Example: git cherry-pick d92a471',
        affected: createEmptyEffect(),
      },
    };
  }

  const pickedCommit = state.commits[targetSha];
  const newSha = generateSha();

  const newCommit: GitCommit = {
    ...pickedCommit,
    id: newSha,
    fullSha: newSha + 'aa819273c0' + Math.random().toString(36).substring(2, 9),
    parentIds: [state.headCommitId],
    message: pickedCommit.message,
    timestamp: 'just now (cherry-picked)',
    branch: state.currentBranch,
  };

  const nextBranches = { ...state.branches };
  if (!state.detachedHead && state.branches[state.currentBranch]) {
    nextBranches[state.currentBranch] = {
      ...state.branches[state.currentBranch],
      commitId: newSha,
    };
  }

  const nextState: SimulationState = {
    ...state,
    commits: { ...state.commits, [newSha]: newCommit },
    branches: nextBranches,
    headCommitId: newSha,
  };

  return {
    nextState,
    result: {
      command: cmd,
      success: true,
      status: 'success' as const,
      output: `[${state.currentBranch} ${newSha}] ${pickedCommit.message}\n Date: ${pickedCommit.authorDate || 'today'}\n 1 file changed, 10 insertions(+)`,
      explanation: `Cherry-pick took the patch changes from commit ${targetSha} and applied them onto the current branch (${state.currentBranch}), generating new commit node ${newSha}.`,
      affected: {
        workingTreeChanged: true,
        stagingChanged: false,
        branchesChanged: true,
        headChanged: true,
        commitAdded: true,
        remoteChanged: false,
        filesAffected: Object.keys(pickedCommit.snapshot),
        summary: `Cherry-picked commit patch as new commit [${newSha}].`,
      },
    },
  };
}

function handlePush(args: string[], cmd: string, state: SimulationState) {
  const origin = state.remotes.origin;
  const currentBranchName = state.currentBranch;

  // Rejected push simulation: If contributor has not pulled changes that exist on remote!
  const remoteCommitOnBranch = origin.branches[currentBranchName];
  const isUpToDate = remoteCommitOnBranch === state.headCommitId;

  if (isUpToDate) {
    return {
      nextState: state,
      result: {
        command: cmd,
        success: true,
        status: 'success' as const,
        output: 'Everything up-to-date',
        explanation: `Remote repository "origin/${currentBranchName}" is already synchronized with local HEAD (${state.headCommitId}).`,
        affected: createEmptyEffect(),
      },
    };
  }

  // Update remote tracking
  const nextOriginBranches = {
    ...origin.branches,
    [currentBranchName]: state.headCommitId,
  };

  const nextState: SimulationState = {
    ...state,
    remotes: {
      ...state.remotes,
      origin: {
        ...origin,
        branches: nextOriginBranches,
      },
    },
  };

  return {
    nextState,
    result: {
      command: cmd,
      success: true,
      status: 'success' as const,
      output: `Enumerating objects: 5, done.\nCounting objects: 100% (5/5), done.\nWriting objects: 100% (3/3), 420 bytes | 420.00 KiB/s, done.\nTotal 3 (delta 1), reused 0 (delta 0)\nTo ${origin.url}\n   ${remoteCommitOnBranch?.substring(0, 7) || 'new'}..${state.headCommitId}  ${currentBranchName} -> ${currentBranchName}`,
      explanation: `Transferred local commit(s) up to ${state.headCommitId} to remote repository branch "origin/${currentBranchName}". Remote tracking reference updated.`,
      affected: {
        ...createEmptyEffect(),
        remoteChanged: true,
        summary: `Synchronized branch "${currentBranchName}" with simulated remote origin.`,
      },
      nextSteps: [
        'Visit the GitHub Collaboration tab to open a Pull Request.',
      ],
    },
  };
}

function handlePull(args: string[], cmd: string, state: SimulationState) {
  const origin = state.remotes.origin;
  const remoteCommitId = origin.branches[state.currentBranch];

  if (!remoteCommitId || remoteCommitId === state.headCommitId) {
    return {
      nextState: state,
      result: {
        command: cmd,
        success: true,
        status: 'success' as const,
        output: 'Already up to date.',
        explanation: `git pull (fetch + merge) verified local branch "${state.currentBranch}" is already up to date with origin/${state.currentBranch}.`,
        affected: createEmptyEffect(),
      },
    };
  }

  // Fast forward pull
  const nextBranches = {
    ...state.branches,
    [state.currentBranch]: {
      ...state.branches[state.currentBranch],
      commitId: remoteCommitId,
    },
  };

  const nextState: SimulationState = {
    ...state,
    branches: nextBranches,
    headCommitId: remoteCommitId,
  };

  return {
    nextState,
    result: {
      command: cmd,
      success: true,
      status: 'success' as const,
      output: `Updating ${state.headCommitId}..${remoteCommitId}\nFast-forward\n README.md | 2 +-\n 1 file changed, 1 insertion(+), 1 deletion(-)`,
      explanation: `Pulled latest changes from remote. Combined "git fetch origin" with "git merge origin/${state.currentBranch}".`,
      affected: {
        workingTreeChanged: true,
        stagingChanged: false,
        branchesChanged: true,
        headChanged: true,
        commitAdded: false,
        remoteChanged: false,
        filesAffected: ['README.md'],
        summary: `Updated local branch from remote origin/${state.currentBranch}.`,
      },
    },
  };
}

function handleFetch(args: string[], cmd: string, state: SimulationState) {
  const origin = state.remotes.origin;
  return {
    nextState: state,
    result: {
      command: cmd,
      success: true,
      status: 'success' as const,
      output: `From ${origin.url}\n * [new branch]      main       -> origin/main\n * [new branch]      feature/events -> origin/feature/events`,
      explanation: 'git fetch downloaded remote branches and objects into remote-tracking branches (origin/*) WITHOUT modifying your local working files or current branch HEAD.',
      affected: {
        ...createEmptyEffect(),
        remoteChanged: true,
        summary: 'Fetched remote references into local cache without moving HEAD.',
      },
      nextSteps: [
        'Run "git log HEAD..origin/main" to see incoming remote commits.',
        'Run "git merge origin/main" or "git pull" to integrate.',
      ],
    },
  };
}

function handleRestore(args: string[], cmd: string, state: SimulationState) {
  const isStaged = args.includes('--staged');
  const target = args.find((a) => !a.startsWith('-'));

  if (!target) {
    return {
      nextState: state,
      result: {
        command: cmd,
        success: false,
        status: 'error' as const,
        output: 'fatal: you must specify path(s) to restore',
        explanation: 'Specify the file to restore. Example: git restore src/App.jsx or git restore --staged src/App.jsx',
        affected: createEmptyEffect(),
      },
    };
  }

  const file = state.files[target];
  if (!file) {
    return {
      nextState: state,
      result: {
        command: cmd,
        success: false,
        status: 'error' as const,
        output: `error: pathspec '${target}' did not match any file(s) known to git`,
        explanation: `File "${target}" was not found.`,
        affected: createEmptyEffect(),
      },
    };
  }

  const newFiles = { ...state.files };

  if (isStaged) {
    newFiles[target] = {
      ...file,
      status: 'modified',
      stagedContent: undefined,
    };
  } else {
    newFiles[target] = {
      ...file,
      status: 'committed',
      content: file.committedContent || file.content,
      diff: undefined,
    };
  }

  const nextState: SimulationState = {
    ...state,
    files: newFiles,
  };

  return {
    nextState,
    result: {
      command: cmd,
      success: true,
      status: 'success' as const,
      output: '',
      explanation: isStaged
        ? `Unstaged "${target}". The file's modifications remain in your working directory but removed from the index.`
        : `Discarded working directory modifications in "${target}". Content reverted back to HEAD state.`,
      affected: {
        workingTreeChanged: !isStaged,
        stagingChanged: isStaged,
        branchesChanged: false,
        headChanged: false,
        commitAdded: false,
        remoteChanged: false,
        filesAffected: [target],
        summary: isStaged ? `Unstaged ${target}.` : `Restored ${target} to clean HEAD state.`,
      },
    },
  };
}

function handleRm(args: string[], cmd: string, state: SimulationState) {
  const isCached = args.includes('--cached');
  const target = args.find((a) => !a.startsWith('-'));

  if (!target || !state.files[target]) {
    return {
      nextState: state,
      result: {
        command: cmd,
        success: false,
        status: 'error' as const,
        output: `fatal: pathspec '${target || ''}' did not match any files`,
        explanation: 'File not found to remove.',
        affected: createEmptyEffect(),
      },
    };
  }

  const newFiles = { ...state.files };
  if (isCached) {
    // Only untrack
    newFiles[target] = {
      ...newFiles[target],
      status: 'untracked',
      stagedContent: undefined,
    };
  } else {
    delete newFiles[target];
  }

  return {
    nextState: { ...state, files: newFiles },
    result: {
      command: cmd,
      success: true,
      status: 'success' as const,
      output: `rm '${target}'`,
      explanation: isCached
        ? `Untracked "${target}" from Git index while preserving file in working directory.`
        : `Removed "${target}" from both working tree and staging area.`,
      affected: {
        workingTreeChanged: !isCached,
        stagingChanged: true,
        branchesChanged: false,
        headChanged: false,
        commitAdded: false,
        remoteChanged: false,
        filesAffected: [target],
        summary: `Removed ${target} from tracking.`,
      },
    },
  };
}

function handleReflog(cmd: string, state: SimulationState) {
  const output = state.reflog
    .map((r) => `\x1b[33m${r.toSha}\x1b[0m \x1b[34m${r.selector}\x1b[0m: ${r.action}: ${r.message}`)
    .join('\n');

  return {
    nextState: state,
    result: {
      command: cmd,
      success: true,
      status: 'success' as const,
      output,
      explanation: 'Reflog (reference log) records every time HEAD changed position (commits, checkouts, resets, rebases). Even if commits were reset or branches deleted, they remain accessible in the reflog for 30–90 days!',
      affected: createEmptyEffect(),
    },
  };
}

function handleTag(args: string[], cmd: string, state: SimulationState) {
  if (args.length === 0) {
    const output = Object.keys(state.tags).join('\n');
    return {
      nextState: state,
      result: {
        command: cmd,
        success: true,
        status: 'success' as const,
        output,
        explanation: 'Listed all repository tags.',
        affected: createEmptyEffect(),
      },
    };
  }

  const tagName = args[0];
  const newTag = {
    name: tagName,
    commitId: state.headCommitId,
    date: new Date().toISOString().split('T')[0],
  };

  return {
    nextState: {
      ...state,
      tags: { ...state.tags, [tagName]: newTag },
    },
    result: {
      command: cmd,
      success: true,
      status: 'success' as const,
      output: '',
      explanation: `Created tag "${tagName}" at commit ${state.headCommitId}. Unlike branches, tags are permanent pointers that do not move when new commits are created.`,
      affected: {
        ...createEmptyEffect(),
        summary: `Created release tag "${tagName}".`,
      },
    },
  };
}

function handleRemote(args: string[], cmd: string, state: SimulationState) {
  const isVerbose = args.some(
    (a) => a.toLowerCase() === '-v' || a.toLowerCase() === '--verbose' || a === '-v' || a === '-V'
  );
  const remotes = state.remotes && Object.keys(state.remotes).length > 0
    ? state.remotes
    : {
        origin: {
          name: 'origin',
          url: 'https://github.com/techfest-engineering/college-fest-portal.git',
          branches: { main: 'c83d105', 'feature/events': 'd92a471' },
        },
      };

  if (args.length === 0) {
    return {
      nextState: { ...state, remotes },
      result: {
        command: cmd,
        success: true,
        status: 'success' as const,
        output: Object.keys(remotes).join('\n'),
        explanation: 'Listed configured remote repository names. "origin" is the standard default remote nickname.',
        affected: createEmptyEffect(),
      },
    };
  }

  if (isVerbose) {
    let output = '';
    Object.entries(remotes).forEach(([name, rem]) => {
      output += `${name}\t${rem.url} (fetch)\n${name}\t${rem.url} (push)\n`;
    });

    return {
      nextState: { ...state, remotes },
      result: {
        command: cmd,
        success: true,
        status: 'success' as const,
        output: output.trimEnd(),
        explanation: 'Listed remote connections with fetch and push URLs. In Git, "fetch" is where you pull code from, and "push" is where your team contributions get published.',
        affected: createEmptyEffect(),
      },
    };
  }

  if (args[0] === 'show') {
    const remoteName = args[1] || 'origin';
    const rem = state.remotes[remoteName] || origin;
    const output = `* remote ${remoteName}\n  Fetch URL: ${rem.url}\n  Push  URL: ${rem.url}\n  HEAD branch: ${state.currentBranch}\n  Remote branches:\n    main tracked\n    feature/events tracked\n  Local branches configured for 'git pull':\n    main merges with remote main\n  Local refs configured for 'git push':\n    main pushes to main (up to date)`;

    return {
      nextState: state,
      result: {
        command: cmd,
        success: true,
        status: 'success' as const,
        output,
        explanation: `Displayed detailed tracking information for remote "${remoteName}".`,
        affected: createEmptyEffect(),
      },
    };
  }

  if (args[0] === 'add') {
    const newName = args[1];
    const newUrl = args[2] || 'https://github.com/student/my-repo.git';
    if (!newName) {
      return {
        nextState: state,
        result: {
          command: cmd,
          success: false,
          status: 'error' as const,
          output: 'fatal: usage: git remote add <name> <url>',
          explanation: 'Specify the remote name and URL.',
          affected: createEmptyEffect(),
        },
      };
    }

    const nextRemotes = {
      ...state.remotes,
      [newName]: {
        name: newName,
        url: newUrl,
        branches: {},
      },
    };

    return {
      nextState: { ...state, remotes: nextRemotes },
      result: {
        command: cmd,
        success: true,
        status: 'success' as const,
        output: '',
        explanation: `Added new remote "${newName}" pointing to ${newUrl}.`,
        affected: {
          ...createEmptyEffect(),
          remoteChanged: true,
          summary: `Added remote repository "${newName}".`,
        },
      },
    };
  }

  return {
    nextState: state,
    result: {
      command: cmd,
      success: true,
      status: 'success' as const,
      output: Object.keys(state.remotes).join('\n') || 'origin',
      explanation: 'Remote command executed.',
      affected: createEmptyEffect(),
    },
  };
}

function handleBisect(args: string[], cmd: string, state: SimulationState) {
  const sub = args[0];

  if (sub === 'start') {
    return {
      nextState: {
        ...state,
        bisect: {
          active: true,
          goodSha: null,
          badSha: null,
          currentTestSha: state.headCommitId,
          stepsRemaining: 3,
          candidateShas: Object.keys(state.commits),
          identifiedCulprit: null,
        },
      },
      result: {
        command: cmd,
        success: true,
        status: 'success' as const,
        output: 'status: waiting for both good and bad commits\nRun "git bisect bad" to mark current commit as buggy\nRun "git bisect good <commit>" to specify a known working commit',
        explanation: 'git bisect uses binary search through history to isolate the specific commit that introduced a bug in O(log N) evaluations.',
        affected: createEmptyEffect(),
      },
    };
  }

  if (sub === 'reset') {
    return {
      nextState: {
        ...state,
        bisect: {
          active: false,
          goodSha: null,
          badSha: null,
          currentTestSha: null,
          stepsRemaining: 0,
          candidateShas: [],
          identifiedCulprit: null,
        },
      },
      result: {
        command: cmd,
        success: true,
        status: 'success' as const,
        output: `Bisect session ended. Checked out branch '${state.currentBranch}'.`,
        explanation: 'git bisect reset returned HEAD to original branch position.',
        affected: createEmptyEffect(),
      },
    };
  }

  return {
    nextState: state,
    result: {
      command: cmd,
      success: true,
      status: 'success' as const,
      output: `Bisect step recorded. Testing commit ${state.headCommitId}...`,
      explanation: 'Binary search narrowed the candidate commits by half.',
      affected: createEmptyEffect(),
    },
  };
}

function handleGhCommand(parts: string[], state: SimulationState) {
  const sub = parts[1];
  const target = parts[2];

  if (sub === 'pr') {
    if (target === 'list' || !target) {
      const output = state.pullRequests
        .map((pr) => `#${pr.number}  ${pr.title}  ${pr.sourceBranch}  ${pr.status.toUpperCase()}`)
        .join('\n');

      return {
        nextState: state,
        result: {
          command: parts.join(' '),
          success: true,
          status: 'success' as const,
          output,
          explanation: 'GitHub CLI queried open pull requests for this repository.',
          affected: createEmptyEffect(),
        },
      };
    }

    if (target === 'checks') {
      const pr = state.pullRequests[0];
      const output = pr.checks
        .map((c) => `✓  ${c.name}  (${c.duration})`)
        .join('\n');

      return {
        nextState: state,
        result: {
          command: parts.join(' '),
          success: true,
          status: 'success' as const,
          output: `Checks for PR #${pr.number} (${pr.title}):\n${output}`,
          explanation: 'Inspected GitHub Actions CI checks for pull request.',
          affected: createEmptyEffect(),
        },
      };
    }

    if (target === 'merge') {
      const prNum = parseInt(parts[3]?.replace('#', '') || '14', 10);
      const pr = state.pullRequests.find((p) => p.number === prNum);

      if (!pr) {
        return {
          nextState: state,
          result: {
            command: parts.join(' '),
            success: false,
            status: 'error' as const,
            output: `Pull request #${prNum} not found`,
            explanation: 'Check PR number using "gh pr list".',
            affected: createEmptyEffect(),
          },
        };
      }

      if (pr.conflict) {
        return {
          nextState: state,
          result: {
            command: parts.join(' '),
            success: false,
            status: 'error' as const,
            output: `Pull request #${pr.number} cannot be merged due to merge conflicts. Resolve conflicts first.`,
            explanation: 'PR has unresolved conflicts with target branch.',
            affected: createEmptyEffect(),
          },
        };
      }

      const updatedPrs = state.pullRequests.map((p) =>
        p.number === prNum ? { ...p, status: 'merged' as const } : p
      );

      return {
        nextState: { ...state, pullRequests: updatedPrs },
        result: {
          command: parts.join(' '),
          success: true,
          status: 'success' as const,
          output: `✓ Merged Pull Request #${pr.number} (${pr.title}) into ${pr.targetBranch}`,
          explanation: `GitHub PR #${pr.number} was successfully merged and closed.`,
          affected: {
            ...createEmptyEffect(),
            remoteChanged: true,
            summary: `Merged Pull Request #${pr.number}.`,
          },
        },
      };
    }
  }

  return {
    nextState: state,
    result: {
      command: parts.join(' '),
      success: true,
      status: 'success' as const,
      output: `gh ${sub || 'help'}: GitHub CLI interactive response`,
      explanation: 'GitHub CLI simulation executed.',
      affected: createEmptyEffect(),
    },
  };
}

export function resolveConflictInFile(
  state: SimulationState,
  filePath: string,
  resolvedContent: string
): SimulationState {
  const currentFile = state.files[filePath];
  if (!currentFile) return state;

  const updatedFile: GitFile = {
    ...currentFile,
    content: resolvedContent,
    stagedContent: resolvedContent,
    status: 'staged',
    conflict: undefined,
  };

  return {
    ...state,
    files: {
      ...state.files,
      [filePath]: updatedFile,
    },
    activeConflict: null,
  };
}
