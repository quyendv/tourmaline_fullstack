import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as apis from '../../services'
import * as actions from '../../store/actions'

import Song from '../../components/Song'

function Favorite() {
    const [favoriteSongs, setFavoriteSongs] = useState([])
    const {token} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchFavoriteSongs = async() => {
            const response = await apis.getFavorite(token)
            console.log(response)
            setFavoriteSongs(response.data.songs)
        }
        fetchFavoriteSongs()
        const fetchListPlaylist = async () => {
            const response = await apis.getAllPlaylist(token)
            if(response.status == 200) {
                dispatch(actions.setCurPlaylist(response.data.playlists))
            }
        }
        fetchListPlaylist()
    }, [])

    return (
        <div className="favoritepage text-white">
            <h3 className="text-2xl font-bold px-12 mt-5">Favorite Songs</h3>
            <div>
                {favoriteSongs.map((item, index) => (
                    <Song key={index} songData={item} isFavorite={true}/>
                ))}
            </div>
        </div>
    );
}

export default Favorite;
