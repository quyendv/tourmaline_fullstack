import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as apis from '../../services';
import { icons } from '../../utils/icons';
import Song from '../../components/Song';

const { FaSort } = icons;
function User() {
    const { usernameParam } = useParams();
    const [userAvatar, setUserAvatar] = useState('');
    const [userInfo, setUserInfo] = useState({});
    const [songs, setSongs] = useState([]);
    const { token } = useSelector((state) => state.auth);
    const { username } = useSelector((state) => state.user);
    const [isFollowing, setIsFollowing] = useState(false ) 
    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([])
    useEffect(() => {
        const fetchFollowers = async () => {
            const response = await apis.getFollowers();
            setFollowers(response.data)
            console.log(followers)
            followers.length > 0 && followers.forEach((item) => {     
                if(item.username == username) {
                    setIsFollowing(true)
                }
            })
        };
        fetchFollowers();
        const fetchFollowings = async () => {
            const response = await apis.getFollowings();
            console.log(response);
        };
        fetchFollowings();
    }, []);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const response = await apis.getUserInfo(usernameParam);

            setUserInfo(response.data);
        };
        fetchUserInfo();
        const fetchSongs = async () => {
            const response = await apis.getSongs(usernameParam);
            setSongs(response.data);
        };
        fetchSongs();
    }, [usernameParam]);
    useEffect(() => {
        const url = '';
        const fetchUserAvatar = async () => {
            const response = await apis.getAvatar(usernameParam);
            const blob = new Blob([response.data], { type: 'image/jpeg' });
            const url = URL.createObjectURL(blob);
            setUserAvatar(url);
        };
        fetchUserAvatar();

        return () => {
            URL.revokeObjectURL(url);
        };
    }, [usernameParam]);
    const handleFollow = async () => {
        if(isFollowing) {
            const response = await apis.unFollow(usernameParam, token)
            followers.filter(item => item.username != username)
            setIsFollowing(prev => !prev)
            console.log(response)
        }
        if(!isFollowing) {
            const response = await apis.follow(usernameParam, token)
            setIsFollowing(prev => !prev)
            console.log(response)
        }
    }
    return (
        <div className="h-[calc(100vh-var(--header-height))] w-full overflow-y-auto px-14 pt-16 pb-24 text-white">
            {/* header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 ">
                    <img className="h-[190px] w-[190px] rounded-full object-cover" src={userAvatar} alt="" />
                    <span className="flex flex-col">
                        <span>{userInfo.name}</span>
                        <span>{userInfo.username}</span>
                        <span>{userInfo.bio}</span>
                    </span>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col">
                            <span>Followers</span>
                            <span>{followers.length}</span>
                        </div>

                        <div className="flex flex-col border-l border-l-gray-400 pl-3">
                            <span>Following</span>
                            <span>{following.length}</span>
                        </div>
                        <div className="flex flex-col border-l border-l-gray-400 pl-3">
                            <span>Tracks</span>
                            <span>{songs.length}</span>
                        </div>
                    </div>
                    {usernameParam != username && (
                        <div className="flex w-full items-center justify-center ">
                            <span onClick={handleFollow} className="rounded-l-full cursor-pointer rounded-r-full border border-gray-300 px-8">
                                <button>{isFollowing ? 'Unfollow' : 'Follow'}</button>
                            </span>
                        </div>
                    )}
                </div>
            </div>
            <div className="max-h-full w-full flex-auto overflow-y-auto">
                {/* header */}
                <div className="-mx-2 mr-1 flex items-center border-b border-solid border-[#ffffff0d] p-[10px] text-[#ffffff80] [&>*]:px-2">
                    <div className="w-1/2 gap-2">
                        <span>
                            <FaSort />
                        </span>
                        <span>SONG</span>
                    </div>
                    <div className="flex-1">
                        <span>ALBUM</span>
                    </div>
                    <div className="justify-items-end">
                        <span>TIME</span>
                    </div>
                </div>
                <div className="flex  flex-col">
                    {/* ...render playlist: hardcode */}
                    {songs.map((item, index) => (
                        <Song key={index} songData={item} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default User;
