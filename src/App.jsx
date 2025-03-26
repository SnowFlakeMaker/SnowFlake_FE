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
import { ExchangeProvider } from "./components/contexts/ExchangeContext";
import Ending from "./pages/ending/Ending";
import ExchangeProceeding from "./components/events/ExchangeProceeding";
import Credit from "./pages/main/Credit";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MasterSequence from "./pages/ending/MasterSequence";

function App() {

  const GlobalStyle = createGlobalStyle`
    * {
        font-family: 'Moneygraphy', sans-serif;
    }
  `;

  const queryClient = new QueryClient();


  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
          <TutorialProvider>
          <ExchangeProvider>
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
                    <Route path="/ending" element={<Ending/>} />
                    <Route path="/exchange" element={<ExchangeProceeding/>} />
                    <Route path="/credit" element={<Credit/>} />
                    <Route path="/combined-programs" element={<MasterSequence/>} />


                  </Routes>
                </Router>
              </ThemeProvider>
            </DateProvider>
          </ExchangeProvider>
          </TutorialProvider>
      </QueryClientProvider>

    </CookiesProvider>
  )
}

export default App
