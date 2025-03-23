import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { apiClient } from "../../apiClient";

const DateContext = createContext();

export const useDate = () => useContext(DateContext);

export const DateProvider = ({ children }) => {
    const [currentDay, setCurrentDay] = useState(1); // 시작일
    const [currentMonth, setCurrentMonth] = useState("3월"); // 기본값
    const [semester, setSemester] = useState("");
    const [maxDay, setMaxDay] = useState(31); // 최대 날짜 제한 추가

    const nextDay = () => {
        setCurrentDay((prev) => {
            if (prev >= maxDay) return prev; // 더 이상 증가하지 않음
            return prev + 1;
        });
    };

    useEffect(() => {
        const getSemester = async () => {
            try {
                const response = await apiClient.get('/main/chapter');
                if (response.status === 200) {
                    console.log(response.data);
                    const semesterValue = response.data.data.current_chapter.chapter;
                    setSemester(semesterValue);
    
                    // 학기에 따라 월 설정 (포함되는 경우)
                    if (semesterValue.includes("1학기")) {
                        setCurrentMonth("3월");
                        setMaxDay(31);
                    } else if (semesterValue.includes("2학기")) {
                        setCurrentMonth("9월");
                        setMaxDay(31);
                    } else if (semesterValue.includes("여름방학")) {
                        setCurrentMonth("7월");
                        setMaxDay(14);
                    } else if (semesterValue.includes("겨울방학")) {
                        setCurrentMonth("1월");
                        setMaxDay(14);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };
    
        getSemester();
    }, []);

    return (
        <DateContext.Provider value={{ currentDay, currentMonth, nextDay }}>
            {children}
        </DateContext.Provider>
    );
};