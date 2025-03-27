import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL + "/api",
    withCredentials: true  // ✅ 모든 요청에 쿠키 포함
});



const refreshToken = async () => {
    try {
        console.log("🔄 토큰 갱신 요청 시작");
        const response = await apiClient.get("/auth/refresh");
        if(response.status===200) { 
            console.log("✅ 토큰 갱신 성공:", response.data);
        }
        
        return response.data;
    } catch (error) {
        console.error("❌ 토큰 갱신 실패:", error.response?.status, error.response?.data);

        if (error.response?.status === 400) {
            logout();  // ✅ 리프레시 토큰 만료 시 자동 로그아웃
        }

        throw error;
    }
};

// ✅ 자동 로그아웃 함수
const logout = () => {
    console.log("🚨 리프레시 토큰 만료 - 자동 로그아웃 실행");
    // window.location.href = "/";
};

// ✅ 인터셉터에서 403 또는 401 발생 시 토큰 갱신
apiClient.interceptors.response.use(
    (response) => response,  // ✅ 정상 응답 그대로 반환
    async (error) => {
        console.log("🔥 인터셉터 감지 - 에러 상태 코드:", error.response?.status);

        const originalRequest = error.config;

        if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
            console.log("🔄 401 또는 403 감지 → 토큰 갱신 시도");
            originalRequest._retry = true;

            try {
                await refreshToken();  // ✅ 토큰 갱신 시도
                console.log("✅ 토큰 갱신 완료 → 원래 요청 재시도");
                originalRequest.withCredentials = true;
                return apiClient(originalRequest);  // ✅ 원래 요청 다시 보내기
            } catch (refreshError) {
                console.error("❌ 리프레시 토큰 갱신 실패:", refreshError);
                logout(); // ✅ 토큰 갱신이 실패하면 강제 로그아웃
            }
        }

        if (error.response?.status === 400) {
            console.log("🚨 400 감지 → 리프레시 토큰 만료, 로그아웃");
            logout(); // ✅ 리프레시 토큰 만료 시 로그아웃
        }

        return Promise.reject(error);
    }
);