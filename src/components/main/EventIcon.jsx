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
    width: 20vw;
    height: 6vh; 
    display : flex;
    flex-direction : row;
    gap: 0.5vw; 
    z-index : 5;
    position: absolute;
    top: 0;
    left: 19vw;    
    margin: 0.8vw;
`;

const Icon = styled.img`
    width : 3vw;
    height : 3vw;
    object-fit: contain; 
`;