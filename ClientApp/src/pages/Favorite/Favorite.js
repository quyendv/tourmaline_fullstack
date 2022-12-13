import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as apis from '../../services'

import Song from '../../components/Song'

function Favorite() {
    const [favoriteSongs, setFavoriteSongs] = useState([])
    const {token} = useSelector(state => state.auth)
    useEffect(() => {
        const fetchFavoriteSongs = async() => {
            const response = await apis.getFavorite(token)
            console.log(response)
            setFavoriteSongs(response.data.songs)
        }
        fetchFavoriteSongs()
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
