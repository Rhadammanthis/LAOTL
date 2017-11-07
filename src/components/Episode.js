import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View,
    ActivityIndicator, Animated, ScrollView,
    TouchableOpacity, Image
} from 'react-native';
import { connect } from 'react-redux';
// import { selectEpisode } from '../actions'

class Episode extends Component {

    componentWillMount() {

    }

    render() {
        return (
            <View>
                <Text>{this.props.selectedEpisode.title}</Text>
            </View>
        )
    }
}

const mapStateToProps = ({ data }) => {

    const { selectedEpisode } = data;

    return {
        selectedEpisode
    };
};

export default connect(mapStateToProps)(Episode)