import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as apis from '../../../services';
import ModalWrapper from '../ModalWrapper';

function DeleteModal() {
    const { setIsOpenDeleteModal, setSongUploaded } = useSelector((state) => state.actions);
    const { deleteSongId } = useSelector((state) => state.music);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const handleDelete = async (e) => {
        e.preventDefault();
        const index = deleteSongId;
        const response = await apis.deleteSong(index, token);
        if (response.status == 200) {
            setSongUploaded((prev) => prev.filter((item) => item.id !== index));
            setIsOpenDeleteModal((prev) => !prev);
        }
    };
    return (
        <ModalWrapper>
            <div className="w-[540px]">
                <h2 className="mb-5 text-2xl">Delete Song</h2>
                <p>Your song will be removed from system. Are you sure?</p>
                <div className="flex justify-end gap-3">
                    <span onClick={handleDelete} className="cursor-pointer rounded-full bg-[#3c68ef] px-5 py-1 hover:opacity-75">
                        Yes
                    </span>
                    <span
                        onClick={() => setIsOpenDeleteModal((prev) => !prev)}
                        className="cursor-pointer rounded-full bg-[#375174] px-5 py-1 hover:opacity-75"
                    >
                        No
                    </span>
                </div>
            </div>
        </ModalWrapper>
    );
}

export default DeleteModal;
