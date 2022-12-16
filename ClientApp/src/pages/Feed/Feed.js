import { useEffect } from "react"
import { useSelector } from "react-redux"
import * as apis from '../../services'
function Feed() {
    const {token} = useSelector(state => state.auth)
    useEffect(() => {
        const fetchRecentUploaded = async() => {
            const response = await apis.getRecentlyUploaded(token)
            console.log(response)
        }
        fetchRecentUploaded()
    }, [])
    return (
        <div>
            Feed
        </div>
    )
}
export default Feed