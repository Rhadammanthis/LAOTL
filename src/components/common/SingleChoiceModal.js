import {
    Animated, View, Text, Easing,
    TouchableOpacity, StyleSheet, Image
} from 'react-native';
import React, { Component } from 'react'
import Modal from 'react-native-modalbox';
import { COLORS, CONTENT_TYPE } from './Constants'

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

class SingleChoiceModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: props.visible,
            width: 0,
            x: 0,
            x1: 0
        };
    };

    componentWillMount() {
        this._animatedView1 = new Animated.Value(1);
        this._animatedView2 = new Animated.Value(1);
        this._animTranlation = new Animated.Value(0);
    }



    componentWillReceiveProps(nextProps) {
        if (nextProps.visible !== this.props.visible) {
            this.setState({ visible: nextProps.visible });
        }
    }

    onClosed = () => {
        this._animatedView1 = new Animated.Value(1);
        this._animatedView2 = new Animated.Value(1);
        this._animTranlation = new Animated.Value(0);

        this.props.onClosed();
    }

    onPressed = (view, onPress) => {
        onPress()

        Animated.sequence([
            Animated.timing(view == 1 ? this._animatedView2 : this._animatedView1, {
                toValue: 0,
                duration: 300,
            }),
            Animated.timing(this._animTranlation, {
                toValue: 1,
                duration: 200,
                easing: Easing.back(2)
            }),
            Animated.delay(300)
        ]).start(() => {
            this.setState({ visible: false })
        })

    }

    render() {
        const { visible, onClosed, children, onPossitive, onNegative, message, ...rest } = this.props;

        return (
            <Modal useNativeDriver={false} style={{ height: 150, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                isOpen={this.state.visible} onClosed={this.onClosed}
                position={"bottom"} {...rest}>
                <View style={{ alignItems: "center", flex: 1, backgroundColor: "#282828" }}>
                    <View style={{ height: 5, width: 60, borderRadius: 10, backgroundColor: "#BBB", marginVertical: 5 }} />
                    <View style={styles.content}>
                        <Text style={styles.contentTitle}>{message}</Text>
                        <View onLayout={(event) => {
                            this.setState({ width: event.nativeEvent.layout.width / 2 })
                        }} style={{ flexDirection: "row", width: 150, justifyContent: "space-around" }}>
                            <AnimatedTouchableOpacity onLayout={(event) => { this.setState({ x1: event.nativeEvent.layout.x }); console.log("View2", event.nativeEvent.layout.x) }}
                                style={[styles.button, {
                                    borderColor: COLORS.RED,
                                    opacity: this._animatedView2, transform: [{
                                        translateX: this._animTranlation.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [0, this.state.width - (this.state.x1 + 25)]  // 0 : 150, 0.5 : 75, 1 : 0
                                        }),
                                    }],
                                }]} onPress={() => this.onPressed(2, onNegative)}>
                                <Image style={[styles.image, { tintColor: COLORS.RED }]} source={require('../../images/cross.png')} />
                            </AnimatedTouchableOpacity>
                            <AnimatedTouchableOpacity onLayout={(event) => { this.setState({ x: event.nativeEvent.layout.x }); console.log("View1", event.nativeEvent.layout.x) }}
                                style={[styles.button, {
                                    opacity: this._animatedView1, transform: [{
                                        translateX: this._animTranlation.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [0, this.state.width - (this.state.x + 25)]  // 0 : 150, 0.5 : 75, 1 : 0
                                        }),
                                    }],
                                }]} onPress={() => this.onPressed(1, onPossitive)}>
                                <Image style={styles.image} source={require('../../images/check.png')} />
                            </AnimatedTouchableOpacity>
                        </View>
                    </View>
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
        height: 40,
        width: 40,
        tintColor: COLORS.GREEN,
    },
    button: {
        height: 50,
        width: 50,
        borderRadius: 25,
        borderColor: COLORS.GREEN,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
    }

})

export default SingleChoiceModal;