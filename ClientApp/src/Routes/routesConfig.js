export const routesConfigPublic = {
    homeRoute: '/',
    playerRoute: 'player',
    libraryRoute: 'library',
    albumRoute: 'album',
    favoritesRoute: 'favorites',
    settingsRoute: 'setting',
    playlist__title__pid:'playlist/:title/:pid',
    
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
