import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import MyTextInput from './TextInput'
import { COLORS, CONTENT_TYPE } from './Constants'


export const Types = {
    Text: "Text",
    Email: "Email",
    Password: "Password",
    confirmPassword: "confirmPassword"
}

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            confirmPassword: ""
        };
        this.textFields = []

        textFields = this.props.fields.map((field, index) => {

            var validationFunction = (textToValidate) => {

                switch (field.type) {
                    case Types.Text:
                        var regex = /^[A-Za-z\d\s]+$/
                        return regex.test(textToValidate)
                    case Types.Email:
                        var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        return regex.test(textToValidate);
                    case Types.Password:
                        var regex = /^[A-Za-z\d\s]+$/
                        return regex.test(textToValidate)
                    // case Types.confirmPassword:
                    //     return this.state.password === this.state.confirmPassword
                }
            };

            return <MyTextInput ref={el => this[index] = el}
                getText={(text) => { this.setState({ index: text }) }}
                key={index}
                secureTextEntry={field.type === Types.Password ? true : false}
                validationErrorMessage={field.validationErrorMessage}
                validate={validationFunction}
                required={field.required}
                label={field.label}
                icon={field.icon}
            />;
        });
    };

    componentWillMount() {


    }

    submit = () => {
        if (!this.validateForm())
            return;

        var formData = {}

        this.props.fields.map((field, index) => {
            
            formData[field.type] = this[index].getText()
        })

        this.props.onSubmit(formData)
    }

    validateForm() {
        formValid = true;
        this.props.fields.map((field, index) => {
            if (!this[index].validate())
                formValid = false;
        })

        return formValid
    }

    render() {

        return (
            <View>
                {textFields}
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}></View>
                    <TouchableOpacity
                        onPress={this.submit}
                        style={{
                            flex: 4, height: 40, marginVertical: 10, backgroundColor: COLORS.BRIGHT_ORANGE, justifyContent: 'center',
                            alignItems: 'center', borderRadius: 5
                        }}
                    >
                        <Text style={{ color: 'white', fontSize: 15 }}>Add Content</Text>
                    </TouchableOpacity >
                    <View style={{ flex: 1 }}></View>
                </View>
            </View>
        )
    }
}
