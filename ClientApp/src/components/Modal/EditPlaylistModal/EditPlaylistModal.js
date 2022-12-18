import { useSelector } from 'react-redux';
import ModalWrapper from '../ModalWrapper';
import { icons } from '../../../utils/icons';
import { useEffect, useState, useRef } from 'react';
import * as apis from '../../../services';
import { images } from '~/assets/images';
import { AiOutlineUpload } from 'react-icons/ai';

const { AiOutlineClose } = icons;
function EditPlaylistModal() {
    const { setIsOpenEditPlaylistModal } = useSelector((state) => state.actions);
    const { token } = useSelector((state) => state.auth);
    const coverFile = useRef();
    const [playlistInfo, setPlaylistInfo] = useState({ name: '', username: '', description: '', file: '' });
    const { editPlaylistId } = useSelector((state) => state.music);
    const [coverPreview, setCoverPreview] = useState(images.defaultCoverPlaylist);

    useEffect(() => {
        const fetchPlaylistInfo = async () => {
            const response = await apis.getPlaylist(editPlaylistId, token);

            setPlaylistInfo(response.data);
        };
        fetchPlaylistInfo();
    }, [editPlaylistId]);

    const handleEdit = async () => {
        const finalPayload = {
            id: editPlaylistId,
            name: playlistInfo.name,
            description: playlistInfo.description,
            file: coverFile.current,
        };
        const editPlaylist = async () => {
            const response = await apis.editPlaylist(finalPayload, token);
            console.log(response);
        };
        editPlaylist();
    };
    const handleChangeCover = (e) => {
        coverFile.current = e.target.files[0];
        const newCover = URL.createObjectURL(coverFile.current);
        setCoverPreview(newCover);
        return () => URL.revokeObjectURL(newCover);
    };

    return (
        <ModalWrapper>
            <div className="w-[600px]">
                <span
                    className="absolute top-2.5 right-2.5 grid cursor-pointer place-content-center"
                    onClick={() => setIsOpenEditPlaylistModal(false)}
                >
                    <AiOutlineClose size={20} />
                </span>
                <h3 className="mb-6 border-b border-gray-500 pb-1 text-center text-2xl font-bold">Edit Playlist</h3>
                {/* Edit Body */}
                <div className="flex gap-3">
                    {/* Cover */}
                    <div className="relative h-32 w-32 flex-shrink-0 cursor-pointer rounded-sm">
                        <img src={coverPreview} alt="cover" className="h-full w-full object-cover" />
                        <div className="absolute left-0 bottom-0 right-0 flex items-center justify-center gap-1 bg-[#00000080]">
                            <AiOutlineUpload />
                            <span className="text-sm">Change Cover</span>
                        </div>
                        <input
                            type="file"
                            className="absolute inset-0 opacity-0"
                            onChange={handleChangeCover}
                            accept="image/*"
                        />
                    </div>

                    {/* Other data */}
                    <div className="flex w-full flex-col gap-1.5">
                        <input
                            className="w-full rounded-md px-2 py-1.5 [border:1px_solid_#ffffff1a]"
                            placeholder="Name"
                            value={playlistInfo.name}
                            onChange={(e) => setPlaylistInfo((prev) => ({ ...prev, name: e.target.value }))}
                        />
                        <input
                            className="w-full rounded-md px-2 py-1.5 [border:1px_solid_#ffffff1a]"
                            placeholder="Description"
                            value={playlistInfo.description}
                            onChange={(e) => setPlaylistInfo((prev) => ({ ...prev, description: e.target.value }))}
                        />
                        {/* Confirm */}
                        <div className="mt-2 flex items-center justify-end gap-3">
                            <div className="cursor-pointer rounded-full bg-[#3c68ef] px-4 py-1.5" onClick={handleEdit}>
                                Save
                            </div>
                            <div
                                className="cursor-pointer rounded-full bg-[#375174] px-4 py-1.5"
                                onClick={() => setIsOpenEditPlaylistModal(false)}
                            >
                                Cancel
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ModalWrapper>
    );
}

export default EditPlaylistModal;
