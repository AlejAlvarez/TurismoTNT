import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import Colors from '@styles/colors';
import Svg, { Path } from 'react-native-svg';

export default function MessageBubble({mine, texto}) {
    return (
      <View style={[styles.message, mine? styles.mine : styles.not_mine]}>
        <View style={[styles.cloud, {backgroundColor: mine? Colors.BUBBLEWHITE : Colors.BUBBLEBLUE}]}>
              <Text
                style={[
                  styles.text,
                  {
                    color: mine ? 'black' : 'white'
                  }
                ]}>
                {texto}
              </Text>
          <View
            style={[
              styles.arrow_container,
              mine ? styles.arrow_right_container : styles.arrow_left_container
            ]}
          >
            <Svg
              style={mine ? styles.arrow_right : styles.arrow_left}
              width={30}
              height={40}
              viewBox="32.484 17.5 15.515 17.5"
              enable-background="new 32.485 17.5 15.515 17.5"
            >
              <Path
                  d={ mine 
                      ? 
                      "M48,35c-7-4-6-8.75-6-17.5C28,17.5,29,35,48,35z"
                      :
                      "M38.484,17.5c0,8.75,1,13.5-6,17.5C51.484,35,52.484,17.5,38.484,17.5z"
                  }
                  fill={mine ? Colors.BUBBLEWHITE : Colors.BUBBLEBLUE}
                  x="0"
                  y="0"
              />
            </Svg>
          </View>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  message: {
    flexDirection: 'row',
    marginTop: 7,
    marginBottom: 14
  },
  not_mine: {
    marginLeft: 20,
  },
  mine: {
    alignSelf: 'flex-end',
    marginRight: 20
  },
  cloud: {
    maxWidth: 540,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20
  },
  text: {
    paddingTop: 3,
    fontSize: 17,
    lineHeight: 22
  },
  arrow_container: {
    position:'absolute',
    top: 0,
    left:0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    flex: 1
  },
  arrow_left_container: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
  },
  arrow_right_container: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  arrow_left: {
    left: -3
  },
  arrow_right: {
    right: -3
  }
})