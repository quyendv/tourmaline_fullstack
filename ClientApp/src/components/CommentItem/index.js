import moment from 'moment';
import { BsThreeDots } from 'react-icons/bs';
import { images } from '~/assets/images';


function CommentItem({ data, isLoading }) {
    // const handleLike = (params) => {};
    // const handleDislike = (params) => {};

    // API sửa avatar, (like, dislike)

    return (
        <div className={`flex gap-3 p-2.5 ${isLoading && 'opacity-30' }`}>
            {/* Avatar */}
            <div className="h-[50px] w-[50px] overflow-hidden rounded-full">
                <img className="h-auto w-full object-cover" src={images.defaultAvatar} alt="user-avatar" />
            </div>
            {/* Comment Infos */}
            <div className=" text-sm">
                {/* User & Time */}
                <div className="mb-1.5 flex items-center gap-2">
                    <span className="inline-block font-semibold">{data.username}</span>

                    {!isLoading && <span className="ml-1.5 text-[#ffffff80]">{moment(data.createTime).fromNow()}</span>}

                </div>

                {/* Content */}
                <div className="max-w-[560px] break-words">{data.content}</div>
            </div>
        </div>
    );
}

export default CommentItem;
