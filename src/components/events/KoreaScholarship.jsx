import React, { useState } from "react";
import styled from "styled-components";
import { apiClient } from "../../apiClient";

export default function KoreaScholarship(){
    const [isApply, setIsApply] = useState(undefined);
    
    if(isApply !== undefined) return null;

    const postScholarships = async()=>{
            try{
                const response = await apiClient.post('/event/scholarships');
                if(response.status === 200){
                    console.log(response.data);
                }
                else{
                    alert(response.data.data);
                }
            } catch(error){
                console.log(error);
                
            }
        }

    return(
        <Container>
            <TextContainer>
                <Text>나라에서 등록금을 지원해주는 국가장학금 신청기간이야. 국가장학금을 신청할까?</Text>

            </TextContainer>

            <SelectContainer>
                <SelectOption onClick={()=>{setIsApply(true); postScholarships();}}>신청한다 (Y)</SelectOption>
                <SelectOption onClick={()=>setIsApply(false)}>신청하지 않는다. (N)</SelectOption>
            </SelectContainer>
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