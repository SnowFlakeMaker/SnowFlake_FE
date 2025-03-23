import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ClassRegister from "../events/ClassRegister";
import OpeningMeeting from "../events/OpeningMeeting";
import SelectMajor from "../events/SelectMajor";
import StudentCouncil from "../events/StudentCouncil";
import LeadershipGroup from "../events/LeadershipGroup";
import Club from "../events/Club";
import MajorStudy from "../events/MajorStudy";
import External from "../events/External";
import MT from "../events/MT";
import Festival from "../events/Festival";
import GiveUpMajor from "../events/GiveUpMajor";
import KoreaScholarship from "../events/KoreaScholarship";
import StartMaster from "../events/StartMaster";
import ApplyIntern from "../events/ApplyIntern";
import PrepareContest from "../events/PrepareContest";
import ExchangeStudent from "../events/exchangeStudent";
import PrepareGraduate from "../events/prepareGraduate";
import { EventSourcePolyfill } from 'event-source-polyfill';
import Tuition from "../events/Tuituion";
import { apiClient } from "../../apiClient";


export default function MailList( { alarmList }){
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;

    const [showMailList, setShowMailList] = useState(true);
    const [clickedAlarms, setClickedAlarms] = useState({}); //클릭된 알림 
    const [activeEvent, setActiveEvent] = useState(null); // 하나의 이벤트만 렌더링
    const [userId, setUserId] = useState(null);
    

    //백엔드에서 get해올 현재 알림 목록 
    // const alarmList = ["수강신청", "국가장학금 신청", "개강총회", "등록금 납부"];
    // const [alarmList, setAlarmList] = useState([]);

    const handleRead = (alarm) => {
        setClickedAlarms(prev => ({ ...prev, [alarm]: true }));

        if (alarm === "수강신청") {
            setShowMailList(false);
            setActiveEvent("classRegister");
        } else if (alarm === "국가장학금 신청") {
            setActiveEvent("koreaScholarship");
        } else if (alarm === "전공 선택") {
            setActiveEvent("majorSelect");
        } else if(alarm == "개강총회"){
            setActiveEvent("openingMeeting");
        } else if(alarm == "학생회 지원"){
            setActiveEvent("studentCouncil");
        } else if(alarm == "리더십그룹 지원"){
            setActiveEvent("leadershipGroup");
        } else if(alarm == "동아리 지원"){
            setActiveEvent("club");
        } else if(alarm == "전공학회 지원"){
            setActiveEvent("majorStudy");
        } else if (alarm == "대외활동 지원"){
            setActiveEvent("external");
        } else if(alarm == "MT"){
            setActiveEvent("mt");
        } else if(alarm == "축제") {
            setActiveEvent("festival");
        } else if(alarm=="학석사 연계과정 신청"){
            setActiveEvent("startMaster");
        } else if(alarm == "인턴 지원"){
            setActiveEvent("applyIntern");
        } else if(alarm == "공모전 참가"){
            setActiveEvent("prepareContest");
        } else if(alarm == "교환학생 지원"){
            setActiveEvent("exchangeStudent");
        } else if(alarm == "졸업인증제"){
            setActiveEvent("prepareGraduate");
        } else if(alarm == "전공 포기"){
            setActiveEvent("giveUpMajor");
        } else if(alarm == "등록금 납부") {
            setActiveEvent("tuition");
        }
    };
   
      
    // useEffect(() => {
    //     const getUserId = async () => {
    //         try {
    //         const response = await apiClient.get('/sse/get-userid');
    //         if (response.status === 200) {
    //             console.log(response.data);
    //             setUserId(response.data.data);
    //         }
    //         } catch (error) {
    //         console.log(error);
    //         }
    //     };
        
    //     getUserId();
    // }, []);

    // useEffect(() => {
    //     if (!userId) return; 
    //     const source = new EventSourcePolyfill(`${SERVER_URL}/sse/subscribe/${userId}`, {
    //         withCredentials: true,
    //     });
    
    //     source.addEventListener("onetime_event", (event) => {
    //         const parsed = JSON.parse(event.data);
    //         const newAlarms = Array.isArray(parsed.data) ? parsed.data : JSON.parse(parsed.data);
    //         setAlarmList((prev) => [...new Set([...prev, ...newAlarms])]);
    //     });
    
    //     return () => source.close();
    // }, [userId]);

    return(
        <>
            {showMailList && (
                <Container>
                    {alarmList.map((alarm, index) => (
                        <AlarmContainer key={index}>
                            <MailIcon src="/image/icons/unreadMail.png" />
                            <AlarmTitle>{alarm}</AlarmTitle>
                            <ReadButton 
                                onClick={() => handleRead(alarm)}
                                isClicked={clickedAlarms[alarm]}
                                disabled={clickedAlarms[alarm]}>읽기</ReadButton>
                        </AlarmContainer>
                    ))}
                </Container>
            )}

            {activeEvent === "classRegister" && <ClassRegister />}
            {activeEvent === "openingMeeting" && <OpeningMeeting />}
            {activeEvent === "majorSelect" && <SelectMajor />}
            {activeEvent === "studentCouncil" && <StudentCouncil />}
            {activeEvent === "leadershipGroup" && <LeadershipGroup />}
            {activeEvent === "club" && <Club/>}
            {activeEvent === "majorStudy" && <MajorStudy/>}
            {activeEvent === "external" && <External/>}
            {activeEvent === "mt" && <MT />}
            {activeEvent === "festival" && <Festival />}
            {activeEvent === "koreaScholarship" && <KoreaScholarship />}
            {activeEvent === "startMaster" && <StartMaster />}
            {activeEvent === "applyIntern" && <ApplyIntern />}
            {activeEvent === "prepareContest" && <PrepareContest />}
            {activeEvent === "exchangeStudent" && <ExchangeStudent />}
            {activeEvent === "prepareGraduate" && <PrepareGraduate/>}
            {activeEvent === "giveUpMajor" && <GiveUpMajor />}
            {activeEvent === "tuition" && <Tuition/>}
        </>
    );
}

const Container = styled.div`
    width: 35vw;
    height: 50vh;
    background-color : ${({ theme }) => theme.colors.mainblue400};
    border : 4px solid ${({ theme }) => theme.colors.mainblue100};
    z-index : 10;
    right : 0;
    top: 12vh;   
    position : absolute;
    display : flex;
    flex-direction : column;
    align-items: center;
    gap: 1vw; 
    padding-top : 1vh;
`;

const AlarmContainer = styled.div`
    width: 32vw;
    height: 9vh;
    background-color : ${({ theme }) => theme.colors.mainblue100};
    border : none;
    border-radius : 40px;
    display : flex;
    flex-direction : row;
    align-items: center;
    padding: 0 1vw;
`;

const MailIcon = styled.img`
    width: 2.5vw;
    height: 3vh; 
    object-fit: fit; 
    padding-left : 0.5vw;
    padding-right :  1vw; 
`;

const AlarmTitle = styled.span`
    font-size :  ${({ theme }) => theme.typography.subtitle20.fontSize};
    color : ${({ theme }) => theme.colors.mainblue400};
`;

const ReadButton = styled.button`
    width: 7vw; 
    height: 5vh;
    background-color: ${({ isClicked, theme }) => 
        isClicked ? theme.colors.gray : theme.colors.mainblue200}; 
    font-size :  ${({ theme }) => theme.typography.subtitle15.fontSize};
    color :  ${({ theme }) => theme.colors.mainblue100};
    border: none;
    border-radius: 1vw;
    margin-left: auto;
    margin-right: 1vw;
`;