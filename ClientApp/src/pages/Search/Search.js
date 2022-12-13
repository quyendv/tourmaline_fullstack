import { useState } from "react"


function Search() {
    const [isActive, setIsActive] = useState(0)


    return (
        <div className="text-white">
            <div className="px-[59px] mt-5 border-b pb-2 border-gray-300 flex gap-8 items-center">
                <span className={`text-2xl  font-bold border-r border-gray-500 pr-4`}>Kết quả tìm kiếm</span>
                <span>TẤT CẢ</span>
                <span>BÀI HÁT</span>
                <span>USER</span>
            </div>
        </div>
    )
}
export default Search