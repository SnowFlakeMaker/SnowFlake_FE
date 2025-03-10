import React, { useState } from "react";
import styled from "styled-components";

export default function Club(){
    const [isApply, setIsApply] = useState(undefined);
    const [isAllowed, setIsAllowed] = useState(undefined); //백엔드에서 받을 동아리 합격 여부 
    const [isClosed, setIsClosed] = useState(false);
    
    if(isClosed == true) return null;

    return(
        <Container>
            {isApply === undefined &&
                <>
                    <TextContainer>
                        <Text>내가 관심있는 분야의 동아리에 지원할까?</Text>
                    </TextContainer>

                    <SelectContainer>
                        <SelectOption onClick={()=>setIsApply(true)}>지원한다. (Y)</SelectOption>
                        <SelectOption onClick={()=>setIsApply(false)}>지원하지 않는다. (N)</SelectOption>
                    </SelectContainer>
                </>
            }
            {isAllowed === true &&
                <>
                    <TextContainer>
                        <Text>동아리에 합격했어! 앞으로 열심히 활동해보자.</Text>
                    </TextContainer>

                    <SelectContainer>
                        <SelectOption onClick={() => setIsClosed(true)}>닫기</SelectOption>
                    </SelectContainer>
                </>
            }
            {isAllowed === false &&
                <>
                    <TextContainer>
                        <Text>아쉽게도 동아리에 불합격했어.</Text>
                    </TextContainer>

                    <SelectContainer>
                        <SelectOption onClick={() => setIsClosed(true)}>닫기</SelectOption>
                    </SelectContainer>
                </>
            }
            
        </Container>
    );
}

const Container = styled.div`
    width: 40vw;
    height: 23vh;
    display : flex;
    position : fixed;
    flex-direction : column;
    bottom : 1vh;
    right : 1vh;
    margin: 0.8vw; 
    z-index : 15;
    background-color : ${({ theme }) => theme.colors.mainblue100};
    border : 4px solid ${({ theme }) => theme.colors.mainblue400};
`;

const TextContainer = styled.div`
    margin: 1vw;
    display : flex;
    flex-direction : column;
    gap: 0.5vw;
`;

const Text = styled.span`
    font-size :  ${({ theme }) => theme.typography.title24.fontSize};
    color : ${({ theme }) => theme.colors.mainblue400};
`;

const SelectContainer = styled.div`
    margin: 1vw;
    position : absolute;
    right : 1vw;
    bottom : 0.5vh;
    margin-right: 0.5vw; 
    display : flex;
    flex-direction : column;
    gap: 0.5vw;
    text-align: right;
`;


const SelectOption = styled.span`
    font-size: ${({ theme }) => theme.typography.title24.fontSize};
    line-height: ${({ theme }) => theme.typography.title24.fontSize};
    color: ${({ theme }) => theme.colors.mainblue400};
    position: relative;
    display: flex; /* 텍스트와 아이콘을 동일한 높이로 정렬 */
    align-items: center; /* 수직 정렬 */
    padding-left: 3.5vw; /* 아이콘을 위한 공간 확보 */
    cursor: pointer;

    &:hover::before {
        content: url('/image/icons/select-conversation.png');
        position: absolute;
        left: 0;
        top: -0.2vh;
        width: 0.5vw; 
        height: 1.7vh;
        z-index : 7;
    }
`;