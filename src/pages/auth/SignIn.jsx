import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import Dropdown from "react-dropdown";
import styled from "styled-components";
import { BlakcImg } from "../../components/BlackImg";
import "react-datepicker/dist/react-datepicker.css";
import "react-dropdown/style.css";

export default function SignIn(){
    const [stage, setStage] = useState(0);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [birthday, setBirthday] = useState(new Date());
    const [mbti, setMbti] = useState("");
    const [hobby, setHobby] = useState("");
    const [dream, setDream] = useState("");

    const mbtiOptions = [
        'ISTJ', 'ISFJ', 'INFJ', 'INTJ', 'ISTP', 'ISFP', 'INFP', 'INTP', 'ESTP', 'ESFP', 'ENFP', 'ENTP', 'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
    ];

    const defaultOption = mbtiOptions[0];

    const [authCode, setAuthCode] = useState("");
    const [clickAuth, setClickAuth] = useState(false);

    const sendCode =()=>{
        if(!clickAuth) setClickAuth(true);
        console.log(clickAuth);
    }
    const verifyEmail =()=>{
        console.log(email, authCode);
        setStage(stage + 1); //수정 필요
    }

    const postSignIn =()=>{
        console.log(email, password, nickname, birthday, mbti, hobby, dream)
        navigate("/ot");
    }

    const handleStage =()=>{
        setStage(stage + 1);
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
                            <SmallText>남은 시간 time</SmallText>
                        </InputContainer>
                        
                        <InputContainer>
                            <InputTitle>인증코드</InputTitle>
                            <Input value={authCode} onChange={(e) => setAuthCode(e.target.value)}></Input>
                            <ErrSpan>인증코드가 올바르지 않습니다</ErrSpan>
                        </InputContainer>
                        
                        <ButtonContainer>
                            <BlueButton onClick={verifyEmail}>확인</BlueButton>
                            <TransparentBtn onClick={GoLogin}>로그인 하기</TransparentBtn>
                        </ButtonContainer>
                        
                        {/* <span>비밀번호</span>
                        <input value={password} onChange={(e) => setPassword(e.target.value)}></input>
                        < onClick={() => handleStage()}>다음으로</span> */}
                    </ContentWrapper>
                );
            case 1 : 
                return(
                    <div>
                        <span>닉네임</span>
                        <input value={nickname} onChange={(e) => setNickname(e.target.value)}></input><br/>
                        <span>생일</span>
                        <DatePicker
                            dateFormat='yyyy.MM.dd' // 날짜 형태
                            shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                            selected={birthday} 
                            onChange={(birthday) => setBirthday(birthday)}
                            showTimeSelect={false} 
                        /> <br/>
                        <span>MBTI</span>
                        <Dropdown 
                            options={mbtiOptions} 
                            onChange={(e) => setMbti(e.value)} 
                            value={mbti} 
                            placeholder="mbti를 선택하세요" />
                        <span>취미</span>
                        <input value={hobby} onChange={(e) => setHobby(e.target.value)}></input><br/>
                        <span onClick={() => handleStage()}>다음으로</span>
                    </div>
                );
            case 2:
                return(
                    <div>
                        <span>어린 시절의 꿈이 무엇이였나요?</span>
                        <input value={dream} onChange={(e) => setDream(e.target.value)}></input><br/>
                        <span onClick={() => postSignIn()}>회원가입하기</span>
                    </div>
                )
        }

    }
    return(
        <BackgroundContainer>
            {renderPage()}
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
    padding: 10px 130px 10px 20px;
    font-size: 16px;
    border-radius: 40px;
    border: none;
    outline: none;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    margin-bottom : 10px;
`;

const Placeholder = styled.span`
    position: absolute;
    right: 20px; /* 오른쪽 정렬 */
    top: 26%;
    transform: translateY(-50%);
    font-size: 16px;
    color: ${({ theme }) => theme.colors.mainblue300};
    pointer-events: none; /* 클릭되지 않도록 설정 */
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


const AuthButton = styled.button`
    width: 453px;
    height: 57px;
    border-radius: 40px;
    border: none;
    outline: none;
    align-items: center;
    justify-content: center;
    background-color: ${({ clickAuth, theme }) => 
        clickAuth ? theme.colors.gray : theme.colors.mainblue200};
    font-size: ${({ theme }) => theme.typography.subtitle20.fontSize};
    color : white;
    margin-bottom : 10px;
    margin-top : 20px;

`;


const SmallText = styled.span`
    font-size: ${({ theme }) => theme.typography.subtitle15.fontSize};
    color : ${({ theme }) => theme.colors.mainblue100};
    justify-content: center;
    align-items: center;
    text-align: center;
`;


const ErrSpan = styled.span`
    font-Size : ${({ theme }) => theme.typography.subtitle15.fontSize};
    color :   ${({ theme }) => theme.colors.yellow};
    text-align: right;
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