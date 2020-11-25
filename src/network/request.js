// http://152.136.185.210:8000/api/w6
import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/w6',
    timeout: 5000
  })

  // 2.axios的拦截器
  // 请求的拦截器  use内有两参数: 请求成功和请求失败(请求失败一般不会出现)
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err);
  })
  // 响应的拦截器
  instance.interceptors.response.use(res => {
    //拿到的是请求的结果信息

    // 拦截后需要return出最终的信息,如果不返回的话,最终获取的为undefined
    return res.data
  }, err => {
    console.log(err);
  })

  // 3.发送真正的网络请求
  return instance(config)
}