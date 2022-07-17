import { useSelector } from "react-redux";

import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";

// routing
import Routes from "routes";

// defaultTheme
import themes from "themes";

// project imports
import NavigationScroll from "layout/NavigationScroll";
import { LoginContext } from "./Helper/ContextProvider";

// ==============================|| APP ||============================== //

const App = () => {
  const [userlogged, setUserlogged] = useState(false);
  const customization = useSelector((state) => state.customization);

  return (
    <LoginContext.Provider value={{ userlogged, setUserlogged }}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themes(customization)}>
          <CssBaseline />
          <NavigationScroll>
            <Routes />
          </NavigationScroll>
        </ThemeProvider>
      </StyledEngineProvider>
    </LoginContext.Provider>
  );
};

export default App;
