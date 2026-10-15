export interface TroubleshootingNode {
  id: string;
  scenario: string;
  category: 'Commit Panic' | 'Sync & Remote' | 'Branch & HEAD' | 'Secrets & Safety';
  symptom: string;
  rootCause: string;
  recommendedSteps: string[];
  safeAlternative: string;
  riskRating: 'low' | 'medium' | 'high';
}

export const GITHUB_STATUS_COMPARISON = {
  title: 'git status vs GitHub Status: Never Confuse the Two',
  localGitStatus: {
    name: 'git status (Command)',
    scope: 'Your local machine & current working directory only',
    purpose: 'Inspects uncommitted changes, staged index files, and how your local branch compares to remote-tracking refs.',
    networkRequired: false,
    exampleOutput: 'On branch main\nChanges not staged for commit:\n  modified: src/App.jsx',
  },
  cloudGitHubStatus: {
    name: 'GitHub Status (Service Health)',
    scope: 'GitHub cloud infrastructure globally (Git operations, Pull Requests, Webhooks, Actions, Copilot)',
    purpose: 'Checks if GitHub servers are experiencing an outage, high latency, or operational incidents.',
    networkRequired: true,
    officialUrl: 'https://www.githubstatus.com/',
  },
  takeaway: 'If "git push" fails with an authentication error or non-fast-forward reject, that is a local repository condition—not a GitHub outage! Check githubstatus.com only when GitHub APIs return 500 errors, SSH times out, or Actions runners are stalled globally.',
};

export const TROUBLESHOOTING_GUIDES: TroubleshootingNode[] = [
  {
    id: 'tb-1',
    scenario: 'I accidentally made commits directly on "main" instead of a feature branch!',
    category: 'Commit Panic',
    symptom: 'You made 2 commits on "main", but company policy requires feature branches and pull requests.',
    rootCause: 'Forgot to run "git switch -c <branch>" before writing and committing code.',
    recommendedSteps: [
      '1. Create a new branch pointing to current HEAD: "git branch feature/my-work"',
      '2. Reset local main back to the remote tracking commit: "git reset --hard origin/main"',
      '3. Switch to your new feature branch: "git switch feature/my-work"',
      '4. All your commits are safely preserved on the new feature branch!',
    ],
    safeAlternative: 'Never force-push to main to erase commits; use branch pointers to rescue them.',
    riskRating: 'medium',
  },
  {
    id: 'tb-2',
    scenario: 'Rejected push! [rejected - non-fast-forward]',
    category: 'Sync & Remote',
    symptom: 'Terminal reports: "Updates were rejected because the remote contains work that you do not have locally."',
    rootCause: 'A teammate pushed commits to the remote branch while you were working locally. Your history has diverged.',
    recommendedSteps: [
      '1. DO NOT run "git push --force" (this will destroy your teammate\'s commits!).',
      '2. Fetch remote changes: "git fetch origin"',
      '3. Either rebase your commits on top of origin: "git pull --rebase origin <branch>"',
      '4. Or merge origin: "git merge origin/<branch>"',
      '5. Once reconciled, push normally: "git push origin <branch>"',
    ],
    safeAlternative: 'If rebasing requires a force-push, always use "git push --force-with-lease" so it will fail safely if another person pushed new commits.',
    riskRating: 'medium',
  },
  {
    id: 'tb-3',
    scenario: 'I ran "git reset --hard" and my latest commit vanished!',
    category: 'Commit Panic',
    symptom: 'Working directory changed and recent commits are missing from "git log".',
    rootCause: 'Hard reset rewound the branch pointer and dropped uncommitted files.',
    recommendedSteps: [
      '1. Run "git reflog" to inspect the chronological reference history.',
      '2. Find the commit right before the reset (look for "commit: <message>" or HEAD@{1}).',
      '3. Restore your branch to that commit: "git reset --hard HEAD@{1}" (or the exact SHA).',
      '4. Your lost commit is back in the branch graph!',
    ],
    safeAlternative: 'Before running any reset, create a backup tag or branch: "git branch backup-safe".',
    riskRating: 'high',
  },
  {
    id: 'tb-4',
    scenario: 'You are in "detached HEAD" state',
    category: 'Branch & HEAD',
    symptom: 'Git says: "You are in \'detached HEAD\' state. HEAD is now at <sha>".',
    rootCause: 'You checked out a commit hash or remote tag directly instead of a branch name.',
    recommendedSteps: [
      '1. If you just wanted to look around: run "git switch main" (or your branch name) to return.',
      '2. If you made experimental commits you want to keep: run "git switch -c new-feature-name". This attaches a branch name to the commits.',
    ],
    safeAlternative: 'Always use "git switch <branch>" rather than "git checkout <commit>" unless explicitly inspecting historical snapshots.',
    riskRating: 'low',
  },
  {
    id: 'tb-5',
    scenario: 'I accidentally committed an API Key or .env secret file!',
    category: 'Secrets & Safety',
    symptom: 'Secret token is now embedded in Git commit history.',
    rootCause: 'Secret file was added before being listed in .gitignore.',
    recommendedSteps: [
      '1. Immediately REVOKE and regenerate the secret key in the provider console (OpenAI, AWS, Gemini, Stripe). Assume it is already compromised if pushed.',
      '2. Add the file to .gitignore.',
      '3. Untrack the file without deleting local copy: "git rm --cached .env"',
      '4. If not pushed yet: run "git commit --amend" or "git rebase -i" to remove it from the commit snapshot.',
      '5. If already pushed: use "git filter-repo" or BFG Repo-Cleaner to rewrite history, but always revoke the key first.',
    ],
    safeAlternative: 'Use environment variables and .env.example templates; never store real tokens in source code.',
    riskRating: 'high',
  },
];
