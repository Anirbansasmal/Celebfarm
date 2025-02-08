import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors, Fonts} from '../../../../themes/Themes';
import normalize from '../../../../utils/helpers/dimen';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icons from '../../../../themes/icons';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../../../utils/helpers/Loader';
import connectionrequest from '../../../../utils/helpers/NetInfo';
import ButtonLinear from '../../../../Components/Button Linear';
import HeaderCommon from '../../../../Components/HeaderCommon';
import ImageProfile from '../../../../Components/ImageProfile';
import Image from 'react-native-fast-image';
import Images from '../../../../themes/Images';
import moment from 'moment';
import Button from '../../../../Components/Button';
import {no} from 'rn-emoji-keyboard';
import {updateContentRequest} from '../../../../redux/reducers/CollaborationReducer';
var status = '';

function YoutubeContentPer(props) {
  const [isShow, setShow] = useState('1');
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const CollaborationReducer = useSelector(state => state.CollaborationReducer);
  const [imageArr, setImageArr] = useState([]);
  const [isSelected, setSelected] = useState(false);
  const [inprogress, setInProgress] = useState();
  const [instaContent, setInstaContent] = useState();

  useEffect(() => {
    // content();
    setInProgress(props?.route?.params?.inprogress);
    setInstaContent(props?.route?.params?.data);

    console.log('inprogress', props?.route?.params?.data);
  }, []);
  async function instaDetails() {
    try {
      connectionrequest()
        .then(() => {
          // dispatch()
        })
        .catch(err => {});
    } catch (error) {}
  }

  const renderItemImage = ({item, index}) => {
    console.log('item', item);
    return <TouchableOpacity></TouchableOpacity>;
  };

  async function liveContent() {
    var obj = {
      id: props?.route?.params?.deliverablesEdit?.id,
      creatorID: AuthReducer?.creatorID,
      campaignID: props?.route?.params?.deliverablesEdit?.campaignID,
      Status: 'Live',
      deliverableType: props?.route?.params?.deliverable,
      IGMediaID: null,
      YoutubeMediaID:instaContent?.id,
    };
    console.log(obj);
    try {
      connectionrequest()
        .then(() => {
          dispatch(updateContentRequest(obj));
        })
        .catch(err => {
          console.log(err);
          Toast('Please connect to internet');
        });
    } catch (e) {
      console.log(e);
    }
  }

  if (status == '' || CollaborationReducer.status != status) {
    switch (CollaborationReducer.status) {
      case 'collaboration/uploadContentRequest':
        status = CollaborationReducer.status;
        break;
      case 'collaboration/uploadContentSuccess':
        status = CollaborationReducer.status;
        arr1 = [];
        props.navigation.navigate('Active');
        break;
      case 'collaboration/uploadContentFailure':
        status = CollaborationReducer.status;
        break;
    }
  }

  return (
    <>
      <Loader visible={CollaborationReducer?.status== 'collaboration/uploadContentRequest'} />
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.black}}>
        <HeaderCommon
          picTitle={true}
          home={true}
          back={true}
          backgroundColor={'#000'}
          title={'Content'}
          heardetext={Colors.white}
          headerHeight={Platform.OS == 'ios' ? normalize(40) : normalize(41)}
          textfontSize={normalize(16)}
          fontFamily={Fonts.Inter_Bold}
          backScreen={() => {
            props.navigation.goBack();
          }}
          notifiPress={() => props.navigation.navigate('Notifications')}
          profilePress={() => props.navigation.navigate('Chat')}
          textColor={'#ffff'}
          {...props}
        />
        <ScrollView nestedScrollEnabled={true}>
          <View style={{marginTop: normalize(12), margin: normalize(12)}}>
            <View
              style={{
                borderWidth: normalize(1),
                borderColor: '#2A2C27',
                padding: normalize(8),
                borderRadius: normalize(5),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <ImageProfile
                    alignItems={'center'}
                    height={normalize(29)}
                    width={normalize(29)}
                    borderRadius={normalize(19)}
                    backgroundColor={Colors.white}
                    brandImageUrl={inprogress?.brandImageUrl}
                    imgheight={normalize(27)}
                    imgwidth={normalize(27)}
                    justifyContent={'center'}
                  />
                  <View style={{marginStart: normalize(12)}}>
                    <Text
                      style={[
                        {
                          ...style.text2,
                          fontSize: normalize(10),
                          fontFamily: Fonts.Inter_Bold,
                        },
                      ]}>
                      {inprogress?.brandName}
                    </Text>
                    <Text style={[{...style.text6, fontSize: normalize(10)}]}>
                      {moment(inprogress?.campaignDate)?.format('DDD')} days
                    </Text>
                  </View>
                </View>
                <Image
                  source={
                    inprogress?.platform == 'Instagram'
                      ? Icons.insta
                      : Icons.youtube
                  }
                  style={style.profileCollabration}
                  resizeMode="contain"
                />
              </View>
              <Image
                source={{uri: instaContent?.media_url}}
                style={{
                  height: normalize(130),
                  width: normalize(Dimensions.get('window').width / 1.5),
                  marginEnd: normalize(6),
                  marginTop: normalize(16),
                  borderRadius: normalize(3),
                }}
                imageStyle={{}}
              />
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(12),
                  marginTop: normalize(18),
                }}>
                {instaContent?.caption}
              </Text>
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            alignContent: 'center',
          }}>
          <View
            style={{
              // width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
              backgroundColor: Colors.bcolor,
              padding: normalize(12),
              borderRadius: normalize(5),
              marginBottom: normalize(12),
              // justifyContent: 'space-between',
            }}>
            <Image
              source={Icons.warning2}
              style={{height: normalize(25), width: normalize(25)}}
              resizeMode="contain"
            />
            <Text
              style={{
                color: Colors.white,
                fontSize: normalize(12),
                width: '80%',
                marginStart: normalize(12),
              }}>
              Only select the content corresponding to the deliverable.
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: normalize(12),
              width: '100%',
              justifyContent: 'space-between',
            }}>
            <Button
              width={'38%'}
              height={normalize(27)}
              backgroundColor={Colors.bcolor}
              title={'Go Back'}
              textColor={Colors.white}
              titlesingle={true}
              borderRadius={normalize(25)}
              marginHorizontal={normalize(5)}
              onPress={() => {
                props.navigation.goBack();
                props.navigation.goBack();
                props.navigation.goBack();
                props.navigation.goBack();
              }}
            />
            <ButtonLinear
              width={normalize(120)}
              height={normalize(27)}
              backgroundColor={Colors.btnColor}
              title={'Mark Live'}
              textColor={Colors.black}
              titlesingle={true}
              borderRadius={normalize(25)}
              marginHorizontal={normalize(5)}
              onPress={() => {
                liveContent()
              }}
            />
          </View>
        </View>
        {/* </SafeAreaView> */}
      </SafeAreaView>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    paddingHorizontal: normalize(10),
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
  social: {
    height: normalize(14),
    width: normalize(14),
    marginRight: normalize(7),
  },
  profileCollabr: {
    height: normalize(12),
    width: normalize(12),
  },
  modelView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(9),
    paddingVertical: normalize(7),
    paddingHorizontal: normalize(7),
    marginEnd: normalize(18),
  },
  text4: {
    color: Colors.white,
    fontSize: normalize(12),
    alignSelf: 'center',
    color: '#77C3FD',
  },
  cardtop: {
    borderRadius: normalize(4),
    borderWidth: normalize(1),
    borderColor: '#2A2C27',
    paddingHorizontal: normalize(9),
    marginTop: normalize(12),
    backgroundColor: Colors.bcolor,
  },
  btn: {
    flexDirection: 'row',
    borderColor: Colors.grey,
    borderWidth: 1,
    borderRadius: normalize(7),
    alignItems: 'center',
    paddingHorizontal: normalize(7),
    height: normalize(29),
    marginRight: normalize(7),
  },
});

export default YoutubeContentPer;
