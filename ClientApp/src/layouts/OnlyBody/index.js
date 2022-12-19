import { Link, Outlet } from 'react-router-dom';
import { LogoIcon } from '../../components/Icons';
import { routesConfigPublicDefault } from '../../Routes/routesConfig';

function OnlyBodyLayout() {
    return (
        <div className="min-w-screen min-h-screen bg-[var(--sidebar-bg)] text-white">
            {/* Icon Home */}
            <Link
                className="dark-neumorphism my-8 ml-4 inline-flex items-center self-start bg-[var(--main-screen-bg)] p-2 text-2xl text-[color:var(--active-color)] md:ml-8"
                to={routesConfigPublicDefault.homeRoute}
            >
                <LogoIcon />
                <p className="ml-4">Tourmaline</p>
            </Link>
            {/* Page */}
            <Outlet />
        </div>
    );
}

export default OnlyBodyLayout;
