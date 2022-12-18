export const routesConfigPublic = {
    homeRoute: '/',
    playerRoute: 'player',
    libraryRoute: 'library',
    feedRoute: 'feed',
    favoritesRoute: 'favorites',
    settingsRoute: 'setting',
    playlist__title__pid:'playlist/:title/:pid',
    library__playlist:'library/playlist',
    library__playlist__title__pid: 'library/playlist/:title/:pid',
    username:'user/:usernameParam',


    discover:'discover/:type',
    search: 'search/',
    
    
    STAR: '*',
};

export const LOGIN = '/login';
export const REGISTER = '/register';
export const ForgotPasswordRoute = '/forgot-password';

export const routesConfigPrivate = {
    system: '/system/',
    profileRoute: 'profile',
    contact: 'contact',
    uploadRoute: 'upload',
    STAR: '*',
};

export const searchRoutesConfig = {
    searchAll: 'all',
    searchSongs:'song',
    searchPlaylist:'playlist',
    searchUser:'user',
}