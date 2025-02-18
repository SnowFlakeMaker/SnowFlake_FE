import React from "react";
import styled from "styled-components";

export default function Profile(){
    return(
        <Container>
            <ProfileContainer>
                <NameContainer>
                    <SnowIcon src = "/image/icons/snow-icon.png" />
                    <NameText>김눈꽃송이</NameText>
                    <SnowIcon src = "/image/icons/snow-icon.png" />
                </NameContainer>
                <SemText>공과대학 5학기</SemText>
                
            </ProfileContainer>

            <DateContainer>
                <DateText>3월 24일</DateText>
            </DateContainer>
        </Container>
    );
}

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width : 283px;
    height : 179px;
    margin : 15px;
    border : none;
    z-index : 5;
    display : flex;
    flex-direction : column;
    gap : 10px;
`;

const ProfileContainer = styled.div`
    width : 283px;
    height : 109px;
    background-color :  ${({ theme }) => theme.colors.mainblue400};
    border : 4px solid  ${({ theme }) => theme.colors.mainblue100};
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
`;

const NameContainer = styled.div`
    flex-direction : row;
    justify-content : center;
    align-items : center;
    display: flex;
    gap : 10px;
    margin-bottom : 10px;
`;

const SnowIcon = styled.img``;

const NameText = styled.span`
    color :  ${({ theme }) => theme.colors.mainblue100};
    font-size :  ${({ theme }) => theme.typography.title24.fontSize};
    padding : 0 20px;
`;

const SemText = styled.span`
    display : flex;
    color :  ${({ theme }) => theme.colors.mainblue100};
    font-size :  ${({ theme }) => theme.typography.subtitle20.fontSize};\
    justify-content : center;
    align-items : center;
`;

const DateContainer = styled.div`
    width : 283px;
    height : 51px;
    background-color :  ${({ theme }) => theme.colors.mainblue100};
    border : 4px solid  ${({ theme }) => theme.colors.mainblue400};
    display : flex;
    border-radius : 40px;
    justify-content : center;
    align-items : center;
    padding-top: 5px;
`;

const DateText = styled.span`
    color :  ${({ theme }) => theme.colors.mainblue400};
    font-size :  ${({ theme }) => theme.typography.title24.fontSize};
`;