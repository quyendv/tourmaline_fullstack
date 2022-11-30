import axiosConfig from '../utils/axiosConfig'

export const getSong = (sid) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            url: `api/song/getMedia/${sid}`,
            method: 'get',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const getDetailSong = (sid) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            url: '/infosong',
            method: 'get',
            params: {id: sid}
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const crePlaylist = (data, token) => new Promise(async(resolve, reject) => {

    try {
        const response = await axiosConfig({
            url: '/api/playlist/create',
            method:'post',
            data: data,
            headers: {
                "Authorization" : `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            }
            
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const getPlaylist = (token) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            url: '/api/playlist/get',
            method: 'get',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})