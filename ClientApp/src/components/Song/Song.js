import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSong } from '../../services/music';
import * as apis from '../../services';
import * as actions from '../../store/actions';
import { BASE_URL } from '../../utils/constant';
import { icons } from '../../utils/icons';
import { toast } from 'react-toastify';
import { DefaultMenu as SongMenu } from '../Popper';
import Pop from '../../assets/images/Pop.svg';
import moment from 'moment';
import { memo } from 'react';
import LazyLoad from 'react-lazy-load';

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
    AiOutlinePlusCircle,
    RiPlayListAddLine,
    AiOutlineEdit,
    IoMdRemoveCircleOutline,
} = icons;
// TODO: Song list sửa sau

function Song({ songData, inPlaylist }) {
    const [songMenu, setSongMenu] = useState([
        {
            id: songData.id,
            type: 'addToNext',
            icon: <RiPlayListAddLine />,
            title: 'Add to Next up',
            to: '',
        },
        {
            id: songData.id,
            type: '',
            icon: <FaRegComment />,
            title: 'Comments',
            to: '',
        },
        {
            id: songData.id,
            type: '',
            icon: <AiOutlineDownload />,
            title: 'Download',
            to: '',
        },
        {
            id: songData.id,
            type: 'addtoplaylist',

            icon: <AiOutlinePlusCircle />,
            title: 'Add to Playlist',
            to: '',
            // rightIcon: ''
            children: {
                title: 'Playlist',
                data: [
                    // Cái này khả năng đưa vào trong component gọi ra thôi
                ],
            },
        },
        {
            id: songData.id,
            icon: <RiShareForwardLine />,
            title: 'Share',
            to: '',
        },
        {
            id: songData.id,
            type: 'editSong',
            icon: <AiOutlineEdit />,
            title: 'Edit',
            to: '',
            songAvatar: '',
            setInfo: function () {},
            setSongAvatar: function () {},
        },
        {
            id: songData.id,
            type: 'deleteSong',
            to: '',
            icon: <AiFillDelete />,
            title: 'Delete',
        },
    ]);
    console.log(songMenu);
    const dispatch = useDispatch();
    const { curSongId, isPlaying, curPlaylist } = useSelector((state) => state.music);
    const { token } = useSelector((state) => state.auth);
    const { favoriteSongs } = useSelector((state) => state.favorite);
    const [favorite, setFavorite] = useState(false); // lấy trạng thái init từ db truyền vào
    useEffect(() => {
        favoriteSongs.forEach((item) => {
            if (item.id == songData.id) {
                setFavorite(true);
            }
        });
    }, []);
    const [info, setInfo] = useState(songData);
    const [songAvatar, setSongAvatar] = useState('');

    useEffect(() => {
        songAvatar && URL.revokeObjectURL(songAvatar);
        let url;
        const fetchAvatar = async () => {
            const response = await apis.getCover(songData.id);
            const blob = new Blob([response.data], { type: 'image/png' });
            url = URL.createObjectURL(blob);
            setSongAvatar(url);
        };
        fetchAvatar();
        return () => {
            URL.revokeObjectURL(url);
        };
    }, []);
    useEffect(() => {
        if (songMenu[5].songAvatar != songAvatar) {
            const newArr = songMenu;
            newArr[5].songAvatar = songAvatar;
        }
    }, [songAvatar]);

    useEffect(() => {
        inPlaylist &&
            songMenu[songMenu.length - 1].type != 'removeFromPlaylist' &&
            setSongMenu((prev) =>
                prev.push({
                    type: 'removeFromPlaylist',
                    to: '',
                    icon: <IoMdRemoveCircleOutline />,
                    title: 'Remove from playlist',
                }),
            );
        inPlaylist && songMenu.filter((item) => item.type != 'removeFromPlaylist');
        curPlaylist.forEach((item) => {
            const obj = {
                id: item.id,
                type: 'playlist',
                to: '',
                icon: '',
                title: item.name,
            };
            if (!songMenu[3].children.data.some((item) => item.id === obj.id)) {
                const newArr = songMenu;
                newArr[3].children.data.push(obj);
                console.log(newArr);
                setSongMenu(newArr);
            }
            if (songMenu[5].setInfo != setInfo) {
                const newArr = songMenu;
                newArr[5].setInfo = setInfo;
                setSongMenu(newArr);
            }
            if (songMenu[5].setSongAvatar != setSongAvatar) {
                const newArr = songMenu;
                newArr[5].setSongAvatar = setSongAvatar;
                setSongMenu(newArr);
            }
        });
    }, [songData.id]);
    // Đoạn delete này đưa vào cái songMenu ấy, có phần delete

    const handleAddFavorite = async (e) => {
        e.stopPropagation();
        const prevState = favorite;
        setFavorite((prev) => !prev);
        // Gọi API lưu thông tin favorite song vào db ...
        if (!prevState) {
            const response = await apis.addToFavorite(songData.id, token);
            response.status == 200 && dispatch(actions.setFavorite(songData.id));
        } else {
            const response = await apis.removeFromFavorite(songData.id, token);
            response.status == 200 && dispatch(actions.removeFavorite(songData.id));
        }

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
        <div
            className="Song group -mx-2 flex w-full cursor-pointer items-center border-b border-solid border-[#ffffff0d] p-[10px] text-[#ffffff80] [&>*]:px-2"
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
                    <LazyLoad height={40} width={40} threshold={0.5} place>
                        <img className="h-10 w-10 object-cover" src={songAvatar} alt="song-cover" />
                    </LazyLoad>
                </div>
                <div className="flex flex-col gap-[3px]">
                    <span className="text-sm text-white">{info.name}</span>
                    <span className="text-sm hover:text-[#c273ed] hover:underline">Various artist</span>
                </div>
            </div>
            {/* Content Part */}
            <div className="flex-1 text-sm">
                <p>{info.description} (Single)</p>
            </div>

            {/* Right Part: time and actions */}
            <div className="flex items-center justify-items-end gap-4 text-sm">
                <span className="hidden items-center justify-center rounded-full p-1.5 text-xl hover:bg-[#ffffff1a] group-hover:flex">
                    <TfiMicrophoneAlt />
                </span>
                <span
                    className="flex items-center justify-center rounded-full p-1.5 text-xl hover:bg-[#ffffff1a]"
                    onClick={handleAddFavorite}
                >
                    {!favorite ? (
                        <AiOutlineHeart className="hidden group-hover:block" />
                    ) : (
                        <AiTwotoneHeart className="text-[var(--favorite-bg)] [filter:drop-shadow(0_0_10px_currentColor)]" />
                    )}
                </span>
                <SongMenu menuList={songMenu} songId={songData?.id}>
                    <span
                        onClick={(e) => e.stopPropagation()}
                        className="hidden rounded-full p-1.5 text-xl hover:bg-[#ffffff1a] group-hover:flex"
                    >
                        <BsThreeDots />
                    </span>
                </SongMenu>
                <span className="block items-center justify-center group-hover:hidden">
                    {moment.utc((songData?.duration || 0) * 1000).format('mm:ss')}
                </span>
            </div>
        </div>
    );
}

export default memo(Song);
