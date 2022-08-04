import request from "@/utils/request";
const path = import.meta.env.VITE_PATH;

export const post = (data) => {
  return request({
    url: path + "/post",
    method: "post",
    data,
  });
};

export const getPosts = (params) => {
  return request({
    url: path + "/posts",
    method: "get",
    params,
  });
};

export const delPost = (params) => {
  return request({
    url: path + "/post",
    method: "delete",
    params,
  });
};

export const getPost = (params) => {
  return request({
    url: path + "/post",
    method: "get",
    params,
  });
};
