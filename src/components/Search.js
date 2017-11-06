import React, { Component } from 'react';
import {
    View, TextInput, ScrollView,
    TouchableOpacity, Image, Text,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { searchChanged, doSerach } from '../actions'

class Search extends Component {

    componentWillMount() {

    }

    onSearchChange(text) {
        this.props.searchChanged(text);
    }

    onSubmitSearch() {
        this.props.doSerach(this.props.episodes, this.props.searchText)
        console.log(this.props.searchText)
    }

    renderSearchResults() {
        if (this.props.searchResults != null) {

            // console.log(this.props.searchResults.map(x => ( console.log(x.title) )))

            var sortCategoryResource = (category) => {
                switch (category) {
                    case 'Serial Killers':
                        return "SK";
                    case 'Conspiracy':
                        return "Con";
                    case 'Satanism and the Ocult':
                        return "SatO"
                    case 'Cults, Spirituality and Psychics':
                        return "CSP"
                    case 'Aliens':
                        return "A"
                    case 'Miscellaneous':
                        return "Misc"
                    case 'Horrors of Reality':
                        return "HoR"
                    case 'Monsters and Cryptoids':
                        return "MaC"
                    case 'Creepypasta':
                        return "Cree"
                    case 'Ghosts and Hauntings':
                        return "GaH"
                }
            }

            return this.props.searchResults.map((element) => (
                <TouchableOpacity key={element.number} style={{ height: 90 }}>
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 5, marginBottom: 5 }}>
                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                            <Text style={[styles.title, { fontSize: 20 }]}>{element.number}</Text>
                            <Text style={{ color: '#F6502C' }}>{sortCategoryResource(element.category)}</Text>
                        </View>
                        {/* <View style={{ width: 2, height: 80, backgroundColor: '#F6502C', marginHorizontal: 5, marginVertical: 5 }} /> */}
                        <View style={{ flex: 6 }}>
                            <Text style={styles.title}>{element.title}</Text>
                            <Text numberOfLines={3} style={styles.description}>
                                {element.description}
                            </Text>
                        </View>
                        <Image style={{ flex: 3, height: 100 }}
                            source={{ uri: element.image }} />
                    </View>
                </TouchableOpacity>
            ))
        }
        return
    }

    render() {

        return (
            <View style={{ backgroundColor: '#171612', flex: 1, paddingTop: 10 }}>
                <ScrollView style={{}}>
                    <TextInput onChangeText={this.onSearchChange.bind(this)} value={this.props.searchText}
                        onSubmitEditing={this.onSubmitSearch.bind(this)} style={{ fontSize: 17, height: 40, borderColor: '#F37752', borderWidth: 1, backgroundColor: 'white', borderRadius: 15 }} />
                    <View style={{ height: 1.2, backgroundColor: '#F37752', marginVertical: 10 }}/>
                    {this.renderSearchResults()}
                </ScrollView>
            </View>
        );

    }

}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ddd',
    },
    image: {
        width: 120,
        height: 120,
        alignSelf: 'center',
        marginBottom: 20,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#F37752',
    },
    description: {
        fontSize: 13,
        color: 'white',
    },
});

const mapStateToProps = ({ search, data }) => {

    const { searchText, searchResults } = search;
    const { episodes } = data;

    return {
        searchText, searchResults, episodes
    };
};

export default connect(mapStateToProps, { searchChanged, doSerach })(Search)