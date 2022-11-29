import {useEffect, useRef, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';

import * as apis from '../../services/music';
import {icons} from '../../utils/icons';
import * as actions from '../../store/actions';
import {clear} from '@testing-library/user-event/dist/clear';

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
} = icons;

function Player({setIsShowSidebar}) {
    const {curSongId, isPlaying} = useSelector((state) => state.music);

    const [volume, setVolume] = useState(100);
    const [songInfo, setSongInfo] = useState(null);
    const [audio, setAudio] = useState(new Audio());
    const [currentSecond, setCurrentSecond] = useState(0);
    const dispatch = useDispatch();
    const trackRef = useRef();
    const thumbRef = useRef();
    console.log(isPlaying);
    // TODOS
    /*    useEffect(() => {
        const fetchSong = async() => {
            const response = await apis.getSong(1)
        }
        fetchSong()
    },[])*/
    useEffect(() => {
        setAudio(new Audio('https://localhost:5000/api/song/getMedia/1'));

    }, []);
    console.log(audio.duration)
    var intervalId;
    useEffect(() => {
        intervalId && clearInterval(intervalId);

        if (isPlaying && thumbRef.current) {
            audio.pause();
            audio.play();
            intervalId = setInterval(() => {
                setCurrentSecond(audio.currentTime);
                let percent = Math.round((audio.currentTime * 10000) / 255) / 100;
                thumbRef.current.style.cssText = `right:${100 - percent}%`;
            }, 500);
        }
        return () => {
            intervalId && clearInterval(intervalId);
        };
    }, [audio, isPlaying]);
    const handleToggleMusic = () => {
        if (isPlaying) {
            audio.pause();
            dispatch(actions.play(false));
        } else {
            audio.play();
            dispatch(actions.play(true));
        }
    };
    useEffect(() => {
        audio.volume = volume / 100;
    }, [volume]);
    const handleClickProgressbar = (e) => {
        const trackkRect = trackRef.current.getBoundingClientRect();
        const percent = Math.round(((e.clientX - trackkRect.left) * 10000) / trackkRect.width) / 100;
        audio.currentTime = (percent * 255) / 100;
        thumbRef.current.style.cssText = `right: ${100 - percent}%`;
        setCurrentSecond(audio.currentTime);
    };
    return (
        <div className="flex h-full text-white">
            {/* //Songdetai */}
            <div className="w-[30%] border border-white">Songdetail</div>

            <div className="flex w-[40%] flex-col items-center justify-center gap-2 border border-white">
                {/* //Main Player */}
                <div className="flex items-center justify-center gap-8">
                    <span className="cursor-pointer">
                        <CiShuffle size={24}/>
                    </span>
                    <span className="cursor-pointer">
                        <MdSkipPrevious size={24}/>
                    </span>
                    <span onClick={handleToggleMusic} className="cursor-pointer rounded-full border border-white p-1">
                        {!isPlaying ? (
                            <BsFillPlayFill size={24} className="mr-[-1px]"/>
                        ) : (
                            <BsPauseFill size={24} className="mr-[-1px]"/>
                        )}
                    </span>
                    <span className="cursor-pointer">
                        <MdSkipNext size={24}/>
                    </span>
                    <span className="cursor-pointer">
                        <CiRepeat size={24}/>
                    </span>
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
                            className="absolute top-0 left-0 bottom-0 rounded-r-full rounded-l-full bg-activecolor"
                        ></div>
                    </div>
                    <span>{moment.utc(255 * 1000).format('mm:ss')}</span>
                </div>
            </div>

            <div className="flex w-[30%] items-center justify-end gap-2 border border-white p-2">
                <span className='cursor-pointer' onClick={() => setVolume(prev => {
                    if (prev == 0) {
                        setVolume(100)
                    } else {
                        setVolume(0)
                    }
                })}> {volume > 70 ? <SlVolume2/> : volume == 0 ? <SlVolumeOff/> : <SlVolume1/>} </span>
                <input
                    className="cursor-pointer"
                    type="range"
                    min={0}
                    max={100}
                    step={1}
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                />
                <span className="cursor-pointer" onClick={() => setIsShowSidebar((prev) => !prev)}>
                    <BsMusicNoteList/>
                </span>
            </div>
        </div>
    );
}

export default Player;
