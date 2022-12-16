import { useSelector } from "react-redux";
import * as apis from '../../services'

function DeleteModal() {
    const {setIsOpenDeleteModal, setSongUploaded} = useSelector(state => state.actions)
    const {deleteSongId} = useSelector(state => state.music)
    const {token} = useSelector(state => state.auth)
    const handleDelete = async (e) => {
        e.preventDefault()
        const index = deleteSongId;
        const response = await apis.deleteSong(index, token);
        if(response.status == 200) {
            setSongUploaded((prev) => prev.filter((item) => item.id !== index));
            setIsOpenDeleteModal(prev => !prev)
        }

    };
    return (
        <div className="DeleteModal w-full h-full">
            <div className="fixed top-0 right-0 bottom-0 left-0 z-40 bg-[#000] opacity-30"></div>

            <div className="fixed top-[50%] left-[50%] z-50 w-[540px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-[#fff] py-4 px-[15px]">
            
                <h2>Delete Song</h2>
                <p>Your song will be removed from system. Are you sure?</p>
                <div className="w-full flex justify-end">
                    <span onClick={handleDelete} className="border-black border cursor-pointer">
                        Yes
                    </span>
                    <span onClick={() => setIsOpenDeleteModal(prev => !prev)} className="border-black border">
                        No
                    </span>
                </div>
            </div>
        </div>
    );
}

export default DeletePlaylistModal;
