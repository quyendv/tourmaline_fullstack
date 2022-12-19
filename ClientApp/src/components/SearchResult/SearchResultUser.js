function SearchResultUser({ avatar, name, followers }) {
    return (
        <div className="relative flex cursor-pointer items-center gap-2.5 p-2.5 after:absolute after:inset-0 after:hidden after:bg-[#ffffff1a] hover:after:block">
            <div className="h-[52px] w-[52px]">
                <img className="h-full w-full rounded-full object-cover" src={avatar} alt="user" />
            </div>
            <div className="flex flex-col justify-center">
                <div className="text-sm font-semibold">{name}</div>
                <div className="text-xs text-[#ffffff80]">
                    <span className="relative after:absolute after:top-1/2 after:-right-2 after:h-1 after:w-1 after:-translate-y-1/2 after:rounded-full after:bg-current after:content-['']">
                        Artists
                    </span>
                    <span className="ml-3">{followers} followers</span>
                </div>
            </div>
        </div>
    );
}

export default SearchResultUser;
