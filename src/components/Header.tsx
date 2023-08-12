import styled from "@emotion/styled";
import { Button, NavBar, Space, Tooltip, Typo } from "@solved-ac/ui-react";
import { IconClock, IconMoon, IconSun, IconTrophy } from "@tabler/icons-react";
import { transparentize } from "polished";
import { useOptions } from "../hooks/useOptions";
import { ContestResponse, ProblemStatsResponse } from "../types/Scoreboard";
import { Container } from "./Container";
import { HoverLink } from "./HoverLink";
import { HideOnMobile, ShowOnMobile } from "./Mobile";
import Timer from "./Timer";

const TopFix = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
`;

const TopBar = styled(NavBar)`
  background-color: ${({ theme }) =>
    transparentize(0.1, theme.color.background.page)};
  backdrop-filter: blur(4px);
`;

const TopBarContents = styled(Container)`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 16px;
  white-space: nowrap;
`;

const HeaderContainer = styled(Container)`
  width: 100%;
  padding: 8px 0;
  background-image: linear-gradient(
    to bottom,
    ${({ theme }) => transparentize(0.1, theme.color.background.page)} 0%,
    ${({ theme }) => transparentize(0.3, theme.color.background.page)} 40%,
    transparent
  );
  @media (max-width: 768px) {
    padding: 4px 0;
  }
`;

const HeaderRow = styled.div`
  margin: 0 auto;
  padding-left: 240px;
  padding-right: 96px;
  @media (max-width: 768px) {
    padding-left: 80px;
  }
`;

const ContestTitle = styled.div`
  min-width: 0;
  padding-right: 16px;
  display: flex;
  align-items: center;
  flex: 1 0 0;
  & > * {
    min-width: 0;
  }
`;

const NoShrink = styled.div`
  flex-shrink: 0;
  min-width: 0;
`;

const StatsRow = styled(HeaderRow)`
  display: flex;
  padding-left: 0;
  @media (max-width: 768px) {
    padding-left: 0;
  }
`;

const StatsContainer = styled.div`
  font-size: 0.8rem;
  font-feature-settings: "tnum";
`;

const StatsLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 240px;
  min-width: 0;
  padding-left: 80px;
  @media (max-width: 768px) {
    flex: 0 0 80px;
    padding-left: 16px;
  }
`;

const ProblemsContainer = styled.div`
  display: flex;
  flex: 1 0 0;
  gap: 8px;
  /* transform: skewX(-9deg); */
  @media (max-width: 768px) {
    gap: 0;
    transform: none;
  }
`;

const ContestLinkContainer = styled.div`
  display: flex;
  gap: 8px;
  min-width: 0;
`;

const ContestIconContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 0 0 24px;
  width: 24px;
  min-width: 0;
`;

const ContestTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

interface Props {
  contest: ContestResponse;
  stats: ProblemStatsResponse[] | null;
}

const Header = ({ contest, stats }: Props) => {
  const { options, setOption } = useOptions();
  const { problems: contestProblems, title, contestId, hasScores } = contest;

  return (
    <>
      <TopFix>
        <TopBar>
          <TopBarContents>
            <ContestTitle>
              <HoverLink
                href={`https://www.acmicpc.net/contest/view/${contestId}`}
              >
                <ContestLinkContainer>
                  <ContestIconContainer>
                    <IconTrophy />
                  </ContestIconContainer>
                  <ContestTitleContainer>
                    <Typo ellipsis>{title}</Typo>
                    <Typo description small>
                      <b>{options.excludeNoRated ? "rated" : "all"}</b>
                      {options.rivals ? (
                        " rivals"
                      ) : (
                        <HideOnMobile style={{ display: "inline" }}>
                          {" "}
                          contestants
                        </HideOnMobile>
                      )}
                    </Typo>
                  </ContestTitleContainer>
                </ContestLinkContainer>
              </HoverLink>
            </ContestTitle>
            <NoShrink>
              <Typo tabular>
                <IconClock /> <Timer contest={contest} />
              </Typo>
            </NoShrink>
            <NoShrink>
              <Tooltip title="Change theme">
                <Button
                  transparent
                  circle
                  onClick={() =>
                    setOption({
                      theme: options.theme === "light" ? "dark" : "light",
                    })
                  }
                >
                  {options.theme === "light" ? <IconMoon /> : <IconSun />}
                </Button>
              </Tooltip>
            </NoShrink>
          </TopBarContents>
        </TopBar>
        <HeaderContainer>
          <HeaderRow>
            <ProblemsContainer
              style={{ maxWidth: contestProblems.length * 120 }}
            >
              {contestProblems.map((p, i) => {
                return (
                  <HoverLink
                    key={i}
                    style={{ flex: "1 0 0", minWidth: 0 }}
                    href={`https://www.acmicpc.net/contest/problem/${contestId}/${
                      i + 1
                    }`}
                  >
                    <b>{p.displayNumber}</b>
                  </HoverLink>
                );
              })}
            </ProblemsContainer>
          </HeaderRow>
        </HeaderContainer>
      </TopFix>
      <Space h={120} />
      <HeaderContainer style={{ background: "transparent" }}>
        <StatsRow>
          <StatsLeftContainer>
            <StatsContainer>
              <ShowOnMobile>ac</ShowOnMobile>
              <HideOnMobile>accepted</HideOnMobile>
            </StatsContainer>
            <StatsContainer>
              <Typo description>
                <ShowOnMobile>try</ShowOnMobile>
                <HideOnMobile>tried</HideOnMobile>
              </Typo>
            </StatsContainer>
            {hasScores && (
              <StatsContainer>
                <ShowOnMobile>pac</ShowOnMobile>
                <HideOnMobile>partial</HideOnMobile>
              </StatsContainer>
            )}
            <StatsContainer>
              <Typo description>
                <ShowOnMobile>pen</ShowOnMobile>
                <HideOnMobile>pending</HideOnMobile>
              </Typo>
            </StatsContainer>
          </StatsLeftContainer>
          <ProblemsContainer style={{ maxWidth: contestProblems.length * 120 }}>
            {contestProblems.map((_, i) => {
              const { triedTeams, acceptedTeams, partialTeams, frozenTeams } =
                stats?.[i] || {
                  triedTeams: 0,
                  acceptedTeams: 0,
                  partialTeams: 0,
                  frozenTeams: 0,
                };

              return (
                <div key={i} style={{ flex: "1 0 0", minWidth: 0 }}>
                  <StatsContainer>
                    {acceptedTeams}
                    {frozenTeams > 0 && <Typo description>+</Typo>}
                  </StatsContainer>
                  <StatsContainer>
                    <Typo description>{triedTeams}</Typo>
                  </StatsContainer>
                  {hasScores && (
                    <StatsContainer>
                      {partialTeams}
                      {frozenTeams > 0 && <Typo description>+</Typo>}
                    </StatsContainer>
                  )}
                  <StatsContainer>
                    {frozenTeams > 0 && <Typo description>{frozenTeams}</Typo>}
                  </StatsContainer>
                </div>
              );
            })}
          </ProblemsContainer>
        </StatsRow>
      </HeaderContainer>
    </>
  );
};

export default Header;
