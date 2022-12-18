import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as apis from '../../services';
import moment from 'moment';
import Song from '../../components/Song';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function Feed() {
    const navigate = useNavigate()
    const { token } = useSelector((state) => state.auth);
    const [recentlyUploaded, setRecentlyUploaded] = useState([]);
    useEffect(() => {
        const fetchRecentUploaded = async () => {
            const response = await apis.getRecentlyUploaded(token);
            console.log(response)
            setRecentlyUploaded(response.data);
        };
        fetchRecentUploaded();
    }, []);
    return (
        <div className="px-[59px] text-white">
            <h2 className="text-2xl">Hear the latest posts from the people you’re following:</h2>
            <div className="flex flex-col ">
                {recentlyUploaded.map((item, index) => (
                    <div key={index}>
                        <span onClick={() => navigate(`/user/${item.uploader}`)}  className='hover:underline cursor-pointer'>{`${item.uploader} `}</span>
                        <span>{`post a track ${moment(item.uploadTime).fromNow()} `}</span>
                        <div>
                            <Song songData={item}></Song>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Feed;
