import React, { Component } from 'react';
import {
    StyleSheet, Text, TextInput, View,
    Alert, TouchableNativeFeedback,
    Image, Button, ActivityIndicator,
    ScrollView, Keyboard, Animated, Easing
} from 'react-native';
import Constants from './common/Constants'
import Fade from './common/Fade'
import { connect } from 'react-redux'
import { searchTextChanged, searchContent, addNewContent } from '../actions'
import Icon from 'react-native-vector-icons/Ionicons';
import * as Progress from 'react-native-progress';
import FlipCard from 'react-native-flip-card'

class AddNew extends Component {

    state = {
        search: 0,
        progress: 0.01,
        flipCard: false,
        showText: false,
        intervalId: null,
        colorAnimation: new Animated.Value(0),
        progressColor: Constants.COLOR.BRIGHT_ORANGE,
        progressMessage: "Working on that...",
        show: false
    }

    componentWillMount() {

        const { contentType, firebaseId } = this.props.navigation.state.params;
        this.contentType = contentType;
        this.firebaseId = firebaseId;

        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));

    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow() {
        this.setState({ show: false })
    }

    _keyboardDidHide() {
        if (this.state.search === 2)
            this.setState({ show: true })
    }

    preventInteraction() {
        return this.state.progress > 0.01
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.searchResult !== prevProps.searchResult) {
            this.setState({ search: 2 })

        }

        if (this.state.search === 2 && prevState.search === 1)
            this.setState({ show: true })
    }

    onTextChanged(text) {
        this.props.searchTextChanged(text);
    }

    searchForNewContent() {

        Keyboard.dismiss()

        this.props.searchContent(this.contentType, this.props.searchText)
        this.setState({ search: 1, show: false })
    }

    flipCard() {
        if (this.preventInteraction()) return;

        if (this.props.searchResult === null || this.props.searchResult.content === null) {
            Alert.alert("Alert", "No new content loaded!")
        }
        else {
            this.setState({ flipCard: true })
        }

    }

    onFlipEndListener() {

        if (this.state.flipCard === false) {

            this.setState({
                progress: 0.01,
                showText: false,
                progressColor: Constants.COLOR.BRIGHT_ORANGE,
                progressMessage: "Working on that...",
            })

            return
        }

        this.buildNewContentQuery();

        this.setState({
            showText: true,
            intervalId: setInterval(() => {

                this.setState({ progress: this.state.progress += Math.random() * (0.035 - 0.001) + 0.01 })

                //TODO: Test for low internet speed to see where does it make the more sense to put this
                if (this.props.contentAddedResponse !== null)
                    this.setState({ progress: this.state.progress += 0.60 })

                if (this.state.progress >= 1) {

                    clearInterval(this.state.intervalId)

                    this.setState({ progressColor: this.props.responseColor, progressMessage: this.progressMessage() })

                    var timeoutId = setTimeout(() => {
                        this.setState({
                            progress: 1,
                            flipCard: false
                        })

                        clearTimeout(timeoutId)
                    }, 1300)
                }
            }, 300)
        })

    }

    buildNewContentQuery() {
        switch (this.contentType) {
            case "movie":
                var content = { movie_id: this.props.searchResult.content.id };
                break;
        }
        this.props.addNewContent(this.contentType, content, this.firebaseId, this.props.selectedEpisode.show_notes);
    }

    progressMessage = () => {
        switch (this.props.responseColor) {
            case Constants.COLOR.GREEN:
                return "Success!"
            case Constants.COLOR.RED:
                return "Something went wrong"
            default:
                return "Working on that"
        }
    }

    renderContentFlipCard() {

        switch (this.contentType) {
            case "movie":
                var content = (
                    <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'column', alignItems: 'center', paddingVertical: 10 }}>
                        <Image style={{ flex: 1, width: 200 }} source={{ uri: "https://image.tmdb.org/t/p/original" + this.props.searchResult.content.poster_path }} />
                        <View style={{ height: StyleSheet.hairlineWidth, width: 270, backgroundColor: Constants.COLOR.BRIGHT_ORANGE, marginVertical: 10, marginHorizontal: 15 }} />
                        <Text ellipsizeMode={'tail'} numberOfLines={1} style={{ color: 'white', fontSize: 20, marginHorizontal: 25 }}>
                            {this.props.searchResult.content.title}
                        </Text>
                        <Text style={{ color: 'white', fontSize: 15, marginHorizontal: 50 }}>
                            ({this.props.searchResult.content.release_date.slice(0, 4)})
                        </Text>
                    </View>)
                break
        }

        return (
            <Fade visible={this.state.show} style={{ marginVertical: 20, marginHorizontal: 30 }}>
                <FlipCard style={{ flex: 1 }}
                    alignWidth={true}
                    friction={10}
                    perspective={2000}
                    flipHorizontal={true}
                    flipVertical={false}
                    flip={this.state.flipCard}
                    clickable={false}
                    onFlipEnd={(isFlipEnd) => { this.onFlipEndListener() }}>
                    {content}
                    <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                        <Progress.Circle animated={true} color={this.state.progressColor} thickness={5} size={150} progress={this.state.progress} showsText={this.state.showText} strokeCap="round" textStyle={{ padding: -5 }} />
                        <Animated.Text style={{ color: this.state.progressColor, fontSize: 20, marginTop: 40 }}>
                            {this.state.progressMessage}
                        </Animated.Text>
                    </View>
                </FlipCard>
            </Fade>
        )
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
                    color={Constants.COLOR.BRIGHT_ORANGE}
                />)
            //Search results
            case 2:
                if (this.props.searchResult.content !== null) {
                    return (
                        this.renderContentFlipCard()
                    )
                }
                else {
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

    renderAddNewConentButton() {
        if (this.state.show === false)
            return null

        return (<Button
            title="Add content"
            onPress={() => { if (this.preventInteraction()) return; this.flipCard() }}
            style={{ marginVertical: 10, height: 100 }}
            color={Constants.COLOR.BRIGHT_ORANGE}
            accessibilityLabel="Learn more about this purple button"
        />)
    }

    render() {

        return (
            <View style={{ backgroundColor: Constants.COLOR.BACKGROUND, flex: 1 }}>
                <View style={styles.navBar}>
                    <TouchableNativeFeedback
                        onPress={() => { if (this.preventInteraction()) return; this.props.navigation.goBack() }}>
                        <Icon name="md-close" style={styles.actionButtonIcon} />
                    </TouchableNativeFeedback>
                    <Text style={styles.navBarTitle} numberOfLines={1}>
                        Add new {this.contentType}
                    </Text>
                    <TouchableNativeFeedback
                        style={{ marginRight: 10 }}
                        onPress={() => { if (this.preventInteraction()) return; Alert.alert('What to do?', this.getAlertMessage()) }}>
                        <Icon name="md-information-circle" style={styles.actionButtonIcon} />
                    </TouchableNativeFeedback>
                </View>
                <View style={{ flex: 1, marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', paddingRight: 10, justifyContent: 'space-around', alignItems: 'center' }}>
                        <TextInput underlineColorAndroid='rgba(0,0,0,0)' value={this.props.searchText} onChangeText={this.onTextChanged.bind(this)}
                            placeholder="TMDB id or url" onSubmitEditing={this.searchForNewContent.bind(this)} style={styles.textInput} />
                        <TouchableNativeFeedback
                            onPress={() => { if (this.preventInteraction()) return; this.searchForNewContent() }}>
                            <Icon name="md-search" style={styles.actionButtonIcon} />
                        </TouchableNativeFeedback>
                    </View>
                    <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', paddingVertical: 20, paddingHorizontal: 30 }}>
                        {this.renderContentState()}
                    </ScrollView>
                    {this.renderAddNewConentButton()}
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

    const { searchText, searchResult, contentAddedResponse, responseColor } = newContent;
    const { selectedEpisode } = data;

    return {
        searchText, searchResult, selectedEpisode, contentAddedResponse,
        responseColor
    };
};

export default connect(mapStateToProps, { searchTextChanged, searchContent, addNewContent })(AddNew)