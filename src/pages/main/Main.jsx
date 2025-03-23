import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Profile from "../../components/main/Profile";
import InfoBar from "../../components/main/InfoBar";
import EventIcon from "../../components/main/EventIcon";
import { TutorialContainer, TutorialText, useTutorial } from "../intro/Tutorial";
import { apiClient } from "../../apiClient";
import { EventSourcePolyfill } from "event-source-polyfill";

export default function Main(){
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;
    const [userId, setUserId] = useState(null);
    const [alarmList, setAlarmList] = useState([]);

    const { isTutorial, currentStep, nextStep } = useTutorial();
    const isTutorialStep = isTutorial && currentStep <= 3;

    useEffect(() => {
        const getUserId = async () => {
          try {
            const response = await apiClient.get('/sse/get-userid');
            if (response.status === 200) {
                console.log(response.data);
                setUserId(response.data.data);
            }
          } catch (error) {
            console.log(error);
          }
        };
      
        getUserId();
        console.log(alarmList);
      }, []);

    useEffect(() => {
        if (!userId) return;
      
        const source = new EventSourcePolyfill(`${SERVER_URL}/sse/subscribe/${userId}`, {
          withCredentials: true,
        });
      
        source.onopen = () => {
          console.log("✅ SSE 연결 성공!");
        };
      
        source.addEventListener("init", (event) => {
            console.log("🟢 연결 메시지 (init):", event.data); // "connected"
        });

        source.addEventListener("onetime_event", (event) => {
            console.log("📨 수신된 데이터:", event.data);
            if (!event.data) {
                console.log("⚠️ onetime_event에 data가 없습니다:", event);
                return;
            }
            // const parsed = JSON.parse(event.data);
            // const newAlarms = Array.isArray(parsed.data) ? parsed.data : JSON.parse(parsed.data);
            setAlarmList((prev) => [...new Set([...prev, ...JSON.parse(event.data)])]);
        });

        return () => source.close();
    }, [userId]);

    
    return(
        <BackgroundContainer>
            {/* 튜토리얼 중이면 어두운 배경 */}
            {isTutorial && <Overlay />}
            <Profile isHighlight={isTutorial && currentStep === 0} />
            <EventIcon isHighlight={isTutorial && currentStep === 1} />
            <InfoBar isHighlight={isTutorial && currentStep === 2} alarmList={alarmList} />

            {isTutorialStep && (
                <TutorialContainer  onClick={isTutorial ? nextStep : undefined}>
                    <TutorialText>
                        {currentStep === 0 && "이곳에서는 내 정보를 확인할 수 있어요. 클릭하면 현재 스탯과 이번 학기 계획을 짤 수 있어요."}
                        {/* {currentStep === 1 && "이곳에서는 현재 진행 중인 이벤트들을 확인할 수 있어요."} */}
                        {currentStep === 1 && "이곳에서는 현재 코인을 볼 수 있어요. 메일함을 누르면 이벤트들을 진행할 수 있어요! 설정에서는 로그아웃이 가능해요."}
                        {currentStep === 2 && "OT가 끝났어요. 이제부터 눈송이로서의 대학생활을 즐겨봐요!"}
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
