import styled from "@emotion/styled";
import { Space } from "@solved-ac/ui-react";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    const controller = new AbortController();

    acAxios
      .get<ScoreboardResponse>("/contest/scoreboard", {
        signal: controller.signal,
        params: options,
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

    () => {
      controller.abort();
    };
  }, [options, setOption]);

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
      {scoreboard
        ? scoreboard.teams.items.map((x, i) => (
            <ScoreboardRow
              key={i}
              team={x}
              contest={contest}
              myHandle={myHandle}
            />
          ))
        : null}
      <Space h={96} />
      <Pagination
        totalContestants={teamsCount}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default Scoreboard;
