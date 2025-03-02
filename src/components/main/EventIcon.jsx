import React from "react";
import styled from "styled-components";

export default function EventIcon(){
    return(
        <Container>
            <Icon src="image/icons/home.png" />
            <Icon src="image/icons/festival.png" />
            <Icon src="image/icons/school.png" />
            <Icon src="image/icons/drink.png" />
            <Icon src="image/icons/graduation.png" />
        </Container>
    );
}

const Container = styled.div`
    width : 380px;
    height : 60px;
    display : flex;
    flex-direction : row;
    gap : 10px;
    z-index : 5;
    position: absolute;
    top: 0;
    left : 300px;
    margin : 15px;
`;

const Icon = styled.img`
    width : 60px;
    height : 60px;
    object-fit: contain; 
`;