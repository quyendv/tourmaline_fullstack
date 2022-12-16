import { useState, useEffect } from 'react';
import * as apis from '../../services';
import { BASE_URL } from '../../utils/constant';
import * as actions from '../../store/actions';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { DefaultMenu as MediaMenu } from '../Popper';
import { icons } from '~/utils/icons';
const {
    BsFillPlayFill,
    BsThreeDots,
    FaRegComment,
    AiOutlineDownload,
    BsLink45Deg,
    RiShareForwardLine,
    AiFillDelete,
    RiPlayListAddLine,
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
    const [mediaSrc, setMediasrc] = useState('');
    const dispatch = useDispatch();

    // useEffect(() => {
    //     const fetchCover = async () => {
    //         setMediasrc(`${BASE_URL}/api/song/getCover?id=${songData.id}`);
    //     };
    //     fetchCover();
    // }, []);
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
                <img
                    className="h-[60px] w-[60px] object-cover"
                    src={`${BASE_URL}/api/song/getCover?id=${songData?.id}`}
                    alt="media-cover"
                />
            </div>
            <div className="flex flex-1 flex-col text-left">
                <span className="text-sm font-medium">{songData?.name}</span>
                <span className="text-xs text-[#ffffff80]">{songData?.uploader}</span>
                <span className="text-xs text-[#ffffff80]">{moment(songData?.uploadTime).fromNow()}</span>
            </div>
            <MediaMenu menuList={songMenu} songId={songData?.id} placement="right-start">
                <span
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    className="absolute top-1/2 right-1 hidden -translate-y-1/2 items-center justify-center rounded-full p-1.5 text-xl hover:bg-[#ffffff1a] group-hover:flex"
                >
                    <BsThreeDots />
                </span>
            </MediaMenu>
        </div>
    );
}

export default MediaItem;
