import styled from "@emotion/styled";
import { Button, Tooltip, Typo } from "@solved-ac/ui-react";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconFlag,
  IconFlagOff,
  IconUserHeart,
  IconUserOff,
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
  display: flex;
  flex-direction: column;
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
  const myPage =
    options.myRowNumber !== null ? Math.ceil(options.myRowNumber / 50) : null;

  return (
    <PaginationFix>
      <PaginationRow>
        <Tooltip title="Rated">
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
        </Tooltip>
        <Tooltip title="Rivals">
          <Button
            transparent
            circle
            onClick={() => {
              handleReset();
              setOption({
                rivals: !options.rivals,
                page: 1,
              });
            }}
          >
            {options.rivals ? <IconUserHeart /> : <IconUserOff />}
          </Button>
        </Tooltip>
        <div style={{ flex: 1 }} />
        {myPage !== null && (
          <Tooltip title="My rank">
            <Button transparent circle onClick={() => handlePageChange(myPage)}>
              <IconUserUp />
            </Button>
          </Tooltip>
        )}
        <Tooltip title="First page">
          <Button
            transparent
            circle
            onClick={() => handlePageChange(1)}
            disabled={options.page <= 1}
          >
            <IconChevronsLeft />
          </Button>
        </Tooltip>
        <Tooltip title="Previous page">
          <Button
            transparent
            circle
            onClick={() => handlePageChange(options.page - 1)}
            disabled={options.page <= 1}
          >
            <IconChevronLeft />
          </Button>
        </Tooltip>
        <PageDisplay maxWidthContent={`#${formatNumber(totalContestants)}`}>
          #{formatNumber(rankRangeStart)}
          <Typo description small>
            / {formatNumber(totalContestants)}
          </Typo>
        </PageDisplay>
        <Tooltip title="Next page">
          <Button
            transparent
            circle
            onClick={() => handlePageChange(options.page + 1)}
            disabled={options.page >= totalPage}
          >
            <IconChevronRight />
          </Button>
        </Tooltip>
      </PaginationRow>
    </PaginationFix>
  );
};

export default Pagination;
