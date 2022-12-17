import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { SearchLink } from './SearchLink';
const activeStyle = 'text-activecolor border-b-4 border-blue-900 px-2  h-full flex items-center hover:text-activecolor' 
const notActiveStyle = 'px-2 hover:text-activecolor'
function Search() {
    const {keyword} = useSelector(state => state.actions)
    return (
        <div className="text-white">
            <div className="mt-5 flex items-center gap-8  border-b border-gray-300 px-[59px]  h-[60px]">
                <span className={`border-r  border-gray-500 pr-4 text-2xl font-bold`}>Kết quả tìm kiếm</span>
                {SearchLink.map((item) => {
                    return (
                        <NavLink
                            key={item.path}
                            to={`${item.path}?q=${keyword.replace(' ', '+')}`}
                            className={({ isActive }) => (isActive ? activeStyle  : notActiveStyle)}
                        >
                            <span className='font-medium'>{item.text}</span>
                        </NavLink>
                    );
                })}
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    );
}
export default Search;
