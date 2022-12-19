import { useSelector } from 'react-redux';
import ModalWrapper from '../ModalWrapper';
import { icons } from '../../../utils/icons';
import { useEffect, useState, useRef } from 'react';
import * as apis from '../../../services';
import { images } from '~/assets/images';
import { AiOutlineUpload } from 'react-icons/ai';
import {Loading} from '../../Load'

const { AiOutlineClose } = icons;
function EditSongModal() {
    const { setIsOpenEditSongModal } = useSelector((state) => state.actions);
    const [songInfo, setSongInfo] = useState({ name: '', description: '', tags: [] });
    const { editSongId } = useSelector((state) => state.music);
    const { token } = useSelector((state) => state.auth);
    const coverFile = useRef();
    const [isLoading, setIsloading] = useState(false)
    const { setInfo, setSongAvatar, songAvatar } = useSelector((state) => state.actions);
    const [coverPreview, setCoverPreview] = useState(songAvatar)
    useEffect(() => {
        const fetchSongInfo = async () => {
            const response = await apis.getInfoSong(editSongId);
            if (response.status === 200) {
                setSongInfo(response.data);
            }
        };
        fetchSongInfo();
        // setCoverPreview bằng ảnh trong db (mà t thấy db k có)
    }, [editSongId]);

    const handleEdit = async () => {

        songInfo.tags.filter((item) => item != '');
        const finalPayload = {
            id: editSongId,
            name: songInfo.name,
            description: songInfo.description,
            cover: coverFile.current,

            tags: songInfo.tags,
        };
        const response = await apis.editSong(finalPayload, token);

        if (coverFile.current) {
            const blob = new Blob([coverFile.current], { type: coverFile.current?.type });
            const url = URL.createObjectURL(blob);
            setSongAvatar(url);
            console.log('in')
        }
        setInfo(songInfo);
        setIsOpenEditSongModal((prev) => !prev);
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
                    onClick={() => setIsOpenEditSongModal(false)}
                >
                    <AiOutlineClose size={20} />
                </span>
                <h3 className="mb-6 border-b border-gray-500 pb-1 text-center text-2xl font-bold">Edit Song</h3>

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
                            value={songInfo.name}
                            onChange={(e) => setSongInfo((prev) => ({ ...prev, name: e.target.value }))}
                        />
                        <input
                            className="w-full rounded-md px-2 py-1.5 [border:1px_solid_#ffffff1a]"
                            placeholder="Description"
                            value={songInfo.description}
                            onChange={(e) => setSongInfo((prev) => ({ ...prev, description: e.target.value }))}
                        />
                        <input
                            className="w-full rounded-md px-2 py-1.5 [border:1px_solid_#ffffff1a]"
                            placeholder="Tags"
                            value={`${songInfo.tags.toString().replaceAll(',', '#')}`}
                            onChange={(e) =>
                                setSongInfo((prev) => {
                                    if (!e.target.value.startsWith('#')) {
                                        return { ...prev, tags: `#${e.target.value}`.split('#') };
                                    }
                                    return { ...prev, tags: e.target.value.split('#') };
                                })
                            }
                        />
                    </div>
                </div>
                {/* Confirm */}
                <div className="mt-4 flex items-center justify-end gap-3">
                    <div className={`cursor-pointer rounded-full bg-[#3c68ef] px-4 py-1.5 ${isLoading && 'pointer-events-none opacity-30'}`} onClick={handleEdit}>
                        {!isLoading ? 'Save' : <Loading />}
                    </div>
                    <div
                        className={`cursor-pointer rounded-full bg-[#375174] px-4 py-1.5 ${isLoading && 'pointer-events-none opacity-30'}`}
                        onClick={() => setIsOpenEditSongModal(false)}
                    >
                        {!isLoading ? 'Cancel' : <Loading />}
                    </div>
                </div>

            </div>
        </ModalWrapper>
    );
}

export default EditSongModal;
