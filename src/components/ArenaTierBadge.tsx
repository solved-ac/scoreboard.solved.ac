import styled from "@emotion/styled";
import React from "react";

const TierBadgeStyle = styled.img`
  line-height: inherit;
  width: 2.5em;
  height: 1em;
  vertical-align: middle;
`;

interface Props {
  value: number;
  invalidated?: boolean;
}

const ArenaTierBadge: React.FC<Props> = (props) => {
  const { value, invalidated } = props;

  const levelImageName = value.toString();

  return (
    <>
      <TierBadgeStyle
        src={`https://static.solved.ac/tier_arena/${levelImageName}.svg`}
        style={invalidated ? { filter: "grayscale(100%)" } : {}}
      />
    </>
  );
};

export default ArenaTierBadge;
