import { icons } from '../../utils/icons';
import { useState } from 'react';

const { BsThreeDots } = icons;
function SidebarRight() {
    const [isRecent, setIsRecent] = useState(false);
    return (
        <div className="h-full w-full bg-main-100 text-white">
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
            {isRecent ? <div>Danh sách phát</div> : <div>Nghe gần đây</div>}
        </div>
    );
}

export default SidebarRight;
