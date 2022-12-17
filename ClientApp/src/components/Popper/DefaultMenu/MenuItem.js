import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { icons } from '~/utils/icons';
import * as actions from '../../../store/actions';
import * as apis from '../../../services';
import styles from './DefaultMenu.module.scss';
import { forwardRef } from 'react';

const { HiChevronRight } = icons;
const cx = classNames.bind(styles);

function MenuItem({ data, isParent = 'false', songId, onClick = () => {} }, ref) {
    const { setIsOpenCommentModal, setSongUploaded, setIsOpenDeleteModal, setIsOpenDeletePlaylistModal } = useSelector(
        (state) => state.actions,
    );
    const { token } = useSelector((state) => state.auth);
    const Component = data.to ? Link : 'div';
    const dispatch = useDispatch();

    const handleOpenCommentModal = (e) => {
        e.stopPropagation();
        setIsOpenCommentModal((prev) => !prev);
        dispatch(actions.setCommentSongId(songId));
    };
    const handleClickMenuItem = (e) => {
        e.stopPropagation();
        onClick(); // chạy fn truyền vào trước
        if (data.title === 'Logout') {
            e.stopPropagation();
            dispatch(actions.logout());
        }
        if (data.title === 'Comments') {
            handleOpenCommentModal(e);
        }
        if (data.type === 'playlist') {
            const addToPlaylist = async () => {
                const response = await apis.addToPlaylist(songId, data.id, token);
                console.log(response);
            };
            addToPlaylist();
        }
        if (data.type === 'addToNext') {
            const fetchSong = async () => {
                const response = await apis.getInfoSong(songId, token);
                dispatch(actions.addToNextUp(response.data));
            };
            fetchSong();
        }
        if (data.type === 'deleteSong') {
            setIsOpenDeleteModal((prev) => !prev);
            dispatch(actions.deleteSongId(data.id));
            // handleDelete()
        }
        if (data.type === 'deletePlaylist') {
            setIsOpenDeletePlaylistModal((prev) => !prev);
            dispatch(actions.deletePlaylistId(data.id));
            console.log(data.id);
        }
        if (data.type === 'addSongToNextUp') {
            const addSongsToNextUp = async () => {
                const response = await apis.getPlaylist(data.id, token);
                response.data.songs.forEach((item) => {
                    dispatch(actions.addToNextUp(item));
                });
            };
            addSongsToNextUp();
        }
        if (data.type === 'addHomeSongToNextUp') {
            const addSongsToNextUp = async () => {
                switch (data.playlistType) {
                    case 'hots':
                        const res1 = await apis.getSuggestion(token);
                        res1.data.forEach((item) => {
                            dispatch(actions.addToNextUp(item));
                        });
                        break;
                    case 'top50':
                        const res2 = await apis.getTop50();
                        res2.data.result.forEach((item) => {
                            dispatch(actions.addToNextUp(item));
                        });
                        break;
                    default:
                        return;
                }
            };
            addSongsToNextUp();
        }
        if (!isParent) {
            ref.current._tippy.hide();
        }
    };

    return (
        <Component
            className={cx('menu-item', { 'separate-top': !!data.separateTop })}
            to={data.to}
            onClick={handleClickMenuItem}
        >
            {data.icon && <span className={cx('menu-item__icon')}>{data.icon}</span>}
            <span className={cx('menu-item__title')}>{data.title}</span>
            {isParent && (
                <span className={cx('menu-item__right-icon')}>
                    <HiChevronRight />
                </span>
            )}
        </Component>
    );
}

// Khai báo function Child(props, ref) 
// props có thể tách destructuring, ref là ref nhận vào từ cha dưới dạng <Child ref={...} />
// Chú ý, ta có thể tạo refChild bằng useRef rồi truyền vào Child, trong child gán ref={ref} nhận đc vào element cần
// -> Parent có thể điều khiển element trong Child
// Ngược lại, có thể tạo refParent rồi truyền vào child dạng ref={refParent <nhớ key luôn là ref ở mọi chỗ>
// -> từ trong component con có thể dùng element trong Parent Component luôn, như close tippy trong bài này
export default forwardRef(MenuItem);
