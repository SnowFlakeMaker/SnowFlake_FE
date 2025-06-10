import React , {useRef, useState, useEffect} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../apiClient";
import { useSound } from "./Soundcontext";

export default function Setting(){
    const navigate = useNavigate();
    const audioRef = useRef(null);    
    const { isMuted, setIsMuted } = useSound();


    const handleUnmute = () => {
        setIsMuted(prev => !prev);
        // if (audio) {
        //     const newMuteState = !isMuted;
        //     audio.muted = newMuteState;
        //     setIsMuted(newMuteState);
        //     if (!audio.paused) {
        //         audio.play().catch(err => console.log("오디오 재생 실패:", err));
        //     }
        // }
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.muted = true; // 최초엔 음소거된 상태로 시작
            audio.play().catch(err => console.log("자동 재생 실패:", err));
        }
    }, []);

    const getLogout = async() => {
        try {
            const response = await apiClient.get(`/auth/logout`);
            if (response.status === 200) {
                console.log("로그아웃 성공:", response.data);
                navigate("/");
            } 
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <Container>
            <audio ref={audioRef} src="/music/playing.mp3" loop autoPlay /> 
            <AlarmContainer onClick={getLogout}>
                <AlarmTitle>로그아웃</AlarmTitle>
            </AlarmContainer>

            <AlarmContainer onClick={handleUnmute}>
                <AlarmTitle>사운드 재생 {isMuted ? "🔇" : "🔈"} </AlarmTitle>
            </AlarmContainer>
        </Container>
    );
}


const Container = styled.div`
    width: 25vw;
    height: 20vh;
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
    width: 22vw;
    height: 5vh;
    background-color : ${({ theme }) => theme.colors.mainblue100};
    border : none;
    border-radius : 20px;
    display : flex;
    flex-direction : row;
    align-items: center;
    padding: 0 1vw;
    cursor: pointer;
`;

const AlarmTitle = styled.span`
    font-size :  ${({ theme }) => theme.typography.subtitle20.fontSize};
    color : ${({ theme }) => theme.colors.mainblue400};
`;
