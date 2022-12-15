import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { icons } from '~/utils/icons';
import * as actions from '../../../store/actions';
import * as apis from '../../../services'
import styles from './DefaultMenu.module.scss';

const { HiChevronRight } = icons;
const cx = classNames.bind(styles);

function MenuItem({ data, isParent = 'false', songId, onClick = () => {} }) {
    const { setIsOpenCommentModal } = useSelector((state) => state.actions);
    const {token} = useSelector(state => state.auth)
    const Component = data.to ? Link : 'div';
    const dispatch = useDispatch();

    const handleOpenCommentModal = (e) => {
        e.stopPropagation();
        setIsOpenCommentModal((prev) => !prev);
        dispatch(actions.setCommentSongId(songId));
    };
    const handleClickMenuItem = (e) => {
        e.stopPropagation()
        onClick(); // chạy fn truyền vào trước
        if (data.title === 'Logout') {
            e.stopPropagation();
            dispatch(actions.logout());
        }
        if (data.title === 'Comments') {
            handleOpenCommentModal(e);
        }
        if(data.type == 'playlist') {
            const addToPlaylist = async () => {
                const response = await apis.addToPlaylist(songId, data.id, token)
                console.log(response)
            }
            addToPlaylist()
        }
        // e.stopPropagation();
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

export default MenuItem;
