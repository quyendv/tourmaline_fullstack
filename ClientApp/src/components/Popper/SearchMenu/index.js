import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './SearchMenu.module.scss';

const cx = classNames.bind(styles);

function SearchMenu({ children }) {
    return (
        <HeadlessTippy
            // visible="true"
            // delay={[0, 200]}
            interactive
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx('popper-wrapper')} tabIndex="-1" {...attrs}>
                    {'...'}
                </div>
            )}
        >
            {children}
        </HeadlessTippy>
    );
}

export default SearchMenu;
