import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PlanObject from "./PlanObject";
import ProgressingList from "./ProgressingList";
import { apiClient } from "../../apiClient";
import { useDate } from "./DateContext";
import { useNavigate } from "react-router-dom";

export default function PlanList(){
    const defaultPlans = {
        "수업": {
            icon: "/image/icons/planlist/class.png",
            img : "/image/cutscene/cutimg_class.PNG",
            plus: ["지력", "근성", "스트레스"],
            minus: ["체력"]
        },
        "공부": {
            icon: "/image/icons/planlist/study.png",
            img : "/image/cutscene/cutimg_study.PNG",
            plus: ["지력", "근성", "스트레스"],
            minus: ["체력"]
        },
        "외국어": {
            icon: "/image/icons/planlist/eng.png",
            img : "/image/cutscene/cutimg_english.PNG",
            plus: ["외국어", "지력", "근성", "스트레스"],
            minus: ["체력"]
        },
        "아르바이트": {
            icon: "/image/icons/planlist/work.png",
            img : "/image/cutscene/cutimg_parttimejob.PNG",
            plus: ["스트레스", "사회성", "코인", "근성"],
            minus: ["-"]
        },
        "동아리": {
            icon: "/image/icons/planlist/club.png",
            img : "/image/cutscene/cutimg_club.PNG",
            plus: ["리더십", "사회성", "스트레스"],
            minus: ["체력"]
        },
        "휴식" : {
            icon: "/image/icons/planlist/rest.png",
            img : "/image/cutscene/cutimg_rest.PNG",
            plus: ["리더십", "사회성", "스트레스"],
            minus: ["체력"]
        },
        "취미" : {
            icon: "/image/icons/planlist/hobby.png",
            img : "/image/cutscene/cutimg_hobby.PNG",
            plus: ["-"],
            minus: ["스트레스", "근성", "사회성", "지력"]
        },
        "운동" : {
            icon: "/image/icons/planlist/exercise.png",
            img : "/image/cutscene/cutimg_exercise.PNG",
            plus: ["체력", "근성"],
            minus: ["스트레스"]
        },
        "약속" : {
            icon: "/image/icons/planlist/promise.png",
            img : "/image/cutscene/cutimg_appointment.PNG",
            plus: ["사회성"],
            minus: ["체력", "스트레스", "코인"]
        },
        "봉사" : {
            icon: "/image/icons/planlist/volunteer.png",
            img : "/image/cutscene/cutimg_volunteer.PNG",
            plus: ["사회성", "근성"],
            minus: ["체력"]
        },
        "여행" : {
            icon: "/image/icons/planlist/travel.png",
            img : "/image/cutscene/cutimg_travel.PNG",
            plus: ["-"],
            minus: ["체력", "스트레스", "코인", "지력"]
        },
        "전공학회" : {
            icon: "/image/icons/planlist/majorStudy.png",
            img : "/image/cutscene/cutimg_majorsociety.PNG",
            plus: ["지력", "리더십", "사회성", "스트레스"],
            minus: ["체력"]
        },
        "자소서 작성" : {
            icon: "/image/icons/planlist/writePR.png",
            img : "/image/cutscene/cutimg_selfintroduction.PNG",
            plus: ["스트레스", "근성"],
            minus: ["체력"]
        },
    };

    const navigate = useNavigate();
    const [isVacation, setIsVacation] = useState(undefined);
    const [selectedDate, setSelectedDate] = useState(0);
    const [calendarPlans, setCalendarPlans] = useState([]); //캘린더에 들어가는 이미지 
    const [fetchedTodo, setFetchedTodo] = useState(["공부", "여행", "휴식", "아르바이트", "외국어", "약속", "봉사", "수업", "운동", "취미"]); //이번달 할일  + 백엔드에서 받아서 뒤에 더 추가
    const [monthlyPlans, setMonthlyPlans] = useState([]); //한달 텍스트 계획(백엔드 전송용)

    const [isSubmit, setIsSubmit] = useState(false); //계획리스트 제출 여부
    const { currentMonth } = useDate();
    const [executedPlans, setExecutedPlans] = useState([]); //백엔드 execute로 받은 실행결과 
    
    const [executeInternship, setExecuteInternsip] = useState(undefined);

    const isAllPlansFilled = monthlyPlans.every((plan) => plan !== null);

    const [plansFinished, setPlansFinished] = useState(false);

    // isVacation 상태가 변경될 때마다 배열 크기 업데이트
    useEffect(() => {
        const days = isVacation ? 14 : 31; // 방학이면 14일, 아니면 31일
        setCalendarPlans(Array(days).fill(null));
        setMonthlyPlans(Array(days).fill(null));
        setSelectedDate(0); // 선택된 날짜도 초기화
    }, [isVacation]);


    useEffect(() => {
        const getPlan = async()=>{
            try{
                const response = await apiClient.get('/plan/specialist');
                if(response.status===200){
                    console.log(response.data);
                    const newItems = response.data.data; 
                    setFetchedTodo((prev) => {
                        const existing = new Set(prev); // 기존 항목들
                        const filteredNewItems = newItems.filter(item => !existing.has(item));
                        return [...prev, ...filteredNewItems];
                      });
                }
            } catch(error) {
                console.log(error);
            }
        }

        const getSemester = async()=>{
            try{
                const response = await apiClient.get('/main/chapter');
                if(response.status===200){
                    console.log(response.data);
                    const data = response.data.data.current_chapter.chapter;
                    if (data.includes("1학기")) {
                        setIsVacation(false);
                    } else if (data.includes("2학기")) {
                        setIsVacation(false);
                    } else if (data.includes("여름방학")) {
                        setIsVacation(true);
                    } else if (data.includes("겨울방학")) {
                        setIsVacation(true);
                    }
                }
            } catch(error) {
                console.log(error);
            }
        }

        const getInternship = async()=>{
            try{
                const response = await apiClient.get('/event/internship/check');
                if(response.status === 200){
                    setExecuteInternsip(response.data.data);
                    console.log(response.data);
                }
            } catch(error){
                console.log(error);
            }
        }
        
        const fetchData = async () => {
            try {
                await getPlan();
                await getSemester();
                await getInternship();
            } catch (error) {
                console.error("데이터 가져오기 실패:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (executeInternship === true && isVacation === false) {
          const totalDays = 31;
          const internDays = 14;
          const internIcon = "/image/icons/planlist/work.png";
          const internTitle = "인턴";
      
          const newCalendarPlans = Array.from({ length: totalDays }, (_, i) =>
            i < internDays ? internIcon : null
          );
      
          const newMonthlyPlans = Array.from({ length: totalDays }, (_, i) =>
            i < internDays ? internTitle : null
          );
      
          setCalendarPlans(newCalendarPlans);
          setMonthlyPlans(newMonthlyPlans);
          setSelectedDate(internDays); // 14일 이후부터 선택 가능
        }
      }, [executeInternship, isVacation]);



    const postExecute = async()=>{
        try{
            const body = monthlyPlans.map((plan) => ({
                taskName: plan
            }));

            console.log(body);

            const response = await apiClient.post('/plan/execute', body);
            if(response.status === 200){
                console.log(response.data);
                setExecutedPlans(response.data.data);
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


    const filteredTodo = fetchedTodo
        .map(plan => ({
            title: plan, 
            ...defaultPlans[plan]
        }))
        .filter(plan => plan.icon !== undefined);


    const handlePlanClick = (title) => {
        setCalendarPlans((prevPlans) => {
            const newPlans = [...prevPlans];
            newPlans[selectedDate] = defaultPlans[title].icon;
            return newPlans;
        });
    
        setMonthlyPlans((prevTextPlans) => {
            const newTextPlans = [...prevTextPlans];
            newTextPlans[selectedDate] = title; // title을 저장
            return newTextPlans;
        });
    
        if (selectedDate < calendarPlans.length - 1) {
            setSelectedDate(selectedDate + 1);
        } else {
            setSelectedDate(null);
        }
    };

    return(
        <Container>
            {!isSubmit && (
                <>
                    <CalenderContainer>
                    <MonthlyContainer>
                        <SnowIcon  src="/image/icons/snow-icon.png" />
                        <MonthText>{currentMonth}</MonthText>
                    </MonthlyContainer>

                    <Calender>
                        <DaysContainer>
                            {[...Array(7)].map((_, i) => (
                                <DaysOfWeek key={i} />
                            ))}
                        </DaysContainer>
    
                        <DatesContainer>
                            {calendarPlans.map((plan, i) => (
                                <DateBox 
                                    key={i} 
                                    isSelected={i === selectedDate}
                                >
                                    {plan && <PlanIcon src={plan} />}
                                </DateBox>
                            ))}
                        </DatesContainer>
                    </Calender>

                </CalenderContainer>
                
                    <PlannerContainer>
                        <SubmitButton 
                            disabled={!isAllPlansFilled}
                            onClick={()=>{
                                if (!isAllPlansFilled) return;
                                setIsSubmit(true); 
                                postExecute();}}>
                                제출하기
                            </SubmitButton>

                        <PlanContainer>
                            {filteredTodo.map(({ icon }, index) => (
                                <PlanObject
                                    key={index}
                                    title={fetchedTodo[index]}
                                    icon={icon}
                                    plus={defaultPlans[fetchedTodo[index]]?.plus || []}
                                    minus={defaultPlans[fetchedTodo[index]]?.minus || []}
                                    onClick={() => handlePlanClick(fetchedTodo[index])}
                                />
                            ))}
                        </PlanContainer>
                    </PlannerContainer>
                </>
            )}

            {isSubmit && !plansFinished && 
                <ProgressingList
                    setPlansFinished={setPlansFinished}
                    plans={executedPlans.map((item) => {
                    const effectMap = {
                        GRIT: "근성",
                        STRENGTH: "체력",
                        INTELLIGENCE: "지력",
                        SOCIAL: "사회성",
                        STRESS: "스트레스",
                        LEADERSHIP: "리더십",
                        FOREIGNLANG: "외국어",
                        COIN : "코인"
                    };
              
                    const fallbackImageMap = {
                        "코인 부족": "", //이미지 추가 
                      };

                    const plus = Object.entries(item.effects)
                        .filter(([_, value]) => value > 0)
                        .map(([key]) => effectMap[key] || key);
                
                    const minus = Object.entries(item.effects)
                        .filter(([_, value]) => value < 0)
                        .map(([key]) => effectMap[key] || key);
                
                    return {
                        title: item.taskName,
                        img: defaultPlans[item.taskName]?.img ||
                            fallbackImageMap[item.taskName] || "",
                        plus,
                        minus,
                    };
                    })}
                />
            }

        </Container>
    );
}

const Container = styled.div`
    display : flex;
    flex-direction : column;
    right: 0; 
    bottom: 5vh;
    position : fixed;
    z-index : 6;
    align-items: flex-end; 
    margin-right: 0.8vw;
`;

const CalenderContainer = styled.div`
    width: 25w; 
    height: 32vh;
    background-color :  ${({ theme }) => theme.colors.mainblue400};
    border : 0.2vw solid  ${({ theme }) => theme.colors.mainblue100};
    right: 1vw;
    position: fixed; 
    top: 18vh;  
`;

const SnowIcon = styled.img`
`;

const MonthlyContainer = styled.div`
    display : flex;
    flex-direction : row;
    gap: 0.5vw;
    align-items : center;
    margin: 0.5vw; 
`;

const MonthText = styled.span`
    font-size :  ${({ theme }) => theme.typography.title24.fontSize};
    color : ${({ theme }) => theme.colors.mainblue100};
`;

const DaysContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.5vw;
    padding: 0 0.5vw;  
    align-items : center;
    justify-content : center;
    margin-bottom : 0;
`;


const DaysOfWeek = styled.div`
    width: 2vw; 
    height: 0.7vh;
    background-color :  ${({ theme }) => theme.colors.mainblue200};
`;

const Calender = styled.div`
`;

const DatesContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.5vw; 
    padding: 0.5vw; 
    justify-content : center;
    align-items: center;
`;

const DateBox = styled.div`
    width: 2vw; 
    height: 2vw; 
    background-color: ${({ isSelected, theme }) => isSelected ? theme.colors.yellow : "white"};
    display: flex;
    align-items: center;
    justify-content: center;
`;

const PlannerContainer = styled.div`
    width: 36vw; 
    height: 50vh;
    position: relative;
    margin-top: -5vh;
    z-index : 4;    
    right : 5vw;
`;

const SubmitButton = styled.button`
    background-color :  ${({ theme }) => theme.colors.mainblue400};
    border : none;
    border-radius : 2vw;
    justify-content : center;
    align-items : center;
    font-size :  ${({ theme }) => theme.typography.title24.fontSize};
    color : ${({ theme }) => theme.colors.mainblue100};
    width: 15vw;
    height: 5vh;
    display : flex;
    margin-bottom: 0.8vw;
    cursor: ${({ disabled }) => disabled ? "not-allowed" : "pointer"};
`;

const PlanContainer = styled.div`
    width: 40vw;
    height: 45vh;
    background-color :  ${({ theme }) => theme.colors.mainblue100};
    border : 0.2vw solid  ${({ theme }) => theme.colors.mainblue400};
    display : flex;
    flex-wrap: wrap;
    align-items : center;
    gap: 0.5vw;
    justify-content : center;
`;

const PlanIcon = styled.img`
    width: 1.7vw;
    height: 1.7vw;
`;