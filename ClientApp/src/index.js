import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {PersistGate} from 'redux-persist/integration/react';
import App from './App';
import GlobalStyles from './components/GlobalStyles';
import reportWebVitals from './reportWebVitals';
import reduxStore from './utils/redux';

const root = ReactDOM.createRoot(document.getElementById('root'));

const {persistor, store} = reduxStore();
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <GlobalStyles>
                    <BrowserRouter>
                        <App/>
                    </BrowserRouter>
                </GlobalStyles>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
