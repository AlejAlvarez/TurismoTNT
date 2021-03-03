import React from 'react';
import { View, StyleSheet } from 'react-native';
import {Text} from 'react-native-elements';
import Colors from '@styles/colors';

export default function RenderMessage(props) {
    return (
      <View>
        {
          props.messages.map((mensaje, i) => {
            return (
              <View key={mensaje.id}>
                <View>
                  <Text>{ mensaje.usuario.nombre } { mensaje.usuario.apellido }</Text>
                  <Text>mensaje.timestamp</Text>
                </View>
                <View>
                  { mensaje.texto }
                </View>
              </View>
            );
          })
        }
        <div
          style={{ "height": 0 }}
          id="lastMessage"
        >
        </div>
      </View>
    );
};