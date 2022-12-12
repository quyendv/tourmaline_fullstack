import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PlaylistItem from '~/components/PlaylistItem';
import { icons } from '../../utils/icons';

const { AiOutlinePlusCircle } = icons;

function AllPlaylist() {
    const { state } = useLocation();
    const { setIsOpenModal } = useSelector((state) => state.actions);
    return (
        <div className="AllplaylistComponent flex h-[calc(100vh-var(--header-height))] w-full flex-col overflow-y-auto px-14 pt-16 pb-24 text-white">
            <h2 className="mb-7 border-b border-[color:#ffffff1a] pb-3 text-2xl font-bold">Playlist</h2>
            {/* Container */}
            <div className="grid auto-rows-[minmax(260px,_1fr)] grid-cols-4 gap-5 xl:grid-cols-5">
                {/* Create new playlist item */}
                <div
                    onClick={() => setIsOpenModal((prev) => !prev)}
                    className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-[color:#ffffff1a] text-center hover:text-activecolor"
                >
                    <AiOutlinePlusCircle size={30} />
                    <span>Create new playlist</span>
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
