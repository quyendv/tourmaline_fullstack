import { BsFillPlayFill } from 'react-icons/bs';

function SearchResultSong({ cover, songName, singer }) {
    return (
        <div className=" group relative flex cursor-pointer items-center gap-2.5 p-2.5 after:absolute after:inset-0 after:hidden after:bg-[#ffffff1a] hover:after:block">
            <div className="relative h-[52px] w-[52px]">
                <img className="h-full w-full object-cover" src={cover} alt="cover" />
                <div className="absolute inset-0 hidden place-content-center bg-[#00000080] group-hover:grid">
                    <BsFillPlayFill size={25} />
                </div>
            </div>
            <div className="flex flex-col justify-center">
                <div className="text-sm font-semibold hover:text-active-color">{songName}</div>
                <div className="text-xs text-[#ffffff80]">{singer}</div>
            </div>
        </div>
    );
}

export default SearchResultSong;
