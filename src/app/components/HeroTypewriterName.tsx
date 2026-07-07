import { useCallback, useEffect, useRef, useState } from "react";

type HeroTypewriterNameProps = {
  text: string;
  active: boolean;
  className?: string;
};

const CHAR_DELAY_MS = 90;

const textTypography =
  "font-semibold tracking-[-0.03em] leading-[1.12] whitespace-pre";

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
    <div
      className={`relative inline-block max-w-full overflow-visible pb-3 ${className}`}
      aria-label={text}
    >
      <h1 className="sr-only">{text}</h1>

      <div className="relative inline-block overflow-visible">
        <span
          className={`invisible block ${textTypography} pb-[0.12em]`}
          aria-hidden="true"
        >
          {text}
        </span>

        <span
          className={`absolute inset-0 block overflow-visible ${textTypography} pb-[0.12em]`}
          aria-hidden="true"
        >
          <span className="bg-gradient-to-b from-gray-950 via-gray-900 to-gray-600 bg-clip-text text-transparent">
            {displayed}
          </span>
          {showCursor && (
            <span className="inline-block w-[3px] md:w-1 h-[0.72em] ml-1 md:ml-1.5 rounded-full bg-gray-800 align-middle opacity-90" />
          )}
        </span>
      </div>
    </div>
  );
}
