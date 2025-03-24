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
    let currentMonth = "3월";

    if (semester.includes("1학기")) {
        currentMonth = "3월";
        if (maxDay !== 31) setMaxDay(31);
    } else if (semester.includes("2학기")) {
        currentMonth = "10월";
        if (maxDay !== 31) setMaxDay(31);
    } else if (semester.includes("여름방학")) {
        currentMonth = "7월";
        if (maxDay !== 14) setMaxDay(14);
    } else if (semester.includes("겨울방학")) {
        currentMonth = "1월";
        if (maxDay !== 14) setMaxDay(14);
    }

    const nextDay = () => {
        setCurrentDay((prev) => (prev < maxDay ? prev + 1 : prev));
    };
    return (
        <DateContext.Provider value={{ currentDay, currentMonth, nextDay }}>
            {children}
        </DateContext.Provider>
    );
};