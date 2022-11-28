import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';

import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { Outlet } from 'react-router-dom';
import Player from '../../components/Player';
import SidebarRight from '../../components/SidebarRight';
import { useState } from 'react';
const cx = classNames.bind(styles);

function DefaultLayout() {
    const [isShowSidebar, setIsShowSidebar] = useState(true);

    return (
        <div className="relative flex flex-col bg-[#000000]">
            <div className="flex w-full">
                <div className='w-[243px] flex-none'>
                    <Sidebar />
                </div>
                <div className="flex-1 ">
                    <Header />
                    <Outlet />
                </div>
                {isShowSidebar && (
                    <div className={`w-[270px] flex-none hidden  1280:flex ${isShowSidebar ? 'animate-slide-left' : 'animate-slide-right'}`}>
                        <SidebarRight />
                    </div>
                )}
            </div>

            <div className="absolute bottom-5 h-[70px] w-full border border-red-500">
                <Player setIsShowSidebar={setIsShowSidebar} />
            </div>
        </div>
    );
}
export default DefaultLayout;
