import { useSelector } from 'react-redux';
import ModalWrapper from '../ModalWrapper';
import { icons } from '../../../utils/icons';
import { useEffect, useState } from 'react';
import * as apis from '../../../services';

const { AiOutlineClose } = icons;
function EditSongModal() {
    const { setIsOpenEditSongModal } = useSelector((state) => state.actions);
    const [songInfo, setSongInfo] = useState({name:'',description: '',tags:[]});
    const { editSongId } = useSelector((state) => state.music);
    useEffect(() => {
        const fetchSongInfo = async () => {
            const response = await apis.getInfoSong(editSongId);
            if (response.status == 200) {
                setSongInfo(response.data);
            }
        };
        fetchSongInfo();
    }, [editSongId]);
    const handleEdit = () => {
        // const response = await apis.editSong()
        const finalPayload = {
            ...songInfo,
            tags: songInfo.tags.splice(0, 1)
        }
        console.log(songInfo)
    }
    return (
        <ModalWrapper>
            <div className="w-[600px] flex flex-col">
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
                    value={ `${songInfo.tags.toString().replaceAll("," , "#")}`}
                    onChange={(e) => setSongInfo((prev) => ({ ...prev, tags: e.target.value.split('#') }))}
                />
                <button onClick={handleEdit}>Edit</button>
            </div>
        </ModalWrapper>
    );
}

export default EditSongModal;
