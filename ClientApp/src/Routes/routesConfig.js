export const routesConfigPublicDefault = {
    homeRoute: '/',



    discover:'discover/:type',
    
    
    STAR: '*',
};

export const LOGIN = '/login';
export const REGISTER = '/register';
export const ForgotPasswordRoute = '/forgot-password';

export const routesConfigPrivateDefault = {
    libraryRoute: 'library',
    feedRoute: 'feed',
    favoritesRoute: 'favorites',
    playlist__title__pid:'playlist/:title/:pid',
    library__playlist:'library/playlist',
    library__playlist__title__pid: 'library/playlist/:title/:pid',
    username:'user/:usernameParam',
    STAR: '*',
};
export const routeConfigPrivateOnly = {
    system: 'system/',
    uploadRoute: 'upload',
    profileRoute: 'profile',
    contact: 'contact',
    STAR: '*'

}

export const searchRoutesConfig = {
    search: 'search/',
    searchAll: 'all',
    searchSongs:'song',
    searchPlaylist:'playlist',
    searchUser:'user',
}