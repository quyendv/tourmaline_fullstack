import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Pop from '../../assets/images/Pop.svg';
import * as apis from '../../services';
import * as actions from '../../store/actions';
import Song from '../../components/Song';
import MediaItem from '../../components/MediaItem';
import UserItem from '../../components/UserItem';
import { FaCaretRight } from 'react-icons/fa';
import LazyLoad from 'react-lazy-load';

function MainScreen() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const [recentlyPlayed, setRecentlyPlayed] = useState([]);
    const [recentlyUploaded, setRecentlyUploaded] = useState([]);
    const [relatedArtists, setRelatedArtists] = useState([]);
    const [top50, setTop50] = useState([]);
    const [suggestion, setSuggestion] = useState([]);
    const { username } = useSelector((state) => state.user);
    const { isLoggedin } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchSuggestion = async () => {
            const response = await apis.getSuggestion(token);
            if (response.status === 200) {
                console.log(response);
                setSuggestion(response.data);
            }
        };
        fetchSuggestion();

        const fetchNew = async () => {
            const response = await apis.getNew();
            if (response.status === 200) {
                //TODOS
                console.log(response);
                setRecentlyUploaded(response.data.result);
            }
        };
        fetchNew();
        const fetchTop50 = async () => {
            const response = await apis.getTop50();
            if (response.status === 200) {
                setTop50(response.data.result);
            }
        };
        fetchTop50();
        const fetchRecentlyPlays = async () => {
            const response = await apis.getRecentPlays(token);
            if (response.status === 200) {
                console.log(response);
                setRecentlyPlayed(response.data);
            }
        };
        fetchRecentlyPlays();
        const fetchRecentlyUploaded = async () => {
            const response = await apis.getRecentlyUploaded(token);
            if (response.status === 200) {
                console.log(response);
            }
        };
        fetchRecentlyUploaded();
        const fetchRelatedArtists = async () => {
            const response = await apis.getRelatedArtist(token);
            if (response.status === 200) {
                setRelatedArtists(response.data);
            }
        };
        fetchRelatedArtists();
        const fetchAllPlaylist = async () => {
            const response = await apis.getAllPlaylist(token);
            if (response.status === 200) {
                dispatch(actions.setCurPlaylist(response.data.playlists));
            }
        };

        fetchAllPlaylist();
        const fetchFavoriteSongs = async () => {
            const response = await apis.getFavorite(token);
            dispatch(actions.fetchFavorite(response.data.songs));
        };

        fetchFavoriteSongs();
    }, []);
    return (
        <div className="h-[calc(100vh-var(--header-height))] w-full overflow-y-auto px-14 pt-16 pb-24 text-white">
            {suggestion.length > 0 && (
                <div className="mt-12">
                    <span className="flex justify-between">
                        <h3 className="mb-5 text-2xl font-bold">Hots</h3>
                        <span
                            onClick={() => navigate('discover/hots')}
                            className="cursor-pointer font-bold hover:text-active-color"
                        >
                            Go to playlist
                            <FaCaretRight className="ml-1" />
                        </span>
                    </span>
                    <LazyLoad>
                        <div className="max-h-64 overflow-y-auto">
                            {suggestion
                                .filter((item, index) => index <= 3)
                                .map((item, index) => (
                                    <Song key={index} songData={item} />
                                ))}
                        </div>
                    </LazyLoad>
                </div>
            )}
            {top50.length > 0 && (
                <div className="mt-12">
                    <span className="flex justify-between">
                        <h3 className="mb-5 text-2xl font-bold">Top 50</h3>
                        <span
                            onClick={() => navigate('discover/top50')}
                            className="cursor-pointer font-bold hover:text-active-color"
                        >
                            Go to playlist
                            <FaCaretRight className="ml-1" />
                        </span>
                    </span>
                    <LazyLoad>
                        <div className="max-h-64 overflow-y-auto">
                            {top50.map((item, index) => (
                                <Song key={index} songData={item} />
                            ))}
                        </div>
                    </LazyLoad>
                </div>
            )}

            {/* New */}
            {recentlyUploaded.length > 0 && (
                <div className="mt-12">
                    <h3 className="mb-5 text-2xl font-bold">News</h3>
                    <LazyLoad>
                        <div className="grid h-64 grid-cols-2 gap-3 overflow-y-auto lg:grid-cols-3">
                            {recentlyUploaded.map((item, index) => (
                                <MediaItem key={index} songData={item} />
                            ))}
                        </div>
                    </LazyLoad>
                </div>
            )}
            {/* Recently */}
            {recentlyPlayed.length > 0 && (
                <div className="mt-12">
                    <h3 className="mb-5 text-2xl font-bold">Recently Played</h3>
                    <LazyLoad>
                        <div className="max-h-64 overflow-y-auto">
                            {recentlyPlayed.map((item, index) => (
                                <Song key={index} songData={item} />
                            ))}
                        </div>
                    </LazyLoad>
                </div>
            )}
            {/* Artists you should know */}
            {relatedArtists.length > 0 && (
                <div className="mt-12">
                    <h3 className="mb-5 text-2xl font-bold">Artists you should know</h3>
                    <LazyLoad>
                        <div className="mb-7 grid grid-cols-3 gap-7 md:grid-cols-4 lg:grid-cols-5">
                            {relatedArtists
                                .filter((item, index) => index <= 4)
                                .filter((item) => item.username != username)
                                .map((item, index) => (
                                    <UserItem key={index} userData={item} className="px-3" />
                                ))}
                        </div>
                    </LazyLoad>
                </div>
            )}
        </div>
    );
}

export default MainScreen;
