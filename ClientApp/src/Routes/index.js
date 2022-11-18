import { OnlyBodyLayout } from '~/layouts';
import DefaultLayout from '~/layouts/DefaultLayout';
import Contact from '~/pages/Contact';
import Login from '../pages/Login';
import MainScreen from '../pages/MainScreen';
import Player from '../pages/Player';
import { Profile } from '../pages/Profile';
import Upload from '../pages/Upload';
import { routesConfigPrivate, routesConfigPublic } from './routesConfig';
export const publicRoutes = [
    {
        path: routesConfigPublic.profileRoute,
        page: Profile,
    },
    {
        path: routesConfigPublic.loginRoute,
        page: Login,
    },
    {
        path: routesConfigPublic.playerRoute,
        page: Player,
    },

    {
        path: routesConfigPublic.libraryRoute, 
        page: MainScreen,
    },

    {
        path: routesConfigPublic.STAR,
        page: MainScreen,
    },
];
export const privateRoute = [
    {
        path: routesConfigPrivate.contact,
        page: Contact,
        layout: OnlyBodyLayout,
    },
    {
        path: routesConfigPrivate.uploadRoute,
        page: Upload,
    },
];
