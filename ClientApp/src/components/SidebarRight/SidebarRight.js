import { icons } from '../../utils/icons';
import { useEffect, useState } from 'react';
import MediaItem from '../MediaItem';
import { useSelector } from 'react-redux';
import * as apis from '../../services';

const { BsThreeDots } = icons;

function SidebarRight() {
    const [isRecent, setIsRecent] = useState(false);
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
        <div className="SidebarRight h-full w-full bg-[color:var(--sidebar-right-bg)] text-white">
            <div className="flex h-[64px] items-center justify-between px-3">
                <div className="flex cursor-pointer items-center gap-1 rounded-l-full rounded-r-full bg-[#fff] text-sm text-gray-600">
                    <span
                        onClick={() => setIsRecent(false)}
                        className={`${!isRecent && 'bg-activecolor'} rounded-l-full rounded-r-full px-2 py-1 `}
                    >
                        Danh sách phát
                    </span>
                    <span
                        onClick={() => setIsRecent(true)}
                        className={`${isRecent && 'bg-[#009cf4]'} rounded-l-full rounded-r-full px-2 py-1 `}
                    >
                        Nghe gần đây
                    </span>
                </div>
                <span>
                    <BsThreeDots />
                </span>
            </div>
            {!isRecent ? (
                <div className="flex flex-col px-3">
                    <div>
                        <span>Đang chơi</span>
                        <MediaItem songData={currentSong} />
                    </div>
                    <div>
                        <span>
                            Next up
                        </span>
                        <div className='flex flex-col overflow-y-auto'> 
                            {nextUpSong?.map((item, index) => (
                                <MediaItem key={index} songData={item} />
                            ))}
                        </div>

                    </div>
                </div>
            ) : (
                <div>Nghe gần đây</div>
            )}
        </div>
    );
}

export default SidebarRight;
