import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PlanObject from "./PlanObject";

export default function PlanList(){
    const defaultPlans = {
        "수업": {
            icon: "/image/icons/planlist/class.png",
            plus: ["지력", "근성", "스트레스"],
            minus: ["체력"]
        },
        "공부": {
            icon: "/image/icons/planlist/study.png",
            plus: ["지력", "근성", "스트레스"],
            minus: ["체력"]
        },
        "외국어": {
            icon: "/image/icons/planlist/eng.png",
            plus: ["외국어", "지력", "근성", "스트레스"],
            minus: ["체력"]
        },
        "아르바이트": {
            icon: "/image/icons/planlist/work.png",
            plus: ["스트레스", "사회성", "코인", "근성"],
            minus: ["-"]
        },
        "동아리": {
            icon: "/image/icons/planlist/club.png",
            plus: ["리더십", "사회성", "스트레스"],
            minus: ["체력"]
        },
        "휴식" : {
            icon: "/image/icons/planlist/rest.png",
            plus: ["리더십", "사회성", "스트레스"],
            minus: ["체력"]
        },
        "취미" : {
            icon: "/image/icons/planlist/hobby.png",
            plus: ["-"],
            minus: ["스트레스", "근성", "사회성", "지력"]
        },
        "운동" : {
            icon: "/image/icons/planlist/exercise.png",
            plus: ["체력", "근성"],
            minus: ["스트레스"]
        },
        "약속" : {
            icon: "/image/icons/planlist/promise.png",
            plus: ["사회성"],
            minus: ["체력", "스트레스", "코인"]
        },
        "봉사" : {
            icon: "/image/icons/planlist/volunteer.png",
            plus: ["사회성", "근성"],
            minus: ["체력"]
        },
        "여행" : {
            icon: "/image/icons/planlist/travel.png",
            plus: ["-"],
            minus: ["체력", "스트레스", "코인", "지력"]
        },
        "전공학회" : {
            icon: "/image/icons/planlist/majorStudy.png",
            plus: ["지력", "리더십", "사회성", "스트레스"],
            minus: ["체력"]
        },
        "자소서 작성" : {
            icon: "/image/icons/planlist/writePR.png",
            plus: ["스트레스", "근성"],
            minus: ["체력"]
        },
    };

    const [selectedDate, setSelectedDate] = useState(0);
    const [calendarPlans, setCalendarPlans] = useState(Array(31).fill(null)); //캘린더에 들어가는 이미지 
    const [montlyPlans, setMonthlyPlans] = useState(Array(31).fill(null)); //한달 텍스트 계획(백엔드 전송용)

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
    
        if (selectedDate < 30) {
            setSelectedDate(selectedDate + 1);
        } else {
            setSelectedDate(null);
        }
    };

    // useEffect(() => {
    //     console.log("업데이트된 montlyPlans:", montlyPlans);
    // }, [montlyPlans])

    return(

        <Container>
            <CalenderContainer>
                <MonthlyContainer>
                    <SnowIcon  src="/image/icons/snow-icon.png" />
                    <MonthText>3월</MonthText>
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
                <TitleContainer>
                    <Text>오늘은 무얼할까?</Text>
                </TitleContainer>
                
                <PlanContainer>
                    {Object.entries(defaultPlans).map(([title, data]) => (
                        <PlanObject 
                            key={title} 
                            title={title} 
                            icon={data.icon} 
                            plus={data.plus} 
                            minus={data.minus} 
                            onClick={() => handlePlanClick(title)}
                        />
                    ))}
                </PlanContainer>

            </PlannerContainer>
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
    position: relative;
    right: 0;
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

const TitleContainer = styled.div`
    background-color :  ${({ theme }) => theme.colors.mainblue100};
    border : 0.2vw solid  ${({ theme }) => theme.colors.mainblue400};
    border-radius : 2vw;
    justify-content : center;
    align-items : center;
    width: 15vw;
    height: 5vh;
    display : flex;
    margin-bottom: 0.8vw;
`;

const Text = styled.span`
    font-size :  ${({ theme }) => theme.typography.title24.fontSize};
    color : ${({ theme }) => theme.colors.mainblue400};
    text-align: center;
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