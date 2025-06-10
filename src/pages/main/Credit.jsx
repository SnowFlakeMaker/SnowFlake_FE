import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

export default function Credit() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/");
        }, 17000); 
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <BackgroundContainer>
        <CreditScroll>
            <LogoImg src="/image/background/logo.png" />
            <TextContainer>
            <BlackText>Credit</BlackText>
            <BlackText>Team Leader : 이나연</BlackText>
            <BlackText>Frontend : 이나연</BlackText>
            <BlackText>Backend : 강수진, 윤서진</BlackText>
            <BlackText>Design : 허희윤</BlackText>
            <BlackText>지도 교수님 : 이기용 교수님</BlackText>
            <BlackText>플레이해주셔서 감사합니다.</BlackText>
            </TextContainer>
        </CreditScroll>
        <BackgroundImg src="/image/background/lobby.png" />
        </BackgroundContainer>
    );
}

// 🔁 위로 올라가는 keyframes
const scrollUp = keyframes`
  0% {
    transform: translateY(100vh);
  }
  100% {
    transform: translateY(-100%);
  }
`;

const CreditScroll = styled.div`
  animation: ${scrollUp} 13s linear forwards;
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BackgroundContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden; /* 💡 화면 밖으로 나간 건 안보이게 */
`;

const LogoImg = styled.img`
  width: 20vw;
  margin-bottom: 3vh;
`;

const BackgroundImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2vh;
`;

const BlackText = styled.span`
  font-size: ${({ theme }) => theme.typography.subtitle15.fontSize};
  color: black;
`;