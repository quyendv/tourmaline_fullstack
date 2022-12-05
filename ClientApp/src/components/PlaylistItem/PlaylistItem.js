import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlaylistPlaceHolder from '../../assets/images/playlistplaceholder.png';
import { icons } from '../../utils/icons';
import {deletePlaylist} from '../../services/music'
import { useSelector } from 'react-redux';

const { AiFillCloseCircle, BsFillPlayFill, BsThreeDots } = icons;
function PlaylistItem({ playlistData }) {
    const imgRef = useRef();
    const navigate = useNavigate();
    const link = `playlist/${playlistData.name.replaceAll(' ', '-')}/${playlistData.id}`;
    const [isHover, setIsHover] = useState(false);
    const {token} = useSelector(state => state.auth)
    const handleHover = (e) => {
        setIsHover(true);
        imgRef.current.classList.add('animate-scale-up-image');
        imgRef.current.classList.remove('animate-scale-down-image');
    };
    const handleLeave = (e) => {
        setIsHover(false);
        imgRef.current.classList.add('animate-scale-down-image');
        imgRef.current.classList.remove('animate-scale-up-image');
    };
    const handleDeletePlaylist = async (e) => {
        e.stopPropagation()
        const response = await deletePlaylist(playlistData.id, token)
        console.log(response)
    }
    return (
        <div className="flex flex-col ">
            <div
                className="relative h-[220px] w-[220px] overflow-hidden rounded-md"
                onClick={() => navigate(link)}
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
            >
                {isHover && (
                    <div className="absolute top-0 right-0 left-0 bottom-0 z-20 flex cursor-pointer items-center justify-center gap-3 rounded-md  bg-overlay-30 ">
                        <span onClick={handleDeletePlaylist} className="cursor-pointer">
                            <AiFillCloseCircle size={24} />
                        </span>
                        <span className="cursor-pointer">
                            <BsFillPlayFill size={24} />
                        </span>
                        <span className="cursor-pointer">
                            <BsThreeDots size={24} />
                        </span>
                    </div>
                )}
                <img ref={imgRef} className="w-full rounded-md object-contain" src={PlaylistPlaceHolder}></img>
            </div>
            <span className="text-sm font-bold">{playlistData.name}</span>
            <span className="text-xs font-semibold text-gray-300">{playlistData.username}</span>
        </div>
    );
}

export default PlaylistItem;
