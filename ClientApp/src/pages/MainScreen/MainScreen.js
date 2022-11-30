import { useNavigate } from 'react-router-dom';
import Pop from '../../assets/images/Pop.svg';
function MainScreen() {
    const navigate = useNavigate()
    const handleClickPlaylist = () => {
        navigate('/playlist/Pop/1')
    }
    return (
        <div className='text-white w-full mt-10'>
            <div className='flex flex-col justify-center items-center w-1/5' onClick={handleClickPlaylist}>
                {/* thumbnail */}
                <img src={Pop} className="h-[220px] w-[220px] object-cover"></img>
                {/* title */}
                <h3 className='text-sm'>
                    Pop 50
                </h3>
                {/* artist name */}
                <span className='text-xs opacity-70'>
                    Nhiều nghệ sĩ
                </span>
                <span className='text-xs opacity-70'>
                    11K người yêu thích
                </span>
            </div>
        </div>
    );
}

export default MainScreen;
