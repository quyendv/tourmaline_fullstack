import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './DefaultMenu.module.scss';

import * as actions from '../../../store/actions';

const cx = classNames.bind(styles);

function MenuItem({ data, songId }) {
    const {setIsOpenCommentModal} = useSelector(state => state.actions)
    const handleOpenCommentModal = (e) => {
        e.stopPropagation()
        setIsOpenCommentModal(prev => !prev)
        dispatch(actions.setCommentSongId(songId))

    }
    const dispatch = useDispatch();
    return (
        <div
            className={cx('menu-item', { 'separate-top': !!data.separateTop })}
            to={data.to}
            onClick={(e) => {
                if (data.title === 'Logout') {
                    e.stopPropagation();
                    dispatch(actions.logout());
                }
                if(data.title === 'Comments') {
                    handleOpenCommentModal(e)
                }
            }}
        >
            {data.icon && <span className={cx('menu-item__icon')}>{data.icon}</span>}
            <span className={cx('menu-item__title')}>{data.title}</span>
        </div>
    );
}

export default MenuItem;
