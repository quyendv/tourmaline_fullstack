import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Player from '../../components/Player';
import SidebarRight from '../../components/SidebarRight';
import * as actions from '../../store/actions';
import { crePlaylist } from '../../services/music';
import uploadImage from '../../assets/images';

import Modal from '../../components/Modal';
const cx = classNames.bind(styles);

function DefaultLayout() {
    const [isShowSidebar, setIsShowSidebar] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const { token } = useSelector((state) => state.auth);
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    dispatch(actions.openModal(setIsOpenModal));

    const file = useRef();
    const onChange = (e) => {
        file.current = e.target.files[0];
    };
    const handleCreplaylist = async (e) => {
        const finalPayload = {
            name: title,
            cover: file.current,
        };
        const response = await crePlaylist(finalPayload, token);
        if (response.status) {
            setIsOpenModal((prev) => !prev);
        }
    };
    return (
        <div className="relative flex flex-col overflow-x-hidden bg-gradient-to-r from-[#18162c] to-[#16135e]">
            {isOpenModal && <Modal />}
            <div className="flex w-full">
                <div className="w-[243px] flex-none">
                    <Sidebar />
                </div>
                <div className="flex-1 ">
                    <Header />
                    <Outlet />
                </div>
                <div
                    className={`absolute right-0 top-0 bottom-0 w-[270px] ${
                        isShowSidebar ? 'animate-slide-left' : 'animate-slide-right'
                    }`}
                >
                    <SidebarRight />
                </div>
            </div>

            <div className="absolute bottom-5 z-30 h-[70px] w-full bg-gradient-to-b from-player-from to-player-to rounded-t-3xl">
                <Player setIsShowSidebar={setIsShowSidebar} />
            </div>
        </div>
    );
}

export default DefaultLayout;
