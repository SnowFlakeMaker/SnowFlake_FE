import React, { createContext, useContext, useState, useEffect } from "react";
import styled from "styled-components";

const TutorialContext = createContext();

export const useTutorial = () => {
  const context = useContext(TutorialContext);
  if (!context) {
    throw new Error("useTutorial must be used within a TutorialProvider");
  }
  return context;
};

export const TutorialProvider = ({ children }) => {
    const [isTutorial, setIsTutorial] = useState(true);
    const [currentStep, setCurrentStep] = useState(0);
  
    const maxStep = 3; 
  
    useEffect(() => {
      const finished = localStorage.getItem("tutorialFinished") === "true";
      setIsTutorial(!finished); // 🔥 true면 false로, false면 true로
    }, []);

      
    const nextStep = () => {
      if (currentStep < maxStep - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        // 마지막 단계였으면 튜토리얼 종료
        setIsTutorial(false);
        localStorage.setItem("tutorialFinished", "true"); 
      }
    };
  
    return (
      <TutorialContext.Provider value={{ isTutorial, currentStep, nextStep }}>
        {children}
      </TutorialContext.Provider>
    );
};

export const TutorialContainer = styled.div`
    width: 95%;
    height : 25vh;
    bottom : 5vh;
    position: fixed;
    background-color: ${({ theme }) => theme.colors.mainblue400};
    border: 4px solid ${({ theme }) => theme.colors.mainblue100};
    z-index: 10;
    display: flex;
    flex-direction: column;
`;

export const TutorialText = styled.span`
    font-size :  ${({ theme }) => theme.typography.title24.fontSize};
    color : ${({ theme }) => theme.colors.mainblue100};
    padding: 2vw;
`;