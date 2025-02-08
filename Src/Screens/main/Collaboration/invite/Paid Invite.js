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
import {Colors, Fonts} from '../../../../themes/Themes';
import normalize from '../../../../utils/helpers/dimen';
import Button from '../../../../Components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icons from '../../../../themes/icons';
import Images from '../../../../themes/Images';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import ButtonLinear from '../../../../Components/Button Linear';
import TextInputItem from '../../../../Components/TextInputItem';
import connectionrequest from '../../../../utils/helpers/NetInfo';
import {
  getInviteCollaboRequest,
  getInviteDetailsRequest,
} from '../../../../redux/reducers/CollaborationReducer';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../../../utils/helpers/Loader';
import moment from 'moment';
import ImageProfile from '../../../../Components/ImageProfile';
import HeaderCommon from '../../../../Components/HeaderCommon';
import axios from 'axios';
import constant from '../../../../utils/helpers/constant';
import {showError} from '../../Message/ChatService';
var status = '';
function PaidInvite(props) {
  const [amount, setAmount] = useState('');
  const [invite, setInvite] = useState();
  const [delivearble, setDeliverable] = useState();
  const [isAccepted, setIsAccepted] = useState(false);
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const CollaborationReducer = useSelector(state => state.CollaborationReducer);

  useEffect(() => {
    console.log('campaignID', props?.route?.params?.campaignID);
    var obj =
      'creatorID=' +
      AuthReducer?.creatorID +
      '&campaignID=' +
      props?.route?.params?.campaignID;
    try {
      connectionrequest()
        .then(() => {
          dispatch(getInviteDetailsRequest(obj));
        })
        .catch(err => {
          console.log(err);
          Toast('Please connect to internet');
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  if (status == '' || CollaborationReducer.status != status) {
    switch (CollaborationReducer.status) {
      case 'collaboration/getInviteDetailsRequest':
        status = CollaborationReducer.status;
        break;

      case 'collaboration/getInviteDetailsSuccess':
        status = CollaborationReducer.status;
        console.log('hgfgcvcb');
        var arr = [];
        setInvite(CollaborationReducer?.inviteDetailsResponse);

        CollaborationReducer?.inviteDetailsResponse?.deliverables?.map(item => {
          if (item?.count > 0) {
            arr.push({
              name: item?.name,
              price: item?.price,
              counterPrice: item?.counterPrice,
              editPrice: item?.price,
              totalDelivarablePrice: item?.totalDelivarablePrice,
              deliverableName: item?.name,
              id: item?.id,
              count: item?.count,
            });
          }
        }),
          setDeliverable([...arr]);
        // props.navigation.goBack();

        break;
      case 'collaboration/getInviteDetailsFailure':
        status = CollaborationReducer.status;
        break;

      case 'collaboration/getInviteCollaboRequest':
        status = CollaborationReducer.status;
        break;

      case 'collaboration/getInviteCollaboSuccess':
        status = CollaborationReducer.status;
        console.log('hgfgcvcb');
        props.navigation.goBack();

        break;
      case 'collaboration/getInviteCollaboFailure':
        status = CollaborationReducer.status;
        break;
    }
  }

  function inviteRequest(selected) {
    let arr = [];
    delivearble.map(item => {
      if (item.count > 0) {
        arr.push({
          campaignID: invite?.campaignID,
          creatorId: AuthReducer?.creatorID,
          deliverableName: item?.deliverableName,
          platformType: invite?.platform,
          counterRate: item?.counterPrice > 0 ? item?.counterPrice : item?.price,
          rate: item?.price,
        });
      }
    });
    var obj = {
      creatorID: AuthReducer?.creatorID,
      campaignID: invite?.campaignID,
    };
    console.log(obj);
    try {
      connectionrequest()
        .then(() => {
          axios({
            method: 'post',
            url: constant.BASE_URL + 'SavePaidCommercial',
            data: arr,
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + AuthReducer?.token,
            },
          })
            .then(response => {
              console.log(response);
              axios({
                method: 'post',
                url: constant.BASE_URL + 'SendPaidCommercial',
                data: obj,
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + AuthReducer?.token,
                },
              }).then(response => {
                props?.navigation?.goBack();
              });
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(err => {
          console.log(err);
          showError(err);
        });
    } catch (e) {
      console.log(e);
    }
  }

  var count = 0;
  const renderItemImage = ({item, index}) => {
    count = count + item?.totalDelivarablePrice;
    setAmount(count);
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: normalize(12),
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: '30%',
              // justifyContent: 'space-between',
            }}>
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
              }}
              numberOfLines={2}>
              {item?.name}
            </Text>
            <View
              style={{
                height: normalize(14),
                paddingHorizontal: normalize(4),
                borderRadius: normalize(18 / 2),
                backgroundColor: Colors.white,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: Colors.black,
                  fontSize: normalize(10),
                  fontFamily: Fonts.Inter_Bold,
                }}>
                {item?.count}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderWidth: normalize(1),
              paddingVertical: normalize(4),
              paddingHorizontal: normalize(4),
              borderColor: Colors.borderColor,
              width: '30%',
              // justifyContent: 'space-around',
              borderRadius: normalize(4),
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: Colors.white,
                fontSize: normalize(12),
              }}>
              ₹
            </Text>

            <TextInputItem
              heightInput={Platform.OS == 'ios' ? normalize(22) : normalize(20)}
              widthInput={normalize(70)}
              value={item?.editPrice?.toString()}
              placeholder="0"
              marginTop={normalize(0)}
              placeholderTextColor={'#ABABAB'}
              fontFamily={Fonts.Inter_Medium}
              onChangeText={value => {
                const tempVal = [...delivearble];
                tempVal[index].editPrice = value;
                tempVal[index].counterPrice = value;
                console.log(tempVal[index].editPrice);
                setDeliverable(tempVal);
              }}
              color={'#fff'}
              maxLength={10}
              borderRadius={0}
              keyboardType={'number-pad'}
              borderColor={Colors.borderColor}
              borderWidth={normalize(0)}
              backgroundColor={Colors.black}
              inputHeight={normalize(52)}
            />
            {/* <TouchableOpacity
        onPress={() => {}}
        style={{
          justifyContent: 'center',
          marginLeft: normalize(9),
        }}>
        <Image
          source={Icons.plus}
          style={{
            width: normalize(12),
          }}
          resizeMode="contain"
        />
      </TouchableOpacity> */}
          </View>
          <Text
            style={{
              color: Colors.white,
              fontSize: normalize(12),
              fontFamily: Fonts.Inter_Bold,
            }}>
            ₹{item?.totalDelivarablePrice?.toString()}
          </Text>
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.black}}>
      <>
        <Loader
          visible={
            CollaborationReducer.status ==
              'collaboration/getInviteDetailsRequest' ||
            CollaborationReducer.status ==
              'collaboration/getInviteCollabRequest'
          }
        />
        <HeaderCommon
          picTitle={true}
          home={true}
          back={true}
          backgroundColor={'#000'}
          title={'Invite'}
          heardetext={Colors.white}
          headerHeight={Platform.OS == 'ios' ? normalize(40) : normalize(51)}
          textfontSize={normalize(16)}
          backScreen={() => {
            props.navigation.goBack();
          }}
          fontFamily={Fonts.Inter_Bold}
          notifiPress={() => props?.navigation?.navigate('Notifications')}
          profilePress={() => props?.navigation?.navigate('Chat')}
          // marginStart={normalize(33)}
          textColor={'#ffff'}
          {...props}
        />

        {/* <SafeAreaView style={style.container}> */}
        <View style={style.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
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
                      brandImageUrl={invite?.brandImageUrl}
                      imgheight={normalize(16)}
                      imgwidth={normalize(16)}
                      justifyContent={'center'}
                    />
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(12),
                        marginStart: normalize(5),
                        fontFamily: Fonts.Inter_Bold,
                      }}>
                      {invite?.brandName}
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
                        backgroundColor: '#463080',
                        paddingHorizontal: normalize(12),
                        justifyContent: 'center',
                        height: normalize(16),
                        marginRight: normalize(9),
                      }}>
                      <Text
                        style={{
                          color: Colors.white,
                          fontSize: normalize(10),
                        }}>
                        {invite?.campaignType}
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
                    <Image
                      source={
                        invite?.Platform == 'Instagram'
                          ? Icons.youtube
                          : Icons.insta
                      }
                      style={style.profileCollabration}
                      resizeMode="contain"
                    />
                    <View
                      style={{
                        backgroundColor: Colors.white,
                        height: normalize(3),
                        width: normalize(3),
                        borderRadius: normalize(3 / 2),
                        marginRight: normalize(7),
                      }}
                    />
                    <Text
                      style={{color: Colors.white, fontSize: normalize(10)}}>
                      {moment(invite?.createdDate).format('DD MMM')}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  height: normalize(1),
                  width: normalize(Dimensions.get('screen').width),
                  marginTop: normalize(12),
                  borderWidth: normalize(1),
                  borderColor: '#434540',
                }}
              />
              <View
                style={{
                  marginTop: normalize(12),
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(16),
                    fontFamily: Fonts.Inter_Bold,
                  }}>
                  {invite?.campaignTitle}
                </Text>
                <View
                  style={{
                    marginTop: normalize(12),
                  }}>
                  <Text
                    style={{
                      ...style.textVoice,
                      fontFamily: Fonts.Inter_Regular,
                    }}>
                    {invite?.campaignDesc}
                  </Text>
                </View>
              </View>
              {invite?.campaignImageURL ? (
                <View
                  style={{
                    borderWidth: normalize(1),
                    borderColor: Colors.borderColor,
                    backgroundColor: Colors.bcolor,
                    borderRadius: normalize(7),
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: normalize(6),
                    marginTop: normalize(12),
                  }}>
                  <ImageBackground
                    source={
                      invite?.brandImageUrl == ''
                        ? Images.dyning
                        : {uri: invite?.campaignImageURL}
                    }
                    style={{
                      height: normalize(50),
                      width: normalize(50),
                    }}
                    imageStyle={{borderRadius: normalize(7)}}
                  />

                  <Text
                    style={[
                      {
                        ...style.textVoice,
                        marginStart: normalize(12),
                        width: '70%',
                      },
                    ]}>
                    {invite?.campaignProductTitle}
                  </Text>
                </View>
              ) : null}
              <View
                style={{
                  marginTop: normalize(17),
                  marginBottom: normalize(12),
                }}>
                {invite?.deliverables ? (
                  <>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(14),
                        fontFamily: Fonts.Inter_SemiBold,
                      }}>
                      Deliverables & Commercials
                    </Text>

                    <View
                      style={{
                        marginTop: normalize(12),
                        borderRadius: normalize(6),
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={style.textite}>Items</Text>
                        <Text style={style.textite}>Rate</Text>
                        <Text style={style.textite}>Total</Text>
                      </View>
                      <View
                        style={{
                          height: normalize(1),
                          width: '100%',
                          backgroundColor: '#363833',
                          alignSelf: 'center',
                          marginTop: normalize(7),
                        }}></View>
                      <FlatList
                        data={delivearble}
                        renderItem={renderItemImage}
                        shouldCancelWhenOutside={false}
                      />

                      <View
                        style={{
                          height: normalize(1),
                          width: '100%',
                          backgroundColor: '#363833',
                          alignSelf: 'center',
                          marginTop: normalize(12),
                        }}></View>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: normalize(9),
                        }}>
                        <Text
                          style={{
                            color: Colors.white,
                            fontSize: normalize(12),
                          }}>
                          Total Price
                        </Text>
                        <Text
                          style={{
                            color: Colors.white,
                            fontSize: normalize(12),
                            fontFamily: Fonts.Inter_Bold,
                          }}>
                          ₹{amount}
                        </Text>
                      </View>
                    </View>
                  </>
                ) : null}
              </View>
            </>
          </ScrollView>
          <View
            style={{
              marginTop: normalize(12),
              // marginBottom: normalize(92),
              bottom: 0,
              // backgroundColor:Colors.red
              width: '100%',
            }}>
            <View style={{flexDirection: 'row', width: '100%'}}>
              <Button
                width={'30%'}
                height={normalize(40)}
                alignSelf={'center'}
                backgroundColor={'#000000'}
                title={'Ignore'}
                textColor={Colors.white}
                titlesingle={true}
                borderRadius={normalize(25)}
                marginHorizontal={normalize(5)}
                btnBottom={0}
                onPress={() => {
                  inviteRequest(false);
                }}
              />
              <ButtonLinear
                width={'58%'}
                height={normalize(40)}
                alignSelf={'center'}
                backgroundColor={Colors.btnColor}
                title={'Send'}
                textColor={Colors.black}
                titlesingle={true}
                borderRadius={normalize(25)}
                marginHorizontal={normalize(5)}
                btnBottom={0}
                onPress={() => {
                  setIsAccepted(false);
                  inviteRequest(false);
                }}
              />
            </View>
            {/* </View> */}
          </View>
        </View>
      </>
      {/* </SafeAreaView> */}
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    flex: 1,
    paddingHorizontal: normalize(12),
  },
  containerBody: {
    paddingHorizontal: normalize(10),
    marginTop: normalize(12),
    flex: 1,
    marginBottom: normalize(43),
    backgroundColor: Colors.black,
  },
  textite: {
    color: Colors.white,
    fontSize: normalize(10),
    fontFamily: Fonts.Inter_Regular,
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
    height: normalize(16),
    width: normalize(16),
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
export default PaidInvite;
