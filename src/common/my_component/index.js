import * as Config from '../store/configureStore';
import reducers from './reducers';
import MyComponent from './MyComponent';
import React from 'react';
import Immutable from 'Immutable';
import './my-component.scss';

class Index extends React.Component {

    render() {

        return (
            <div>
                My Component index

                <MyComponent/>
            </div>
        );
    }
}

export default Index;
