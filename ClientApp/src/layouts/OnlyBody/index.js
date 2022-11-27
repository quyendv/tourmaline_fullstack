import { Link, Outlet } from 'react-router-dom';
// import { LogoIcon } from '/components/Icons';
import { LogoIcon } from '../../components/Icons';
// import { routesConfigPublic } from '~/Routes/routesConfig';
import { routesConfigPublic } from '../../Routes/routesConfig';

function OnlyBodyLayout() {
    return (
        <div className="h-screen w-screen">
            {/* Icon Home */}
            <Link
                className="my-8 ml-4 inline-flex items-center self-start p-2 text-2xl text-[color:var(--active-color)] shadow-md hover:shadow-2xl md:ml-8"
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
