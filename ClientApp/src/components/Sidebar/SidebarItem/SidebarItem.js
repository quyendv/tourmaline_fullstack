import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import styles from './SidebarItem.module.scss';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);
function SidebarItem({ icon, textContent, to }) {
    return (
        <NavLink className={(nav) => cx('wrapper', { active: nav.isActive })} to={to} end>
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
