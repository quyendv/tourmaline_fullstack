import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PlaylistItem from '~/components/PlaylistItem';
import {icons} from '../../utils/icons'

const {AiOutlinePlusCircle} =icons

function AllPlaylist() {
    const { state } = useLocation();
    const {setIsOpenModal} = useSelector(state => state.actions)
    return (
        <div className="AllplaylistComponent mt-4 flex w-full flex-col text-white">
            <h2 className="border-b border-gray-300 px-12 text-2xl font-bold">Playlist</h2>
            <div className="flex w-full flex-wrap items-center px-12">
                <div onClick={() => setIsOpenModal(prev => !prev)} className='border border-gray-300 w-1/5 h-[254px] flex flex-col items-center justify-center  text-activecolor rounded-md cursor-pointer'>
                    <span> 
                        <AiOutlinePlusCircle size={30}/>
                    </span>
                    <span>
                        Tạo playlist mới
                    </span>
                </div>
                {state.map((item, index) => (
                    <div className='w-1/5 px-2'>
                        <PlaylistItem key={index} playlistData={item} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllPlaylist;
