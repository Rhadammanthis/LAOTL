import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View,
    ActivityIndicator, Animated, ScrollView,
    TouchableOpacity, Image, Modal, TouchableNativeFeedback,
    Linking, TouchableWithoutFeedback
} from 'react-native';
import TimerMixin from 'react-timer-mixin';
import RNAudioStreamer from 'react-native-audio-streamer';
import Transparency from './common/Transparency'
import Constants from './common/Constants'
import { connect } from 'react-redux';
import { toggleNavbarFade, toggleAudioPlaying, rewindAudio, fastForwardAudio, updateCurrentTime } from '../actions'


class Episode extends Component {

    componentWillMount() {

        episode = this.props.selectedEpisode;

        // RNAudioStreamer.setUrl(episode.audio_file_url)

    }

    renderAudioPlayer() {

        return (
            <View style={{ marginBottom: 10 }}>
                <Text style={{ color: Constants.COLOR.MUTE_ORANGE, fontSize: 14, marginHorizontal: 10 }}>
                    PLAY EPISODE
                    </Text>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity style={[styles.audioButton, styles.audioButtonRewind]}
                        onPress={() => {

                            this.props.rewindAudio()

                        }}>
                        <Image source={require('../images/audioPlayer/ic_fast_rewind.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.audioButton, styles.audioButtonPlay]}
                        onPress={() => {

                            this.props.toggleAudioPlaying(episode, this.props.audioPlaying, this.props.currentEpisodePlaying)

                        }}>
                        <Image source={require('../images/audioPlayer/ic_play_arrow_3x.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.audioButton, styles.audioButtonForward]}
                        onPress={() => {

                            this.props.fastForwardAudio()

                        }}>
                        <Image source={require('../images/audioPlayer/ic_fast_forward.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        )
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

    playEpisode() {

        RNAudioStreamer.setUrl(episode.audio_file_url)
        RNAudioStreamer.play()
        // RNAudioStreamer.pause()
        // RNAudioStreamer.seekToTime(16) //seconds
        // RNAudioStreamer.duration((err, duration) => {
        //     if (!err) console.log(duration) //seconds
        // })
        // RNAudioStreamer.currentTime((err, currentTime) => {
        //     if (!err) console.log(currentTime) //seconds
        // })

        // Player Status:
        // - PLAYING
        // - PAUSED
        // - STOPPED
        // - FINISHED
        // - BUFFERING
        // - ERROR
        RNAudioStreamer.status((err, status) => {
            if (!err) console.log(status)
        })

    }

    render() {

        const { goBack } = this.props.navigation;

        if(this.props.audioPlaying){
            console.log('NOW PLAYING')
            TimerMixin.setInterval(this.props.updateCurrentTime(), 1000)
        }

        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ backgroundColor: Constants.COLOR.BACKGROUND }}
                    onScroll={(event) => {
                        this.props.toggleNavbarFade(event.nativeEvent.contentOffset.y)
                    }}>
                    <Image style={{ flex: 1, flexDirection: 'row', height: 250 }} source={{ uri: this.props.selectedEpisode.image }} />
                    <View style={{ flex: 1, flexDirection: 'row', marginRight: 15, marginTop: 35 }}>
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
                    {/* {this.renderAudioPlayer()} */}
                    {/* <View style={{ height: 1000 }} /> */}
                    <View style={{ marginTop: 80 }} />
                </ScrollView>
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
                {/* Persistent NavBar components */}
                <View style={{
                    height: 70, flex: 1, backgroundColor: Constants.COLOR.BRIGHT_ORANGE, position: 'absolute',
                    bottom: 0, top: '90%', left: 0, right: 0, paddingBottom: 5, flexDirection: 'row'
                }}>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', height: 70, marginLeft: 10 }}>
                        <TouchableOpacity style={[styles.audioButton, { width: 50, height: 50 }]}
                            onPress={() => {

                                // console.log('sjould play')
                                this.props.toggleAudioPlaying(episode, this.props.audioPlaying, this.props.currentEpisodePlaying)


                            }}>
                            <Image source={require('../images/audioPlayer/ic_play_arrow_3x.png')} style={{ width: 50, height: 50 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: 'center', flex: 1, marginLeft: 10 }}>
                        <Text style={{ color: 'white', fontSize: 15 }}>
                            {this.props.currentTime}
                        </Text>
                    </View>
                </View>
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
    backButton: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
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
    audioPlayer: {
        flex: 1,
        flexDirection: 'column',
        minHeight: 400,
        minWidth: 400,
    },
    audioButton: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#efefef',
    },
    audioButtonPlay: {
        width: 75,
        height: 75,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
    },
    audioButtonRewind: {
        width: 50,
        height: 50,
        marginTop: 25,
    },
    audioButtonForward: {
        width: 50,
        height: 50,
        marginTop: 25,
    }
});

const mapStateToProps = ({ data, audioPlayer }) => {

    const { selectedEpisode, fade } = data;
    const { audioPlaying, currentEpisodePlaying, currentTime } = audioPlayer;

    return {
        selectedEpisode, fade, audioPlaying, currentEpisodePlaying, currentTime
    };
};

export default connect(mapStateToProps, { toggleNavbarFade, toggleAudioPlaying, rewindAudio, fastForwardAudio, updateCurrentTime })(Episode)