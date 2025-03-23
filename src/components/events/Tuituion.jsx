import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { apiClient } from "../../apiClient";
import { useNavigate } from "react-router-dom";

export default function Tuition(){
    const [isParentSupport, setIsParentSupport] = useState(null); //대리납부 여부 
    const [text, setText] = useState(""); //납부완료 텍스트
    const [money, setMoney] = useState("");

    const navigate = useNavigate();
    
    useEffect(()=>{
        const postTuition = async() => {
            try {
                const response = await apiClient.post('/event/tuition');
                if(response.status === 200) {
                    console.log(response.data);
                    setIsParentSupport(!response.data.data.success);
                    setText(response.data.message);
                }
            } catch(error){
                if (error.response?.status === 409) {
                    const errData = error.response.data;
                    setText(`${errData.message} 부모님께 도움을 요청할게요.`);
                    setIsParentSupport(!errData.data?.success); 
                    postTuitionHelp();
                } else {
                    console.error("기타 오류:", error);
                }
            }
        }

        postTuition();
    }, [])

    const postTuitionHelp = async(parentSupport) => {
        try{
            const response = await apiClient.post(`/event/tuition/help?parentSupport=${parentSupport}`);
            if(response.status === 200){
                console.log(response.data);
                setIsParentSupport(false);
                setText(response.data.message);
            }
        } catch(error){
            if (error.response?.status === 405){
                navigate('/stress_ending');
            }
            else { 
                console.log(error);
            }
        }
    }

    return(
        <Container>
            <TextContainer>
                {!isParentSupport &&
                    <Text>{text}</Text>
                }
                {isParentSupport &&
                    <>
                        <Text>{text}</Text>
                        <InputMoney 
                            type="number"
                            value={money}
                            onChange={(e) => setMoney(e.target.value)}
                            placeholder="도움을 요청할 금액을 입력하세요"
                            />
                        <SubmitButton onClick={()=>postTuitionHelp(money)}>납부하기</SubmitButton>
                    </>
                }
            </TextContainer>
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

const InputMoney = styled.input`
  padding: 1vh 1vw;
  font-size: ${({ theme }) => theme.typography.subtitle20.fontSize};
  border: 2px solid ${({ theme }) => theme.colors.mainblue400};
  border-radius: 8px;
  background-color: white;
  width: 50%;
`;


const SubmitButton = styled.button`
  margin-top: 1vh;
  padding: 1vh 2vw;
  width : 10vw;
  font-size: ${({ theme }) => theme.typography.subtitle20.fontSize};
  background-color: ${({ theme }) => theme.colors.mainblue400};
  color: ${({ theme }) => theme.colors.mainblue100};
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.mainblue300};
  }
`;