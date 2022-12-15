import { icons } from '../../utils/icons';
import { crePlaylist } from '../../services/music';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef } from 'react';

import Loading from '../Loading';
import * as actions from '../../store/actions'

const { AiOutlineClose } = icons;
function Modal() {
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useSelector((state) => state.auth);
    const { setIsOpenCrePlaylistModal, createPlaylist, createAllPlaylist } = useSelector((state) => state.actions);
    const [title, setTitle] = useState('');
    const dispatch = useDispatch()
    const file = useRef();
    const onChange = (e) => {
        file.current = e.target.files[0];
    };
    const handleCreplaylist = async (e) => {
        const finalPayload = {
            name: title,
            cover: file.current,
        };
        setIsLoading(true);
        const response = await crePlaylist(finalPayload, token);
        setIsLoading(false);
        if (response.status) {
            setIsOpenCrePlaylistModal((prev) => !prev);
            createPlaylist((prev) => [response.data, ...prev]);
            createAllPlaylist(prev => [response.data, ...prev]);
            dispatch(actions.addPlaylist(response.data))
        }
    };
    return (
        <div className="h-full w-full">
            <div className="fixed top-0 right-0 bottom-0 left-0 z-40 bg-[#000] opacity-30"></div>

            <div className="fixed top-[50%] left-[50%] z-50 w-[300px] translate-x-[-50%] translate-y-[-50%] bg-[#fff] px-[15px] rounded-md">
                <span className="mr-[-15px] flex cursor-pointer justify-end" onClick={() => setIsOpenCrePlaylistModal(false)}>
                    <AiOutlineClose />
                </span>
                <h3 className="mb-4 text-center text-2xl font-bold">Tạo playlist mới</h3>

                <input
                    type="text"
                    placeholder="Nhập tên playlist"
                    className="mb-8 w-full rounded-r-full rounded-l-full border border-gray-400 bg-[#000]/5 px-4 py-2 text-sm"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input type="file" onChange={onChange} accept="image/*" />
                <button
                    onClick={handleCreplaylist}
                    className={`mb-8 w-full rounded-r-full rounded-l-full border border-gray-400 bg-[#000]/5 px-4 py-2 text-sm ${
                        !title && 'pointer-events-none opacity-30'
                    }`}
                >
                    {isLoading ? <Loading /> : 'Tạo mới'}
                </button>
            </div>
        </div>
    );
}
export default Modal;
