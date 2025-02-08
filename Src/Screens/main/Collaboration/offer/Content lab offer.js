import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors, Fonts} from '../../../../themes/Themes';
import normalize from '../../../../utils/helpers/dimen';
import Button from '../../../../Components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icons from '../../../../themes/icons';
import Images from '../../../../themes/Images';
import {ScrollView} from 'react-native-gesture-handler';
import ButtonLinear from '../../../../Components/Button Linear';
import {useDispatch, useSelector} from 'react-redux';
import TextInputItem from '../../../../Components/TextInputItem';
import ImageProfile from '../../../../Components/ImageProfile';
import moment from 'moment';
import connectionrequest from '../../../../utils/helpers/NetInfo';
import {getSendContentLabOfferRequest} from '../../../../redux/reducers/ContentLabReducer';
import Loader from '../../../../utils/helpers/Loader';
import showErrorAlert from '../../../../utils/helpers/Toast';
import HeaderCommon from '../../../../Components/HeaderCommon';
var status = '';
function ContentLaboffer(props) {
  const [deliverables, setDeliverables] = useState([]);
  const [short, setShort] = useState(0);
  const [long, setLong] = useState(0);

  const dispatch = useDispatch();
  const CollaborationReducer = useSelector(state => state.CollaborationReducer);
  const ContentLabReducer = useSelector(state => state.ContentLabReducer);
  const AuthReducer = useSelector(state => state.AuthReducer);

  const [inviteContent, setInviteContent] = useState([]);

  useEffect(() => {
    setDeliverables(
      props?.route?.params?.counterOffer[0]?.deliverables?.map(item => {
        return {
          delivarableID: item?.delivarableID,
          name: item?.name,
          min: item?.min,
          sec: item?.sec,
          price: item?.price,
          counterPrice: item?.counterPrice,
          totalDelivarablePrice: item?.totalDelivarablePrice,
          type: item?.type,
          status: item?.status,
          contentHubID: item?.contentHubID,
          count: item?.count,
        };
      }),
    );
    setInviteContent([...props?.route?.params?.counterOffer]);
  }, []);

  if (status == '' || ContentLabReducer.status != status) {
    switch (ContentLabReducer.status) {
      case 'contentLab/getSendContentLabOfferRequest':
        status = CollaborationReducer.status;
        break;

      case 'contentLab/getSendContentLabOfferSuccess':
        status = ContentLabReducer.status;
        console.log('hgfgcvcb', CollaborationReducer?.inviteDetailsResponse);
        // setInviteContent([CollaborationReducer?.inviteDetailsResponse]);
        props.navigation.goBack();
        break;
      case 'contentLab/getSendContentLabOfferFailure':
        status = ContentLabReducer.status;
        break;
    }
  }

  console.log('Status: ', props?.route?.params?.counterOffer[0]?.deliverables);

  async function updateOffer() {
    var obj = {},
      arr = [];
    try {
      console.log(deliverables);
      deliverables?.map(item => {
        console.log(item?.counterPrice);
        if (item?.price > 0) {
          arr.push({
            ID: item?.delivarableID,
            Name: item?.name,
            DeleverableType: item?.type,
            Min: item?.min,
            Sec: item?.sec,
            Price: item?.price,
            CounterPrice: item?.counterPrice,
          });
        }
      });
      obj = {
        CampaignID: CollaborationReducer?.inviteDetailsResponse?.campaignID,
        CreatorID: AuthReducer?.creatorID,
        UGCDeliverables: arr,
      };
      if (arr.length > 0) {
        connectionrequest()
          .then(() => {
            dispatch(getSendContentLabOfferRequest(obj));
          })
          .catch(err => {
            console.log(err);
            showErrorAlert('Please connect to internet');
          });
      }
    } catch (error) {}
  }

  return (
    <>
      <Loader
        visible={
          ContentLabReducer?.status ==
          'contentLab/getSendContentLabOfferRequest'
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
            title={'Counter Offer'}
            heardetext={Colors.white}
            headerHeight={Platform.OS == 'ios' ? normalize(40) : normalize(61)}
            textfontSize={normalize(16)}
            fontFamily={Fonts.Inter_Bold}
            backScreen={() => {
              props.navigation.goBack();
            }}
            // marginStart={normalize(33)}
            textColor={'#ffff'}
            {...props}
          />
          <ScrollView style={{flex: 1}}>
            <View style={style.containerBody}>
              <View
                style={{
                  marginTop: normalize(0),
                  borderRadius: normalize(7),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: normalize(6),
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <ImageProfile
                      alignItems={'center'}
                      height={normalize(18)}
                      width={normalize(18)}
                      borderRadius={normalize(4)}
                      backgroundColor={Colors.white}
                      brandImageUrl={inviteContent[0]?.brandImageUrl}
                      imgheight={normalize(16)}
                      imgwidth={normalize(16)}
                      justifyContent={'center'}
                    />
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(12),
                        marginStart: normalize(3),
                        fontFamily: Fonts.Inter_Bold,
                      }}>
                      {inviteContent[0]?.brandName}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      style={{
                        borderRadius: normalize(19),
                        backgroundColor: '#D35C36',
                        paddingHorizontal: normalize(7),
                        justifyContent: 'center',
                        height: normalize(18),
                        marginRight: normalize(9),
                      }}>
                      <Text
                        style={{
                          color: Colors.white,
                          fontSize: normalize(10),
                          fontFamily: Fonts.Inter_Medium,
                        }}>
                        Content Lab
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        backgroundColor: Colors.white,
                        height: normalize(3),
                        width: normalize(3),
                        borderRadius: normalize(3 / 2),
                        marginRight: normalize(9),
                      }}
                    />
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(10),
                        fontFamily: Fonts.Inter_Medium,
                      }}>
                      {moment(inviteContent?.campaignDate).format('DD MMM')}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={style.border} />
              <View
                style={{
                  marginTop: normalize(12),
                  borderRadius: normalize(4),
                  marginBottom: normalize(20),
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(16),
                    fontFamily: Fonts.Inter_Bold,
                  }}>
                  {inviteContent[0]?.campaignTitle}
                </Text>
                <View
                  style={{
                    marginTop: normalize(12),
                    borderRadius: normalize(6),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={style.textVoice}>
                    {inviteContent[0]?.campaignDesc}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginTop: normalize(0),
                  marginBottom: normalize(12),
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(14),
                    fontFamily: Fonts.Inter_Bold,
                  }}>
                  Deliverables
                </Text>
                <View
                  style={{
                    marginTop: normalize(12),
                    borderRadius: normalize(6),
                    justifyContent: 'space-between',
                  }}>
                  <View style={style.border} />
                  <View
                    style={{
                      justifyContent: 'space-between',
                      marginTop: normalize(12),
                    }}>
                    <FlatList
                      data={deliverables}
                      renderItem={({item, index}) => {
                        console.log(item);
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
                                  style={{
                                    height: normalize(17),
                                    width: normalize(17),
                                  }}
                                />
                                <View style={{flexDirection:'row',}}>
                                  <Text
                                    style={{
                                      color: Colors.white,
                                      fontSize: normalize(12),
                                      marginRight: normalize(9),
                                      marginLeft: normalize(7),
                                      fontFamily: Fonts.Inter_Regular,
                                      width:
                                        (Dimensions.get('screen').width - 130) /
                                        2,
                                    }}
                                    numberOfLines={2}>
                                    {item?.type}
                                  </Text>
                                </View>
                              </View>

                              <Text
                                style={{
                                  color: Colors.white,
                                  fontSize: normalize(12),
                                  fontFamily: Fonts.Inter_SemiBold,
                                  textAlign: 'left',
                                }}>
                                {item?.min}:{item?.sec}
                              </Text>
                              <TextInputItem
                                heightInput={
                                  Platform.OS == 'ios'
                                    ? normalize(33)
                                    : normalize(27)
                                }
                                widthInput={'29%'}
                                value={item?.price}
                                placeholder=""
                                onChangeText={text => {
                                  const tempVal = [...deliverables];
                                  tempVal[index].counterPrice = text;
                                  console.log(tempVal[index].counterPrice);
                                  setDeliverables(tempVal);
                                }}
                                marginTop={normalize(0)}
                                placeholderTextColor={'#ABABAB'}
                                fontFamily={Fonts.Inter_Medium}
                                color={'#fff'}
                                maxLength={10}
                                borderRadius={7}
                                keyboardType={'number-pad'}
                                borderColor={Colors.borderColor}
                                borderWidth={normalize(1)}
                                backgroundColor={Colors.black}
                                inputHeight={normalize(52)}
                              />
                            </View>
                          </>
                        );
                      }}
                    />
                    {/* <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: normalize(12),
                        alignItems: 'center',
                      }}>
                      <View style={{flexDirection: 'row'}}>
                        <Image
                          source={Icons.images}
                          style={{
                            height: normalize(17),
                            width: normalize(17),
                          }}
                        />
                        <Text
                          style={{
                            color: Colors.white,
                            fontSize: normalize(12),
                            marginRight: normalize(9),
                            marginLeft: normalize(7),
                            fontFamily: Fonts.Inter_Regular,
                          }}>
                          Short video
                        </Text>
                      </View>

                      <Text
                        style={{
                          color: Colors.white,
                          fontSize: normalize(12),
                          fontFamily: Fonts.Inter_SemiBold,
                        }}>
                        2m 30
                      </Text>
                      <TextInputItem
                        heightInput={
                          Platform.OS == 'ios' ? normalize(33) : normalize(27)
                        }
                        widthInput={'29%'}
                        value={long}
                        placeholder=""
                        onChangeText={text => setLong(text)}
                        marginTop={normalize(0)}
                        placeholderTextColor={'#ABABAB'}
                        fontFamily={Fonts.Inter_Medium}
                        color={'#fff'}
                        maxLength={10}
                        borderRadius={7}
                        keyboardType={'number-pad'}
                        borderColor={Colors.borderColor}
                        borderWidth={normalize(1)}
                        backgroundColor={Colors.black}
                        inputHeight={normalize(52)}
                      />
                    </View>
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
                          style={{
                            height: normalize(17),
                            width: normalize(17),
                          }}
                        />
                        <Text
                          style={{
                            color: Colors.white,
                            fontSize: normalize(12),
                            marginRight: normalize(9),
                            marginLeft: normalize(7),
                            fontFamily: Fonts.Inter_Regular,
                          }}>
                          Short video
                        </Text>
                      </View>

                      <Text
                        style={{
                          color: Colors.white,
                          fontSize: normalize(12),
                          fontFamily: Fonts.Inter_SemiBold,
                        }}>
                        2m 30
                      </Text>
                      <TextInputItem
                        heightInput={
                          Platform.OS == 'ios' ? normalize(33) : normalize(27)
                        }
                        widthInput={'29%'}
                        value={statics}
                        placeholder=""
                        onChangeText={text => setStatic(text)}
                        marginTop={normalize(0)}
                        placeholderTextColor={'#ABABAB'}
                        fontFamily={Fonts.Inter_Medium}
                        color={'#fff'}
                        maxLength={10}
                        borderRadius={7}
                        keyboardType={'number-pad'}
                        borderColor={Colors.borderColor}
                        borderWidth={normalize(1)}
                        backgroundColor={Colors.black}
                        inputHeight={normalize(52)}
                      />
                    </View> */}
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <View
          style={{
            // marginTop: normalize(82),
            // bottom: normalize(23),
            // position: 'absolute',
            width: '100%',
            // top:0,
            // backgroundColor:Colors.red,
            justifyContent: 'space-between',
            // width: Dimensions.get('screen').width,
            flexDirection: 'row',
          }}>
          <Button
            width={'45%'}
            height={normalize(40)}
            backgroundColor={'#000000'}
            title={'Cancel'}
            textColor={Colors.white}
            titlesingle={true}
            borderRadius={normalize(25)}
            marginHorizontal={normalize(5)}
            btnBottom={0}
            onPress={() => {
              props.navigation.goBack();
            }}
          />
          <ButtonLinear
            width={'55%'}
            height={normalize(36)}
            backgroundColor={Colors.btnColor}
            title={'Send'}
            textColor={Colors.black}
            titlesingle={true}
            borderRadius={normalize(25)}
            marginHorizontal={normalize(5)}
            btnBottom={0}
            onPress={() => {
              updateOffer();
            }}
          />
          {/* </View> */}
          {/* </View> */}
        </View>
        {/* </SafeAreaView> */}
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
    fontFamily: Fonts.Inter_Light,
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
    height: normalize(18),
    width: normalize(18),
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
  border: {
    height: normalize(1),
    width: normalize(Dimensions.get('window').width - 90),
    backgroundColor: '#363833',
    marginTop: normalize(12),
  },
  containerDel: {
    flexDirection: 'row',
    borderWidth: normalize(1),
    padding: normalize(4),
    borderColor: '#2A2C27',
    justifyContent: 'space-between',
    borderRadius: normalize(4),
  },
});

export default ContentLaboffer;
