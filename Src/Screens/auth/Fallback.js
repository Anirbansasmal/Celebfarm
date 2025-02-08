import React from 'react';
import {Dimensions, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Colors} from '../../themes/Themes';

export default function Fallback() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.black,
        padding: 12,
        alignItems: 'center',
      }}>
      <SkeletonPlaceholder
        backgroundColor={Colors.bcolor}
        highlightColor={Colors.black}>
        <SkeletonPlaceholder.Item
          flexDirection="column"
          marginBottom={10}
          backgroundColor={Colors.bgcolor}>
          <SkeletonPlaceholder.Item
            width={Dimensions.get('window').width - 16}
            height={399}
            borderRadius={10}
            backgroundColor={Colors.bgcolor}
            highlightColor={Colors.bgcolor}
            marginBottom={10}
            style={{backgroundColor: Colors.black}}
          />
          <SkeletonPlaceholder.Item
            width={Dimensions.get('window').width - 16}
            height={99}
            borderRadius={10}
            backgroundColor={Colors.bgcolor}
            highlightColor={Colors.bgcolor}
            marginBottom={10}
            style={{backgroundColor: Colors.black}}
          />
          <SkeletonPlaceholder.Item
            width={Dimensions.get('window').width - 16}
            height={199}
            borderRadius={10}
            backgroundColor={Colors.bgcolor}
            highlightColor={Colors.bgcolor}
            marginBottom={10}
            style={{backgroundColor: Colors.black}}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
}
