import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UserItem from '~/components/UserItem';
import * as apis from '../../../services';

function SearchUser() {
    const { keyword } = useSelector((state) => state.actions);
    const [usersResult, setUsersResult] = useState([]);
    useEffect(() => {
        const fetchSearch = async () => {
            setUsersResult([]);
            const response = await apis.search(keyword);
            if (response.status == 200) {
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
        fetchSearch();
    }, [keyword]);
    return (
        <div className="grid grid-cols-3 gap-7 md:grid-cols-4 lg:grid-cols-5">
            {usersResult.map((item) => (
                <UserItem userData={item} />
            ))}
        </div>
    );
}

export default SearchUser;
