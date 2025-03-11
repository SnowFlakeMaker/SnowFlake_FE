import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function ProgressingList( { plans } ){
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (plans.length === 0) return null; // 빈 배열이면 실행하지 않음
        
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % plans.length);
        }, 3000); // 3초마다 변경

        return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
    }, [plans]);

    if (plans.length === 0) return null; // 데이터가 없으면 아무것도 렌더링하지 않음

    const currentPlan = plans[currentIndex];

    return(
        <Container>
            <DoingContainer>
                <DoingText>{currentPlan.title}</DoingText>
                <DoingImg />
            </DoingContainer>
            <StatusContainer>
                <StatusText style={{ marginBottom: "8vh", marginTop : "1vw" }}>효과</StatusText>
                <StatusText style={{ marginBottom: "1vh" }}> ▶ 증가 : {currentPlan.plus.join(', ')} </StatusText>
                <StatusText> ▶ 감소 :{currentPlan.minus.join(', ')}</StatusText>
            </StatusContainer>
        </Container>
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
    height : 100%
`;

const DoingText = styled.span`
    font-size :  ${({ theme }) => theme.typography.title24.fontSize};
    color : ${({ theme }) => theme.colors.mainblue400};
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
`;

const StatusText = styled.span`
    font-size :  ${({ theme }) => theme.typography.title24.fontSize};
    color : ${({ theme }) => theme.colors.mainblue100};
    margin-left : 1.5vw;
`;