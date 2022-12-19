import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as actions from '../../../store/actions';
import Song from '~/components/Song';
import PlaylistItem from '~/components/PlaylistItem';
import UserItem from '~/components/UserItem';
import * as apis from '../../../services'

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
            setSongsResult([])
            setPlaylistsResult([])
            setUsersResult([])
            const response = await apis.search(keyword);
            if(response.status == 200) {
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
        fetchSearch()

    }, [keyword])
    return (
        <div>
            {songsResult.length > 0 && (
                <div>
                    <h2>Songs</h2>
                    <div>
                        {songsResult.map((item) => (
                            <Song songData={item} />
                        ))}
                    </div>
                </div>
            )}
            {playlistsResult.length > 0 && (
                <div>
                    <h2>Playlists</h2>
                    <div className="flex">
                        {playlistsResult.map((item) => (
                            <PlaylistItem className="w-1/5" playlistData={item} />
                        ))}
                    </div>
                </div>
            )}
            {usersResult.length > 0 && (
                <div>
                    <h2>Users</h2>
                    <div>
                        {usersResult.map((item) => (
                            <UserItem userData={item} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SearchAll;
