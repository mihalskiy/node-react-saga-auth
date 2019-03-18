import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import {globalStore} from './redux/store/store';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';



render(
<Provider store={globalStore}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
</Provider>,
    document.getElementById('root'),
);
serviceWorker.unregister();
