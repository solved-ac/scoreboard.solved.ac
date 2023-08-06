import { useContext } from "react";
import { ScoreboardOptionContext } from "../contexts/ScoreboardOptionContext";

export const useOptions = () => useContext(ScoreboardOptionContext);
