import axiosConfig from '../utils/axiosConfig'

export const getSong = (sid) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            url:`api/song/getMedia/${sid}`,
            method:'get',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const getDetailSong =(sid) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            url:'/infosong',
            method:'get',
            params:{id:sid}
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})