import axios from "axios";
const request = axios.create({
  baseURL: "/",
});
//请求拦截器
request.interceptors.request.use((config) => {
  return config;
});
//响应拦截器
request.interceptors.response.use(
  (response) => {
    if (response.data.code === 20000) {
      return response.data.data;
    } else {
      return Promise.reject(response.data.message);
    }
  },
  (error) => {
    if (error.message) {
      if (error.message.status === 401) {
      }
    } else {
      //服务器没有返回响应
      //请求超时(timeout)还是网络错误(newwork err)
    }
  }
);
export default request;
