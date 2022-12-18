import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import { icons } from '../../utils/icons';
import * as actions from '../../store/actions';
import { getInfoSong, getSong } from '../../services/music';
import { BASE_URL } from '../../utils/constant';
import { AudioLoading } from '../Load';

const {
    BsFillPlayFill,
    CiShuffle,
    BsPauseFill,
    MdSkipNext,
    MdSkipPrevious,
    CiRepeat,
    BsMusicNoteList,
    SlVolume1,
    SlVolume2,
    SlVolumeOff,
    RiRepeatOneLine,
} = icons;

function Player({ setIsShowSidebar }) {
    const { curSongId, isPlaying, nextUpSong, prevSong } = useSelector((state) => state.music);

    const { token } = useSelector((state) => state.auth);
    const [volume, setVolume] = useState(100);
    const [songInfo, setSongInfo] = useState({});
    const [imageSong, setImageSong] = useState('');
    const audio = useRef();
    const [currentSecond, setCurrentSecond] = useState(0);
    const [isShuffle, setIsShuffle] = useState(false);
    const [isRepeat, setIsRepeat] = useState(0);
    const dispatch = useDispatch();
    const trackRef = useRef();
    const thumbRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    // TODOS

    useEffect(() => {
        dispatch(actions.addToPrev(curSongId));
        console.log('test');
        const fetchSong = async () => {
            setIsLoading(true);
            try {
                const response = await getSong(curSongId, token);
                if (response.status == 200) {
                    const blob = new Blob([response.data], { type: 'audio/mpeg' });
                    const url = URL.createObjectURL(blob);
                    if (audio.current) audio.current.src = url;
                }
            } catch (error) {
                dispatch(actions.play(false));
                setIsLoading(false);
            }

            setIsLoading(false);
        };
        fetchSong();
        const fetchInfoSong = async () => {
            const response = await getInfoSong(curSongId, token);
            setSongInfo(response.data);
        };

        fetchInfoSong();
        const fetchImageSong = async () => {
            setImageSong(`${BASE_URL}/api/song/getCover?id=${curSongId}`);
        };
        fetchImageSong();
    }, [curSongId]);
    var intervalId;
    useEffect(() => {
        intervalId && clearInterval(intervalId);
        audio.current.pause();

        if (isPlaying && thumbRef.current) {
            // audio.current.load();
            audio.current.play();
            intervalId = setInterval(() => {
                setCurrentSecond(audio.current.currentTime);
                let percent = Math.round((audio.current.currentTime * 10000) / songInfo.duration) / 100;
                thumbRef.current.style.cssText = `right:${100 - percent}%`;
            }, 200);
        }
        return () => {
            intervalId && clearInterval(intervalId);
        };
    }, [audio.current?.src, isPlaying]);
    const handleToggleMusic = () => {
        if (isPlaying) {
            audio.current.pause();
            dispatch(actions.play(false));
        } else {
            audio.current.play();
            dispatch(actions.play(true));
        }
    };
    useEffect(() => {
        audio.current.volume = volume / 100;
    }, [volume]);
    const handleRepeatOnce = () => {
        audio.current.play();
    };

    useEffect(() => {
        const handleShuffle = () => {
            const randomIndex = Math.round(Math.random() * (nextUpSong?.length - 1));
            console.log(randomIndex);
            dispatch(actions.setCurSongId(nextUpSong[randomIndex].id));
            dispatch(actions.removeFromNextUp(nextUpSong[randomIndex].id));
            console.log(nextUpSong);
            dispatch(actions.play(true));
        };
        const handleEnd = () => {
            if (isShuffle) {
                handleShuffle();
            } else if (!isShuffle && isRepeat == 2) {
                handleRepeatOnce();
            } else if (!isShuffle && isRepeat == 1) {
                handleNextSong();
            } else if (!isShuffle && isRepeat == 0) {
                audio.current.pause();
                dispatch(actions.play(false));
            }
        };
        audio.current.addEventListener('ended', handleEnd);
        return () => {
            audio.current && audio.current.removeEventListener('ended', handleEnd);
        };
    }, [audio, isRepeat, isShuffle, nextUpSong]);
    const handleClickProgressbar = (e) => {
        const trackkRect = trackRef.current.getBoundingClientRect();
        const percent = Math.round(((e.clientX - trackkRect.left) * 10000) / trackkRect.width) / 100;
        audio.current.currentTime = (percent * songInfo.duration) / 100;
        thumbRef.current.style.cssText = `right: ${100 - percent}%`;
        setCurrentSecond(audio.current.currentTime);
    };

    const handleNextSong = (e) => {
        console.log(prevSong);
        dispatch(actions.setCurSongId(nextUpSong[0].id));
        dispatch(actions.play(true));
        dispatch(actions.removeFromNextUp(nextUpSong[0].id));
    };
    const handlePrevSong = (e) => {
        const index = prevSong.indexOf(curSongId);
        console.log(index);
        dispatch(actions.removeFromPrev(curSongId));
        dispatch(actions.setCurSongId(prevSong[index + 1]));
    };
    return (
        <div className="Player flex h-full items-center text-white">
            {/* //Songdetai */}
            <div className="flex w-[30%] items-center gap-4 ">
                <img
                    className={`h-[60px] w-[60px] object-cover ${
                        isPlaying ? 'animate-rotate-center rounded-full ' : ''
                    }`}
                    src={imageSong}
                />
                <div>
                    <h3 className="text-sm">{songInfo?.name}</h3>
                    <span className="text-xs opacity-70">{`uploaded by ${songInfo?.uploader}`}</span>
                </div>
            </div>

            <div className="flex w-[40%] flex-col items-center justify-center gap-2 ">
                {/* //Main Player */}
                <div className="flex items-center justify-center gap-8">
                    <span
                        onClick={() => setIsShuffle((prev) => !prev)}
                        className={`${isShuffle && 'text-active-color'} cursor-pointer`}
                    >
                        <CiShuffle size={24} />
                    </span>
                    <span
                        onClick={handlePrevSong}
                        className={`cursor-pointer ${prevSong.length <= 2 && ' text-gray-600'}`}
                    >
                        <MdSkipPrevious size={24} />
                    </span>
                    <span onClick={handleToggleMusic} className="cursor-pointer rounded-full border border-white p-1">
                        {isLoading ? (
                            <AudioLoading />
                        ) : !isPlaying ? (
                            <BsFillPlayFill size={24} className="mr-[-1px]" />
                        ) : (
                            <BsPauseFill size={24} className="mr-[-1px]" />
                        )}
                    </span>
                    <span
                        onClick={handleNextSong}
                        className={`cursor-pointer ${nextUpSong.length == 0 && 'pointer-events-none text-gray-600'}`}
                    >
                        <MdSkipNext size={24} />
                    </span>
                    <span
                        onClick={() => setIsRepeat((prev) => (prev == 2 ? 0 : prev + 1))}
                        className={`cursor-pointer ${isRepeat > 0 && 'text-active-color'}`}
                    >
                        {isRepeat == 2 ? <RiRepeatOneLine size={24} /> : <CiRepeat size={24} />}
                    </span>
                    <audio ref={audio}> </audio>
                </div>
                <div className="flex w-full items-center justify-center gap-2 text-sm">
                    <span>{moment.utc(currentSecond * 1000).format('mm:ss')}</span>
                    <div
                        onClick={handleClickProgressbar}
                        ref={trackRef}
                        className="relative h-[3px] w-3/4 cursor-pointer rounded-r-full rounded-l-full bg-[#fff] hover:h-[6px]"
                    >
                        <div
                            ref={thumbRef}
                            className="bg-activecolor absolute top-0 left-0 bottom-0 rounded-r-full rounded-l-full"
                        ></div>
                    </div>
                    <span>{moment.utc((songInfo?.duration || 0) * 1000).format('mm:ss')}</span>
                </div>
            </div>

            <div className="flex w-[30%] items-center justify-end gap-2 p-2">
                <span
                    className="cursor-pointer"
                    onClick={() =>
                        setVolume((prev) => {
                            if (prev == 0) {
                                setVolume(100);
                            } else {
                                setVolume(0);
                            }
                        })
                    }
                >
                    {' '}
                    {volume > 70 ? <SlVolume2 /> : volume == 0 ? <SlVolumeOff /> : <SlVolume1 />}{' '}
                </span>
                <input
                    className="font cursor-pointer"
                    type="range"
                    min={0}
                    max={100}
                    step={1}
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                />
                <span className="cursor-pointer" onClick={() => setIsShowSidebar((prev) => !prev)}>
                    <BsMusicNoteList />
                </span>
            </div>
        </div>
    );
}

export default Player;
