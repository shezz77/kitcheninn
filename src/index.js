import React from 'react';
import ReactDOM from 'react-dom';
import AppRoute from './routes';
import { BrowserRouter } from 'react-router-dom';
import HttpsRedirect from 'react-https-redirect';


import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
// import 'react-app-polyfill/stable';

import './assets/css/font-awesome.css';
import './assets/css/normalize.css';
import './assets/css/bootstrap.min.css';
import './assets/css/owl.carousel.min.css';
import './assets/css/magnific-popup.css';
import './assets/css/font-awesome.min.css';
import './assets/css/slicknav.css';
import './assets/css/animate.css';
import './assets/css/theme.css';
import './assets/css/style.css';
import './assets/css/responsive.css';
import './assets/css/all.css';

import 'sweetalert/dist/sweetalert.css';

// if (isMobile) {
//     window.location.href = 'http://sa.kitcheninns.com';
// } else {
    ReactDOM.render(
        <BrowserRouter>
            <HttpsRedirect>
                <AppRoute />
            </HttpsRedirect>
        </BrowserRouter>,
        document.getElementById('root')
    );
// }



