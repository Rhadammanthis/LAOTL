import React, { Component } from 'react';
import {
    StyleSheet, Text, View,
    Image, TouchableNativeFeedback,
    SectionList, Animated, Platform
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import Transparency from './common/Transparency'
import {COLORS, CONTENT_TYPE} from './common/Constants'
import { connect } from 'react-redux'
import { ArticleListItem, BookListItem, MovieListItem, VideoListItem } from './pure'
import { clearNewContentValues } from '../actions'

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);

class Episode extends Component {

    state = {
        scrollPoss: 0,
        sectionsData: [],
        scrollY: new Animated.Value(0)
    }

    sectionsData = []

    componentWillMount() {

        episode = this.props.selectedEpisode;

        console.log('Episode Data', episode)

        var episodeNotes;
        for(var i =0 ; i < episode.notes.length; i++)
            episodeNotes += episode.notes[i].length

        for (var category in episode.notes){
            console.log("Category", category)
            var sectionContent = []
            for(var item in episode.notes[category]){
                console.log("Item", item);
                var mappedItem = episode.notes[category][item]
                mappedItem.nid = item
                sectionContent.push(mappedItem)
            }
            this.sectionsData.push({
                key: category,
                data: sectionContent,
                renderItem: ({item, section}) => this.selectItemRenderer(item, section)
            })
        }

        console.log("Sections list", this.sectionsData[0])

        // for (var key in episode.notes) {
        //     if (episode.notes.hasOwnProperty(key)) {
        //         console.log("KEYS", key)
        //         this.sectionsData.push({
        //             key: key,
        //             data: episode.notes[key],
        //             renderItem: ({ item, section }) => this.selectItemRenderer(item, section)
        //         })
        //     }
        // }
    }

    renderListHeader = () => {

        millisToReadable = (millis) => {
            sec = millis / 1000
            hour = Math.floor(sec / 3600);
            min = Math.floor(((sec - (hour * 3600)) / 60))
            sec = sec - (hour * 3600) - (min * 60)

            return hour + ":" + (min < 10 ? "0" + min : min) + ":"  + (sec < 10 ? "0" + sec : sec)
        }

        return (
            <View>
                <Image style={{ flex: 1, height: 250 }} source={{ uri: this.props.selectedEpisode.cover_image }} />
                <Transparency size={55} />
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Animated.Text style={[styles.title, {  }]}>
                        {this.props.selectedEpisode.title}
                    </Animated.Text>
                    <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <Image style={styles.icon} source={require('../images/clock.png')} />
                        <Text style={{ color: COLORS.MUTE_ORANGE, marginHorizontal: 10 }}>
                            {millisToReadable(this.props.selectedEpisode.duration)}
                        </Text>
                    </View>
                </View>
                <Text style={styles.description}>
                    {this.props.selectedEpisode.description}
                </Text>
                <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: COLORS.BRIGHT_ORANGE, marginVertical: 10 }} />
                <Text style={[styles.title, { fontWeight: 'normal', marginTop: 0, marginBottom: 10, fontSize: 25 }]}>
                    Show Notes
                    </Text>
            </View>
        );
    };

    renderSectionHeader = (section) => {
        return (
            <Text style={{ color: COLORS.MUTE_ORANGE, fontSize: 14, marginHorizontal: 10 }}>
                {section.key.toUpperCase()}
            </Text>
        )
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

        const animFade =  Animated.event(
            [{
                nativeEvent: { contentOffset: { y: this.state.scrollY } }
            }],
            {
                useNativeDriver: true
            }
        )

        var headerFade = this.state.scrollY.interpolate({
            inputRange: [175, 254, 255],
            outputRange: [0, 0.9, 1],
            extrapolate: 'clamp'
        });

        return (
            <View style={{ flex: 1 }}>
                <AnimatedSectionList
                    onScroll={animFade}
                    style={{ backgroundColor: COLORS.BACKGROUND }}
                    ListHeaderComponent={this.renderListHeader(headerFade)}
                    renderSectionHeader={({ section }) => this.renderSectionHeader(section)}
                    keyExtractor={(item) => item.title}
                    sections={this.sectionsData}>
                </AnimatedSectionList>
                <Animated.View style={[styles.navBar, { opacity: headerFade }]}>
                    <Animated.Text style={[styles.navBarTitle, { opacity: headerFade }]} numberOfLines={1}>
                        {this.props.selectedEpisode.number} - {this.props.selectedEpisode.title}
                    </Animated.Text>
                </Animated.View>
                <TouchableNativeFeedback style={styles.backButton}
                    onPress={() => { this.props.navigation.goBack() }}>
                    <Image style={styles.backButtonImage} source={require('../images/arrow_back.png')} />
                </TouchableNativeFeedback>
                <ActionButton buttonColor="rgba(246,80,40,1)" bgColor="rgba(0,0,0,0.6)" offsetX={20} offsetY={20} spacing={15} fixNativeFeedbackRadius={true}>
                    <ActionButton.Item buttonColor='rgba(246,80,40,1)' title="Video" onPress={() => { this.addNewContent(CONTENT_TYPE.VIDEO) }} textStyle={{ color: "white", fontSize: 15 }}
                        textContainerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}>
                        <Icon name="md-play" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='rgba(246,80,40,1)' title="Movie" onPress={() => { this.addNewContent(CONTENT_TYPE.MOVIE) }} textStyle={{ color: "white", fontSize: 15 }}
                        textContainerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}>
                        <Icon name="md-film" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='rgba(246,80,40,1)' title="Book" onPress={() => { this.addNewContent(CONTENT_TYPE.BOOK) }} textStyle={{ color: "white", fontSize: 15 }}
                        textContainerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}>
                        <Icon name="md-book" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='rgba(246,80,40,1)' title="Article" onPress={() => { this.addNewContent(CONTENT_TYPE.ARTICLE) }} textStyle={{ color: "white", fontSize: 15 }}
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
        backgroundColor: COLORS.TOOLBAR,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    navBarTitle: {
        flex: 1,
        fontSize: 18,
        color: COLORS.MUTE_ORANGE,
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
        backgroundColor: COLORS.BRIGHT_ORANGE
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
        tintColor: COLORS.BRIGHT_ORANGE,
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
        tintColor: COLORS.BRIGHT_ORANGE,
    },
    title: {
        flex: 8,
        color: COLORS.MUTE_ORANGE,
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

export default connect(mapStateToProps, { clearNewContentValues })(Episode)