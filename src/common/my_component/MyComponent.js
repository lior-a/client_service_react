import MySubComponent from "./my_sub_component/MySubComponent";
import React from 'react';

class MyComponent extends React.Component {

    render () {

        const {

        } = this.props;

        return (
            <div>
                My Component

                <MySubComponent/>
            </div>
        );
    }
}

export default MyComponent;