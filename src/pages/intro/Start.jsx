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
            <ButtonContainer>
                <GrayButton onClick={GoSignIn}>회원가입</GrayButton>
                <GrayButton onClick={GoLogIn}>로그인</GrayButton>
            </ButtonContainer> 
            <BackgroundImg src="/image/background/lobby_temp.png"/>
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
    position: absolute;
    bottom: 10%; /* 화면 하단에서 약간 위로 조정 */
    display: flex;
    flex-direction: column;
    background-color: transparent; 
    gap: 20px; /* 버튼 간격 조정 */
    align-items: center;
    z-index: 10;
`;

const GrayButton = styled.button`
    width : 477px;
    height : 77px;
    background-color: rgba(0, 0, 0, 0.34); /* 반투명한 검정색 */
    color: #ffffff;
    font-size: 24px;
    font-weight: bold;
    border: none;
    border-radius: 10px; 
`;