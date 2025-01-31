import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import styled from "styled-components";

export default function Start(){
    const navigate = useNavigate();
    const [stage, setStage] = useState(0);

    const GoSignIn =()=>{
        navigate("/signin");
    }

    const GoLogIn =()=>{
        navigate("/login");
    }

    const renderButton =()=>{
        switch(stage){
            case 0:
                return(
                    <span onClick={() => setStage(stage + 1)}>시작하기</span>
                );
            case 1:
                return(
                    <div>
                        <span onClick={GoSignIn}>회원가입</span>
                        <span onClick={GoLogIn}>로그인</span>
                    </div>
                )
        }
    }
    return(
        <ButtonContainer>
            {renderButton()}
        </ButtonContainer>
    );
}

const ButtonContainer = styled.div`
`;