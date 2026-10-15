export interface GlossaryEntry {
  term: string;
  category: 'Core Concepts' | 'Branches & Graph' | 'Collaboration & Remote' | 'Internals';
  definition: string;
  detail: string;
  relatedCommand?: string;
}

export const GLOSSARY: GlossaryEntry[] = [
  {
    term: 'Directed Acyclic Graph (DAG)',
    category: 'Core Concepts',
    definition: 'The mathematical structure Git uses to store repository history.',
    detail: 'Directed means edges point backwards from child commits to their parent(s). Acyclic means it is mathematically impossible for a commit to become its own ancestor.',
    relatedCommand: 'git log --graph',
  },
  {
    term: 'HEAD',
    category: 'Branches & Graph',
    definition: 'A special symbolic reference in Git pointing to the currently checked-out branch or commit.',
    detail: 'Under the hood, .git/HEAD is literally a text file containing "ref: refs/heads/main" or a 40-character commit hash when detached.',
    relatedCommand: 'git switch',
  },
  {
    term: 'Detached HEAD',
    category: 'Branches & Graph',
    definition: 'A state where HEAD points directly to a commit object rather than to a named branch pointer.',
    detail: 'Commits created in detached HEAD state do not belong to any branch. If you switch away, they become dangling and subject to garbage collection unless referenced by a new branch.',
    relatedCommand: 'git checkout <sha>',
  },
  {
    term: 'Fast-Forward Merge',
    category: 'Branches & Graph',
    definition: 'A merge operation that requires no new commit because the target branch is a direct descendant of the current branch.',
    detail: 'Git simply advances the current branch pointer forward to the target commit without creating an extra merge bubble commit.',
    relatedCommand: 'git merge --ff-only',
  },
  {
    term: 'Three-Way Merge',
    category: 'Branches & Graph',
    definition: 'A merge strategy reconciling two diverged branches using their common ancestor commit.',
    detail: 'Git compares the common ancestor (Base), the current branch (Ours), and the incoming branch (Theirs) to determine which lines were modified independently.',
    relatedCommand: 'git merge',
  },
  {
    term: 'Merge Conflict',
    category: 'Branches & Graph',
    definition: 'An event occurring when Git cannot automatically reconcile changes made to overlapping lines in the same file.',
    detail: 'Git halts the merge, leaves conflict markers (<<<<<<< HEAD, =======, >>>>>>>) in the file, and waits for a developer to manually choose the intended code.',
    relatedCommand: 'git merge',
  },
  {
    term: 'Rebase',
    category: 'Branches & Graph',
    definition: 'The process of re-applying a series of commits on top of a new base commit.',
    detail: 'Unlike merge, rebase produces a clean, linear history. Every replayed commit receives a brand-new SHA hash because its parent pointer has changed.',
    relatedCommand: 'git rebase',
  },
  {
    term: 'Cherry-Pick',
    category: 'Branches & Graph',
    definition: 'Applying the exact changes introduced by a specific existing commit onto the current branch tip.',
    detail: 'Does not move or duplicate the original commit object; it computes the diff patch of the selected commit and commits that patch onto the current branch.',
    relatedCommand: 'git cherry-pick',
  },
  {
    term: 'Staging Area (Index)',
    category: 'Core Concepts',
    definition: 'An intermediate binary file (.git/index) that prepares and formats the content for the next commit snapshot.',
    detail: 'Allows developers to craft clean, atomic commits by staging only related changes rather than dumping everything in the working directory.',
    relatedCommand: 'git add',
  },
  {
    term: 'Reflog (Reference Log)',
    category: 'Core Concepts',
    definition: 'A local chronological ledger tracking every single time HEAD and branch pointers moved.',
    detail: 'The primary recovery tool in Git. Even if you run "git reset --hard" or delete a branch, the lost commits can be found and restored via reflog.',
    relatedCommand: 'git reflog',
  },
  {
    term: 'Pull Request (PR)',
    category: 'Collaboration & Remote',
    definition: 'A GitHub/GitLab collaboration mechanism proposing that changes from one branch be reviewed and integrated into another.',
    detail: 'Pull requests are not a built-in Git command; they are a web-based code review and CI verification platform feature built on top of Git.',
    relatedCommand: 'gh pr create',
  },
  {
    term: 'Remote-Tracking Branch',
    category: 'Collaboration & Remote',
    definition: 'A read-only local reference (like origin/main) that reflects the state of a branch on the remote server at the last fetch/pull.',
    detail: 'These refs cannot be checked out directly or modified locally; they only update when communicating with the remote server via git fetch, pull, or push.',
    relatedCommand: 'git fetch',
  },
  {
    term: 'Git Object: Blob',
    category: 'Internals',
    definition: 'Binary Large Object storing file contents in the Git content-addressable database (.git/objects).',
    detail: 'Blobs store raw content only—they do not store filenames, directory paths, or file permissions (those are stored in Trees).',
    relatedCommand: 'git cat-file -p',
  },
  {
    term: 'Git Object: Tree',
    category: 'Internals',
    definition: 'A Git object representing a directory folder.',
    detail: 'Contains a list of pointers to other Trees (subdirectories) and Blobs (files), along with their file modes and filenames.',
    relatedCommand: 'git ls-tree',
  },
  {
    term: 'Git Object: Commit',
    category: 'Internals',
    definition: 'A small metadata object pointing to a root Tree object, parent commit(s), author, committer, and commit message.',
    detail: 'The SHA-1/SHA-256 hash of a commit is computed from all of this metadata combined, making Git history cryptographically tamper-evident.',
    relatedCommand: 'git log',
  },
];
