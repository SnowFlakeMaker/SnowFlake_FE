import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useDate } from "./DateContext";
import { apiClient } from "../../apiClient";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
export default function ProgressingList( { plans, setPlansFinished, setCanClickMail  } ){
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { nextDay } = useDate();

    const timeoutRef = useRef(null);
    const indexRef = useRef(0); 

    const handleCloseModal = () => {
        setShowModal(false);
        setIsComplete(true);
        setPlansFinished(true);
        setCanClickMail(true);
    };

    useEffect(() => {
        if (plans.length === 0) return;
      
        setCurrentIndex(0);
        setIsComplete(false);
        setShowModal(false);
        setCanClickMail(false);
        indexRef.current = 0;
      
        const runStep = () => {
          if (indexRef.current >= plans.length) {
            setIsComplete(true);
            setShowModal(true);
            return;
          }
      
          timeoutRef.current = setTimeout(() => {
            nextDay(); // 날짜 먼저 올리고
            indexRef.current += 1;
            console.log(indexRef.current);
            setCurrentIndex(indexRef.current); // 날짜 올라간 후에 index 올림
      
            runStep(); // 다음 타이머 예약
          }, 3000);
        };
      
        runStep();
      
        return () => clearTimeout(timeoutRef.current);
    }, [plans]);

    useEffect(() => {
        console.log("🔄 currentIndex", currentIndex);
        console.log("🧩 currentPlan", plans[currentIndex]);
        console.log("📦 전체 plans", plans);
      }, [currentIndex]);


    const currentPlan = plans[currentIndex];


    return(
        <>
            {currentPlan && !isComplete && 
                <Container>
                    <DoingContainer>
                        <DoingText>{currentPlan.title}</DoingText>
                        <DoingImg src={currentPlan.img}  key={currentIndex}/>
                    </DoingContainer>
                    <StatusContainer>
                        {currentPlan.title === "코인부족" && 
                            <StatusText>코인이 부족하여 해당 계획이 실행되지 않고 다음날로 넘어갑니다.</StatusText>
                        }
                        {currentPlan.title !== "코인부족" && 
                            <>
                                <StatusText style={{ marginBottom: "8vh", marginTop : "1vw" }}>효과</StatusText>
                                <StatusText style={{ marginBottom: "1vh" }}> ▶ 증가 : {currentPlan.plus.join(', ')} </StatusText>
                                <StatusText> ▶ 감소 :{currentPlan.minus.join(', ')}</StatusText>
                            </>
                        }
                        
                        
                        
                    </StatusContainer>
                </Container>
            }
        

            {showModal &&
                <ModalOverlay>
                    <ModalText>이번 달 계획이 모두 완료되었습니다!</ModalText>
                    <BlueButton onClick={handleCloseModal}>닫기</BlueButton>
                </ModalOverlay>
            }
            
        </>
        
    );
}

const Container = styled.div`
    position : fixed;
    bottom : 2vh;
    width : 98%;
    height : 45vh;
    z-index : 15;
    background-color :  ${({ theme }) => theme.colors.mainblue100};
    border : 0.2vw solid  ${({ theme }) => theme.colors.mainblue400};
    left: 50%;        /* 화면 중앙 정렬 */
    transform: translateX(-50%); /* 정확한 중앙 정렬 */
    display : flex;
    flex-direction : row;
    align-items : center;
`;

const DoingContainer = styled.div`
    flex-basis: 70%;
    flex-shrink: 0;
    height : 100%;
    padding-top: 1vh;
`;

const DoingText = styled.span`
    font-size :  ${({ theme }) => theme.typography.title24.fontSize};
    color : ${({ theme }) => theme.colors.mainblue400};
    margin-left : 1vw;
`;

const DoingImg = styled.img`
`;

const StatusContainer = styled.div`
    background-color :  ${({ theme }) => theme.colors.mainblue400};
    border : 0.2vw solid  ${({ theme }) => theme.colors.mainblue100};
    width : 30%;
    height : 90%;
    display: flex;
    flex-direction: column;
    position: fixed;
    right: 1vw;
    padding-top: 1.5vh;
    padding-right: 1.5vw;
`;

const StatusText = styled.span`
    font-size :  ${({ theme }) => theme.typography.title24.fontSize};
    color : ${({ theme }) => theme.colors.mainblue100};
    margin-left : 1.5vw;
    line-height: 1.3;
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 20%; 
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30vw;
    height: 30vh;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    margin-top: 30vh;
    flex-direction: column;
    padding-left: 3vw;
    padding-right: 3vw;
    gap : 3vh;
`;


const ModalText = styled.span`
    font-size :  ${({ theme }) => theme.typography.subtitle20.fontSize};
    color : ${({ theme }) => theme.colors.mainblue100};
    white-space: pre-wrap;
`;

const BlueButton = styled.button`
    width : 6vw;
    height : 3.5vh;
    border : none;
    border-radius : 20px;
    background-color : ${({ theme }) => theme.colors.mainblue600};
    color : white;
    font-size :  ${({ theme }) => theme.typography.subtitle15.fontSize};
    cursor: pointer;  
`;