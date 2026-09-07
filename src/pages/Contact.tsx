import { useState } from 'react';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com', handle: '@portfolio-dev' },
  { name: 'LinkedIn', href: 'https://linkedin.com', handle: '/in/interaction-designer' },
  { name: 'X / Twitter', href: 'https://x.com', handle: '@interact_studio' },
];

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Header */}
      <div className="space-y-3 border-b border-zinc-200/80 pb-6">
        <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
          Contact // Inquiry
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950">
          Get in Touch
        </h1>
      </div>

      {/* Two-Column Contact Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* Left Column: Context, Direct Info & Socials */}
        <div className="md:col-span-5 space-y-8">
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-950 tracking-tight">
              Let&rsquo;s collaborate on novel interfaces.
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              Available for select client projects, interaction engineering consulting, and creative
              technology workshops.
            </p>
          </div>

          {/* Direct Channels */}
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-white border border-zinc-200/80 space-y-1.5 shadow-2xs">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
                Direct Email
              </span>
              <a
                href="mailto:hello@interaction.studio"
                className="text-sm sm:text-base font-semibold text-zinc-950 hover:text-primary-800 transition-colors block"
              >
                hello@interaction.studio
              </a>
              <span className="text-xs text-zinc-500 block pt-0.5">
                Typical response within 24&ndash;48 hours
              </span>
            </div>

            <div className="p-5 rounded-xl bg-white border border-zinc-200/80 space-y-3 shadow-2xs">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
                Online Profiles
              </span>
              <div className="space-y-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between text-xs py-1.5 px-2 rounded hover:bg-zinc-50 transition-colors group"
                  >
                    <span className="font-medium text-zinc-700 group-hover:text-zinc-950">
                      {link.name}
                    </span>
                    <span className="font-mono text-zinc-400 group-hover:text-zinc-600">
                      {link.handle} &rarr;
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Properly Styled Contact Form */}
        <div className="md:col-span-7">
          <div className="bg-white rounded-xl border border-zinc-200/80 p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-bold text-zinc-950 tracking-tight">Send a Message</h2>
              <p className="text-xs text-zinc-500 mt-1">
                Fill out the details below and I&rsquo;ll review your project inquiry.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-lg bg-primary-50/70 border border-primary-200/80 text-center space-y-2">
                <span className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center mx-auto text-sm">
                  ✓
                </span>
                <div className="font-semibold text-zinc-900 text-sm">
                  Inquiry Received (Placeholder)
                </div>
                <p className="text-xs text-zinc-600 max-w-sm mx-auto">
                  Thank you for reaching out! In the production version, this will dispatch your
                  note directly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-3 text-xs font-semibold text-primary-800 hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="block text-xs font-semibold text-zinc-800">
                      Your Name <span className="text-primary-800">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="e.g. Alex Rivera"
                      className="w-full border border-zinc-300 rounded-lg px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all shadow-2xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-xs font-semibold text-zinc-800">
                      Email Address <span className="text-primary-800">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="alex@studio.com"
                      className="w-full border border-zinc-300 rounded-lg px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all shadow-2xs"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="project-type"
                    className="block text-xs font-semibold text-zinc-800"
                  >
                    Project Type / Topic
                  </label>
                  <select
                    id="project-type"
                    defaultValue="prototype"
                    className="w-full border border-zinc-300 rounded-lg px-3.5 py-2.5 text-sm text-zinc-900 bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all shadow-2xs"
                  >
                    <option value="prototype">Interaction Prototyping / R&amp;D</option>
                    <option value="vision">Computer Vision / WebXR Application</option>
                    <option value="design-system">Accessible Design System</option>
                    <option value="consultation">General Consultation / Speaking</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="block text-xs font-semibold text-zinc-800">
                    Project Overview <span className="text-primary-800">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    placeholder="Tell me about the goals, timeline, and scope..."
                    className="w-full border border-zinc-300 rounded-lg px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all resize-y shadow-2xs"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 active:scale-[0.98] transition-all shadow-sm"
                  >
                    <span>Submit Inquiry</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                  <span className="text-[11px] text-zinc-400 font-mono text-center sm:text-right">
                    Zero spam &bull; Direct inquiry channel
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
