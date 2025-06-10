import React, { useState, useRef, useEffect} from "react";
import { useNavigate } from "react-router-dom"; 
import styled from "styled-components";

export default function Start(){
    const navigate = useNavigate();
    const audioRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);

    const GoSignIn =()=>{
        navigate("/signin");
    }

    const GoLogIn =()=>{
        navigate("/login");
    }

    const handleUnmute = () => {
        const audio = audioRef.current;
        if (audio) {
            audio.muted = false;
            audio.play().catch(err => console.log("오디오 재생 실패:", err));
            setIsMuted(false);
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.muted = true; // 최초엔 음소거된 상태로 시작
            audio.play().catch(err => console.log("자동 재생 실패:", err));
        }
    }, []);

    return(
        <BackgroundContainer>
            <audio ref={audioRef} src="/music/start.mp3" loop autoPlay /> 
            <SoundButton onClick={handleUnmute}> {isMuted ? "🔇" : "🔈"}</SoundButton>
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

const SoundButton = styled.button`
    border : none;    
    position: fixed;
    top: 2vh;
    right: 2vw;
    z-index: 20;
    font-size: 24px;
    background: none;
    border: none;
    cursor: pointer;
`;