import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import { Colors } from '../../themes/Themes';
import normalize from '../../utils/helpers/dimen';
import Button from '../../Components/Button';

function WelcomeStarted(props) {
  return (
    <SafeAreaView style={style.container}>
      <View style={style.containerBody}>
        <Text style={style.text}>Add your email</Text>
        <Text style={style.text2}>
        We’ll send you a code - it helps us keep your account secure.
        </Text>
        <Text style={style.text3}>Email</Text>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
          }}>
          <Button
            width={'81%'}
            height={normalize(40)}
            alignSelf={'center'}
            backgroundColor={Colors.btnColor}
            title={'Next'}
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
    color: Colors.white,
    fontSize: normalize(12),
    marginTop: normalize(22),
    opacity: 0.7,
  },
});
export default WelcomeStarted;
