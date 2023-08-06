import styled from "@emotion/styled";
import { formatNumber } from "../utils/format";
import Ox from "./Ox";
import { Sup } from "./Sup";

const RankContainer = styled.div`
  display: flex;
  width: 80px;
  flex: 0 0 80px;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  font-weight: 700;
`;

const RankContainerBig = styled(RankContainer)`
  font-size: 1.5em;
`;

interface Props {
  rank: number | null;
}

const Rank = ({ rank }: Props) => {
  if (rank === null) {
    return (
      <RankContainer>
        <Ox>?</Ox>
      </RankContainer>
    );
  }

  if (rank <= 10) {
    return (
      <RankContainerBig>
        <Ox>
          <Sup>#</Sup>
          {formatNumber(rank)}
        </Ox>
      </RankContainerBig>
    );
  }

  return (
    <RankContainer>
      <Ox>{formatNumber(rank)}</Ox>
    </RankContainer>
  );
};

export default Rank;
