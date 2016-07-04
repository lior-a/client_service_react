import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from '../my_component/reducers';

const finalCreateStore = compose(
    applyMiddleware(ReduxThunk),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
)(createStore);

let configureStore = function(initialState, rootReducer) {
    const store = finalCreateStore(rootReducer, initialState);

    return store;
}

export { configureStore };