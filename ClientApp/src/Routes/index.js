import Profile from '~/pages/Profile';
import OnlyBodyLayout from '../layouts/OnlyBody';
import Contact from '../pages/Contact';
import MainScreen from '../pages/MainScreen';
import Upload from '../pages/Upload';
import Library from '../pages/Library';
import { routesConfigPrivate, routesConfigPublic, searchRoutesConfig } from './routesConfig';
import AllPlaylist from '~/pages/AllPlaylist';
import Search from '../pages/Search'
import PlaylistDetails from '../pages/PlaylistDetails';
import Favorite from '../pages/Favorite'
import Feed from '../pages/Feed'
import HomePlaylist from '../pages/HomePlaylist'
import SearchAll from '../pages/Search/SearchAll'
import SearchSong from '../pages/Search/SearchSong'
import SearchPlaylist from '../pages/Search/SearchPlaylist'
import SearchUser from '../pages/Search/SearchUser'
import User from '../pages/User'

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
        page: PlaylistDetails
    },
    {
        path: routesConfigPublic.library__playlist,
        page: AllPlaylist
    },
    {
        path: routesConfigPublic.library__playlist__title__pid,
        page: PlaylistDetails
    },
    {
        path: routesConfigPublic.search,
        page: Search
    },
    {
        path: routesConfigPublic.favoritesRoute,
        page: Favorite
    },
    {
        path: routesConfigPublic.feedRoute,
        page: Feed
    },
    {
        path: routesConfigPublic.discover,
        page: HomePlaylist
    },
    {
        path: routesConfigPublic.username,
        page: User
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

export const searchRoutes = [
    {
        path: searchRoutesConfig.searchAll,
        page: SearchAll
    },
    {
        path: searchRoutesConfig.searchSongs,
        page: SearchSong
    }, 
    {
        path: searchRoutesConfig.searchPlaylist,
        page: SearchPlaylist,
    },
    {
        path: searchRoutesConfig.searchUser,
        page: SearchUser
    }
]