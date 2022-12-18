import { useRef, useState } from 'react';
import { AiFillFolderOpen } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../../Load';
import * as actions from '../../../store/actions';
import * as apis from '../../../services';
import { icons } from '../../../utils/icons';
import ModalWrapper from '../ModalWrapper';

const { AiOutlineClose } = icons;
function CrePlaylistModal() {
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useSelector((state) => state.auth);
    const { setIsOpenCrePlaylistModal, createPlaylist, createAllPlaylist } = useSelector((state) => state.actions);
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();
    const file = useRef();
    console.log(file.current)
    const onChange = (e) => {
        file.current = e.target.files[0];
    };
    const handleCreplaylist = async (e) => {
        const finalPayload = {
            name: title,
            cover: file.current,
        };
        setIsLoading(true);
        const response = await apis.crePlaylist(finalPayload, token);
        setIsLoading(false);
        if (response.status) {
            setIsOpenCrePlaylistModal((prev) => !prev);
            createPlaylist((prev) => [response.data, ...prev]);
            createAllPlaylist((prev) => [response.data, ...prev]);
            dispatch(actions.addPlaylist(response.data));
        }
    };
    return (
        <ModalWrapper>
            <div className="w-[300px]">
                <span className="flex cursor-pointer justify-end" onClick={() => setIsOpenCrePlaylistModal(false)}>
                    <AiOutlineClose size={20} />
                </span>
                <h3 className="mb-6 text-center text-2xl font-bold">Create new playlist</h3>

                <input
                    type="text"
                    placeholder="Enter the playlist name"
                    className="mb-4 w-full rounded-full border border-gray-400 bg-[#375174] px-4 py-2"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div className="relative mb-5 flex items-center rounded-full bg-[#375174] px-4 py-2 text-[#bebebe]">
                    <label className="inline-block ">{file.current.name || 'Choose the cover playlist'}</label>
                    <span className="ml-4">
                        <AiFillFolderOpen />
                    </span>
                    <input type="file" className="absolute inset-0 opacity-0" onChange={onChange} accept="image/*" />
                </div>
                <button
                    onClick={handleCreplaylist}
                    className={`mb-8 w-full rounded-r-full rounded-l-full border border-gray-400 bg-[#2d52aa] px-4 py-2 text-sm ${
                        !title && 'pointer-events-none opacity-30'
                    }`}
                >
                    {isLoading ? <Loading /> : 'Create'}
                </button>
            </div>
        </ModalWrapper>
    );
}
export default CrePlaylistModal;
