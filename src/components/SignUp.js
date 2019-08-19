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

class SignUp extends Component {

    state = {
        loginIn: false
    }


    componentWillMount() {



    }


    componentDidMount() {
        // firebase.auth().onAuthStateChanged((user) => {
        //     if (user) {
        //         const { navigate } = this.props.navigation;
        //         navigate('MainFlow')
        //     } else {
        //         //   this.setState({ loading: false, authenticated: false });
        //     }
        // });
    }

    _renderSignUpForm() {
        return(
            <Form
                    style={{ marginHorizontal: 20 }}
                    onSubmit={(data) => {
                        console.log("Data", data)
                        // this.props.createUser(data)
                    }}
                    buttonText="Create Account"
                    fields={[
                        {
                            label: "Name",
                            icon: "md-person",
                            required: true,
                            type: Types.Text
                        },
                        {
                            label: "Email",
                            icon: "md-mail",
                            required: true,
                            validationErrorMessage: "Email is not valid",
                            type: Types.Email
                        },
                        {
                            label: "Password",
                            icon: "md-lock",
                            required: true,
                            type: Types.Password
                        }
                    ]}
                />
        )

    }

    _renderLoginForm() {
        return (
            <Form
                style={{ marginHorizontal: 20 }}
                onSubmit={(data) => {
                    console.log("Data", data)
                    const { navigate } = this.props.navigation;
                    navigate('Profile')
                    // this.props.login(data)
                }}
                password={true}
                buttonText="Log In"
                fields={[
                    {
                        label: "Email",
                        icon: "md-mail",
                        required: true,
                        validationErrorMessage: "Email is not valid",
                        type: Types.Email
                    },
                    {
                        label: "Password",
                        icon: "md-lock",
                        required: true,
                        type: Types.Password
                    }
                ]}
            />
        )

    }

    changeForm() {
        this.setState({ loginIn: !this.state.loginIn })
    }


    render() {

        var logInForm = this.state.loginIn ? this._renderLoginForm() : null
        var signUpForm = !this.state.loginIn ? this._renderSignUpForm() : null

        return (
            <View style={{ flex: 1, backgroundColor: COLORS.BACKGROUND, }}>
                <View style={{ flex: 2 }}>

                </View>
                {logInForm}
                {signUpForm}
                <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center", marginVertical: 20 }}>
                    <View style={{ width: 100, height: 2, backgroundColor: "grey" }}></View>
                    <Text style={{ color: "grey" }}> OR </Text>
                    <View style={{ width: 100, height: 2, backgroundColor: "grey" }}></View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "center", flex: 1 }}>
                    <Text style={{ color: "grey" }}>{this.state.loginIn ? "Don't have an account yet?" : "Already have an account?"} </Text>
                    <TouchableOpacity onPress={() => { 
                        LayoutAnimation.configureNext({
                            duration: 300,
                            create: {
                                delay: 80,
                                type: LayoutAnimation.Types.spring,
                                property: LayoutAnimation.Properties.scaleXY,
                                springDamping: 0.7,
                            },
                            update: {
                                type: LayoutAnimation.Types.spring,
                                property: LayoutAnimation.Properties.scaleXY,
                                springDamping: 0.7,
                            },
                            delete: {
                                duration: 100,
                                type: LayoutAnimation.Types.linear,
                                property: LayoutAnimation.Properties.opacity,
                            }
                        })
                        this.setState({ loginIn: !this.state.loginIn })}
                    }>
                        <Text style={{ color: COLORS.BRIGHT_ORANGE }}>{this.state.loginIn ? " Sign up" : " Log in"}</Text>
                    </TouchableOpacity>
                </View>
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

export default connect(mapStateToProps, { createUser, login })(SignUp)