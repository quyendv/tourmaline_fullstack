import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './UserMenu.module.scss';

import * as actions from '../../../store/actions';

const cx = classNames.bind(styles);

function MenuItem({ data }) {
    const dispatch = useDispatch();
    return (
        <Link className={cx('menu-item', { 'separate-top': !!data.separateTop })} to={data.to}>
            <div onClick={(e) => {
                if(data.title === 'Logout') {
                    e.stopPropagation()
                    dispatch(actions.logout())
                }
            }}>
                {data.icon && <span className={cx('menu-item__icon')}>{data.icon}</span>}
                <span className={cx('menu-item__title')}>{data.title}</span>
            </div>
        </Link>
    );
}

export default MenuItem;
