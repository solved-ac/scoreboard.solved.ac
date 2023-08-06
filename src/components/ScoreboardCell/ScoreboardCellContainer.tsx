import styled from "@emotion/styled";
import { PropsWithChildren } from "react";
import { ScoreboardCellProps } from "./ScoreboardCell";
import {
    AC_COLOR,
    FREEZE_COLOR,
    PAC_COLOR,
    PWA_COLOR,
    ScoreboardCellContainerBase,
    ScoreboardCellTransformWrapper,
    WA_COLOR,
} from "./ScoreboardCellCommons";

const ScoreboardCellContainerAc = styled(ScoreboardCellContainerBase)`
  background-color: ${AC_COLOR};
`;

const ScoreboardCellContainerWa = styled(ScoreboardCellContainerBase)`
  background-color: ${WA_COLOR};
`;

const ScoreboardCellContainerFreeze = styled(ScoreboardCellContainerBase)`
  background-color: ${FREEZE_COLOR};
`;

const ScoreboardCellContainer = ({
  problem,
  result,
  children,
}: PropsWithChildren<ScoreboardCellProps>) => {
  const [totalSubmissions, , acceptedState, bestScore, , pending, freezed] =
    result || [0, 0, null, 0, 0, 0, 0];

  const problemScore = problem.score;

  if (!totalSubmissions) {
    return <ScoreboardCellContainerBase />;
  }

  if (acceptedState === "true") {
    return (
      <ScoreboardCellContainerAc>
        <ScoreboardCellTransformWrapper>
          {children}
        </ScoreboardCellTransformWrapper>
      </ScoreboardCellContainerAc>
    );
  }

  // acceptedState === "false" || acceptedState === "partial"

  if (freezed || pending) {
    if (acceptedState === "partial") {
      const problemScoreRatio = (bestScore / (problemScore || 1)) * 100;
      return (
        <ScoreboardCellContainerAc
          style={{
            background: `linear-gradient(to top, ${PAC_COLOR} 0%, ${PAC_COLOR} ${problemScoreRatio}%, ${FREEZE_COLOR} ${problemScoreRatio}%, ${FREEZE_COLOR} 100%)`,
          }}
        >
          <ScoreboardCellTransformWrapper>
            {children}
          </ScoreboardCellTransformWrapper>
        </ScoreboardCellContainerAc>
      );
    }
    return (
      <ScoreboardCellContainerFreeze>
        <ScoreboardCellTransformWrapper>
          {children}
        </ScoreboardCellTransformWrapper>
      </ScoreboardCellContainerFreeze>
    );
  }

  if (acceptedState === "partial") {
    // score
    const problemScoreRatio = (bestScore / (problemScore || 1)) * 100;
    return (
      <ScoreboardCellContainerAc
        style={{
          background: `linear-gradient(to top, ${PAC_COLOR} 0%, ${PAC_COLOR} ${problemScoreRatio}%, ${PWA_COLOR} ${problemScoreRatio}%, ${PWA_COLOR} 100%)`,
        }}
      >
        <ScoreboardCellTransformWrapper>
          {children}
        </ScoreboardCellTransformWrapper>
      </ScoreboardCellContainerAc>
    );
  }

  if (acceptedState === "false") {
    return (
      <ScoreboardCellContainerWa>
        <ScoreboardCellTransformWrapper>
          {children}
        </ScoreboardCellTransformWrapper>
      </ScoreboardCellContainerWa>
    );
  }

  return (
    <ScoreboardCellContainerBase>
      <ScoreboardCellTransformWrapper>
        {children}
      </ScoreboardCellTransformWrapper>
    </ScoreboardCellContainerBase>
  );
};

export default ScoreboardCellContainer;
