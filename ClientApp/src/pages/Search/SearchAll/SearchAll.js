import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlaylistItem from '~/components/PlaylistItem';
import Song from '~/components/Song';
import UserItem from '~/components/UserItem';
import * as apis from '../../../services';
import * as actions from '../../../store/actions';

function SearchAll() {
    const dispatch = useDispatch();
    const { searchResult, keyword } = useSelector((state) => state.actions);
    const [songsResult, setSongsResult] = useState([]);
    const [playlistsResult, setPlaylistsResult] = useState([]);
    const [usersResult, setUsersResult] = useState([]);
    useEffect(() => {
        searchResult.forEach((item) => {
            if (item.song != null) {
                setSongsResult((prev) => [...prev, item.song]);
            }
            if (item.playlist != null) {
                setPlaylistsResult((prev) => [...prev, item.playlist]);
            }
            if (item.user != null) {
                setUsersResult((prev) => [...prev, item.user]);
            }
        });

        setPlaylistsResult((prev) =>
            prev.filter((ele, ind) => ind === prev.findIndex((elem) => elem.id == ele.id && elem.id == ele.id)),
        );
        setSongsResult((prev) =>
            prev.filter((ele, ind) => ind === prev.findIndex((elem) => elem.id == ele.id && elem.id == ele.id)),
        );
        setUsersResult((prev) =>
            prev.filter((ele, ind) => ind === prev.findIndex((elem) => elem.id == ele.id && elem.id == ele.id)),
        );

        dispatch(actions.setSearchResultSong(songsResult));
        dispatch(actions.setSearchResultPlaylist(playlistsResult));
        dispatch(actions.setSearchResultUser(usersResult));
    }, [searchResult]);
    useEffect(() => {
        const fetchSearch = async () => {
            setSongsResult([]);
            setPlaylistsResult([]);
            setUsersResult([]);
            const response = await apis.search(keyword);
            if (response.status == 200) {
                response.data.result.forEach((item) => {
                    if (item.song != null) {
                        setSongsResult((prev) => [...prev, item.song]);
                    }
                    if (item.playlist != null) {
                        setPlaylistsResult((prev) => [...prev, item.playlist]);
                    }
                    if (item.user != null) {
                        setUsersResult((prev) => [...prev, item.user]);
                    }
                });

                setPlaylistsResult((prev) =>
                    prev.filter((ele, ind) => ind === prev.findIndex((elem) => elem.id == ele.id && elem.id == ele.id)),
                );
                setSongsResult((prev) =>
                    prev.filter((ele, ind) => ind === prev.findIndex((elem) => elem.id == ele.id && elem.id == ele.id)),
                );
                setUsersResult((prev) =>
                    prev.filter((ele, ind) => ind === prev.findIndex((elem) => elem.id == ele.id && elem.id == ele.id)),
                );
            }
        };
        fetchSearch();
    }, [keyword]);
    return (
        <>
            {songsResult.length > 0 && (
                <div className="mt-12">
                    <h3 className="mb-5 text-2xl font-bold">Songs</h3>
                    <div className="max-h-64 overflow-y-auto">
                        {songsResult.map((item) => (
                            <Song songData={item} />
                        ))}
                    </div>
                </div>
            )}
            {playlistsResult.length > 0 && (
                <div className="mt-12">
                    <h2 className="mb-5 text-2xl font-bold">Playlists</h2>
                    <div className="grid max-h-72 grid-cols-3 gap-5 overflow-y-auto md:grid-cols-4 lg:grid-cols-5">
                        {playlistsResult.map((item) => (
                            <PlaylistItem playlistData={item} />
                        ))}
                    </div>
                </div>
            )}
            {usersResult.length > 0 && (
                <div className="mt-12">
                    <h2 className="mb-5 text-2xl font-bold">Users</h2>
                    <div className="grid grid-cols-3 gap-7 md:grid-cols-4 lg:grid-cols-5">
                        {usersResult.map((item) => (
                            <UserItem userData={item} />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

export default SearchAll;
