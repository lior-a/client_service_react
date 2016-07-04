import 'babel-core/polyfill';
import React from 'react';
import Index from '../common/my_component/index';
import { Provider } from 'react-redux';
import * as Config from '../common/store/configureStore';
import reducers from '../common/my_component/reducers';
import ReactDOMServer from 'react-dom/server';

const initialState = window.__INITIAL_STATE__;
const store = Config.configureStore(initialState, reducers);

ReactDOMServer.renderToString(
    <Provider store={store}>
        <Index initial_state={initialState}/>
    </Provider>,
    document.getElementById('app')
);
