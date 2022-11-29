import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './UserMenu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ data }) {
    return (
        <Link className={cx('menu-item', { 'separate-top': !!data.separateTop })} to={data.to}>
            {data.icon && <span className={cx('menu-item__icon')}>{data.icon}</span>}
            <span className={cx('menu-item__title')}>{data.title}</span>
        </Link>
    );
}

export default MenuItem;
