import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { OnlyBodyLayout } from './layouts';
import DefaultLayout from './layouts/DefaultLayout';
import Search from './pages/Search';
import ForgotPassword from './pages/ForgotPassword';
import Login from './pages/Login';
import Register from './pages/Register';
import SearchAll from './pages/Search/SearchAll';
import {
    privateRoute,
    privateRouteDefault,
    privateRouteOnly,
    publicRoutes,
    publicRoutesDefault,
    searchRoutes,
} from './Routes';
import {
    ForgotPasswordRoute,
    LOGIN,
    REGISTER,
    routesConfigPrivateDefault,
    routeConfigPrivateOnly,
    routesConfigPublicDefault,
    searchRoutesConfig,
} from './Routes/routesConfig';

function App() {
    const { isLoggedIn, token } = useSelector((state) => state.auth);
    return (
        <div className="App">
            <Routes>
                {<Route path={LOGIN} element={<Login />} />}
                { <Route path={REGISTER} element={<Register />} />}
                <Route path={ForgotPasswordRoute} element={<ForgotPassword />} />

                <Route path={routesConfigPublicDefault.homeRoute} element={<DefaultLayout />}>
                    <Route path={searchRoutesConfig.search} element={<Search />}>
                        {searchRoutes.map((route, index) => {
                            console.log(route);
                            const Page = route.page;
                            return <Route key={index} path={route.path} element={<Page />} />;
                        })}
                    </Route>
                    {publicRoutesDefault.map((route, index) => {
                        const Page = route.page;
                        return <Route key={index} path={route.path} element={<Page />} />;
                    })}
                    {isLoggedIn &&
                        privateRouteDefault.map((route, index) => {
                            const Page = route.page;
                            return <Route key={index} path={route.path} element={<Page />} />;
                        })}
                </Route>
                {isLoggedIn && (
                    <Route path={routeConfigPrivateOnly.system} element={<OnlyBodyLayout />}>
                        {privateRouteOnly.map((route, index) => {
                            const Page = route.page;
                            return <Route key={index} path={route.path} element={<Page />} />;
                        })}
                    </Route>
                )}
            </Routes>

            <ToastContainer />
        </div>
    );
}

export default App;
