import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BlakcImg } from "../../components/BlackImg";

export default function LogIn(){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [eyesOpen, setEyesOpen] = useState(false);
    const [saveID, setSaveID] = useState(false);
    const [passwordErr, setPasswordErr] = useState(true);

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
                        <InputTitle>이메일</InputTitle>
                        <Input  
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}/>
                    </InputContainer>

                    <InputContainer>
                        <InputTitle>비밀번호</InputTitle>
                        <Input
                            value={password} 
                            type={eyesOpen ? "text" : "password"}
                            onChange={(e) => setPassword(e.target.value)}/>
                        <EyesIcon 
                            onClick={() => setEyesOpen((prev) => !prev)}
                            src = {eyesOpen ? "/image/icons/eyes_close.png" : "/image/icons/eyes.png"}/>
                        <PwContainer>
                            <SmallText>비밀번호 찾기</SmallText>
                            <CheckContainer>
                                <CheckImoji
                                    onClick={() => setSaveID((prev) => !prev)}
                                    src={saveID ? "/image/icons/EllipseCheck.png" : "/image/icons/Ellipse.png"}/>
                                <SmallText>아이디 저장</SmallText>
                            </CheckContainer>
                        </PwContainer>
                    </InputContainer>
                </FormContainer>
                
                <ButtonContainer>
                    <ErrSpan>비밀번호가 올바르지 않습니다</ErrSpan>
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
    position: relative;
`;

const InputTitle = styled.span`
    font-size: ${({ theme }) => theme.typography.title24.fontSize};
    color: ${({ theme }) => theme.colors.mainblue100};
    margin-bottom: 5px;
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


const EyesIcon = styled.img`
    width : 30px;
    height : 17.5px;
    position: absolute; /* 절대 위치 지정 */
    right: 20px; /* 오른쪽 여백 설정 */
    top: 53%; /* 입력창 중앙 정렬 */
    transform: translateY(-50%); /* Y축 중앙 정렬 */
    cursor: pointer; /* 클릭 가능하도록 설정 */
    z-index: 10; /* 버튼보다 위로 배치 */
`;

const PwContainer = styled.div`
    display : flex;
    justify-content: space-between;
    margin-top : 10px;
`;

const SmallText = styled.span`
    font-size: ${({ theme }) => theme.typography.subtitle15.fontSize};
    color : ${({ theme }) => theme.colors.mainblue100};
`;

const CheckContainer = styled.div`
    display : flex;
`;

const CheckImoji = styled.img`
    margin-right : 5px;
    width : 15px;
    height : 15px;
`;

const ErrSpan = styled.span`
    font-Size : ${({ theme }) => theme.typography.subtitle15.fontSize};
    color :   ${({ theme }) => theme.colors.yellow};
`;

const BlueButton = styled.button`
    width: 453px;
    height: 77px;
    background-color: ${({ theme }) => theme.colors.mainblue200};
    border: none;
    border-radius: 10px;
    color: white;
    font-size: ${({ theme }) => theme.typography.title24.fontSize};
`;

const TransparentBtn = styled.button`
    width: 453px;
    height: 50px;
    background-color: transparent;
    color: white;
    font-size: ${({ theme }) => theme.typography.subtitle20.fontSize};
    border : none;
`;