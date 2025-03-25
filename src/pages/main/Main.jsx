import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Profile from "../../components/main/Profile";
import InfoBar from "../../components/main/InfoBar";
import EventIcon from "../../components/main/EventIcon";
import { TutorialContainer, TutorialText, useTutorial } from "../intro/Tutorial";
import { apiClient } from "../../apiClient";
import { EventSourcePolyfill } from "event-source-polyfill";
import { useExchange } from "../../components/contexts/ExchangeContext";
import { useNavigate } from "react-router-dom";

export default function Main(){
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;
    const [userId, setUserId] = useState(null);
    const [alarmList, setAlarmList] = useState([]);

    const { isTutorial, currentStep, nextStep } = useTutorial();
    const isTutorialStep = isTutorial && currentStep <= 3;

    const { IsExchangeAccepted } = useExchange();
    const [canProceedExchange, setCanProceedExchange] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
 
    const [postNextChapterCalled, setPostNextChapterCalled] = useState(false); //다음학기 호출 

    const [oneTimeAlarmList, setOneTimeAlarmList] = useState([]); //onetime만 관리
    const [hasReceivedOneTimeEvent, setHasReceivedOneTimeEvent] = useState(false); //onetime 도착 추적 
    const [showNextChapterModal, setShowNextChapterModal] = useState(false);

    const [plansFinished, setPlansFinished] = useState(false);
    
    
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
            const newAlarms = JSON.parse(event.data);

            setAlarmList((prev) => [...new Set([...prev, ...newAlarms])]);
            setOneTimeAlarmList((prev) => [...new Set([...prev, ...newAlarms])]); 
            setHasReceivedOneTimeEvent(true);
            console.log(oneTimeAlarmList, hasReceivedOneTimeEvent, postNextChapterCalled);
        });

        source.addEventListener("regular_event", (event) => {
            console.log("📨 수신된 데이터:", event.data);
            if (!event.data) {
                console.log("⚠️ regular_event에 data가 없습니다:", event);
                return;
            }
            setAlarmList((prev) => [...new Set([...prev, ...JSON.parse(event.data)])]);
            

        });

        return () => source.close();
    }, [userId]);

    useEffect(() => {
        if (hasReceivedOneTimeEvent && oneTimeAlarmList.length === 0 && !postNextChapterCalled && plansFinished) {
            setShowNextChapterModal(true); // ✅ 단발성이벤트 끝나고 다음챕터 모달 띄우기
        }
      }, [oneTimeAlarmList, hasReceivedOneTimeEvent, postNextChapterCalled, plansFinished])


    useEffect(() => { //교환학생 페이지 전환 
        if (IsExchangeAccepted === true) {
          const postExchangeProceed = async () => {
            try {
              const response = await apiClient.post('exchange/proceed');
              if (response.status === 200) {
                console.log(response.data);
                setCanProceedExchange(response.data.data.success);
                navigate("/exchange");
              }
            } catch (error) {
              if (error.response?.status === 400) {
                setCanProceedExchange(error.response.data.data.success);
                setShowModal(true);
              } else {
                console.log(error);
              }
            }
          };
          postExchangeProceed();
        }
    }, [IsExchangeAccepted]);
    
    

    const getSemester = async()=>{
        try{
            const response = await apiClient.get('/main/chapter');
            if(response.status===200){
                console.log(response.data);
                const data = response.data.data.current_chapter.chapter;
                return data;
            }
        } catch(error) {
            console.log(error);
        }
    };


    const handleConfirmNextChapter = async () => {
        const semester = await getSemester();
    
        if (semester === "4학년 겨울방학") {
            navigate("/ending");
        } else {
            try {
                const response = await apiClient.post("/main/change-semester");
                if (response.status === 200) {
                    console.log("✅ 다음 챕터로 이동");
                    setPostNextChapterCalled(true);
                    setHasReceivedOneTimeEvent(false);
                    setShowNextChapterModal(false); // ✅ 모달 닫기
                }
            } catch (error) {
                console.error(error);
        }
        }
    };
    
    return(
        <BackgroundContainer>
            {/* 튜토리얼 중이면 어두운 배경 */}
            {isTutorial && <Overlay />}
            <Profile isHighlight={isTutorial && currentStep === 0} plansFinished={plansFinished} setPlansFinished={setPlansFinished}/>
            {/* <EventIcon isHighlight={isTutorial && currentStep === 1} /> */}
            <InfoBar isHighlight={isTutorial && currentStep === 1} alarmList={alarmList} setAlarmList={setAlarmList} setOneTimeAlarmList={setOneTimeAlarmList} />

            {isTutorialStep && (
                <TutorialContainer  onClick={isTutorial ? nextStep : undefined}>
                    <TutorialText>
                        {currentStep === 0 && "이곳에서는 내 정보를 확인할 수 있어요. 클릭하면 현재 스탯을 볼 수 있고, 이번 학기 계획을 짤 수 있어요."}
                        {/* {currentStep === 1 && "이곳에서는 현재 진행 중인 이벤트들을 확인할 수 있어요."} */}
                        {currentStep === 1 && "이곳에서는 현재 코인을 볼 수 있어요. 메일함을 누르면 이벤트들을 진행할 수 있어요! 설정에서는 로그아웃이 가능해요."}
                        {currentStep === 2 && "OT가 끝났어요. 이제부터 눈송이로서의 대학생활을 즐겨봐요!"}
                    </TutorialText>
                </TutorialContainer>
            )}

            {showModal&& (
                <ModalOverlay>
                    <ModalText>코인이 부족하여 교환학생을 갈 수 없습니다.<br/> 숙명여대에서 학기를 진행합니다.</ModalText>
                    <BlueButton onClick={()=> setShowModal(false)}>닫기</BlueButton>
                </ModalOverlay>
            )}

            {showNextChapterModal && (
                <ModalOverlay>
                    <ModalText>다음 학기로 넘어갑니다.</ModalText>
                    <BlueButton onClick={handleConfirmNextChapter}>확인</BlueButton>
                </ModalOverlay>
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

const ModalOverlay = styled.div`
    position: fixed;
    top: 20%; 
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30vw;
    height: 30vh;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    margin-top: 30vh;
    flex-direction: column;
    padding-left: 3vw;
    padding-right: 3vw;
    gap : 3vh;
`;


const ModalText = styled.span`
    font-size :  ${({ theme }) => theme.typography.subtitle20.fontSize};
    color : ${({ theme }) => theme.colors.mainblue100};
    white-space: pre-wrap;
    text-align: center;
    line-height: 1.3;
`;

const BlueButton = styled.button`
    width : 6vw;
    height : 3.5vh;
    border : none;
    border-radius : 20px;
    background-color : ${({ theme }) => theme.colors.mainblue600};
    color : white;
    font-size :  ${({ theme }) => theme.typography.subtitle15.fontSize};
    cursor: pointer;  
`;