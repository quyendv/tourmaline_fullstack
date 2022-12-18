import { useSelector } from 'react-redux';
import ModalWrapper from '../ModalWrapper';
import { icons } from '../../../utils/icons';
import { useEffect, useState, useRef } from 'react';
import * as apis from '../../../services';

const { AiOutlineClose } = icons;
function EditSongModal() {
    const { setIsOpenEditSongModal } = useSelector((state) => state.actions);
    const [songInfo, setSongInfo] = useState({ name: '', description: '', tags: [] });
    const { editSongId } = useSelector((state) => state.music);
    const { token } = useSelector((state) => state.auth);
    const file = useRef();
    useEffect(() => {
        const fetchSongInfo = async () => {
            const response = await apis.getInfoSong(editSongId);
            if (response.status == 200) {
                setSongInfo(response.data);
            }
        };
        fetchSongInfo();
    }, [editSongId]);
    const handleEdit = async () => {
        console.log(songInfo);
        songInfo.tags.filter(item => item != '')
        const finalPayload = {
            id: editSongId,
            name: songInfo.name,
            description: songInfo.description,
            cover: file.current,
            tags: songInfo.tags
        };
        console.log(finalPayload);
        const response = await apis.editSong(finalPayload, token);
        console.log(response);
    };
    const onChange = (e) => {
        file.current = e.target.files[0];
    };
    return (
        <ModalWrapper>
            <div className="flex w-[600px] flex-col">
                <span className="flex cursor-pointer justify-end" onClick={() => setIsOpenEditSongModal(false)}>
                    <AiOutlineClose size={20} />
                </span>
                <h3 className="mb-6 text-center text-2xl font-bold">Edit Song</h3>
                <input
                    placeholder="Name"
                    value={songInfo.name}
                    onChange={(e) => setSongInfo((prev) => ({ ...prev, name: e.target.value }))}
                />
                <input
                    placeholder="Description"
                    value={songInfo.description}
                    onChange={(e) => setSongInfo((prev) => ({ ...prev, description: e.target.value }))}
                />
                <input
                    placeholder="Tags"
                    value={`${songInfo.tags.toString().replaceAll(',', '#')}`}
                    onChange={(e) =>
                        setSongInfo((prev) => {
                            if (!e.target.value.startsWith('#')) {
                                return   ({ ...prev, tags: `#${e.target.value}`.split('#') })
                            }
                            return ({ ...prev, tags: e.target.value.split('#') });

                        })
                    }
                />
                <input type="file" onChange={onChange} accept="image/*"></input>
                <button onClick={handleEdit}>Edit</button>
            </div>
        </ModalWrapper>
    );
}

export default EditSongModal;
