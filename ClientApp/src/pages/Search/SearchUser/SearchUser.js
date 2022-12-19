import { useSelector } from 'react-redux';
import UserItem from '~/components/UserItem';
import * as apis from '../../../services'
import { useState, useEffect } from 'react';
function SearchUser() {
    const {keyword} = useSelector(state => state.actions)
    const [usersResult, setUsersResult] = useState([])
    useEffect(() => {
        const fetchSearch = async () => {
            setUsersResult([])
            const response = await apis.search(keyword);
            if(response.status == 200) {
                response.data.result.forEach((item) => {

                    if (item.user != null) {
                        setUsersResult((prev) => [...prev, item.user]);
                    }

                });
        
                setUsersResult((prev) =>
                    prev.filter((ele, ind) => ind === prev.findIndex((elem) => elem.id == ele.id && elem.id == ele.id)),
                );

            }
        };
        fetchSearch()

    }, [keyword])
    return (
        <div>
            {usersResult.map((item) => (
                <UserItem userData={item} />
            ))}
        </div>
    );
}

export default SearchUser;
