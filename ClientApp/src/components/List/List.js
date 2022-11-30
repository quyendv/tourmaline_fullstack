import Pop from '../../assets/images/Pop.svg'
import * as actions from '../../store/actions'

import { useDispatch } from 'react-redux'
import moment from 'moment'

function List({id, src, artistName, description, duration}) {
    const dispatch = useDispatch()
    
    return (
        <div className='flex items-center text-white gap-3 border border-white cursor-pointer' onClick={() => {
            dispatch(actions.setCurSongId(id))
            dispatch(actions.play(true))
        }}>
          <div className='flex items-center gap-2'>
                <img className='w-[40px] h-[40px] object-cover rounded-md' src={src} />
                <span>{artistName}</span>
                <span>-{description}</span>
          </div>
          <span>
            {moment.utc((duration || 0 ) * 1000).format('mm:ss')}
          </span>
        </div>
    )
}

export default List