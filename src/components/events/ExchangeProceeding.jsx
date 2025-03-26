import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../apiClient";

export default function ExchangeProceeding(){
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
            try{
                const response = await apiClient.post('/event/exchange/proceed');
                if(response.status === 200){
                    console.log(response.data);
                    navigate("/main");
                }
            } catch(error){
                console.log(error);
            }
            
        }
    };

    return(
        <BackgroundContainer onClick={handleClick}>
            <TextContainer>
                <Text>한학기동안 다른 나라에서 즐거운 교환학생 생활을 보냈어!</Text>
                
                {showNextText && <NextText> ▶ 다음 학기로</NextText>}
            </TextContainer>
            <BackgroundImg src="/image/cutscene/img_exchangestudent.PNG" />
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
