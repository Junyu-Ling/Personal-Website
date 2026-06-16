import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export const PAGE_IDS = [
  "home",
  "about",
  "journey",
  "achievements",
  "study-materials",
  "awards",
  "projects",
] as const;

export type PageId = (typeof PAGE_IDS)[number];

function isPageId(value: string): value is PageId {
  return (PAGE_IDS as readonly string[]).includes(value);
}

export function pageIdFromHash(hash: string): PageId {
  const id = hash.replace(/^#/, "") || "home";
  return isPageId(id) ? id : "home";
}

type NavigationContextValue = {
  activePage: PageId;
  navigate: (page: PageId) => void;
};

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [activePage, setActivePage] = useState<PageId>(() =>
    pageIdFromHash(window.location.hash)
  );

  const navigate = useCallback((page: PageId) => {
    setActivePage(page);
    const nextHash = page === "home" ? "" : `#${page}`;
    if (window.location.hash !== nextHash) {
      window.history.pushState(null, "", nextHash || window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      setActivePage(pageIdFromHash(window.location.hash));
      window.scrollTo({ top: 0, behavior: "instant" });
    };

    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("popstate", onHashChange);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("popstate", onHashChange);
    };
  }, []);

  const value = useMemo(
    () => ({ activePage, navigate }),
    [activePage, navigate]
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within NavigationProvider");
  }
  return context;
}
