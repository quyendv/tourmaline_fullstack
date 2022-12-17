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
    username:'user/:username',
    search: 'search',
    
    
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
