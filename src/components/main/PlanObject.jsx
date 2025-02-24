import styled from "styled-components";
import React from "react";

export default function PlanObject({ title, icon, plus, minus }){

    return(
        <Container>
            <Icon src={icon}/>
            <Title>{title}</Title>
            <InfoIcon src="/image/icons/planlist/info.png" />
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
`;

const Icon = styled.img`
    width : 50px;
    height : 52px;
    object-fit : fit;
    margin-left: 3px;
`;

const Title = styled.span`
    width: 80px;
    font-size :  ${({ theme }) => theme.typography.subtitle20fontSize};
    color : ${({ theme }) => theme.colors.mainblue400};
`;

const InfoIcon = styled.img`
    width : 24px;
    height : 24px;
    object-fit : fit;
`;