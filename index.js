import React, { Component } from 'react';
import { AppRegistry, UIManager } from 'react-native';

import App from './src/App';

class LAOTLApp extends Component {

    render() {
        return (
            <App/>
        );
    }
}

AppRegistry.registerComponent('LAOTL', () => LAOTLApp);