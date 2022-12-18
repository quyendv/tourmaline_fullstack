import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { SearchLink } from './SearchLink';

const activeStyle =
    'text-active-color border-b-4 border-blue-900 px-2  h-full flex items-center hover:text-active-color';
const notActiveStyle = 'px-2 hover:text-active-color';

function Search() {
    const { keyword } = useSelector((state) => state.actions);
    return (
        <div className="h-[calc(100vh-var(--header-height))] w-full overflow-y-auto px-14 pt-16 pb-24 text-white">
            <div className="mb-7 flex h-[60px] items-center border-b border-[#ffffff1a]">
                <span className="border-r border-[#ffffff1a] pr-5 text-2xl font-bold">Kết quả tìm kiếm</span>
                <div className="flex items-center gap-8 pl-5">
                    {SearchLink.map((item) => (
                        <NavLink
                            key={item.path}
                            to={`${item.path}?q=${keyword.replace(' ', '+')}`}
                            className={({ isActive }) => (isActive ? activeStyle : notActiveStyle)}
                        >
                            <span className="font-medium">{item.text}</span>
                        </NavLink>
                    ))}
                </div>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    );
}
export default Search;
