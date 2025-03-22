import React from "react";
import styled from "styled-components";

export default function Entrance(){
    return(
        <BackgroundContainer>
            <TextContainer>
                <Text>입학식에 왔다. 앞으로의 대학생활이 기대된다!</Text>
            </TextContainer>
            <BackgroundImg src="/image/cutscene/entrance.png" />
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
    background-color: ${({ theme }) => theme.colors.mainblue100};
    border: 1px ${({ theme }) => theme.colors.mainblue400};
    z-index: 10;
    display: flex;
`;

const Text = styled.span`
    font-size :  ${({ theme }) => theme.typography.title24.fontSize};
    color : ${({ theme }) => theme.colors.mainblue400};
    padding: 2vw;
`;

const BackgroundImg = styled.img`
    width : 100%;
    height : 100%;
    object-fit : cover;
    position: absolute;
    top: 0;
    left: 0;  
`;