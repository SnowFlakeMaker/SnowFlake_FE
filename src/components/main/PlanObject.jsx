import styled from "styled-components";
import React from "react";
import { useState } from "react";

export default function PlanObject({ title, icon, plus, minus, onClick}){
    const [isHovered, setIsHovered] = useState(false);

    return(
        <Container onClick={onClick}>
            <Icon src={icon}/>
            <Title>{title}</Title>
            <InfoIconContainer
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <InfoIcon src="/image/icons/planlist/info.png" />
                {isHovered && (
                    <PlusMinusInfoContainer>
                        <TooltipImage src="/image/icons/planlist/plusminusinfo.png" />
                        <Info>
                            증가 : {plus.join(', ')} <br /> 감소 : {minus.join(', ')}
                        </Info>
                    </PlusMinusInfoContainer>
                )}
            </InfoIconContainer>
        </Container>
    );
}

const Container = styled.div`
    width: 12vw;
    height: 7vh;
    background-color : white;
    border : 0.3vw solid  ${({ theme }) => theme.colors.mainblue400};
    z-index : 7;
    display : flex;
    flex-direction : row;
    border-radius :  1vw;
    gap : 0.7vw;
    align-items : center;
    position: relative; 
    pointer-events: auto; 
`;

const Icon = styled.img`
    width: 3vw; 
    height: 5vh;
    object-fit : fit;
    margin-left: 0.5vw;
`;

const Title = styled.span`
    width: 4.5vw;
    font-size :  ${({ theme }) => theme.typography.subtitle15.fontSize};
    color : ${({ theme }) => theme.colors.mainblue400};
`;

const InfoIconContainer = styled.div`
    position: relative; /* 툴팁 위치 조정 기준 */
    display: flex;
    align-items: center;
`;

const InfoIcon = styled.img`
    width : 1.7vw; 
    height : 1.7vw; 
    object-fit : fit;
`;

const PlusMinusInfoContainer = styled.div`
    position: absolute;
    top: -10vh;
    left: -250%;
    transform: translateX(-50%);
    width: 17vw;
    height: 60vh;
    padding: 0.5vw;
    z-index: 50;
    white-space: nowrap;
    align-items: center;
    justify-content: center;
    text-align: center;
`

const TooltipImage = styled.img`
    width: 100%;
    height: auto;
    display: block;
`;

const Info = styled.span`
    font-size :  ${({ theme }) => theme.typography.subtitle15.fontSize};
    color : white;
    display: block;
    margin-top: -7.5vh;
    position: absolute;
    width: 100%;
    text-align: center;
`;
