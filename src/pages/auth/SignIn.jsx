import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import Dropdown from "react-dropdown";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import "react-dropdown/style.css";

export default function SignIn(){
    const [stage, setStage] = useState(0);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [birthday, setBirthday] = useState(new Date());
    const [mbti, setMbti] = useState("");
    const [hobby, setHobby] = useState("");
    const [dream, setDream] = useState("");

    const mbtiOptions = [
        'ISTJ', 'ISFJ', 'INFJ', 'INTJ', 'ISTP', 'ISFP', 'INFP', 'INTP', 'ESTP', 'ESFP', 'ENFP', 'ENTP', 'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
    ];

    const defaultOption = mbtiOptions[0];

    const postSignIn =()=>{
        console.log(email, password, nickname, birthday, mbti, hobby, dream)
        navigate("/ot");
    }

    const handleStage =()=>{
        setStage(stage + 1);
    }

    const renderPage =()=>{
        switch(stage){
            case 0 :
                return(
                    <div>
                        <span>회원가입</span><br/>
                        <span>이메일</span>
                        <input value={email} onChange={(e) => setEmail(e.target.value)}></input>
                        <span>비밀번호</span>
                        <input value={password} onChange={(e) => setPassword(e.target.value)}></input>
                        <span onClick={() => handleStage()}>다음으로</span>
                    </div>
                );
            case 1 : 
                return(
                    <div>
                        <span>닉네임</span>
                        <input value={nickname} onChange={(e) => setNickname(e.target.value)}></input><br/>
                        <span>생일</span>
                        <DatePicker
                            dateFormat='yyyy.MM.dd' // 날짜 형태
                            shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                            selected={birthday} 
                            onChange={(birthday) => setBirthday(birthday)}
                            showTimeSelect={false} 
                        /> <br/>
                        <span>MBTI</span>
                        <Dropdown 
                            options={mbtiOptions} 
                            onChange={(e) => setMbti(e.value)} 
                            value={mbti} 
                            placeholder="mbti를 선택하세요" />
                        <span>취미</span>
                        <input value={hobby} onChange={(e) => setHobby(e.target.value)}></input><br/>
                        <span onClick={() => handleStage()}>다음으로</span>
                    </div>
                );
            case 2:
                return(
                    <div>
                        <span>어린 시절의 꿈이 무엇이였나요?</span>
                        <input value={dream} onChange={(e) => setDream(e.target.value)}></input><br/>
                        <span onClick={() => postSignIn()}>회원가입하기</span>
                    </div>
                )
        }

    }
    return(
        <div>
            {renderPage()}
            
        </div>
    );
}