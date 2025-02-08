import React, {useState} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Images from '../../themes/Images';
import {Colors} from '../../themes/Themes';
import normalize from '../../utils/helpers/dimen';

function SocialLogin(props) {
  const [isSelect, setSelect] = useState('');
  return (
    <SafeAreaView style={style.container}>
      <View style={style.containerBody}>
        <View style={isSelect == 's1' ? style.header : null}>
          <View
            style={
              isSelect == 's2'
                ? style.header
                : isSelect == 's3'
                ? style.header
                : null
            }></View>
        </View>
        <Text style={style.text}>Paid collaboration</Text>
        <View
          style={{
            flexDirection: 'row',
            width: Dimensions.get('window').width,
            justifyContent: 'space-between',
            height: Dimensions.get('window').height,
          }}>
          <Image
            source={Images.PinkStairs}
            style={style.imageLeft}
            resizeMode="contain"></Image>
          <Image
            source={Images.TinyCharacter}
            style={style.imageMid}
            resizeMode="contain"></Image>
          <Image
            source={Images.introImage}
            style={style.imageLast}
            resizeMode="contain"></Image>
        </View>
      </View>
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    flex: 1,
  },
  containerBody: {
    padding: normalize(12),
  },
  header: {
    height: 4,
    width: Dimensions.get('screen').width - 20,
    borderRadius: 7,
    backgroundColor: Colors.strok,
    alignSelf: 'center',
    marginTop: normalize(25),
  },
  text: {
    width: normalize(Dimensions.get('screen').width - 175),
    color: Colors.white,
    fontSize: normalize(34),
    marginTop: normalize(12),
    // marginLeft:normalize(25),
  },
  imageLeft: {
    height: 180,
    width: 175,
    marginTop: normalize(124),
  },
  imageMid: {
    height: 75,
    width: 79,
    marginTop: normalize(64),
    marginStart: normalize(-124),
  },
  imageLast: {
    height: 250,
    width: 195,
  },
});
export default SocialLogin;
