import {useEffect, useState, type FormEvent, type ReactNode} from "react";
import {useTranslation} from "react-i18next";
import {LuArrowUpRight, LuMail, LuMenu, LuMoon, LuSun} from "react-icons/lu";
import "./i18n";
import {
  certifications,
  education,
  email,
  experience,
  name,
  photo,
  projects,
  showGithubRepos,
  socialLinks,
  tools
} from "./portfolio";

const navIds = [
  "about",
  "experience",
  "projects",
  "education",
  "contact"
] as const;

function useTheme() {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      /* storage blocked */
    }
  }, [dark]);
  return [dark, () => setDark(d => !d)] as const;
}

function Header() {
  const {t, i18n} = useTranslation();
  const [dark, toggle] = useTheme();
  const lang = i18n.resolvedLanguage === "de" ? "de" : "en";
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const links = navIds.map(id => (
    <a
      key={id}
      href={`#${id}`}
      className="rounded-md px-3 py-2 text-[15px] text-ink2 transition-colors duration-150 ease-out hover:bg-raised hover:text-ink"
    >
      {t(`site.nav.${id}`)}
    </a>
  ));
  const iconBtn =
    "inline-flex h-9 min-w-9 items-center justify-center rounded-md px-2 text-ink2 transition-colors duration-150 ease-out hover:bg-raised hover:text-ink";

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg/90 backdrop-blur supports-[backdrop-filter]:bg-bg/75">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <a href="#top" className="text-[17px] font-semibold tracking-tight">
          {name}
        </a>
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {links}
        </nav>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className={`${iconBtn} font-mono text-xs`}
            aria-label={t("site.lang")}
            onClick={() => i18n.changeLanguage(lang === "de" ? "en" : "de")}
          >
            {lang === "de" ? "EN" : "DE"}
          </button>
          <button
            type="button"
            className={iconBtn}
            aria-label={t(dark ? "site.theme.toLight" : "site.theme.toDark")}
            onClick={toggle}
          >
            {dark ? (
              <LuSun size={18} strokeWidth={1.5} />
            ) : (
              <LuMoon size={18} strokeWidth={1.5} />
            )}
          </button>
          <details className="relative lg:hidden">
            <summary
              className={`${iconBtn} cursor-pointer list-none [&::-webkit-details-marker]:hidden`}
              aria-label={t("site.nav.menu")}
            >
              <LuMenu size={18} strokeWidth={1.5} />
            </summary>
            <nav
              aria-label="Main"
              className="absolute right-0 mt-2 flex w-56 flex-col rounded-xl border border-line bg-card p-2 shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
              onClick={e =>
                (
                  e.currentTarget.parentElement as HTMLDetailsElement
                ).removeAttribute("open")
              }
            >
              {links}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}

function Section({
  id,
  title,
  children,
  aside
}: {
  id: string;
  title: string;
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="section">
      <div className="wrap grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-16">
        <div>
          <h2 id={`${id}-title`} className="h2">
            {title}
          </h2>
          {aside && (
            <div className="mt-3 text-[15px] leading-6 text-ink2">{aside}</div>
          )}
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

function Hero() {
  const {t} = useTranslation();
  const now = experience.filter(e => !e.to);
  return (
    <section
      id="top"
      className="wrap grid items-center gap-12 py-12 sm:py-20 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:py-16"
    >
      <div>
        <h1 className="text-[40px] font-medium leading-[1.06] tracking-[-0.02em] sm:text-6xl sm:tracking-[-0.03em]">
          {t("site.hero.title")}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-ink2 sm:text-xl">
          {t("site.hero.sub")}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href="#contact" className="btn-primary">
            {t("site.hero.primary")}
          </a>
          <a href="#experience" className="btn-secondary">
            {t("site.hero.secondary")}
          </a>
        </div>
      </div>

      <figure className="relative mx-auto w-full max-w-md lg:mr-0 lg:max-w-[440px]">
        <img
          src={photo}
          alt={name}
          width={600}
          height={600}
          className="aspect-[4/5] w-full rounded-2xl border border-line object-cover"
        />
        <figcaption className="relative -mt-20 ml-4 mr-4 rounded-xl border border-line bg-card p-5 shadow-[0_8px_24px_rgba(0,0,0,0.08)] sm:ml-8 sm:mr-auto sm:max-w-sm">
          <p className="meta">{t("site.hero.now")}</p>
          <ul className="mt-3 space-y-3">
            {now.map(e => (
              <li key={e.key} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent"
                />
                <span>
                  <span className="block text-[15px] font-medium">
                    {t(`workExperience.${e.key}.role`)}, {e.company}
                  </span>
                  <span className="meta">
                    {t("site.hero.since")} {e.from}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </figcaption>
      </figure>
    </section>
  );
}

function About() {
  const {t} = useTranslation();
  return (
    <Section id="about" title={t("site.about.title")}>
      <p className="max-w-2xl text-lg leading-8 text-ink2">
        {t("greeting.subtitle")}
      </p>
      <ol className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
        {["skill1", "skill2", "skill3"].map((k, i) => (
          <li key={k} className="bg-card p-6">
            <span className="meta">0{i + 1}</span>
            <p className="mt-3 text-[15px] leading-6">{t(`skills.${k}`)}</p>
          </li>
        ))}
      </ol>
      <h3 className="mt-10 text-[15px] font-medium">{t("site.about.tools")}</h3>
      <ul className="mt-3 flex flex-wrap gap-2">
        {tools.map(tool => (
          <li
            key={tool}
            className="rounded-md border border-line bg-card px-2.5 py-1 font-mono text-[13px] text-ink2"
          >
            {tool}
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Experience() {
  const {t} = useTranslation();
  return (
    <Section
      id="experience"
      title={t("site.experience.title")}
      aside={t("workExperience.subtitle")}
    >
      <ol className="relative border-l border-line">
        {experience.map(e => (
          <li key={e.key} className="relative pb-12 pl-6 last:pb-0 sm:pl-8">
            <span
              aria-hidden
              className={`absolute -left-[4px] top-[7px] h-[7px] w-[7px] ${e.to ? "bg-mute" : "bg-accent"}`}
            />
            <p className="meta">
              {e.from} – {e.to ?? t("site.experience.today")}
            </p>
            <h3 className="mt-1 text-xl font-medium">
              {t(`workExperience.${e.key}.role`)}
            </h3>
            <p className="text-[15px] text-ink2">{e.company}</p>
            <p className="mt-3 max-w-2xl text-[15px] leading-7 text-ink2">
              {t(`workExperience.${e.key}.desc`)}
            </p>
            <details className="group mt-4 max-w-2xl">
              <summary className="inline-flex cursor-pointer list-none items-center gap-1 rounded text-[15px] font-medium text-accent [&::-webkit-details-marker]:hidden">
                <span className="group-open:hidden">
                  {t("workExperience.showMore")}
                </span>
                <span className="hidden group-open:inline">
                  {t("workExperience.showLess")}
                </span>
              </summary>
              {e.bullets[0]?.startsWith("bullets.") && (
                <p className="mt-4 text-[15px] font-medium">
                  {t("site.experience.projects")}
                </p>
              )}
              <ul className="mt-3 space-y-3">
                {e.bullets.map(b => (
                  <li
                    key={b}
                    className="relative pl-4 text-[15px] leading-7 text-ink2 before:absolute before:left-0 before:top-[13px] before:h-px before:w-2 before:bg-mute"
                  >
                    {t(`workExperience.${e.key}.${b}`)}
                  </li>
                ))}
              </ul>
            </details>
          </li>
        ))}
      </ol>
    </Section>
  );
}

type Repo = {
  name: string;
  description: string | null;
  url: string;
  primaryLanguage: {name: string} | null;
};

function GithubRepos() {
  const [repos, setRepos] = useState<Repo[]>([]);
  useEffect(() => {
    fetch("./profile.json")
      .then(r => r.json())
      .then(d =>
        setRepos(d.data.user.pinnedItems.edges.map((e: {node: Repo}) => e.node))
      )
      .catch(() => setRepos([]));
  }, []);
  if (!repos.length) return null;
  return (
    <ul className="mt-8 grid gap-4 sm:grid-cols-2">
      {repos.map(r => (
        <li key={r.url} className="rounded-xl border border-line bg-card p-5">
          <a
            href={r.url}
            className="font-medium link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {r.name}
          </a>
          {r.description && (
            <p className="mt-2 text-[15px] text-ink2">{r.description}</p>
          )}
          {r.primaryLanguage && (
            <p className="meta mt-3">{r.primaryLanguage.name}</p>
          )}
        </li>
      ))}
    </ul>
  );
}

function Projects() {
  const {t} = useTranslation();
  const p = "projects.bigProjects";
  return (
    <Section
      id="projects"
      title={t("site.projects.title")}
      aside={t("site.projects.sub")}
    >
      <ul className="grid gap-4 sm:grid-cols-2">
        {projects.map(pr => (
          <li key={pr.key}>
            <a
              href={pr.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-2xl border border-line bg-card p-6 transition-colors duration-150 ease-out hover:border-ink/25"
            >
              <span className="flex h-14 items-center self-start rounded-xl border border-line bg-white p-1.5">
                <img
                  src={pr.logo}
                  alt=""
                  className={`${pr.logoClass} w-auto max-w-[200px] object-contain`}
                  loading="lazy"
                />
              </span>
              <span className="meta mt-6">{t(`${p}.${pr.key}.tag`)}</span>
              <span className="mt-1 text-xl font-medium">
                {t(`${p}.${pr.key}.name`)}
              </span>
              <span className="mt-2 flex-1 text-[15px] leading-6 text-ink2">
                {t(`${p}.${pr.key}.desc`)}
              </span>
              <span className="mt-6 inline-flex items-center gap-1 text-[15px] font-medium text-accent">
                {t(`${p}.${pr.key}.${pr.linkKey}`)}
                <LuArrowUpRight
                  size={16}
                  strokeWidth={1.5}
                  className="transition-transform duration-150 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </a>
          </li>
        ))}
      </ul>
      {showGithubRepos && <GithubRepos />}
    </Section>
  );
}

function Education() {
  const {t} = useTranslation();
  return (
    <Section
      id="education"
      title={t("site.education.title")}
      aside={t("education.subtitle")}
    >
      <ul className="grid gap-4 sm:grid-cols-2">
        {education.map(ed => (
          <li
            key={ed.degree}
            className="rounded-xl border border-line bg-card p-6"
          >
            <p className="meta">{ed.year}</p>
            <h3 className="mt-1 text-lg font-medium">{ed.degree}</h3>
            <p className="text-[15px] text-ink2">
              {t(`education.${ed.descKey}`)}, {ed.school}
            </p>
          </li>
        ))}
      </ul>
      <h3 className="mt-12 text-[15px] font-medium">
        {t("site.education.certs")}
      </h3>
      <ul className="mt-3 divide-y divide-line border-y border-line">
        {certifications.map(c => (
          <li
            key={c.title}
            className="flex items-baseline justify-between gap-4 py-3"
          >
            <span className="text-[15px]">{c.title}</span>
            <span className="meta shrink-0">{c.year}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Contact() {
  const {t} = useTranslation();
  const f = (k: string) => t(`contact.form.${k}`);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const body = `Name: ${d.get("name")}\nEmail: ${d.get("email")}\n\n${d.get("message")}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(String(d.get("subject")))}&body=${encodeURIComponent(body)}`;
  };
  return (
    <Section
      id="contact"
      title={t("site.contact.title")}
      aside={t("site.contact.sub")}
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-3 break-all text-xl font-medium sm:text-2xl link"
          >
            <LuMail
              size={20}
              strokeWidth={1.5}
              className="shrink-0 text-mute"
            />
            {email}
          </a>
          <h3 className="mt-10 text-[15px] font-medium">
            {t("site.contact.elsewhere")}
          </h3>
          <ul className="mt-3 space-y-2">
            {socialLinks.map(s => (
              <li key={s.label}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="inline-flex items-center gap-1 text-[15px] link"
                >
                  {s.label}
                  <LuArrowUpRight
                    size={16}
                    strokeWidth={1.5}
                    className="text-mute"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <form
          onSubmit={submit}
          className="rounded-2xl border border-line bg-card p-6"
        >
          <h3 className="text-lg font-medium">{f("title")}</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="text-[15px] font-medium">
              {f("name")}
              <input
                name="name"
                required
                autoComplete="name"
                placeholder={f("namePlaceholder")}
                className="field"
              />
            </label>
            <label className="text-[15px] font-medium">
              {f("email")}
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder={f("emailPlaceholder")}
                className="field"
              />
            </label>
          </div>
          <label className="mt-4 block text-[15px] font-medium">
            {f("subject")}
            <input
              name="subject"
              required
              placeholder={f("subjectPlaceholder")}
              className="field"
            />
          </label>
          <label className="mt-4 block text-[15px] font-medium">
            {f("message")}
            <textarea
              name="message"
              required
              rows={5}
              placeholder={f("messagePlaceholder")}
              className="field resize-y"
            />
          </label>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button type="submit" className="btn-primary">
              {f("send")}
            </button>
            <p className="text-[13px] text-mute">
              {t("site.contact.formNote")}
            </p>
          </div>
        </form>
      </div>
    </Section>
  );
}

export function Footer() {
  const {t} = useTranslation();
  return (
    <footer className="border-t border-line">
      <div className="wrap flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="meta">
          © {new Date().getFullYear()} {name}
        </p>
        <nav aria-label="Legal" className="flex gap-6 text-[15px]">
          <a href="./impressum.html" className="link">
            {t("site.footer.imprint")}
          </a>
          <a href="./datenschutz.html" className="link">
            {t("site.footer.privacy")}
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default function App() {
  const {t} = useTranslation();
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-30 focus:rounded-md focus:bg-card focus:px-4 focus:py-2"
      >
        {t("site.skip")}
      </a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
