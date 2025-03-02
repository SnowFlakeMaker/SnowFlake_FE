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
    width : 195px;
    height : 60px;
    background-color : white;
    border : 4px solid  ${({ theme }) => theme.colors.mainblue400};
    z-index : 7;
    display : flex;
    flex-direction : row;
    border-radius : 10px;
    gap : 10px;
    align-items : center;
    position: relative; 
    pointer-events: auto; 
`;

const Icon = styled.img`
    width : 50px;
    height : 52px;
    object-fit : fit;
    margin-left: 3px;
`;

const Title = styled.span`
    width: 80px;
    font-size :  ${({ theme }) => theme.typography.subtitle15.fontSize};
    color : ${({ theme }) => theme.colors.mainblue400};
`;

const InfoIconContainer = styled.div`
    position: relative; /* 툴팁 위치 조정 기준 */
    display: flex;
    align-items: center;
`;

const InfoIcon = styled.img`
    width : 24px;
    height : 24px;
    object-fit : fit;
`;

const PlusMinusInfoContainer = styled.div`
    position: absolute;
    top: -80px; 
    left: -250%;
    transform: translateX(-50%);
    width: 240px;
    height : 890px;
    padding: 8px;
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
    font-size :  ${({ theme }) => theme.typography.subtitle12.fontSize};
    color : white;
    display: block;
    margin-top: -55px;
    position: absolute;
    width: 100%;
    text-align: center;
`;
