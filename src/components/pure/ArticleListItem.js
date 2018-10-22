import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import {COLORS} from '../common/Constants'

export class ArticleListItem extends React.PureComponent {

    render() {

        return (
            <View style={{ flexDirection: 'row', flex: 1, marginHorizontal: 10, marginVertical: 5 }} onPress={() => { Linking.openURL(this.props.item.url) }}>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <Image style={[styles.icon, { marginTop: 0 }]} source={require('../../images/article.png')} />
                </View>
                <View style={{ flex: 7 }}>
                    <Text style={{ fontSize: 20, color: 'white' }}>
                        {this.props.item.title}
                    </Text>
                    <Text style={{ alignSelf: 'flex-start', fontSize: 10, color: 'white' }}>
                        by {this.props.item.source}
                    </Text>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    icon: {
        marginTop: -5,
        height: 25,
        width: 25,
        tintColor: COLORS.BRIGHT_ORANGE,
    }
})

