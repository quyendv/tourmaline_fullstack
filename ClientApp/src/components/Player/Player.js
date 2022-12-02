import {useEffect, useRef, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';

import * as apis from '../../services/music';
import {icons} from '../../utils/icons';
import * as actions from '../../store/actions';
import {clear} from '@testing-library/user-event/dist/clear';


import avatarSong from '../../assets/images/Pop.svg'
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
    const audio = useRef()
    const [currentSecond, setCurrentSecond] = useState(0);
    const [duration, setDuration] = useState(0)
    const dispatch = useDispatch();
    const trackRef = useRef();
    const thumbRef = useRef();
    // TODOS
    
    useEffect(() => {

        let src
        src = curSongId === 1 ?  'http://media.w3.org/2010/05/sound/sound_90.mp3' : 'https://vnno-pt-4-tf-mp3-s1-m-zmp3.zmdcdn.me/8180715f2f1ec6409f0f/1039021604412062272?authen=exp=1669952480~acl=/8180715f2f1ec6409f0f/*~hmac=c1d40db9108312521ee50d6af1b0cd38'
        audio.current.pause()
        audio.current.src = src     
        audio.current.onloadedmetadata = (e) => {
            if(audio.current.readyState > 0) {
                setDuration(audio.current.duration)
            }
        }
        console.log(audio.current)
    }, [curSongId])
    var intervalId;
    useEffect(() => {
        intervalId && clearInterval(intervalId);

        if (isPlaying && thumbRef.current) {
            audio.current.pause();
            audio.current.play();
            intervalId = setInterval(() => {
                setCurrentSecond(audio.current.currentTime);
                let percent = Math.round((audio.current.currentTime * 10000) / duration) / 100;
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
    useEffect(() => {
        const handleEnd = () => {
            audio.current.pause();
            dispatch(actions.play(false))
        }
        audio.current.addEventListener('ended', handleEnd);
        return () => {
            audio.current.removeEventListener('ended', handleEnd)
        }
    },[audio])
    const handleClickProgressbar = (e) => {
        const trackkRect = trackRef.current.getBoundingClientRect();
        const percent = Math.round(((e.clientX - trackkRect.left) * 10000) / trackkRect.width) / 100;
        audio.current.currentTime = (percent * duration) / 100;
        thumbRef.current.style.cssText = `right: ${100 - percent}%`;
        setCurrentSecond(audio.current.currentTime);
    };
    return (
        <div className="flex h-full text-white">
            {/* //Songdetai */}
            <div className="w-[30%] border border-white flex items-center gap-4 px-4">
                <img className={`w-[60px] h-[60px] object-cover ${isPlaying ? 'rounded-full animate-rotate-center ' : ''}`} src={avatarSong}/>
                <div>
                    <h3 className='text-sm'>Song</h3>
                    <span className='text-xs opacity-70'>Artist name</span>
                </div>
            </div>

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
                            className="absolute top-0 left-0 bottom-0 rounded-r-full rounded-l-full bg-activecolor"
                        ></div>
                    </div>
                    <span>{moment.utc((duration || 0 ) * 1000).format('mm:ss')}</span>
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
