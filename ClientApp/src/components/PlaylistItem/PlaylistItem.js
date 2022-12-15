import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { images } from '~/assets/images';
import { deletePlaylist } from '../../services/music';
import { icons } from '../../utils/icons';
import { DefaultMenu as PlaylistMenu } from '../Popper';
import * as apis from '../../services'
import { useEffect } from 'react';

const {
    BsFillPlayFill,
    BsThreeDots,
    FaRegComment,
    AiOutlineDownload,
    BsLink45Deg,
    RiShareForwardLine,
    AiOutlineClose,
    AiFillDelete,
} = icons;

const playlistMenu = [
    {
        icon: <FaRegComment />,
        title: 'Comments',
        to: '',
    },
    {
        icon: <AiOutlineDownload />,
        title: 'Download',
        to: '',
    },
    {
        icon: <BsLink45Deg />,
        title: 'Copy link',
        to: '',
    },
    {
        icon: <RiShareForwardLine />,
        title: 'Share',
        to: '',
    },
    {
        icon: <AiFillDelete />,
        title: 'Delete',
        to: '',
    },
];

function PlaylistItem({ playlistData, className }) {
    const navigate = useNavigate();
    const location = useLocation();

    const path = `${playlistData.name.replaceAll(' ', '-')}/${playlistData.id}`;
    const link = (location.pathname === '/library' ? '/playlist/' : '') + path;
    const { token } = useSelector((state) => state.auth);
    const { createPlaylist, createAllPlaylist } = useSelector((state) => state.actions);

    const handleDeletePlaylist = async (e) => {
        e.stopPropagation();
        const response = await deletePlaylist(playlistData.id, token);

        createPlaylist((prev) => prev.filter((item) => item.id !== playlistData.id));
        createAllPlaylist((prev) => prev.filter((item) => item.id !== playlistData.id));
    };
    const handleClickPlay = (e) => {
        e.stopPropagation();
        //
    };

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <div
                className="group relative w-full overflow-hidden rounded-md"
                onClick={() =>
                    navigate(link, {
                        state: playlistData,
                    })
                }
            >
                <div className="absolute inset-0 z-20 hidden cursor-pointer items-center justify-center gap-3 rounded-md bg-overlay-30  group-hover:flex ">
                    <span
                        className="grid h-6 w-6 place-content-center rounded-full bg-[#00000033] p-0.5"
                        onClick={handleDeletePlaylist}
                    >
                        <AiOutlineClose />
                    </span>
                    <span
                        className="grid h-6 w-6 place-content-center rounded-full bg-[#00000033] p-0.5"
                        onClick={handleClickPlay}
                    >
                        <BsFillPlayFill />
                    </span>
                    <PlaylistMenu menuList={playlistMenu} placement="bottom-start" appendBody>
                        <span
                            className="grid h-6 w-6 place-content-center rounded-full bg-[#00000033] p-0.5"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <BsThreeDots />
                        </span>
                    </PlaylistMenu>
                </div>
                <img
                    className="w-full rounded-md object-cover transition-all duration-500 group-hover:scale-125"
                    src={images.defaultCoverPlaylist}
                    alt="playlist-cover"
                />
            </div>
            <span className="flex flex-col">
                <span
                    onClick={() =>
                        navigate(link, {
                            state: playlistData,
                        })
                    }
                    className="cursor-pointer text-sm font-bold hover:text-activecolor"
                >
                    {playlistData.name}
                </span>
                <span className="text-xs font-semibold text-[color:#7a7581]">{playlistData.username}</span>
            </span>
        </div>
    );
}

export default PlaylistItem;
