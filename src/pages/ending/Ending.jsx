import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { apiClient } from "../../apiClient";
import { useNavigate } from "react-router-dom";

export default function Ending(){
    const [endingType , setEndingType] = useState(null);
    const [endingText, setEndingText] = useState("");
    const [showNextText, setShowNextText] = useState(false);
    const [dream, setDream] = useState("");
    const [isMaster, setIsMaster] = useState(null);


    const audioRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);

    const [text, setText] = useState("");
    const [src, setSrc] = useState("");

    const navigate = useNavigate();

    const handleUnmute = () => {
        const audio = audioRef.current;
        if (audio) {
            const newMuteState = !isMuted;
            audio.muted = newMuteState;
            setIsMuted(newMuteState);
            if (!audio.paused) {
                audio.play().catch(err => console.log("오디오 재생 실패:", err));
            }
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.muted = true; // 최초엔 음소거된 상태로 시작
            audio.play().catch(err => console.log("자동 재생 실패:", err));
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowNextText(true);
        }, 3000); 
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const getMaster = async () => {
            try {
                const response = await apiClient.get('/event/combined-programs/check');
                if (response.status === 200) {
                    const isPassed = response.data.data;
    
                    // ❗ 학석사 과정이 필요한데 아직 방문 안했으면 이동
                    if (isPassed && localStorage.getItem("cameFromCombined") !== "true") {
                        localStorage.setItem("cameFromCombined", "true"); // 방문 표시
                        navigate("/combined-programs");
                    }
    
                    setIsMaster(isPassed);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getMaster();
    }, []);
    
    useEffect(()=>{
        const getEnding = async() => {
            try{
                const response = await apiClient.get('/ending/final');
                if(response.status === 200){
                    console.log(response.data);
                    setEndingType(response.data.data.endingType);
                    setEndingText(response.data.data.endingText || "");
                    setDream(response.data.data.dream || "");
                    renderEnding();
                }
            } catch(error){
                console.log(error);
            }
        }
        getEnding();
    }, [!endingType, isMaster]); 

    const renderEnding = ()=>{
        switch(endingType){
            case "굿 엔딩" :
                setText("학교생활 동안 많은 일에 도전해보았다. 때론 벅차고 힘들었지만 포기하지 않고 해내다 보니 결국 전공 분야에서 세계적으로 인정받는 사람이 되었다. 이제는 진짜 내가 원하는 일을 마음껏 해볼 차례다.");
                setSrc("/image/ending/endingimg_good_un.PNG");
                break;
            case "스페셜 엔딩" :
                if(endingText === "취미 엔딩"){
                    setText("재미로 시작한 취미였는데 어느 순간 내 삶의 일부가 되어 있었다. 누군가에게는 별거 아닐 수 있지만, 나는 이걸 통해 나를 더 잘 알게 됐다.");
                    setSrc("");
                } 
                else if(endingText === "알바 엔딩") {
                    setText("다양한 아르바이트를 하면서 세상 돌아가는 방식을 조금은 배운 것 같다. 돈 버는 게 쉽지 않다는 걸 깨달았고, 덕분에 지금은 뭘 하든 책임감을 갖게 됐다.");
                    setSrc("");
                }
                else if(endingText === "봉사 엔딩"){
                    setText("누군가를 도우면서 오히려 내가 위로받는 기분이었다. 대단한 일을 한 건 아니지만 내 시간과 노력이 누군가에게 힘이 되었다는 사실은 오랫동안 기억에 남을 것 같다.");
                    setSrc("");
                }
                else if(endingText === "해외 엔딩"){
                    setText("교환학생을 다녀온 건 내게 정말 큰 전환점이었다.새로운 환경에 적응하면서 스스로 많이 단단해졌고 지금은 외국에서도 충분히 일할 수 있다는 자신감이 생겼다.");
                    setSrc("");
                }
            case "스탯 엔딩" :
                if(endingText === "군인"){
                    setText("잔병치레가 많았던 내가 이렇게 달라질 줄은 몰랐다. 운동으로 체력과 근성을 함께 기르다 보니 어느새 나라를 지키는 사람이 되어 있었다.");
                    setSrc("");
                }
                else if(endingText === "짐 대표"){
                    setText("건강 때문에 시작한 운동이 직업이 될 줄은 몰랐다. 직접 운영하는 피트니스 센터도 생기고운동 루틴 짜는 게 이젠 일상이 됐다. 앞으로도 건강하게, 꾸준히 이 길을 걸어갈 생각이다.");
                    setSrc("/image/ending/endingimg_health_gym.PNG");
                }
                else if(endingText === "연구원"){
                    setText("공부하는 게 재밌었다. 끝까지 파고들다 보니 연구라는 길이 내게 맞았다. 힘든 순간도 있지만, 내가 좋아하는 걸 연구할 수 있어서 행복하다.");
                    setSrc("");
                }
                else if(endingText === "대학원생"){
                    setText("공부는 자신 있었는데, 대학원 생활이 이렇게 체력과 정신력을 요구할 줄은 몰랐다. 아직 연구는 시작단계지만, 차근차근 해나가려고 한다.");
                    setSrc("");
                }
                else if(endingText === "전문직"){
                    setText("쉽지 않은 길이라는 걸 알았지만 한번 도전하기로 마음먹고 꾸준히 버텼다. 시험 준비도, 합격 후 실무도 만만치 않았지만 결국 이 자리까지 오게 됐다.");
                    setSrc("");
                }
                else if(endingText === "인플루언서"){
                    setText("SNS에 내 일상을 올리던 게 어느새 일이 됐다. 사람들과 소통하는 게 즐거웠고, 그 덕에 나를 좋아해 주는 사람들이 생겼다.");
                    setSrc("");
                }
                else if(endingText === "창업"){
                    setText("혼자보단 사람들과 부딪히는 게 더 재미있었다. 그래서 직접 무언가를 이끌어나가고 싶어 창업을 결심했다. 초반엔 시행착오도 많았지만 점점 내 방식대로 풀어갈 수 있게 됐다.");
                    setSrc("");
                }
                else if(endingText === "대통령"){
                    setText("꾸준히 사람들을 나서서 이끌다보니, 점점 더 큰 단위에서 문제를 바라볼 수 있었다. 훗날 한 국가를 이끄는 사람이 되었다.");
                    setSrc("");
                }
                else if(endingText === "청년 국회의원"){
                    setText("학교에서 시작된 관심이 점점 사회 전반으로 확장되었다. 학생 자치에서 시작해 이제는 더 많은 사람의 목소리를 대변하게 됐다. 아직 부족한 점도 많지만, 하나씩 바꿔나가고 싶다.");
                    setSrc("");
                }
                else if(endingText === "번역가"){
                    setText("문장을 정확하게 옮기는 게 내겐 재미였다. 덕분에 좋아하는 책과 글을 더 많은 사람들에게 전달할 수 있게 됐다. 조용히 오래 할 수 있는 일이 생겨서 만족스럽다.");
                    setSrc("");
                }
                else if(endingText === "통역가"){
                    setText("언어를 배우다보니, 다양한 사람과 문화를 잇는 통역가라는 직업이 내게 잘 맞았다. 지금은 현장에서 실력을 인정받으며 일하고 있다.");
                    setSrc("");
                }
            case "노말 엔딩" :
                if(endingText === "꿈 엔딩"){
                    setText(`학교생활 내내 뭔가에 쫓기듯 살았던 것 같다. 뭐 하나 제대로 해낸 것도 없고, 누군가와 비교만 하다 끝나버린 느낌이다. 그래서 아주 어릴 적, 내 마음속에만 품고 있던 꿈인 ${dream}을(를) 다시 꺼내보기로 했다. 늦었을 수도 있지만, 지금이라면 진짜 내가 원하는 걸 향해 걸어갈 수 있을 것 같다.`);
                    setSrc("");
                }
                else if(endingText === "체력 엔딩"){
                    setText("잔병치레를 겪으며 체력의 소중함을 깨닫고 운동을 시작하게 됐다. 건강한 몸과 마음이 있으니 앞으로 못할 일은 없어!");
                    setSrc("");
                }
                else if(endingText === "지력 엔딩"){
                    setText("추가학기를 다니게 되었다. 남들보다 조금 늦게 시작하게 되었지만 그래도 난 충분히 해낼 수 있어!");
                    setSrc("");
                }
                else if(endingText === "근성 엔딩"){
                    setText("졸업 후 취업 준비를 시작하게 되었다. 망망대해에 떨어진 기분이지만 차근차근 해나가다보면 목표를 이룰 수 있을 거야!");
                    setSrc("");
                }
                else if(endingText === "사회성 엔딩"){
                    setText("학교생활을 하는 동안 친구를 많이 사귀지 못한 게 아쉽다. 이제라도 모임에 참여해 인간관계를 넓혀보려 해!");
                    setSrc("");
                }
                else if(endingText === "리더십 엔딩"){
                    setText("졸업 후 사회인으로서 살아가던 도중, 문득 내 삶에 좀 더 주체성을 갖고 싶어졌다.");
                    setSrc("");
                }

        }
    }

    const goCredit =()=>{
        navigate('/credit');
    }

    return(
        <BackgroundContainer>
            <audio ref={audioRef} src="/music/ending.mp3" loop autoPlay /> 
            <SoundButton onClick={handleUnmute}> {isMuted ? "🔇" : "🔈"}</SoundButton>
            <TextContainer>
                <Text>{text}</Text>
            
                {showNextText && <NextText onClick={goCredit}> ▶ 눈송이메이커와 인사하기</NextText>}
            </TextContainer>

            <BackgroundImg src={src} />
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
    height : 23vh;
    bottom : 1vh;
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


const SoundButton = styled.button`
    border : none;    
    position: fixed;
    top: 2vh;
    right: 2vw;
    z-index: 20;
    font-size: 24px;
    background: none;
    border: none;
    cursor: pointer;
`;