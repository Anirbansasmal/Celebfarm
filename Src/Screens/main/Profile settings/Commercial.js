import React, {useEffect, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors, Fonts} from '../../../themes/Themes';
import normalize from '../../../utils/helpers/dimen';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icons from '../../../themes/icons';
import Toast from '../../../utils/helpers/Toast';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import connectionrequest from '../../../utils/helpers/NetInfo';
import {
  addCommercialRequest,
  getCommercialRequest,
  updateCommercialRequest,
} from '../../../redux/reducers/ProfileReducer';
import Loader from '../../../utils/helpers/Loader';
import TextInputItem from '../../../Components/TextInputItem';
import ButtonLinear from '../../../Components/Button Linear';
import HeaderCommon from '../../../Components/HeaderCommon';
var status = '';
function Commercial(props) {
  const [gender, setGender] = useState('');
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const [insta, setInsta] = useState([]);

  const [youtube, setYoutube] = useState([]);

  const [address2, setAddress2] = useState('0');

  useEffect(() => {
    const unsuscribe = props.navigation.addListener('focus', payload => {
      commercial();
    });
    return () => {
      unsuscribe();
    };
  }, []);

  function commercial() {
    try {
      let obj = 'CreatorId=' + AuthReducer?.creatorID;
      connectionrequest()
        .then(() => {
          dispatch(getCommercialRequest(obj));
        })
        .catch(err => {
          console.log(err);
          Toast('Please connect to internet');
        });
    } catch (e) {}
  }

  function saveCommercial() {
    var arr = [];
    try {
      insta?.map((item, index) => {
        if (item?.rate > 0) {
          arr.push({
            creatorId: AuthReducer?.creatorID,
            deliverableName: item?.deliverableName,
            platformType: item?.platformType,
            rate: item?.rate,
          });
        }
      });
      youtube?.map((item, index) => {
        if (item?.rate > 0) {
          arr.push({
            creatorId: AuthReducer?.creatorID,
            deliverableName: item?.deliverableName,
            platformType: item?.platformType,
            rate: item?.rate,
          });
        }
      });
      let obj = arr;
      connectionrequest()
        .then(() => {
          dispatch(addCommercialRequest(obj));
        })
        .catch(err => {
          console.log(err);
          Toast('Please connect to internet');
        });
    } catch (e) {}
  }

  function updateCommercial() {
    var arr = [];
    try {
      insta?.map((item, index) => {
        if (item?.rate > 0) {
          arr.push({
            creatorId: AuthReducer?.creatorID,
            CommercialDetailsId: item?.CommercialDetailsId,
            deliverableName: item?.deliverableName,
            platformType: item?.platformType,
            rate: item?.rate,
          });
        }
      });

      youtube?.map((item, index) => {
        if (item?.rate > 0) {
          arr.push({
            creatorId: AuthReducer?.creatorID,
            CommercialDetailsId: item?.CommercialDetailsId,
            deliverableName: item?.deliverableName,
            platformType: item?.platformType,
            rate: item?.rate,
          });
        }
      });
      let obj = arr;
      connectionrequest()
        .then(() => {
          dispatch(updateCommercialRequest(obj));
        })
        .catch(err => {
          console.log(err);
          Toast('Please connect to internet');
        });
    } catch (e) {}
  }

  const renderItemInsta = ({item, index}) => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: normalize(12),
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={Icons.images}
              style={{height: normalize(17), width: normalize(17)}}
            />
            <Text
              style={{
                color: Colors.white,
                fontSize: normalize(12),
                marginRight: normalize(9),
                marginLeft: normalize(12),
              }}>
              {item?.deliverableName}
              {/* ?.substring(0, 17) */}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderWidth: normalize(1),
              paddingVertical: normalize(4),
              paddingHorizontal: normalize(4),
              borderColor: Colors.borderColor,
              borderRadius: normalize(4),
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: Colors.white,
                fontSize: normalize(12),
              }}>
              $
            </Text>

            <TextInputItem
              heightInput={Platform.OS == 'ios' ? normalize(22) : normalize(20)}
              widthInput={normalize(70)}
              value={item?.rate?.toString() == 0 ? '' : item?.rate?.toString()}
              placeholder="0"
              onChangeText={value => {
                const tempData = [...insta];
                tempData[index].rate = value;
                console.log(tempData);
                setInsta(tempData);
              }}
              marginTop={normalize(0)}
              placeholderTextColor={'#ABABAB'}
              fontFamily={Fonts.Inter_Medium}
              color={'#fff'}
              maxLength={6}
              borderRadius={0}
              keyboardType={'number-pad'}
              borderColor={Colors.borderColor}
              borderWidth={normalize(0)}
              backgroundColor={Colors.black}
              inputHeight={normalize(45)}
            />
          </View>
        </View>
      </>
    );
  };

  const renderItemImage = ({item, index}) => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: normalize(12),
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={Icons.images}
              style={{height: normalize(17), width: normalize(17)}}
            />
            <Text
              style={{
                color: Colors.white,
                fontSize: normalize(12),
                marginRight: normalize(9),
                marginLeft: normalize(12),
              }}>
              {item?.deliverableName}
              {/* ?.substring(0, 17) */}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderWidth: normalize(1),
              paddingVertical: normalize(4),
              paddingHorizontal: normalize(4),
              borderColor: Colors.borderColor,
              borderRadius: normalize(4),
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: Colors.white,
                fontSize: normalize(12),
              }}>
              $
            </Text>

            <TextInputItem
              heightInput={Platform.OS == 'ios' ? normalize(22) : normalize(20)}
              widthInput={normalize(70)}
              value={item?.rate?.toString() == 0 ? '' : item?.rate?.toString()}
              placeholder="0"
              onChangeText={value => {
                const tempData = [...youtube];
                tempData[index].rate = value;
                console.log(tempData);
                setYoutube(tempData);
              }}
              marginTop={normalize(0)}
              placeholderTextColor={'#ABABAB'}
              fontFamily={Fonts.Inter_Medium}
              color={'#fff'}
              maxLength={6}
              borderRadius={0}
              keyboardType={'number-pad'}
              borderColor={Colors.borderColor}
              borderWidth={normalize(0)}
              backgroundColor={Colors.black}
              inputHeight={normalize(45)}
            />
          </View>
        </View>
      </>
    );
  };

  if (status == '' || ProfileReducer.status != status) {
    switch (ProfileReducer.status) {
      case 'Profile/getCommercialRequest':
        status = ProfileReducer.status;
        console.log('=>>>>>>>');
        break;

      case 'Profile/getCommercialSuccess':
        status = ProfileReducer.status;
        console.log(
          'ProfileReducer?.Address?.result>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
          ProfileReducer.commercialResponse,
        );
        var arr = [],
          arr1 = [];
        ProfileReducer?.commercialResponse?.map((item, index) => {
          if (item?.platformType == 'Instagram') {
            var obj = {
              creatorId: AuthReducer?.creatorID,
              deliverableName: item?.deliverableName,
              CommercialDetailsId: item?.id,
              platformType: item?.platformType,
              rate: item?.rate,
            };
            arr.push(obj);
            if (item?.id > 0) {
              setAddress2(item?.id);
            }
          } else if (item?.platformType == 'Youtube') {
            var obj1 = {
              creatorId: AuthReducer?.creatorID,
              deliverableName: item?.deliverableName,
              CommercialDetailsId: item?.id,
              platformType: item?.platformType,
              rate: item?.rate,
            };
            arr1.push(obj1);
            if (item?.id > 0) {
              setAddress2(item?.id);
            }
          }
        });
        console.log('arr', arr);
        setInsta(arr);
        setYoutube(arr1);
        break;
      case 'Profile/getCommercialFailure':
        status = ProfileReducer.status;
        break;
      case 'Profile/updateCommercialRequest':
        status = ProfileReducer.status;
        console.log('=>>>>>>>');
        break;

      case 'Profile/updateCommercialSuccess':
        status = ProfileReducer.status;
        console.log(
          'ProfileReducer?.updateCommercialResponse?.result>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
          ProfileReducer.updateCommercialResponse,
        );
        break;
      case 'Profile/updateCommercialFailure':
        status = ProfileReducer.status;
        break;
      case 'Profile/addCommercialRequest':
        status = ProfileReducer.status;
        console.log('=>>>>>>>');
        break;

      case 'Profile/addCommercialSuccess':
        status = ProfileReducer.status;
        console.log(
          'ProfileReducer?.CommercialResponse?.result>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
          ProfileReducer.addCommercialResponse,
        );
        props?.navigation?.goBack();
        break;
      case 'Profile/addCommercialFailure':
        status = ProfileReducer.status;
        break;
    }
  }
  
  console.log(address2);
  
  return (
    <>
      <Loader
        visible={
          ProfileReducer.status == 'Profile/addCommercialRequest' ||
          ProfileReducer.status == 'Profile/updateCommercialRequest' ||
          ProfileReducer.status == 'Profile/getCommercialRequest'
        }
      />
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.black}}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <HeaderCommon
            picTitle={true}
            home={true}
            back={true}
            backgroundColor={'#000'}
            title={'Commercials'}
            heardetext={Colors.white}
            headerHeight={Platform.OS == 'ios' ? normalize(40) : normalize(41)}
            textfontSize={normalize(16)}
            fontFamily={Fonts.Inter_Bold}
            backScreen={() => {
              props.navigation.goBack();
            }}
            textColor={'#ffff'}
            {...props}
          />
          <View style={style.container}>
            <ScrollView>
              <>
                <View
                  style={{
                    marginTop: normalize(12),
                    borderRadius: normalize(7),
                  }}></View>

                <View
                  style={{
                    marginTop: normalize(12),
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{flexDirection: 'row', marginBottom: normalize(12)}}>
                    <Image
                      source={Icons.youtube}
                      style={{height: normalize(12), width: normalize(12)}}
                      resizeMode="contain"
                    />
                    <Text style={style.textite}> {'  '}Youtube</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={style.textite}>Items</Text>
                    <Text style={style.textite}>Rate</Text>
                  </View>
                  <View
                    style={{
                      height: normalize(1),
                      width: '100%',
                      backgroundColor: '#363833',
                      alignSelf: 'center',
                      marginTop: normalize(12),
                    }}></View>
                  <FlatList
                    data={youtube}
                    renderItem={renderItemImage}
                    shouldCancelWhenOutside={false}
                  />

                  <View
                    style={{
                      flexDirection: 'row',
                      marginBottom: normalize(0),
                      marginTop: normalize(12),
                    }}>
                    <Image
                      source={Icons.insta}
                      style={{height: normalize(12), width: normalize(12)}}
                      resizeMode="contain"
                    />
                    <Text style={style.textite}> {'  '}Instagram</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: normalize(12),
                    }}>
                    <Text style={style.textite}>Items</Text>
                    <Text style={style.textite}>Rate</Text>
                  </View>
                  <View
                    style={{
                      height: normalize(1),
                      width: '100%',
                      backgroundColor: '#363833',
                      alignSelf: 'center',
                      marginTop: normalize(12),
                    }}></View>

                  <FlatList
                    data={insta}
                    renderItem={renderItemInsta}
                    shouldCancelWhenOutside={false}
                  />
                </View>
              </>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
        <ButtonLinear
          width={'92%'}
          height={normalize(40)}
          alignSelf={'center'}
          backgroundColor={Colors.btnColor}
          title={'Save Changes'}
          textColor={Colors.black}
          titlesingle={true}
          borderRadius={normalize(25)}
          marginHorizontal={normalize(5)}
          btnBottom={0}
          onPress={() => {
            address2 == 0 ? saveCommercial() : updateCommercial();
          }}
        />
      </SafeAreaView>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    flex: 1,
    paddingHorizontal: normalize(10),
    paddingBottom: normalize(29),
  },
  containerBody: {
    paddingHorizontal: normalize(10),
    marginTop: normalize(12),
    flex: 1,
    marginBottom: normalize(43),
    backgroundColor: Colors.black,
  },
  header: {
    flexDirection: 'row',
    padding: normalize(0),
    justifyContent: 'space-between',
    borderBottomColor: '#434540',
    borderBottomWidth: normalize(1),
    paddingVertical: normalize(12),
    backgroundColor: Colors.black,
  },
  text: {
    color: Colors.white,
    fontSize: normalize(16),
    marginStart: normalize(12),
    fontFamily: Fonts.Inter_Bold,
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
    width: normalize(190),
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
  textite: {
    color: Colors.white,
    fontSize: normalize(10),
    fontFamily: Fonts.Inter_SemiBold,
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

export default Commercial;
