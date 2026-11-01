import type { ReactNode } from "react";
import type { Translation } from "@/i18n/translations";
import {
  EMAIL,
  GITHUB_URL,
  SITE_URL,
  cvProjectOrder,
  projectLinks,
} from "@/data/site";
import {
  offCampusAwardMedia,
  schoolAwardMedia,
} from "@/data/awardsMedia";
import cvPortrait from "@/assets/cv-portrait.png";

type CvDocumentProps = {
  t: Translation;
};

const cvFont =
  '"Times New Roman", Times, "Songti SC", SimSun, "Noto Serif SC", serif';

type AppendixItem = {
  src: string;
  title: string;
  award: string;
  year: string;
  alt: string;
  pairable: boolean;
};

function chunkPairs<T>(items: T[]) {
  const pairs: T[][] = [];
  for (let i = 0; i < items.length; i += 2) {
    pairs.push(items.slice(i, i + 2));
  }
  return pairs;
}

function AppendixFigure({
  item,
  compact,
}: {
  item: AppendixItem;
  compact?: boolean;
}) {
  return (
    <div data-cv-figure style={{ marginBottom: compact ? 18 : 0 }}>
      <p style={{ margin: "0 0 6px", fontWeight: 700, fontSize: 12 }}>
        {item.alt}
        <span style={{ fontWeight: 400, color: "#555555" }}>
          {" "}
          · {item.title} · {item.year}
        </span>
      </p>
      <img
        src={item.src}
        alt={item.alt}
        style={{
          display: "block",
          width: "100%",
          height: "auto",
          maxHeight: compact ? 420 : 840,
          objectFit: "contain",
          objectPosition: "top center",
          background: "#ffffff",
          border: "1px solid #dddddd",
        }}
      />
    </div>
  );
}

function Keep({ children }: { children: ReactNode }) {
  return <div data-cv-keep>{children}</div>;
}

function SectionRule({ title }: { title: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: 12,
        margin: "0 0 8px",
        borderBottom: "1.5px solid #111111",
        paddingBottom: 3,
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#111111",
        }}
      >
        {title}
      </h2>
    </div>
  );
}

export function CvDocument({ t }: CvDocumentProps) {
  const schoolAwards = t.awards.schoolItems.map((item, index) => ({
    ...item,
    ...schoolAwardMedia[index],
  }));
  const offCampusAwards = t.awards.offCampusItems.map((item, index) => ({
    ...item,
    ...offCampusAwardMedia[index],
  }));
  const honors = [...schoolAwards, ...offCampusAwards];
  const appendixItems = honors.flatMap((award) => {
    const alts =
      award.certificates.length > 1 ? t.awards.dukeCerts : undefined;
    return award.certificates.map((src, imageIndex) => ({
      src,
      title: award.title,
      award: award.award,
      year: award.year,
      alt: alts?.[imageIndex] ?? award.certificateAlt ?? award.title,
      pairable: award.certificates.length > 1,
    }));
  });
  const soloAppendix = appendixItems.filter((item) => !item.pairable);
  const dukePairs = chunkPairs(appendixItems.filter((item) => item.pairable));

  return (
    <div
      data-cv-root
      style={{
        width: 794,
        background: "#ffffff",
        color: "#111111",
        fontFamily: cvFont,
        fontSize: 12.5,
        lineHeight: 1.45,
      }}
    >
      <Keep>
        <header
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 18,
            paddingBottom: 12,
          }}
        >
          <div style={{ minWidth: 0, flex: 1, paddingTop: 2 }}>
            <a
              href={SITE_URL}
              style={{
                display: "inline-block",
                margin: 0,
                fontSize: 14.5,
                fontWeight: 700,
                letterSpacing: "0.04em",
                color: "#111111",
                textDecoration: "underline",
                textUnderlineOffset: 3,
              }}
            >
              {SITE_URL.replace(/^https:\/\//, "")}
            </a>
            <h1
              style={{
                margin: "6px 0 0",
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: "0.04em",
                lineHeight: 1.15,
              }}
            >
              {t.hero.name}
            </h1>
            <p style={{ margin: "8px 0 0", fontSize: 12, color: "#333333" }}>
              {t.cv.city}
              <span style={{ margin: "0 8px", color: "#bbbbbb" }}>|</span>
              <a href={`mailto:${EMAIL}`} style={{ color: "#111111" }}>
                {EMAIL}
              </a>
              <span style={{ margin: "0 8px", color: "#bbbbbb" }}>|</span>
              <a href={GITHUB_URL} style={{ color: "#111111" }}>
                {t.cv.github}
              </a>
            </p>
          </div>
          <img
            src={cvPortrait}
            alt={t.about.profileAlt}
            style={{
              width: 102,
              height: 128,
              objectFit: "cover",
              objectPosition: "center top",
              border: "1px solid #dddddd",
              background: "#ffffff",
              flexShrink: 0,
            }}
          />
        </header>
      </Keep>

      <Keep>
        <SectionRule title={t.cv.objectiveTitle} />
        <p style={{ margin: "0 0 14px", color: "#222222" }}>{t.cv.objective}</p>
      </Keep>

      <Keep>
        <SectionRule title={t.cv.educationTitle} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
            alignItems: "baseline",
          }}
        >
          <p style={{ margin: 0, fontWeight: 700 }}>{t.cv.schoolName}</p>
          <p style={{ margin: 0, whiteSpace: "nowrap", color: "#333333" }}>
            {t.cv.schoolDates}
          </p>
        </div>
        <p style={{ margin: "2px 0 4px", color: "#444444" }}>
          {t.cv.schoolDegree} · {t.cv.city}
        </p>
        <ul style={{ margin: "0 0 8px", paddingLeft: 18 }}>
          {t.cv.schoolBullets.map((bullet) => (
            <li key={bullet} style={{ marginBottom: 2 }}>
              {bullet}
            </li>
          ))}
        </ul>
        <p style={{ margin: "0 0 4px", fontWeight: 700 }}>{t.cv.apScoresTitle}</p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            columnGap: 24,
            rowGap: 2,
            margin: "0 0 14px",
          }}
        >
          {t.cv.apScores.map((item) => (
            <div
              key={item.name}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                borderBottom: "1px dotted #cccccc",
                padding: "1px 0",
              }}
            >
              <span>{item.name}</span>
              <span style={{ fontWeight: 700 }}>{item.score}</span>
            </div>
          ))}
        </div>
      </Keep>

      {cvProjectOrder.map((index, orderIndex) => {
        const project = t.projects.items[index];
        const bullets = t.cv.projectBullets[index] ?? [project.description];
        const role =
          index === 7 ? t.cv.projectRoleTeam : t.cv.projectRoleSolo;
        return (
          <Keep key={project.title}>
            {orderIndex === 0 ? <SectionRule title={t.cv.projectsTitle} /> : null}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                alignItems: "baseline",
              }}
            >
              <p style={{ margin: 0, fontWeight: 700 }}>
                {project.title}
                <span style={{ fontWeight: 400, color: "#444444" }}>
                  {" "}
                  · {role}
                </span>
              </p>
            </div>
            <p style={{ margin: "2px 0 4px", fontSize: 11.5 }}>
              <span style={{ color: "#555555" }}>{t.cv.live}: </span>
              <a href={projectLinks[index]} style={{ color: "#111111" }}>
                {projectLinks[index]}
              </a>
            </p>
            <ul style={{ margin: "0 0 12px", paddingLeft: 18 }}>
              {bullets.map((bullet) => (
                <li key={bullet} style={{ marginBottom: 2 }}>
                  {bullet}
                </li>
              ))}
            </ul>
          </Keep>
        );
      })}

      <Keep>
        <SectionRule title={t.cv.skillsTitle} />
        <p style={{ margin: "0 0 4px" }}>
          <strong>{t.cv.languagesLabel}: </strong>
          {t.cv.languages}
        </p>
        <p style={{ margin: "0 0 4px" }}>
          <strong>{t.cv.techLabel}: </strong>
          {t.cv.tech}
        </p>
        <p style={{ margin: "0 0 14px" }}>
          <strong>{t.cv.certsLabel}: </strong>
          {t.cv.certsHighlight}
        </p>
      </Keep>

      <Keep>
        <SectionRule title={t.cv.honorsTitle} />
        {t.cv.activities.map((item) => (
          <div key={item.title} style={{ marginBottom: 8 }}>
            <p style={{ margin: 0, fontWeight: 700 }}>
              {item.title}
              <span style={{ fontWeight: 400, color: "#444444" }}>
                {" "}
                · {item.org}
              </span>
            </p>
            <p style={{ margin: "2px 0 0", color: "#222222" }}>{item.detail}</p>
          </div>
        ))}
      </Keep>
      {honors.map((item) => (
        <Keep key={item.title}>
          <p style={{ margin: "0 0 2px", paddingLeft: 2 }}>
            <strong>{item.award}</strong>
            {` · ${item.title} · ${item.organization} (${item.year})`}
          </p>
          {item.description ? (
            <p style={{ margin: "0 0 8px", paddingLeft: 2, color: "#333333" }}>
              {item.description}
            </p>
          ) : null}
        </Keep>
      ))}

      {soloAppendix.map((item, index) => (
        <Keep key={`${item.title}-${item.src}`}>
          {index === 0 ? (
            <>
              <SectionRule title={t.cv.appendixTitle} />
              <p style={{ margin: "0 0 10px", color: "#444444", fontSize: 11.5 }}>
                {t.cv.generated}
              </p>
            </>
          ) : null}
          <AppendixFigure item={item} />
        </Keep>
      ))}
      {dukePairs.map((pair, pairIndex) => (
        <Keep key={`duke-pair-${pairIndex}`}>
          {pair.map((item) => (
            <AppendixFigure
              key={`${item.alt}-${item.src}`}
              item={item}
              compact
            />
          ))}
        </Keep>
      ))}
    </div>
  );
}
