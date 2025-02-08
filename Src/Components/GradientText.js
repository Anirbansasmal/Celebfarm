import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import MaskedView from '@react-native-community/masked-view';

const GradientText = ({ text, colors }) => {
  const gradientId = 'gradientId';
  return (
    <View style={{ alignItems: 'center' }}>
      <MaskedView
        style={{ height: 30, width: 200 }}
        maskElement={
          <Svg height="100%" width="100%">
            <Defs>
              <LinearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                {colors.map((color, index) => (

console.log(color),
                  <Stop key={index} offset={`${(index * 100) / (colors.length - 1)}%`} stopColor={color} />
                ))}
              </LinearGradient>
            </Defs>
            <Rect x="0" y="0" width="100%" height="100%" fill={`url(#${gradientId})`} />
          </Svg>
        }
      >
        <Text style={{ fontSize: 24, color: 'transparent' }}>{text}</Text>
      </MaskedView>
    </View>
  );
};

export default GradientText;
