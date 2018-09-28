import React from 'react';
import { View, Image, Text } from 'react-native';

export class MovieListItem extends React.PureComponent {

    render() {

        return (
            <View style={{ flexDirection: 'row', flex: 1, marginHorizontal: 10, marginVertical: 5 }}
                onPress={() => { Linking.openURL(`https://www.themoviedb.org/movie/${this.props.item.id}`) }}>
                <View style={{ flex: 2, marginRight: 10 }}>
                    <Image resizeMode={'contain'} style={{ height: 130 }} source={{ uri: this.props.item.poster }} />
                </View>
                <View style={{ flex: 7 }}>
                    <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>
                        {this.props.item.title}
                    </Text>
                    <Text style={{ alignSelf: 'flex-start', fontSize: 13, color: 'white' }}>
                        Directed by {this.props.item.director}
                    </Text>
                    <Text style={{ alignSelf: 'flex-start', fontSize: 12, color: 'white' }}>
                        {this.props.item.release_date}
                    </Text>
                </View>
            </View>
        );
    }
};