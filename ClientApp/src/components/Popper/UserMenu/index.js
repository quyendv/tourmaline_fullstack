import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import MenuItem from './MenuItem';
import styles from './UserMenu.module.scss';

const cx = classNames.bind(styles);

function UserMenu({ children, menuList }) {
    return (
        <HeadlessTippy
            // visible="true"
            // delay={[0, 200]}
            interactive
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx('popper-wrapper')} tabIndex="-1" {...attrs}>
                    {menuList.map((menuItem, index) => (
                        <MenuItem key={index} data={menuItem} />
                    ))}
                </div>
            )}
        >
            {children}
        </HeadlessTippy>
    );
}

export default UserMenu;
