import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const apiClient =  apiClient = axios.create({
    baseURL : SERVER_URL,
    withCredentials: true,
})

const refreshToken = async () =>{
    try{
        const response = await axios.post(`${SERVER_URL}/auth/refresh`, {}, { 
            withCredentials: true 
        });
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};

apiClient.interceptors.response.use(
    (response) => response, // 정상 응답이면 그대로 반환
    async (error) => {
        const originalRequest = error.config;

        // ✅ 401 에러 발생 시 -> 리프레시 토큰 요청 후 재시도
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await refreshToken(); //새 토큰 요청
                return apiClient(originalRequest); // 원래 요청을 다시 실행
            } catch (refreshError) {
                console.error("토큰 갱신 실패, 로그아웃 필요:", refreshError);
                return Promise.reject(refreshError);
            }
        }


        return Promise.reject(error);
    }
);