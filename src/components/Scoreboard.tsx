import styled from "@emotion/styled";
import { EmptyStatePlaceholder, Space } from "@solved-ac/ui-react";
import { IconLoader } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { useOptions } from "../hooks/useOptions";
import {
  ContestResponse,
  ProblemStatsResponse,
  ScoreboardResponse,
  TeamResponseItem,
} from "../types/Scoreboard";
import acAxios from "../utils/api";
import Header from "./Header";
import Pagination from "./Pagination";
import ScoreboardRow from "./ScoreboardRow";

interface Props {
  index: number;
}

const MyRowContainer = styled.div`
  position: sticky;
  top: 108px;
  z-index: 2;
`;

const Scoreboard = ({ index }: Props) => {
  const { options, setOption } = useOptions();

  const multipleContests = options.contestIds.length > 1;

  const [scoreboard, setScoreboard] = useState<ScoreboardResponse | null>(null);
  const [stats, setStats] = useState<ProblemStatsResponse[] | null>(null);
  const [teamsCount, setTeamsCount] = useState<number>(0);
  const [my, setMy] = useState<TeamResponseItem | null>(null);
  const [contest, setContest] = useState<ContestResponse | null>(null);
  const [contestFinished, setContestFinished] = useState<boolean>(false);

  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const recur = () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      controllerRef.current = new AbortController();

      acAxios
        .get<ScoreboardResponse>("/contest/scoreboard", {
          signal: controllerRef.current.signal,
          params: {
            contestId: options.contestIds[index],
            page: options.page,
            rated: options.excludeNoRated,
            rivals: options.rivals,
          },
        })
        .then((res) => {
          setScoreboard(res.data);
          setStats(res.data.stats);
          setTeamsCount(res.data.teams.count);
          setContest(res.data.contest);

          if (new Date(res.data.contest.end).getTime() < Date.now()) {
            setContestFinished(true);
          }

          if (res.data.my) {
            setMy(res.data.my.result);
            setOption({
              myRowNumber: res.data.my.rowNumber,
            });
          } else {
            setOption({
              myRowNumber: null,
            });
          }
        })
        .catch((e) => {
          if (e.name === "AbortError") {
            return;
          }
          console.error(e);
        });
    };

    recur();

    if (contestFinished) {
      return undefined;
    }

    const interval = setInterval(recur, 10000);

    return () => {
      clearInterval(interval);
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, [
    contestFinished,
    options.excludeNoRated,
    options.rivals,
    options.page,
    setOption,
    options.contestIds,
    index,
  ]);

  const handlePageChange = (page: number) => {
    if (options.page === page) {
      return;
    }
    setScoreboard(null);
    setOption({
      page,
    });
  };

  const handleReset = () => {
    setScoreboard(null);
  };

  if (!contest) {
    return <></>;
  }

  const myHandle = my?.handle;

  return (
    <>
      <Header contest={contest} stats={stats} />
      {!multipleContests && my && (
        <>
          <MyRowContainer>
            <ScoreboardRow team={my} contest={contest} myHandle={myHandle} />
          </MyRowContainer>
          <Space h={24} />
        </>
      )}
      {scoreboard ? (
        scoreboard.teams.items.map((x, i) => (
          <ScoreboardRow
            key={i}
            team={x}
            contest={contest}
            myHandle={myHandle}
          />
        ))
      ) : (
        <EmptyStatePlaceholder>
          <IconLoader />
        </EmptyStatePlaceholder>
      )}
      <Space h={96} />
      <Pagination
        totalContestants={teamsCount}
        handlePageChange={handlePageChange}
        handleReset={handleReset}
      />
    </>
  );
};

export default Scoreboard;
