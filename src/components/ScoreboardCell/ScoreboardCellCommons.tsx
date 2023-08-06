import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

export const AC_COLOR = "#19d57d";
export const WA_COLOR = "#d83a4a";
export const PAC_COLOR = "#20a4d9";
export const PWA_COLOR = "#6ecce3";
export const FREEZE_COLOR = "#f8ac59";

export const ScoreboardCellContainerBase = styled.div`
  flex: 1 0 0;
  min-width: 0;
  padding: 8px 4px;
  color: ${({ theme }) => theme.color.text.primary.inverted};
  overflow: hidden;
  position: relative;
  @media (max-width: 768px) {
    padding: 4px;
  }
`;

export const ScoreboardCellTransformWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  justify-content: center;
  transform: skewX(9deg);
  @media (max-width: 768px) {
    transform: none;
  }
`;

export const CellResult = styled.div`
  display: flex;
  line-height: 1;
  align-items: center;
  font-size: 1.2em;
  @media (max-width: 768px) {
    font-size: 1em;
  }
`;

export const CellResultAc = styled(CellResult)`
  font-weight: 700;
`;

export const CellResultPenalty = styled.div`
  font-size: 0.8em;
  line-height: 1;
  font-feature-settings: "tnum";
`;

const faderBackgroundAnimation = keyframes`
    0% {
        background-position: ${64 * Math.SQRT2}px 0;
    }
    100% {
        background-position: 0 0;
    }
`;

export const CellPendingFader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: repeating-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0.6) 8px,
    rgba(255, 255, 255, 0.3) 8px,
    rgba(255, 255, 255, 0.3) 16px
  );
  background-size: ${64 * Math.SQRT2}px ${64 * Math.SQRT2}px;
  animation: ${faderBackgroundAnimation} 5s linear infinite;
`;
