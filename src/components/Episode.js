import React, { Component } from 'react';
import {
    StyleSheet, Text, View,
    Image, TouchableNativeFeedback,
    SectionList, Animated, Platform,
    Dimensions, StatusBar, LayoutAnimation, Easing,
    Linking, TouchableOpacity, ScrollView
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
        scrollY: new Animated.Value(0),
        scrollPosY: 0,
        titleViewHeight: 0,
        isActionButtonVisible: false,
        fadeAnim: new Animated.Value(0),
        fadeBackground: new Animated.Value(0),
        scrollEnabled: false
    }

    sectionsData = []

    _listViewOffset = win.height * 0.5
    scrollY = new Animated.Value(0)

    componentWillMount() {

        console.log("Screen height", win.height)

        episode = this.props.selectedEpisode;
        eid = "-LgyE_4sNP4WMb2rufDL"

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

                        source={{ uri: episode.cover_image }}
                    >
                    </Animated.Image>
                </View>

                {this.state.titleViewHeight > 0
                    ? <Animated.View style={{ zIndex: 2, marginTop: -(this.state.titleViewHeight), opacity: this.state.fadeBackground }}>
                        <Transparency size={this.state.titleViewHeight} />
                    </Animated.View>
                    : null}

                <Animated.View onLayout={(event) => { if (this.state.titleViewHeight > 0) return; this.setState({ titleViewHeight: event.nativeEvent.layout.height }); console.log("Hight recorded") }} style={{
                    marginTop: 0,
                    transform: [{
                        translateY: this.state.fadeAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, -this.state.titleViewHeight]  // 0 : 150, 0.5 : 75, 1 : 0
                        }),
                    }],
                    paddingBottom: 50,
                    zIndex: 2,
                    marginBottom: - this.state.titleViewHeight
                }}>
                    <Animated.Text style={[styles.title, { marginHorizontal: 40, marginVertical: 30, textAlign: 'center' }]}>
                        {episode.title}
                    </Animated.Text>
                    {this._renderAtts()}
                </Animated.View>
                {this._renderSeriesEpisodes()}
                <Text style={{ color: COLORS.MUTE_ORANGE, marginBottom: 5, marginHorizontal: 10 }}>Description</Text>
                <Text style={[styles.description]}>
                    {episode.description}
                </Text>
                {this._renderTags()}
                <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: COLORS.BRIGHT_ORANGE, marginVertical: 10 }} />
                <Text style={[styles.title, { fontWeight: 'normal', marginBottom: 10, fontSize: 25, marginHorizontal: 10 }]}>
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

    _onScroll = Animated.event(
        [{
            nativeEvent: { contentOffset: { y: this.state.scrollY } }
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
                this.setState({ scrollPosY: currentOffset })
                console.log("In scroll method", currentOffset)
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

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        console.log("Updated")
        if (this.state.titleViewHeight > 0)
            var interval = setTimeout(() => {
                Animated.parallel([
                    Animated.timing(this.state.fadeAnim, {
                        toValue: 1,
                        easing: Easing.out(Easing.back()),
                        duration: 700,
                        useNativeDriver: true
                    }),
                    Animated.timing(this.state.fadeBackground, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true
                    }),
                ]).start((result) => {
                    if (this.state.scrollEnabled == false)
                        this.setState({ scrollEnabled: true })
                    clearTimeout(interval)
                });
            }, 500)
    }

    _renderAtts() {

        millisToReadable = (millis) => {
            sec = millis / 1000
            hour = Math.floor(sec / 3600);
            min = Math.floor(((sec - (hour * 3600)) / 60))
            sec = sec - (hour * 3600) - (min * 60)

            return hour + ":" + (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec)
        }

        return (
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Image style={styles.icon} source={require('../images/hot.png')} />
                    <Text style={{ color: COLORS.MUTE_ORANGE, marginHorizontal: 10, fontSize: 15 }}>
                        {episode.category}
                    </Text>
                </View>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Image style={styles.icon} source={require('../images/clock.png')} />
                    <Text style={{ color: COLORS.MUTE_ORANGE, marginHorizontal: 10, fontSize: 15 }}>
                        {millisToReadable(episode.duration)}
                    </Text>
                </View>
                {episode.gold_star
                    ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Image style={[styles.icon, { tintColor: COLORS.GOLD }]} source={require('../images/star.png')} />
                        <Text style={{ color: COLORS.MUTE_ORANGE, marginHorizontal: 10, fontSize: 15 }}>
                            Gold Star
                </Text>
                    </View>
                    : null}
            </View>
        )
    }

    _renderSeriesEpisodes() {
        if (episode.part_of_series == null)
            return null

        var currentEpisode = episode.series_episodes.indexOf(eid)
        var mappedItems = episode.series_episodes.map((episode, i) => {

            var romanNumber = ""
            for (let index = 0; index < i + 1; index++) {
                romanNumber += "I"
            }

            return i == currentEpisode
                ? <View key={i} style={{ flex: 1, alignItems: "center" }}>
                    <Text style={{ color: "white", textAlign: 'center', fontSize: 22, borderRadius: 40, backgroundColor: COLORS.MUTE_ORANGE, width: 40, height: 40, padding: 5 }}>{romanNumber}</Text>
                </View>
                : <View key={i} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ color: COLORS.MUTE_ORANGE, fontSize: 22 }}>{romanNumber}</Text>
                </View>
        })

        return (
            <View style={{ flexDirection: "row", flex: 1, marginVertical: 5 }}>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ color: COLORS.MUTE_ORANGE }}> EP.</Text>
                </View>
                <View style={{ flexDirection: "row", flex: 9, justifyContent: 'space-between' }}>
                    {mappedItems}
                </View>
            </View>
        )
    }

    _renderTags() {

        var topRated = []

        for (var tag in episode.tags) {
            console.log("Tag", tag)

            topRated.push(
                <View key={tag} style={{ backgroundColor: COLORS.MUTE_ORANGE, borderRadius: 15, padding: 5, marginHorizontal: 5 }}>
                    <Text style={{ color: "white" }}> {episode.tags[tag].title}</Text>
                </View>
            )
        }

        return (
            <View style={{ marginVertical: 5, marginHorizontal: 5 }}>
                <Text style={{ color: COLORS.MUTE_ORANGE, marginBottom: 5, marginLeft: 5 }}>Tags</Text>
                <ScrollView horizontal={true} overScrollMode="never" showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexDirection: "row", justifyContent: 'flex-start' }}>
                    {topRated}
                </ScrollView>
            </View>
        )
    }

    _renderNavigationBar(headerFade) {
        return (
            // The hacky check for the scrollPossition was to account for a weird bug that would redraw a
            // fully visible nav bar when updatin the state 
            <Animated.View style={[styles.navBar, { opacity: this.state.scrollPosY > 0 ? headerFade : 0 }]}>
                <Animated.Text style={[styles.navBarTitle, { opacity: this.state.scrollPosY > 0 ? headerFade : 0 }]} numberOfLines={1}>
                    {episode.number} - {episode.title}
                </Animated.Text>
            </Animated.View>)
    }

    _renderNavArrow() {
        return (
            <View style={{ flexDirection: "row", flex: 1, width: win.width, position: "absolute", top: 0, height: 50, alignItems: "center" }}>
                <TouchableNativeFeedback
                    onPress={() => { this.props.navigation.goBack() }}>
                    <Image style={styles.backButtonImage} source={require('../images/arrow_back.png')} />
                </TouchableNativeFeedback>
                <View style={{ flex: 1 }} />
                <TouchableNativeFeedback
                    onPress={() => { Linking.openURL(episode.audio_url) }}>
                    <Image style={styles.backButtonImage} source={require('../images/speaker.png')} />
                </TouchableNativeFeedback>
            </View>
        )
    }

    _renderActionButton() {
        return this.state.isActionButtonVisible
            ? <ActionButton buttonColor="rgba(246,80,40,1)" bgColor="rgba(0,0,0,0.6)" offsetX={20} offsetY={20} spacing={15} fixNativeFeedbackRadius={true}>
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
            : null
    }

    render() {

        headerFade = this.state.scrollY.interpolate({
            inputRange: [0, win.height * 0.55, (win.height * 0.55) + 79, (win.height * 0.55) + 80],
            outputRange: [0, 0.01, 0.9, 1],
            extrapolate: 'clamp'
        });

        imageTranslate = this.state.scrollY.interpolate({
            inputRange: [60, 370],
            outputRange: [1, 1.35],
            extrapolate: 'clamp',
        });

        return (
            <View style={{ flex: 1 }}>
                <AnimatedSectionList
                    scrollEnabled={this.state.scrollEnabled}
                    onScroll={this._onScroll}
                    scrollEventThrottle={1} // target 120fps
                    style={{ backgroundColor: COLORS.BACKGROUND }}
                    ListHeaderComponent={this.renderListHeader(imageTranslate)}
                    renderSectionHeader={({ section }) => this.renderSectionHeader(section)}
                    keyExtractor={(item) => item.title}
                    sections={this.sectionsData}>
                </AnimatedSectionList>
                {this._renderNavigationBar(headerFade)}
                {this._renderNavArrow()}
                {this._renderActionButton()}
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
        marginHorizontal: 5,
    },
    description: {
        flex: 2,
        color: 'white',
        marginHorizontal: 10,
    },
    icon: {
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