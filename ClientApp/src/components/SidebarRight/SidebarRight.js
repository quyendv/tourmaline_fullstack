import { icons } from '../../utils/icons';
import { useEffect, useState } from 'react';
import MediaItem from '../MediaItem';
import { useSelector } from 'react-redux';
import * as apis from '../../services';

const { BsThreeDots } = icons;

function SidebarRight() {
    // const [isRecent, setIsRecent] = useState(false);
    const { curSongId, nextUpSong } = useSelector((state) => state.music);
    const { token } = useSelector((state) => state.auth);
    const [currentSong, setCurrentSong] = useState(null);

    useEffect(() => {
        const fetchCurrentSong = async () => {
            const response = await apis.getInfoSong(curSongId, token);
            setCurrentSong(response.data);
        };
        fetchCurrentSong();
    }, [curSongId]);

    return (
        <div className="SidebarRight h-full w-full bg-[color:var(--sidebar-right-bg)] px-3 py-5 text-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between">
                <span className="rounded-l-full rounded-r-full bg-[#009cf4] px-6 py-1">Playlist</span>
                <span>
                    <BsThreeDots />
                </span>
            </div>
            {/* Content */}
            <div className="mt-8 flex flex-col gap-5">
                <div>
                    <span className='mb-2'>Now playing</span>
                    <MediaItem songData={currentSong} />
                </div>
                <div>
                    <span className='mb-2'>Next up</span>
                    <div className="flex flex-col overflow-y-auto">
                        {nextUpSong?.map((item, index) => (
                            <MediaItem key={index} songData={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SidebarRight;
