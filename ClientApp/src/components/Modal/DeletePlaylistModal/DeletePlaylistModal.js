import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as apis from '../../../services';
import ModalWrapper from '../ModalWrapper';

function DeletePlaylistModal() {
    const { setIsOpenDeletePlaylistModal, createPlaylist, createAllPlaylist } = useSelector((state) => state.actions);
    const { deletePlaylistId } = useSelector((state) => state.music);
    const [isLoading, setIsLoading] = useState(false)
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const handleDeletePlaylist = async (e) => {
        e.preventDefault();
        console.log(deletePlaylistId);
        const index = deletePlaylistId;
        setIsLoading(true)
        const response = await apis.deletePlaylist(index, token);
        setIsLoading(false)
        if (response.status === 200) {
            createPlaylist((prev) => prev.filter((item) => item.id != index));
            createAllPlaylist((prev) => prev.filter((item) => item.id != index));
            navigate('/library');
            setIsOpenDeletePlaylistModal((prev) => !prev);
        }
    };
    return (
        <ModalWrapper>
            <div className="w-[540px]">
                <h2 className="mb-5 text-2xl">Delete Playlist</h2>
                <p>Your playlist will be removed from system. Are you sure?</p>
                <div className="flex justify-end gap-3">
                    <span
                        onClick={handleDeletePlaylist}
                        className={`cursor-pointer rounded-full bg-[#3c68ef] px-5 py-1 hover:opacity-75 ${isLoading && 'pointer-events-none opacity-30'}`}
                    >
                        Yes
                    </span>
                    <span
                        onClick={() => setIsOpenDeletePlaylistModal((prev) => !prev)}
                        className={`cursor-pointer rounded-full bg-[#375174] px-5 py-1 hover:opacity-75 ${isLoading && 'pointer-events-none opacity-30'}`}
                    >
                        No
                    </span>
                </div>
            </div>
        </ModalWrapper>
    );
}

export default DeletePlaylistModal;
