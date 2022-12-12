import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Pop from '../../assets/images/Pop.svg';
import * as apis from '../../services'
import Song from '../../components/Song'
import MediaItem from '../../components/MediaItem'
function MainScreen() {
    const navigate = useNavigate()
    const {token} = useSelector(state => state.auth)
    const [recentlyPlayed, setRecentlyPlayed] = useState([])
    const [recentlyUploaded, setRecentlyUploaded] = useState([])
    const handleClickPlaylist = () => {
        navigate('/playlist/Pop/1')
    }
    useEffect(() => {
       const fetchSuggestion = async () => {
         const response = await apis.getSuggestion(token)
         if(response.status == 200) {
            setRecentlyPlayed(response.data.recentlyPlayed)
            setRecentlyUploaded(response.data.recentlyUploaded)
            console.log(response)
         }
       }        
       fetchSuggestion()
    }, [])
    return (
        <div className='text-white w-full mt-10'>
            <div className='px-12'>
                <h3 className='text-2xl font-bold'>Recently Played</h3>
                <div>
                    {recentlyPlayed.map((item, index) => (
                        <Song key={index} songData={item} />
                    ))}
                </div>
            </div>
            <div className='px-12 w-full'>
                <h3 className='text-2xl font-bold'>Mới lên sóng</h3>
                <div className='flex-wrap flex w-full'>
                    {recentlyUploaded.map((item, index) => (
                        <MediaItem className='w-[30%]' key={index} songData={item}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MainScreen;
