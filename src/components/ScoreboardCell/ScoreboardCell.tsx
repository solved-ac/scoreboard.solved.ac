import { ProblemResponse, ProblemTuple } from "../../types/Scoreboard";
import { formatNumber } from "../../utils/format";
import { HideOnMobile, ShowOnMobile } from "../Mobile";
import Ox from "../Ox";
import {
  CellResult,
  CellResultAc,
  CellResultPenalty,
} from "./ScoreboardCellCommons";
import ScoreboardCellContainer from "./ScoreboardCellContainer";

export interface ScoreboardCellProps {
  problem: ProblemResponse;
  result: ProblemTuple | null;
}

export const ScoreboardCell = (props: ScoreboardCellProps) => {
  const { problem, result } = props;
  const [
    totalSubmissions,
    submissionsPriorAc,
    acceptedState,
    bestScore,
    time,
    pending,
    freezed,
  ] = result || [0, 0, null, 0, 0, 0, 0];

  if (!totalSubmissions) {
    return <ScoreboardCellContainer {...props} />;
  }

  if (acceptedState === "true") {
    return (
      <ScoreboardCellContainer {...props}>
        {problem.score === null ? (
          <>
            <CellResultAc>
              <HideOnMobile>
                <Ox>+</Ox>
              </HideOnMobile>
              {submissionsPriorAc > 0 ? (
                <Ox>{submissionsPriorAc}</Ox>
              ) : (
                <ShowOnMobile>
                  <Ox>0</Ox>
                </ShowOnMobile>
              )}
            </CellResultAc>
            <CellResultPenalty>{time}</CellResultPenalty>
          </>
        ) : (
          <>
            <CellResultAc>
              <Ox>{formatNumber(bestScore)}</Ox>
            </CellResultAc>
            <CellResultPenalty>
              {time}
              {submissionsPriorAc > 0 && <>+{submissionsPriorAc}</>}
            </CellResultPenalty>
          </>
        )}
      </ScoreboardCellContainer>
    );
  }

  // acceptedState === "false" || acceptedState === "partial"

  if (freezed || pending) {
    if (problem.score === null) {
      return (
        <ScoreboardCellContainer {...props}>
          <CellResult>
            <HideOnMobile>
              <Ox>?</Ox>
            </HideOnMobile>
            {totalSubmissions > 1 ? (
              <Ox>{totalSubmissions - 1}</Ox>
            ) : (
              <ShowOnMobile>
                <Ox>0</Ox>
              </ShowOnMobile>
            )}
          </CellResult>
          <CellResultPenalty>&nbsp;</CellResultPenalty>
        </ScoreboardCellContainer>
      );
    }
    // score problem
    if (acceptedState === "partial") {
      return (
        <ScoreboardCellContainer {...props}>
          <CellResultAc>
            <Ox>{formatNumber(bestScore)}?</Ox>
          </CellResultAc>
          <CellResultPenalty>
            {time}
            {submissionsPriorAc > 0 && <>+{submissionsPriorAc}</>}
          </CellResultPenalty>
        </ScoreboardCellContainer>
      );
    }
    if (acceptedState === "false") {
      return (
        <ScoreboardCellContainer {...props}>
          <CellResult>
            <Ox>{formatNumber(bestScore)}?</Ox>
          </CellResult>
          <CellResultPenalty>&minus;{totalSubmissions}</CellResultPenalty>
        </ScoreboardCellContainer>
      );
    }
  }

  if (acceptedState === "partial") {
    // score
    return (
      <ScoreboardCellContainer {...props}>
        <CellResultAc>
          <Ox>{formatNumber(bestScore)}</Ox>
        </CellResultAc>
        <CellResultPenalty>
          {time}
          {submissionsPriorAc > 0 && <>+{submissionsPriorAc}</>}
        </CellResultPenalty>
      </ScoreboardCellContainer>
    );
  }

  if (acceptedState === "false") {
    return (
      <ScoreboardCellContainer {...props}>
        {problem.score === null ? (
          <>
            <CellResult>
              <HideOnMobile>
                <Ox>&minus;</Ox>
              </HideOnMobile>
              <Ox>{totalSubmissions}</Ox>
            </CellResult>
            <CellResultPenalty>&nbsp;</CellResultPenalty>
          </>
        ) : (
          <>
            <CellResult>
              <Ox>{formatNumber(bestScore)}</Ox>
            </CellResult>
            <CellResultPenalty>&minus;{totalSubmissions}</CellResultPenalty>
          </>
        )}
      </ScoreboardCellContainer>
    );
  }

  return (
    <ScoreboardCellContainer {...props}>
      {acceptedState}
      {submissionsPriorAc}
    </ScoreboardCellContainer>
  );
};
