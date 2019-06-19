import React, { Component } from 'react';
import { View } from 'react-native';

const divisor = 1000;
const pi = 1 / (divisor);

const step = divisor / 5;

class Transparency extends Component {

    componentWillMount() {

    }

    renderRow() {

        const size = this.props.size;
        let collection = []

        collection.push(0);
        i = pi;
        while (i < 1) {
            collection.push(i);
            i += pi;
        }
        collection.push(1);

        var alpha = 0.15

        return (
            collection.map((x, i) => {  

                return(
                <View key={i} style={{
                    height: size / divisor,
                    backgroundColor: `rgba(23, 22, 18, ${x})`
                }} />)
            }
            )
        )
    }

    render() {
        const offset = Math.abs(this.props.size) - 5;

        return (
            <View style={{ height: this.size, }}>
                {this.renderRow()}
            </View>
        );
    }
};

export default Transparency;
