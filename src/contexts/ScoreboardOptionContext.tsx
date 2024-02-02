import { PropsWithChildren, createContext, useCallback, useState } from "react";
import { getCache, setCache } from "../utils/localStorage";

export interface ScoreboardOptionsCache {
  theme: "light" | "dark" | "black";
  page: number;
  excludeNoRated: boolean;
  rivals: boolean;
}

export interface ScoreboardOptions {
  theme: "light" | "dark" | "black";
  contestIds: number[];
  page: number;
  myRowNumber: number | null;
  excludeNoRated: boolean;
  rivals: boolean;
}

export interface ScoreboardOptionContextType {
  options: ScoreboardOptions;
  setOption: (option: Partial<ScoreboardOptions>) => void;
}

const OPTIONS_CACHE_KEY = "ac-scoreboard-options";

const OPTIONS_DEFAULT: ScoreboardOptions = {
  theme: "light" as const,
  excludeNoRated: true,
  rivals: false,
  page: 1,
  myRowNumber: null,
  contestIds: [],
};

export const ScoreboardOptionContext =
  createContext<ScoreboardOptionContextType>({} as ScoreboardOptionContextType);

const getCachedOptions = (): ScoreboardOptionsCache => {
  const cache = getCache<ScoreboardOptionsCache>(OPTIONS_CACHE_KEY);
  if (!cache) return OPTIONS_DEFAULT;

  const { page, excludeNoRated, theme } = cache;

  const resolvedOptions = {
    ...OPTIONS_DEFAULT,
    page,
    excludeNoRated,
    theme,
  };

  setCache(OPTIONS_CACHE_KEY, resolvedOptions);
  return resolvedOptions;
};

export const ScoreboardOptionProvider = (props: PropsWithChildren) => {
  const { searchParams } = new URL(window.location.href);

  const contestIds = (() => {
    const contestIdString = searchParams.get("contestId");
    const contestIdArray = searchParams.get("contestIds");

    if (typeof contestIdString === "string") {
      return [Number(contestIdString)];
    }
    if (typeof contestIdArray === "string") {
      return contestIdArray.split(",").map(Number);
    }
    return [];
  })()

  const [options, setOptions] = useState<ScoreboardOptions>({
    ...getCachedOptions(),
    contestIds,
    myRowNumber: null,
  });

  const setOption = useCallback((option: Partial<ScoreboardOptions>) => {
    setOptions((prev) => {
      const newOption = { ...prev, ...option };
      setCache(OPTIONS_CACHE_KEY, newOption);
      return newOption;
    });
  }, []);

  return (
    <ScoreboardOptionContext.Provider value={{ options, setOption }}>
      {props.children}
    </ScoreboardOptionContext.Provider>
  );
};
