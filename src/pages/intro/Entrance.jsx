import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../apiClient";

export default function Entrance(){
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
            navigate("/ot");
        }
    };

    return(
        <BackgroundContainer onClick={handleClick}>
            <TextContainer>
                <Text>입학식에 왔다. 앞으로의 대학생활이 기대된다!</Text>
                {showNextText && <NextText> ▶ 클릭하여 다음으로</NextText>}
            </TextContainer>
            <BackgroundImg src="/image/cutscene/img_entrance.PNG" />
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

const BackgroundImg = styled.img`
    width : 100%;
    height : 100%;
    object-fit : cover;
    position: absolute;
    top: 0;
    left: 0;  
`;