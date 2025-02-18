import React from "react";
import styled from "styled-components";

export default function InfoBar(){
    return(
        <Conatiner>
            <CoinContainer>
                <Icon src="image/icons/coin.svg"/>
                <CoinText>1610</CoinText>
            </CoinContainer>
            <SettingContainer>
                <Icon src="image/icons/mail.png"/>
            </SettingContainer>
            <SettingContainer>
                <Icon src="image/icons/setting.png"/>
            </SettingContainer>
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
    width : 70px;
    height : 70px;
    background-color : ${({ theme }) => theme.colors.mainblue100};
    border : 4px solid ${({ theme }) => theme.colors.mainblue400};
    border-radius: 50%
`;