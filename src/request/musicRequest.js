import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
if(import.meta.env.MODE=='development'){
    axios.defaults.baseURL='/musicapi'
}else{
    axios.defaults.baseURL='http://121.5.167.62:3000'
}
const m_request = axios.create({
    timeout:8000
});

NProgress.configure({
    easing: 'ease', // 动画方式
    speed: 500, // 递增进度条的速度
    showSpinner: true, // 是否显示加载 icon
    trickleSpeed: 200, // 自动递增间隔
    minimum: 0.3 // 初始化时的最小百分比
  })

// 添加请求拦截器
m_request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    NProgress.start()
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
m_request.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    NProgress.done()
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default m_request;