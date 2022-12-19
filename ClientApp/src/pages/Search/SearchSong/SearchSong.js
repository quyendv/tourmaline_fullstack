import { useSelector } from "react-redux"
import Song from "~/components/Song"
import * as apis from '../../../services'
import { useState, useEffect } from "react"

function SearchSong() {
    const {keyword} = useSelector(state => state.actions)
    const [songsResult, setSongsResult] = useState([])
    useEffect(() => {
        const fetchSearch = async () => {
            setSongsResult([])
            const response = await apis.search(keyword);
            console.log(response)
            if(response.status == 200) {
                response.data.result.forEach((item) => {

                    if (item.song != null) {
                        setSongsResult((prev) => [...prev, item.song]);
                    }

                });
        
                setSongsResult((prev) =>
                    prev.filter((ele, ind) => ind === prev.findIndex((elem) => elem.id == ele.id && elem.id == ele.id)),
                );

            }
        };
        fetchSearch()

    }, [keyword])
    return (
        <div>
            {songsResult.map(item => (
                <Song songData={item} />
            ))}
        </div>
    )
}

export default SearchSong