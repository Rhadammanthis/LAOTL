import React, { Component } from 'react';
import {
    StyleSheet, Text, View,
    TouchableOpacity,
    Image, TouchableNativeFeedback,
    Linking, Animated, Easing, SectionList
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import Transparency from './common/Transparency'
import Constants from './common/Constants'
import { connect } from 'react-redux'
import { ArticleListItem, BookListItem, MovieListItem, VideoListItem } from './pure'
import { selectEpisode, toggleNavbarFade, clearNewContentValues } from '../actions'

class Episode extends Component {

    state = {
        animButtonPossition: new Animated.Value(0),
        animComplete: false,
        scrollPoss: 0,
        sectionsData: []
    }

    sectionsData = []

    componentWillMount() {

        episode = this.props.selectedEpisode;

        console.log('Firebase Id', this.props.navigation.state.params.firebaseId)

        for (var key in episode.show_notes) {
            if (episode.show_notes.hasOwnProperty(key)) {
                console.log("KEYS", key)
                this.sectionsData.push({
                    key: key,
                    data: episode.show_notes[key],
                    renderItem: ({ item, section }) => this.selectItemRenderer(item, section)
                })
            }
        }
    }

    renderListHeader = () => {

        return (
            <View>
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
                <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: Constants.COLOR.BRIGHT_ORANGE, marginVertical: 10 }} />
                <Text style={[styles.title, { fontWeight: 'normal', marginTop: 0, marginBottom: 10, fontSize: 25 }]}>
                    Show Notes
                    </Text>
            </View>
        );
    };

    renderSectionHeader = (section) => {
        return (
            <Text style={{ color: Constants.COLOR.MUTE_ORANGE, fontSize: 14, marginHorizontal: 10 }}>
                {section.key.toUpperCase()}
            </Text>
        )
    }

    onListScroll = (event) => {

        this.props.toggleNavbarFade(event.nativeEvent.contentOffset.y)

        var currentOffset = event.nativeEvent.contentOffset.y;
        var direction = currentOffset > this.offset ? 'down' : 'up';

        if (direction === "up" && this.state.animComplete === true) {

            this.setState({ animComplete: false })

            Animated.timing(this.state.animButtonPossition, {
                toValue: 0,
                duration: 700,
                easing: Easing.inOut(Easing.exp),
            }).start(onComplete = () => {
                console.log('Anim complete')
            })
        }

        if (direction === "down" && (currentOffset - this.state.scrollPoss) > 60 && this.state.animComplete === false) {

            this.setState({ animComplete: true })

            Animated.timing(this.state.animButtonPossition, {
                toValue: 1,
                duration: 700,
                easing: Easing.inOut(Easing.exp),
            }).start(onComplete = () => {
                console.log('Anim complete')
            })
        }

        this.offset = currentOffset;

    }

    selectItemRenderer = (item, section) => {

        switch (section.key) {
            case "articles":
                return <ArticleListItem item={item} />
            case "books":
                return <BookListItem item={item} />
            case "movies":
                return <MovieListItem item={item} />
            case "videos":
                return <VideoListItem item={item} />

            default:
                return null
        }
    }

    addNewContent(type) {

        this.props.clearNewContentValues()

        const { navigate } = this.props.navigation
        navigate('AddNew', { contentType: type, firebaseId: this.props.navigation.state.params.firebaseId })
    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                <SectionList
                    onScroll={this.onListScroll}
                    style={{ backgroundColor: Constants.COLOR.BACKGROUND }}
                    ListHeaderComponent={this.renderListHeader}
                    renderSectionHeader={({ section }) => this.renderSectionHeader(section)}
                    keyExtractor={(item) => item.title}
                    sections={this.sectionsData}>
                </SectionList>
                <View style={[styles.navBar, { opacity: this.props.fade, }]}>
                    <Text style={styles.navBarTitle} numberOfLines={1}>
                        {this.props.selectedEpisode.number} - {this.props.selectedEpisode.title}
                    </Text>
                </View>
                <TouchableNativeFeedback style={styles.backButton}
                    onPress={() => { this.props.navigation.goBack() }}>
                    <Image style={styles.backButtonImage} source={require('../images/arrow_back.png')} />
                </TouchableNativeFeedback>
                <ActionButton buttonColor="rgba(246,80,40,1)" bgColor="rgba(0,0,0,0.6)" offsetX={20} offsetY={20} spacing={15} fixNativeFeedbackRadius={true}>
                    <ActionButton.Item buttonColor='rgba(246,80,40,1)' title="Video" onPress={() => { this.addNewContent("video") }} textStyle={{ color: "white", fontSize: 15 }}
                        textContainerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}>
                        <Icon name="md-play" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='rgba(246,80,40,1)' title="Movie" onPress={() => { this.addNewContent("movie") }} textStyle={{ color: "white", fontSize: 15 }}
                        textContainerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}>
                        <Icon name="md-film" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='rgba(246,80,40,1)' title="Book" onPress={() => { this.addNewContent("book") }} textStyle={{ color: "white", fontSize: 15 }}
                        textContainerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}>
                        <Icon name="md-book" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='rgba(246,80,40,1)' title="Article" onPress={() => { this.addNewContent("article") }} textStyle={{ color: "white", fontSize: 15 }}
                        textContainerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}>
                        <Icon name="md-document" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
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
    addContent: {
        position: 'absolute',
        right: 10,
        bottom: 10,
        borderRadius: 60,
        height: 60,
        width: 60,
        backgroundColor: Constants.COLOR.BRIGHT_ORANGE
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
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});

const mapStateToProps = ({ data }) => {

    const { selectedEpisode, fade } = data;

    return {
        selectedEpisode, fade
    };
};

export default connect(mapStateToProps, { toggleNavbarFade, clearNewContentValues })(Episode)