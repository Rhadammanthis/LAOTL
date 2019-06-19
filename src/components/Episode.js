import React, { Component } from 'react';
import {
    StyleSheet, Text, View,
    Image, TouchableNativeFeedback,
    SectionList, Animated, Platform,
    Dimensions, StatusBar, LayoutAnimation, Easing
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import Transparency from './common/Transparency'
import { COLORS, CONTENT_TYPE } from './common/Constants'
import { connect } from 'react-redux'
import { ArticleListItem, BookListItem, MovieListItem, VideoListItem } from './pure'
import { clearNewContentValues } from '../actions'

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);
const win = Dimensions.get('window');

class Episode extends Component {

    state = {
        scrollPoss: 0,
        sectionsData: [],
        scrollY: new Animated.Value(0),
        scrollPosY: 0,
        titleViewHeight: 0,
        titleVisible: true,
        isActionButtonVisible: false,
        fadeAnim:new Animated.Value(0),
    }

    sectionsData = []

    _listViewOffset = win.height * 0.5
    scrollY = new Animated.Value(0)

    componentWillMount() {

        episode = this.props.selectedEpisode;

        // console.log('Episode Data', episode)

        var episodeNotes;
        for (var i = 0; i < episode.notes.length; i++)
            episodeNotes += episode.notes[i].length

        for (var category in episode.notes) {
            console.log("Category", category)
            var sectionContent = []
            for (var item in episode.notes[category]) {
                console.log("Item", item);
                var mappedItem = episode.notes[category][item]
                mappedItem.nid = item
                sectionContent.push(mappedItem)
            }
            this.sectionsData.push({
                key: category,
                data: sectionContent,
                renderItem: ({ item, section }) => this.selectItemRenderer(item, section)
            })
        }

    }

    renderListHeader = (imageTranslate) => {

        millisToReadable = (millis) => {
            sec = millis / 1000
            hour = Math.floor(sec / 3600);
            min = Math.floor(((sec - (hour * 3600)) / 60))
            sec = sec - (hour * 3600) - (min * 60)

            return hour + ":" + (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec)
        }

        // if(this.state.titleViewHeight > 0){
        //     Animated.timing(this.state.fadeAnim, {
        //         toValue: 1,
        //         easing: Easing.back(),
        //         duration: 500,
        //       }).start();
        // }

        return (
            <View style={{ flex: 1 }}>

                <View style={{ width: win.width, height: (win.height - StatusBar.currentHeight), overflow: "hidden", zIndex: 1, flex: 1 }}>
                    <Animated.Image style={{
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20,
                        alignSelf: 'stretch',
                        width: win.width,
                        height: (win.height - StatusBar.currentHeight),
                        transform: [{ scale: imageTranslate }]
                    }}

                        source={{ uri: this.props.selectedEpisode.cover_image }}
                    >
                    </Animated.Image>
                </View>

                <Animated.View onLayout={(event) => this.setState({ titleViewHeight: event.nativeEvent.layout.height })} style={{
                    marginTop: - (this.state.titleViewHeight)
                    , paddingBottom: 30, zIndex: 2
                }}>
                    <View style={{ marginBottom: -(this.state.titleViewHeight) }}>
                        <Transparency size={this.state.titleViewHeight} />
                    </View>
                    <Animated.Text style={[styles.title, { marginHorizontal: 40, marginVertical: 30, textAlign: 'center' }]}>
                        {this.props.selectedEpisode.title}
                    </Animated.Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Image style={styles.icon} source={require('../images/clock.png')} />
                            <Text style={{ color: COLORS.MUTE_ORANGE, marginHorizontal: 10, fontSize: 15 }}>
                                {millisToReadable(this.props.selectedEpisode.duration)}
                            </Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Image style={styles.icon} source={require('../images/clock.png')} />
                            <Text style={{ color: COLORS.MUTE_ORANGE, marginHorizontal: 10 }}>
                                {millisToReadable(this.props.selectedEpisode.duration)}
                            </Text>
                        </View>
                    </View>
                </Animated.View>

                <Text style={styles.description}>
                    {this.props.selectedEpisode.description}
                </Text>
                <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: COLORS.BRIGHT_ORANGE, marginVertical: 10 }} />
                <Text style={[styles.title, { fontWeight: 'normal', marginBottom: 10, fontSize: 25 }]}>
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

        Animated.timing(this.state.fadeAnim, {
            toValue: 1,
            easing: Easing.back(),
            duration: 500,
          }).start();

        // this.props.clearNewContentValues()

        // const { navigate } = this.props.navigation
        // navigate('AddNew', { contentType: type, firebaseId: this.props.navigation.state.params.firebaseId })
    }

    _onScroll = Animated.event(
        [{
            nativeEvent: { contentOffset: { y: this.scrollY } }
        }],
        {
            listener: (event) => {

                const CustomLayoutLinear = {
                    duration: 150,
                    create: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
                    update: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
                    delete: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity }
                }

                const currentOffset = event.nativeEvent.contentOffset.y
                const direction = (currentOffset > 0 && currentOffset > this._listViewOffset)
                    ? 'down'
                    : 'up'

                const isActionButtonVisible = direction === 'down'
                if (isActionButtonVisible !== this.state.isActionButtonVisible) {
                    LayoutAnimation.configureNext(CustomLayoutLinear)
                    this.setState({ isActionButtonVisible })
                }

            },
            useNativeDriver: true
        }
    )

    // shouldComponentUpdate(nextProps, nextState) {
    //     return this.state.isActionButtonVisible != nextState.isActionButtonVisible;
    // }

    render() {

        headerFade = this.scrollY.interpolate({
            inputRange: [0, 275, 354, 355],
            outputRange: [0, 0.01, 0.9, 1],
            extrapolate: 'clamp'
        });

        imageTranslate = this.scrollY.interpolate({
            inputRange: [100, 370],
            outputRange: [1, 1.35],
            extrapolate: 'clamp',
        });

        console.log("Header Fade", headerFade);

        return (
            <View style={{ flex: 1 }}>
                <AnimatedSectionList
                    onScroll={this._onScroll}
                    scrollEventThrottle={1} // target 120fps
                    style={{ backgroundColor: COLORS.BACKGROUND }}
                    ListHeaderComponent={this.renderListHeader(imageTranslate)}
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
                {this.state.isActionButtonVisible ? <ActionButton buttonColor="rgba(246,80,40,1)" bgColor="rgba(0,0,0,0.6)" offsetX={20} offsetY={20} spacing={15} fixNativeFeedbackRadius={true}>
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
                </ActionButton> : null}

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
    },
    icon: {
        marginTop: -5,
        height: 25,
        width: 25,
        tintColor: COLORS.BRIGHT_ORANGE,
    },
    title: {
        color: COLORS.MUTE_ORANGE,
        fontWeight: 'bold',
        fontSize: 45,
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