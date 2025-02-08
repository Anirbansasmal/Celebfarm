import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import { Colors } from '../../themes/Themes';
import normalize from '../../utils/helpers/dimen';
import Button from '../../Components/Button';
import ButtonLinear from '../../Components/Button Linear';

function Signup({props}) {
  return (
    <SafeAreaView style={style.container}>
      <View style={style.containerBody}>
        <Text style={style.text}>We just sent you an SMS</Text>
        <Text style={style.text2}>
          Enter the security code we sent to ***********891
        </Text>
        <Text style={style.text3}>I didn’t receive a code</Text>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
          }}>
          <ButtonLinear
            width={'81%'}
            height={normalize(40)}
            alignSelf={'center'}
            backgroundColor={Colors.btnColor}
            title={'Submit'}
            textColor={Colors.black}
            titlesingle={true}
            borderRadius={normalize(25)}
            marginHorizontal={normalize(5)}
            btnBottom={0}
            onPress={() => {
              props.navigation.navigate('Otp');
            }}
          />
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
    flex: 1,
  },
  text: {
    color: Colors.white,
    fontSize: normalize(21),
    marginTop: normalize(12),
  },
  text2: {
    color: Colors.white,
    fontSize: normalize(12),
    marginTop: normalize(7),
    opacity: 0.7,
  },
  text3: {
    color: Colors.btnColor,
    fontSize: normalize(12),
    marginTop: normalize(22),
    opacity: 0.7,
    alignSelf: 'flex-end',
    borderBottomWidth: 2,
    borderBottomColor: Colors.btnColor,
  },
});
export default Signup;
