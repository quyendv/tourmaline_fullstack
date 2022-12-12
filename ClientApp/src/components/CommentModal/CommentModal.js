import { useSelector } from 'react-redux';
import { useState } from 'react';

import { icons } from '../../utils/icons';
import * as apis from '../../services/comment'



const { AiOutlineClose, FaRegComment } = icons;

function CommentModal() {
    const { setIsOpenCommentModal } = useSelector((state) => state.actions);
    const [commentValue, setCommentValue] = useState('');
    const {token} = useSelector(state => state.auth)
    const {commentSongId} = useSelector(state => state.music)

    const handlePostComment = (e) => {
        const finalPayload = {
            id: commentSongId,
            content: commentValue
        }
        if(e.keyCode == '13') {
            const response = apis.postComment(finalPayload, token)
            console.log(response)
        }
    }
    return (
        <div className="h-full w-full">
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
                <div className='px-3'>
                    <span className='text-[#000] opacity-60'>0 bình luận</span>
                    <div className='w-full h-full flex flex-col  items-center justify-center flex-auto'>
                        <span className='opacity-30'><FaRegComment size={50}/></span>
                        <h3 className='opacity-60'>
                            Chưa có bình luận nào
                        </h3>
                    </div>
                    <input
                        className="mt-2 w-full rounded-l-full rounded-r-full bg-[#000]/5 px-4 py-1 text-xl"
                        placeholder="Write a comment"
                        value={commentValue}
                        onChange={(e) => setCommentValue(e.target.value)}
                        onKeyUp={handlePostComment}
                    />
                </div>
            </div>
        </div>
    );
}

export default CommentModal;
