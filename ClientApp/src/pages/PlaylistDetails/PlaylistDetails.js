import { useParams } from 'react-router-dom';
import { DefaultMenu as PlaylistMenu } from '~/components/Popper';
import { images } from '~/assets/images';
import Song from '../../components/Song';
import { icons } from '../../utils/icons';
import { useEffect, useState } from 'react';
import * as apis from '../../services';
import { useSelector } from 'react-redux';

const {
    BsThreeDots,
    FaSort,
    FaRegComment,
    AiOutlineDownload,
    BsLink45Deg,
    RiShareForwardLine,
    AiFillDelete,
    BsFillPlayFill,
    RiPlayListAddLine,
    AiOutlineEdit,
} = icons;
const playlistMenu = [
    {
        type: 'editPlaylist',
        icon: <AiOutlineEdit />,
        title: 'Edit',
        to: '',
    },
    {
        icon: <RiShareForwardLine />,
        title: 'Share',
        to: '',
    },
];

function Playlist() {

    const { token } = useSelector((state) => state.auth);
    const { pid } = useParams();
    const [songs, setSongs] = useState([]);
    const [playlistInfo, setPlaylistInfo] = useState({});
    useEffect(() => {
        const fetchSongs = async () => {
            const response = await apis.getPlaylist(pid, token);
            setPlaylistInfo(response.data);
            setSongs(response.data.songs);
        };
        fetchSongs();
    }, []);
    useEffect(() => {
        const deletePlaylist = {
            id: pid,
            type: 'deletePlaylist',
            icon: <AiFillDelete />,
            title: 'Delete',
            to: '',
        };
        const addSongsToNextUp = {
            id: pid,
            type: 'addSongToNextUp',
            icon: <RiPlayListAddLine />,
            title: 'Add playlist to next up',
            to: '',
        };
        playlistMenu[0].type !== 'addSongToNextUp' && playlistMenu.unshift(addSongsToNextUp);
        playlistMenu[playlistMenu.length - 1].type === 'deletePlaylist' &&
            playlistMenu.splice(playlistMenu.length - 1, 1);
        playlistMenu[playlistMenu.length - 1].type !== 'deletePlaylist' && playlistMenu.push(deletePlaylist);
        playlistMenu.forEach((item) => {
            item.id = pid;
        });
    }, [pid, songs]);
    return (
        <div className="flex max-h-[calc(100vh-120px)] w-full gap-4 overflow-y-auto px-14 py-10 text-white">
            {/* Playlist Info */}
            <div className="flex flex-col items-center gap-1">
                <div className="group relative max-w-[300px] overflow-hidden rounded-lg after:absolute after:inset-0 after:hidden after:bg-overlay-30 hover:after:block">
                    {/* icon play */}
                    <span
                        className="absolute top-1/2 left-1/2 z-10 hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 cursor-pointer place-content-center rounded-full bg-[#00000033] p-1 group-hover:grid"
                        // onClick={handleClickPlay}
                    >
                        <BsFillPlayFill size={24} />
                    </span>
                    {/* img */}
                    <img
                        className="h-full w-full rounded-lg object-cover transition-all duration-1000 group-hover:scale-125"
                        src={images.defaultCoverPlaylist}
                        alt="playlist-cover"
                    />
                </div>
                <span className="mt-2 text-lg font-bold">{playlistInfo.name}</span>
                <span className="text-xs font-semibold text-[#ffffff80]">
                    Created by <span className="text-white">{playlistInfo.username}</span>
                </span>
                <span className="text-xs font-semibold text-[#ffffff80]">
                    <span className="text-white">{playlistInfo.description}</span>
                </span>
                <PlaylistMenu menuList={playlistMenu} placement="right-start">
                    <span
                        className="grid h-7 w-7 cursor-pointer place-content-center rounded-full bg-[#00000033] p-0.5"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <BsThreeDots />
                    </span>
                </PlaylistMenu>
            </div>
            {/* List songs */}
            <div className="max-h-full w-full flex-auto overflow-y-auto">
                {/* header */}
                <div className="-mx-2 mr-1 flex items-center border-b border-solid border-[#ffffff0d] p-[10px] text-[#ffffff80] [&>*]:px-2">
                    <div className="w-1/2 gap-2">
                        <span>
                            <FaSort />
                        </span>
                        <span>SONG</span>
                    </div>
                    <div className="flex-1">
                        <span>ALBUM</span>
                    </div>
                    <div className="justify-items-end">
                        <span>TIME</span>
                    </div>
                </div>
                {/* ...render playlist */}
                <div className="flex flex-col">
                    {songs.map((item, index) => (
                        <Song key={index} songData={item} inPlaylist />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Playlist;
