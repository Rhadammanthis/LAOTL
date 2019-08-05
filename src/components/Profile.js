import React, { Component } from 'react';
import {
    StyleSheet, TextInput, View,
    Button, Text, Dimensions, TouchableOpacity,
    LayoutAnimation
} from 'react-native';
import { COLORS, CONTENT_TYPE } from './common/Constants'
import MyTextInput from './common/TextInput'
import Form, { Types } from './common/Form'
import { connect } from 'react-redux'
import { createUser, login } from '../actions'
import firebase from 'firebase';

const wWidth = Dimensions.get('window').width;

class Profile extends Component {

    state = {
        loginIn: false
    }


    componentWillMount() {



    }



    render() {

        return (
            <View style={{ flex: 1, backgroundColor: COLORS.BACKGROUND, }}>

            </View>

        )
    }
}

const styles = StyleSheet.create({
    input: {
        width: 350,
        height: 55,
        backgroundColor: '#42A5F5',
        margin: 10,
        padding: 8,
        color: 'white',
        borderRadius: 14,
        fontSize: 18,
        fontWeight: '500',
    }
});

const mapStateToProps = ({ user }) => {

    const { userCreatedResponse } = user;

    return {
        userCreatedResponse
    };
};

export default Profile