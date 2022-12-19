import { useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { icons } from '../../../utils/icons';
import * as apis from '../../../services';
import moment from 'moment';
import ModalWrapper from '../ModalWrapper';
import CommentItem from '~/components/CommentItem';
import {Loading} from '../../Load'

const { AiOutlineClose, FaRegComment, BsThreeDots } = icons;

function CommentModal() {
    const { setIsOpenCommentModal } = useSelector((state) => state.actions);
    const [commentValue, setCommentValue] = useState('');
    const { token } = useSelector((state) => state.auth);
    const { commentSongId } = useSelector((state) => state.music);
    const [isLoading, setIsLoading] = useState(false)
    const [comments, setComments] = useState([]);
    const {username} = useSelector(state => state.user)
    const loadingCommentValue = useRef()
    useEffect(() => {
        const fetchComment = async () => {
            const response = await apis.getAllComment(commentSongId, token);
            if (response.status === 200) {
                setComments(response.data.reverse());
            }
        };
        fetchComment();
    }, []);
    const handlePostComment = async (e) => {
        const finalPayload = {
            id: commentSongId,
            content: commentValue,
        };

        if (e.keyCode === 13) {
            setIsLoading(true)
            loadingCommentValue.current = commentValue

            const response = await apis.postComment(finalPayload, token);
            setIsLoading(false)
            console.log(response);
            if (response.status == 200) {
                setCommentValue('');
                setComments((prev) => [response.data, ...prev]);
            }
        }
    };

    const handleEditComment = async () => {
        const response = await apis.editComment(commentSongId, token);
        console.log(response);
    };

    const handleDeleteComment = async () => {
        const response = await apis.deleteComment(commentSongId, token);
        console.log(response);
    };

    return (
        <ModalWrapper>
            <div className="relative flex max-h-[450px] min-h-[300px] w-[650px] flex-col gap-2">
                {/* Title */}
                <div className="relative">
                    <h2 className="border-b border-gray-500 py-2 text-center text-3xl font-semibold">Comments</h2>
                    <span
                        onClick={() => setIsOpenCommentModal((prev) => !prev)}
                        className="absolute top-0 right-1 cursor-pointer"
                    >
                        <AiOutlineClose size={20} />
                    </span>
                </div>
                {/* Number of Comments */}
                <div className="text-sm text-[#ffffff80]">{`${comments.length} comments`}</div>
                {/* Contents */}
                <div className="flex-1 overflow-y-auto">
                    {comments.length === 0 ? (
                        <div className="grid h-full w-full place-content-center">
                            <div className="text-center text-8xl opacity-30">
                                <FaRegComment />
                            </div>
                            <h3 className="mt-4 opacity-60">There are no comments yet</h3>
                        </div>
                    ) : (
                        <>
                            {isLoading && <CommentItem className="opacity-30" data={{
                                username: username,
                                content: loadingCommentValue.current
                            }} isLoading />}
                            {comments.map((item, index) => (
                                <CommentItem key={index} data={item} />
                            ))}
                        </>
                    )}
                </div>
                {/* Comment Input */}
                <div className="mt-5 rounded-full bg-[#375174] px-4 py-1.5 relative">
                    <input
                        className="w-full"
                        placeholder="Write a comment"
                        value={commentValue}
                        onChange={(e) => setCommentValue(e.target.value)}
                        onKeyUp={handlePostComment}
                    />
                </div>
            </div>
        </ModalWrapper>
    );
}

export default CommentModal;
