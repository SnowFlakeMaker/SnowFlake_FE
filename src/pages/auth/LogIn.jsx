import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BlakcImg } from "../../components/BlackImg";

export default function LogIn(){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const postLogIn =()=>{
        console.log(email, password);
    }

    const GoSignIn =()=>{
        navigate("/signin");
    }
    return(
        <BackgroundContainer>   
            <ContentWrapper>
                <FormContainer>
                    <InputContainer>
                        <InputTitle>아이디</InputTitle>
                        <Input  
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}/>
                    </InputContainer>

                    <InputContainer>
                        <InputTitle>비밀번호</InputTitle>
                        <Input
                            value={password} 
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}/>
                    </InputContainer>
                </FormContainer>
                
                <ButtonContainer>
                    <BlueButton onClick={postLogIn}>확인</BlueButton>
                    <TransparentBtn onClick={GoSignIn}>회원가입하기</TransparentBtn>
                </ButtonContainer>
                
            </ContentWrapper>
            
            <BlakcImg/>
            <BackgroundImg src="/image/lobby_temp.png"/>
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

const ContentWrapper = styled.div`
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; /* 세로 중앙 정렬 */
    width: 453px; /* 입력창과 버튼 크기와 동일하게 설정 */
    height: auto;
    gap: 20px;
`;

const FormContainer = styled.div`
    width: 100%; /* ContentWrapper 내에서 전체 사용 */
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const InputContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
`;

const InputTitle = styled.span`
    font-size: 24px;
    color: white;
    margin-bottom: 5px
`;

const Input = styled.input`
    width: 453px;
    height: 45px;
    padding: 10px 30px;
    font-size: 16px;
    border-radius: 40px;
    border: none;
    outline: none;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
`;

const ButtonContainer = styled.div`
    width: 100%; /* ContentWrapper 내에서 전체 사용 */
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 40px; /* 버튼과 입력창 사이 간격 */
    z-index: 10;
    align-items: center;
`;

const BlueButton = styled.button`
    width: 453px;
    height: 77px;
    background-color: #8AB3DD;
    border: none;
    border-radius: 10px;
    color: white;
    font-size: 24px;
`;

const TransparentBtn = styled.button`
    width: 453px;
    height: 50px;
    background-color: transparent;
    color: white;
    font-size: 20px;
    border : none;
`;