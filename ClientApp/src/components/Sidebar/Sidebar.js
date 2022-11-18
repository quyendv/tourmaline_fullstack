import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { routesConfigPublic } from '../../Routes/routesConfig.js';
import { AlbumIcon, FavoritesIcon, HomeIcon, LibraryIcon, LogoIcon, LogoutIcon, SettingIcon } from '../Icons';
import styles from './Sidebar.module.scss';
import SidebarItem from './SidebarItem';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <div className={cx('wrapper')}>
            <Link to={'/'} className={cx('logo')}>
                <span className={cx('image-logo')}>
                    {/* <HomeScreenImage.logo /> */}
                    <LogoIcon />
                </span>

                <p className={cx('app-name')}>Tourmaline</p>
            </Link>
            <div className={cx('content')}>
                <SidebarItem icon={<HomeIcon />} textContent="Home" to={routesConfigPublic.homeRoute} />
                <SidebarItem icon={<LibraryIcon />} textContent="Library" to={routesConfigPublic.libraryRoute} />
                <SidebarItem icon={<AlbumIcon />} textContent="Album" to={routesConfigPublic.albumRoute} />
                <SidebarItem icon={<FavoritesIcon />} textContent="Favorites" to={routesConfigPublic.favoritesRoute} />
            </div>
            <div className={cx('empty')}></div>

            {/* <div className={cx('actions')}>
                <SidebarItem icon={<SettingIcon />} textContent="Settings" to={routesConfigPublic.settingsRoute} />
                <SidebarItem icon={<LogoutIcon />} textContent="Log out" to={routesConfigPublic.logoutRoute} />
            </div> */}
        </div>
    );
}

export default Sidebar;
