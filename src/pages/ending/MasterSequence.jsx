import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function MasterSequence(){
    const [showNextText, setShowNextText] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowNextText(true);
        }, 3000); 
        return () => clearTimeout(timer);
    }, []);

    const handleClick = async() => {
        if (showNextText) {
            navigate("/ending");
        }
    };
    return(
        <BackgroundContainer onClick={handleClick}>
            <TextContainer>
                <Text>학석사 연계과정에 합격하여 석사까지 마치고 졸업하게 되었다. 그동안의 대학원 생활에서 많은걸 배웠다.</Text>
                
                {showNextText && <NextText> ▶ 엔딩보기</NextText>}
            </TextContainer>
            <BackgroundImg src="/image/ending/status/intelli/endingimg_brain_student.PNG" />
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

const TextContainer = styled.div`
    width: 95%;
    height : 20vh;
    bottom : 5vh;
    position: fixed;
    background-color: ${({ theme }) => theme.colors.mainblue100};
    border: 2px solid ${({ theme }) => theme.colors.mainblue400};
    z-index: 10;
    display: flex;
    flex-direction: column;
`;

const Text = styled.span`
    font-size :  ${({ theme }) => theme.typography.title24.fontSize};
    color : ${({ theme }) => theme.colors.mainblue400};
    padding: 2vw;
`;

const NextText = styled.span`
    position: absolute;
    font-size:  ${({ theme }) => theme.typography.title24.fontSize};
    color: ${({ theme }) => theme.colors.mainblue400};
    right: 0;
    text-align: right;
    padding-right: 3vw;
    bottom: 3vh;
    cursor: pointer;
`;
