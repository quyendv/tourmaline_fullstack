import { Link, Outlet } from 'react-router-dom';
import { LogoIcon } from '~/components/Icons';
import { routesConfigPublic } from '~/Routes/routesConfig';

function OnlyBodyLayout() {
    return (
        <div className="h-screen w-screen">
            {/* Icon Home */}
            <Link
                className="m-8 inline-flex items-center self-start p-2 text-2xl text-[color:var(--active-color)] shadow-md hover:shadow-2xl"
                to={routesConfigPublic.homeRoute}
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
