import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View,
    ActivityIndicator, Animated, ScrollView,
    TouchableOpacity, Image, BackHandler
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { selectEpisode, setLoggedUser } from '../actions'

class Featured extends Component {

    componentWillMount() {

        console.log('From firebase', this.props.episodes)
        this.props.setLoggedUser(this.props.navigation.dangerouslyGetParent());
        // this.props.navigation.dangerouslyGetParent().setParams({ selectionState: "Buffer" })
        // console.log("Parent", this.props.navigation.dangerouslyGetParent().setParams({ selectionState: "Buffer" }))

    }

    onEpisodeSelected() {
        // console.log('Clicked!')
        this.props.selectEpisode(this.props.episode, this.props.navigate)
    }

    // componentWillReceiveProps(nextProps){
    //     console.log("Did update")
    //     // this.props.navigation.setParams({ selectionState: "SignUp" });
    //     if(this.props.loggedInUser != nextProps.loggedInUser)
    //         this.props.navigation.setParams({ selectionState: "Profile" });
    //     // else
    //     //     this.props.navigation.setParams({ selectionState: "SignUp" });

    //     console.log("User", this.props.loggedInUser)
    // }

    render() {

        var mappedEpisodes = Object.keys(this.props.episodes).map((x) => {
            var firebaseId = x;
            this.props.episodes[x].firebaseId = firebaseId
            return this.props.episodes[x]
        }
        )
        let newestEpisode = mappedEpisodes.length - 1;
        let lastRecentEpisode = mappedEpisodes.length - 7;
        let recentEpisodes = [];

        for (let i = newestEpisode; i > lastRecentEpisode; i--) {

            recentEpisodes.push(
                <TouchableOpacity key={i} style={[styles.featureView]} onPress={() => { this.props.selectEpisode(mappedEpisodes[i], mappedEpisodes[i].firebaseId, this.props.navigation.navigate) }}>
                    <View style={{ flex: 1 }}>
                        <Image style={{ flex: 1, alignItems: 'center', flexDirection: 'column', justifyContent: 'space-around' }}
                            source={{ uri: mappedEpisodes[i].cover_image }}
                            blurRadius={1.2}>
                        </Image>
                        <View>
                            <View style={{ backgroundColor: '#171612', paddingVertical: 5, paddingHorizontal: 5, minWidth: 300, minHeight: 50 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center' }}>
                                    <Text style={{ color: '#F37752', fontSize: 15, flex: 1, paddingBottom: 5 }}>
                                        {mappedEpisodes[i].number}
                                    </Text>
                                    <Text style={{ color: 'white', flex: 9, paddingBottom: 5, fontSize: 17 }}>
                                        {mappedEpisodes[i].title}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }


        // var sortCategoryResource = (category) => {
        //     switch (category) {
        //         case 'Serial Killers':
        //             return "SK";
        //         case 'Conspiracy':
        //             return "Con";
        //         case 'Satanism and the Ocult':
        //             return "SatO"
        //         case 'Cults, Spirituality and Psychics':
        //             return "CSP"
        //         case 'Aliens':
        //             return "A"
        //         case 'Miscellaneous':
        //             return "Misc"
        //         case 'Horrors of Reality':
        //             return "HoR"
        //         case 'Monsters and Cryptoids':
        //             return "MaC"
        //         case 'Creepypasta':
        //             return "Cree"
        //         case 'Ghosts and Hauntings':
        //             return "GaH"
        //     }
        // }

        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <ScrollView>
                    {recentEpisodes}
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
    featureView: {
        minHeight: 250,
        minWidth: 400,
    },

});

const mapStateToProps = ({ data, user }) => {

    const { episodes } = data;
    const { loggedInUser } = user

    return {
        episodes, loggedInUser
    };
};

export default connect(mapStateToProps, { selectEpisode, setLoggedUser })(Featured);