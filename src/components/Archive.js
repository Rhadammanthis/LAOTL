import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View,
    ActivityIndicator, Animated, ScrollView,
    TouchableOpacity, Image
} from 'react-native';
import { connect } from 'react-redux';

class Archive extends Component {

    componentWillMount() {

        console.log(this.props.episodes)

    }

    renderEpisodes() {

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

        return Object.keys(this.props.episodes).slice(0, 10).map((i) => (
            <TouchableOpacity key={i} style={{ height: 90 }}>
                <View style={{ flex: 1, flexDirection: 'row', marginTop: 5, marginBottom: 5 }}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                        <Text style={[styles.title, { fontSize: 20 }]}>{this.props.episodes[i].number}</Text>
                        <Text style={{ color: '#F6502C' }}>{sortCategoryResource(this.props.episodes[i].category)}</Text>
                    </View>
                    {/* <View style={{ width: 2, height: 80, backgroundColor: '#F6502C', marginHorizontal: 5, marginVertical: 5 }} /> */}
                    <View style={{ flex: 6 }}>
                        <Text style={styles.title}>{this.props.episodes[i].title}</Text>
                        <Text numberOfLines={3} style={styles.description}>
                            {this.props.episodes[i].description}
                        </Text>
                    </View>
                    <Image style={{ flex: 3, height: 100 }}
                        source={{ uri: this.props.episodes[i].image }} />
                </View>
            </TouchableOpacity>
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

    const { episodes } = data;

    return {
        episodes
    };
};

export default connect(mapStateToProps)(Archive);