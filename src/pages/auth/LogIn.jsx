import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function LogIn(){
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [eyesOpen, setEyesOpen] = useState(false);
    const [saveID, setSaveID] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(["rememberEmail"]); 
    const [passwordErr, setPasswordErr] = useState(null);

    useEffect(() => {
    	/*저장된 쿠키값이 있으면, CheckBox TRUE 및 UserID에 값 셋팅*/
        if (cookies.rememberEmail !== undefined) {
            setEmail(cookies.rememberEmail);
            setSaveID(true); 
        }
    }, []);

    const handleSaveID =(newSaveID)=>{
        if (newSaveID) {
            setCookie("rememberEmail", email, { path: "/", expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }); //7일 유지
        } else {
            removeCookie("rememberEmail"); 
        }
    }

    const postLogIn = async()=>{
        const emailId = email.split("@")[0]; 
        console.log(emailId, password);
        
        try {
            const response = await axios.post(
                `${SERVER_URL}/auth/login`, 
                {
                    email: emailId,
                    password: password,
                },
                {
                    withCredentials: true  // ✅ 쿠키 포함 설정
                }
            );
    

            if (response.status === 200 && response.data.data) {
                console.log("로그인 성공:", response.data);
                navigate("/main");
            } else {
                setPasswordErr(true);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const GoSignIn =()=>{
        navigate("/signin");
    }
    return(
        <BackgroundContainer>   
            <ContentWrapper>
                <LogoImg src="/image/background/logo.png" />
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
                            <CheckContainer>
                                <CheckImoji
                                    onClick={() => {
                                        setSaveID((prev) => {
                                            const newSaveID = !prev;
                                            handleSaveID(newSaveID);
                                            return newSaveID;
                                        });
                                    }}
                                    src={saveID ? "/image/icons/EllipseCheck.png" : "/image/icons/Ellipse.png"}/>
                                <SmallText>아이디 저장</SmallText>
                            </CheckContainer>
                        </PwContainer>
                    </InputContainer>
                </FormContainer>
                
                <ButtonContainer>
                    {passwordErr && <ErrSpan>비밀번호가 올바르지 않습니다</ErrSpan> }
                    <BlueButton onClick={postLogIn}>확인</BlueButton>
                    <TransparentBtn onClick={GoSignIn}>회원가입하기</TransparentBtn>
                </ButtonContainer>
                
            </ContentWrapper>
            <BackgroundImg src="/image/background/lobby.png"/>
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

const LogoImg = styled.img`
    z-index : 15;
    justify-content : center;
    align-items : center;
    position: fixed;
    top : 10vh;
    width: 25vw; /* 원하는 크기로 조정 */
    height: auto; /* 가로 비율 유지 */
`;

const ContentWrapper = styled.div`
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; /* 세로 중앙 정렬 */
    width: 23vw;/* 입력창과 버튼 크기와 동일하게 설정 */
    height: auto;
    gap: 1vw;
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
    margin-bottom: 1.5vh;
    position: relative;
`;

const InputTitle = styled.span`
    font-size: ${({ theme }) => theme.typography.title24.fontSize};
    color: ${({ theme }) => theme.colors.mainblue400};
    margin-bottom: 0.3vh;
`;

const Input = styled.input`
    width: 23vw;
    height: 5vh;
    padding: 1vh 1.5vw;
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
    gap: 0.5vh;
    z-index: 10;
    align-items: center;
    position : fixed;
    bottom : 5vw;
`;


const EyesIcon = styled.img`
    width: 2vw;
    height: 2vh;
    position: absolute; /* 절대 위치 지정 */
    right: 1vw; /* 오른쪽 여백 설정 */
    top: 53%; /* 입력창 중앙 정렬 */
    transform: translateY(-50%); /* Y축 중앙 정렬 */
    cursor: pointer; /* 클릭 가능하도록 설정 */
    z-index: 10; /* 버튼보다 위로 배치 */
`;

const PwContainer = styled.div`
    display : flex;
    justify-content: space-between;
    margin-top: 1vh; 
`;

const SmallText = styled.span`
    font-size: ${({ theme }) => theme.typography.subtitle15.fontSize};
    color : ${({ theme }) => theme.colors.mainblue400};
`;

const CheckContainer = styled.div`
    display : flex;
`;

const CheckImoji = styled.img`
    margin-right: 0.3vw; 
    width: 0.8vw; 
    height : 0.8vw; 
`;

const ErrSpan = styled.span`
    font-Size : ${({ theme }) => theme.typography.subtitle15.fontSize};
    color : red;
    padding-bottom : 1vh;
`;

const BlueButton = styled.button`
    width: 23vw;
    height: 7vh;
    background-color: ${({ theme }) => theme.colors.mainblue600};
    border: none;
    color: white;
    font-size: ${({ theme }) => theme.typography.title24.fontSize};
`;

const TransparentBtn = styled.button`
    width: 23vw;
    height: 4vh;
    background-color: transparent;
    color: ${({ theme }) => theme.colors.mainblue400};
    font-size: ${({ theme }) => theme.typography.subtitle20.fontSize};
    border : none;
    padding-top : 2vh;
`;