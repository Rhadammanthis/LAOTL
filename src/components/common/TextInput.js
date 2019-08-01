import {
    Animated, View, Text, TextInput,
    StyleSheet, LayoutAnimation, Keyboard,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React, { Component } from 'react'

const AnimatedIcon = Animated.createAnimatedComponent(Icon)

const layoutSpringAnim = {
    duration: 400,
    create: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 0.7,
    },
    update: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.opacity,
        springDamping: 0.7,
    },
    delete: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 0.7,
    }
}

class MyTextInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: props.visible,
            text: "",
            shouldRenderErrorMessage: null,
            isValid: null
        };
    };

    componentWillMount() {
        // this._visibility = new Animated.Value(this.props.visible ? 1 : 0);
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    }

    componentWillReceiveProps(nextProps) {
        // if (nextProps.visible) {
        //     this.setState({ visible: true });
        // }
        // Animated.timing(this._visibility, {
        //     toValue: nextProps.visible ? 1 : 0,
        //     duration: 300,
        // }).start(() => {
        //     this.setState({ visible: nextProps.visible });
        // });
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow() {
        // this.setState({ show: false })
    }

    _keyboardDidHide() {
        // this.textInputRef.blur()
        this.refs['input'].blur()
    }

    _renderValidIndicator = () => {

        // Keyboard.dismiss()

        if (this.state.isValid)
            return <AnimatedIcon name="md-checkmark-circle" style={{ fontSize: 20, color: "green" }} />
        else if (this.state.isValid === false)
            return <TouchableOpacity onPress={() => { LayoutAnimation.configureNext(layoutSpringAnim); this.setState({ shouldRenderErrorMessage: true }) }}>
                <AnimatedIcon name="md-close-circle" style={{ fontSize: 20, color: "red" }} />
            </TouchableOpacity>

        return null
    }

    _renderErrorMessage = () => {

        if (this.state.isValid === false && this.state.shouldRenderErrorMessage === true) {

            var errorMessage = "Error"

            if (this.props.required && this.state.text == "")
                errorMessage = "Cannot be empty"
            else
                errorMessage = this.props.validationErrorMessage

            return (
                <Text style={{ color: "red" }}>
                    {errorMessage}
                </Text>
            )

        }

        return null


    }

    validate() {

        LayoutAnimation.configureNext(layoutSpringAnim);

        valid = this.props.validate(this.state.text)

        this.setState({
            isValid: valid,
            shouldRenderErrorMessage: valid ? false : null
        })

        return valid
    }

    getText(){
        return this.state.text
    }

    render() {
        const { icon, label, placeHolder, required, secureTextEntry, ...rest } = this.props;

        return (
            <View style={[{ flexDirection: "column" }]} {...rest}>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: -5 }}>
                    <Icon name={icon} style={styles.actionButtonIcon} />
                    <Text style={{ color: "grey", fontSize: 15, marginLeft: 10 }}>{label}{required ? " *" : ""}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TextInput onBlur={this.validate.bind(this)} blurOnSubmit={false} ref="input" value={this.state.text} onChangeText={(t) => this.setState({ text: t })} style={{ color: "white", flex: 1 }} />
                    {this._renderValidIndicator()}
                </View>
                {this._renderErrorMessage()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 15,
        color: 'grey',
    }
})

export default MyTextInput;