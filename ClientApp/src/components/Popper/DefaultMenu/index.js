import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import MenuItem from './MenuItem';
import styles from './DefaultMenu.module.scss';

const cx = classNames.bind(styles);

function Menu({ children, menuList, placement, songId }) {
    return (
        <HeadlessTippy
            // visible="true"
            // delay={[0, 200]}
            appendTo={document.body}
            trigger="click"
            interactive
            placement={placement || 'bottom-end'}
            render={(attrs) => (
                <div className={cx('popper-wrapper')} tabIndex="-1" {...attrs} onClick={(e) => e.stopPropagation()}>
                    {menuList.map((menuItem, index) => (
                        <MenuItem songId={songId} key={index} data={menuItem} />
                    ))}
                </div>
            )}
        >
            {children}
        </HeadlessTippy>
    );
}

export default Menu;
