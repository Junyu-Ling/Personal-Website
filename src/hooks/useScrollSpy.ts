import { useEffect, useState } from "react";

export function useScrollSpy(sectionIds: string[]) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");
  const sectionKey = sectionIds.join("|");

  useEffect(() => {
    const update = () => {
      const probeLine = window.scrollY + window.innerHeight * 0.32;
      let current = sectionIds[0] ?? "";

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;

        const sectionTop =
          element.getBoundingClientRect().top + window.scrollY;

        if (probeLine >= sectionTop) {
          current = id;
        }
      }

      setActiveId(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [sectionKey, sectionIds]);

  return activeId;
}
