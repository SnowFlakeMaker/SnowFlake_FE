import React, { useState } from "react";
import styled from "styled-components";

export default function ClassRegister(){
    const [totalCredit, setTotalCredit] = useState(0); //현재 신청한 학점 

    //교필 수강신청 여부 
    const [digital, setDigital] = useState(false); //디사의
    const [branding, setBranding] = useState(false); //미래설계
    const [english, setEnglish] = useState(false); //영교필
    const [software, setSoftware] = useState(false); //논사소

    //교필 이수 여부 (백엔드에서 받을 것임)
    const [isAlreadyDigital, setIsAlredayDigital] = useState(false);
    const [isAlreadyBranding, setIsAlredayBranding] = useState(false);
    const [isAlreadyEnglish, setIsAlredayEnglish] = useState(false);
    const [isAlreadySoftware, setIsAlredaySoftware] = useState(false);

    // 교션 영역 과목 신청 개수
    const [field1, setField1] = useState(0);
    const [field2, setField2] = useState(0);
    const [field3, setField3] = useState(0);
    const [field4, setField4] = useState(0);

    //전공 영역 신청 개수 
    const [majors, setMajors] = useState(0); //본전
    const [subMajors, setSubmajors] = useState(0); //복,부전
    const [myMajor, setMyMajor] = useState("복수전공"); //백엔드에서 받을 심전,복전,부전

    return(
        <Container>
            <TitleContainer>
                <Title>1학년 1학기 수강신청</Title>
            </TitleContainer>

            <ClassRegisterContainer>
                <RegisterContainer>
                    <ProfileContainer>
                        <InfoWhite>
                            현재 단과대 : 공과대학 <br/>
                            심화전공 / 복수전공 / 부전공 여부 : 미정 <br/>
                            현재까지 이수한 학점 : 0학점
                        </InfoWhite>
                    </ProfileContainer>

                    <Register>
                        <InfoYellow>최대 학점은 18학점으로 한 과목 당 3학점입니다.</InfoYellow> 
                        <InfoWhite>현재 신청한 학점 : {totalCredit}학점</InfoWhite>

                        <RegisterCoures>
                            <CourseTitle>
                                <SnowIcon 
                                    style={ {width : "1.5vw", height : "1.5vw"}}
                                    src="/image/icons/blue-snow-icon.png" />
                                <InfoWhite>교양필수</InfoWhite> 
                            </CourseTitle>
                            
                            <Courses>
                                <InfoWhite>▶ 디지털 시대의 사고와 의사소통 : {isAlreadyDigital ? "이수 완료" : (digital ? "신청" : "-")}</InfoWhite> 
                                <InfoWhite>▶ 미래 설계와 나의 브랜딩 : {isAlreadyBranding ? "이수 완료" : (branding ? "신청" : "-")}</InfoWhite>
                                <InfoWhite>▶ 영어 교양 필수 : {isAlreadyEnglish ? "이수 완료" : (english ? "신청" : "-")} </InfoWhite>
                                <InfoWhite>▶ 논리적 사고와 소프트웨어 : {isAlreadySoftware ? "이수 완료" : (software ? "신청" : "-")}</InfoWhite>
                            </Courses>
                            
                        </RegisterCoures>

                        <RegisterCoures>
                            <CourseTitle>
                                <SnowIcon 
                                    style={ {width : "1.5vw", height : "1.5vw"}}
                                    src="/image/icons/blue-snow-icon.png" />
                                <InfoWhite>교양선택</InfoWhite> 
                            </CourseTitle>
                            
                            <Courses>
                                <InfoWhite>▶ 교선핵심 1영역 : {field1}개 </InfoWhite> 
                                <InfoWhite>▶ 교선핵심 2영역 : {field2}개 </InfoWhite>
                                <InfoWhite>▶ 교선핵심 3영역 : {field3}개 </InfoWhite>
                                <InfoWhite>▶ 교선핵심 4영역 : {field4}개 </InfoWhite>
                            </Courses>
                            
                        </RegisterCoures>

                        <RegisterCoures>
                            <CourseTitle>
                                <SnowIcon 
                                style={ {width : "1.5vw", height : "1.5vw"}}
                                src="/image/icons/blue-snow-icon.png" />
                                <InfoWhite>전공 </InfoWhite> 
                            </CourseTitle>
                            
                            <Courses>
                                <InfoWhite>▶ 신청된 전공과목 개수 : {majors}개 </InfoWhite> 
                                {["복수전공", "부전공"].includes(myMajor) && (
                                    <InfoWhite>▶ 신청된 {myMajor} 과목 개수 : {subMajors}개</InfoWhite>
                                )}
                            </Courses>
                            
                        </RegisterCoures>
                        
                        
                    </Register>

                </RegisterContainer>

                <ClassContainer>
                    <GeneralClass>
                        <CourseBlueTitle>
                            <SnowIcon 
                                style={ {width : "2vw", height : "2vw"}}
                                src="/image/icons/blue-snow-icon.png" />
                            <InfoBlue>교양 필수</InfoBlue>
                        </CourseBlueTitle>

                        <CourseLists>
                            <CourseList>
                                <InfoDarkBlue>디지털 시대의 사고와 의사소통</InfoDarkBlue>
                                <ButtonContainer>
                                    {isAlreadyDigital ? (
                                        <RegisterButton style={{ backgroundColor: "#D9D9D9" }} disabled>
                                            신청하기
                                        </RegisterButton>
                                    ) : (
                                        digital ? (
                                            <CancelButton onClick={() => setDigital(prev => !prev)}>
                                                취소하기
                                            </CancelButton>
                                        ) : (
                                            <RegisterButton onClick={() => setDigital(prev => !prev)}>
                                                신청하기
                                            </RegisterButton>
                                        )
                                    )}
                                </ButtonContainer>
                            </CourseList>

                            <CourseList>
                                <InfoDarkBlue>미래 설계와 나의 브랜딩</InfoDarkBlue>
                                <ButtonContainer>
                                    {isAlreadyBranding ? (
                                        <RegisterButton style={{ backgroundColor: "#D9D9D9" }} disabled>
                                            신청하기
                                        </RegisterButton>
                                    ) : (
                                        branding ? (
                                            <CancelButton onClick={() => setBranding(prev => !prev)}>
                                                취소하기
                                            </CancelButton>
                                        ) : (
                                            <RegisterButton onClick={() => setBranding(prev => !prev)}>
                                                신청하기
                                            </RegisterButton>
                                        )
                                    )}
                                </ButtonContainer>
                            </CourseList>

                            <CourseList>
                                <InfoDarkBlue>영어 교양 필수</InfoDarkBlue>
                                <ButtonContainer>
                                    {isAlreadyEnglish ? (
                                        <RegisterButton style={{ backgroundColor: "#D9D9D9" }} disabled>
                                            신청하기
                                        </RegisterButton>
                                    ) : (
                                        english ? (
                                            <CancelButton onClick={() => setEnglish(prev => !prev)}>
                                                취소하기
                                            </CancelButton>
                                        ) : (
                                            <RegisterButton onClick={() => setEnglish(prev => !prev)}>
                                                신청하기
                                            </RegisterButton>
                                        )
                                    )}
                                </ButtonContainer>
                            </CourseList>

                            <CourseList>
                                <InfoDarkBlue>논리적 사고와 소프트웨어</InfoDarkBlue>
                                <ButtonContainer>
                                    {isAlreadySoftware ? (
                                        <RegisterButton style={{ backgroundColor: "#D9D9D9" }} disabled>
                                            신청하기
                                        </RegisterButton>
                                    ) : (
                                        software ? (
                                            <CancelButton onClick={() => setSoftware(prev => !prev)}>
                                                취소하기
                                            </CancelButton>
                                        ) : (
                                            <RegisterButton onClick={() => setSoftware(prev => !prev)}>
                                                신청하기
                                            </RegisterButton>
                                        )
                                    )}
                                </ButtonContainer>
                            </CourseList>
                        </CourseLists>
                    </GeneralClass>

                    <GeneralClass>
                        <CourseBlueTitle>
                            <SnowIcon 
                                style={ {width : "2vw", height : "2vw"}}
                                src="/image/icons/blue-snow-icon.png" />
                            <InfoBlue>교양 선택</InfoBlue>
                        </CourseBlueTitle>
                        
                        <CourseLists>
                            <CourseList>
                                <InfoDarkBlue>교선핵심 1영역</InfoDarkBlue>
                                <ButtonContainer>
                                    <RegisterButton onClick={() => {
                                        if (totalCredit >= 18) return;
                                        setTotalCredit(prev =>  prev + 3)
                                        setField1(prev => prev + 1)}}>신청하기</RegisterButton>
                                    <CancelButton  onClick={() => {
                                        setTotalCredit(prev => Math.max(0, prev - 3))
                                        setField1(prev => Math.max(0, prev - 1))}}>취소하기</CancelButton>
                                </ButtonContainer>
                            </CourseList>

                            <CourseList>
                                <InfoDarkBlue>교선핵심 2영역</InfoDarkBlue>
                                <ButtonContainer>
                                    <RegisterButton onClick={() => {
                                        if (totalCredit >= 18) return;
                                        setTotalCredit(prev =>  prev + 3)
                                        setField2(prev => prev + 1)}}>신청하기</RegisterButton>
                                    <CancelButton  onClick={() => {
                                        setTotalCredit(prev => Math.max(0, prev - 3))
                                        setField2(prev => Math.max(0, prev - 1))}}>취소하기</CancelButton>
                                </ButtonContainer>
                            </CourseList>

                            <CourseList>
                                <InfoDarkBlue>교선핵심 3영역</InfoDarkBlue>
                                <ButtonContainer>
                                    <RegisterButton onClick={() => {
                                        if (totalCredit >= 18) return;
                                        setTotalCredit(prev =>  prev + 3)
                                        setField3(prev => prev + 1)}}>신청하기</RegisterButton>
                                    <CancelButton  onClick={() => {
                                        setTotalCredit(prev => Math.max(0, prev - 3))
                                        setField3(prev => Math.max(0, prev - 1))}}>취소하기</CancelButton>
                                </ButtonContainer>
                            </CourseList>

                            <CourseList>
                                <InfoDarkBlue>교선핵심 4영역</InfoDarkBlue>
                                <ButtonContainer>
                                    <RegisterButton onClick={() => {
                                        if (totalCredit >= 18) return;
                                        setTotalCredit(prev =>  prev + 3)
                                        setField4(prev => prev + 1)}}>신청하기</RegisterButton>
                                    <CancelButton  onClick={() => {
                                        setTotalCredit(prev => Math.max(0, prev - 3))
                                        setField4(prev => Math.max(0, prev - 1))}}>취소하기</CancelButton>
                                </ButtonContainer>
                            </CourseList>
                        </CourseLists>
                    </GeneralClass>

                    {myMajor === "심화전공" &&
                        <MajorClass>
                            <CourseBlueTitle>
                                <SnowIcon 
                                    style={ {width : "2vw", height : "2vw"}}
                                    src="/image/icons/blue-snow-icon.png" />
                                <InfoBlue>전공</InfoBlue>
                            </CourseBlueTitle>

                            <MajorButtonContainer>
                                <RegisterButton  onClick={() => {
                                    if (totalCredit >= 18) return;
                                    setTotalCredit(prev =>  prev + 3)
                                    setMajors(prev => prev + 1)}}>신청하기</RegisterButton>
                                <CancelButton  onClick={() => {
                                    setTotalCredit(prev => Math.max(0, prev - 3))
                                    setMajors(prev => Math.max(0, prev - 1))}}>취소하기</CancelButton>
                            </MajorButtonContainer>
                        </MajorClass>
                    }

                    { (myMajor === "복수전공" || myMajor === "부전공") && 
                        <SubMajorContainer>
                            <SubMajorClass>
                                <CourseBlueTitle>
                                    <SnowIcon 
                                        style={ {width : "2vw", height : "2vw"}}
                                        src="/image/icons/blue-snow-icon.png" />
                                    <InfoBlue>전공</InfoBlue>
                                </CourseBlueTitle>

                                <MajorButtonContainer>
                                    <RegisterButton  onClick={() => {
                                        if (totalCredit >= 18) return;
                                        setTotalCredit(prev =>  prev + 3)
                                        setMajors(prev => prev + 1)}}>신청하기</RegisterButton>
                                    <CancelButton  onClick={() => {
                                        setTotalCredit(prev => Math.max(0, prev - 3))
                                        setMajors(prev => Math.max(0, prev - 1))}}>취소하기</CancelButton>
                                </MajorButtonContainer>
                            </SubMajorClass>

                            <SubMajorClass>
                            <CourseBlueTitle>
                                <SnowIcon 
                                    style={ {width : "2vw", height : "2vw"}}
                                    src="/image/icons/blue-snow-icon.png" />
                                <InfoBlue>{myMajor}</InfoBlue>
                            </CourseBlueTitle>

                            <MajorButtonContainer>
                                <RegisterButton  onClick={() => {
                                    if (totalCredit >= 18) return;
                                    setTotalCredit(prev =>  prev + 3)
                                    setSubmajors(prev => prev + 1)}}>신청하기</RegisterButton>
                                <CancelButton  onClick={() => {
                                    setTotalCredit(prev => Math.max(0, prev - 3))
                                    setSubmajors(prev => Math.max(0, prev - 1))}}>취소하기</CancelButton>
                            </MajorButtonContainer>
                            </SubMajorClass>
                        </SubMajorContainer>
                    }
                    
                    
                    <ApplyButton>신청하기</ApplyButton>
                </ClassContainer>
            </ClassRegisterContainer>
        </Container>
    );
}

const Container = styled.div`
    z-index : 10;
    position : fixed;
    display : flex;
    flex-direction : column; 
    align-items: center;
    left: 50%;
    bottom: 90vh; 
    transform: translate(-50%, 100%);
    justify-content: center;
`;

const TitleContainer = styled.div`
    width : 18vw;
    height : 6vh;
    border : 0.2vw solid  ${({ theme }) => theme.colors.mainblue100};
    background-color :  ${({ theme }) => theme.colors.mainblue400};
    border-radius : 20px;
    text-align : center;
    justify-content : center;
    align-items : center;
    display: flex;
    margin-bottom : 2vw;
`;

const Title = styled.span`
    text-align : center;
    font-size :  ${({ theme }) => theme.typography.title24.fontSize};
    color : ${({ theme }) => theme.colors.mainblue100};
`;

const ClassRegisterContainer = styled.div`
    display : flex;
    flex-direction : row;
    width : 85vw;
    height : 75vh;
    gap : 1vw;
`;

const RegisterContainer = styled.div`
    width : 60%;
    height : 100%;
    background-color :  ${({ theme }) => theme.colors.mainblue400};
    border : 0.2vw solid  ${({ theme }) => theme.colors.mainblue100};
`;

const ClassContainer = styled.div`
    width : 40%;
    height : 100%;
    display : flex;
    flex-direction : column;
    gap : 1vh;
    align-items : center;
`;

const GeneralClass = styled.div`
    width : 100%;
    height : 33%;
    background-color :  ${({ theme }) => theme.colors.mainblue100};
    border : 0.2vw solid  ${({ theme }) => theme.colors.mainblue400};
`;

const MajorClass = styled.div`
    width : 100%;
    height : 20%;
    background-color :  ${({ theme }) => theme.colors.mainblue100};
    border : 0.2vw solid  ${({ theme }) => theme.colors.mainblue400};
`;

const SubMajorContainer = styled.div`
    width : 100%;
    height : 18%;
    display : flex;
    flex-direction : row;
    gap : 1vw;
`;

const SubMajorClass = styled.div`
    width : 50%;
    height : 100%;
    background-color :  ${({ theme }) => theme.colors.mainblue100};
    border : 0.2vw solid  ${({ theme }) => theme.colors.mainblue400};
`;

const ApplyButton = styled.button`
    width : 15vw;
    height : 8%;
    border : none;
    border-radius : 40px;
    background-color : ${({ theme }) => theme.colors.mainblue400};
    color : white;
    font-size :  ${({ theme }) => theme.typography.title24.fontSize};
    margin-top : 1vh;
`;

const ProfileContainer = styled.div`
    margin-left : 2vw;
    margin-top  : 3vh;
    line-height : 1.5;
    margin-bottom : 3.5vh;
`;

const Register = styled.div`
    margin-left : 2vw;
    display : flex;
    flex-direction : column;
    gap : 2vh;
`;

const RegisterCoures = styled.div`
    margin-left : 4vw;
    display : flex;
    flex-direction : column;
`;

const SnowIcon = styled.img`
    padding-right : 0.5vw;
`;

const CourseTitle = styled.div`
    display : flex;
    flex-direction : row;
    align-items : center;
    margin-top : 0.5vh;
    margin-left : 1vw;
`;

const CourseBlueTitle = styled.div`
    display : flex;
    flex-direction : row;
    align-items : center;
    margin-top : 1vh;
    margin-left : 1vw;
`;

const Courses = styled.div`
    display : flex;
    flex-direction : column;
    margin-left : 4vw;
    gap : 0.5vw;
`;

const CourseLists = styled.div`
    margin-top : 2vh;
    margin-left : 4vw;
    display : flex;
    flex-direction : column;
    gap : 1vh;
`;

const CourseList = styled.div`
    display : flex;
    flex-direction : row;
    align-items : center;
    margin-right : 2vw;
`;

const InfoWhite = styled.span`
    font-size :  ${({ theme }) => theme.typography.subtitle20.fontSize};
    color : ${({ theme }) => theme.colors.mainblue100};
`;

const InfoYellow = styled.span`
    font-size :  ${({ theme }) => theme.typography.subtitle15.fontSize};
    color : ${({ theme }) => theme.colors.yellow};
`;

const InfoBlue = styled.span`
    font-size :  ${({ theme }) => theme.typography.title24.fontSize};
    color : ${({ theme }) => theme.colors.mainblue200};
`;

const InfoDarkBlue = styled.span`
    font-size :  ${({ theme }) => theme.typography.subtitle20.fontSize};
    color : ${({ theme }) => theme.colors.mainblue400};
    white-space: nowrap; 
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end; /* 버튼을 오른쪽으로 정렬 */
    gap: 0.3vw; 
    width: 100%;
`;

const MajorButtonContainer = styled.div`
    display: flex;
    flex-direction : row;
    gap : 1vw;
    align-items: center;
    justify-content : center;
    margin-top : 2vh;
`;


const RegisterButton = styled.button`
    width : 6vw;
    height : 3.5vh;
    border : none;
    border-radius : 20px;
    background-color : ${({ theme }) => theme.colors.mainblue600};
    color : white;
    font-size :  ${({ theme }) => theme.typography.subtitle15.fontSize};
`;

const CancelButton = styled.button`
    width : 6vw;
    height : 3.5vh;
    border : none;
    border-radius : 20px;
    background-color : ${({ theme }) => theme.colors.mainblue300};
    color : white;
    font-size :  ${({ theme }) => theme.typography.subtitle15.fontSize};
`;
