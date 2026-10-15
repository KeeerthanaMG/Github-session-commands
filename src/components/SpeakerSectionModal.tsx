import React from 'react';
import {
  X,
  ExternalLink,
  Github,
  Linkedin,
  Instagram,
  Sparkles,
  BookOpen,
  GitPullRequest,
  Code2,
  FileText,
} from 'lucide-react';

interface SpeakerSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpeakerSectionModal: React.FC<SpeakerSectionModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="speaker-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#161b22] border border-[#30363d] rounded-xl shadow-2xl text-[#c9d1d9]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[#161b22]/95 border-b border-[#30363d] backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#21262d] border border-[#30363d] flex items-center justify-center text-[#58a6ff]">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <h2 id="speaker-modal-title" className="text-base font-semibold text-[#f0f6fc]">
                Creators &amp; Speakers
              </h2>
              <p className="text-xs text-[#8b949e]">
                Meet the minds behind GIT//LAB
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Introductory Note */}
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg space-y-1">
            <p className="text-sm leading-relaxed text-[#c9d1d9]">
              Built with ❤️ for engineering students, hackathon developers, and open-source contributors to understand the history behind every command.
            </p>
            <p className="text-xs text-[#8b949e]">
              Connect with us for workshops, mentorship, speaking sessions, or project collaborations!
            </p>
          </div>

          {/* Speakers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Speaker 1: Keerthana M G */}
            <div className="flex flex-col justify-between p-6 bg-[#0d1117] border border-[#30363d] rounded-xl hover:border-[#58a6ff]/50 transition-colors">
              <div>
                {/* Profile Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#8957e5] to-[#58a6ff] flex items-center justify-center text-white font-bold text-xl shadow-inner border-2 border-[#30363d]">
                      K
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#161b22] border border-[#30363d] flex items-center justify-center text-[#a371f7]">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-[#f0f6fc] truncate">Keerthana M G</h3>
                    <p className="text-xs text-[#58a6ff] font-mono">@KeeerthanaMG</p>
                    <p className="text-xs text-[#3fb950] font-medium mt-0.5">
                      Backend Engineer at HappyFox &bull; Speaker at &ldquo;GITHUB UNLOCKED&rdquo;
                    </p>
                  </div>
                </div>

                {/* Bio & Story */}
                <div className="space-y-2 mb-4 text-xs text-[#c9d1d9] leading-relaxed">
                  <p>
                    Backend Engineer at HappyFox and featured speaker at <span className="text-[#f0f6fc] font-semibold">&ldquo;GITHUB UNLOCKED&rdquo;</span>. Passionate about empowering engineering students and junior devs to master real-world Git and GitHub collaboration without the fear of breaking things.
                  </p>
                  <p className="text-[#8b949e]">
                    Author of <strong className="text-[#58a6ff]">&ldquo;The Ultimate GitHub CLI Guide for Team Projects: Oru Git-in Kadhai&rdquo;</strong> on Medium—turning complex terminal workflows, branching models, and pull request hygiene into relatable stories. Also a passionate musician sharing acoustic covers at <span className="text-[#f0883e]">@keerthana.codencovers</span>.
                  </p>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-1.5 mb-6 text-xs text-[#8b949e]">
                  <span className="px-2 py-0.5 rounded bg-[#161b22] border border-[#30363d] text-[#3fb950]">HappyFox Backend Engineer</span>
                  <span className="px-2 py-0.5 rounded bg-[#161b22] border border-[#30363d] text-[#58a6ff]">GITHUB UNLOCKED Speaker</span>
                  <span className="px-2 py-0.5 rounded bg-[#161b22] border border-[#30363d] text-[#a371f7]">Oru Git-in Kadhai (Medium)</span>
                  <span className="px-2 py-0.5 rounded bg-[#161b22] border border-[#30363d] text-[#f0883e]">@keerthana.codencovers</span>
                </div>
              </div>

              {/* Social & Contact Links */}
              <div className="pt-4 border-t border-[#30363d] flex flex-col gap-2">
                {/* Medium Blog Link */}
                <a
                  href="https://medium.com/@keerthanamg19/the-ultimate-github-cli-guide-for-team-projects-oru-git-in-kadhai-d5c0ce3bd1af"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3 py-2 text-xs font-medium text-[#c9d1d9] bg-[#161b22] hover:bg-[#21262d] hover:text-[#58a6ff] border border-[#30363d] rounded-lg transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#a371f7]" />
                    <span>Medium Blog: Oru Git-in Kadhai (GitHub CLI Guide)</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#8b949e] group-hover:text-[#58a6ff]" />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/keerthana-m-g-12ba59256/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3 py-2 text-xs font-medium text-[#c9d1d9] bg-[#161b22] hover:bg-[#21262d] hover:text-[#58a6ff] border border-[#30363d] rounded-lg transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-[#58a6ff]" />
                    <span>LinkedIn (Keerthana M G)</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#8b949e] group-hover:text-[#58a6ff]" />
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/KeeerthanaMG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3 py-2 text-xs font-medium text-[#c9d1d9] bg-[#161b22] hover:bg-[#21262d] hover:text-[#f0f6fc] border border-[#30363d] rounded-lg transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-white" />
                    <span>GitHub (@KeeerthanaMG)</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#8b949e] group-hover:text-white" />
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/keerthana.codencovers/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3 py-2 text-xs font-medium text-[#c9d1d9] bg-[#161b22] hover:bg-[#21262d] hover:text-[#f0883e] border border-[#30363d] rounded-lg transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <Instagram className="w-4 h-4 text-[#f0883e]" />
                    <span>Instagram (@keerthana.codencovers)</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#8b949e] group-hover:text-[#f0883e]" />
                </a>
              </div>
            </div>

            {/* Speaker 2: Karthikeyan */}
            <div className="flex flex-col justify-between p-6 bg-[#0d1117] border border-[#30363d] rounded-xl hover:border-[#58a6ff]/50 transition-colors">
              <div>
                {/* Profile Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#1f6feb] to-[#238636] flex items-center justify-center text-white font-bold text-xl shadow-inner border-2 border-[#30363d]">
                      K
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#161b22] border border-[#30363d] flex items-center justify-center text-[#3fb950]">
                      <Code2 className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-[#f0f6fc] truncate">Karthikeyan</h3>
                    <p className="text-xs text-[#58a6ff] font-mono">@karthi281104</p>
                    <p className="text-xs text-[#7ee787] font-medium mt-0.5">
                      Software Engineer &bull; Open Source Developer &amp; Co-Speaker
                    </p>
                  </div>
                </div>

                {/* Bio & Description */}
                <div className="space-y-2 mb-4 text-xs text-[#c9d1d9] leading-relaxed">
                  <p>
                    Software Engineer and open-source contributor focusing on interactive developer experiences, system architecture, Git multi-contributor workflows, and intuitive engineering simulations.
                  </p>
                  <p className="text-[#8b949e]">
                    Collaborates on campus tech workshops, hands-on hackathon toolkits, and developer training to help students understand version control mechanics, conflict resolution, and modern team workflows.
                  </p>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-1.5 mb-6 text-xs text-[#8b949e]">
                  <span className="px-2 py-0.5 rounded bg-[#161b22] border border-[#30363d] text-[#58a6ff]">Software Engineering</span>
                  <span className="px-2 py-0.5 rounded bg-[#161b22] border border-[#30363d] text-[#3fb950]">Git Workflows &amp; PRs</span>
                  <span className="px-2 py-0.5 rounded bg-[#161b22] border border-[#30363d]">Interactive Tooling</span>
                  <span className="px-2 py-0.5 rounded bg-[#161b22] border border-[#30363d]">Open Source</span>
                </div>
              </div>

              {/* Social & Contact Links */}
              <div className="pt-4 border-t border-[#30363d] flex flex-col gap-2">
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/karthikeyan281104/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3 py-2 text-xs font-medium text-[#c9d1d9] bg-[#161b22] hover:bg-[#21262d] hover:text-[#58a6ff] border border-[#30363d] rounded-lg transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-[#58a6ff]" />
                    <span>LinkedIn (karthikeyan281104)</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#8b949e] group-hover:text-[#58a6ff]" />
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/karthi281104"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3 py-2 text-xs font-medium text-[#c9d1d9] bg-[#161b22] hover:bg-[#21262d] hover:text-[#f0f6fc] border border-[#30363d] rounded-lg transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-white" />
                    <span>GitHub (@karthi281104)</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#8b949e] group-hover:text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Educational Mission Footer */}
          <div className="p-4 rounded-lg bg-[#21262d]/50 border border-[#30363d] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#8b949e]">
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#58a6ff]" />
              Presented for collegiate hackathons, symposium workshops, and engineering cohorts.
            </span>
            <span className="flex items-center gap-1 font-mono text-[#7ee787]">
              <GitPullRequest className="w-3.5 h-3.5" />
              open-source education
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
