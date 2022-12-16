import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import MenuItem from './MenuItem';
import styles from './DefaultMenu.module.scss';
import { useRef, useState } from 'react';
import { icons } from '~/utils/icons';

const { MdKeyboardArrowLeft } = icons;
const cx = classNames.bind(styles);

function Menu({ children, menuList = [], placement = 'bottom-end', songId = 1, appendBody = false }) {
    const [history, setHistory] = useState([{ data: menuList }]);
    const current = history[history.length - 1];
    const tippyRef = useRef();
    const renderMenuItem = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;
            return (
                <MenuItem
                    key={index}
                    data={item}
                    songId={songId}
                    isParent={isParent}
                    onClick={(e) => {
                        if (isParent) {
                            
                            setHistory((prev) => [...prev, item.children]);
                            // console.log(isParent);
                        }
                        // else: đoạn này có lẽ nên handle các loại actions chỗ này
                        // tippyRef.current._tippy.hide();
                    }}
                />
            );
        });
    };
    const handleResetMenu = () => {
        setHistory((prev) => prev.slice(0, 1));
    };
    const handleBackMenu = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    return (
        <HeadlessTippy
            // visible="true"
            // delay={[0, 200]}
            appendTo={appendBody ? document.body : 'parent'}
            trigger="click"
            interactive
            placement={placement}
            onHide={handleResetMenu}
            ref={tippyRef}
            render={(attrs) => (
                <div
                    className={cx('popper-wrapper')}
                    tabIndex="-1"
                    onClick={e => e.stopPropagation()}
                    {...attrs}
                    // onClick={(e) => {
                    //     e.stopPropagation();
                    //     console.dir(tippyRef.current._tippy);
                    //     // tippyRef.current._tippy.hide();
                    // }}
                >
                    {/* Header Menu */}
                    {history.length > 1 && (
                        <div className={cx('menu-header')}>
                            <span onClick={handleBackMenu}>
                                <MdKeyboardArrowLeft />
                            </span>
                            <p>{current.title}</p>
                        </div>
                    )}

                    {/* Body Menu */}
                    <div>{renderMenuItem()}</div>
                </div>
            )}
        >
            {children}
        </HeadlessTippy>
    );
}

export default Menu;
