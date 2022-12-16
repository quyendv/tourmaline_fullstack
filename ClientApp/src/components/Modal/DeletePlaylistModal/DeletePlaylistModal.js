import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as apis from '../../../services';


function DeletePlaylistModal() {
    const { setIsOpenDeletePlaylistModal, createPlaylist, createAllPlaylist } = useSelector((state) => state.actions);
    const { deletePlaylistId } = useSelector((state) => state.music);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate()
    const handleDeletePlaylist = async (e) => {
        e.preventDefault();
        console.log(deletePlaylistId)
        const index = deletePlaylistId;
        const response = await apis.deletePlaylist(index, token);
        if (response.status == 200) {
            createPlaylist((prev) => prev.filter((item) => item.id != index));
            createAllPlaylist((prev) => prev.filter((item) => item.id != index));
            navigate(-1)
            setIsOpenDeletePlaylistModal((prev) => !prev);
        }
    };
    return (
        <div className="DeletePlaylistModal h-full w-full">
            <div className="fixed top-0 right-0 bottom-0 left-0 z-40 bg-[#000] opacity-30"></div>

            <div className="fixed top-[50%] left-[50%] z-50 w-[540px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-[#fff] py-4 px-[15px]">
                <h2>Delete Playlist</h2>
                <p>Your platlist will be removed from system. Are you sure?</p>
                <div className="flex w-full justify-end">
                    <span onClick={handleDeletePlaylist} className="cursor-pointer border border-black">
                        Yes
                    </span>
                    <span onClick={() => setIsOpenDeletePlaylistModal((prev) => !prev)} className="border border-black">
                        No
                    </span>
                </div>
            </div>
        </div>
    );
}

export default DeletePlaylistModal;
