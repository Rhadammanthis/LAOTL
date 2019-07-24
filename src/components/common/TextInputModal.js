import {
    Animated, View, Text, Easing,
    TouchableOpacity, StyleSheet, Image,
    TextInput, ActivityIndicator
} from 'react-native';
import React, { Component } from 'react'
import Modal from 'react-native-modalbox';
import Fade from './Fade';
import { COLORS, CONTENT_TYPE } from './Constants'

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

class TextInputModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: props.visible,
            isFocused: false,
            text: "LOL",
            success: false,
            errorVisible: false,
        };
    };

    componentWillMount() {
        this._infoOpacity = new Animated.Value(1);
        this._loadingOpacity = new Animated.Value(0);
        this._resultOpacity = new Animated.Value(0);
        this._spin = new Animated.Value(0);
        this._colorAnim = new Animated.Value(0)
    }



    componentWillReceiveProps(nextProps) {
        if (nextProps.visible !== this.props.visible) {
            this.setState({ visible: nextProps.visible });
        }
        if (nextProps.response != this.props.response) {
            console.log("In Modfal", nextProps.response.data.code === 200 ? true : false)
            this.setState({ success: nextProps.response.data.code === 200 ? true : false })
            var interval = setTimeout(() => {
                this.onResponseReceived();
                clearTimeout(interval)
            }, 1000)
        }
    }

    handleFocus = (event) => {
        this.setState({ isFocused: true })

        if (this.props.onFocus) {
            this.props.onFocus(event)
        }
    }

    handleBlur = (event) => {
        this.setState({ isFocused: false })

        if (this.props.onBlur) {
            this.props.onBlur(event)
        }
    }

    onClosed = () => {
        this._infoOpacity = new Animated.Value(1);
        this._loadingOpacity = new Animated.Value(0);
        this._resultOpacity = new Animated.Value(0);
        this._spin = new Animated.Value(0);
        this._colorAnim = new Animated.Value(0)

        this.setState({ text: null, errorVisible: false })

        this.props.onClosed();
    }


    onNegativePressed = () => {
        this.props.onNegative()
        this.setState({ visible: false })
        this.onClosed()
    }

    onPossitivePressed = () => {
        if (this.state.text == null) {
            this.setState({ errorVisible: true })
            return;
        }

        console.log("TEXT", this.state.text)
        this.props.onPossitive(this.state.text)

        Animated.sequence([
            Animated.timing(this._infoOpacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true
            }),
            Animated.parallel([
                Animated.timing(this._loadingOpacity, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true
                }), 
                Animated.timing(this._colorAnim, {
                    toValue: 150,
                    duration: 200,
                })]),
            Animated.loop(Animated.timing(this._spin, {
                toValue: 1,
                duration: 1200,
                easing: Easing.linear,
                useNativeDriver: true
            }), { iterations: -1 }),
        ]).start(() => {
            // this.setState({ visible: false })
        })
    }

    onResponseReceived = () => {
        console.log("******************* REACHED ********************")
        Animated.sequence([
            Animated.timing(this._loadingOpacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true
            }),
            Animated.parallel([
                Animated.timing(this._resultOpacity, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true
                }),
                Animated.timing(this._colorAnim, {
                    toValue: 300,
                    duration: 200,
                })
            ]),
            
            Animated.delay(500)
        ]).start(() => {
            this.setState({ visible: false })
            console.log("******************* COMPLETE ********************")
        })
    }

    render() {
        const { isFocused } = this.state
        const { visible, onClosed, children, onPossitive, onNegative, message,
            title, placeholder, ...rest } = this.props;

        const spin = this._spin.interpolate({
            inputRange: [0, 1],
            outputRange: ['360deg', '0deg']
        })

        const interpolateColor = this._colorAnim.interpolate({
            inputRange: [0, 150, 300],
            outputRange: ['rgb(128,128,128)', 'rgb(189,183,107)', this.state.success ? 'rgb(29,185,84)' : 'rgb(255,0,0)']
        })

        return (
            <Modal position={"center"} style={{ height: 220, borderRadius: 5, width: 350, backgroundColor: "#282828" }}
                isOpen={this.state.visible} onClosed={this.onClosed} {...rest}
                backdropPressToClose={false}>
                <Animated.View style={{ justifyContent: "center", alignItems: "center", height: 45, paddingVertical: 5, borderTopLeftRadius: 5, borderTopRightRadius: 5, backgroundColor: interpolateColor }}>
                    <Animated.Image style={{ opacity: this._infoOpacity, tintColor: "white", height: 40, width: 40, position: "absolute" }} source={require('../../images/info.png')} />
                    <Animated.Image style={{ transform: [{ rotate: spin }], opacity: this._loadingOpacity, tintColor: "white", height: 40, width: 40, position: "absolute" }} source={require('../../images/loading.png')} />
                    <Animated.Image style={{ opacity: this._resultOpacity, tintColor: "white", height: 40, width: 40, position: "absolute" }} source={this.state.success ? require('../../images/check.png') : require('../../images/cross.png')} />
                </Animated.View>

                <View style={{ width: 350, backgroundColor: "gray", height: 1 }} />
                <View style={{
                    flex: 1,
                    marginHorizontal: 10,
                    justifyContent: "center",
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                }}>
                    <Text style={{ color: "white", fontSize: 17, marginBottom: 5, }}>{title}</Text>
                    <Text style={{ color: "white" }}>{message}</Text>
                    <TextInput value={this.state.text} onChangeText={(t) => { this.setState({ text: t, errorVisible: false }) }} placeholder={placeholder} placeholderTextColor="#939393" onFocus={this.handleFocus} onBlur={this.handleBlur} underlineColorAndroid={isFocused ? "gray" : "gray"} style={{ color: "white" }} />
                    <Fade visible={this.state.errorVisible}>
                        <Text style={{ color: "red", fontSize: 12, marginLeft: 17 }}>Cannot be empty!</Text>
                    </Fade>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "flex-end", marginBottom: 10 }}>

                    <TouchableOpacity
                        style={[styles.button,]} onPress={() => this.onNegativePressed()}>
                        <Text style={{ color: "gray", fontSize: 12, textAlign: 'center' }}> CANCEL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button]} onPress={() => this.onPossitivePressed()}>
                        <Text style={{ color: "gray", fontSize: 12, textAlign: 'center' }}> OK</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    contentTitle: {
        fontSize: 15,
        marginBottom: 12,
        color: "white"
    },
    image: {
        height: 20,
        width: 20,
        tintColor: COLORS.GREEN,
    },
    button: {
        height: 35,
        width: 65,
        borderRadius: 25,
        borderColor: "gray",
        borderWidth: 1,
        marginHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
    }

})

export default TextInputModal;