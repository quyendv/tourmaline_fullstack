import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import * as apis from '../../services/music';
import { icons } from '../../utils/icons';

const { BsFillPlayFill, CiShuffle, BsPauseFill, MdSkipNext, MdSkipPrevious, CiRepeat, BsMusicNoteList } = icons;
function Player({setIsShowSidebar}) {
    const { curSongId,isPlaying } = useSelector((state) => state.music);


    const [volume, setVolume] = useState(100);
    const [songInfo, setSongInfo] = useState(null);
    const [audio, setAudio] = useState(new Audio())

    
    // TODOS
/*    useEffect(() => {
        const fetchSong = async() => {
            const response = await apis.getSong(1)
        }
        fetchSong()
    },[])*/
    
    return (
        <div className="flex h-full text-white">
            {/* //Songdetai */}
            <div className="w-[30%] border border-white">Songdetail</div>

            <div className="flex w-[40%] flex-col items-center justify-center border border-white">
                {/* //Main Player */}
                <div className='flex justify-center items-center gap-8'>
                    <span className='cursor-pointer'>
                        <CiShuffle size={24} />
                    </span>
                    <span className='cursor-pointer'>
                        <MdSkipPrevious size={24} />
                    </span>
                    <span className='cursor-pointer border border-white p-1 rounded-full'>
                        <BsFillPlayFill size={24} className="mr-[-1px]" />
                    </span>
                    <span className='cursor-pointer'>
                        <MdSkipNext size={24} />
                    </span>
                    <span className='cursor-pointer'>
                        <CiRepeat size={24} />
                    </span>
                </div>
                <div> Progress bar</div>
            </div>

            <div className="flex w-[30%] items-center justify-end border border-white gap-2 p-2">
                <input
                    className='cursor-pointer'
                    type="range"
                    min={0}
                    max={100}
                    step={1}
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                />
                <span className='cursor-pointer' onClick={() => setIsShowSidebar(prev => !prev)}><BsMusicNoteList/></span>
            </div>
        </div>
    );
}

export default Player;
