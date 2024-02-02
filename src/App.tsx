import { Global, ThemeProvider, css } from "@emotion/react";
import { SolvedGlobalStyles, solvedThemes } from "@solved-ac/ui-react";
import React from "react";
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
        <div
          style={{
            display: "flex",
          }}
        >
          {options.contestIds.map((_, index) => (
            <React.Fragment key={index}>
              {index ? (
                <div
                  style={{
                    flex: "0 0 1px",
                    backgroundColor: "#dddfe0",
                  }}
                />
              ) : null}
              <div style={{ flex: 1, minWidth: 0 }}>
                <Scoreboard index={index} />
              </div>
            </React.Fragment>
          ))}
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
