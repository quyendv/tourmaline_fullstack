import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import styles from './Search.module.scss';
import HeadlessTippy from '@tippyjs/react/headless';
import { SearchIcon } from '../Icons';
import { icons } from '~/utils/icons';
import useDebounce from '~/hooks/useDebounce';
import * as apis from '../../services';
import { searchRoutesConfig } from '../../Routes/routesConfig';
import { useNavigate } from 'react-router-dom';
import { createSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions';
import { SearchResultSong, SearchResultUser } from '../SearchResult';

const cx = classNames.bind(styles);
const { FaRegTimesCircle, ImSpinner2 } = icons;

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
        const search = async () => {
            const response = await apis.search(debouncedValue);

            console.log(response);
        };
        search();
        setLoading(false);
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
        if (e.keyCode === 13) {
            dispatch(actions.setSearchKeyword(searchValue));
            const pathname = `${searchRoutesConfig.search}${searchRoutesConfig.searchAll}`;
            navigate({
                pathname,
                search: createSearchParams({
                    q: searchValue,
                }).toString(),
            });
            const fetchSearchData = async () => {
                const response = await apis.search(searchValue);
                console.log(response);
            };
            fetchSearchData();
        }
    };

    return (
        <HeadlessTippy
            appendTo={() => document.body}
            // visible={showResult && searchResult.length > 0}
            // visible
            // trigger="click"
            placement="bottom"
            interactive
            render={(attrs) => (
                <div className={cx('popper-wrapper')} tabIndex="-1" {...attrs}>
                    <div className={cx('search-result', 'max-h-[calc(100vh-180px)] overflow-y-auto p-2.5 text-white')}>
                        <h4 className={cx('search-title', 'px-2.5 pb-2 font-bold')}>Suggest result</h4>
                        {/* Show result */}
                        <div className="flex flex-col">
                            <SearchResultUser
                                avatar={
                                    'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/avatars/8/a/a/b/8aab7a0386dd9c24b90adcc5ef5a7814.jpg'
                                }
                                name={'Sơn Tùng M-TP'}
                                followers={'2.4M'}
                            />
                            <SearchResultSong
                                cover={
                                    'https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_webp/covers/c/b/cb61528885ea3cdcd9bdb9dfbab067b1_1504988884.jpg'
                                }
                                songName={'Nơi Này Có Anh (Masew Bootleg)'}
                                singer={'Sơn Tùng M-TP, Masew'}
                            />
                            <SearchResultUser
                                avatar={
                                    'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/avatars/8/a/a/b/8aab7a0386dd9c24b90adcc5ef5a7814.jpg'
                                }
                                name={'Sơn Tùng M-TP'}
                                followers={'2.4M'}
                            />
                            <SearchResultSong
                                cover={
                                    'https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_webp/covers/c/b/cb61528885ea3cdcd9bdb9dfbab067b1_1504988884.jpg'
                                }
                                songName={'Nơi Này Có Anh (Masew Bootleg)'}
                                singer={'Sơn Tùng M-TP, Masew'}
                            />
                            <SearchResultUser
                                avatar={
                                    'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/avatars/8/a/a/b/8aab7a0386dd9c24b90adcc5ef5a7814.jpg'
                                }
                                name={'Sơn Tùng M-TP'}
                                followers={'2.4M'}
                            />
                            <SearchResultSong
                                cover={
                                    'https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_webp/covers/c/b/cb61528885ea3cdcd9bdb9dfbab067b1_1504988884.jpg'
                                }
                                songName={'Nơi Này Có Anh (Masew Bootleg)'}
                                singer={'Sơn Tùng M-TP, Masew'}
                            />
                            <SearchResultUser
                                avatar={
                                    'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/avatars/8/a/a/b/8aab7a0386dd9c24b90adcc5ef5a7814.jpg'
                                }
                                name={'Sơn Tùng M-TP'}
                                followers={'2.4M'}
                            />
                            <SearchResultSong
                                cover={
                                    'https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_webp/covers/c/b/cb61528885ea3cdcd9bdb9dfbab067b1_1504988884.jpg'
                                }
                                songName={'Nơi Này Có Anh (Masew Bootleg)'}
                                singer={'Sơn Tùng M-TP, Masew'}
                            />
                            <SearchResultUser
                                avatar={
                                    'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/avatars/8/a/a/b/8aab7a0386dd9c24b90adcc5ef5a7814.jpg'
                                }
                                name={'Sơn Tùng M-TP'}
                                followers={'2.4M'}
                            />
                            <SearchResultSong
                                cover={
                                    'https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_webp/covers/c/b/cb61528885ea3cdcd9bdb9dfbab067b1_1504988884.jpg'
                                }
                                songName={'Nơi Này Có Anh (Masew Bootleg)'}
                                singer={'Sơn Tùng M-TP, Masew'}
                            />
                        </div>
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
