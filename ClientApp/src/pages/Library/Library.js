import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import { icons } from '../../utils/icons';
import { getPlaylist, getCover, getSongs, getAllPlaylist } from '../../services/music';
import List from '../../components/List';
import PlaylistItem from '../../components/PlaylistItem'
import * as actions from '../../store/actions'

const { BsFillPlayFill, AiOutlinePlusCircle } = icons;

function Library() {
    const { setIsOpenModal } = useSelector((state) => state.actions);
    const { token } = useSelector((state) => state.auth);
    const { username } = useSelector((state) => state.user);
    const [songsUploaded, setSongsUploaded] = useState([]);
    const [playlistCreated, setPlaylistCreated] = useState([])
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
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(actions.createPlaylist(setPlaylistCreated))
    }, [])
    console.log(playlistCreated)
    return (
        <div className="text-white">
            <div className="mt-10 flex items-center gap-4 px-5">
                <h2 className="text-3xl font-bold">Library</h2>
                <span className="rounded-full border border-white p-1">
                    <BsFillPlayFill size={24} />
                </span>
            </div>
            <div className="mt-8 flex items-center gap-4 px-6">
                <h3 className="text-xl font-semibold">Playlist</h3>
                <span onClick={() => setIsOpenModal((prev) => !prev)} className="cursor-pointer">
                    <AiOutlinePlusCircle size={20} />
                </span>
            </div>
            <div className="mt-8 flex items-center gap-4 px-6">
                {playlistCreated.length > 0 && playlistCreated?.map((item, index) => (
                    <PlaylistItem playlistData={item} key={index}/>
                ))}
            </div>
            <div className="mt-8 flex items-center gap-4 px-6">
                <h3 className="text-xl font-semibold">Bài hát</h3>
                <span className="cursor-pointer">
                    <AiOutlinePlusCircle size={20} />
                </span>
            </div>
            <div className='flex flex-col gap-2'>
                {songsUploaded?.map((item) => (
                    <List key={item.id} songData={item} />
                ))}
            </div>
        </div>
    );
}

export default Library;
