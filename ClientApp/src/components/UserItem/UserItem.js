import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as apis from '../../services';
function UserItem({ userData }) {
    const [userAvatar, setUserAvatar] = useState('');
    const [isFollow, setIsFollow] = useState(false);
    const navigate = useNavigate();
    const {token} = useSelector(state => state.auth)
    const handleFollow = () => {
        setIsFollow(prev => !prev)
        const follow = async() => {
            const response = await apis.follow(userData.username, token)
            console.log(response)
        }
        const Unfollow = async()=> {
            const response = await apis.unFollow(userData.username, token)
            console.log(response)
        }
        follow()
    }
    useEffect(() => {
        const url = '';
        const fetchUserAvatar = async () => {
            const response = await apis.getAvatar(userData.username);
            const blob = new Blob([response.data], { type: 'image/jpeg' });
            const url = URL.createObjectURL(blob);
            setUserAvatar(url);
        };
        fetchUserAvatar();
        return () => {
            URL.revokeObjectURL(url);
        };
    }, []);

    return (
        <div className="flex w-1/5 flex-col">
            <img
                className="cursor-pointer"
                onClick={() => navigate(`/user/${userData.username}`)}
                src={userAvatar}
            ></img>
            <span>{userData.name}</span>
            <span onClick={handleFollow} className='border border-white'>
                <button>{isFollow ? 'Follow' : 'Unfollow'}</button>
            </span >
        </div>
    );
}
export default UserItem;
