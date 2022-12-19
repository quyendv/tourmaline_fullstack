import { useState, useEffect } from 'react';
import * as apis from '../../services';
import { BASE_URL } from '../../utils/constant';
import * as actions from '../../store/actions';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { DefaultMenu as MediaMenu } from '../Popper';
import { icons } from '~/utils/icons';
import { toast } from 'react-toastify';
import LazyLoad from 'react-lazy-load';

const {
    BsFillPlayFill,
    BsThreeDots,
    FaRegComment,
    AiOutlineDownload,
    BsLink45Deg,
    RiShareForwardLine,
    AiFillDelete,
    RiPlayListAddLine,
    AiOutlineHeart,
    AiTwotoneHeart,
} = icons;

// TODO: Media list sửa sau
const songMenu = [
    {
        type: 'addToNext',
        icon: <RiPlayListAddLine />,
        title: 'Add to Next up',
        to: '',
    },
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

function MediaItem({ songData }) {
    const dispatch = useDispatch();
    const [favorite, setFavorite] = useState(false); // lấy init từ db

    // useEffect(() => {
    //     const fetchCover = async () => {
    //         setMediasrc(`${BASE_URL}/api/song/getCover?id=${songData.id}`);
    //     };
    //     fetchCover();
    // }, []);

    const handleAddFavorite = async (e) => {
        e.stopPropagation();
        const prevState = favorite;
        setFavorite((prev) => !prev);
        // Gọi API lưu thông tin favorite song vào db ...
        // if (!prevState) {
        //     const response = await apis.addToFavorite(songData.id, token);
        //     response.status == 200 && dispatch(actions.setFavorite(songData.id));
        // } else {
        //     const response = await apis.removeFromFavorite(songData.id, token);
        //     response.status == 200 && dispatch(actions.removeFavorite(songData.id));
        // }

        // Show toast
        toast.success(`${!prevState ? 'Added to' : 'Removed form'} favorites`, {
            position: 'top-left',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
        });
    };

    return (
        <div className="mediaItem group relative flex items-center gap-3 rounded-md p-2 hover:bg-[#ffffff1a]">
            <div className="relative after:inset-0 after:bg-overlay-30 group-hover:after:absolute">
                <span
                    className="absolute top-1/2 left-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 cursor-pointer  p-1 group-hover:block"
                    onClick={() => {
                        dispatch(actions.setCurSongId(songData?.id));
                        dispatch(actions.play(true));
                    }}
                >
                    <BsFillPlayFill size={26} />
                </span>
                <LazyLoad>
                    <img
                        className="h-[60px] w-[60px] object-cover"
                        src={`${BASE_URL}/api/song/getCover?id=${songData?.id}`}
                        alt="media-cover"
                    />
                </LazyLoad>
            </div>
            <div className="flex flex-1 flex-col text-left">
                <span className="text-sm font-medium">{songData?.name}</span>
                <span className="text-xs text-[#ffffff80]">{songData?.uploader}</span>
                <span className="text-xs text-[#ffffff80]">{moment(songData?.uploadTime).fromNow()}</span>
            </div>
            {/* Actions */}
            <div className="absolute top-1/2 right-1 -translate-y-1/2 gap-2 group-hover:flex">
                <span
                    className="flex items-center justify-center rounded-full p-1.5 text-xl text-[#ffffff80] hover:bg-[#ffffff1a]"
                    onClick={handleAddFavorite}
                >
                    {!favorite ? (
                        <AiOutlineHeart className="hidden group-hover:block" />
                    ) : (
                        <AiTwotoneHeart className="text-[var(--favorite-bg)] [filter:drop-shadow(0_0_10px_currentColor)]" />
                    )}
                </span>
                <MediaMenu menuList={songMenu} songId={songData?.id} appendBody placement="right-start">
                    <span
                        className="hidden items-center justify-center rounded-full p-1.5 text-xl text-[#ffffff80] hover:bg-[#ffffff1a] group-hover:flex"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <BsThreeDots />
                    </span>
                </MediaMenu>
            </div>
        </div>
    );
}

export default MediaItem;
