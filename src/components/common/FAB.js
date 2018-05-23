import React, { Component, Dimensions, Animated, Easing, TouchableNativeFeedback } from 'react';
import { View } from 'react-native';

class Transparency extends Component {

    componentWillMount() {

    }

    render() {

        return (
            <Animated.View style={[styles.addContent, {
                transform: [{
                    translateY: this.state.animButtonPossition.interpolate({
                        inputRange: [0, 1],
                        outputRange: [250, 0]
                    })
                }]
            }]}>
                <TouchableNativeFeedback
                    onPress={() => {
                        console.log('Start anim')

                    }}>
                    <View style={[{ flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
                        <Image style={styles.addContentImage} source={require('../../images/add_white.png')} />
                    </View>
                </TouchableNativeFeedback>
            </Animated.View>
        );
    }
};

export default Transparency;
