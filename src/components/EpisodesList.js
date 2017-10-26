import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View,
    ActivityIndicator, Animated, ScrollView,
    TouchableOpacity, Image
} from 'react-native';
import { connect } from 'react-redux';

class EpisodesList extends Component {

    componentWillMount() {


    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                <Text> Loooool </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ddd',
    },
    image: {
        width: 120,
        height: 120,
        alignSelf: 'center',
        marginBottom: 20,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#F37752',
    },
    description: {
        fontSize: 13,
        color: '#904B35',
    },
});

const mapStateToProps = ({ data }) => {

    const { episodes } = data;

    return {
        episodes
    };
};

export default EpisodesList;