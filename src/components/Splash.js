import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Animated,
    StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import { dataFetch, checkNetwork } from '../actions';
import firebase from 'firebase';
import _ from 'lodash';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class Splash extends Component {

    static navigationOptions = {
        header: {
          visible: null,
        }
      }

    componentWillMount() {

        this.props.dataFetch();

    }

    renderSpinner() {

        if (this.props.episodes != null){
            const { navigate } = this.props.navigation;
            navigate('MainFlow')
            return;
        }

        return (
            <ActivityIndicator
                style={styles.centering}
                size="large"
                color="#F6502C"
            />
        )

    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    backgroundColor="#171612"
                    barStyle="light-content"
                />
                <View style={styles.container}>
                    <Text style={styles.title} >Last App On The Left</Text>
                    {this.renderSpinner()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#171612',
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
        color: '#F6502C'
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
});

const mapStateToProps = ({ splash, data }) => {

    const { isConnected } = splash;
    const { episodes } = data;

    return {
        episodes, isConnected
    };
};

export default connect(mapStateToProps, { dataFetch, checkNetwork })(Splash);