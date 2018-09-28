import React from 'react';
import { View, Image, Text } from 'react-native';

export class VideoListItem extends React.PureComponent {

    render() {

        return (
            <View style={{ flexDirection: 'row', flex: 1, marginHorizontal: 10, marginVertical: 5 }}
                onPress={() => { Linking.openURL(this.props.item.url) }}>
                <View style={{ flex: 4, marginRight: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <Image style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
                        source={{ uri: this.props.item.thumb_nail }} resizeMode={'contain'} />
                    <View style={{ opacity: 1 }}>
                        <Image style={{ height: 40, width: 40 }}
                            source={require('../../images/play_circle.png')} />
                    </View>
                </View>
                <View style={{ flex: 6, height: 100 }}>
                    <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>
                        {this.props.item.title}
                    </Text>
                    <Text style={{ alignSelf: 'flex-start', fontSize: 13, color: 'white' }}>
                        {this.props.item.author}
                    </Text>
                </View>
            </View>
        );
    }
};

