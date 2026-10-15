export type FileStatus = 'untracked' | 'modified' | 'staged' | 'committed' | 'deleted' | 'conflicted';

export interface ConflictDetails {
  base: string;
  ours: string;
  theirs: string;
  markers: string;
}

export interface GitFile {
  path: string;
  content: string;
  stagedContent?: string;
  committedContent?: string;
  status: FileStatus;
  diff?: string;
  conflict?: ConflictDetails;
}

export interface GitCommit {
  id: string; // short 7-char sha
  fullSha: string;
  message: string;
  author: string;
  email: string;
  timestamp: string; // ISO string or relative time
  authorDate?: string;
  committerDate?: string;
  parentIds: string[];
  snapshot: Record<string, string>; // path -> content
  branch?: string;
  isMerge?: boolean;
  isRebased?: boolean;
}

export interface GitBranch {
  name: string;
  commitId: string;
  isRemote?: boolean;
  remoteName?: string;
  upstream?: string;
}

export interface GitTag {
  name: string;
  commitId: string;
  message?: string;
  tagger?: string;
  date?: string;
}

export interface GitStash {
  id: string;
  index: number;
  message: string;
  branch: string;
  files: Record<string, { status: FileStatus; content: string; stagedContent?: string }>;
  timestamp: number;
}

export interface GitReflogEntry {
  id: string;
  index: number;
  selector: string; // HEAD@{0}
  action: string; // commit, checkout, reset, merge, rebase
  fromSha: string;
  toSha: string;
  message: string;
  timestamp: string;
}

export interface Contributor {
  id: string;
  name: string;
  role: string;
  email: string;
  avatarBg: string;
  activeBranch: string;
  unpushedCount: number;
  dirtyFilesCount: number;
  workingFiles: Record<string, string>;
  stagedFiles: Record<string, string>;
  currentTask: string;
}

export interface PullRequestReview {
  id: string;
  author: string;
  avatarBg: string;
  state: 'APPROVED' | 'CHANGES_REQUESTED' | 'COMMENT';
  comment: string;
  date: string;
}

export interface PullRequestCheck {
  id: string;
  name: string;
  status: 'queued' | 'in_progress' | 'completed';
  conclusion: 'success' | 'failure';
  duration: string;
}

export interface PullRequestFileDiff {
  path: string;
  additions: number;
  deletions: number;
  status: 'modified' | 'added' | 'deleted';
  diff: string;
}

export interface PullRequest {
  id: string;
  number: number;
  title: string;
  author: string;
  authorAvatarBg: string;
  sourceBranch: string;
  targetBranch: string;
  status: 'open' | 'merged' | 'closed';
  description: string;
  createdAt: string;
  reviews: PullRequestReview[];
  checks: PullRequestCheck[];
  changedFiles: PullRequestFileDiff[];
  conflict: boolean;
  canMerge: boolean;
  labels: string[];
}

export interface CommandEffect {
  workingTreeChanged: boolean;
  stagingChanged: boolean;
  branchesChanged: boolean;
  headChanged: boolean;
  commitAdded: boolean;
  remoteChanged: boolean;
  filesAffected: string[];
  summary: string;
}

export interface CommandResult {
  id?: string;
  timestamp?: number;
  command: string;
  success: boolean;
  status: 'success' | 'warning' | 'error' | 'conflict';
  output: string;
  explanation: string;
  affected: CommandEffect;
  nextSteps?: string[];
}

export interface BisectState {
  active: boolean;
  goodSha: string | null;
  badSha: string | null;
  currentTestSha: string | null;
  stepsRemaining: number;
  candidateShas: string[];
  identifiedCulprit: string | null;
}

export interface SimulationState {
  repositoryName: string;
  files: Record<string, GitFile>;
  commits: Record<string, GitCommit>;
  branches: Record<string, GitBranch>;
  currentBranch: string;
  headCommitId: string;
  detachedHead: boolean;
  remotes: Record<string, {
    name: string;
    url: string;
    branches: Record<string, string>; // branchName -> commitId
  }>;
  stashes: GitStash[];
  reflog: GitReflogEntry[];
  tags: Record<string, GitTag>;
  pullRequests: PullRequest[];
  contributors: Contributor[];
  activeContributorId: string;
  activeConflict: {
    path: string;
    base: string;
    ours: string;
    theirs: string;
    currentContent: string;
    targetBranch: string;
    sourceBranch: string;
    operationType: 'merge' | 'rebase' | 'stash' | 'cherry-pick';
  } | null;
  bisect: BisectState;
  lastCommandResult: CommandResult | null;
  commandHistory: string[];
}

export type ActiveTab =
  | 'start'
  | 'fundamentals'
  | 'commands'
  | 'graph'
  | 'merge-rebase'
  | 'conflicts'
  | 'stash-recovery'
  | 'collaboration'
  | 'github-pr'
  | 'tools'
  | 'best-practices'
  | 'challenges'
  | 'glossary';

export interface Challenge {
  id: string;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeEstimate: string;
  objective: string;
  studentAnalogy: string;
  initialSetupDescription: string;
  hints: string[];
  solutionCommands: string[];
  actionButtons: { label: string; command: string }[];
  setupState: (baseState: SimulationState) => SimulationState;
  checkCompletion: (state: SimulationState) => { passed: boolean; message: string };
}
