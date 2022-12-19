import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PlaylistItem from '~/components/PlaylistItem';
import { icons } from '../../utils/icons';
import * as apis from '../../services';
import * as actions from '../../store/actions';

const { AiOutlinePlusCircle } = icons;

function AllPlaylist() {
    const dispatch = useDispatch();
    const { setIsOpenCrePlaylistModal } = useSelector((state) => state.actions);
    const { token } = useSelector((state) => state.auth);
    const [allPlaylistCreated, setAllPlaylistCreated] = useState([]);
    useEffect(() => {
        dispatch(actions.createAllPlaylist(setAllPlaylistCreated));
    }, []);
    useEffect(() => {
        const fetchPlaylist = async () => {
            const response = await apis.getAllPlaylist(token);
            setAllPlaylistCreated(response.data.playlists);
        };
        fetchPlaylist();
    }, []);
    return (
        <div className="AllplaylistComponent flex h-[calc(100vh-var(--header-height))] w-full flex-col overflow-y-auto px-14 pt-16 pb-24 text-white">
            <h2 className="mb-7 border-b border-[color:#ffffff1a] pb-3 text-2xl font-bold">Playlist</h2>
            {/* Container */}
            <div className="grid auto-rows-[minmax(260px,_1fr)] grid-cols-3 md:grid-cols-4 gap-5 xl:grid-cols-5">
                {/* Create new playlist item */}
                <div
                    onClick={() => setIsOpenCrePlaylistModal((prev) => !prev)}
                    className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-[color:#ffffff1a] text-center hover:text-active-color"
                >
                    <AiOutlinePlusCircle size={30} />
                    <span>Create new playlist</span>
                </div>
                {/* PlaylistItem */}
                {allPlaylistCreated.map((item, index) => (
                    <PlaylistItem key={index} playlistData={item} />
                ))}
            </div>
        </div>
    );
}

export default AllPlaylist;
