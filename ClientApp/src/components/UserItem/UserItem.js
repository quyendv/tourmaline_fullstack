import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as apis from '../../services';
import { AiOutlineUserAdd } from 'react-icons/ai';

function UserItem({ userData, className }) {
    const [userAvatar, setUserAvatar] = useState('');
    const [isFollow, setIsFollow] = useState(false);
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    const handleFollow = () => {
        setIsFollow((prev) => !prev);
        const follow = async () => {
            const response = await apis.follow(userData.username, token);
            console.log(response);
        };
        const Unfollow = async () => {
            const response = await apis.unFollow(userData.username, token);
            console.log(response);
        };
        follow();
    };
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
        <div className="flex w-full flex-col items-center gap-3">
            {/* Img */}
            <div className="h-0 w-full pb-[100%]">
                <img
                    className="h-auto w-full cursor-pointer rounded-full object-cover"
                    onClick={() => navigate(`/user/${userData.username}`)}
                    // src={userAvatar}
                    src={userAvatar}
                    alt="avatar"
                />
            </div>
            {/* Content */}
            <div className="flex flex-col items-center">
                <span>{userData.name}</span>
                <span className="text-xs text-[#ffffff80]">2.4M followers</span> {/* hardcode */}
            </div>
            {/* Follow btn */}
            <div
                onClick={handleFollow}
                className="flex items-center gap-1 rounded-full bg-[var(--follow-btn-bg)] px-6 py-1.5"
            >
                <AiOutlineUserAdd />
                <button>{!isFollow ? 'Follow' : 'Unfollow'}</button>
            </div>
        </div>
    );
}
export default UserItem;
