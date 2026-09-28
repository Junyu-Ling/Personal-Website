import { useCallback, useEffect, useRef, useState } from "react";

type HeroTypewriterNameProps = {
  text: string;
  active: boolean;
  className?: string;
};

const CHAR_DELAY_MS = 90;

const textTypography =
  "font-semibold tracking-[-0.03em] leading-[1.05] whitespace-pre";

export function HeroTypewriterName({
  text,
  active,
  className = "",
}: HeroTypewriterNameProps) {
  const [displayed, setDisplayed] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearPending = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const runTypewriter = useCallback(() => {
    clearPending();
    setDisplayed("");
    setIsTyping(true);

    const chars = text.split("");
    chars.forEach((_, index) => {
      const timeout = setTimeout(() => {
        setDisplayed(text.slice(0, index + 1));
        if (index === chars.length - 1) {
          setIsTyping(false);
        }
      }, index * CHAR_DELAY_MS);
      timeoutsRef.current.push(timeout);
    });
  }, [clearPending, text]);

  useEffect(() => {
    if (!active) {
      clearPending();
      setDisplayed("");
      setIsTyping(false);
      return clearPending;
    }

    runTypewriter();
    return clearPending;
  }, [active, text, runTypewriter, clearPending]);

  const showCursor = isTyping && displayed.length < text.length;

  return (
    <h1
      className={`relative inline-block max-w-full overflow-visible ${className}`}
      aria-label={text}
    >
      <span
        className={`invisible block ${textTypography} pb-[0.08em]`}
        aria-hidden="true"
      >
        {text}
      </span>

      <span
        className={`absolute inset-0 block overflow-visible ${textTypography} pb-[0.08em]`}
        aria-hidden="true"
      >
        <span className="text-foreground">{displayed}</span>
        {showCursor && (
          <span className="inline-block w-[2px] h-[0.72em] ml-1 md:ml-1.5 rounded-sm bg-foreground/80 align-middle" />
        )}
      </span>
    </h1>
  );
}
