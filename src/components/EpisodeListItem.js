import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View,
    ActivityIndicator, Animated, ScrollView,
    TouchableOpacity, Image
} from 'react-native';
import { connect } from 'react-redux';
import { selectEpisode } from '../actions'

class EpisodeListItem extends Component {

    componentWillMount() {
    }

    onEpisodeSelected(){
        console.log('Clicked!')
        this.props.selectEpisode(this.props.episode, this.props.firebaseId, this.props.navigate)
    }

    render() {

        const episode = this.props.episode;

        var sortCategoryResource = (category) => {
            switch (category) {
                case 'Serial Killers':
                    return "SK";
                case 'Conspiracy':
                    return "Con";
                case 'Satanism and the Ocult':
                    return "SatO"
                case 'Cults, Spirituality and Psychics':
                    return "CSP"
                case 'Aliens':
                    return "A"
                case 'Miscellaneous':
                    return "Misc"
                case 'Horrors of Reality':
                    return "HoR"
                case 'Monsters and Cryptoids':
                    return "MaC"
                case 'Creepypasta':
                    return "Cree"
                case 'Ghosts and Hauntings':
                    return "GaH"
            }
        }

        return (
            <TouchableOpacity style={{ height: 110 }} onPress={this.onEpisodeSelected.bind(this)}>
                <View style={{ flex: 1, flexDirection: 'row', marginTop: 5, marginBottom: 5 }}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', paddingHorizontal: 5 }}>
                        <Text style={[styles.title, { fontSize: 20 }]}>{episode.number}</Text>
                        <Text style={{ color: '#F6502C' }}>{sortCategoryResource(episode.category)}</Text>
                    </View>
                    <View style={{ width: 2, height: 80, backgroundColor: '#F6502C', marginHorizontal: 5, marginVertical: 5 }} />
                    <View style={{ flex: 6, paddingHorizontal: 15 }}>
                        <Text style={styles.title}>{episode.title}</Text>
                        <Text numberOfLines={3} style={styles.description}>
                            {episode.description}
                        </Text>
                    </View>
                    <Image style={{ flex: 3, height: 100 }}
                        source={{ uri: episode.image }} />
                </View>
            </TouchableOpacity>
        )
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
        color: 'white',
    },
});

const mapStateToProps = ({ data }) => {

    const { selectedEpisode } = data;

    return {
        selectedEpisode
    };
};

export default connect(mapStateToProps, { selectEpisode })(EpisodeListItem)