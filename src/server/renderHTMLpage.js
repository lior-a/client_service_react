import config from '../../config';
import React from 'react';
import { Provider } from 'react-redux';
import reducers from '../common/my_component/reducers';
import ReactDOMServer from 'react-dom/server';
import * as ConfigStore from '../common/store/configureStore';
import Index from '../common/my_component/index';

/**
 * This function construct our static html and serve the js code for our main server.
 * @param  {[type]} initialState [data from our main server]
 * @param  {[type]} translation  [translation from main server]
 * @return {[string]} contain static html of our web application, data exposed on window and link for the dev env server bundle.js
 */
export default (initialState, translation) => {
    console.log('[renderHTMLpage] renderHTMLpage'); //todo: replace it with a log

    let devPathScript;

    const store = ConfigStore.configureStore(initialState, reducers);

    const initialHTML = ReactDOMServer.renderToString(
        <Provider store={store}>
            <Index initial_state={initialState} translation={translation}/>
        </Provider>
    );

    const finalState = store.getState();

    if (process.env.NODE_ENV === 'development') {
        console.log('[renderHTMLpage] generated script in dev ENV')

        devPathScript = `<script src="http://localhost:${config.port}/static/bundle.js"></script>`;
    }

    return `
        <div id="app">${initialHTML}</div>

        <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
            window.__TRANSLATION__ = ${JSON.stringify(translation)};
        </script>

        ${devPathScript}
    `;
}