import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function StressEnding(){
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
            navigate("/main");
        }
    };


    return(
        <BackgroundContainer onClick={handleClick}>
            <TextContainer>
                <Text>완벽한 학교 생활에 너무 집착한 나머지 스트레스 관리를 소홀히 한 것 같다… 
                    번아웃이 와서 더 이상 해나갈 힘이 나지 않아. 적당히 쉬어 가며 학교 생활을 해나가는 것이야말로 완벽한 학교 생활이 아닐까? 
                    시간을 돌릴 수 있다면 좋을 텐데..</Text>
                
                {showNextText && <NextText> ▶ 클릭하여 되돌리기</NextText>}
            </TextContainer>

            
            
            <BackgroundImg src="/image/ending/stress/endingimg_stress.PNG" />
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
