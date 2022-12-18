import moment from 'moment';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { images } from '~/assets/images';

function CommentItem({ data }) {
    // const handleLike = (params) => {};
    // const handleDislike = (params) => {};

    // API sửa avatar, (like, dislike)
    return (
        <div className="flex gap-3 p-2.5">
            {/* Avatar */}
            <div className="h-[50px] w-[50px] overflow-hidden rounded-full">
                <img className="h-auto w-full object-cover" src={images.defaultAvatar} alt="user-avatar" />
            </div>
            {/* Comment Infos */}
            <div className=" text-sm">
                {/* User & Time */}
                <div className="mb-1.5">
                    <span className="inline-block font-semibold">{data.username}</span>
                    <span className="ml-1.5 text-[#ffffff80]">{moment(data.createTime).fromNow()}</span>
                </div>

                {/* Content */}
                <div>{data.content}</div>

                {/* Reaction */}
                {/* <div className="mt-1.5 mb-2 flex gap-2.5 text-[#ffffff80]">
                    <div className="flex items-center">
                        <AiOutlineLike className="cursor-pointer" onClick={handleLike} />
                        <span className="ml-1.5">10</span>
                    </div>
                    <div className="flex items-center">
                        <AiOutlineDislike className="cursor-pointer" onClick={handleDislike} />
                        <span className="ml-1.5">0</span>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default CommentItem;
