import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./theme";
import SignIn from "./pages/auth/SignIn";
import LogIn from "./pages/auth/LogIn";
import Start from "./pages/intro/Start";
import OT from "./pages/intro/OT";
import Entrance from "./pages/intro/Entrance";

function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<Start/>} />
            <Route path="/signin" element={<SignIn/>} />
            <Route path="/login" element={<LogIn/>} />
            <Route path="/ot" element={<OT/>} />
            <Route path="/welcome" element={<Entrance/>} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  )
}

export default App
