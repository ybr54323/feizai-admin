import axios from "axios";
import { notification } from "ant-design-vue";
import { useRouter } from "vue-router";
import nprogress from "nprogress";
import router from "../router";
const request = axios.create({
  baseURL: "/",
  timeout: 6000,
  withCredentials: true,
});
const errorHandler = (err) => {
  nprogress.done();
  if (err?.response?.status === 401) {
    notification.error({ message: "尚未登陆" });
    router.push("/login");
  } else {
    notification.error({ message: "发生错误" });
    return Promise.reject(err);
  }
};
request.interceptors.request.use((config) => {
  nprogress.start();

  return config;
}, errorHandler);
request.interceptors.response.use((res) => {
  nprogress.done();
  if (res.status === 200 && res.config.method === "post") {
    notification.success({ message: "保存成功" });
  }
  return res.data;
}, errorHandler);

export default request;
