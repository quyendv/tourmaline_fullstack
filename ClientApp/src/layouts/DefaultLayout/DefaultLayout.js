import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Outlet, useNavigate} from 'react-router-dom';

import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Player from '../../components/Player';
import SidebarRight from '../../components/SidebarRight';
import * as actions from '../../store/actions'
import { crePlaylist } from '../../services/music';

const cx = classNames.bind(styles);

function DefaultLayout() {
    const [isShowSidebar, setIsShowSidebar] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const {token} = useSelector(state => state.auth)
    const [title, setTitle] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    dispatch(actions.openModal(setIsOpenModal))
    const handleCreplaylist = async (e) => {
        const finalPayload = {
            name : title
        }
        const response = await crePlaylist(finalPayload, token)
        if(response.status) {
            setIsOpenModal(prev => !prev)
        }
    }
    return (
        <div className="relative flex flex-col overflow-x-hidden bg-gradient-to-r from-[#18162c] to-[#16135e]">
            {isOpenModal && <div className="fixed top-0 right-0 bottom-0 left-0 z-40 bg-[#000] opacity-30"></div>}
            {isOpenModal && (
                <div
                    className="fixed top-[50%] left-[50%] z-50 w-[300px] translate-x-[-50%] translate-y-[-50%] bg-[#fff] px-[15px]">
                    <h3 className="mb-4 text-center text-2xl font-bold">Tạo playlist mới</h3>
                    <input
                        type="text"
                        placeholder="Nhập tên playlist"
                        className="mb-8 w-full rounded-r-full rounded-l-full border border-gray-400 bg-[#000]/5 px-4 py-2 text-sm"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                   />
                    <button onClick={handleCreplaylist}
                            className="mb-8 w-full rounded-r-full rounded-l-full border border-gray-400 bg-[#000]/5 px-4 py-2 text-sm">
                        Tạo mới
                    </button>
                </div>
            )}
            <div className="flex w-full">
                <div className="w-[243px] flex-none">
                    <Sidebar/>
                </div>
                <div className="flex-1 ">
                    <Header/>
                    <Outlet/>
                </div>
                <div
                    className={`absolute right-0 top-0 bottom-0 w-[270px] ${
                        isShowSidebar ? 'animate-slide-left' : 'animate-slide-right'
                    }`}
                >
                    <SidebarRight/>
                </div>
            </div>

            <div className="absolute bottom-5 z-30 h-[70px] w-full border border-red-500">
                <Player setIsShowSidebar={setIsShowSidebar}/>
            </div>
        </div>
    );
}

export default DefaultLayout;
