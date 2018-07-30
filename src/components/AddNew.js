import React, { Component } from 'react';
import {
    StyleSheet, Text, TextInput, View,
    Alert, TouchableNativeFeedback,
    Image, Button, ActivityIndicator,
    ScrollView, Keyboard
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Constants from './common/Constants'
import { connect } from 'react-redux'
import { searchTextChanged, searchContent, addNewContent } from '../actions'

class AddNew extends Component {

    state = {
        search: 0
    }

    // contentType = ""
    // firebaseId = ""

    componentWillMount() {

        const { contentType, firebaseId } = this.props.navigation.state.params;
        this.contentType = contentType;
        this.firebaseId = firebaseId;

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.searchResult !== prevProps.searchResult)
            this.setState({ search: 2 })

    }

    onTextChanged(text) {
        this.props.searchTextChanged(text);
    }

    searchForNewContent() {

        Keyboard.dismiss()

        this.props.searchContent("movie", this.props.searchText)
        this.setState({ search: 1 })
    }

    addNewContent() {

        console.log("Should add new content", this.props.searchResult)

        if (this.props.searchResult === null || this.props.searchResult.content === null){
            Alert.alert("Alert", "No new content loaded!")}
        else {
            switch (this.contentType) {
                case "movie":
                    var content = { movie_id: this.props.searchResult.content.id }
                    break;
            }

            this.props.addNewContent(
                this.contentType,
                content,
                this.firebaseId,
                this.props.selectedEpisode.show_notes
            )
        }

    }

    renderContentState() {
        switch (this.state.search) {
            //Pre search
            case 0:
                return (
                    <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                        <Icon name="md-eye" style={styles.contentIcon} />
                        <Text style={{ marginHorizontal: 20, color: Constants.COLOR.TOOLBAR, textAlign: 'justify' }}>
                            No new content... yet.
                        </Text>
                    </View>
                )
            //While searching
            case 1:
                return (<ActivityIndicator
                    style={styles.centering}
                    size="large"
                    color="#F6502C"
                />)
            //Search results
            case 2:
                switch (this.contentType) {
                    case "movie":
                        if (this.props.searchResult.content !== null)
                            return (
                                <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                    <View style={{ marginRight: 10 }}>
                                        <Image style={{ height: 300, width: 200 }} source={{ uri: "https://image.tmdb.org/t/p/original" + this.props.searchResult.content.poster_path }} />
                                    </View>
                                    <View style={{ height: StyleSheet.hairlineWidth, width: 300, backgroundColor: Constants.COLOR.BRIGHT_ORANGE, marginVertical: 10 }} />
                                    <View>
                                        <Text style={{ color: 'white', fontSize: 20 }}> {this.props.searchResult.content.title} ({this.props.searchResult.content.release_date.slice(0, 4)}) </Text>
                                    </View>
                                </View>
                            )
                    default:      
                        return (
                            <View style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                <View style={{ height: 1, width: 150, backgroundColor: Constants.COLOR.BRIGHT_ORANGE, marginVertical: 10 }} />
                                <Text style={{ color: 'white', fontSize: 20 }}>
                                    {this.getNoContentMessage()}
                                </Text>
                                <View style={{ height: 1, width: 150, backgroundColor: Constants.COLOR.BRIGHT_ORANGE, marginVertical: 10 }} />
                            </View>
                        )
                }
        }
    }

    getNoContentMessage() {
        switch (this.contentType) {
            case "movie":
                return "Movie id not found 😞"
            default:
                return "Something went wrong 😞"
        }
    }

    getAlertMessage() {
        switch (this.contentType) {
            case "movie":
                return "To add a new movie you'll have to get it's id from The Movie Database (themoviedb.org). Type it into the box or copy the entire movie's profile url and load it, then simply press the button down below"
            default:
                return "Something went wrong 😞"
        }
    }

    render() {

        return (
            <View style={{ backgroundColor: Constants.COLOR.BACKGROUND, flex: 1 }}>
                <View style={styles.navBar}>
                    <TouchableNativeFeedback
                        onPress={() => { this.props.navigation.goBack() }}>
                        <Icon name="md-close" style={styles.actionButtonIcon} />
                    </TouchableNativeFeedback>
                    <Text style={styles.navBarTitle} numberOfLines={1}>
                        Add new {this.contentType}
                    </Text>
                    <TouchableNativeFeedback
                        style={{ marginRight: 10 }}
                        onPress={() => { Alert.alert('What to do?', this.getAlertMessage()) }}>
                        <Icon name="md-information-circle" style={styles.actionButtonIcon} />
                    </TouchableNativeFeedback>
                </View>
                <View style={{ flex: 1, marginTop: 10 }}>
                    {/* <Text style={{ color: 'white', fontSize: 20, marginHorizontal: 10 }}> TMDB id or URL </Text> */}
                    <View style={{ flexDirection: 'row', paddingRight: 10, justifyContent: 'space-around', alignItems: 'center' }}>
                        <TextInput underlineColorAndroid='rgba(0,0,0,0)' value={this.props.searchText} onChangeText={this.onTextChanged.bind(this)}
                            placeholder="TMDB id or url" onSubmitEditing={this.searchForNewContent.bind(this)} style={styles.textInput} />
                        <TouchableNativeFeedback
                            onPress={() => { this.searchForNewContent() }}>
                            <Icon name="md-search" style={styles.actionButtonIcon} />
                        </TouchableNativeFeedback>
                    </View>
                    <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
                        {this.renderContentState()}
                    </ScrollView>
                    <Button
                        title="Add content"
                        onPress={() => { this.addNewContent() }}
                        style={{ marginVertical: 10, height: 100 }}
                        color={Constants.COLOR.BRIGHT_ORANGE}
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>
            </View>

        )
    }
}


const styles = StyleSheet.create({
    navBar: {
        paddingHorizontal: 10,
        height: 50,
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
        marginLeft: 20
    },
    textInput: {
        flex: 1,
        fontSize: 17,
        height: 40,
        borderColor: '#F37752',
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 15,
        marginHorizontal: 10
    },
    addContentImage: {
        height: 40,
        width: 40
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
    },
    actionButtonIcon: {
        fontSize: 30,
        height: 32,
        color: Constants.COLOR.BRIGHT_ORANGE,
    },
    contentIcon: {
        fontSize: 120,
        height: 122,
        color: Constants.COLOR.TOOLBAR,
    }
});

const mapStateToProps = ({ newContent, data }) => {

    const { searchText, searchResult } = newContent;
    const { selectedEpisode } = data;

    return {
        searchText, searchResult, selectedEpisode
    };
};

export default connect(mapStateToProps, { searchTextChanged, searchContent, addNewContent })(AddNew)