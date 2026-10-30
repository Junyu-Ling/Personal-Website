import { aboutIntroPlainText, type Translation } from "@/i18n/translations";
import {
  EMAIL,
  GITHUB_LABEL,
  GITHUB_URL,
  projectLinks,
} from "@/data/site";
import {
  offCampusAwardMedia,
  schoolAwardMedia,
} from "@/data/awardsMedia";
import profileImage from "@/assets/profile.png";
import apCsAScore from "@/assets/ap-cs-a-score.png";
import apPhysics1Score from "@/assets/ap-physics-1-score.png";
import apPrecalculusScore from "@/assets/ap-precalculus-score.png";

const skillChipColors = [
  "bg-violet-50 text-violet-700 border-violet-200",
  "bg-sky-50 text-sky-700 border-sky-200",
  "bg-emerald-50 text-emerald-700 border-emerald-200",
  "bg-amber-50 text-amber-700 border-amber-200",
  "bg-rose-50 text-rose-700 border-rose-200",
  "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
];

const apScoreProofs = [apCsAScore, apPhysics1Score, apPrecalculusScore];

type CvDocumentProps = {
  t: Translation;
};

function SectionTitle({ children, accent }: { children: string; accent: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className={`h-6 w-1.5 rounded-full ${accent}`} />
      <h2 className="text-xl font-semibold tracking-tight text-gray-900">
        {children}
      </h2>
    </div>
  );
}

export function CvDocument({ t }: CvDocumentProps) {
  const aboutParagraphs = [
    aboutIntroPlainText(t.about.p1Segments),
    aboutIntroPlainText(t.about.p2Segments),
    aboutIntroPlainText(t.about.p3Segments),
  ];

  const schoolAwards = t.awards.schoolItems.map((item, index) => ({
    ...item,
    ...schoolAwardMedia[index],
  }));
  const offCampusAwards = t.awards.offCampusItems.map((item, index) => ({
    ...item,
    ...offCampusAwardMedia[index],
  }));

  return (
    <div
      data-cv-root
      className="bg-white text-gray-900"
      style={{
        width: 794,
        fontFamily:
          'system-ui, -apple-system, "Segoe UI", Roboto, "PingFang SC", "Microsoft YaHei", sans-serif',
      }}
    >
      <header className="relative overflow-hidden px-10 pt-10 pb-8 bg-gradient-to-br from-violet-50 via-white to-sky-50">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-violet-500 via-sky-400 to-emerald-400" />
        <div className="flex items-start gap-6">
          <img
            src={profileImage}
            alt={t.about.profileAlt}
            className="h-24 w-24 rounded-2xl object-cover border border-violet-100 shadow-sm"
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-violet-500 mb-1">
              {t.hero.collaborate}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-gray-900">
              {t.hero.name}
            </h1>
            <p className="mt-1 text-base text-gray-600">
              {t.hero.role} · {t.hero.location}
            </p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
              <span className="text-violet-700 font-medium">{EMAIL}</span>
              <span className="text-sky-700 font-medium">{GITHUB_LABEL}</span>
            </div>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {t.hero.skills.map((skill, index) => (
            <span
              key={skill}
              className={`px-3 py-1 rounded-full text-xs font-medium border ${
                skillChipColors[index % skillChipColors.length]
              }`}
            >
              {skill}
            </span>
          ))}
        </div>
      </header>

      <main className="px-10 py-8 space-y-8">
        <section>
          <SectionTitle accent="bg-violet-500">{t.about.title}</SectionTitle>
          <div className="space-y-3 text-sm leading-relaxed text-gray-600">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl border border-violet-100 bg-violet-50/60 px-4 py-3">
              <p className="text-xs text-violet-500">{t.cv.contact}</p>
              <p className="mt-1 font-medium text-gray-900">{EMAIL}</p>
              <p className="text-sky-700">{GITHUB_URL}</p>
            </div>
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-3">
              <p className="text-xs text-emerald-600">{t.about.music}</p>
              <p className="mt-1 font-medium text-gray-900">{t.about.musicValue}</p>
              <p className="text-gray-500">{t.about.statusValue}</p>
            </div>
          </div>
        </section>

        <section>
          <SectionTitle accent="bg-sky-500">{t.academics.title}</SectionTitle>
          <div className="grid grid-cols-3 gap-3">
            {t.academics.items.map((item, index) => (
              <div
                key={item.subject}
                className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold text-gray-900 leading-snug">
                    {item.subject}
                  </h3>
                  <span className="text-2xl font-bold text-sky-600">5</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">{item.grade}</p>
                <img
                  src={apScoreProofs[index]}
                  alt={item.scoreProofAlt}
                  className="mt-2 w-full rounded-lg border border-gray-100"
                />
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle accent="bg-emerald-500">{t.awards.title}</SectionTitle>
          <AwardCvGroup title={t.awards.schoolSection} awards={schoolAwards} />
          <AwardCvGroup
            title={t.awards.offCampusSection}
            awards={offCampusAwards}
            dukeAlts={t.awards.dukeCerts}
          />
        </section>

        <section>
          <SectionTitle accent="bg-amber-500">{t.projects.title}</SectionTitle>
          <p className="text-xs text-gray-400 mb-4">{t.projects.subtitle}</p>
          <div className="space-y-3">
            {t.projects.items.map((project, index) => (
              <div
                key={project.title}
                className="rounded-xl border border-gray-200 bg-gradient-to-r from-white to-slate-50 px-4 py-3"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-base font-semibold text-gray-900">
                    {project.title}
                  </h3>
                  <span className="text-[11px] uppercase tracking-wide text-gray-400">
                    {t.projects.categories[project.category]}
                  </span>
                </div>
                <p className="mt-1 text-xs font-medium text-violet-700 break-all">
                  {t.cv.live}: {projectLinks[index]}
                </p>
                <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                  {project.description}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full bg-amber-50 text-[11px] text-amber-700 border border-amber-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle accent="bg-fuchsia-500">{t.journey.title}</SectionTitle>
          <div className="space-y-2">
            {t.journey.items.map((item) => (
              <div key={item.title} className="flex gap-3 text-sm">
                <span className="w-24 shrink-0 font-medium text-fuchsia-600">
                  {item.year}
                </span>
                <div>
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="px-10 py-5 border-t border-gray-100 bg-gradient-to-r from-violet-50/80 to-sky-50/80">
        <p className="text-xs text-gray-500">{t.cv.generated}</p>
        <p className="mt-1 text-xs text-gray-500">
          {EMAIL} · {GITHUB_URL}
        </p>
      </footer>
    </div>
  );
}

type AwardCvItem = Translation["awards"]["schoolItems"][number] & {
  year: string;
  featured?: boolean;
  certificates: string[];
};

function AwardCvGroup({
  title,
  awards,
  dukeAlts,
}: {
  title: string;
  awards: AwardCvItem[];
  dukeAlts?: readonly string[];
}) {
  return (
    <div className="mb-5 last:mb-0">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">{title}</h3>
      <div className="space-y-4">
        {awards.map((award) => (
          <div
            key={award.title}
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="text-sm font-semibold text-gray-900">
                  {award.title}
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  {award.organization} · {award.award}
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600">
                {award.year}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              {award.description}
            </p>
            {award.certificates.length > 0 && (
              <div
                className={`mt-3 grid gap-2 ${
                  award.certificates.length > 1 ? "grid-cols-2" : "grid-cols-1"
                }`}
              >
                {award.certificates.map((src, imageIndex) => (
                  <img
                    key={src}
                    src={src}
                    alt={
                      dukeAlts?.[imageIndex] ??
                      award.certificateAlt ??
                      award.title
                    }
                    className="w-full max-h-56 object-contain rounded-lg border border-gray-200 bg-gray-50"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
