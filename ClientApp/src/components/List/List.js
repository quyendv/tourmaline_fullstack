import Pop from '../../assets/images/Pop.svg';
import * as actions from '../../store/actions';
import {getCover, deleteSong} from '../../services/music'
import {BASE_URL} from '../../utils/constant'
import {icons} from '../../utils/icons'


import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useEffect, useState } from 'react';

const {AiFillCloseCircle} = icons
function List({ songData }) {
    const dispatch = useDispatch();
    const { curSongId, isPlaying } = useSelector((state) => state.music);
    const {token} = useSelector(state => state.auth)
    const [src, setSrc] = useState('')
    useEffect(() => {
        const fetchCover = async() => {

            setSrc(`${BASE_URL}/api/song/getCover?id=${songData.id}`)

        }
        fetchCover()
    },[])
    const handleDelete = async (e) => {
        e.stopPropagation()
        const response = await deleteSong(songData.id, token)
        console.log(response)
    }
    return (
        <div
            className="flex cursor-pointer items-center gap-3 border border-white text-white justify-between"
            onClick={() => {
                songData.id != curSongId && dispatch(actions.setCurSongId(songData.id));
                dispatch(actions.play(true));
            }}
        >
            <div className="flex items-center gap-2">
                <img className="h-[40px] w-[40px] rounded-md object-cover" src={src}/>
                <span className='flex flex-col'>
                    <span className='text-sm'>{songData.name}</span>
                    <span className='text-xs text-gray-500'>Various artist</span>
                </span>
                
            </div>
            

            <span className='border border-white p-2' onClick={handleDelete}>
                <AiFillCloseCircle/>
            </span>
            {/* <span>{moment.utc((songData.duration || 0) * 1000).format('mm:ss')}</span> */}
        </div>
    );
}

export default List;
