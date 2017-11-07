import React, { Component } from 'react';
import {
    View, TextInput, ScrollView,
    TouchableOpacity, Image, Text,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { searchChanged, doSerach } from '../actions'
import EpisodeListItem from './EpisodeListItem';

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

            return this.props.searchResults.map((element) => (
                <EpisodeListItem key={element.number} episode={element} />
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

});

const mapStateToProps = ({ search, data }) => {

    const { searchText, searchResults } = search;
    const { episodes } = data;

    return {
        searchText, searchResults, episodes
    };
};

export default connect(mapStateToProps, { searchChanged, doSerach })(Search)