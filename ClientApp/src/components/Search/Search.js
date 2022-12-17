import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import styles from './Search.module.scss';
import HeadlessTippy from '@tippyjs/react/headless';
import { SearchIcon } from '../Icons';
import { icons } from '~/utils/icons';
import useDebounce from '~/hooks/useDebounce';
import * as apis from '../../services'
import { routesConfigPublic, searchRoutesConfig } from '../../Routes/routesConfig';
import { useNavigate } from 'react-router-dom';
import { createSearchParams } from 'react-router-dom';

const cx = classNames.bind(styles);
const { FaRegTimesCircle, ImSpinner2 } = icons;

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const inputRef = useRef();
    const debouncedValue = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!searchValue.trim()) {
            setSearchResult([]);
            return;
        }
        setLoading(true);

        // Gọi api lấy kết quả search:
        // Chú ý gán kết quả vào searchResult, rồi setLoading(false)
        const search = async() => {
            const response = await apis.search(debouncedValue)
            
            console.log(response)
        }
        search()
        setLoading(false)
        // VD: Tách ra config axios sau:
        // axios
        //     .get('users/search', {
        //         params: { q: debouncedValue },
        //     })
        //     .then((res) => {
        //         setSearchResult(res.data.data);
        //         console.log(res.data);
        //         setLoading(false);
        //     })
        //     .catch(() => {
        //         setLoading(false);
        //     });
    }, [debouncedValue]);

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    const handleClear = () => {
        setSearchValue('');
        inputRef.current.focus();
    };
    const handleSearch = (e) => {
        if(e.keyCode == 13) {
            const pathname = `${routesConfigPublic.search}${searchRoutesConfig.searchAll}`
            navigate({
                pathname,
                search: createSearchParams({
                  q: searchValue
                }).toString()
              })
        }
    }

    return (
        <HeadlessTippy
            appendTo={() => document.body}
            visible={showResult && searchResult.length > 0}
            // visible="true"
            placement="bottom"
            interactive
            render={(attrs) => (
                <div className={cx('popper-wrapper')} tabIndex="-1" {...attrs}>
                    <div className={cx('search-result')}>
                        {/* Chưa css lại, chưa biết search ra kết quả gì */}
                        <h4 className={cx('search-title')}>Suggest for you</h4>
                        {/* {searchResult.map((result) => (
                            <AccountItem key={result.id} data={result} />
                        ))} */}
                        <div>result1</div>
                        <div>result2</div>
                        <div>result3</div>
                        <div>result4</div>
                        <div>result5</div>
                    </div>
                </div>
            )}
            onClickOutside={() => setShowResult(false)}
        >
            <div className={cx('search')}>
                <button className={cx('search-btn')}>
                    <SearchIcon />
                </button>
                <input
                    value={searchValue}
                    type="text"
                    ref={inputRef}
                    placeholder="Search, Songs, Genre, Album, Artists..."
                    onChange={handleChange}
                    onFocus={() => setShowResult(true)}
                    onKeyUp={handleSearch}
                />
                {!!searchValue && !loading && (
                    <button className={cx('clear')} onClick={handleClear}>
                        <FaRegTimesCircle />
                    </button>
                )}
                {loading && <ImSpinner2 className={cx('loading')} />}
            </div>
        </HeadlessTippy>
    );
}

export default Search;
