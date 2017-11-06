import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View,
    ActivityIndicator, Animated, ScrollView,
    TouchableOpacity, Image
} from 'react-native';
import { connect } from 'react-redux';

class Featured extends Component {



    componentWillMount() {

        console.log('From firebase', this.props.episodes)

    }

    render() {

        var mappedEpisodes = Object.keys(this.props.episodes).map((x) => { return this.props.episodes[x] })

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
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={{ flex: 2 }}>
                    <Image style={{ flex: 1, alignItems: 'center', flexDirection: 'column', justifyContent: 'space-around' }}
                        source={{ uri: mappedEpisodes[0].image }}
                        blurRadius={1.2}>
                        <View>
                            <View style={{ backgroundColor: '#171612', paddingVertical: 3, paddingHorizontal: 5, minWidth: 300 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center' }}>
                                    <Text style={{ color: '#F37752', fontSize: 30, flex: 1 }}>
                                        {mappedEpisodes[0].number}
                                    </Text>
                                    <Text style={{ color: 'white', flex: 9, paddingBottom: 5, fontSize: 17 }}>
                                        {mappedEpisodes[0].title}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ height: 3, backgroundColor: '#F37752', marginVertical: 3 }} />
                            <View style={{ backgroundColor: '#171612', paddingVertical: 3, paddingHorizontal: 5, minWidth: 300 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center' }}>
                                    <Text style={{ color: '#F37752', fontSize: 30, flex: 2 }}>
                                        {sortCategoryResource(mappedEpisodes[0].category)}
                                    </Text>
                                    <Text numberOfLines={4} style={{ color: 'white', flex: 8, paddingBottom: 5 }}>
                                        {mappedEpisodes[0].description}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </Image>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <Image style={{ flex: 1, alignItems: 'center', flexDirection: 'column', justifyContent: 'space-around' }}
                            source={{ uri: mappedEpisodes[1].image }}
                            blurRadius={1.2}>
                            <View>
                                <View style={{ backgroundColor: '#171612', paddingVertical: 3, paddingHorizontal: 5, minWidth: 150 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center' }}>
                                        <Text style={{ color: '#F37752', fontSize: 20, flex: 2 }}>
                                            {mappedEpisodes[1].number}
                                        </Text>
                                        <Text style={{ color: 'white', flex: 8, paddingBottom: 5, fontSize: 12 }}>
                                            {mappedEpisodes[1].title}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </Image>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Image style={{ flex: 1, alignItems: 'center', flexDirection: 'column', justifyContent: 'space-around' }}
                            source={{ uri: mappedEpisodes[2].image }}
                            blurRadius={1.2}>
                            <View>
                                <View style={{ backgroundColor: '#171612', paddingVertical: 3, paddingHorizontal: 5, minWidth: 150 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center' }}>
                                        <Text style={{ color: '#F37752', fontSize: 20, flex: 2 }}>
                                            {mappedEpisodes[2].number}
                                        </Text>
                                        <Text style={{ color: 'white', flex: 8, paddingBottom: 5, fontSize: 12 }}>
                                            {mappedEpisodes[2].title}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </Image>
                    </View>
                </View>
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

export default connect(mapStateToProps)(Featured);