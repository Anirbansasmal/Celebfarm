import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors, Fonts} from '../../../themes/Themes';
import normalize from '../../../utils/helpers/dimen';
import Button from '../../../Components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icons from '../../../themes/icons';
import Images from '../../../themes/Images';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import HeaderCommon from '../../../Components/HeaderCommon';
import connectionrequest from '../../../utils/helpers/NetInfo';
import {getMasterContactusRequest} from '../../../redux/reducers/ProfileReducer';

function ContactUs(props) {
  const [data, setData] = useState(0);
  const dispatch = useDispatch();
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  useEffect(() => {
    try {
      connectionrequest()
        .then(() => {
          dispatch(getMasterContactusRequest());
        })
        .then(() => {});
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.black}}>
        <HeaderCommon
          picTitle={true}
          home={true}
          back={true}
          backgroundColor={'#000'}
          title={'Contact Us'}
          heardetext={Colors.white}
          headerHeight={Platform.OS == 'ios' ? normalize(40) : normalize(81)}
          textfontSize={normalize(16)}
          fontFamily={Fonts.Inter_Bold}
          backScreen={() => {
            props.navigation.goBack();
          }}
          notifiPress={() => props.navigation.navigate('Notifications')}
          profilePress={() => props.navigation.navigate('Profile')}
          textColor={'#ffff'}
          {...props}
        />
        <View style={style.container}>
          <>
            <View
              style={{
                marginTop: normalize(12),
                borderRadius: normalize(7),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: normalize(6),
                }}>
                <FlatList
                  data={ProfileReducer?.mastercontactResponse}
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      onPress={() => {
                        // tempArr.map((itemv, indexk) => {
                        //   if (itemv?.isSelect == false) {
                        //     if (indexk == index) {
                        //       tempArr[index].isSelect = true;
                        //       // arr[tempArr]
                        //       console.log(tempArr);
                        //       setData(tempArr);
                        //     } else {
                        //       tempArr[indexk].isSelect = false;
                        //       arr[tempArr];
                        //       console.log(tempArr);
                        //       setData(tempArr);
                        //     }
                        //   } else {
                        //     if (indexk == index) {
                        //       tempArr[index].isSelect = true;
                        //       // arr[tempArr]
                        //       console.log(tempArr);
                        //       setData(tempArr);
                        //     } else {
                        //       tempArr[indexk].isSelect = false;
                        //       arr[tempArr];
                        //       console.log(tempArr);
                        //       setData(tempArr);
                        //     }
                        //   }
                        // });
                        // tempArr[index].isSelect = true;
                        setData(index);
                        {
                          // index == 1
                          //   ? props.navigation.navigate('ContactUsPayment')
                          //   :
                             props.navigation.navigate('ContactUsSend',{contact:item?.id});
                        }
                      }}
                      style={{
                        borderRadius: normalize(3),
                        borderWidth: normalize(1),
                        borderColor: Colors.bcolor,
                        marginTop: normalize(7),
                        borderRadius: normalize(3),
                      }}
                      key={index}
                      activeOpacity={0.7}>
                      <LinearGradient
                        colors={
                          data == index
                            ? ['#B7F9CF', '#EAF7A7']
                            : ['#0000', '#0000']
                        }
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingVertical: normalize(12),
                          borderRadius: normalize(3),
                        }}>
                        <Text
                          style={{
                            color:
                              data == index
                                ? Colors.black
                                : Colors.white,
                            fontSize: normalize(12),
                            marginStart: normalize(9),
                            fontFamily: Fonts.Inter_Regular,
                          }}>
                          {item?.contactItem}
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  )}
                  keyExtractor={item => item.id}
                />
              </View>
            </View>
            <View
              style={{
                marginTop: normalize(82),
                // bottom:0,
                // position:'absolute',
                // top:0,
                // backgroundColor:Colors.red
              }}></View>
          </>
        </View>
      </SafeAreaView>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    // flex: 1,
    paddingHorizontal: normalize(10),
    height: Dimensions.get('screen').height,
  },
  containerBody: {
    paddingHorizontal: normalize(10),
    marginTop: normalize(12),
    flex: 1,
    marginBottom: normalize(43),
    backgroundColor: Colors.black,
  },
  text: {
    color: Colors.white,
    fontSize: normalize(16),
    marginStart: normalize(12),
  },
  text2: {
    color: Colors.white,
    fontSize: normalize(14),
  },
  text6: {
    color: Colors.white,
    fontSize: normalize(12),
    marginTop: normalize(7),
  },
  text3: {
    color: Colors.white,
    fontSize: normalize(12),
    marginTop: normalize(22),
    opacity: 0.7,
  },
  text7: {
    color: Colors.white,
    fontSize: normalize(12),
  },
  textVoice: {
    color: Colors.white,
    fontSize: normalize(12),
  },
  imageLeft: {
    height: normalize(18),
    width: normalize(17),
  },
  upimage: {
    height: normalize(18),
    width: normalize(18),
  },
  profile: {
    height: normalize(49),
    width: normalize(49),
  },
  profileCollabration: {
    height: normalize(19),
    width: normalize(19),
    marginRight: normalize(7),
  },
  profileCollabr: {
    height: normalize(12),
    width: normalize(12),
  },
  text4: {
    color: Colors.white,
    fontSize: normalize(14),
    opacity: 0.7,
    marginStart: normalize(6),
    alignSelf: 'flex-start',
  },
  btn: {
    flexDirection: 'row',
    borderColor: Colors.grey,
    borderWidth: 1,
    borderRadius: normalize(22),
    alignItems: 'center',
    paddingHorizontal: normalize(7),
    height: normalize(29),
  },
});

export default ContactUs;
