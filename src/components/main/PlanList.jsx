import React from "react";
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
                            <DaysOfWeek />
                        ))}
                    </DaysContainer>
 
                    <DatesContainer>
                        {[...Array(31)].map((_, i) => (
                            <DateBox />
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
    bottom: 0;
    position : fixed;
    z-index : 6;
    align-items: flex-end; 
    margin-right : 15px;
`;

const CalenderContainer = styled.div`
    width : 357px;
    height : 310px;
    background-color :  ${({ theme }) => theme.colors.mainblue400};
    border : 4px solid  ${({ theme }) => theme.colors.mainblue100};
    position: relative;
    right: 0;
`;

const SnowIcon = styled.img`
`;

const MonthlyContainer = styled.div`
    display : flex;
    flex-direction : row;
    gap : 10px;
    align-items : center;
    margin : 10px;
`;

const MonthText = styled.span`
    font-size :  ${({ theme }) => theme.typography.title24.fontSize};
    color : ${({ theme }) => theme.colors.mainblue100};
`;

const DaysContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap : 7px;
    padding: 10px;
    align-items : center;
    justify-content : center;
    padding: 0 10px;  
    margin-bottom : 0;
`;


const DaysOfWeek = styled.div`
    width : 40px;
    height : 8px;
    background-color :  ${({ theme }) => theme.colors.mainblue200};
`;

const Calender = styled.div`
`;

const DatesContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 7px;
    padding: 10px;
    justify-content : center;
    align-items: center;
`;

const DateBox = styled.div`
    width: 40px;
    height: 40px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const PlannerContainer = styled.div`
    width : 700px;
    height : 522px;
    position: relative;
    margin-top: -50px;
    z-index : 4;
    right : 0;
`;

const TitleContainer = styled.div`
    background-color :  ${({ theme }) => theme.colors.mainblue100};
    border : 4px solid  ${({ theme }) => theme.colors.mainblue400};
    border-radius : 40px;
    justify-content : center;
    align-items : center;
    width : 283px;
    height : 43px;
    display : flex;
    margin-bottom : 15px;

`;

const Text = styled.span`
    font-size :  ${({ theme }) => theme.typography.title24.fontSize};
    color : ${({ theme }) => theme.colors.mainblue400};
    text-align: center;
`;

const PlanContainer = styled.div`
    width : 700px;
    height : 430px;
    background-color :  ${({ theme }) => theme.colors.mainblue100};
    border : 4px solid  ${({ theme }) => theme.colors.mainblue400};
    display : flex;
    flex-wrap: wrap;
    align-items : center;
    gap : 10px;
    justify-content : center;
`;