import Pop from '../../assets/images/Pop.svg';
import * as actions from '../../store/actions';

import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

function List({ id, src, artistName, description, duration }) {
    const dispatch = useDispatch();
    const { curSongId, isPlaying } = useSelector((state) => state.music);
    return (
        <div
            className="flex cursor-pointer items-center gap-3 border border-white text-white"
            onClick={() => {
                id != curSongId && dispatch(actions.setCurSongId(id));
                !isPlaying && dispatch(actions.play(true));
            }}
        >
            <div className="flex items-center gap-2">
                <img className="h-[40px] w-[40px] rounded-md object-cover" src={src} />
                <span>{artistName}</span>
                <span>-{description}</span>
            </div>
            <span>{moment.utc((duration || 0) * 1000).format('mm:ss')}</span>
        </div>
    );
}

export default List;
