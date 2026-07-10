import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  aboutIntroPlainText,
  type AboutIntroSegment,
} from "@/i18n/translations";

type AboutTypewriterBodyProps = {
  paragraphs: readonly (readonly AboutIntroSegment[])[];
  layoutParagraphs: readonly string[];
  active: boolean;
  className?: string;
};

const latinWrongChars = "abcdefghijklmnopqrstuvwxyz";
const cjkWrongChars = "的是在不了有和人这中大";

function isSkippableDelayChar(char: string) {
  return /[\s，。、；：！？,.;:!?'"()\-]/.test(char);
}

function wrongChar(char: string) {
  if (/[\u4e00-\u9fff]/.test(char)) {
    return cjkWrongChars[Math.floor(Math.random() * cjkWrongChars.length)];
  }
  if (/[a-z]/i.test(char)) {
    const pool = latinWrongChars.replace(char.toLowerCase(), "");
    return pool[Math.floor(Math.random() * pool.length)] ?? "x";
  }
  return char;
}

function pickTypoIndices(text: string, count: number) {
  const candidates: number[] = [];
  for (let i = 8; i < text.length - 8; i++) {
    if (/[\p{L}\u4e00-\u9fff]/u.test(text[i])) candidates.push(i);
  }
  const picks: number[] = [];
  const pool = [...candidates];
  while (picks.length < count && pool.length > 0) {
    const index = Math.floor(Math.random() * pool.length);
    picks.push(pool.splice(index, 1)[0]);
  }
  return picks.sort((a, b) => a - b);
}

function charDelay(text: string, char: string) {
  if (isSkippableDelayChar(char)) return 5;
  if (/[\u4e00-\u9fff]/.test(char)) return text.length > 90 ? 16 : 20;
  return text.length > 180 ? 7 : text.length > 100 ? 9 : 12;
}

function wait(ms: number, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException("Aborted", "AbortError"));
      return;
    }
    const timeout = window.setTimeout(() => {
      signal.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    const onAbort = () => {
      window.clearTimeout(timeout);
      reject(new DOMException("Aborted", "AbortError"));
    };
    signal.addEventListener("abort", onAbort);
  });
}

async function typeParagraph(
  text: string,
  signal: AbortSignal,
  onUpdate: (value: string) => void
) {
  const typoCount = text.length > 140 ? 1 : 2;
  const typoAt = new Set(pickTypoIndices(text, typoCount));
  let displayed = "";

  for (let i = 0; i < text.length; i++) {
    if (signal.aborted) return;

    if (typoAt.has(i)) {
      displayed += wrongChar(text[i]);
      onUpdate(displayed);
      await wait(90, signal);
      displayed = displayed.slice(0, -1);
      onUpdate(displayed);
      await wait(45, signal);
    }

    displayed += text[i];
    onUpdate(displayed);
    await wait(charDelay(text, text[i]), signal);
  }
}

function renderDisplayedSegments(
  displayed: string,
  segments: readonly AboutIntroSegment[]
) {
  const nodes: ReactNode[] = [];
  let offset = 0;

  for (const [index, segment] of segments.entries()) {
    if (offset >= displayed.length) break;

    const segmentEnd = offset + segment.text.length;
    const visibleEnd = Math.min(displayed.length, segmentEnd);
    if (visibleEnd <= offset) continue;

    const chunk = displayed.slice(offset, visibleEnd);
    nodes.push(
      segment.highlight ? (
        <span key={`${index}-${offset}`} className="about-intro-highlight">
          {chunk}
        </span>
      ) : (
        <span key={`${index}-${offset}`}>{chunk}</span>
      )
    );
    offset = segmentEnd;
  }

  return nodes;
}

export function AboutTypewriterBody({
  paragraphs,
  layoutParagraphs,
  active,
  className = "",
}: AboutTypewriterBodyProps) {
  const contentKey = paragraphs
    .map((segments) => aboutIntroPlainText(segments))
    .join("\u0000");

  const plainParagraphs = useMemo(
    () => contentKey.split("\u0000"),
    [contentKey]
  );

  const [lines, setLines] = useState<string[]>(() =>
    plainParagraphs.map(() => "")
  );
  const [typingIndex, setTypingIndex] = useState<number | null>(null);
  const completedKeyRef = useRef<string | null>(null);

  useEffect(() => {
    if (!active) return;

    // Already finished this copy — keep full text (e.g. scroll back into view).
    if (completedKeyRef.current === contentKey) {
      setLines(plainParagraphs);
      setTypingIndex(null);
      return;
    }

    // Locale switched after the first run — swap text without replaying.
    if (completedKeyRef.current !== null) {
      completedKeyRef.current = contentKey;
      setLines(plainParagraphs);
      setTypingIndex(null);
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) {
      completedKeyRef.current = contentKey;
      setLines(plainParagraphs);
      setTypingIndex(null);
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;
    let cancelled = false;

    const run = async () => {
      setLines(plainParagraphs.map(() => ""));
      setTypingIndex(null);
      try {
        for (let index = 0; index < plainParagraphs.length; index++) {
          if (cancelled) return;
          setTypingIndex(index);
          await typeParagraph(plainParagraphs[index], signal, (value) => {
            if (cancelled) return;
            setLines((current) => {
              const next = [...current];
              next[index] = value;
              return next;
            });
          });
          if (index < plainParagraphs.length - 1) {
            await wait(180, signal);
          }
        }
        if (!cancelled) {
          completedKeyRef.current = contentKey;
          setTypingIndex(null);
        }
      } catch {
        // aborted
      }
    };

    void run();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [active, contentKey, plainParagraphs]);

  return (
    <div className={className} aria-live="polite">
      {paragraphs.map((segments, index) => {
        const paragraph = plainParagraphs[index] ?? "";
        const displayed = lines[index] ?? "";
        const layoutText = layoutParagraphs[index] ?? paragraph;
        const isTyping =
          typingIndex === index && displayed.length < paragraph.length;

        return (
          <p
            key={index}
            className="about-intro-paragraph relative text-xl leading-relaxed text-foreground"
          >
            <span className="invisible block" aria-hidden="true">
              {layoutText}
            </span>
            <span className="absolute inset-0 block">
              {renderDisplayedSegments(displayed, segments)}
              {isTyping ? (
                <span className="inline-block w-[2px] h-[1em] ml-0.5 align-[-0.12em] rounded-full bg-foreground/80 opacity-90" />
              ) : null}
            </span>
          </p>
        );
      })}
    </div>
  );
}
