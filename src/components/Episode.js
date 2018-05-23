import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View,
    ActivityIndicator, ScrollView, TouchableOpacity,
    Image, Modal, TouchableNativeFeedback,
    Linking, Dimensions, Animated, Easing
} from 'react-native';
import Transparency from './common/Transparency'
import Constants from './common/Constants'
import { connect } from 'react-redux';
import { selectEpisode, toggleNavbarFade } from '../actions'

class Episode extends Component {

    state = {
        animButtonPossition: new Animated.Value(0),
        animComplete: false,
        scrollPoss: 0,
    }

    componentWillMount() {

        episode = this.props.selectedEpisode;

    }


    renderArticles() {
        if (episode.show_notes && episode.show_notes.articles) {
            return (
                <View>
                    <Text style={{ color: Constants.COLOR.MUTE_ORANGE, fontSize: 14, marginHorizontal: 10 }}>
                        ARTICLES
                    </Text>
                    <View>
                        {
                            episode.show_notes.articles.map((article, i) => {
                                return (
                                    <TouchableOpacity key={i} style={{ flexDirection: 'row', flex: 1, marginHorizontal: 10, marginVertical: 5 }} onPress={() => { Linking.openURL(article.url) }}>
                                        <View style={{ flex: 1, flexDirection: 'column' }}>
                                            <Image style={[styles.icon, { marginTop: 0 }]} source={require('../images/article.png')} />
                                        </View>
                                        <View style={{ flex: 7 }}>
                                            <Text style={{ fontSize: 20, color: 'white' }}>
                                                {article.title}
                                            </Text>
                                            <Text style={{ alignSelf: 'flex-start', fontSize: 10, color: 'white' }}>
                                                by {article.source}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })
                        }
                    </View>
                </View>
            )
        }
    }

    renderBooks() {
        if (episode.show_notes && episode.show_notes.books) {
            return (
                <View style={{ marginTop: 10 }}>
                    <Text style={{ color: Constants.COLOR.MUTE_ORANGE, fontSize: 14, marginHorizontal: 10 }}>
                        BOOKS
                    </Text>
                    <View>
                        {
                            episode.show_notes.books.map((book, i) => {
                                return (
                                    <TouchableOpacity key={i} style={{ flexDirection: 'row', flex: 1, marginHorizontal: 10, marginVertical: 5 }} onPress={() => { Linking.openURL(book.amazon_link) }}>
                                        <View style={{ flex: 2, marginRight: 10 }}>
                                            <Image resizeMode={'contain'} style={{ height: 130 }} source={{ uri: book.cover }} />
                                        </View>
                                        <View style={{ flex: 7 }}>
                                            <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>
                                                {book.title}
                                            </Text>
                                            <Text style={{ alignSelf: 'flex-start', fontSize: 12, color: 'white' }}>
                                                by {book.author}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })
                        }
                    </View>
                </View>
            )
        }
    }

    renderMovies() {
        if (episode.show_notes && episode.show_notes.movies) {
            return (
                <View style={{ marginTop: 10 }}>
                    <Text style={{ color: Constants.COLOR.MUTE_ORANGE, fontSize: 14, marginHorizontal: 10 }}>
                        MOVIES & DOCS
                    </Text>
                    <View>
                        {
                            episode.show_notes.movies.map((movie, i) => {
                                return (
                                    <TouchableOpacity key={i} style={{ flexDirection: 'row', flex: 1, marginHorizontal: 10, marginVertical: 5 }}
                                        onPress={() => { Linking.openURL(`https://www.themoviedb.org/movie/${movie.id}`) }}>
                                        <View style={{ flex: 2, marginRight: 10 }}>
                                            <Image resizeMode={'contain'} style={{ height: 130 }} source={{ uri: movie.poster }} />
                                        </View>
                                        <View style={{ flex: 7 }}>
                                            <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>
                                                {movie.title}
                                            </Text>
                                            <Text style={{ alignSelf: 'flex-start', fontSize: 13, color: 'white' }}>
                                                Directed by {movie.director}
                                            </Text>
                                            <Text style={{ alignSelf: 'flex-start', fontSize: 12, color: 'white' }}>
                                                {movie.release_date}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })
                        }
                    </View>
                </View>
            )
        }
    }

    renderVideos() {
        if (episode.show_notes && episode.show_notes.videos) {
            return (
                <View style={{ marginTop: 10 }}>
                    <Text style={{ color: Constants.COLOR.MUTE_ORANGE, fontSize: 14, marginHorizontal: 10 }}>
                        VIDEOS
                    </Text>
                    <View>
                        {
                            episode.show_notes.videos.map((video, i) => {
                                return (
                                    <TouchableOpacity key={i} style={{ flexDirection: 'row', flex: 1, marginHorizontal: 10, marginVertical: 5 }}
                                        onPress={() => { Linking.openURL(video.url) }}>
                                        <View style={{ flex: 4, marginRight: 10, alignItems: 'center', justifyContent: 'center' }}>
                                            <Image style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
                                                source={{ uri: video.thumb_nail }} resizeMode={'contain'} />
                                            <View style={{ opacity: 1 }}>
                                                <Image style={{ height: 40, width: 40 }}
                                                    source={require('../images/play_circle.png')} />
                                            </View>
                                        </View>
                                        <View style={{ flex: 6, height: 100 }}>
                                            <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>
                                                {video.title}
                                            </Text>
                                            <Text style={{ alignSelf: 'flex-start', fontSize: 13, color: 'white' }}>
                                                {video.author}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })
                        }
                    </View>
                </View>
            )
        }
    }

    render() {

        const { goBack } = this.props.navigation;

        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ backgroundColor: Constants.COLOR.BACKGROUND }}
                    onScroll={(event) => {
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

                        console.log(direction);

                        this.offset = currentOffset;
                    }} onScrollEndDrag={(event) => {
                        this.setState({
                            scrollPoss: event.nativeEvent.contentOffset.y
                        })
                    }}>
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
                    {this.renderArticles()}
                    {this.renderBooks()}
                    {this.renderMovies()}
                    {this.renderVideos()}
                    {/* <View style={{ height: 1000 }} /> */}

                </ScrollView>
                <Animated.View style={[styles.addContent, {
                    transform: [{
                        translateY: this.state.animButtonPossition.interpolate({
                            inputRange: [0, 1],
                            outputRange: [250, 0]
                        })
                    }]
                }]}>
                    <TouchableNativeFeedback
                        onPress={() => {
                            console.log('Start anim')

                        }}>
                        <View style={[ { flex: 1, alignItems: 'center', justifyContent: 'center' } ]}>
                            <Image style={styles.addContentImage} source={require('../images/add_white.png')} />
                        </View>
                    </TouchableNativeFeedback>
                </Animated.View>
                {/* Persistent NavBar components */}
                <View style={[styles.navBar, { opacity: this.props.fade, }]}>
                    <Text style={styles.navBarTitle} numberOfLines={1}>
                        {this.props.selectedEpisode.number} - {this.props.selectedEpisode.title}
                    </Text>
                </View>
                <TouchableNativeFeedback style={styles.backButton}
                    onPress={() => { goBack() }}>
                    <Image style={styles.backButtonImage} source={require('../images/arrow_back.png')} />
                </TouchableNativeFeedback>
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
    }
});

const mapStateToProps = ({ data }) => {

    const { selectedEpisode, fade } = data;

    return {
        selectedEpisode, fade
    };
};

export default connect(mapStateToProps, { toggleNavbarFade })(Episode)