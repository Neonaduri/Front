import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ohyeryung.shop",
});

// 가지고 있는 토큰 넣어주기!
// 로그인 전이면 토큰이 없으니 못 넣어요.
// 그럴 땐 로그인 하고 토큰을 받아왔을 때 넣어줍시다.
if (localStorage.getItem("token")) {
  axiosInstance.defaults.headers.common["Authorization"] =
    localStorage.getItem("token");
}
axiosInstance.defaults.withCredentials = true;

const apis = {
  axiosInstance,
};

export default apis;
