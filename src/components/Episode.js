import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View,
    ActivityIndicator, Animated, ScrollView,
    TouchableOpacity, Image, Modal, TouchableNativeFeedback
} from 'react-native';
import Transparency from './common/Transparency'
import Constants from './common/Constants'
import { connect } from 'react-redux';
import { selectEpisode, toggleNavbarFade } from '../actions'

class Episode extends Component {

    componentWillMount() {

        const { setParams } = this.props.navigation;
        console.log(this.props.selectedEpisode)
        setParams({ showNavBar: false })

    }

    render() {

        const { setParams, goBack } = this.props.navigation;

        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ backgroundColor: Constants.COLOR.BACKGROUND }}
                    onScroll={(event) => {
                        this.props.toggleNavbarFade(event.nativeEvent.contentOffset.y)
                    }}>
                    <Image style={{ flex: 1, height: 250 }} source={{ uri: this.props.selectedEpisode.image }} />
                    <Transparency size={35} />
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Text style={[styles.title, { opacity: (1 - this.props.fade) }]}>
                            {this.props.selectedEpisode.title}
                        </Text>
                        <View style={{ flex: 2, flexDirection: 'row' }}>
                            <Image style={styles.icon} source={require('../images/clock.png')} />
                            <Text style={{ color: Constants.COLOR.MUTE_ORANGE, marginHorizontal: 10 }}>
                                {this.props.selectedEpisode.duration}
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.description}>
                        {this.props.selectedEpisode.description}
                    </Text>
                    <View style={{ height: 1000 }} />
                </ScrollView>
                <View style={[styles.navBar, { opacity: this.props.fade, }]}>
                    <Text style={styles.navBarTitle}>
                        {this.props.selectedEpisode.title}
                    </Text>
                </View>
                <TouchableNativeFeedback style={styles.backButton}
                    onPress={() => { goBack() }}>
                    <Image style={styles.backButtonImage} source={require('../images/arrow_back.png')} />
                </TouchableNativeFeedback>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    navBar: {
        position: 'absolute',
        height: 50,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Constants.COLOR.TOOLBAR,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    navBarTitle: {
        flex: 1,
        fontSize: 18,
        color: Constants.COLOR.MUTE_ORANGE,
        fontWeight: 'bold',
        marginLeft: 35
    },
    backButton: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    backButtonImage: {
        height: 25,
        width: 25,
        tintColor: Constants.COLOR.BRIGHT_ORANGE,
        marginLeft: 5,
        position: 'absolute',
        top: 13,
        bottom: 0,
        left: 0,
        right: 0,
    },
    description: {
        flex: 2,
        color: 'white',
        marginHorizontal: 10,
        marginTop: 10
    },
    icon: {
        marginTop: -5,
        height: 25,
        width: 25,
        tintColor: Constants.COLOR.BRIGHT_ORANGE,
    },
    title: {
        flex: 8,
        color: Constants.COLOR.MUTE_ORANGE,
        fontWeight: 'bold',
        fontSize: 35,
        marginTop: -25,
        marginHorizontal: 10
    }
});

const mapStateToProps = ({ data }) => {

    const { selectedEpisode, fade } = data;

    return {
        selectedEpisode, fade
    };
};

export default connect(mapStateToProps, { toggleNavbarFade })(Episode)