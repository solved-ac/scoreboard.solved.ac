import styled from "@emotion/styled";
import { Typo } from "@solved-ac/ui-react";
import { formatNumber } from "../utils/format";
import Ox from "./Ox";

const ScoreContainer = styled.div`
  display: flex;
  width: 96px;
  padding: 0 8px;
  flex-direction: column;
  flex: 0 0 96px;
  align-items: flex-end;
  justify-content: center;
`;

const PenaltyText = styled(Typo)`
  font-size: 0.9em;
  line-height: 1;
  font-feature-settings: "tnum";
`;

const ScoreText = styled(Typo)`
  font-size: 1.2em;
  font-weight: 700;
`;

interface Props {
  score: number;
  penalty: number;
}

const Score = ({ score, penalty }: Props) => {
  return (
    <ScoreContainer>
      <Ox>
        <ScoreText>{formatNumber(score)}</ScoreText>
      </Ox>
      <PenaltyText description>&minus;{formatNumber(penalty)}</PenaltyText>
    </ScoreContainer>
  );
};

export default Score;
