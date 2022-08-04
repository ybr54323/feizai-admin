import request from "@/utils/request";
const path = import.meta.env.VITE_PATH;

export const login = (data) => {
  return request({
    url: path + "/login",
    method: "post",
    data,
  });
};
