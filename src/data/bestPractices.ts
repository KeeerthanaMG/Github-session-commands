export interface PrComparison {
  type: 'good' | 'bad';
  title: string;
  branch: string;
  description: string;
  stats: { files: number; additions: number; deletions: number; commits: number };
  codeSnippet: string;
  checklist: { item: string; status: boolean; note: string }[];
}

export const GOOD_VS_BAD_PRS: { bad: PrComparison; good: PrComparison } = {
  bad: {
    type: 'bad',
    title: 'fix stuff and added feature with some other tweaks (WIP)',
    branch: 'my-feature-patch-2',
    description: 'just merging my code, please approve so i can test in prod lol',
    stats: { files: 47, additions: 1480, deletions: 692, commits: 14 },
    codeSnippet: `// In src/App.jsx:
console.log("TESTING 123 >>>", data); // left in debug log
// const OldComponent = () => <div>deprecated code not deleted</div>
const SECRET_KEY = "sk_live_928371928371928371293"; // ⚠️ ACCIDENTAL LEAKED SECRET!
function handleClick() {
  // TODO: finish this later before college symposium
  alert("error");
}`,
    checklist: [
      { item: 'Focused Atomic Scope', status: false, note: 'Mixes database changes, styling, broken tests, and random reformatting.' },
      { item: 'Clear Commit Messages', status: false, note: 'Commits are "wip", "fixed typo", "asdasd", "last fix promise".' },
      { item: 'Secrets Omitted', status: false, note: 'Checked in live API keys and unencrypted .env credentials.' },
      { item: 'Passing CI Checks', status: false, note: 'Failing 3 out of 4 tests; linter reporting 84 warnings.' },
      { item: 'Reviewable Diff Size', status: false, note: '1,480 lines across 47 files is overwhelming for human reviewers.' },
    ],
  },
  good: {
    type: 'good',
    title: 'feat(events): add responsive EventCard with registration trigger',
    branch: 'feat/event-card-component',
    description: `### Summary of Changes
- Implements \`EventCard\` component rendering symposium event details (category, cash prize, team limit).
- Adds responsive mobile breakpoint styles using Tailwind CSS.
- Adds comprehensive unit test coverage with React Testing Library.

### Verification
- Tested in Chrome, Firefox, and mobile viewport simulation.
- Jest test suite passes: 12/12 test cases.
- Lighthouse Accessibility score: 100/100.

### Associated Issue
Closes #42 (Symposium Schedule Card UI)`,
    stats: { files: 3, additions: 84, deletions: 6, commits: 2 },
    codeSnippet: `// In src/components/EventCard.jsx:
export default function EventCard({ title, category, prize, onRegister }) {
  return (
    <article className="p-6 border border-slate-800 rounded-lg bg-slate-900/60 text-white">
      <span className="text-xs uppercase tracking-wide text-blue-400 font-medium">
        {category}
      </span>
      <h3 className="text-xl font-bold mt-2">{title}</h3>
      <p className="text-sm text-slate-400 mt-2">Cash Prize: {prize}</p>
      <button 
        onClick={onRegister}
        className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-xs font-semibold"
      >
        Register Team
      </button>
    </article>
  );
}`,
    checklist: [
      { item: 'Focused Atomic Scope', status: true, note: 'Does exactly one thing well: the EventCard component.' },
      { item: 'Clear Commit Messages', status: true, note: 'Follows Conventional Commits standard (feat, test).' },
      { item: 'Secrets Omitted', status: true, note: 'No credentials; uses environment variable injection.' },
      { item: 'Passing CI Checks', status: true, note: 'All automated tests, type checks, and linting pass green.' },
      { item: 'Reviewable Diff Size', status: true, note: '84 additions across 3 files; takes < 5 minutes to review thoroughly.' },
    ],
  },
};

export const CONVENTIONAL_COMMITS = [
  { prefix: 'feat:', description: 'A new feature for the user or consumer', example: 'feat(auth): add GitHub OAuth provider login' },
  { prefix: 'fix:', description: 'A bug fix in the application', example: 'fix(navbar): prevent menu backdrop overflow on iOS' },
  { prefix: 'refactor:', description: 'Code restructuring without behavior or API change', example: 'refactor(api): extract duplicated query logic into custom hook' },
  { prefix: 'docs:', description: 'Documentation changes only', example: 'docs(readme): add local development setup instructions' },
  { prefix: 'style:', description: 'Formatting, white-space, semicolon fixes (no code change)', example: 'style(footer): format spacing and remove unused CSS class' },
  { prefix: 'test:', description: 'Adding or updating unit, integration, or end-to-end tests', example: 'test(event-card): assert register button fires callback' },
  { prefix: 'chore:', description: 'Updating build tasks, package dependencies, configs', example: 'chore(deps): upgrade tailwindcss to v4.3.3' },
];

export const COMMIT_METADATA_GUIDE = {
  title: 'Understanding Commit-Date Metadata: Author Date vs Committer Date',
  explanation: `Every Git commit contains not one, but TWO distinct timestamps and identities:

1. **Author Date (GIT_AUTHOR_DATE)**:
   - When the code was originally authored and written.
   - Preserved during rebases, cherry-picks, and email patches.

2. **Committer Date (GIT_COMMITTER_DATE)**:
   - When the commit was actually applied or rewritten in the repository history.
   - Updated whenever a commit is rebased, amended, or cherry-picked.

**Why this matters**:
When an engineer runs \`git rebase\` or \`git commit --amend\`, the Author Date remains the original time the code was written, while the Committer Date is updated to the current second.

Git command to inspect both dates:
\`git log --format="Commit: %h | Author Date: %ad | Committer Date: %cd"\`

*Important note on contribution graphs:* Amending a commit changes its hash identity. Timestamps do not prove when underlying problem-solving occurred; real development credibility comes from verifiable peer review, commit lineage, and working software.`,
};
