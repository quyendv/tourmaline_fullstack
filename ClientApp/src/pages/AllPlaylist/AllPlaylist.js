import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PlaylistItem from '~/components/PlaylistItem';
import { icons } from '../../utils/icons';

const { AiOutlinePlusCircle } = icons;

function AllPlaylist() {
    const { state } = useLocation();
    const { setIsOpenModal } = useSelector((state) => state.actions);
    return (
        <div className="AllplaylistComponent flex w-full flex-col px-14 py-16 text-white">
            <h2 className="mb-7 border-b border-[color:#ffffff1a] text-2xl font-bold">Playlist</h2>
            {/* Container */}
            <div className="grid auto-rows-[minmax(260px,_1fr)] grid-cols-5 gap-3">
                {/* Create new playlist item */}
                <div
                    onClick={() => setIsOpenModal((prev) => !prev)}
                    className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-md border border-[color:#ffffff1a] hover:text-activecolor"
                >
                    <AiOutlinePlusCircle size={30} />
                    <span>Tạo playlist mới</span>
                </div>
                {/* PlaylistItem */}
                {state.map((item, index) => (
                    <PlaylistItem key={index} playlistData={item} />
                ))}
            </div>
        </div>
    );
}

export default AllPlaylist;
