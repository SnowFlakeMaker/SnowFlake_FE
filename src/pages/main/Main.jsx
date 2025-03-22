import React from "react";
import styled from "styled-components";
import Profile from "../../components/main/Profile";
import InfoBar from "../../components/main/InfoBar";
import EventIcon from "../../components/main/EventIcon";
import { TutorialContainer, TutorialText, useTutorial } from "../intro/Tutorial";

export default function Main(){
    const { isTutorial, currentStep, nextStep } = useTutorial();
    const isTutorialStep = isTutorial && currentStep <= 3;
    return(
        <BackgroundContainer>
            {/* 튜토리얼 중이면 어두운 배경 */}
            {isTutorial && <Overlay />}
            <Profile isHighlight={isTutorial && currentStep === 0} />
            <EventIcon isHighlight={isTutorial && currentStep === 1} />
            <InfoBar isHighlight={isTutorial && currentStep === 2}/>

            {isTutorialStep && (
                <TutorialContainer  onClick={isTutorial ? nextStep : undefined}>
                    <TutorialText>
                        {currentStep === 0 && "이곳에서는 내 정보를 확인할 수 있어요. 클릭하면 현재 스탯과 이번 학기 계획을 짤 수 있어요."}
                        {currentStep === 1 && "이곳에서는 현재 진행 중인 이벤트들을 확인할 수 있어요."}
                        {currentStep === 2 && "이곳에서는 현재 코인을 볼 수 있어요. 메일함을 누르면 이벤트들을 진행할 수 있어요! 설정에서는 로그아웃이 가능해요."}
                        {currentStep === 3 && "OT가 끝났어요. 이제부터 눈송이로서의 대학생활을 즐겨봐요!"}
                    </TutorialText>
                </TutorialContainer>
            )}
            <BackgroundImg src="/image/background/main.png" />
            
        </BackgroundContainer>
    );
}

const BackgroundContainer = styled.div`
    position: relative; 
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`;

const BackgroundImg = styled.img`
    width : 100%;
    height : 100%;
    object-fit : cover;
    position: absolute;
    top: 0;
    left: 0;
`;

// 검정 배경 오버레이
const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6); // 반투명 검정
    z-index: 7;
`;
