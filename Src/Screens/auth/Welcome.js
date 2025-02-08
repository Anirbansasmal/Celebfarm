import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../../Components/Button';
import Images from '../../themes/Images';
import {Colors, Fonts} from '../../themes/Themes';
import normalize from '../../utils/helpers/dimen';
import MyStatusBar from '../../utils/MyStatusBar';
import ButtonLinear from '../../Components/Button Linear';
import LinearTextGradient from 'react-native-linear-gradient-text';
// import GradientText from '../../Components/GradientText';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';

function Introduction(props, navigation) {
  const [isSelect, setSelect] = useState('s1');
  return (
    console.log(isSelect),
    (
      <>
        <SafeAreaView style={style.container}>
          <MyStatusBar backgroundColor={'#000'} barStyle={'light-content'} />
          {/* <ScrollView> */}
          <ImageBackground
            source={Images.Frame}
            style={style.imageLeft}
            resizeMode="cover"
          />
          <View style={style.containerBody}>
            <MaskedView
              style={{height: 55}}
              maskElement={
                <Text style={style.text}>{'Think Collaboration '}</Text>
              }>
              <LinearGradient
                colors={[
                  '#FC9973',
                  '#FC9973',
                  '#D8E480',
                  '#B7E2F2',
                  '#ffff',
                  '#fff',
                ]}
                start={{x: 1, y: 1}}
                end={{x: 0, y: 0.33}}
                style={{flex: 1}}
              />
            </MaskedView>
            <Text style={{...style.text, marginTop: 0}}>
              {'Think CelebFarm'}
            </Text>

            <Image source={Images.line3} style={style.imgline} />
          </View>
          <Text style={style.text2}>Create content and get paid for it</Text>
          <View
            style={{
              position: 'absolute',
              bottom: normalize(10),
              alignSelf: 'center',
            }}>
            <ButtonLinear
              width={'84%'}
              height={normalize(40)}
              alignSelf={'center'}
              backgroundColor={Colors.btnColor}
              title={'Create an account'}
              textColor={Colors.black}
              titlesingle={true}
              borderRadius={normalize(25)}
              marginHorizontal={normalize(5)}
              btnBottom={0}
              fontFamily={Fonts.Inter_Medium}
              marginTop={normalize(25)}
              onPress={() => {
                props.navigation.navigate('Login');
              }}
            />

            <TouchableOpacity
              activeOpacity={1}
              style={style.btn}
              onPress={() => {
                props.navigation.navigate('Login');
              }}>
              <MaskedView
                style={{height: 24}}
                maskElement={
                  <Text
                    style={{
                      ...style.text,
                      fontSize: normalize(12),
                      marginTop: normalize(0),
                      alignSelf: 'center',
                    }}>
                    {'I already have an account'}
                  </Text>
                }>
                <LinearGradient
                  colors={['#D8E480', '#B7E2F2']}
                  start={{x: 1, y: 1}}
                  end={{x: 0, y: 0.33}}
                  style={{flex: 1}}
                />
              </MaskedView>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </>
    )
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    flex: 1,
  },
  containerBody: {
    padding: normalize(12),
    justifyContent: 'space-between',
  },
  imgline: {
    height: normalize(3),
    width: normalize(180),
    marginStart: normalize(60),
  },
  header: {
    height: 4,
    width: Dimensions.get('screen').width - 20,
    borderRadius: 7,
    backgroundColor: Colors.strok,
    alignSelf: 'center',
    marginTop: normalize(0),
  },
  header2: {
    height: 4,
    width: Dimensions.get('screen').width - 290,
    borderRadius: 7,
    backgroundColor: Colors.white,
    alignSelf: 'flex-start',
  },
  header3: {
    height: 4,
    width: Dimensions.get('screen').width - 170,
    borderRadius: 7,
    backgroundColor: Colors.white,
    alignSelf: 'flex-start',
  },
  header4: {
    height: 4,
    width: Dimensions.get('screen').width - 20,
    borderRadius: 7,
    backgroundColor: Colors.white,
    alignSelf: 'flex-start',
  },
  text: {
    // width: normalize(Dimensions.get('screen').width - 175),
    color: Colors.white,
    fontSize: normalize(27),
    // marginTop: normalize(12),
    fontFamily: Fonts.Inter_SemiBold,
  },
  text2: {
    fontSize: normalize(10),
    color: Colors.white,
    opacity: 0.8,
    marginStart: normalize(14),
  },
  imageLeft: {
    height: Dimensions.get('window').height - 430,
    // width: 175,
  },
  btn: {
    height: normalize(42),
    width: '84%',
    borderRadius: normalize(22),
    backgroundColor: '#0000',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: normalize(12),
    marginBottom: normalize(0),
    marginHorizontal: normalize(6),
    borderWidth: normalize(1),
    borderColor: '#EAF7A7',
  },
  imageMid: {
    height: 75,
    width: 79,
    marginTop: normalize(64),
    marginStart: normalize(-124),
  },
  imageLast: {
    height: 270,
    width: 160,
  },
});
export default Introduction;
