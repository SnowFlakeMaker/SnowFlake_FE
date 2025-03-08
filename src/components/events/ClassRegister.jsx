import React from "react";
import styled from "styled-components";

export default function ClassRegister(){
    var totalCredit = 0; //현재 신청한 학점 

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
                        <InfoYellow>최대 학점은 18학점으로 교양선택은 한 영역당 2개만 들을 수 있습니다. 한 과목 당 3학점입니다.</InfoYellow> 
                        <InfoWhite>현재 신청한 학점 : {totalCredit}</InfoWhite>

                        <RegisterCoures>
                            <CourseTitle>
                                <SnowIcon 
                                    style={ {width : "1.5vw", height : "1.5vw"}}
                                    src="/image/icons/blue-snow-icon.png" />
                                <InfoWhite>교양필수</InfoWhite> 
                            </CourseTitle>
                            
                            <Courses>
                                <InfoWhite>▶ 디지털 시대의 사고와 의사소통 : </InfoWhite> 
                                <InfoWhite>▶ 미래 설계와 나의 브랜딩 : </InfoWhite>
                                <InfoWhite>▶ 영어 교양 필수 : </InfoWhite>
                                <InfoWhite>▶ 논리적 사고와 소프트웨어</InfoWhite>
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
                                <InfoWhite>▶ 교선핵심 1영역 : </InfoWhite> 
                                <InfoWhite>▶ 교선핵심 2영역 : </InfoWhite>
                                <InfoWhite>▶ 교선핵심 3영역 : </InfoWhite>
                                <InfoWhite>▶ 교선핵심 4영역 : </InfoWhite>
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
                                <InfoWhite>▶ 신청된 전공과목 개수 : </InfoWhite> 
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
                                    <RegisterButton>신청하기</RegisterButton>
                                    <CancelButton>취소하기</CancelButton>
                                </ButtonContainer>
                            </CourseList>

                            <CourseList>
                                <InfoDarkBlue>미래 설계와 나의 브랜딩</InfoDarkBlue>
                                <ButtonContainer>
                                    <RegisterButton>신청하기</RegisterButton>
                                    <CancelButton>취소하기</CancelButton>
                                </ButtonContainer>
                            </CourseList>

                            <CourseList>
                                <InfoDarkBlue>영어 교양 필수</InfoDarkBlue>
                                <ButtonContainer>
                                    <RegisterButton>신청하기</RegisterButton>
                                    <CancelButton>취소하기</CancelButton>
                                </ButtonContainer>
                            </CourseList>

                            <CourseList>
                                <InfoDarkBlue>논리적 사고와 소프트웨어</InfoDarkBlue>
                                <ButtonContainer>
                                    <RegisterButton>신청하기</RegisterButton>
                                    <CancelButton>취소하기</CancelButton>
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
                                    <RegisterButton>신청하기</RegisterButton>
                                    <CancelButton>취소하기</CancelButton>
                                </ButtonContainer>
                            </CourseList>

                            <CourseList>
                                <InfoDarkBlue>교선핵심 2영역</InfoDarkBlue>
                                <ButtonContainer>
                                    <RegisterButton>신청하기</RegisterButton>
                                    <CancelButton>취소하기</CancelButton>
                                </ButtonContainer>
                            </CourseList>

                            <CourseList>
                                <InfoDarkBlue>교선핵심 3영역</InfoDarkBlue>
                                <ButtonContainer>
                                    <RegisterButton>신청하기</RegisterButton>
                                    <CancelButton>취소하기</CancelButton>
                                </ButtonContainer>
                            </CourseList>

                            <CourseList>
                                <InfoDarkBlue>교선핵심 4영역</InfoDarkBlue>
                                <ButtonContainer>
                                    <RegisterButton>신청하기</RegisterButton>
                                    <CancelButton>취소하기</CancelButton>
                                </ButtonContainer>
                            </CourseList>
                        </CourseLists>
                    </GeneralClass>

                    <MajorClass>
                        <CourseBlueTitle>
                            <SnowIcon 
                                style={ {width : "2vw", height : "2vw"}}
                                src="/image/icons/blue-snow-icon.png" />
                            <InfoBlue>전공</InfoBlue>
                        </CourseBlueTitle>

                        <MajorButtonContainer>
                            <RegisterButton>신청하기</RegisterButton>
                            <CancelButton>취소하기</CancelButton>
                        </MajorButtonContainer>
                    </MajorClass>

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
    height : 70vh;
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
`;

const GeneralClass = styled.div`
    width : 100%;
    height : 40%;
    background-color :  ${({ theme }) => theme.colors.mainblue100};
    border : 0.2vw solid  ${({ theme }) => theme.colors.mainblue400};
`;

const MajorClass = styled.div`
    width : 100%;
    height : 20%;
    background-color :  ${({ theme }) => theme.colors.mainblue100};
    border : 0.2vw solid  ${({ theme }) => theme.colors.mainblue400};
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
    margin-top : 1vh;
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
