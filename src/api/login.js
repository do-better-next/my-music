import request from "../request/request";

export const getCodeApi = (data)=>{
    return request({
        method:"post",
        url:"/user/getCode",
        data
    })
}

export const emailLogin = (data)=>{
    return request({
        method:"post",
        url:"/user/email",
        data
    })
}