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
    let formData = new FormData()
    formData.append('name', data.name)
    formData.append('cover', data.cover)
    console.log(formData.get('cover'))
    try {
        const response = await axiosConfig({
            url: '/api/playlist/create',
            method:'post',
            data: formData,
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

export const getPlaylist = (id, token) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            url: `/api/playlist/get`,
            method: 'get',
            params: {
                id
            },
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
// export const getCover = (id, token) => new Promise(async(resolve, reject) => {
//     try {
//         const response = await axiosConfig({
//             url: `/api/song/getCover`,
//             method: 'get',
//             params:{
//                 id
//             },
//             headers: {
//                 "Authorization": `Bearer ${token}`
//             }
//         })
//         resolve(response)
//     } catch (error) {
//         reject(error)
//     }
// })
export const uploadFile = (data, token) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            url: '/api/song/upload',
            method: 'post',
            data: data,
            headers: {
                'Authorization' : `Bearer ${token}`,
                'Content-Type' : 'multipart/form-data'
            }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})