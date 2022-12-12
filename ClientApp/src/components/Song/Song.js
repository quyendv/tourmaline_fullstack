import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSong } from '../../services/music';
import * as actions from '../../store/actions';
import { BASE_URL } from '../../utils/constant';
import { icons } from '../../utils/icons';
import { toast } from 'react-toastify';
import { DefaultMenu as SongMenu } from '../Popper';
import Pop from '../../assets/images/Pop.svg';
import moment from 'moment';

const {
    BsLink45Deg,
    AiOutlineDownload,
    FaRegComment,
    BsMusicNoteBeamed,
    AiOutlineHeart,
    TfiMicrophoneAlt,
    BsThreeDots,
    AiTwotoneHeart,
    RiShareForwardLine,
    AiFillDelete,
} = icons;
// TODO: Song list sửa sau
const songMenu = [
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

function Song({ songData, setSongsUploaded }) {
    // TODO: hardcode
    const defaultSrc = 'https://taogroup.com/wp-content/uploads/2022/01/Alan-Walker-1.jpg';

    const dispatch = useDispatch();
    const { curSongId, isPlaying } = useSelector((state) => state.music);
    const { token } = useSelector((state) => state.auth);
    const [src, setSrc] = useState('');
    const [favorite, setFavorite] = useState(false); // lấy trạng thái init từ db truyền vào

    useEffect(() => {
        const fetchCover = async () => {
            setSrc(`${BASE_URL}/api/song/getCover?id=${songData.id}`);
        };
        fetchCover();
    }, []);
    // Đoạn delete này đưa vào cái songMenu ấy, có phần delete
    const handleDelete = async (e) => {
        e.stopPropagation();
        const index = songData.id;
        const response = await deleteSong(songData.id, token);
        setSongsUploaded((prev) => prev.filter((item) => item.id !== index));
    };
    const handleAddFavorite = (e) => {
        setFavorite((prev) => !prev);
        // Gọi API lưu thông tin favorite song vào db ...

        // Show toast
        toast.success(`${favorite ? 'Added to' : 'Removed form'} favorites`, {
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
        <div
            className="group -mx-2 flex w-full cursor-pointer items-center border-b border-solid border-[#ffffff0d] p-[10px] text-[#ffffff80] [&>*]:px-2"
            onClick={() => {
                songData.id !== curSongId && dispatch(actions.setCurSongId(songData.id));
                dispatch(actions.play(true));
            }}
        >
            {/* Left Part */}
            <div className="flex w-1/2 items-center gap-2">
                <div>
                    <BsMusicNoteBeamed />
                </div>
                <div>
                    <img className="h-10 w-10 object-cover" src={src} alt="song-cover" />
                </div>
                <div className="flex flex-col gap-[3px]">
                    <span className="text-sm text-white">{songData.name}</span>
                    <span className="text-sm hover:text-[#c273ed] hover:underline">Various artist</span>
                </div>
            </div>
            {/* Content Part */}
            <div className="flex-1 text-sm">
                <p>{songData.name} (Single)</p>
            </div>
            {/* <span className='border border-white p-2' onClick={handleDelete}>
                <AiFillCloseCircle/>
            </span>

            {/* Right Part: time and actions */}
            <div className="flex items-center justify-items-end gap-4 text-sm">
                {/* <div className="hidden  group-hover:flex"> */}
                <span className="hidden rounded-full px-1.5 py-0.5 text-xl hover:bg-[#ffffff1a] group-hover:block">
                    <TfiMicrophoneAlt />
                </span>
                <span className="rounded-full px-1.5 py-0.5 text-xl hover:bg-[#ffffff1a]" onClick={handleAddFavorite}>
                    {!favorite ? (
                        <AiOutlineHeart className="hidden group-hover:block" />
                    ) : (
                        <AiTwotoneHeart className="text-[#9b4de0] [filter:drop-shadow(0_0_10px_currentColor)]" />
                    )}
                </span>
                {/* </div> */}
                <SongMenu menuList={songMenu} songId = {songData.id}>
                    <span onClick={(e) => {e.stopPropagation()}} className="hidden rounded-full px-1.5 py-0.5 text-xl hover:bg-[#ffffff1a] group-hover:block">
                        <BsThreeDots />
                    </span>
                </SongMenu>
                <span className="block group-hover:hidden">{moment.utc((songData.duration || 0) * 1000).format('mm:ss')}</span>
                {/* <div ">02:29</div> hardcode */}
            </div>
        </div>
    );
}

export default Song;
