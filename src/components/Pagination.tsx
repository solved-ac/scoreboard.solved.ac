import styled from "@emotion/styled";
import { Button, Typo } from "@solved-ac/ui-react";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconFlag,
  IconFlagOff,
  IconUserUp,
} from "@tabler/icons-react";
import { transparentize } from "polished";
import { useOptions } from "../hooks/useOptions";
import { formatNumber } from "../utils/format";
import { Container } from "./Container";

const PaginationFix = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background-color: ${({ theme }) =>
    transparentize(0.1, theme.color.background.page)};
  backdrop-filter: blur(4px);
  border-top: ${({ theme }) => theme.styles.border()};
`;

const PaginationRow = styled(Container)`
  height: 100%;
  display: flex;
  align-items: center;
`;

const PageDisplay = styled.span<{ maxWidthContent?: string }>`
  user-select: none;
  font-feature-settings: "tnum";
  position: relative;
  text-align: right;
  &:before {
    content: "${({ maxWidthContent: placeholder }) => placeholder ?? ""}";
    display: block;
    height: 0;
    color: transparent;
  }
`;

interface Props {
  totalContestants: number;
  handlePageChange: (page: number) => void;
  handleReset: () => void;
}

const Pagination = (props: Props) => {
  const { options, setOption } = useOptions();
  const { totalContestants, handlePageChange, handleReset } = props;

  const totalPage = Math.ceil(totalContestants / 50);
  const rankRangeStart = Math.min(
    totalContestants,
    (options.page - 1) * 50 + 1
  );
  const rankRangeEnd = Math.min(totalContestants, options.page * 50);
  const myPage =
    options.myRowNumber !== null ? Math.ceil(options.myRowNumber / 50) : null;

  return (
    <PaginationFix>
      <PaginationRow>
        <Button
          transparent
          circle
          onClick={() => {
            handleReset();
            setOption({
              excludeNoRated: !options.excludeNoRated,
              page: 1,
            });
          }}
        >
          {options.excludeNoRated ? <IconFlag /> : <IconFlagOff />}
        </Button>
        <div style={{ flex: 1 }} />
        {myPage !== null && (
          <Button transparent circle onClick={() => handlePageChange(myPage)}>
            <IconUserUp />
          </Button>
        )}
        <Button
          transparent
          circle
          onClick={() => handlePageChange(1)}
          disabled={options.page <= 1}
        >
          <IconChevronsLeft />
        </Button>
        <Button
          transparent
          circle
          onClick={() => handlePageChange(options.page - 1)}
          disabled={options.page <= 1}
        >
          <IconChevronLeft />
        </Button>
        <PageDisplay
          maxWidthContent={`${formatNumber(totalContestants)} – ${formatNumber(
            totalContestants
          )} / ${formatNumber(totalContestants)}`}
        >
          {formatNumber(rankRangeStart)} &ndash; {formatNumber(rankRangeEnd)}
          <Typo description> / {formatNumber(totalContestants)}</Typo>
        </PageDisplay>
        <Button
          transparent
          circle
          onClick={() => handlePageChange(options.page + 1)}
          disabled={options.page >= totalPage}
        >
          <IconChevronRight />
        </Button>
      </PaginationRow>
    </PaginationFix>
  );
};

export default Pagination;
