import Profile from '~/pages/Profile';
import OnlyBodyLayout from '../layouts/OnlyBody';
import Contact from '../pages/Contact';
import MainScreen from '../pages/MainScreen';
import Upload from '../pages/Upload';
import Library from '../pages/Library';
import { routesConfigPrivateDefault, routesConfigPublicDefault, searchRoutesConfig, routeConfigPrivateOnly } from './routesConfig';
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

export const publicRoutesDefault = [
    {
        path: routesConfigPublicDefault.homeRoute,
        page: MainScreen,
    },


    {
        path: routesConfigPublicDefault.discover,
        page: HomePlaylist
    },

    {
        path: routesConfigPublicDefault.STAR,
        page: MainScreen,
    },
];
export const privateRouteDefault = [
    {
        path: routesConfigPrivateDefault.libraryRoute,
        page: Library,
    },
    {
        path: routesConfigPrivateDefault.playlist__title__pid,
        page: PlaylistDetails
    },
    {
        path: routesConfigPrivateDefault.library__playlist,
        page: AllPlaylist
    },
    {
        path: routesConfigPrivateDefault.library__playlist__title__pid,
        page: PlaylistDetails
    },
    {
        path: routesConfigPrivateDefault.favoritesRoute,
        page: Favorite
    },
    {
        path: routesConfigPrivateDefault.feedRoute,
        page: Feed
    },
    {
        path: routesConfigPrivateDefault.username,
        page: User
    },
]
export const privateRouteOnly = [
    {
        path: routeConfigPrivateOnly.contact,
        page: Contact,
        layout: OnlyBodyLayout,
    },
    {
        path: routeConfigPrivateOnly.profileRoute,
        page: Profile,
    },
    {
        path: routeConfigPrivateOnly.uploadRoute,
        page: Upload,
    },
];

export const searchRoutes = [
       
    {
        path: searchRoutesConfig.search,
        page: Search
    },
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