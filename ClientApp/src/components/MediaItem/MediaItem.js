import { useState, useEffect } from 'react';
import * as apis from '../../services';
import { BASE_URL } from '../../utils/constant';
import * as actions from '../../store/actions';
import { useDispatch } from 'react-redux';
import moment from 'moment';

function MediaItem({ songData }) {
    const [mediaSrc, setMediasrc] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCover = async () => {
            setMediasrc(`${BASE_URL}/api/song/getCover?id=${songData.id}`);
        };
        fetchCover();
    }, []);
    return (
        <div
            onClick={() => {
                dispatch(actions.setCurSongId(songData.id));
                dispatch(actions.play(true));
            }}
            className="mediaItem flex"
        >
            <img className="w-[60px] w-[60px] object-cover" src={mediaSrc}></img>
            <div className="flex flex-col">
                <span>{songData.name}</span>
                <span>{songData.uploader}</span>
                <span>{moment(songData.uploadTime).fromNow()}</span>
            </div>
        </div>
    );
}

export default MediaItem;
