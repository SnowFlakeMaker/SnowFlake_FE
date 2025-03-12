import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import styled from "styled-components";

export default function Start(){
    const navigate = useNavigate();

    const GoSignIn =()=>{
        navigate("/signin");
    }

    const GoLogIn =()=>{
        navigate("/login");
    }

    return(
        <BackgroundContainer>
            <LogoImg src="/image/background/logo.png" />
            <ButtonContainer>
                <BlueButton onClick={GoSignIn}>회원가입</BlueButton>
                <BlueButton onClick={GoLogIn}>로그인</BlueButton>
            </ButtonContainer> 
            <BlackText>이 게임은 숙명여자대학교 학생들을 위한 대학 생활 안내 게임으로, 회원가입 시 본인 인증을 거친 숙명여자대학교 구글 계정이 필요합니다.</BlackText>
            <BackgroundImg src="/image/background/lobby.png"/>
            
        </BackgroundContainer>
        
    );
}

const BackgroundContainer = styled.div`
    position: relative; /* 버튼과 배경을 겹치도록 설정 */
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    display : flex;
    flex-direction : column;
`;

const LogoImg = styled.img`
    z-index : 5;
    justify-content : center;
    align-items : center;
    position: fixed;
    top : 25vh;
`;

const BackgroundImg = styled.img`
    width : 100%;
    height : 100%;
    object-fit : cover;
    position: absolute;
    top: 0;
    left: 0;
`;

const ButtonContainer = styled.div`
    position: fixed;
    bottom: 25vh;
    display: flex;
    flex-direction: column;
    background-color: transparent; 
    gap: 2vh; /* 버튼 간격 조정 */
    align-items: center;
    z-index: 10;
`;

const BlueButton = styled.button`
    width: 25vw; 
    height: 7vh;
    background-color: ${({ theme }) => theme.colors.mainblue600};
    color: #ffffff;
    font-size: 24px;
    font-weight: bold;
    border: none;
    border-radius: 1vw;
`;

const BlackText = styled.span`  
    font-size :  ${({ theme }) => theme.typography.subtitle15.fontSize};
    color : black;
    z-index : 15;
    position: fixed;
    bottom: 5vh;
`;