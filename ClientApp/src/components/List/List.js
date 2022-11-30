import Pop from '../../assets/images/Pop.svg'
import * as actions from '../../store/actions'

import { useDispatch } from 'react-redux'

function List() {
    const dispatch = useDispatch()
    
    return (
        <div className='flex items-center text-white gap-3 border border-white cursor-pointer' onClick={() => {
            dispatch(actions.setCurSongId(1))
            dispatch(actions.play(true))
        }}>
          <div className='flex items-center gap-2'>
                <img className='w-[40px] h-[40px] object-cover rounded-md' src={Pop} />
                <span>Bùi Trương Linh</span>
                <span>-Em đã yêu một người có ước mơ</span>
          </div>
          <span>
                4.43
          </span>
        </div>
    )
}

export default List