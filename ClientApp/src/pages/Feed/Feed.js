import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as apis from '../../services';
import moment from 'moment';
import Song from '../../components/Song';
function Feed() {
    const { token } = useSelector((state) => state.auth);
    const [recentlyUploaded, setRecentlyUploaded] = useState([]);
    useEffect(() => {
        const fetchRecentUploaded = async () => {
            const response = await apis.getRecentlyUploaded(token);
            setRecentlyUploaded(response.data);
        };
        fetchRecentUploaded();
    }, []);
    return (
        <div className="text-white">
            <div>Hear the latest posts from the people you’re following:</div>
            <div className="flex flex-col">
                {recentlyUploaded.map((item, index) => (
                    <div key={index}>
                        <span>{`${item.uploader} post a track ${moment(item.uploadTime).fromNow()} `}</span>
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
