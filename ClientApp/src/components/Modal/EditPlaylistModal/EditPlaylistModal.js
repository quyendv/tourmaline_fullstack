

import { useSelector } from 'react-redux';
import ModalWrapper from '../ModalWrapper';
import { icons } from '../../../utils/icons';
import { useEffect, useState, useRef } from 'react';
import * as apis from '../../../services';

const { AiOutlineClose } = icons;
function EditPlaylistModal() {
    const {setIsOpenEditPlaylistModal} = useSelector(state => state.actions)
    const { token } = useSelector((state) => state.auth);
    const file = useRef();
    const [playlistInfo, setPlaylistInfo] = useState({name: '', username: '', description: '', file: ''})
    const {editPlaylistId} = useSelector(state => state.music)
    useEffect(() => {
        const fetchPlaylistInfo = async() => {
            const response = await apis.getPlaylist(editPlaylistId, token)

            setPlaylistInfo(response.data)
        }
        fetchPlaylistInfo()
    }, [editPlaylistId]);
    const handleEdit = async () => {
        const finalPayload = {
            id: editPlaylistId,
            name: playlistInfo.name,
            description: playlistInfo.description,
            file: file.current
        }
        const editPlaylist = async() => {
            const response = await apis.editPlaylist(finalPayload, token)
            console.log(response)
        }
        editPlaylist()

    };
    const onChange = (e) => {
        file.current = e.target.files[0];
    };
    return (
        <ModalWrapper>
            <div className="flex w-[600px] flex-col">
                <span className="flex cursor-pointer justify-end" onClick={() => setIsOpenEditPlaylistModal(false)}>
                    <AiOutlineClose size={20} />
                </span>
                <h3 className="mb-6 text-center text-2xl font-bold">Edit Playlist</h3>
                <input
                    placeholder="Name"
                    value={playlistInfo.name}
                    onChange={(e) => setPlaylistInfo((prev) => ({ ...prev, name: e.target.value }))}
                />
                <input
                    placeholder="Description"
                    value={playlistInfo.description}
                    onChange={(e) => setPlaylistInfo((prev) => ({ ...prev, description: e.target.value }))}
                />

                <input type="file" onChange={onChange} accept="image/*"></input>
                <button onClick={handleEdit}>Edit</button>
            </div>
        </ModalWrapper>
    );
}

export default EditPlaylistModal;
