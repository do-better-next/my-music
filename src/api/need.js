import request from "../request/request";

export const getAllData = ()=>{
    return request({
        method:"get",
        url:"/need/getAll"
    })
}