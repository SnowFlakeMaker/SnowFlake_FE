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
    const [checkPassword, setCheckPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [birthday, setBirthday] = useState(new Date());
    const [mbti, setMbti] = useState("");
    const [major, setMajor] = useState("");
    const [hobby, setHobby] = useState("");
    const [dream, setDream] = useState("");

    const mbtiOptions = [
        'ISTJ', 'ISFJ', 'INFJ', 'INTJ', 'ISTP', 'ISFP', 'INFP', 'INTP', 'ESTP', 'ESFP', 'ENFP', 'ENTP', 'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
    ];
    
    const majorOptions = [
        '한국어문학부', '역사문화학과', '프랑스언어·문화학과', '중어중문학부', '독일언어·문화학과', '일본학과', '문헌정보학과', '문화관광학전공', '르꼬르동블루외식경영전공', '교육학부',
        '화학과', '생명시스템학부', '수학과', '통계학과', '체육교육과', '무용과',
        '화공생명공학부', '인공지능공학부', '지능형전자시스템전공', '신소재물리전공', '컴퓨터과학전공', '데이터사이언스전공', '기계시스템학부', '기초공학부', '첨단공학부',
        '가족자원경영학과', '아동복지학부', '의류학과', '식품영양학과',
        '정치외교학과', '행정학과', '홍보광고학과', '소비자경제학과', '사회심리학과',
        '법학부', 
        '경제학부', '경영학부', 
        '피아노과', '관현악과', '성악과', '작곡과',
        '약학부',
        '시각·영상디자인과', '산업디자인과', '환경디자인과', '공예과', '회화과',
        '미디어학부',
        '자유전공학부', 
        '글로벌협력전공', '앙트러프러너십전공',
        '영어영문학부'
    ]

    const [authCode, setAuthCode] = useState("");
    const [clickAuth, setClickAuth] = useState(false);

    const sendCode =()=>{
        if(!clickAuth) setClickAuth(true);
        console.log(clickAuth);
    }

    const [eyesOpen, setEyesOpen] = useState(false);
    const [eyesCheckOpen, setEyesCheckOpen] = useState(false);


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
                            <BlueButton onClick={handleStage}>확인</BlueButton>
                        </ButtonContainer>
                    </ContentWrapper>
                );
            case 2:
                return(
                    <ContentWrapper>
                        <InputContainer style={{ minHeight: "440px" }}>
                            <InputTitle style={ {marginTop : "30px"} }>닉네임</InputTitle>
                            <Input value={nickname} onChange={(e) => setNickname(e.target.value)}/>
                            {nickname.length > 5 && <ErrSpan>닉네임은 5글자까지 가능합니다</ErrSpan>}

                            <InputTitle style={ {marginTop : "30px"} } >생일</InputTitle>
                            <CustomDatePicker
                                dateFormat='yyyy.MM.dd' // 날짜 형태
                                shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                                selected={birthday} 
                                onChange={(birthday) => setBirthday(birthday)}
                                showTimeSelect={false} 
                            />

                            <InputTitle style={ {marginTop : "30px"} }>MBTI</InputTitle>
                            <CustomDropdown 
                                options={mbtiOptions} 
                                onChange={(e) => setMbti(e.value)} 
                                value={mbti} 
                                placeholder="mbti를 선택하세요"
                                arrowClosed={<img src={"/image/icons/Arrow-down.png"} alt="arrow down" width="20px" />} 
                                arrowOpen={<img src={"/image/icons/Arrow-up.png"} alt="arrow up" width="20px" />} />

                            <InputTitle style={ {marginTop : "30px"} }>전공</InputTitle>
                            <CustomDropdown 
                                options={majorOptions} 
                                onChange={(e) => setMajor(e.value)} 
                                value={major} 
                                placeholder="전공을 선택하세요"
                                arrowClosed={<img src={"/image/icons/Arrow-down.png"} alt="arrow down" width="20px" />} 
                                arrowOpen={<img src={"/image/icons/Arrow-up.png"} alt="arrow up" width="20px" />} />

                        </InputContainer>

                        <ButtonContainer>
                            <BlueButton onClick={handleStage}>확인</BlueButton>
                        </ButtonContainer>            
                    </ContentWrapper>
                )
            case 3: 
                return(
                    <ContentWrapper>
                        <InputContainer>
                            <InputTitle>취미</InputTitle>
                            <Input value={hobby} onChange={(e) => setHobby(e.target.value)}/>

                            <InputTitle style={ {marginTop : "30px"} }>어린 시절의 꿈이 무엇이였나요?</InputTitle>
                            <Input value={dream} onChange={(e) => setDream(e.target.value)}/>
                        </InputContainer>
                        
                        <ButtonContainer>
                            <BlueButton onClick={() => postSignIn()}>회원가입하기</BlueButton>
                        </ButtonContainer>
                            
                    </ContentWrapper>
                )
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

const CustomDatePicker = styled(DatePicker)`
  width: 20vw;
  height: 3vh;
  font-size: 16px;
  border-radius: 2vw;
  border: none;
  outline : none;
  padding: 1vh 1.5vw; 
  background-color: white;
`;

const CustomDropdown = styled(Dropdown)`
  .Dropdown-control {
    width: 100%;
    height: 5vh;
    font-size: 16px;
    border-radius: 2vw;
    border: none;
    padding: 1vh 1vw;
    background-color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .Dropdown-menu {
    width: 100%;
    font-size: 16px;
    border-radius: 0.5vw; 
    border: none;
    background-color: white;
  }

   .Dropdown-arrow-wrapper {
        display: flex;
        align-items: center; /*  화살표 아이콘이 텍스트와 정렬되도록 설정 */
  }

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

