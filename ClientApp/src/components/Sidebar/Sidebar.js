import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { routesConfigPublicDefault, routesConfigPrivateDefault } from '../../Routes/routesConfig.js';
// import { AlbumIcon, FavoritesIcon, HomeIcon, LibraryIcon, LogoIcon, LogoutIcon, SettingIcon } from '../Icons';
import { LogoIcon } from '../Icons/index.js';
import styles from './Sidebar.module.scss';
import SidebarItem from './SidebarItem';
import { AiOutlineHome } from 'react-icons/ai';
import { VscFolderLibrary } from 'react-icons/vsc';
import { IoAlbumsOutline } from 'react-icons/io5';
import { MdOutlineFavoriteBorder, MdArrowBackIos } from 'react-icons/md';
import { useEffect, useRef } from 'react';
import useWindowSize from '~/hooks/useWindowSize.js';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Sidebar() {
    const menuToggleRef = useRef();
    const firstActive = useRef(true);
    const windowWidth = useWindowSize();
    const { isLoggedIn } = useSelector((state) => state.auth);
    const { setIsOpenLogginModal } = useSelector((state) => state.actions);

    useEffect(() => {
        if (firstActive.current && windowWidth <= 1132) {
            firstActive.current = false;
            menuToggleRef.current.classList.add(styles.active);
        } else if (!firstActive.current && windowWidth > 1132) {
            firstActive.current = true;
            menuToggleRef.current.classList.remove(styles.active);
        }
    }, [windowWidth]);

    const handleToggleMenu = () => {
        // Active menuToggle
        menuToggleRef.current.classList.toggle(styles.active);
        // Active wrapper -> css
    };

    return (
        <div className={cx('wrapper')}>
            <Link to={'/'} className={cx('logo')}>
                <LogoIcon className={cx('image-logo')} />
                <span className={cx('app-name')}>Tourmaline</span>
            </Link>

            <div className={cx('menu-toggle')} ref={menuToggleRef} onClick={handleToggleMenu}>
                <MdArrowBackIos />
            </div>

            <div className={cx('content')}>
                <SidebarItem
                    clr="#f44336"
                    icon={<AiOutlineHome />}
                    textContent="Home"
                    to={routesConfigPublicDefault.homeRoute}
                />
                <SidebarItem
                    clr="#ffa117"
                    icon={<VscFolderLibrary />}
                    textContent="Library"
                    onClick={() => {
                        !isLoggedIn && setIsOpenLogginModal((prev) => prev);
                    }}
                    to={routesConfigPrivateDefault.libraryRoute}
                />
                <SidebarItem
                    clr="#b145e9"
                    icon={<IoAlbumsOutline />}
                    textContent="Feed"
                    onClick={() => {
                        console.log(isLoggedIn)

                        !isLoggedIn && setIsOpenLogginModal((prev) => prev);
                    }}
                    to={routesConfigPrivateDefault.feedRoute}
                />
                <SidebarItem
                    clr="#0fc70f"
                    icon={<MdOutlineFavoriteBorder />}
                    textContent="Favorites"
                    onClick={() => {
                        !isLoggedIn && setIsOpenLogginModal((prev) => prev);
                    }}
                    to={routesConfigPrivateDefault.favoritesRoute}
                />
            </div>
            <div className={cx('empty')}></div>
        </div>
    );
}

export default Sidebar;
