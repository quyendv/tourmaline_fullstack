import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { icons } from '../../../utils/icons';
import * as apis from '../../../services';
import moment from 'moment';

const { AiOutlineClose, FaRegComment, BsThreeDots } = icons;

function CommentModal() {
    const { setIsOpenCommentModal } = useSelector((state) => state.actions);
    const [commentValue, setCommentValue] = useState('');
    const { token } = useSelector((state) => state.auth);
    const { curSongId } = useSelector((state) => state.music);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComment = async () => {
            const response = await apis.getAllComment(curSongId, token);
            if (response.status == 200) {
                console.log(response);
                setComments(response.data.reverse());
            }
        };
        fetchComment();
    }, []);
    const handlePostComment = async (e) => {
        const finalPayload = {
            id: curSongId,
            content: commentValue,
        };
        if (e.keyCode == '13') {
            const response = await apis.postComment(finalPayload, token);
            console.log(response);
            if (response.status === 200) {
                setCommentValue('');
                setComments((prev) => [response.data, ...prev]);
            }
        }
    };

    const handleEditComment = async () => {
        const response = await apis.editComment(curSongId, token);
        console.log(response);
    };

    const handleDeleteComment = async () => {
        const response = await apis.deleteComment(curSongId, token);
        console.log(response);
    };

    return (
        <div className="CommentModal h-full w-full">
            <div className="fixed top-0 right-0 bottom-0 left-0 z-40 bg-[#000] opacity-30"></div>
            <div className="fixed top-[50%] left-[50%] z-50 h-[322px] w-[650px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-[#fff]">
                <div className="relative px-1">
                    <h2 className="border-b border-gray-500 py-2 text-center text-3xl font-semibold">Bình luận</h2>
                    <span
                        onClick={() => setIsOpenCommentModal((prev) => !prev)}
                        className="absolute top-0 right-1 cursor-pointer"
                    >
                        <AiOutlineClose size={20} />
                    </span>
                </div>
                <div className="relative w-full px-3">
                    <span className="text-[#000] opacity-60">{`${comments.length} bình luận`}</span>
                    {comments.length == 0 ? (
                        <div className="flex h-full w-full flex-auto  flex-col items-center justify-center">
                            <span className="opacity-30">
                                <FaRegComment size={50} />
                            </span>
                            <h3 className="opacity-60">Chưa có bình luận nào</h3>
                        </div>
                    ) : (
                        <div>
                            {comments.map((item, index) => (
                                <div key={index}>
                                    <span>{`${item.username || item.userName}: `}</span>
                                    <span className="overflow-hidden">{item.content} </span>

                                    <span className="text-xs opacity-30">{moment(item.createTime).fromNow()}</span>
                                    <span>
                                        <BsThreeDots />
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                    <input
                        className="fixed bottom-2 right-1 left-1 mt-2 h-[40px] rounded-l-full rounded-r-full bg-[#000]/5 px-4 py-1 text-xl"
                        placeholder="Write a comment"
                        value={commentValue}
                        onChange={(e) => setCommentValue(e.target.value)}
                        onKeyUp={handlePostComment}
                    />
                    <div className="h-[50px]"></div>
                </div>
            </div>
        </div>
    );
}

export default CommentModal;
