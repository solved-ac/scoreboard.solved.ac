export const formatNumber = (x: number) =>
  x.toLocaleString("en-US", { useGrouping: true });

export const twoDigits = (x: number) => x.toString().padStart(2, "0");
