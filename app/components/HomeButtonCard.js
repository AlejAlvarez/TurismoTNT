import React from 'react';
import { Text, Icon, Card } from 'react-native-elements';
import Colors from '@styles/colors';

export default function HomeButtonCard(props){
    return(
        <Card containerStyle={{backgroundColor:Colors.SKYBLUE, width:150, height:150, alignItems:'center', justifyContent:'center'}}>
            <Icon name={props.icon} size={60} />
            <Text style={{ fontSize:16, alignItems: 'center' }}>{props.text}</Text>
        </Card>
    );
}
