import React from 'react';
import { Header, Image } from 'react-native-elements';
import colors from '@styles/colors';

export default function TurAppHeader () {
    return (
    <Header 
        backgroundColor= {colors.WHITE}
        style={{height: 50}}
        centerComponent= {<Image
            source={require('@resources/images/TurApp-logo.png')}
            style={{ height:42, width:125 }}
            />}
    />
    );
}