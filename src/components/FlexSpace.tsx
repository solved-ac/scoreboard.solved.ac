interface Props {
  w: number;
}

const FlexSpace = ({ w }: Props) => {
  return <div style={{ flex: `0 0 ${w}px`, minWidth: 0 }} />;
};

export default FlexSpace;
