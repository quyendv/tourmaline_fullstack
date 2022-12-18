import moment from 'moment';
import { BsThreeDots } from 'react-icons/bs';
import { images } from '~/assets/images';

function CommentItem({ data }) {
    // API sửa avatar
    return (
        <div className="flex gap-3 p-2.5">
            {/* Avatar */}
            <div className="h-[50px] w-[50px] overflow-hidden rounded-full">
                <img className="h-auto w-full object-cover" src={images.defaultAvatar} alt="user-avatar" />
            </div>
            {/* Comment Infos */}
            <div className=" text-sm">
                {/* User & Time */}
                <div className="mb-1.5 flex items-center gap-2">
                    <span className="inline-block font-semibold">{data.username}</span>
                    <span className="text-[#ffffff80]">{moment(data.createTime).fromNow()}</span>
                    <span className="grid cursor-pointer place-content-center rounded-full p-0.5 hover:bg-[#ffffff1a]">
                        <BsThreeDots />
                    </span>
                </div>

                {/* Content */}
                <div className="max-w-[560px] break-words">{data.content}</div>
            </div>
        </div>
    );
}

export default CommentItem;
