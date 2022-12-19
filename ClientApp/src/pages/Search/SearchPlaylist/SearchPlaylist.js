import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PlaylistItem from '~/components/PlaylistItem';
import * as apis from '../../../services';

function SearchPlaylist() {
    const { keyword } = useSelector((state) => state.actions);
    const [playlistsResult, setPlaylistsResult] = useState([]);
    useEffect(() => {
        const fetchSearch = async () => {
            setPlaylistsResult([]);
            const response = await apis.search(keyword);
            if (response.status == 200) {
                response.data.result.forEach((item) => {
                    if (item.playlist != null) {
                        setPlaylistsResult((prev) => [...prev, item.playlist]);
                    }
                });

                setPlaylistsResult((prev) =>
                    prev.filter((ele, ind) => ind === prev.findIndex((elem) => elem.id == ele.id && elem.id == ele.id)),
                );
            }
        };
        fetchSearch();
    }, [keyword]);
    return (
        <div className="grid grid-cols-3 gap-5 md:grid-cols-4 lg:grid-cols-5">
            {playlistsResult.map((item) => (
                <PlaylistItem playlistData={item} />
            ))}
        </div>
    );
}

export default SearchPlaylist;
