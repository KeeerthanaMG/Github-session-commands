import { Challenge, SimulationState } from '../types/git';

export const CHALLENGES: Challenge[] = [
  {
    id: 'ch-1',
    title: 'Mission 1: First Flight (Stage & Commit)',
    category: 'The Basics',
    difficulty: 'Beginner',
    timeEstimate: '2 mins',
    studentAnalogy: 'Think of this like putting your exam paper into an envelope (staging) and sealing it with your signature (committing).',
    objective: 'Stage the modified file "src/App.jsx" and commit it with a clear message.',
    initialSetupDescription: 'The file "src/App.jsx" has been edited, but is not yet staged or saved in Git history.',
    hints: [
      'Step 1: Check what is modified with "git status".',
      'Step 2: Put the file in the staging area with "git add src/App.jsx".',
      'Step 3: Permanently record it with "git commit -m \\"feat: update App layout\\"".',
    ],
    solutionCommands: ['git add src/App.jsx', 'git commit -m "feat: update App layout"'],
    actionButtons: [
      { label: 'Run: git status', command: 'git status' },
      { label: 'Run: git add src/App.jsx', command: 'git add src/App.jsx' },
      { label: 'Run: git commit -m "feat: update App layout"', command: 'git commit -m "feat: update App layout"' },
    ],
    setupState: (base) => {
      return {
        ...base,
        files: {
          ...base.files,
          'src/App.jsx': {
            ...base.files['src/App.jsx'],
            status: 'modified',
            diff: '+ <Hero />',
          },
        },
      };
    },
    checkCompletion: (state: SimulationState) => {
      const appFile = state.files['src/App.jsx'];
      const headCommit = state.commits[state.headCommitId];
      if (appFile?.status === 'committed' && headCommit && headCommit.parentIds.length > 0) {
        return {
          passed: true,
          message: '🎉 Awesome job! You moved the file into staging and created a permanent commit snapshot in Git history!',
        };
      }
      if (appFile?.status === 'staged') {
        return {
          passed: false,
          message: 'Almost there! The file is staged, but you still need to commit it. Click "git commit" or type it in the terminal.',
        };
      }
      return {
        passed: false,
        message: 'The file "src/App.jsx" is not staged yet. Click "git add src/App.jsx".',
      };
    },
  },
  {
    id: 'ch-2',
    title: 'Mission 2: Selective Staging (Don\'t Commit Junk!)',
    category: 'Staging Discipline',
    difficulty: 'Beginner',
    timeEstimate: '3 mins',
    studentAnalogy: 'You have your homework AND your rough doodles on your desk. You only want to submit the homework, not your doodles!',
    objective: 'Stage ONLY "src/App.jsx" and commit it. Leave "src/components/Footer.jsx" unstaged in your working directory.',
    initialSetupDescription: 'Both "src/App.jsx" and "src/components/Footer.jsx" have modifications.',
    hints: [
      'Do NOT run "git add ." because that stages all files blindly.',
      'Specify the exact file: "git add src/App.jsx".',
      'Then commit with "git commit -m \\"feat: update App without touching footer\\"".',
    ],
    solutionCommands: ['git add src/App.jsx', 'git commit -m "feat: update App without touching footer"'],
    actionButtons: [
      { label: '1. Inspect with git status', command: 'git status' },
      { label: '2. Stage ONLY App.jsx (git add src/App.jsx)', command: 'git add src/App.jsx' },
      { label: '3. Commit App.jsx (git commit -m "...")', command: 'git commit -m "feat: update App without touching footer"' },
    ],
    setupState: (base) => {
      return {
        ...base,
        files: {
          ...base.files,
          'src/App.jsx': { ...base.files['src/App.jsx'], status: 'modified' },
          'src/components/Footer.jsx': { ...base.files['src/components/Footer.jsx'], status: 'modified' },
        },
      };
    },
    checkCompletion: (state: SimulationState) => {
      const footer = state.files['src/components/Footer.jsx'];
      const app = state.files['src/App.jsx'];
      if (app?.status === 'committed' && footer?.status === 'modified') {
        return {
          passed: true,
          message: '🏆 Perfect! You practiced selective staging—only committing the finished file while keeping the other draft safe on your desk.',
        };
      }
      if (footer?.status === 'staged' || footer?.status === 'committed') {
        return {
          passed: false,
          message: 'Footer was accidentally staged or committed! Selective staging means leaving Footer unstaged.',
        };
      }
      return {
        passed: false,
        message: 'Stage and commit only "src/App.jsx".',
      };
    },
  },
  {
    id: 'ch-3',
    title: 'Mission 3: Branching (Safe Sandbox)',
    category: 'Branches',
    difficulty: 'Beginner',
    timeEstimate: '2 mins',
    studentAnalogy: 'Creating a branch is like making a duplicate copy of your college report before trying experimental changes—if it fails, your original is untouched.',
    objective: 'Create a new feature branch called "feature/hackathon-faq" and switch to it.',
    initialSetupDescription: 'You are currently on the main production branch.',
    hints: [
      'Modern Git command: "git switch -c feature/hackathon-faq".',
      'The "-c" stands for create.',
    ],
    solutionCommands: ['git switch -c feature/hackathon-faq'],
    actionButtons: [
      { label: 'Run: git branch (View branches)', command: 'git branch' },
      { label: 'Run: git switch -c feature/hackathon-faq', command: 'git switch -c feature/hackathon-faq' },
    ],
    setupState: (base) => ({ ...base, currentBranch: 'main' }),
    checkCompletion: (state: SimulationState) => {
      if (state.currentBranch === 'feature/hackathon-faq') {
        return {
          passed: true,
          message: '🚀 Spot on! You are now in your isolated branch sandbox. Anything you code here won\'t break main.',
        };
      }
      return {
        passed: false,
        message: 'You are still on branch "' + state.currentBranch + '". Switch to "feature/hackathon-faq".',
      };
    },
  },
  {
    id: 'ch-4',
    title: 'Mission 4: Emergency Shelving (git stash)',
    category: 'Stashing',
    difficulty: 'Intermediate',
    timeEstimate: '3 mins',
    studentAnalogy: 'Your professor walks into the room while you are building a secret game. You quickly minimize your window (stash), answer their question, then bring the window back (stash pop).',
    objective: 'You have unfinished messy work. Shelve it into the stash so your working directory becomes completely clean.',
    initialSetupDescription: 'Modified uncommitted code is sitting in "src/App.jsx".',
    hints: [
      'Run "git stash push -m \\"WIP: unfinished layout\\"".',
      'Verify with "git status" that the working tree is clean.',
    ],
    solutionCommands: ['git stash push -m "WIP: unfinished layout"'],
    actionButtons: [
      { label: '1. See messy files (git status)', command: 'git status' },
      { label: '2. Shelve into stash (git stash push -m "WIP")', command: 'git stash push -m "WIP: unfinished layout"' },
      { label: '3. Verify clean desk (git status)', command: 'git status' },
    ],
    setupState: (base) => ({
      ...base,
      files: {
        ...base.files,
        'src/App.jsx': { ...base.files['src/App.jsx'], status: 'modified' },
      },
    }),
    checkCompletion: (state: SimulationState) => {
      const isClean = Object.values(state.files).every((f) => f.status === 'committed');
      if (state.stashes.length > 0 && isClean) {
        return {
          passed: true,
          message: '✨ Clean as a whistle! Your uncommitted work is safely shelved in stash@{0}. You can now switch branches safely!',
        };
      }
      return {
        passed: false,
        message: 'Your working tree still has modified files or your stash is empty.',
      };
    },
  },
  {
    id: 'ch-5',
    title: 'Mission 5: Time Machine (git reflog)',
    category: 'Recovery',
    difficulty: 'Intermediate',
    timeEstimate: '3 mins',
    studentAnalogy: 'You accidentally deleted a paragraph and closed the document without saving. But Git kept a hidden time-machine diary (reflog) recording every step!',
    objective: 'HEAD was accidentally rewound back to an old commit! Use "git reflog" to find the lost commit hash (c83d105) and restore HEAD to it.',
    initialSetupDescription: 'HEAD is currently stuck on an older commit b47e2d9.',
    hints: [
      'Step 1: Run "git reflog" to see the history of HEAD.',
      'Step 2: Notice commit c83d105 right before the accident.',
      'Step 3: Run "git reset --hard c83d105" to jump back in time.',
    ],
    solutionCommands: ['git reflog', 'git reset --hard c83d105'],
    actionButtons: [
      { label: '1. Open time-machine diary (git reflog)', command: 'git reflog' },
      { label: '2. Rescue lost commit (git reset --hard c83d105)', command: 'git reset --hard c83d105' },
    ],
    setupState: (base) => {
      return {
        ...base,
        headCommitId: 'b47e2d9',
        branches: {
          ...base.branches,
          main: { ...base.branches.main, commitId: 'b47e2d9' },
        },
      };
    },
    checkCompletion: (state: SimulationState) => {
      if (state.headCommitId === 'c83d105') {
        return {
          passed: true,
          message: '🔥 Incredible rescue! You just learned the #1 superpower in Git: almost nothing is ever permanently lost if you know about reflog!',
        };
      }
      return {
        passed: false,
        message: 'HEAD is still at older commit ' + state.headCommitId + '. Reset it to c83d105.',
      };
    },
  },
];
