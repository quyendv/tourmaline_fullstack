import axiosConfig from '../utils/axiosConfig'

export const follow = (username, token) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            url:'api/follow/add',
            method:'put',
            params: {
                username
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
export const unFollow = (username, token) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            url:'api/follow/remove',
            method:'delete',
            params: {
                username
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
export const getFollowers = (token) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            url:'api/follow/followers',
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

export const getFollowings = (token) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            url:'api/follow/followings',
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