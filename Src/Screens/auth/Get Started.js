import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ButtonLinear from '../../Components/Button Linear';
import Icons from '../../themes/icons';
import {Colors, Fonts} from '../../themes/Themes';

function GetStarted({props, navigation}) {
  return (
    <SafeAreaView style={style.container}>
      <View
        style={style.header}>
        <TouchableOpacity
          style={style.btn}
          onPress={() => {
            navigation.navigate('Home');
          }}
          activeOpacity={0.7}>
          <Text style={[{...style.text2, color: '#CCCBC8'}]}>Skip</Text>
        </TouchableOpacity>
      </View>
      <View style={style.containerBody}>
        <Text style={style.text}>Welcome to Celebfarm</Text>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
          }}
          onPress={() => {
            navigation.navigate('Location');
          }}
          activeOpacity={0.7}>
          <Text style={style.text2}>
            Before brand deals begin, tell us about you, your content and let’s
            connect your social media handles.
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: normalize(3),
          width: '100%',
        }}>
        <ButtonLinear
          width={'91%'}
          height={normalize(40)}
          alignSelf={'center'}
          backgroundColor={Colors.btnColor}
          title={'Get Started'}
          textColor={Colors.black}
          fontFamily={Fonts.Inter_SemiBold}
          titlesingle={true}
          borderRadius={normalize(25)}
          btnBottom={normalize(25)}
          onPress={() => {
            navigation.navigate('Location');
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    flex: 1,
  },
  header:{
    flexDirection: 'row',
    padding: normalize(0),
    justifyContent: 'flex-end',
    paddingVertical: normalize(12),
    backgroundColor: Colors.black,},
  containerBody: {
    paddingHorizontal: normalize(12),
    flex: 1,
  },
  btn:{
    flexDirection: 'row',
    alignItems: 'center',
    marginEnd: normalize(16),
    borderBottomColor: '#F1D271',
    borderBottomWidth: normalize(1),},
  text: {
    color: Colors.white,
    fontSize: normalize(40),
    marginTop: normalize(0),
    alignSelf: 'flex-start',
    fontFamily: Fonts.Inter_Bold,
  },
  text2: {
    color: Colors.white,
    fontSize: normalize(12),
    marginTop: normalize(7),
    opacity: 0.9,
    alignSelf: 'flex-start',
    fontFamily: Fonts.Inter_Medium,
  },
});
export default GetStarted;
