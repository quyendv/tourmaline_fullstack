import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { OnlyBodyLayout } from './layouts';
import DefaultLayout from './layouts/DefaultLayout';
import Login from './pages/Login';
import { privateRoute, publicRoutes } from './Routes';
import { routesConfigPrivate, routesConfigPublic, LOGIN } from './Routes/routesConfig';

function App() {
    const { isLoggedIn, token } = useSelector((state) => state.auth);
    console.log(token);
    return (
        <div className="App">
            <Routes>
                <Route path={LOGIN} element={<Login />} />
                <Route path={routesConfigPublic.homeRoute} element={<DefaultLayout />}>
                    {publicRoutes.map((route) => {
                        const Page = route.page;
                        return <Route path={route.path} element={<Page />} />;
                    })}
                </Route>
                <Route path={routesConfigPrivate.system} element={<OnlyBodyLayout />}>
                    {privateRoute.map((route) => {
                        const Page = route.page;
                        return <Route path={route.path} element={<Page />} />;
                    })}
                </Route>
                <Route path=""></Route>
            </Routes>
        </div>
    );
}

export default App;
