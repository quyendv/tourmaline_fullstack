import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import { icons } from '../../utils/icons';
import { getPlaylist, getCover, getSongs, getAllPlaylist } from '../../services/music';
import Song from '../../components/Song';
import PlaylistItem from '../../components/PlaylistItem'
import * as actions from '../../store/actions'
import { useNavigate } from 'react-router-dom';

const { BsFillPlayFill, AiOutlinePlusCircle, FaCaretRight } = icons;

function Library() {
    const { setIsOpenModal } = useSelector((state) => state.actions);
    const { token } = useSelector((state) => state.auth);
    const { username } = useSelector((state) => state.user);
    const [songsUploaded, setSongsUploaded] = useState([]);
    const [playlistCreated, setPlaylistCreated] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllPlaylist = async () => {
            const response = await getAllPlaylist(token)
            setPlaylistCreated(response.data.playlists)
        };
        const fetchSongs = async () => {
            const response = await getSongs(username, token);
            setSongsUploaded(response.data);
        };
        fetchAllPlaylist();
        fetchSongs();
    }, []);
    useEffect(() => {
        dispatch(actions.createPlaylist(setPlaylistCreated))
    }, [])
    console.log(playlistCreated)
    
    return (
        <div className="px-14 py-16 text-white">
            {/* Title Library*/}
            <div className="flex items-center gap-4">
                <h2 className="text-3xl font-bold">Library</h2>
                <span className="rounded-full border border-white p-1">
                    <BsFillPlayFill size={24} />
                </span>
            </div>
            {/* Title Playlist */}
            <div className="mt-8 flex items-center justify-between">
                <span className="flex items-center gap-4">
                    <h3 className="text-xl font-semibold">Playlist</h3>
                    <span onClick={() => setIsOpenModal((prev) => !prev)} className="cursor-pointer">
                        <AiOutlinePlusCircle size={20} />
                    </span>
                </span>
                <span
                    onClick={() =>
                        navigate('/library/playlist', {
                            state: playlistCreated,
                        })
                    }
                    className="cursor-pointer font-bold hover:text-activecolor"
                >
                    See all
                    <FaCaretRight className="ml-1" />
                </span>
            </div>
            {/* List Playlist Item */}
            <div className="-mx-2 mt-4 flex items-center overflow-x-hidden">
                {playlistCreated.length > 0 &&
                    playlistCreated
                        .filter((item, index) => index <= 4) // limit 5 items
                        .map((item, index) => <PlaylistItem playlistData={item} key={index} className="w-1/5 px-2" />)}
            </div>
            {/* Songs */}
            <div className="mt-8 flex items-center gap-4">
                <h3 className="text-xl font-semibold">Bài hát</h3>
                <span className="cursor-pointer">
                    <AiOutlinePlusCircle size={20} />
                </span>
            </div>
            <div className='flex flex-col gap-2'>
                {songsUploaded?.map((item) => (
                    <Song key={item.id} songData={item} />
                ))}
            </div>
        </div>
    );
}

export default Library;
