import styled from "@emotion/styled";

export const HideOnMobile = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

export const ShowOnMobile = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;
