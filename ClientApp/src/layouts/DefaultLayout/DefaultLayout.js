import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Player from '../../components/Player';
import SidebarRight from '../../components/SidebarRight';
import * as actions from '../../store/actions';
import { crePlaylist } from '../../services/music';
import CommentModal from '../../components/CommentModal';
import Modal from '../../components/Modal';

function DefaultLayout() {
    const [isShowSidebar, setIsShowSidebar] = useState(false);
    const [isOpenCrePlaylistModal, setIsOpenCrePlaylistModal] = useState(false);
    const [isOpenCommentModal, setIsOpenCommentModal] = useState(false);

    const { token } = useSelector((state) => state.auth);
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.setIsOpenCrePlaylistModal(setIsOpenCrePlaylistModal));
        dispatch(actions.setIsOpenCommentModal(setIsOpenCommentModal));
    }, []);

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
            setIsOpenCrePlaylistModal((prev) => !prev);
        }
    };
    return (
        <div className="relative flex flex-col overflow-x-hidden bg-gradient-to-r from-[#18162c] to-[#16135e]">
            {isOpenCrePlaylistModal && <Modal />}
            {isOpenCommentModal && <CommentModal/>}
            <div className="flex w-full">
                <div className="w-[243px] flex-none">
                    <Sidebar />
                </div>
                <div className="w-[calc(100vw-var(--sidebar-width))]">
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

            {/* Sửa: k dùng màu trong suốt, lúc scroll nhìn thấy phần phía sau */}
            <div className="absolute bottom-0 z-30 w-full bg-[color:#130c1c] py-3 px-4">
                <Player setIsShowSidebar={setIsShowSidebar} />
            </div>
        </div>
    );
}

export default DefaultLayout;
