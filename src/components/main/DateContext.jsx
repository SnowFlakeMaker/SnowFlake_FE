import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { apiClient } from "../../apiClient";
import { useQuery } from "@tanstack/react-query";

const DateContext = createContext();

export const useDate = () => useContext(DateContext);

export const DateProvider = ({ children }) => {
    const [currentDay, setCurrentDay] = useState(1);
    const [maxDay, setMaxDay] = useState(31);

    const { data: semesterData } = useQuery({
        queryKey: ["semester"],
        queryFn: async () => {
            const response = await apiClient.get("/main/chapter");
            return response.data.data.current_chapter.chapter;
        },
        refetchInterval: 5000, // ⏱ 5초마다 자동 갱신
    });

    // 학기에 따라 월, maxDay 계산
    const semester = semesterData || "";
    useEffect(() => {
        if (!semester) return;

        if (semester.includes("1학기") || semester.includes("2학기")) {
            setMaxDay(31);
        } else if (semester.includes("여름방학") || semester.includes("겨울방학")) {
            setMaxDay(14);
        }
    }, [semester]);

    // ✅ currentMonth는 계산값으로 처리 (state 아님)
    let currentMonth = "3월";
    if (semester.includes("1학기")) {
        currentMonth = "3월";
    } else if (semester.includes("2학기")) {
        currentMonth = "10월";
    } else if (semester.includes("여름방학")) {
        currentMonth = "7월";
    } else if (semester.includes("겨울방학")) {
        currentMonth = "1월";
    }

    const nextDay = () => {
        setCurrentDay(prev => {
            const next = prev < maxDay ? prev + 1 : prev;
            console.log(`📅 날짜 변경: ${prev} → ${next} (max: ${maxDay})`);
            return next;
        });
    };
    return (
        <DateContext.Provider value={{ currentDay, currentMonth, nextDay }}>
            {children}
        </DateContext.Provider>
    );
};