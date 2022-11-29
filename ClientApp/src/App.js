import {Fragment} from 'react';
import {useSelector} from 'react-redux';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {OnlyBodyLayout} from './layouts';
import DefaultLayout from './layouts/DefaultLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import {privateRoute, publicRoutes} from './Routes';
import {routesConfigPrivate, routesConfigPublic, LOGIN, REGISTER} from './Routes/routesConfig';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const {isLoggedIn, token} = useSelector((state) => state.auth);
    // console.log(token);
    return (
        <div className="App">
            <Routes>
                <Route path={LOGIN} element={<Login/>}/>
                <Route path={REGISTER} element={<Register/>}/>
                <Route path={routesConfigPublic.homeRoute} element={<DefaultLayout/>}>
                    {publicRoutes.map((route, index) => {
                        const Page = route.page;
                        return <Route key={index} path={route.path} element={<Page/>}/>;
                    })}
                </Route>
                <Route path={routesConfigPrivate.system} element={<OnlyBodyLayout/>}>
                    {privateRoute.map((route, index) => {
                        const Page = route.page;
                        return <Route key={index} path={route.path} element={<Page/>}/>;
                    })}
                </Route>
                <Route path=""></Route>
            </Routes>

            <ToastContainer/>
        </div>
    );
}

export default App;
