import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import * as apis from '../../services'

function User() {
    const {username} = useParams()
    const [userAvatar, setUserAvatar] = useState('')
    const {token} = useSelector(state => state.auth)
    useEffect(() => {
        const fetchFollowers = async () => {
            const response = await apis.getFollowers(token)
            console.log(response)
        }
        fetchFollowers()
        const fetchFollowings = async() => {
            const response = await apis.getFollowings(token) 
            console.log(response)
        }
        fetchFollowings()
    }, [])
    useEffect(() => {
        const url =''
        const fetchUserAvatar = async () => {
            const response = await apis.getAvatar(username)
            const blob = new Blob([response.data], {type: 'image/jpeg'})
            const url = URL.createObjectURL(blob)
            setUserAvatar(url)
        }
        fetchUserAvatar()

        return () => {
            URL.revokeObjectURL(url)
        }
    }, [username])
    return (
        <div>
            username
        </div>
    )
}

export default User