import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Pop from '../../assets/images/Pop.svg';
import * as apis from '../../services';
import * as actions from '../../store/actions'
import Song from '../../components/Song';
import MediaItem from '../../components/MediaItem';
import UserItem from '../../components/UserItem'
function MainScreen() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.auth);
    const [recentlyPlayed, setRecentlyPlayed] = useState([]);
    const [recentlyUploaded, setRecentlyUploaded] = useState([]);
    const [relatedArtists, setRelatedArtists] = useState([]);
    const handleClickPlaylist = () => {
        navigate('/playlist/Pop/1');
    };
    useEffect(() => {
        const fetchSuggestion = async () => {
            const response = await apis.getSuggestion(token);
            if (response.status === 200) {
                // setRecentlyPlayed(response.data.recentlyPlayed);
                // setRecentlyUploaded(response.data.recentlyUploaded);
                console.log(response);
            }
        };
        fetchSuggestion();

        const fetchNew = async () => {
            const response = await apis.getNew() 
            if(response.status === 200) {
                //TODOS
                console.log(response)
                setRecentlyUploaded(response.data.result)
            }
        }
        fetchNew()
        const fetchTop50 = async() => {
            const response = await apis.getTop50()
            if(response.status === 200) {
                console.log(response)
            }
        }
        fetchTop50()
        const fetchRecentlyPlays = async() => {
            const response = await apis.getRecentPlays(token)
            if(response.status === 200) {
                console.log(response)
                setRecentlyPlayed(response.data)
            }
        }
        fetchRecentlyPlays()
        const fetchRecentlyUploaded = async () => {
            const response = await apis.getRecentlyUploaded(token)
            if(response.status === 200) {
                console.log(response)
            }
        }
        fetchRecentlyUploaded()
        const fetchRelatedArtists = async()=>{
            const response = await apis.getRelatedArtist(token)
            if(response.status === 200) {
                setRelatedArtists(response.data)
            } 
        }
        fetchRelatedArtists()
        const fetchAllPlaylist = async () => {
            const response = await apis.getAllPlaylist(token)
            if(response.status == 200) {
                // console.log(response)
                dispatch(actions.setCurPlaylist(response.data.playlists))
            }
        }
        
        fetchAllPlaylist()
    }, []);
    return (
        <div className="h-[calc(100vh-var(--header-height))] w-full overflow-y-auto px-14 pt-16 pb-24 text-white">
            {/* Recently */}
            <div>
                <h3 className="mb-4 text-2xl font-bold">Recently Played</h3>
                <div className="max-h-64 overflow-y-auto">
                    {recentlyPlayed.map((item, index) => (
                        <Song key={index} songData={item} />
                    ))}
                </div>
            </div>
            {/* New */}
            <div className="mt-12">
                <h3 className="mb-5 text-2xl font-bold">News</h3>
                <div className="grid h-64 grid-cols-2 lg:grid-cols-3 gap-3 overflow-y-auto">
                    {recentlyUploaded.map((item, index) => (
                        <MediaItem key={index} songData={item} />
                    ))}
                </div>
            </div>
            {/* Artists you should know */}
            <div className="mt-12">
                <h3 className="mb-5 text-2xl font-bold">Artists you should know</h3>
                <div className='flex gap-2'>
                    {
                        
                        relatedArtists.filter((item,index) => index <= 4).map((item, index) => (
                            <UserItem key={index} userData={item} />
                        ))
                    }
                </div>

            </div>

        </div>
    );
}

export default MainScreen;
