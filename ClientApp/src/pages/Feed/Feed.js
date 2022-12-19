import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as apis from '../../services';
import moment from 'moment';
import Song from '../../components/Song';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function Feed() {
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    const [recentlyUploaded, setRecentlyUploaded] = useState([]);
    useEffect(() => {
        const fetchRecentUploaded = async () => {
            const response = await apis.getRecentlyUploaded(token);
            console.log(response);
            setRecentlyUploaded(response.data);
        };
        fetchRecentUploaded();
    }, []);
    return (
        <div className="h-[calc(100vh-var(--header-height))] w-full overflow-y-auto px-14 pt-16 pb-24 text-white">
            <h2 className="mb-5 text-2xl">Hear the latest posts from the people you’re following:</h2>
            <div className="flex flex-col ">
                {recentlyUploaded.map((item, index) => (
                    <div key={index} className="mb-2">
                        <span
                            onClick={() => navigate(`/user/${item.uploader}`)}
                            className="cursor-pointer px-2.5 text-base font-semibold hover:text-active-color hover:underline"
                        >{`${item.uploader}`}</span>
                        <span className="text-sm text-[#ffffff80]">{`post a track ${moment(
                            item.uploadTime,
                        ).fromNow()} `}</span>
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
