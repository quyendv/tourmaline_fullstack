import Profile from '~/pages/Profile';
import OnlyBodyLayout from '../layouts/OnlyBody';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import MainScreen from '../pages/MainScreen';
import Upload from '../pages/Upload';
import Library from '../pages/Library';
import { routesConfigPrivate, routesConfigPublic } from './routesConfig';
import Playlist from '../pages/Playlist'

export const publicRoutes = [
    {
        path: routesConfigPublic.homeRoute,
        page: MainScreen,
    },



    {
        path: routesConfigPublic.libraryRoute,
        page: Library,
    },
    {
        path: routesConfigPublic.playlist__title__pid,
        page: Playlist
    },
    {
        path: routesConfigPublic.library__playlist__title__pid,
        page: Playlist
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
        path: routesConfigPrivate.profileRoute,
        page: Profile,
    },
    {
        path: routesConfigPrivate.uploadRoute,
        page: Upload,
    },
];
