import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Logout(){
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;
    const navigate = useNavigate();

    const getLogout = async() => {
        try {
            const response = await axios.post(`${SERVER_URL}/auth/logout`, {
               headers : {
                    withCredentials: true
               }
            });

            if (response.status === 200) {
                console.log("로그아웃 성공:", response.data);
                navigate("/");
            } 
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <Container>
            <AlarmContainer onClick={getLogout}>
                <AlarmTitle>로그아웃</AlarmTitle>
            </AlarmContainer>
        </Container>
    );
}


const Container = styled.div`
    width: 25vw;
    height: 20vh;
    background-color : ${({ theme }) => theme.colors.mainblue400};
    border : 4px solid ${({ theme }) => theme.colors.mainblue100};
    z-index : 10;
    right : 0;
    top: 12vh;   
    position : absolute;
    display : flex;
    flex-direction : column;
    align-items: center;
    gap: 1vw; 
    padding-top : 1vh;
`;


const AlarmContainer = styled.div`
    width: 22vw;
    height: 5vh;
    background-color : ${({ theme }) => theme.colors.mainblue100};
    border : none;
    border-radius : 20px;
    display : flex;
    flex-direction : row;
    align-items: center;
    padding: 0 1vw;
    cursor: pointer;
`;

const AlarmTitle = styled.span`
    font-size :  ${({ theme }) => theme.typography.subtitle20.fontSize};
    color : ${({ theme }) => theme.colors.mainblue400};
`;
