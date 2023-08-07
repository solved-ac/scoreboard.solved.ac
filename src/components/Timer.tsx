import { useEffect, useState } from "react";
import { ContestResponse } from "../types/Scoreboard";
import { twoDigits } from "../utils/format";

const SECONDS = 1000;
const MINUTES = 60 * SECONDS;
const HOURS = 60 * MINUTES;
const DAYS = 24 * HOURS;

interface Props {
  contest: ContestResponse;
}

const Timer = (props: Props) => {
  const { contest } = props;
  const { start, end } = contest;

  const startMillis = new Date(start).getTime();
  const endMillis = new Date(end).getTime();

  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const timeUntilStart = startMillis - now;
  const timeUntilEnd = endMillis - now;

  if (timeUntilStart > 3 * DAYS) {
    const days = Math.floor(timeUntilStart / DAYS);
    const hours = Math.floor((timeUntilStart % DAYS) / HOURS);

    return (
      <>
        starts in {days}d {hours}h
      </>
    );
  }
  if (timeUntilStart > 0) {
    const hours = Math.floor(timeUntilStart / HOURS);
    const minutes = Math.floor((timeUntilStart % HOURS) / MINUTES);
    const seconds = Math.floor((timeUntilStart % MINUTES) / SECONDS);

    return (
      <>
        starts in {hours}:{twoDigits(minutes)}:{twoDigits(seconds)}
      </>
    );
  }
  if (timeUntilEnd < 0) {
    return <>finished</>;
  }

  const hours = Math.floor(timeUntilEnd / HOURS);
  const minutes = Math.floor((timeUntilEnd % HOURS) / MINUTES);
  const seconds = Math.floor((timeUntilEnd % MINUTES) / SECONDS);

  return (
    <>
      <b>
        &minus;{hours}:{twoDigits(minutes)}:{twoDigits(seconds)}
      </b>
    </>
  );
};

export default Timer;
