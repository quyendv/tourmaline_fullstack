import axiosConfig from '../utils/axiosConfig'

export const addToFavorite = (id, token) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            url:'api/favorite/add',
            method:'put',
            params: {
                id
            },
            headers: {
                'Authorization' :`Bearer ${token}`,
            }
            
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const removeFromFavorite = (id, token) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            url:'api/favorite/remove',
            method:'delete',
            params: {
                id
            },
            headers: {
                'Authorization' :`Bearer ${token}`,
            }
            
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const getFavorite = (token) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            url:'api/favorite/get',
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