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

const MyRowContainer = styled.div`
  position: sticky;
  top: 108px;
  z-index: 2;
`;

const Scoreboard = () => {
  const { options, setOption } = useOptions();

  const [scoreboard, setScoreboard] = useState<ScoreboardResponse | null>(null);
  const [stats, setStats] = useState<ProblemStatsResponse[] | null>(null);
  const [teamsCount, setTeamsCount] = useState<number>(0);
  const [my, setMy] = useState<TeamResponseItem | null>(null);
  const [contest, setContest] = useState<ContestResponse | null>(null);

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
            contestId: options.contestId,
            page: options.page,
            rated: options.excludeNoRated,
          },
        })
        .then((res) => {
          setScoreboard(res.data);
          setStats(res.data.stats);
          setTeamsCount(res.data.teams.count);
          setContest(res.data.contest);
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
        });
    };

    recur();

    const interval = setInterval(recur, 10000);

    return () => {
      clearInterval(interval);
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, [options.contestId, options.excludeNoRated, options.page, setOption]);

  const handlePageChange = (page: number) => {
    if (options.page === page) {
      return;
    }
    setScoreboard(null);
    setOption({
      page,
    });
  };

  if (!contest) {
    return <></>;
  }

  const myHandle = my?.handle;

  return (
    <>
      <Header contest={contest} stats={stats} />
      {my && (
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
      />
    </>
  );
};

export default Scoreboard;
