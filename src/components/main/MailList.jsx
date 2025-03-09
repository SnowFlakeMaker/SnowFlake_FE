import React, { useState } from "react";
import styled from "styled-components";
import ClassRegister from "../events/ClassRegister";

export default function MailList(){
    const [showMailList, setShowMailList] = useState(true);

    //백엔드에서 get해올 현재 알림 목록 
    const alarmList = ["수강신청", "국가장학금 신청", "전공 선택"];
    
    const [showClassRegister, setShowClassRegister] = useState(false);
    const [showMajorSelect, setsShowMajorSelect] = useState(false);
    
    const handleRead = (alarm) => {
        setShowMailList(false); 
        if (alarm === "수강신청") {
            setShowClassRegister(true);
        } else if (alarm === "국가장학금 신청") {
            console.log("국가장학금 신청 알람 읽기");
        } else if (alarm === "전공 선택") {
            setsShowMajorSelect(true);
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
                            <ReadButton onClick={() => handleRead(alarm)}>읽기</ReadButton>
                        </AlarmContainer>
                    ))}
                </Container>
            )}
            {showClassRegister && <ClassRegister />}
        </>
    );
}

const Container = styled.div`
    width: 35vw;
    height: 65vh;
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
    background-color : ${({ theme }) => theme.colors.mainblue200};
    font-size :  ${({ theme }) => theme.typography.subtitle15.fontSize};
    color :  ${({ theme }) => theme.colors.mainblue100};
    border: none;
    border-radius: 1vw;
    margin-left: auto;
    margin-right: 1vw;
`;