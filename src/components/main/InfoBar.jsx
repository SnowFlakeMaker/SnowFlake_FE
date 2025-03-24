import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MailList from "./MailList";
import Logout from "../../pages/auth/Logout";
import { useTutorial } from "../../pages/intro/Tutorial";
import { apiClient } from "../../apiClient";
import { useQuery } from "@tanstack/react-query";

export default function InfoBar( { isHighlight, alarmList, setAlarmList, setOneTimeAlarmList }){
    const [showMail, setShowMail] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const count = alarmList.length; //알림 갯수
    const { isTutorial } = useTutorial(); //튜토리얼 여부

    const handleMailList =()=>{
        if (isTutorial) return;
        setShowMail((prev) => !prev);
    }

    const handleLogout =()=>{
        if (isTutorial) return;
        setShowLogout((prev) => !prev);
    }

    const { data: coin } = useQuery({
        queryKey: ['coin'],
        queryFn: async () => {
          const response = await apiClient.get('/main/status');
          return response.data.data.coin;
        },
        refetchInterval: 5000, // 5초마다 자동 갱신
    });

    
    return(
        <Conatiner $highlight={isHighlight}>
            <CoinContainer>
                <Icon src="image/icons/coin.svg"/>
                <TextContainer>
                    <CoinText>{coin}</CoinText>
                    <CoinText>C</CoinText>
                </TextContainer>
            </CoinContainer>

            <SettingContainer>
                <Icon 
                    src="image/icons/mail.png"
                    onClick={handleMailList}/>
                {count > 0 && <Badge>{count}</Badge>}
            </SettingContainer>
            <SettingContainer>
                <Icon onClick={handleLogout} src="image/icons/setting.png"/>
            </SettingContainer>

            {showMail && <MailList alarmList={alarmList} setAlarmList={setAlarmList} setOneTimeAlarmList={setOneTimeAlarmList}/>}
            {showLogout && <Logout/>}
        </Conatiner>
    );
}

const Conatiner = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 35vw;
    height: 12vh;
    border : none;
    display : flex;
    flex-direction : row;
    gap: 1vw;
    z-index : ${(props) => (props.$highlight ? 20 : 5)};
    margin : 1vw;
`;

const CoinContainer = styled.div`
    width: 20vw;
    height: 9vh;
    background-color : ${({ theme }) => theme.colors.mainblue100};
    border-radius : 50px;
    border : 0.3vw solid ${({ theme }) => theme.colors.mainblue400};
    display : flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 2vw;
`;

const TextContainer = styled.div`
    gap: 0.3vw;
    display : flex;
`;

const CoinText = styled.span`
    font-size :  ${({ theme }) => theme.typography.title24.fontSize};
    color : ${({ theme }) => theme.colors.mainblue400};
`;

const Icon = styled.img`
    width: 4vw;
    height: 4vw;
    object-fit: contain; 
    padding: 0.5vw;
    cursor : pointer;
`;

const SettingContainer = styled.div`
    width: 5vw;  
    height: 5vw;
    background-color: ${({ theme }) => theme.colors.mainblue100};
    border: 0.25rem solid ${({ theme }) => theme.colors.mainblue400}; /* 4px */
    border-radius: 50%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Badge = styled.div`
    position: absolute;
    top: -5%;
    right: 0%;
    background-color: #DA0000;
    color: white;
    width: 1.5rem; /* 24px */
    height: 1.5rem;
    border-radius: 50%;
    font-size: 0.9rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
`;