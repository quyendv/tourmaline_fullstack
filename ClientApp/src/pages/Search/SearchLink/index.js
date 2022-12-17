import { searchRoutesConfig } from '../../../Routes/routesConfig';
export const SearchLink = [
    { path: searchRoutesConfig.searchAll, text: 'ALL' },
    {
        path: searchRoutesConfig.searchSongs,
        text: 'SONGS',
    },
    {
        path: searchRoutesConfig.searchPlaylist,
        text: 'PLAYLISTS',
    },
    {
        path: searchRoutesConfig.searchUser,
        text: 'USERS',
    },
];
