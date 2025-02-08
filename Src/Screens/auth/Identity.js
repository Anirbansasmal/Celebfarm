import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Colors, Fonts} from '../../themes/Themes';
import normalize from '../../utils/helpers/dimen';
import Button from '../../Components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../Components/Header';
import Toast from '../../utils/helpers/Toast';
import ButtonLinear from '../../Components/Button Linear';
import {useDispatch, useSelector} from 'react-redux';
import { profilelocalRequest } from '../../redux/reducers/AuthReducer';
import LinearGradient from 'react-native-linear-gradient';
function Identity(props) {
  const [gender, setGender] = useState('');

  let status = '';
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);

  function identity() {
    console.log('45 ', AuthReducer);
    if (gender == '') {
      Toast('Please select your launage');
    } else {
      var obj = {
        country: AuthReducer?.profileLocalResponse?.country,
        city: AuthReducer?.profileLocalResponse?.city,
        launage: AuthReducer?.profileLocalResponse?.launage,
        identity:
          gender == 'm' ? 'Male' : gender == 'n' ? 'Non-binary' : 'Female',
        niche: AuthReducer?.profileLocalResponse?.niche,
        social: AuthReducer?.profileLocalResponse?.social,
      };
      dispatch(profilelocalRequest(obj));
      props.navigation.navigate('ContentNiche');
    }
  }
  useEffect(() => {}, []);
  return (
    <SafeAreaView style={style.container}>
      <Header
        picTitle={false}
        logo={false}
        back={true}
        backgroundColor={'#000'}
        title={'Get started'}
        heardetext={Colors.white}
        headerHeight={Platform.OS == 'ios' ? normalize(40) : normalize(51)}
        textfontSize={normalize(16)}
        fontFamily={Fonts.Inter_Bold}
        marginStart={normalize(43)}
        textColor={'#ffff'}
        {...props}
      />
      <View
        style={{
          backgroundColor: '#434540',
          width: '100%',
        }}
      >
        <LinearGradient
          colors={[ '#B7E2F2','#D8E480','#FC9973',]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{
            height: normalize(3),
            width: '64%',
          }}></LinearGradient>
          </View>
      <View
        style={{
          height: normalize(1),
          backgroundColor: '#434540',
        }}
      />
      <View style={style.containerBody}>
        <Text style={style.text}>Identity</Text>
        <Text style={style.text2}>
        Select how do you identify yourself.
        </Text>

        <Button
          width={'100%'}
          height={normalize(40)}
          alignSelf={'center'}
          backgroundColor={gender == 'm' ? Colors.white : '#000000'}
          borderColor={'#434540'}
          borderWidth={1}
          title={'Male'}
          textColor={gender == 'm' ? Colors.black : Colors.white}
          titlesingle={true}
          borderRadius={normalize(25)}
          marginHorizontal={normalize(5)}
          marginTop={25}
          onPress={() => {
            setGender('m');
          }}
        />
        <Button
          width={'100%'}
          height={normalize(40)}
          alignSelf={'center'}
          backgroundColor={gender == 'f' ? Colors.white : '#000000'}
          title={'Female'}
          borderColor={'#434540'}
          borderWidth={1}
          textColor={gender == 'f' ? Colors.black : Colors.white}
          titlesingle={true}
          borderRadius={normalize(25)}
          marginHorizontal={normalize(5)}
          marginTop={12}
          onPress={() => {
            setGender('f');
          }}
        />
        <Button
          width={'100%'}
          height={normalize(40)}
          alignSelf={'center'}
          backgroundColor={gender == 'n' ? Colors.white : '#000000'}
          title={'Non-binary'}
          borderColor={'#434540'}
          borderWidth={1}
          textColor={gender == 'n' ? Colors.black : Colors.white}
          titlesingle={true}
          borderRadius={normalize(25)}
          marginHorizontal={normalize(5)}
          marginTop={12}
          onPress={() => {
            setGender('n');
          }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 0,
          }}>
          <ButtonLinear
            width={'82%'}
            height={normalize(40)}
            alignSelf={'center'}
            backgroundColor={Colors.btnColor}
            title={'Next'}
            textColor={Colors.black}
            titlesingle={true}
            borderRadius={normalize(25)}
            marginHorizontal={normalize(5)}
            btnBottom={10}
            onPress={() => {
              identity();
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
    paddingHorizontal: normalize(12),
    flex: 1,
    alignItems: 'center',
  },
  text: {
    color: Colors.white,
    fontSize: normalize(21),
    marginTop: normalize(12),
    alignSelf: 'flex-start',
    fontFamily:Fonts.Inter_Bold,
  },
  text2: {
    color: Colors.white,
    fontSize: normalize(12),
    marginTop: normalize(7),
    opacity: 0.7,
    alignSelf: 'flex-start',
    fontFamily: Fonts.Inter_Medium,
  },
  text3: {
    color: Colors.white,
    fontSize: normalize(12),
    marginTop: normalize(22),
    opacity: 0.7,
    alignSelf: 'flex-start',
  },
});
export default Identity;
