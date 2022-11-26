import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';

import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { Outlet } from 'react-router-dom';
import Player from '../../components/Player';
import SidebarRight from '../../components/SidebarRight';
const cx = classNames.bind(styles);
function DefaultLayout() {
    return (
        <div className="relative flex flex-col">
            <div className="flex w-full">
                <div>
                    <Sidebar />
                </div>
                <div className="flex-1 bg-[#000000]">
                    <Header />
                    <Outlet />
                </div>
                <div className='1280:flex hidden animate-slide-left'>
                    <SidebarRight />
                </div>
            </div>

            <div className="absolute bottom-5 h-[70px] w-full border border-red-500">
                <Player />
            </div>
        </div>
    );
}
export default DefaultLayout;
