import { CountedItems } from "./CountedItems";

export interface ScoreboardOptions {}

export type ScoreTuple = [number, number];

export type ZeroOrOne = 0 | 1;

export type AcceptedState = "true" | "false" | "partial";

/**
 * Problem result tuple for a team.
 *
 * 0. total submission count.
 * 1. submission count prior to accepted run.
 * 2. accepted state before freeze.
 * 3. best score before freeze.
 * 4. the time (in minutes) when the best score was achieved.
 * 5. if the run is pending.
 * 6. if there are more runs after freeze.
 */
export type ProblemTuple = [
  number,
  number,
  AcceptedState,
  number,
  number,
  ZeroOrOne,
  ZeroOrOne
];

export interface TeamResponseItem {
  /**
   * ID of the team.
   */
  handle: string;
  /**
   * Arena tier of the team.
   * Integer min 0, max 14
   */
  tier: number;
  /**
   * Score of the user.
   *
   * 0. accepted problems, ot total score of the team.
   * 1. penalty time.
   */
  score: ScoreTuple;
  /**
   * Problem results.
   *
   * The length of this array is the number of problems in the contest,
   * or possibly zero if the user has not submitted any runs.
   */
  problems: (ProblemTuple | null)[];
  /**
   * Rank of the team.
   */
  rank: number | null;
}

export interface ProblemResponse {
  id: number;
  displayNumber: string;
  title: string;
  score: number | null;
}

export interface ProblemStatsResponse {
  triedTeams: number;
  acceptedTeams: number;
  partialTeams: number;
  frozenTeams: number;
  firstSolveSubmissionId: number | null;
}

export interface ContestResponse {
  contestId: number;
  title: string;
  start: string;
  end: string;
  penalty: number;
  penaltyMode: "ioi" | "icpc";
  hasScores: boolean;
  problems: ProblemResponse[];
}

export interface ScoreboardResponse {
  contest: ContestResponse;
  teams: CountedItems<TeamResponseItem>;
  stats: ProblemStatsResponse[] | null;
  my: {
    result: TeamResponseItem | null;
    rated: boolean;
    rowNumber: number | null;
  };
}

export type TeamResponse = CountedItems<TeamResponseItem>;
