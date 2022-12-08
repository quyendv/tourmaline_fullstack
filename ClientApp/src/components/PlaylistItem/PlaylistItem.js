import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PlaylistPlaceHolder from '../../assets/images/playlistplaceholder.png';
import { icons } from '../../utils/icons';
import { deletePlaylist } from '../../services/music';
import { useSelector } from 'react-redux';
import { DefaultMenu as PlaylistMenu } from '../Popper';

const {
    AiFillCloseCircle,
    BsFillPlayFill,
    BsThreeDots,
    FaRegComment,
    AiOutlineDownload,
    BsLink45Deg,
    RiShareForwardLine,
    AiOutlineClose,
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
];

function PlaylistItem({ playlistData }) {
    const imgRef = useRef();
    const navigate = useNavigate();
    const location = useLocation()
    
    const path = `${playlistData.name.replaceAll(' ', '-')}/${playlistData.id}`;
    const link = (location.pathname == '/library' ? '/playlist' : '') + path
    const [isHover, setIsHover] = useState(false);
    const { token } = useSelector((state) => state.auth);
    const handleHover = (e) => {
        setIsHover(true);
        imgRef.current.classList.add('animate-scale-up-image');
        imgRef.current.classList.remove('animate-scale-down-image');
    };
    const handleLeave = (e) => {
        setIsHover(false);
        imgRef.current.classList.add('animate-scale-down-image');
        imgRef.current.classList.remove('animate-scale-up-image');
    };
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
        <div className="flex w-full flex-col gap-2 py-2">
            <div
                className="relative w-full overflow-hidden rounded-md"
                onClick={() =>
                    navigate(link, {
                        state: playlistData,
                    })
                }
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
            >
                {isHover && (
                    <div className="absolute top-0 right-0 left-0 bottom-0 z-20 flex cursor-pointer items-center justify-center gap-3 rounded-md  bg-overlay-30 ">
                        <span className="inline-block rounded-full bg-[#00000033] p-1" onClick={handleDeletePlaylist}>
                            <AiOutlineClose size={24} />
                        </span>
                        <span className="inline-block rounded-full bg-[#00000033] p-1" onClick={handleClickPlay}>
                            <BsFillPlayFill size={24} />
                        </span>
                        <PlaylistMenu menuList={playlistMenu} placement="bottom-start">
                            <span
                                className="inline-block rounded-full bg-[#00000033] p-1"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <BsThreeDots size={24} />
                            </span>
                        </PlaylistMenu>
                    </div>
                )}
                <img
                    ref={imgRef}
                    className="w-full rounded-md object-contain"
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
                <span className="text-xs font-semibold text-gray-300">{playlistData.username}</span>
            </span>
        </div>
    );
}

export default PlaylistItem;
