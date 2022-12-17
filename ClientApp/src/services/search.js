import axiosConfig from '../utils/axiosConfig'

export const search = (query) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            url: 'api/search',
            method:'get',
            params: {
                query
            }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})