import styled from "@emotion/styled";
import { mix, transparentize } from "polished";
import { ContestResponse, TeamResponseItem } from "../types/Scoreboard";
import ArenaTierBadge from "./ArenaTierBadge";
import Rank from "./Rank";
import Score from "./Score";
import ScoreboardCell from "./ScoreboardCell";

const ScoreboardRowWrapper = styled.div<{ highlight?: boolean }>`
  background-color: ${({ theme, highlight }) =>
    highlight
      ? transparentize(
          0.15,
          mix(0.5, theme.color.status.success, theme.color.background.page)
        )
      : "transparent"};
  ${({ highlight }) => (highlight ? "backdrop-filter: blur(4px);" : "")}

  &:nth-of-type(even) {
    background-color: ${({ theme, highlight }) =>
      highlight
        ? transparentize(
            0.15,
            mix(0.5, theme.color.status.success, theme.color.background.page)
          )
        : theme.color.background.card.main};
  }
`;

const ScoreboardRowContainer = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 8px 0;
  max-width: 1600px;
  & > * {
    min-width: 0;
  }
  @media (max-width: 768px) {
    padding: 4px 0;
  }
`;

const HandleContainer = styled.a`
  display: flex;
  flex: 0 0 160px;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 0px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  @media (max-width: 768px) {
    flex-direction: row;
    gap: 8px;
    align-items: center;
    justify-content: flex-start;
    flex: unset;
    padding: 4px 0;
  }
`;

const ProblemResultRowContainer = styled.div`
  flex: 1 0 0;
  min-width: 0;
`;

const ProblemResultRow = styled.div`
  margin: 0 auto;
  display: flex;
  flex: 1 0 0;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ProblemsContainer = styled.div`
  display: flex;
  flex: 1 0 0;
  min-width: 0;
  gap: 8px;
  transform: skewX(-9deg);
  @media (max-width: 768px) {
    gap: 0;
    transform: none;
  }
`;

interface Props {
  contest: ContestResponse;
  team: TeamResponseItem;
  myHandle?: string;
}

const ScoreboardRow = ({ team, contest, myHandle }: Props) => {
  const { rank, tier, handle, score, problems: teamProblems } = team;
  const { problems: contestProblems } = contest;
  return (
    <ScoreboardRowWrapper highlight={myHandle === handle}>
      <ScoreboardRowContainer>
        <Rank rank={rank} />
        <ProblemResultRow>
          <HandleContainer href={`https://solved.ac/profile/${handle}/arena`}>
            <ArenaTierBadge value={tier} />
            {handle}
          </HandleContainer>
          <ProblemResultRowContainer
            style={{ maxWidth: contestProblems.length * 120 }}
          >
            <ProblemsContainer>
              {contestProblems.map((p, i) => (
                <ScoreboardCell
                  key={i}
                  problem={p}
                  result={teamProblems.length > i ? teamProblems[i] : null}
                />
              ))}
            </ProblemsContainer>
          </ProblemResultRowContainer>
        </ProblemResultRow>
        {/* <Typo description>{JSON.stringify(team)}</Typo> */}
        <Score score={score[0]} penalty={score[1]} />
      </ScoreboardRowContainer>
    </ScoreboardRowWrapper>
  );
};

export default ScoreboardRow;
