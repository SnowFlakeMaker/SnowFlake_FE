import React from "react";
import styled from "styled-components";
import { useState } from "react";
import PlanList from "./PlanList";
import Status from "./Status";
import { useTutorial } from "../../pages/intro/Tutorial";

export default function Profile( { isHighlight } ){
    const [showStatus, setShowStatus] = useState(false);
    const [showList, setShowList] = useState(false);
    const { isTutorial } = useTutorial(); //튜토리얼 여부

    const handleStatus = ()=>{
        if (isTutorial) return;
        setShowStatus((prev) => !prev);
    }

    const handlePlanList = () => {
        if (isTutorial) return;
        setShowList((prev) => !prev);
    };

    return(
        <Container $highlight={isHighlight}>
            <ProfileContainer>
                <NameContainer onClick={handleStatus}>
                    <SnowIcon src = "/image/icons/snow-icon.png" />
                    <NameText>김눈꽃송이</NameText>
                    <SnowIcon src = "/image/icons/snow-icon.png" />
                </NameContainer>
                <SemText>공과대학 5학기</SemText>
                
            </ProfileContainer>

            <DateContainer onClick={handlePlanList} >
                <DateText>3월 24일</DateText>
            </DateContainer>

            {showStatus && <Status />}
            {showList && <PlanList />}
        </Container>
    );
}

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 18vw;
    height: 22vh;
    margin: 1vw;
    border : none;
    z-index :  ${(props) => (props.$highlight ? 20 : 5)};
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