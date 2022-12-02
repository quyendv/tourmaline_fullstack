import axiosConfig from '../utils/axiosConfig'

export const getProfile =  (username, token) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            url: `/api/user/getUser/${username}`,
            method: 'get',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const setProfile =  (payload, token) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            url: `/api/user/edit`,
            method: 'put',
            data: payload,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})