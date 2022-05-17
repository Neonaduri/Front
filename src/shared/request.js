import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://54.180.103.147:8080",
});

// const axiosOVInstance = axios.create({
//   baseURL: "https://ohyeryung.shop",
//   headers: {
//     "content-type": "application/json",
//     accept: "application/json",
//     Authorization: localStorage.getItem("token"),
//   },
//   withCredentials: true,
// });

// 가지고 있는 토큰 넣어주기!
// 로그인 전이면 토큰이 없으니 못 넣어요.
// 그럴 땐 로그인 하고 토큰을 받아왔을 때 넣어줍시다.
if (localStorage.getItem("token")) {
  axiosInstance.defaults.headers.common["Authorization"] =
    localStorage.getItem("token");
}

// axiosInstance.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   async (error) => {
//     // response에서 error가 발생했을 경우 catch로 넘어가기 전에 처리
//     try {
//       const errResponseStatus = error.response.status;
//       const errResponseData = error.response.data;
//       const prevRequest = error.config;

//       // access token이 만료되어 발생하는 에러인 경우
//       // 백엔드와 에러메세지와 status 코드를 사전에 협의할 것
//       if (
//         errResponseData.error?.message === "jwt expired" ||
//         errResponseStatus === 401
//       ) {
//         // 첫 로그인때 받았던 refreshToken을 가져와서 재발급 요청
//         const preRefreshToken = localStorage.getItem("refreshToken");
//         if (preRefreshToken) {
//           // refresh token을 이용하여 access token 재발급
//           const regenerateToken = async () => {
//             try {
//               // 재발급 api 사전협의 필요
//               const response = await axiosInstance.post("api/user/token", {
//                 refresh_token: preRefreshToken,
//               });
//               //response로 받은 access, refresh token을 로컬스토리지에 저장
//               const { access_token, refresh_token } = response.data;
//               localStorage.setItem("token", access_token);
//               localStorage.setItem("refreshToken", refresh_token);
//               // 이전 요청의 헤더 정보를 새 토큰으로 교체 후 실패했던 이전의 요청을 다시한번 보냄.
//               // 성공하면 유저는 정상적으로 response를 다시 받게된다.
//               prevRequest.headers.Authorization = access_token;
//               return await axios(prevRequest);
//             } catch (err) {
//               // 토큰 재발급이 실패하면 모든 로컬스토리지 정보를 지우고 로그인페이지로 이동시킨다.
//               localStorage.removeItem("token");
//               localStorage.removeItem("refreshToken");
//               window.location.href = "/login";

//               return new Error(err);
//             }
//           };

//           return await regenerateToken();
//         } else {
//           throw new Error("There is no refresh token");
//         }
//       }
//     } catch (e) {
//       // 오류 내용 출력 후 요청 거절
//       return Promise.reject(e);
//     }
//   }
// );

const apis = {
  axiosInstance,
};

export default apis;
