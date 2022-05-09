import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "3.36.53.246:8080",
  baseURL: "http://localhost:4000/",
  // json-server 가짜서버주소
  // baseURL: "http://128.134.6.102:8080",

  // 요청을 www.aa.com/user로 보낸다면, www.aa.com까지 기록
});

const axiosOVInstance = axios.create({
  baseURL: "https://yeryung.shop",
});
// 가지고 있는 토큰 넣어주기!
// 로그인 전이면 토큰이 없으니 못 넣어요.
// 그럴 땐 로그인 하고 토큰을 받아왔을 때 넣어줍시다.
if (localStorage.getItem("token")) {
  axiosInstance.defaults.headers.common["Authorization"] =
    localStorage.getItem("token");
}

const apis = {
  axiosInstance,
  axiosOVInstance,
};

export default apis;
