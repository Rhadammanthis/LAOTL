import React from 'react';
import { View, Image, Text } from 'react-native';

export class BookListItem extends React.PureComponent {

    render() {

        return (
            <View style={{ flexDirection: 'row', flex: 1, marginHorizontal: 10, marginVertical: 5 }} onPress={() => { Linking.openURL(this.props.item.amazon_link) }}>
                <View style={{ flex: 2, marginRight: 10 }}>
                    <Image resizeMode={'contain'} style={{ height: 130 }} source={{ uri: this.props.item.cover }} />
                </View>
                <View style={{ flex: 7 }}>
                    <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>
                        {this.props.item.title}
                    </Text>
                    <Text style={{ alignSelf: 'flex-start', fontSize: 12, color: 'white' }}>
                        by {this.props.item.author}
                    </Text>
                </View>
            </View>
        );
    }
};

