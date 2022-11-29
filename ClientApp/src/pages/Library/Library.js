import { useSelector } from 'react-redux'
import {icons} from '../../utils/icons'


const {BsFillPlayFill,AiOutlinePlusCircle} = icons
function Library() {
    const {setIsOpenModal} = useSelector(state => state.actions)
    return (
        <div className='text-white'>
            <div className='flex items-center px-5 mt-10 gap-4'>
                <h2 className='text-3xl font-bold'>Library</h2>
                <span className='border border-white p-1 rounded-full'><BsFillPlayFill size={24}/></span>
            </div>
            <div className='flex items-center px-6 mt-8 gap-4'>
                <h3 className='text-xl font-semibold'>Playlist</h3>
                <span onClick={() => setIsOpenModal(prev => !prev)} className='cursor-pointer'><AiOutlinePlusCircle size={20}/></span>
            </div>
        </div>
    )
}

export default Library