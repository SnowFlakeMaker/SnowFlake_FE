import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { createGlobalStyle } from "styled-components";
import { CookiesProvider } from "react-cookie"; 
import theme from "./theme";
import SignIn from "./pages/auth/SignIn";
import LogIn from "./pages/auth/LogIn";
import Start from "./pages/intro/Start";
import OT from "./pages/intro/OT";
import Entrance from "./pages/intro/Entrance";
import Main from "./pages/main/Main";
import InfoNew from "./pages/auth/InfoNew";
import { TutorialProvider } from "./pages/intro/Tutorial";
import { DateProvider } from "./components/main/DateContext";
import StressEnding from "./pages/ending/StressEnding";

function App() {

  const GlobalStyle = createGlobalStyle`
    * {
        font-family: 'Moneygraphy', sans-serif;
    }
`;

  return (
    <CookiesProvider>
      <TutorialProvider>
        <DateProvider>
          <ThemeProvider theme={theme}>
            <GlobalStyle/>
          
            <Router>
              <Routes>
                <Route path="/" element={<Start/>} />
                <Route path="/signin" element={<SignIn/>} />
                <Route path="/login" element={<LogIn/>} />
                <Route path="/info" element={<InfoNew/>} />
                <Route path="/entrance" element={<Entrance />} />
                <Route path="/ot" element={<OT/>} />
                <Route path="/welcome" element={<Entrance/>} />
                <Route path="/main" element={<Main/>}/>
                <Route path="/stress_ending" element={<StressEnding/>} />
              </Routes>
            </Router>
          </ThemeProvider>
        </DateProvider>
      </TutorialProvider>
    </CookiesProvider>
  )
}

export default App
