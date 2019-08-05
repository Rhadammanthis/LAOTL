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
import Profile from './Profile'
import SignUp from './SignUp'

const wWidth = Dimensions.get('window').width;

class Buffer extends Component {

    state = {
        userLoggedIn: false
    }


    componentWillMount() {



    }



    render() {

        if(this.state.userLoggedIn )
        return (
            <SignUp/>
        )
        else
            return(<Profile/>)
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

export default Buffer