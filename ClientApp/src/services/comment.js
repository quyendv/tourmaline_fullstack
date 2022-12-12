import axiosConfig from '../utils/axiosConfig'

export const postComment = (data, token) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            url:'api/comment/post',
            method:'post',
            data: data,
            headers: {
                'Authorization' :`Bearer ${token}`,
                'Content-Type' :'multipart/form-data'
            }
            
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const getAllComment = (id, token) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            url:`api/comment/getAllOnSong/${id}`,
            method:'get',
            headers: {
                'Authorization' :`Bearer ${token}`,
            }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const deleteComment = (id, token) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            url:`api/comment/remove/${id}`,
            method:'post',
            headers: {
                'Authorization' :`Bearer ${token}`,
            }
            
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const editComment = (data, token) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            url:`api/comment/edit`,
            method:'put',
            data:data,
            headers: {
                'Authorization' :`Bearer ${token}`,
                'Content-Type' :'multipart/form-data'
            }
            
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})