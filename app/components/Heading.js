import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';

export default function Heading({children, style, ...props}) {
    return(
        <Text {...props} style={[style, styles.text]}>
            {children}
        </Text>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 32,
        color: 'black',
    }
})