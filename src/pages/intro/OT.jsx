import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function OT(){
    const [stage, setStage] = useState(0);
    const [showNextText, setShowNextText] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowNextText(true);
        }, 3000); 

        return () => clearTimeout(timer);
    }, []);

    const handleClick = () => {
        if (showNextText) {
            navigate("/main");
        }
    };

    
    
    return(
        <BackgroundContainer onClick={handleClick}>
            <TextContainer>
                <Text>신입생 오리엔테이션에 왔다. 앞으로의 대학생활에 관한 설명을 들어보자!</Text>
                {showNextText && <NextText> ▶ 클릭하여 다음으로</NextText>}
            </TextContainer>
            <BackgroundImg src="/image/cutscene/ot.png" />
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

const TextContainer = styled.div`
    width: 95%;
    height : 20vh;
    bottom : 5vh;
    position: fixed;
    background-color: ${({ theme }) => theme.colors.mainblue400};
    border: 2px solid ${({ theme }) => theme.colors.mainblue100};
    z-index: 10;
    display: flex;
    flex-direction: column;
`;

const Text = styled.span`
    font-size :  ${({ theme }) => theme.typography.title24.fontSize};
    color :${({ theme }) => theme.colors.mainblue100};
    padding: 2vw;
`;

const NextText = styled.span`
    position: absolute;
    font-size:  ${({ theme }) => theme.typography.title24.fontSize};
    color: ${({ theme }) => theme.colors.mainblue100};
    right: 0;
    text-align: right;
    padding-right: 3vw;
    bottom: 3vh;
    cursor: pointer;
`;

const BackgroundImg = styled.img`
    width : 100%;
    height : 100%;
    object-fit : cover;
    position: absolute;
    top: 0;
    left: 0;  
`;

//******** 튜토리얼 css 구분선 **********//
const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 18vw;
    height: 22vh;
    margin: 1vw;
    border : none;
    z-index : 5;
    display : flex;
    flex-direction : column;
    gap: 0.7vw;
`;

const ProfileContainer = styled.div`
    width: 100%;
    height: 15vh;
    background-color :  ${({ theme }) => theme.colors.mainblue400};
    border : 4px solid  ${({ theme }) => theme.colors.mainblue100};
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
`;

const NameContainer = styled.div`
    flex-direction : row;
    justify-content : center;
    align-items : center;
    display: flex;
    gap: 0.7vw;
    margin-bottom: 0.7vw;
`;

const SnowIcon = styled.img`
    width: 2vw;
    height: 2vw;
`;

const NameText = styled.span`
    color :  ${({ theme }) => theme.colors.mainblue100};
    font-size :  ${({ theme }) => theme.typography.title24.fontSize};
    padding: 0 1.5vw;
`;

const SemText = styled.span`
    display : flex;
    color :  ${({ theme }) => theme.colors.mainblue100};
    font-size :  ${({ theme }) => theme.typography.subtitle20.fontSize};
    justify-content : center;
    align-items : center;
`;

const DateContainer = styled.div`
    width: 100%;
    height: 7vh;
    background-color :  ${({ theme }) => theme.colors.mainblue100};
    border : 4px solid  ${({ theme }) => theme.colors.mainblue400};
    display : flex;
    border-radius : 40px;
    justify-content : center;
    align-items : center;
    padding-top: 5px;
    cursor: pointer; 
`;

const DateText = styled.span`
    color :  ${({ theme }) => theme.colors.mainblue400};
    font-size :  ${({ theme }) => theme.typography.title24.fontSize};
`;