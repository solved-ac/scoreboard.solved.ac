import { Global, ThemeProvider, css } from "@emotion/react";
import { SolvedGlobalStyles, solvedThemes } from "@solved-ac/ui-react";
import Scoreboard from "./components/Scoreboard";
import { useOptions } from "./hooks/useOptions";

function App() {
  const { options } = useOptions();
  
  return (
    <>
      <ThemeProvider theme={solvedThemes[options.theme]}>
        <SolvedGlobalStyles />
        <Global
          styles={css`
            body {
              overflow-y: scroll;
            }
            .tabler-icon {
              vertical-align: middle;
              width: 1.2em;
              height: 1.2em;
            }
          `}
        />
        <Scoreboard />
      </ThemeProvider>
    </>
  );
}

export default App;
