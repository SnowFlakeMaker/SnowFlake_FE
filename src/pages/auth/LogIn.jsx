import React, { useState } from "react";
import styled from "styled-components";

export default function LogIn(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const postLogIn =()=>{
        console.log(email, password);
    }
    return(
        <div>
            <span>로그인</span><br/>
            <span>이메일</span>
            <input value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <span>비밀번호</span>
            <input value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <span onClick={postLogIn}>로그인하기</span>
        </div>
    );
}