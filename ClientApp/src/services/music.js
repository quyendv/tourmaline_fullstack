import axiosConfig from '../utils/axiosConfig'

export const getSong = (id, token) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            url: `api/song/getMedia`,
            method: 'get',
            params: {
                id
            },
            headers: {
                "Authorization" : `Bearer ${token}`,

            },
            responseType:'blob'
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const getInfoSong = (id, token) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            url: '/api/song/get',
            method: 'get',  
            params: {id},
            headers: {
                "Authorization":`Bearer ${token}`
            }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const deleteSong = (id, token) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            url: '/api/song/delete',
            method: 'delete',  
            params: {id},
            headers: {
                "Authorization":`Bearer ${token}`
            }
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

export const getAllPlaylist = (token) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            url: `/api/playlist/playlists`,
            method: 'get',
            // params: {
            //     id
            // },
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const deletePlaylist = (id, token) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            url:'/api/playlist/delete',
            method:'delete',
            params:{
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

export const getCover = (id, token) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            url: `/api/song/getCover`,
            method: 'get',
            params:{
                id
            },
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
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

export const getSongs = (username, token) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            url: '/api/song/getUploaded',
            method: 'get',
            params:{
                username
            },
            headers: {
                'Authorization' : `Bearer ${token}`,
            }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const getSuggestion = (token) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            url: '/api/suggestion/getSuggestion',
            method: 'get',
            headers: {
                'Authorization' : `Bearer ${token}`,
            }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const getRelatedArtist = (token) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            url: '/api/suggestion/getRelatedArtist',
            method: 'get',
            headers: {
                'Authorization' : `Bearer ${token}`,
            }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const getRecentlyUploaded = (token) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            url:'/api/suggestion/getRecentlyUploaded',
            method: 'get',
            headers: {
                'Authorization' : `Bearer ${token}`,
            }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const getRecentPlays = (token) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            url:'/api/suggestion/getRecentPlays',
            method: 'get',
            headers: {
                'Authorization' : `Bearer ${token}`,
            }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const getTop50 = () => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            url:'/api/suggestion/getTop50',
            method: 'get',

        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const getNew = () => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            url:'/api/suggestion/getNew',
            method: 'get',

        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const addToPlaylist = (songId, playlistId, token) => new Promise(async(resolve, reject)=> {
    try {
        const response = await axiosConfig({
            url:'/api/playlist/add',
            method:'put',
            params:{
                songId,
                playlistId,
            },
            headers: {
                'Authorization' : `Bearer ${token}`,
            }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const removeFromPlaylist = (songId, playlistId, token) => new Promise(async(resolve, reject)=> {
    try {
        const response = await axiosConfig({
            url:'/api/playlist/add',
            method:'delete',
            params:{
                
                playlistId,
            },
            data: {
                songId
            },
            headers: {
                'Authorization' : `Bearer ${token}`,
            }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const editSong = (songId, data, token) => new Promise(async(resolve, reject)=> {
    try {
        const response = await axiosConfig({
            url:'/api/playlist/edit',
            method:'put',
            params:{
                id: songId,
                name: data.name,
                description:data.description,
                tags: data.tags
            },

            headers: {
                'Authorization' : `Bearer ${token}`,
            }
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})