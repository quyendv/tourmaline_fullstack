import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function SidebarItem({ icon, textContent, to, clr }) {
    return (
        <NavLink className={(nav) => cx('sidebar-item', { active: nav.isActive })} to={to} end style={{ '--clr': clr }}>
            <span className={cx('icon')}>{icon}</span>
            <span className={cx('text-content')}>{textContent}</span>
        </NavLink>
    );
}

SidebarItem.propTypes = {
    icon: PropTypes.node,
    textContent: PropTypes.string,
    to: PropTypes.string,
};

export default SidebarItem;
