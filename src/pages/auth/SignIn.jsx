import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function SignIn(){
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;
    const [stage, setStage] = useState(0);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState("");

    const [time, setTime] = useState(300);
    const [error, setError] = useState(null); // 에러 메시지 상태

    const [eyesOpen, setEyesOpen] = useState(false);
    const [eyesCheckOpen, setEyesCheckOpen] = useState(false);


    const [authCode, setAuthCode] = useState(""); //입력한 인증 코드 
    const [clickAuth, setClickAuth] = useState(false); //인증 버튼 클릭 여부 

    const sendCode = async() =>{
        setClickAuth(true);
        if (!clickAuth) {
            try {
                const response = await axios.post(`${SERVER_URL}/auth/send-email`, {
                    emailId: email, 
                });

                if (response.status === 200) {
                    console.log("인증 코드 전송 완료:", response.data);
                }
            } catch (error) {
                console.error("이메일 인증 코드 전송 실패:", error);
            }
        }
        
    }

    // 타이머 효과
    useEffect(() => {
        if (clickAuth && time > 0) {
            const timer = setInterval(() => {
                setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
            }, 1000);

            return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 해제
        }
    }, [clickAuth, time]);


    const formatTime =(t)=> {
        const minutes = Math.floor(t / 60);
        const seconds = t % 60;
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    const verifyEmail = async () => {
        console.log(email, authCode);

        try {
            const response = await axios.post(`${SERVER_URL}/auth/verify-code`, {
                emailId: email,
                code: authCode,
            });

            if (response.status === 200 && response.data.data) {
                console.log("인증 성공:", response.data);
                setStage((prevStage) => prevStage + 1); // 다음 단계로 이동
                setError(null); // 에러 초기화
            } else {
                setError("인증 실패. 다시 시도해주세요.");
            }
        } catch (error) {
            console.error("이메일 인증 오류:", error);
            setError("서버 오류 발생. 다시 시도해주세요.");
        }
    };

    const postSignIn = async()=>{
        console.log(email, password);

        try {
            const response = await axios.post(`${SERVER_URL}/auth/signup`, {
                email: email,
                password: password,
            });

            if (response.status === 200) {
                console.log("회원가입 성공:", response.data);
                navigate("/info", { state: { email } });
            }
        } catch (error) {
            console.error(error);
        }
    }

    const GoLogin =()=>{
        navigate("/login");
    }

    const renderPage =()=>{
        switch(stage){
            case 0 :
                return(
                    <ContentWrapper>
                        <InputContainer>
                            <InputTitle>이메일</InputTitle>
                            <Input 
                                value={email} 
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setClickAuth(false);
                            }}/>
                            <Placeholder>@sookmyung.ac.kr</Placeholder>
                            <ErrSpan>숙명 이메일에서 앞부분만 입력해주세요</ErrSpan>
                            <AuthButton 
                                clickAuth={clickAuth} 
                                onClick={sendCode}>
                                    이메일 인증하기
                            </AuthButton>
                            <SmallText>남은  시간 {formatTime(time)}</SmallText>
                        </InputContainer>
                        
                        <InputContainer>
                            <InputTitle>인증코드</InputTitle>
                            <Input value={authCode} onChange={(e) => setAuthCode(e.target.value)}></Input>
                            {error && <ErrSpan>{error}</ErrSpan>}
                        </InputContainer>
                        
                        <ButtonContainer>
                            <BlueButton onClick={verifyEmail}>확인</BlueButton>
                            <TransparentBtn onClick={GoLogin}>로그인 하기</TransparentBtn>
                        </ButtonContainer>
                    </ContentWrapper>
                );
            case 1 : 
                return(
                    <ContentWrapper>
                        <InputContainer style={{ minHeight: "350px" }}>
                            <InputTitle style={ {marginTop : "30px"} }>비밀번호</InputTitle>
                            <Input 
                                value={password}  
                                type={eyesOpen ? "text" : "password"}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder = "영어대소문자, 특수문자를 포함한 8~18글자"/>
                            <EyesIcon 
                                style={ {top : "23%"} }
                                onClick={() => setEyesOpen((prev) => !prev)}
                                src = {eyesOpen ? "/image/icons/eyes_close.png" : "/image/icons/eyes.png"}/>
                            
                            
                            <InputTitle style={ {marginTop : "30px"} }>비밀번호 확인</InputTitle>
                            <Input 
                                value={checkPassword} 
                                type={eyesCheckOpen ? "text" : "password"}
                                onChange={(e) => setCheckPassword(e.target.value)}/>
                            <EyesIcon 
                                style={ {top : "54%"} }
                                onClick={() => setEyesCheckOpen((prev) => !prev)}
                                src = {eyesCheckOpen ? "/image/icons/eyes_close.png" : "/image/icons/eyes.png"}/>
                            
                            {password && checkPassword && password !== checkPassword && (
                                <ErrSpan>비밀번호가 맞지 않습니다</ErrSpan>
                            )}
                        </InputContainer>

                        <ButtonContainer>
                            <BlueButton onClick={postSignIn}>회원가입하기</BlueButton>
                        </ButtonContainer>
                    </ContentWrapper>
                );
    }
}
    return(

        <BackgroundContainer>
            <LogoImg src="/image/background/logo.png" />
            {renderPage()}
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
    width: 23vw;  /* 입력창과 버튼 크기와 동일하게 설정 */
    height: auto;
    gap: 1vw;
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
    border-radius: 2vw;
    border: none;
    outline: none;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    margin-bottom: 0.5vh; 
`;

const Placeholder = styled.span`
    position: absolute;
    right: 1vw;/* 오른쪽 정렬 */
    top: 28%;
    transform: translateY(-50%);
    font-size: 16px;
    color: ${({ theme }) => theme.colors.mainblue300};
    pointer-events: none; /* 클릭되지 않도록 설정 */
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


const AuthButton = styled.button`
    width: 23vw;
    height: 5vh;
    border-radius: 2vw;
    border: none;
    outline: none;
    align-items: center;
    justify-content: center;
    background-color: ${({ clickAuth, theme }) => 
        clickAuth ? theme.colors.gray : theme.colors.mainblue200};
    font-size: ${({ theme }) => theme.typography.subtitle20.fontSize};
    color : white;
    margin-bottom: 1vh;
    margin-top: 1vh;
    cursor : pointer;
`;

const EyesIcon = styled.img`
    width: 2vw;
    height: 2vh;
    position: absolute; /* 절대 위치 지정 */
    right: 1vw; /* 오른쪽 여백 설정 */
    transform: translateY(-50%); /* Y축 중앙 정렬 */
    cursor: pointer; /* 클릭 가능하도록 설정 */
    z-index: 10; /* 버튼보다 위로 배치 */
`;


const SmallText = styled.span`
    font-size: ${({ theme }) => theme.typography.subtitle15.fontSize};
    color : ${({ theme }) => theme.colors.mainblue400};
    justify-content: center;
    align-items: center;
    text-align: center;
`;


const ErrSpan = styled.span`
    font-Size : ${({ theme }) => theme.typography.subtitle15.fontSize};
    color :   red;
    text-align: center;
    padding-bottom : 1vh;
    padding-top : 0.3vh;
`;

const BlueButton = styled.button`
    width: 23vw;
    height: 7vh;
    background-color: ${({ theme }) => theme.colors.mainblue600};
    border: none;
    border-radius: 10px;
    color: white;
    font-size: ${({ theme }) => theme.typography.title24.fontSize};
    cursor : pointer;
`;

const TransparentBtn = styled.button`
    width: 23vw;
    height: 4vh;
    background-color: transparent;
    color: ${({ theme }) => theme.colors.mainblue400};
    font-size: ${({ theme }) => theme.typography.subtitle20.fontSize};
    border: none;
    padding-top: 2vh;
    cursor: pointer;
`;