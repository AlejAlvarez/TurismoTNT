import React from 'react';
import { Image } from 'react-native';

export default function TurAppTitleLogo () {
    return (
        <Image
            source={require('@resources/images/TurApp-logo.png')}
            style={{ height:42, width:125 }}
        />
        );
}