import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import PlaylistPlaceHolder from '../../assets/images/playlistplaceholder.png';
import { deletePlaylist } from '../../services/music';
import { icons } from '../../utils/icons';
import { DefaultMenu as PlaylistMenu } from '../Popper';

const {
    BsFillPlayFill,
    BsThreeDots,
    FaRegComment,
    AiOutlineDownload,
    BsLink45Deg,
    RiShareForwardLine,
    AiOutlineClose,
    AiFillDelete
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
    const location = useLocation()
    
    const path = `${playlistData.name.replaceAll(' ', '-')}/${playlistData.id}`;
    const link = (location.pathname === '/library' ? '/playlist' : '') + path
    const { token } = useSelector((state) => state.auth);
    
    const handleDeletePlaylist = async (e) => {
        e.stopPropagation();
        const response = await deletePlaylist(playlistData.id, token);
        console.log(response);
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
                    <PlaylistMenu menuList={playlistMenu} placement="bottom-start">
                        <span
                            className="grid h-6 w-6 place-content-center rounded-full bg-[#00000033] p-0.5"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <BsThreeDots />
                        </span>
                    </PlaylistMenu>
                </div>
                <img
                    className="w-full rounded-md object-contain transition-all duration-500 group-hover:scale-125"
                    src={PlaylistPlaceHolder}
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
                <span className="text-[color:#7a7581] text-xs font-semibold">{playlistData.username}</span>
            </span>
        </div>
    );
}

export default PlaylistItem;
