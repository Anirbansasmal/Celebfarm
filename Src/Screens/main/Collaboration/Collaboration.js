import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import {Colors, Fonts} from '../../../themes/Themes';
import normalize from '../../../utils/helpers/dimen';
import Icons from '../../../themes/icons';
import Images from '../../../themes/Images';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import connectionrequest from '../../../utils/helpers/NetInfo';
import Toast from '../../../utils/helpers/Toast';
import {
  getHomeCollaborationRequest,
  getHomeCollaborationSuccess,
} from '../../../redux/reducers/HomeUserReducer';
import moment from 'moment';
import Modal from 'react-native-modal';
import ImageProfile from '../../../Components/ImageProfile';
import constant from '../../../utils/helpers/constant';
import EmptyComponent from '../../../Components/EmptyComponent';
import MyStatusBar from '../../../utils/MyStatusBar';
import HeaderData from '../../../Components/HeaderData';
import {logoutRequest} from '../../../redux/reducers/AuthReducer';
var status = '';

function Collaboration(props) {
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const HomeReducer = useSelector(state => state.HomeReducer);
  const CollaborationReducer = useSelector(state => state.CollaborationReducer);
  const UserReducer = useSelector(state => state.UserReducer);
  const [isSelected, setSelected] = useState(constant.typeSelect); //
  const [dataActive, setDataActive] = useState([]);
  const [isShow, setShow] = useState(false);

  const [dataInvite, setDataInvite] = useState([]);
  const [dataOffer, setDataOffer] = useState([]);
  const [dataComplete, setDataComplete] = useState([]);
  const [isSelect, setSelect] = useState('');

  const renderItemActive = ({item, index}) => {
    console.log(item?.campaignID);
    return (
      <>
        <TouchableOpacity
          style={{
            borderRadius: normalize(4),
            borderWidth: normalize(1),
            borderColor: Colors.borderColor,
            paddingHorizontal: normalize(9),
            marginTop: normalize(12),
            backgroundColor: Colors.bcolor,
            marginBottom: index + 1 == dataActive.length ? normalize(48) : 0,
          }}
          onPress={() => {
            if (item?.type == 'ContentLab') {
              props.navigation.navigate('ActiveContent', {
                campaignID: item?.campaignID,
              }); //Deliverable Approved Content
            } else if (item?.type == 'Barter' || item?.type == 'Bater Offer') {
              console.log(item?.type);
              props.navigation.navigate('Active', {
                campaignID: item?.campaignID,
              }); //Deliverable Approved Content
            } else if (item?.type == 'Paid') {
              props.navigation.navigate('PaidInvite', {
                campaignID: item?.campaignID,
              }); //Deliverable Approved Content
            }
          }}
          activeOpacity={0.7}>
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
              <Image
                source={
                  item?.brandImageUrl == ''
                    ? Images.profile
                    : {uri: item?.brandImageUrl}
                }
                style={style.profileCollabr}
                resizeMode="contain"
              />
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(10),
                  marginStart: normalize(3),
                  fontFamily: Fonts.Inter_Medium,
                }}>
                {item?.brandName}
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
                  backgroundColor:
                    item?.type == 'Barter'
                      ? Colors.collab1
                      : item?.type == 'Paid'
                      ? Colors.collab2
                      : item?.type == 'ContentLab'
                      ? Colors.collab3
                      : item?.type == 'barteroffer'
                      ? Colors.collab1
                      : item?.type == 'Paid+'
                      ? Colors.collab2
                      : null,
                  paddingHorizontal: normalize(7),
                  justifyContent: 'center',
                  height: normalize(19),
                  marginRight: normalize(6),
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(10),
                  }}>
                  {item?.type == 'barteroffer'
                    ? 'Barter'
                    : item?.type == 'paid+gift'
                    ? 'Paid'
                    : item?.type}
                </Text>
              </TouchableOpacity>
              {item?.type !== 'ContentLab' && item?.type !== 'Paid' ? (
                <>
                  <View
                    style={{
                      backgroundColor: Colors.white,
                      height: normalize(3),
                      width: normalize(3),
                      borderRadius: normalize(3 / 2),
                      marginRight: normalize(6),
                    }}
                  />
                  <Image
                    source={
                      item?.platformType === 'Instagram'
                        ? Icons.insta
                        : Icons.youtube
                    }
                    style={style.profileCollabration}
                    resizeMode="contain"
                  />
                </>
              ) : null}
              <View
                style={{
                  backgroundColor: Colors.white,
                  height: normalize(3),
                  width: normalize(3),
                  borderRadius: normalize(3 / 2),
                  marginRight: normalize(6),
                }}
              />
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(10),
                }}>
                {moment(item?.campaignDate).format('DD MMM')}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: normalize(7),
              marginBottom: normalize(9),
            }}>
            {item?.type == 'Barter' && item?.discount == '' ? (
              <Image
                source={
                  item?.productImageUrl == ''
                    ? Images.dyning
                    : {uri: item?.productImageUrl}
                }
                style={{
                  height: normalize(70),
                  width: normalize(70),
                }}
                resizeMode="cover"
              />
            ) : null}

            {item?.discount != '' ? (
              <View>
                <ImageBackground
                  source={
                    item?.productImageUrl == ''
                      ? Images.dyning
                      : {uri: item?.brandImageUrl}
                  }
                  style={{
                    height: normalize(50),
                    width: normalize(70),
                  }}
                  imageStyle={{borderRadius: normalize(5)}}
                  resizeMode="cover"
                />
                <View
                  style={{
                    backgroundColor: Colors.white,
                    height: normalize(16),
                    alignSelf: 'flex-start',
                    marginTop: normalize(6),
                    borderRadius: normalize(3),
                    paddingHorizontal: normalize(3),
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: Colors.black,
                      fontSize: normalize(10),
                      marginStart: normalize(3),
                    }}>
                    {}% Off
                  </Text>
                </View>
              </View>
            ) : null}

            <View
              style={{
                marginStart:
                  item?.type == 'Barter' || item?.type == 'barteroffer'
                    ? normalize(12)
                    : normalize(0),
                justifyContent: 'space-between',
                width:
                  item?.type == 'Barter' || item?.discount != ''
                    ? '75%'
                    : '100%',
              }}>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(12),
                  fontFamily: Fonts.Inter_SemiBold,
                }}>
                {item?.type == 'Barter' && item?.discount != ''
                  ? item?.barterOfferTitle?.substring(0, 48)
                  : item?.type == 'Barter'
                  ? item?.barterProductTitle?.substring(0, 28)
                  : item?.type == 'Paid+'
                  ? item?.paidCampaignName?.substring(0, 28)
                  : item?.contentLabTitle?.substring(0, 28)}
              </Text>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(11),
                  fontFamily: Fonts.Inter_Regular,
                  width: '80%',
                  marginTop: normalize(6),
                }}>
                {item?.type == 'Barter' && item?.discount != ''
                  ? 'From ' +
                    moment(item?.fromDate).format('DD MMM') +
                    ' to ' +
                    moment(item?.toDate).format('DD MMM')
                  : item?.type == 'Barter'
                  ? item?.barterProductDesc?.substring(0, 78)
                  : item?.type == 'Paid'
                  ? item?.paidCampaignDesc?.substring(0, 80)
                  : ''}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  // backgroundColor:Colors.red,
                  marginTop:
                    item?.type == 'Barter'
                      ? normalize(7)
                      : item?.type == 'Paid'
                      ? normalize(7)
                      : normalize(0),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={Icons.document_upload}
                    style={style.profileCollabration}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: normalize(12),
                      fontFamily: Fonts.Inter_SemiBold,
                    }}>
                    {item?.totalDeliverables}
                  </Text>
                </View>
                {item?.type == 'Barter' || item?.discount !== '' ? null : (
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: normalize(12),
                      fontFamily: Fonts.Inter_SemiBold,
                    }}>
                    ₹{item?.totalValue}
                  </Text>
                )}
              </View>
            </View>
          </View>
          {item?.type == 'Paid+' ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: normalize(10),
              }}>
              <ImageBackground
                source={
                  item?.brandImageUrl == ''
                    ? Images.dyning
                    : {uri: item?.productImageUrl}
                }
                style={{
                  height: normalize(30),
                  width: normalize(30),
                }}
                imageStyle={{borderRadius: normalize(5)}}
                resizeMode="cover"
              />
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(10),
                  fontFamily: Fonts.Inter_SemiBold,
                  marginStart: normalize(6),
                }}>
                {item?.paidCampaignDesc?.substring(0, 90)}
              </Text>
            </View>
          ) : null}
        </TouchableOpacity>
      </>
    );
  };

  function dateText(date) {
    return (
      <Text
        style={{
          color: Colors.white,
          fontSize: normalize(10),
          fontFamily: Fonts.Inter_Bold,
        }}>
        {date}
      </Text>
    );
  }

  const renderItemInvite = ({item, index}) => {
    return (
      <>
        <TouchableOpacity
          style={{
            borderRadius: normalize(4),
            borderWidth: normalize(1),
            borderColor: Colors.borderColor,
            paddingHorizontal: normalize(9),
            marginTop: normalize(12),
            backgroundColor: Colors.bcolor,
            marginBottom: index + 1 == dataInvite.length ? normalize(38) : 0,
          }}
          onPress={() => {
            // dispatch(getSelectRequest('Invite'));
            props.navigation.navigate(
              item?.type == 'Paid' || item?.type == 'Paid+'
                ? 'PaidInvite'
                : item?.type == 'Barter' && item?.discount == null
                ? 'BarterInvite'
                : item?.type == 'Barter' && item?.discount != null
                ? 'BarterInviteDiscount'
                : null,
              {
                campaignID: item?.campaignID,
              },
            );
            console.log(item?.campaignID);
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
              <Image
                source={
                  item?.brandImageUrl == null
                    ? Images.profile
                    : {uri: item?.brandImageUrl}
                }
                style={style.profileCollabr}
                resizeMode="contain"
              />
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(10),
                  marginStart: normalize(3),
                  fontFamily: Fonts.Inter_Medium,
                }}>
                {item?.brandName}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  borderRadius: normalize(19),
                  backgroundColor:
                    item?.type == 'Paid' || item?.type == 'Paid+'
                      ? Colors.collab2
                      : item?.type == 'Barter' || item?.type == 'barteroffer'
                      ? Colors.collab1
                      : null,
                  paddingHorizontal: normalize(7),
                  justifyContent: 'center',
                  height: normalize(19),
                  marginRight: normalize(6),
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(10),
                  }}>
                  {item?.type == 'Paid'
                    ? 'Paid'
                    : item?.type == 'Paid+'
                    ? 'Paid+'
                    : item?.type == 'Barter'
                    ? 'Barter'
                    : 'Barter'}
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: Colors.white,
                  height: normalize(3),
                  width: normalize(3),
                  borderRadius: normalize(3 / 2),
                  marginRight: normalize(6),
                }}
              />
              <Image
                source={
                  item?.platformType === 'Instagram'
                    ? Icons.insta
                    : Icons.youtube
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
                  marginRight: normalize(6),
                }}
              />
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(10),
                }}>
                {moment(item?.campaignDate).format('DD MMM')}
              </Text>
            </View>
          </View>
          {item.discount == '' ? (
            <View
              style={{
                flexDirection: 'row',
                marginTop: normalize(7),
                marginBottom: item.discount == '' ? normalize(9) : 0,
              }}>
              <View
                style={{
                  marginStart: normalize(0),
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(12),
                    fontFamily: Fonts.Inter_SemiBold,
                  }}>
                  {item?.type == 'Paid+' || item?.type == 'Paid'
                    ? item?.paidCampaignName?.substring(0, 28)
                    : ''}
                </Text>
                {item?.type == 'Paid' ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: normalize(7),
                    }}>
                    <Image
                      source={Icons.document_upload}
                      style={style.profileCollabration}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(12),
                        fontFamily: Fonts.Inter_SemiBold,
                      }}>
                      {item?.totalDeliverables}
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
          ) : null}

          {item?.discount != '' ? (
            <View
              style={{
                flexDirection: 'row',
                marginTop: normalize(7),
                marginBottom: normalize(7),
              }}>
              <View>
                <ImageBackground
                  source={
                    item?.barterOfferImgUrl == null
                      ? Images.dyning
                      : {uri: item?.barterOfferImgUrl}
                  }
                  style={{
                    height: normalize(50),
                    width: normalize(70),
                  }}
                  imageStyle={{borderRadius: normalize(5)}}
                  // resizeMode="contain"
                />
                <View
                  style={{
                    backgroundColor: Colors.white,
                    height: normalize(16),
                    alignSelf: 'flex-start',
                    marginTop: normalize(6),
                    borderRadius: normalize(3),
                    paddingHorizontal: normalize(3),
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: Colors.black,
                      fontSize: normalize(10),
                      marginStart: normalize(3),
                      fontFamily: Fonts.Inter_Bold,
                    }}>
                    {item?.discount} Off
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginStart:
                    item?.type == 'Barter' || item?.type == 'barteroffer'
                      ? normalize(12)
                      : normalize(0),
                  width:
                    item?.type == 'Barter' || item?.discount != ''
                      ? '75%'
                      : '100%',
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(12),
                    fontFamily: Fonts.Inter_SemiBold,
                  }}>
                  {item?.type == 'Barter' && item?.discount == null
                    ? item?.barterProductTitle?.substring(0, 38)
                    : item?.barterOfferTitle?.substring(0, 38)}
                </Text>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(10),
                    fontFamily: Fonts.Inter_Regular,
                    marginTop: normalize(5),
                  }}>
                  Form {dateText(moment(item?.fromDate).format('MMM DD'))} to{' '}
                  {dateText(moment(item?.toDate).format('MMM DD'))}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: normalize(19),
                    alignItems: 'center',
                  }}>
                  <Image
                    source={Icons.document_upload}
                    style={{
                      height: normalize(14),
                      width: normalize(14),
                      marginRight: normalize(7),
                    }}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: normalize(12),
                      fontFamily: Fonts.Inter_Bold,
                    }}>
                    {item?.totalDeliverables}
                  </Text>
                </View>
              </View>
            </View>
          ) : null}
          {item?.type == 'Paid+' ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: normalize(10),
                width: '100%',
              }}>
              <ImageBackground
                source={
                  item?.campaignImageURL == ''
                    ? Images.dyning
                    : {uri: item?.campaignImageURL}
                }
                style={{
                  height: normalize(30),
                  width: normalize(30),
                }}
                imageStyle={{borderRadius: normalize(5)}}
                resizeMode="cover"
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '80%',
                  alignContent: 'center',
                  marginStart: normalize(6),
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(10),
                    fontFamily: Fonts.Inter_Medium,
                  }}
                  numberOfLines={2}>
                  {item?.paidCampaignDesc}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={Icons.document_upload}
                    style={style.profileCollabration}
                    resizeMode="contain"
                  />

                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: normalize(12),
                      fontFamily: Fonts.Inter_SemiBold,
                      marginStart: normalize(-5),
                    }}>
                    {item?.totalDeliverables}
                  </Text>
                </View>
              </View>
            </View>
          ) : null}
        </TouchableOpacity>
      </>
    );
  };

  const renderItemOffer = ({item, index}) => {
    return (
      <>
        <TouchableOpacity
          style={{
            borderRadius: normalize(4),
            borderWidth: normalize(1),
            borderColor: Colors.borderColor,
            paddingHorizontal: normalize(9),
            marginTop: normalize(12),
            backgroundColor: Colors.bcolor,
            marginBottom: index + 1 == dataOffer.length ? normalize(38) : 0,
          }}
          onPress={() => {
            // dispatch(getSelectRequest('Offer'));
            dispatch(getHomeCollaborationSuccess(null));
            props.navigation.navigate(
              item?.type == 'Paid' || item?.type == 'Paid+'
                ? 'Paid'
                : item?.type == 'Barter' && item?.discount == ''
                ? moment(new Date()).diff(item?.offerStartDate, 'days') <= 14 &&
                  moment(new Date()).diff(item?.offerStartDate, 'days') >= 0 &&
                  moment(new Date()).diff(item?.offerStartDate, 'days') > -1
                  ? 'BarterInviteOffer'
                  : ''
                : item?.discount != ''
                ? moment(new Date()).diff(item?.offerStartDate, 'days') <= 14 &&
                  moment(new Date()).diff(item?.offerStartDate, 'days') >= 0 &&
                  moment(new Date()).diff(item?.offerStartDate, 'days') > -1
                  ? 'BarterOffer'
                  : ''
                : item?.type == 'ContentLab'
                ? moment(new Date()).diff(item?.offerStartDate, 'days') <= 14 &&
                  moment(new Date()).diff(item?.offerStartDate, 'days') >= 0 &&
                  moment(new Date()).diff(item?.offerStartDate, 'days') > -1
                  ? 'ContentLabCounteroffer'
                  : ''
                : '',
              {
                campaignID: item?.campaignID,
              },
            );
            console.log(item?.campaignID);
          }}>
          <View
            style={{
              paddingHorizontal: normalize(6),
              paddingVertical: normalize(2),
              backgroundColor: Colors.collab3,
              width: normalize(80),
              marginTop: normalize(12),
              borderRadius: normalize(2),
            }}>
            <Text
              style={{
                color: Colors.white,
                fontSize: normalize(7),
                fontFamily: Fonts.Inter_SemiBold,
              }}>
              {moment(new Date()).diff(item?.offerStartDate, 'days') <= 14 &&
              moment(new Date()).diff(item?.offerStartDate, 'days') >= 0 &&
              moment(new Date()).diff(item?.offerStartDate, 'days') > -1
                ? 'Expiry in ' +
                  (14 -
                    parseInt(
                      moment(new Date()).diff(item?.offerStartDate, 'days'),
                    )) +
                  ' days'
                : 'Expired'}
            </Text>
          </View>
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
                brandImageUrl={
                  item?.brandImageUrl == null
                    ? Images.profile
                    : item?.brandImageUrl
                }
                alignItems={'center'}
                height={normalize(18)}
                width={normalize(18)}
                borderRadius={normalize(4)}
                backgroundColor={Colors.white}
                imgheight={normalize(16)}
                imgwidth={normalize(16)}
                justifyContent={'center'}
              />
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(10),
                  marginStart: normalize(3),
                  fontFamily: Fonts.Inter_Medium,
                }}>
                {item?.brandName}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  borderRadius: normalize(19),
                  backgroundColor:
                    item?.type == 'Paid' || item?.type == 'Paid+'
                      ? Colors.collab2
                      : item?.type == 'Barter' || item?.type == 'barteroffer'
                      ? Colors.collab1
                      : item?.type == 'ContentLab'
                      ? Colors.collab3
                      : null,
                  paddingHorizontal: normalize(7),
                  justifyContent: 'center',
                  height: normalize(19),
                  marginRight: normalize(6),
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(10),
                  }}>
                  {item?.type == 'Paid'
                    ? 'Paid'
                    : item?.type == 'Paid+'
                    ? 'Paid+'
                    : item?.type == 'Barter'
                    ? 'Barter'
                    : item?.type == 'ContentLab'
                    ? item?.type
                    : ''}
                </Text>
              </View>

              {item?.type !== 'ContentLab' ? (
                <>
                  <View
                    style={{
                      backgroundColor: Colors.white,
                      height: normalize(3),
                      width: normalize(3),
                      borderRadius: normalize(3 / 2),
                      marginRight: normalize(6),
                    }}
                  />
                  <Image
                    source={
                      item?.platformType === 'Instagram'
                        ? Icons.insta
                        : Icons.youtube
                    }
                    style={style.profileCollabration}
                    resizeMode="contain"
                  />
                </>
              ) : null}
              <View
                style={{
                  backgroundColor: Colors.white,
                  height: normalize(3),
                  width: normalize(3),
                  borderRadius: normalize(3 / 2),
                  marginRight: normalize(6),
                }}
              />
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(10),
                }}>
                {moment(item?.campaignDate).format('DD MMM')}
              </Text>
            </View>
          </View>
          {item.discount == '' ? (
            <View
              style={{
                flexDirection: 'row',
                marginTop: normalize(7),
                marginBottom: item.discount == '' ? normalize(9) : 0,
              }}>
              {item?.type == 'Barter' ? (
                <ImageBackground
                  source={
                    item?.productImageUrl == null
                      ? Images.dyning
                      : {uri: item?.productImageUrl}
                  }
                  style={{
                    height: normalize(50),
                    width: normalize(70),
                  }}
                  imageStyle={{borderRadius: normalize(4)}}
                />
              ) : null}
              <View
                style={{
                  marginStart:
                    item?.type == 'ContentLab' || item?.type == 'Paid'
                      ? 0
                      : normalize(10),
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(12),
                    fontFamily: Fonts.Inter_SemiBold,
                    textAlign: 'justify',
                  }}>
                  {item?.type == 'Paid+' ||
                  item?.type == 'Paid' ||
                  item?.type == 'Barter'
                    ? item?.barterProductTitle?.substring(0, 128)
                    : item?.type == 'ContentLab'
                    ? item?.contentLabTitle
                    : ''}
                </Text>
                {item?.type == 'Paid' ||
                item?.type == 'Barter' ||
                item?.type == 'ContentLab' ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: normalize(7),
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: normalize(7),
                      }}>
                      <Image
                        source={Icons.document_upload}
                        style={style.profileCollabration}
                        resizeMode="contain"
                      />
                      <Text
                        style={{
                          color: Colors.white,
                          fontSize: normalize(12),
                          fontFamily: Fonts.Inter_SemiBold,
                        }}>
                        {item?.totalDeliverables}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: normalize(7),
                      }}>
                      <Text
                        style={{
                          color: Colors.white,
                          fontSize: normalize(12),
                          fontFamily: Fonts.Inter_SemiBold,
                        }}>
                        ₹{item?.totalValue}
                      </Text>
                    </View>
                  </View>
                ) : null}
              </View>
            </View>
          ) : null}

          {item?.discount != '' ? (
            <View
              style={{
                flexDirection: 'row',
                marginTop: normalize(7),
                marginBottom: normalize(7),
              }}>
              <View>
                <ImageBackground
                  source={
                    item?.barterOfferImgUrl == null
                      ? Images.dyning
                      : {uri: item?.barterOfferImgUrl}
                  }
                  style={{
                    height: normalize(50),
                    width: normalize(70),
                  }}
                  imageStyle={{borderRadius: normalize(5)}}
                  // resizeMode="contain"
                />
                <View
                  style={{
                    backgroundColor: Colors.white,
                    height: normalize(16),
                    alignSelf: 'flex-start',
                    marginTop: normalize(6),
                    borderRadius: normalize(3),
                    paddingHorizontal: normalize(3),
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: Colors.black,
                      fontSize: normalize(10),
                      marginStart: normalize(3),
                      fontFamily: Fonts.Inter_Bold,
                    }}>
                    {item?.discount} Off
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginStart:
                    item?.type == 'Barter' || item?.type == 'barteroffer'
                      ? normalize(12)
                      : normalize(0),
                  width:
                    item?.type == 'Barter' || item?.discount != ''
                      ? '75%'
                      : '100%',
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(12),
                    fontFamily: Fonts.Inter_SemiBold,
                  }}>
                  {item?.type == 'Barter' && item?.discount == null
                    ? item?.barterProductTitle?.substring(0, 38)
                    : item?.barterOfferTitle?.substring(0, 38)}
                </Text>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(10),
                    fontFamily: Fonts.Inter_Regular,
                    marginTop: normalize(5),
                  }}>
                  Form {dateText(moment(item?.fromDate).format('MMM DD'))} to{' '}
                  {dateText(moment(item?.toDate).format('MMM DD'))}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: normalize(19),
                    alignItems: 'center',
                  }}>
                  <Image
                    source={Icons.document_upload}
                    style={{
                      height: normalize(14),
                      width: normalize(14),
                      marginRight: normalize(7),
                    }}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: normalize(12),
                      fontFamily: Fonts.Inter_Bold,
                    }}>
                    {item?.totalDeliverables}
                  </Text>
                </View>
              </View>
            </View>
          ) : null}
          {item?.type == 'Paid+' ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: normalize(10),
                width: '100%',
              }}>
              <ImageBackground
                source={{uri: item?.campaignImageURL}}
                style={{
                  height: normalize(30),
                  width: normalize(30),
                }}
                imageStyle={{borderRadius: normalize(5)}}
                resizeMode="cover"
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '80%',
                  alignContent: 'center',
                  marginStart: normalize(6),
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(10),
                    fontFamily: Fonts.Inter_SemiBold,
                  }}>
                  {item?.paidCampaignDesc?.substring(0, 70)}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={Icons.document_upload}
                    style={style.profileCollabration}
                    resizeMode="contain"
                  />

                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: normalize(12),
                      fontFamily: Fonts.Inter_SemiBold,
                      marginStart: normalize(-5),
                    }}>
                    16
                  </Text>
                </View>
              </View>
            </View>
          ) : null}
        </TouchableOpacity>
      </>
    );
  };

  const renderItemCompleted = ({item, index}) => {
    return (
      <>
        <TouchableOpacity
          style={{
            borderRadius: normalize(4),
            borderWidth: normalize(1),
            borderColor: Colors.borderColor,
            paddingHorizontal: normalize(9),
            marginTop: normalize(12),
            backgroundColor: Colors.bcolor,
            marginBottom: index + 1 == dataActive.length ? normalize(48) : 0,
          }}
          onPress={() => props.navigation.navigate('Active')}
          activeOpacity={0.7}>
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
              <Image
                source={
                  item?.brandImageUrl == ''
                    ? Images.profile
                    : {uri: item?.brandImageUrl}
                }
                style={style.profileCollabr}
                resizeMode="contain"
              />
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(10),
                  marginStart: normalize(3),
                  fontFamily: Fonts.Inter_Medium,
                }}>
                {item?.brandName}
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
                  backgroundColor:
                    item?.type == 'Barter'
                      ? Colors.collab1
                      : item?.type == 'Paid'
                      ? Colors.collab2
                      : item?.type == 'contentlab'
                      ? Colors.collab3
                      : item?.type == 'barteroffer'
                      ? Colors.collab1
                      : item?.type == 'Paid+'
                      ? Colors.collab2
                      : null,
                  paddingHorizontal: normalize(7),
                  justifyContent: 'center',
                  height: normalize(19),
                  marginRight: normalize(6),
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(10),
                  }}>
                  {item?.type == 'barteroffer'
                    ? 'Barter'
                    : item?.type == 'paid+gift'
                    ? 'Paid'
                    : item?.type}
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  backgroundColor: Colors.white,
                  height: normalize(3),
                  width: normalize(3),
                  borderRadius: normalize(3 / 2),
                  marginRight: normalize(6),
                }}
              />
              <Image
                source={
                  item?.platformType === 'Instagram'
                    ? Icons.insta
                    : Icons.youtube
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
                  marginRight: normalize(6),
                }}
              />
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(10),
                }}>
                {moment(item?.campaignDate).format('DD MMM')}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: normalize(7),
              marginBottom: normalize(9),
            }}>
            {item?.type == 'Barter' && item?.discount == '' ? (
              <Image
                source={
                  item?.productImageUrl == ''
                    ? Images.dyning
                    : {uri: item?.productImageUrl}
                }
                style={{
                  height: normalize(70),
                  width: normalize(70),
                }}
                resizeMode="contain"
              />
            ) : null}

            {item?.discount != '' ? (
              <View>
                <ImageBackground
                  source={Images.dyning}
                  style={{
                    height: normalize(50),
                    width: normalize(70),
                  }}
                  imageStyle={{borderRadius: normalize(5)}}
                  resizeMode="cover"
                />
                <View
                  style={{
                    backgroundColor: Colors.white,
                    height: normalize(16),
                    alignSelf: 'flex-start',
                    marginTop: normalize(6),
                    borderRadius: normalize(3),
                    paddingHorizontal: normalize(3),
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: Colors.black,
                      fontSize: normalize(10),
                      marginStart: normalize(3),
                    }}>
                    10% Off
                  </Text>
                </View>
              </View>
            ) : null}

            <View
              style={{
                marginStart:
                  item?.type == 'Barter' || item?.type == 'barteroffer'
                    ? normalize(12)
                    : normalize(0),
                justifyContent: 'space-between',
                width:
                  item?.type == 'Barter' || item?.discount != ''
                    ? '75%'
                    : '100%',
              }}>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(12),
                  fontFamily: Fonts.Inter_SemiBold,
                }}>
                {item?.type == 'Barter' && item?.discount != ''
                  ? item?.barterOfferTitle?.substring(0, 48)
                  : item?.type == 'Barter'
                  ? item?.barterProductTitle?.substring(0, 28)
                  : item?.type == 'Paid+'
                  ? item?.paidCampaignName?.substring(0, 28)
                  : item?.paidCampaignName?.substring(0, 28)}
              </Text>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(11),
                  fontFamily: Fonts.Inter_Regular,
                  width: '80%',
                  marginTop: normalize(6),
                }}>
                {item?.type == 'Barter' && item?.discount != ''
                  ? 'From ' +
                    moment(item?.fromDate).format('DD MMM') +
                    ' to ' +
                    moment(item?.toDate).format('DD MMM')
                  : item?.type == 'Barter'
                  ? item?.barterProductDesc?.substring(0, 78)
                  : item?.type == 'Paid'
                  ? item?.paidCampaignDesc?.substring(0, 80)
                  : ''}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  // backgroundColor:Colors.red,
                  marginTop:
                    item?.type == 'Barter'
                      ? normalize(7)
                      : item?.type == 'Paid'
                      ? normalize(7)
                      : normalize(0),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={Icons.document_upload}
                    style={style.profileCollabration}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: normalize(12),
                      fontFamily: Fonts.Inter_SemiBold,
                    }}>
                    16
                  </Text>
                </View>
                {item?.type == 'Barter' || item?.discount !== '' ? null : (
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: normalize(12),
                      fontFamily: Fonts.Inter_SemiBold,
                    }}>
                    $12
                  </Text>
                )}
              </View>
            </View>
          </View>
          {item?.type == 'Paid+' ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: normalize(10),
              }}>
              <ImageBackground
                source={Images.dyning}
                style={{
                  height: normalize(30),
                  width: normalize(30),
                }}
                imageStyle={{borderRadius: normalize(5)}}
                resizeMode="cover"
              />
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(10),
                  fontFamily: Fonts.Inter_SemiBold,
                  marginStart: normalize(6),
                }}>
                {item?.paidCampaignDesc}
              </Text>
            </View>
          ) : null}
        </TouchableOpacity>
      </>
    );
  };
  useEffect(() => {
    const unsuscribe = props.navigation.addListener('focus', payload => {
      console.log('typeSelect', constant.typeSelect);

      // dispatch(getSelectSuccess());
    });
    return () => {
      unsuscribe();
    };
  }, []);

  useEffect(() => {
    const unsuscribe = props.navigation.addListener('focus', payload => {
      // dispatch(getSelectSuccess());

      var obj =
        'creatorID=' +
        AuthReducer?.creatorID +
        '&' +
        'tabType=' +
        constant.typeSelect;
      console.log('res select', HomeReducer?.collabSelectResponse);
      try {
        connectionrequest()
          .then(() => {
            dispatch(getHomeCollaborationRequest(obj));
          })
          .catch(err => {
            console.log(err);
            Toast('Please connect to internet');
          });
      } catch (e) {
        console.log(e);
      }
    });
    return () => {
      unsuscribe();
    };
  }, []);
  function logout() {
    try {
      dispatch(logoutRequest());
    } catch (e) {
      console.log(e);
    }
  }
  async function updateData(data) {
    var obj = 'creatorID=' + AuthReducer?.creatorID + '&' + 'tabType=' + data;
    console.log('res select', HomeReducer?.collabSelectResponse);
    try {
      connectionrequest()
        .then(() => {
          dispatch(getHomeCollaborationRequest(obj));
        })
        .catch(err => {
          console.log(err);
          Toast('Please connect to internet');
        });
    } catch (e) {
      console.log(e);
    }
  }
  if (status == '' || HomeReducer.status != status) {
    switch (HomeReducer.status) {
      case 'homeCollab/getHomeCollaborationRequest':
        status = HomeReducer.status;
        break;

      case 'homeCollab/getHomeCollaborationSuccess':
        status = HomeReducer.status;
        console.log('hgfgcvcb 1390', constant.typeSelect);
        constant.typeSelect === 'Active'
          ? setDataActive([...(HomeReducer?.collaborationResponse ?? '')])
          : constant.typeSelect == 'Invite'
          ? setDataInvite([...(HomeReducer?.collaborationResponse ?? '')])
          : constant.typeSelect == 'Offer'
          ? setDataOffer([...(HomeReducer?.collaborationResponse ?? '')])
          : constant.typeSelect == 'Completed'
          ? setDataComplete([...(HomeReducer?.collaborationResponse ?? '')])
          : null;

        break;
      case 'homeCollab/getHomeCollaborationFailure':
        status = HomeReducer.status;
        break;
      case 'homeCollab/getSelectRequest':
        status = HomeReducer.status;
        // console.log('hgfgcvcb 1390', HomeReducer?.collaborationResponse);
        // setSelected(HomeReducer?.collabSelectResponse);
        // updateData(HomeReducer?.collabSelectResponse);
        break;
    }
  }

  if (status == '' || CollaborationReducer.status != status) {
    switch (CollaborationReducer.status) {
      case 'collaboration/getInviteRequest':
        status = CollaborationReducer.status;
        break;

      case 'collaboration/getInviteSuccess':
        status = CollaborationReducer.status;
        console.log('hgfgcvcb');
        // setDataActive([...CollaborationReducer?.inviteResponse]);
        break;
      case 'collaboration/getInviteFailure':
        status = CollaborationReducer.status;
        break;
    }
  }

  function collaboration(tabType) {
    var obj =
      'creatorID=' + AuthReducer?.creatorID + '&' + 'tabType=' + tabType;
    try {
      connectionrequest()
        .then(() => {
          dispatch(getHomeCollaborationRequest(obj));
        })
        .catch(err => {
          console.log(err);
          Toast('Please connect to internet');
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <MyStatusBar barStyle={'light-content'} backgroundColor={Colors.black} />
      <HeaderData
        backScreen={() => setShow(!isShow)}
        title={'Collaboration'}
        notifiPress={() => props?.navigation.navigate('Notifications')}
        profilePress={() => props?.navigation.navigate('Chat')}
      />

      <View style={style.container}>
        {/* <ScrollView> */}
        <>
          <View style={style.containerBody}>
            <View
              style={{
                marginTop: normalize(0),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  // justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  style={[
                    {
                      ...style.btn,
                      backgroundColor:
                        isSelected == 'Active' ? Colors.white : Colors.black,
                    },
                  ]}
                  activeOpacity={0.9}
                  onPress={() => {
                    collaboration('Active');
                    setSelected('Active');
                    constant.typeSelect = 'Active';
                    // dispatch(getSelectRequest('Active'));
                  }}>
                  <View
                    style={{
                      alignItems: 'center',
                    }}>
                    <Text
                      style={[
                        {
                          ...style.text4,
                          color:
                            isSelected == 'Active'
                              ? Colors.black
                              : Colors.white,
                        },
                      ]}>
                      Active
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    {
                      ...style.btn,
                      backgroundColor:
                        isSelected == 'Invite' ? Colors.white : Colors.black,
                      marginStart: normalize(9),
                    },
                  ]}
                  activeOpacity={0.9}
                  onPress={() => {
                    setSelected('Invite'),
                      // dispatch(getSelectRequest('Invite')),
                      (constant.typeSelect = 'Invite');
                    collaboration('Invite');
                  }}>
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={[
                        {
                          ...style.text4,
                          color:
                            isSelected == 'Invite'
                              ? Colors.black
                              : Colors.white,
                        },
                      ]}>
                      Invite
                    </Text>
                    {dataInvite?.length > 0 ? (
                      <LinearGradient
                        colors={['#B7F9CF', '#B7F9CF', '#EAF7A7', '#EAF7A7']}
                        style={{
                          height: normalize(14),
                          width: normalize(14),
                          borderRadius: normalize(9),
                          marginStart: normalize(7),
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: normalize(9),
                            color: Colors.black,
                            fontFamily: Fonts.Inter_SemiBold,
                          }}>
                          {dataInvite.length}
                        </Text>
                      </LinearGradient>
                    ) : null}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    {
                      ...style.btn,
                      backgroundColor:
                        isSelected == 'Offer' ? Colors.white : Colors.black,
                      marginStart: normalize(9),
                    },
                  ]}
                  activeOpacity={0.9}
                  onPress={() => {
                    setSelected('Offer'), collaboration('Offer');
                    constant.typeSelect = 'Offer';
                  }}>
                  <View
                    style={{
                      alignItems: 'center',
                    }}>
                    <Text
                      style={[
                        {
                          ...style.text4,
                          color:
                            isSelected == 'Offer' ? Colors.black : Colors.white,
                        },
                      ]}>
                      Offer
                    </Text>
                  </View>

                  {dataOffer?.length > 0 ? (
                    <LinearGradient
                      colors={['#B7F9CF', '#B7F9CF', '#EAF7A7', '#EAF7A7']}
                      style={{
                        height: normalize(14),
                        width: normalize(14),
                        borderRadius: normalize(9),
                        marginStart: normalize(7),
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: normalize(9),
                          color: Colors.black,
                          fontFamily: Fonts.Inter_SemiBold,
                        }}>
                        {dataOffer.length}
                      </Text>
                    </LinearGradient>
                  ) : null}
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    {
                      ...style.btn,
                      backgroundColor:
                        isSelected == 'Completed' ? Colors.white : Colors.black,
                      marginStart: normalize(9),
                    },
                  ]}
                  activeOpacity={0.9}
                  onPress={() => {
                    constant.typeSelect = 'Completed';
                    collaboration('Completed');
                    setSelected('Completed');
                  }}>
                  <View
                    style={{
                      alignItems: 'center',
                    }}>
                    <Text
                      style={[
                        {
                          ...style.text4,
                          color:
                            isSelected == 'Completed'
                              ? Colors.black
                              : Colors.white,
                        },
                      ]}>
                      Completed
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            {isSelected == 'Active' ? (
              <>
                <FlatList
                  data={dataActive}
                  renderItem={renderItemActive}
                  shouldCancelWhenOutside={false}
                  keyExtractor={item => item.toString()}
                  style={{}}
                  ListEmptyComponent={
                    'homeCollab/getHomeCollaborationRequest' !=
                    HomeReducer?.status ? (
                      <EmptyComponent
                        val={'Coming Soon'}
                        height={normalize(190)}
                        imgHeight={normalize(90)}
                        imgWidth={normalize(90)}
                      />
                    ) : null
                  }
                />
              </>
            ) : null}

            {isSelected == 'Invite' ? (
              <>
                <FlatList
                  data={dataInvite}
                  renderItem={renderItemInvite}
                  shouldCancelWhenOutside={false}
                  keyExtractor={item => item.toString()}
                  style={{}}
                  ListEmptyComponent={
                    'homeCollab/getHomeCollaborationRequest' !=
                    HomeReducer?.status ? (
                      <EmptyComponent
                        val={'Coming Soon'}
                        height={normalize(190)}
                        imgHeight={normalize(90)}
                        imgWidth={normalize(90)}
                      />
                    ) : null
                  }
                />
              </>
            ) : null}
            {isSelected == 'Offer' ? (
              <>
                <FlatList
                  data={dataOffer}
                  renderItem={renderItemOffer}
                  shouldCancelWhenOutside={false}
                  keyExtractor={item => item.toString()}
                  style={{}}
                  ListEmptyComponent={
                    'homeCollab/getHomeCollaborationRequest' !=
                    HomeReducer?.status ? (
                      <EmptyComponent
                        val={'Coming Soon'}
                        height={normalize(190)}
                        imgHeight={normalize(90)}
                        imgWidth={normalize(90)}
                      />
                    ) : null
                  }
                />
              </>
            ) : null}
            {isSelected == 'Completed' ? (
              <>
                {dataComplete?.length > 0 ? (
                  <FlatList
                    data={dataComplete}
                    renderItem={renderItemCompleted}
                    shouldCancelWhenOutside={false}
                    keyExtractor={item => item.toString()}
                    style={{}}
                  />
                ) : (
                  <EmptyComponent
                    val={'Coming Soon'}
                    height={normalize(190)}
                    imgHeight={normalize(90)}
                    imgWidth={normalize(90)}
                  />
                )}
              </>
            ) : null}
          </View>
        </>
        {/* </ScrollView> */}
      </View>
      <Modal
        isVisible={isShow}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        backdropTransitionOutTiming={0}
        hideModalContentWhileAnimating={true}
        style={{width: '100%', alignSelf: 'center', margin: 0}}
        animationInTiming={800}
        animationOutTiming={1000}
        backdropColor={'#000000'}
        onBackButtonPress={() => onBackdropPress()}
        onBackdropPress={() => {
          setShow(false), setSelect('');
        }}>
        {/* <ScrollView> */}
        <View
          style={{
            flex: 1,
            backgroundColor: '#ddd',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#181818',
            borderTopLeftRadius: normalize(17),
            borderTopRightRadius: normalize(17),
            maxHeight: normalize(250),
            paddingLeft: normalize(20),
            paddingBottom: normalize(15),
            paddingTop: normalize(19),
            height: normalize(270),
          }}>
          <LinearGradient
            colors={
              isSelect == 'Account'
                ? ['#B7F9CF', '#EAF7A7', '#EAF7A7']
                : ['#0000', '#0000', '#0000']
            }
            style={[
              {
                borderRadius: normalize(3),
              },
            ]}>
            <TouchableOpacity
              style={[
                {
                  ...style.modelView,
                  marginTop: normalize(0),
                  // backgroundColor: isSelect == 'Account' ? '#C4FD65' : '#0000',
                },
              ]}
              onPress={() => {
                props.navigation.navigate('Account'), setShow(false);
                // setocuc;
                setSelect('Account');
                console.log('kfhdsfgdsh');
              }}>
              <Image
                source={Icons.useracc}
                style={[
                  {
                    ...style.imagem,
                    tintColor:
                      isSelect != 'Account' ? Colors.white : Colors.black,
                  },
                ]}
              />
              <Text
                style={{
                  fontSize: normalize(16),
                  fontFamily: Fonts.Inter_Medium,
                  color: isSelect != 'Account' ? Colors.white : '#434540',
                }}>
                Account
              </Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={
              isSelect == 'PushNotification'
                ? ['#B7F9CF', '#EAF7A7', '#EAF7A7']
                : ['#0000', '#0000', '#0000']
            }
            style={{
              borderRadius: normalize(3),
            }}>
            <TouchableOpacity
              style={[
                {
                  ...style.modelView,
                  marginTop: normalize(0),
                },
              ]}
              onPress={() => {
                props.navigation.navigate('PushNotifications'), setShow(false);
                setSelect('PushNotification');
              }}>
              <Image
                source={Icons.notificationacc}
                style={[
                  {
                    ...style.imagem,
                    tintColor:
                      isSelect != 'PushNotification'
                        ? Colors.white
                        : Colors.black,
                  },
                ]}
              />
              <Text
                style={{
                  fontSize: normalize(16),
                  fontFamily: Fonts.Inter_Medium,
                  color:
                    isSelect != 'PushNotification' ? Colors.white : '#434540',
                }}>
                Push Notification
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          {/* <LinearGradient
            colors={
              isSelect == 'Privacy'
                ? ['#B7F9CF', '#EAF7A7', '#EAF7A7']
                : ['#0000', '#0000', '#0000']
            }
            style={{
              borderRadius: normalize(3),
            }}>
            <TouchableOpacity
              style={[
                {
                  ...style.modelView,
                  marginTop: 0,
                },
              ]}
              onPress={() => {
                props.navigation.navigate('PrivacyPolicy'), setShow(false);
                setSelect('Privacy');
              }}>
              <Image
                source={Icons.documentuploadacc}
                style={[
                  {
                    ...style.imagem,
                    tintColor:
                      isSelect != 'Privacy' ? Colors.white : Colors.black,
                  },
                ]}
              />
              <Text
                style={{
                  fontSize: normalize(16),
                  fontFamily: Fonts.Inter_Medium,
                  color: isSelect != 'Privacy' ? Colors.white : '#434540',
                }}>
                Privacy Policy
              </Text>
            </TouchableOpacity>
          </LinearGradient> */}
          <LinearGradient
            colors={
              isSelect == 'Terms'
                ? ['#B7F9CF', '#EAF7A7', '#EAF7A7']
                : ['#0000', '#0000', '#0000']
            }
            style={{
              borderRadius: normalize(3),
            }}>
            <TouchableOpacity
              style={[
                {
                  ...style.modelView,
                  marginTop: normalize(0),
                },
              ]}
              onPress={() => {
                props.navigation.navigate('Terms'), setShow(false);
                setSelect('Terms');
              }}>
              <Image
                source={Icons.elementacc}
                style={[
                  {
                    ...style.imagem,
                    tintColor:
                      isSelect != 'Terms' ? Colors.white : Colors.black,
                  },
                ]}
              />
              <Text
                style={{
                  fontSize: normalize(16),
                  fontFamily: Fonts.Inter_Medium,
                  color: isSelect != 'Terms' ? Colors.white : '#434540',
                }}>
                Terms of Use
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          {/* <LinearGradient
            colors={
              isSelect == 'FAQs'
                ? ['#B7F9CF', '#EAF7A7', '#EAF7A7']
                : ['#0000', '#0000', '#0000']
            }
            style={{
              borderRadius: normalize(3),
            }}>
            <TouchableOpacity
              style={[
                {
                  ...style.modelView,
                  marginTop: normalize(0),
                },
              ]}
              onPress={() => {
                // props.navigation.navigate('FAQ’s'),
                setShow(false);
                setSelect('FAQs');
              }}>
              <Image
                source={Icons.useracc}
                style={[
                  {
                    ...style.imagem,
                    tintColor: isSelect != 'FAQs' ? Colors.white : Colors.black,
                  },
                ]}
              />
              <Text
                style={{
                  fontSize: normalize(16),
                  fontFamily: Fonts.Inter_Medium,
                  color: isSelect != 'FAQs' ? Colors.white : '#434540',
                }}>
                FAQ’s
              </Text>
            </TouchableOpacity>
          </LinearGradient> */}
          <LinearGradient
            colors={
              isSelect == 'Contact'
                ? ['#B7F9CF', '#EAF7A7', '#EAF7A7']
                : ['#0000', '#0000', '#0000']
            }
            style={{
              borderRadius: normalize(3),
            }}>
            <TouchableOpacity
              style={[
                {
                  ...style.modelView,
                  marginTop: normalize(0),
                },
              ]}
              onPress={() => {
                props.navigation.navigate('ContactUsSend'), setShow(false);
                setSelect('Contact');
              }}>
              <Image
                source={Icons.useracc}
                style={[
                  {
                    ...style.imagem,
                    tintColor:
                      isSelect != 'Contact' ? Colors.white : Colors.black,
                  },
                ]}
              />
              <Text
                style={{
                  fontSize: normalize(16),
                  fontFamily: Fonts.Inter_Medium,
                  color: isSelect != 'Contact' ? Colors.white : '#434540',
                }}>
                Contact Us
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            colors={
              isSelect == 'Logout'
                ? ['#B7F9CF', '#EAF7A7', '#EAF7A7']
                : ['#0000', '#0000', '#0000']
            }
            style={{
              borderRadius: normalize(3),
              marginTop: normalize(29),
            }}>
            <TouchableOpacity
              style={[{...style.modelView, marginTop: normalize(0)}]}
              onPress={() => {
                // props.navigation.navigate('Login');
                logout();
                setSelect('Logout');
              }}>
              <Image
                source={Icons.useracc}
                style={[
                  {
                    ...style.imagem,
                    tintColor:
                      isSelect != 'Logout' ? Colors.white : Colors.black,
                  },
                ]}
              />
              <Text
                style={{
                  fontSize: normalize(16),
                  fontFamily: Fonts.Inter_Medium,
                  color: isSelect != 'Logout' ? Colors.white : '#434540',
                }}>
                Log out
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        {/* </ScrollView> */}
      </Modal>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    flex: 1,
  },
  containerBody: {
    paddingHorizontal: normalize(10),
    marginTop: normalize(12),
    flex: 1,
    marginBottom: normalize(43),
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
    height: normalize(12),
    width: normalize(12),
    marginRight: normalize(7),
  },
  profileCollabr: {
    height: normalize(18),
    width: normalize(18),
  },
  text4: {
    color: Colors.white,
    fontSize: normalize(10),
  },
  btn: {
    flexDirection: 'row',
    borderColor: Colors.borderColor,
    borderWidth: 1,
    borderRadius: normalize(3),
    alignItems: 'center',
    paddingHorizontal: normalize(12),
    height: normalize(27),
  },
  modelView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(9),
    paddingVertical: normalize(7),
    paddingHorizontal: normalize(7),
    marginEnd: normalize(18),
  },
  imagem: {
    height: normalize(16),
    width: normalize(16),
    tintColor: Colors.black,
    marginEnd: normalize(9),
  },
  modelView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(9),
    paddingVertical: normalize(7),
    paddingHorizontal: normalize(7),
    marginEnd: normalize(18),
  },
});
export default React.memo(Collaboration);
