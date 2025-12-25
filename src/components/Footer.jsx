import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative mt-16 text-base-content">
      {/* Top gradient border */}
      <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400" />

      {/* Background */}
      <div className="relative overflow-hidden">
        {/* soft gradient bg */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
        {/* subtle noise / pattern using radial gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="container mx-auto px-4 py-12 md:py-16 text-slate-300">
          {/* Top Row */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
            {/* Brand */}
            <div className="md:col-span-2">
              <Link to="/" className="inline-flex items-center gap-3 group">
                {/* Logo circle */}
                <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 p-[2px]">
                  <div className="h-full w-full rounded-2xl bg-slate-950 grid place-items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-6 w-6 text-white/90 group-hover:scale-110 transition"
                      fill="currentColor"
                    >
                      <path d="M12 3l8 4.5v9L12 21 4 16.5v-9L12 3zm0 2.06L6 8v8l6 3.06L18 16V8l-6-2.94z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white tracking-wide">
                    SkillSwap
                  </h3>
                  <p className="text-sm text-slate-400">
                    A Local Skill Exchange Platform.
                  </p>
                </div>
              </Link>

              {/* Socials */}
              <div className="mt-6 flex items-center gap-3">
                {[
                  { name: "Facebook", href: "#", icon: FbIcon },
                  { name: "Twitter", href: "#", icon: XIcon },
                  { name: "Instagram", href: "#", icon: IgIcon },
                  { name: "LinkedIn", href: "#", icon: LnIcon },
                  { name: "YouTube", href: "#", icon: YtIcon },
                ].map(({ name, href, icon: Icon }) => (
                  <a
                    key={name}
                    href={href}
                    aria-label={name}
                    className="rounded-xl p-2 transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-slate-900"
                  >
                    <Icon className="h-5 w-5 text-slate-300 hover:text-white" />
                  </a>
                ))}
              </div>
            </div>

            {/* Company */}
            <div className="md:col-span-1">
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                {[
                  { label: "About", to: "/about" },
                  { label: "Services", to: "/services" },
                  { label: "Blog", to: "/blog" },
                  { label: "Careers", to: "/careers" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition group"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-600 group-hover:bg-indigo-400 transition" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="md:col-span-1">
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                {[
                  { label: "Docs", to: "/docs" },
                  { label: "Tutorials", to: "/tutorials" },
                  { label: "Support", to: "/support" },
                  { label: "Privacy", to: "/privacy" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition group"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-600 group-hover:bg-fuchsia-400 transition" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter (RESPONSIVE FIXED) */}
            <div className="md:col-span-1">
              <h4 className="text-white font-semibold mb-4">Newsletter</h4>

              <form
                className="flex flex-col sm:flex-row items-stretch gap-3 w-full"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Subscribed! 🎉");
                }}
              >
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="flex-1 w-full rounded-xl border border-slate-700 bg-slate-800/70 px-4 py-2 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 px-5 py-2 font-medium text-white shadow-md transition hover:brightness-110 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-slate-900"
                >
                  Subscribe
                </button>
              </form>

              
            </div>
          </div>

          {/* Divider */}
          <div className="my-10 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

          {/* Bottom Row */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-slate-400">
              © {new Date().getFullYear()} SkillSwap — All rights reserved.
            </p>

            <div className="flex flex-wrap gap-3 text-sm">
              {[
                { label: "Terms", to: "/terms" },
                { label: "Privacy", to: "/privacy" },
                { label: "Cookies", to: "/cookies" },
                { label: "Contact", to: "/contact" },
              ].map((i) => (
                <Link
                  key={i.label}
                  to={i.to}
                  className="rounded-lg px-3 py-1.5 text-slate-400 transition hover:text-white hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  {i.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ==== Inline SVG Icons (no external deps) ==== */
function FbIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 22v-8h3l.5-4H13V8.2c0-1.2.4-2 2.2-2H17V3.1C16.6 3 15.4 3 14 3c-3 0-5 1.6-5 4.6V10H6v4h3v8h4z" />
    </svg>
  );
}
function XIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.7 4h3.1l-4.4 5 5.2 7h-3.2l-3.7-4.9-4.2 4.9H4.3l4.7-5.5L4 4h3.3l3.3 4.5L14.7 4z" />
    </svg>
  );
}
function IgIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm10 2H7a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3zm-5 3.5a5.5 5.5 0 110 11 5.5 5.5 0 010-11zm0 2A3.5 3.5 0 1012 17a3.5 3.5 0 000-7zm5.25-2.75a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z" />
    </svg>
  );
}
function LnIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.1c.5-1 1.8-2.2 3.8-2.2 4 0 4.7 2.6 4.7 6V24h-4v-7c0-1.7 0-3.8-2.3-3.8s-2.7 1.8-2.7 3.7V24h-4V8z" />
    </svg>
  );
}
function YtIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.2 3.5 12 3.5 12 3.5s-7.2 0-9.4.6A3 3 0 00.5 6.2 31.3 31.3 0 000 12a31.3 31.3 0 00.5 5.8 3 3 0 002.1 2.1c2.2.6 9.4.6 9.4.6s7.2 0 9.4-.6a3 3 0 002.1-2.1A31.3 31.3 0 0024 12a31.3 31.3 0 00-.5-5.8zM9.8 15.5v-7l6.2 3.5-6.2 3.5z" />
    </svg>
  );
}
