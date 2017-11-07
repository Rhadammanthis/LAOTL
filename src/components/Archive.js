import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View,
    ActivityIndicator, Animated, ScrollView,
    TouchableOpacity, Image
} from 'react-native';
import { connect } from 'react-redux';
import EpisodeListItem from './EpisodeListItem';

class Archive extends Component {

    componentWillMount() {

        console.log(this.props.episodes)

    }

    renderEpisodes() {

        return Object.keys(this.props.episodes).slice(0, 10).map((i) => (
            <EpisodeListItem key={i} episode={this.props.episodes[i]} />
        ))

    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ backgroundColor: '#171612' }}>
                    {this.renderEpisodes()}
                </ScrollView>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    
    });

const mapStateToProps = ({ data }) => {

    const { episodes } = data;

    return {
        episodes
    };
};

export default connect(mapStateToProps)(Archive);