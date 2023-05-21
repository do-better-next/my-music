import m_request from '../request/musicRequest'


export const getSingerId = (param) => {
    return m_request({
        method: "get",
        url: '/search/',
        params:{...param}

    })
}

export const getSingerDetails = (param) => {
    return m_request({
        method: "get",
        url: '/artists',
        params:{...param}
    })
}

export const getSongById = (param) => {
    return m_request({
        method: "get",
        url: '/song/url',
        params:{...param}
    })
}