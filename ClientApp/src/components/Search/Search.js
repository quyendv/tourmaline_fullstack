import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './Search.module.scss';

import { SearchIcon } from '../Icons';
const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');

    const handleChange = (event) => {
        setSearchValue(event.target.value);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('search')}>
                <button className={cx('search-btn')}>
                    <SearchIcon />
                </button>
                <input
                    value={searchValue}
                    type="text"
                    placeholder="Search, Songs, Genre, Album, Artists..."
                    onChange={handleChange}
                />
            </div>
        </div>
    );
}

export default Search;
