import React from "react";
import styled from "styled-components";

export default function Status(){
    const strength= 60; //체력
    const intelli = 70; //지식
    const social = 80; //사회성
    const stress = 30; //스트레스
    const leadership = 90; //리더십
    const generalAssess = 60; //평가
    const langAssess = 30; //외국어

    return(
        <Container>
            {[  {title: "체력", value: strength},
                {title: "지식", value: intelli},
                {title: "근성", value: strength},
                {title: "사회성", value: social},
                {title: "스트레스", value: stress},
                {title: "리더십", value: leadership},
                {title: "외국어", value: langAssess},
                {title: "평가", value: generalAssess}
            ].map((item, index) => (
                <StatusContainer key={index}>
                    <Title>{item.title}</Title>
                    <Icon src="/image/icons/status-bar.png"/>
                    <Bar>
                        <StatusBarContainer>
                            <StatusBarFill percentage={item.value} />
                        </StatusBarContainer>
                    </Bar>
                </StatusContainer>
            ))}
        </Container>
    );
}

const Container = styled.div`
    width: 30vw;
    height: 45vh;
    z-index : 5;
    border : 0.2vw solid  ${({ theme }) => theme.colors.mainblue100};
    background-color :  ${({ theme }) => theme.colors.mainblue400};
    bottom : 0;
    left: 0;
    position: fixed;
    display : flex;
    flex-direction : column;
    margin : 1vw;
    gap : 1vw;
    padding : 3vh 1.5vw;
`;

const StatusContainer = styled.div`
    display : flex;
    flex-direction : row;
    gap :1.5vw; 
`;

const Title = styled.span`
    width : 5vw;
    color :  ${({ theme }) => theme.colors.mainblue100};
    font-size :  ${({ theme }) => theme.typography.subtitle20.fontSize};
    padding-left : 1vw;
`;

const Icon = styled.img`
    height :  4vh;
`;

const Bar = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.7vw; 
`;

const StatusBarContainer = styled.div`
  width: 20vw; /* 바 전체 길이 */
  height: 3vh;/* 바 높이 */
  background-color: white; /* 바의 배경색 */
  border: none;
  overflow: hidden; /* 진행 부분이 넘치지 않도록 처리 */
  position: relative;
`;

/** 바 진행 부분 **/
const StatusBarFill = styled.div`
  background-color: ${({ theme }) => theme.colors.mainblue200};
  width: ${({ percentage }) => (percentage > 100 ? 100 : percentage)}%;
  height: 100%;
  transition: width 0.3s ease; /* 값 변경 시 애니메이션 */
`;