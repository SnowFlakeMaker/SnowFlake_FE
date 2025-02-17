import React from "react";
import styled from "styled-components";
import Profile from "../../components/main/Profile";
import InfoBar from "../../components/main/InfoBar";

export default function Main(){
    return(
        <BackgroundContainer>
            <Profile/>
            <InfoBar/>
            <BackgroundImg src="/image/background/main.png" />
        </BackgroundContainer>
    );
}

const BackgroundContainer = styled.div`
    position: relative; 
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


