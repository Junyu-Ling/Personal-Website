import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

type AboutTypewriterBodyProps = {
  paragraphs: string[];
  layoutParagraphs: readonly string[];
  highlights?: readonly (readonly string[])[];
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

function renderHighlightedText(text: string, keywords: readonly string[]) {
  if (!text || keywords.length === 0) return text;

  const terms = [...keywords].sort((a, b) => b.length - a.length);
  const pattern = terms
    .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  const regex = new RegExp(`(${pattern})`, "gi");
  const parts = text.split(regex).filter(Boolean);

  return parts.map((part, index) => {
    const isHighlight = terms.some(
      (term) => term.toLowerCase() === part.toLowerCase()
    );
    if (isHighlight) {
      return (
        <strong key={`${part}-${index}`} className="about-intro-highlight">
          {part}
        </strong>
      );
    }
    return part;
  }) as ReactNode;
}

export function AboutTypewriterBody({
  paragraphs,
  layoutParagraphs,
  highlights = [],
  active,
  className = "",
}: AboutTypewriterBodyProps) {
  const [lines, setLines] = useState<string[]>(() => paragraphs.map(() => ""));
  const [typingIndex, setTypingIndex] = useState<number | null>(null);
  const runIdRef = useRef(0);
  const hasStartedRef = useRef(false);

  const reset = useCallback(() => {
    setLines(paragraphs.map(() => ""));
    setTypingIndex(null);
  }, [paragraphs]);

  useEffect(() => {
    if (hasStartedRef.current) {
      setLines(paragraphs);
      setTypingIndex(null);
      return;
    }

    if (!active) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      hasStartedRef.current = true;
      setLines(paragraphs);
      setTypingIndex(null);
      return;
    }

    const runId = ++runIdRef.current;
    const controller = new AbortController();
    const { signal } = controller;
    hasStartedRef.current = true;

    const run = async () => {
      reset();
      try {
        for (let index = 0; index < paragraphs.length; index++) {
          if (runId !== runIdRef.current) return;
          setTypingIndex(index);
          await typeParagraph(paragraphs[index], signal, (value) => {
            if (runId !== runIdRef.current) return;
            setLines((current) => {
              const next = [...current];
              next[index] = value;
              return next;
            });
          });
          if (index < paragraphs.length - 1) {
            await wait(180, signal);
          }
        }
        if (runId === runIdRef.current) setTypingIndex(null);
      } catch {
        // aborted
      }
    };

    void run();

    return () => {
      controller.abort();
    };
  }, [active, paragraphs, reset]);

  return (
    <div className={className} aria-live="polite">
      {paragraphs.map((paragraph, index) => {
        const displayed = lines[index] ?? "";
        const layoutText = layoutParagraphs[index] ?? paragraph;
        const paragraphHighlights = highlights[index] ?? [];
        const isTyping = typingIndex === index && displayed.length < paragraph.length;

        return (
          <p
            key={index}
            className="relative text-lg md:text-xl text-foreground leading-[1.75]"
          >
            <span className="invisible block" aria-hidden="true">
              {layoutText}
            </span>
            <span className="absolute inset-0 block">
              {renderHighlightedText(displayed, paragraphHighlights)}
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
