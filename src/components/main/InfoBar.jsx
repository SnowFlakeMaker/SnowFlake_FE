import React, { useState } from "react";
import styled from "styled-components";
import MailList from "./MailList";

export default function InfoBar(){
    const [showMail, setShowMail] = useState(false);
    const count = 2;

    const handleMailList =()=>{
        setShowMail((prev) => !prev)
    }
    return(
        <Conatiner>
            <CoinContainer>
                <Icon src="image/icons/coin.svg"/>
                <TextContainer>
                    <CoinText>1610</CoinText>
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
                <Icon src="image/icons/setting.png"/>
            </SettingContainer>

            {showMail && <MailList/>}
        </Conatiner>
    );
}

const Conatiner = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width : 550px;
    height : 90px;
    border : none;
    display : flex;
    flex-direction : row;
    gap : 10px;
    z-index : 5;
    margin : 15px;
`;

const CoinContainer = styled.div`
    width : 295px;
    height : 70px;
    background-color : ${({ theme }) => theme.colors.mainblue100};
    border-radius : 50px;
    border : 4px solid ${({ theme }) => theme.colors.mainblue400};
    display : flex;
    justify-content: space-between;
    align-items: center;
    padding-right : 20px;
`;

const TextContainer = styled.div`
    gap : 5px;
    display : flex;
`;

const CoinText = styled.span`
    font-size :  ${({ theme }) => theme.typography.title24.fontSize};
    color : ${({ theme }) => theme.colors.mainblue400};
`;

const Icon = styled.img`
    width: 60px; 
    height: 60px;
    object-fit: contain; 
    padding : 5px;
`;

const SettingContainer = styled.div`
    width: 5rem; /* 80px (16px * 5) */
    height: 5rem;
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