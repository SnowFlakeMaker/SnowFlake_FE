import React, { useState } from "react";
import styled from "styled-components";
import ClassRegister from "../events/ClassRegister";
import OpeningMeeting from "../events/OpeningMeeting";
import SelectMajor from "../events/SelectMajor";

export default function MailList(){
    const [showMailList, setShowMailList] = useState(true);
    const [clickedAlarms, setClickedAlarms] = useState({}); //클릭된 알림 
    const [activeEvent, setActiveEvent] = useState(null); // 하나의 이벤트만 렌더링

    //백엔드에서 get해올 현재 알림 목록 
    const alarmList = ["수강신청", "국가장학금 신청", "전공 선택", "개강총회"];

    const handleRead = (alarm) => {
        setClickedAlarms(prev => ({ ...prev, [alarm]: true }));
        
        if (alarm === "수강신청") {
            setShowMailList(false);
            setActiveEvent("classRegister");
        } else if (alarm === "국가장학금 신청") {
            console.log("국가장학금 신청 알람 읽기");
        } else if (alarm === "전공 선택") {
            setActiveEvent("majorSelect");
        } else if(alarm == "개강총회"){
            setActiveEvent("openingMeeting");
        }
    };
    
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