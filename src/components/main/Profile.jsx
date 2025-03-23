import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import PlanList from "./PlanList";
import Status from "./Status";
import { apiClient } from "../../apiClient";
import { useTutorial } from "../../pages/intro/Tutorial";
import { useDate } from "./DateContext";

export default function Profile( { isHighlight } ){
    const [showStatus, setShowStatus] = useState(false);
    const [showList, setShowList] = useState(false);
    const [name, setName] = useState("");
    const [major, setMajor] = useState("");
    const [semester, setSemester] = useState("");
    const { isTutorial } = useTutorial(); 
    const { currentDay, currentMonth } = useDate();

    const handleStatus = ()=>{
        if (isTutorial) return;
        setShowStatus((prev) => !prev);
    }

    const handlePlanList = () => {
        if (isTutorial) return;
        setShowList((prev) => !prev);
    };

    useEffect(()=>{
        const getPlayer = async () =>{
            try{
                const response = await apiClient.get('/main/player');
                if(response.status === 200) {
                    console.log(response.data)
                    const data = response.data.data.player_info;
                    setName(data.nickname);
                    setMajor(data.major);
                }
            } catch(error) {
                console.log(error);
            }
        }

        const getSemester = async()=>{
            try{
                const response = await apiClient.get('/main/chapter');
                if(response.status===200){
                    console.log(response.data);
                    const data = response.data.data.current_chapter.chapter;
                    setSemester(data);
                }
            } catch(error) {
                console.log(error);
            }
        }

        const fetchData = async () => {
            try {
                await getPlayer();
                await getSemester();
            } catch (error) {
                console.error("데이터 가져오기 실패:", error);
            }
        };

        fetchData();
    }, [])


    return(
        <Container $highlight={isHighlight}>
            <ProfileContainer>
                <NameContainer onClick={handleStatus}>
                    <SnowIcon src = "/image/icons/snow-icon.png" />
                    <NameText>{name}</NameText>
                    <SnowIcon src = "/image/icons/snow-icon.png" />
                </NameContainer>
                <SemText>{major} {semester}</SemText>
                
            </ProfileContainer>

            <DateContainer onClick={handlePlanList} >
                <DateText>{currentMonth} {currentDay}일</DateText>
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