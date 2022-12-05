import List from '../../components/List';
import playlistPlaceholder from '../../assets/images/playlistplaceholder.png'
import { useLocation } from 'react-router-dom';
import {icons} from '../../utils/icons'

const {BsThreeDots} = icons
function Playlist() {
    const {state} = useLocation()
    console.log(state)
    return (
        <div className='px-12 mt-10 text-white flex gap-6 w-full h-full '>
            <div className='flex flex-col gap-2 items-center w-1/4'>
                <img className='w-[300px] h-[300px] object-cover rounded-lg shadow-lg' src={playlistPlaceholder}>

                </img>
                <span className='text-lg font-bold'>{state.name}</span>
                <span className='text-xs font-semibold text-gray-300'>{`Được tạo bởi ${state.username}`}</span>
                <span className='cursor-pointer p-1 border bg-[#f2f2f2] rounded-full text-[#000]'><BsThreeDots/></span>
            </div>
            <div className='flex flex-auto border border-red-500'>
                {/* ...render playlist */}
            </div>
        </div>
    );
}

export default Playlist;
