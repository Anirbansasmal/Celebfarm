import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors, Fonts} from '../../../themes/Themes';
import normalize from '../../../utils/helpers/dimen';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icons from '../../../themes/icons';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../../utils/helpers/Loader';
import connectionrequest from '../../../utils/helpers/NetInfo';
import ButtonLinear from '../../../Components/Button Linear';
import HeaderCommon from '../../../Components/HeaderCommon';
import showErrorAlert from '../../../utils/helpers/Toast';
import {getInstaFeedDetails} from '../../../utils/helpers/YoutubeInstagramConnect';
import {
  getInstagramUserDetailRequest,
  getYoutubeUserDetailRequest,
} from '../../../redux/reducers/ProfileReducer';
import Image from 'react-native-fast-image';
import Images from '../../../themes/Images';
import EmptyComponent from '../../../Components/EmptyComponent';
import CheckBox from '../../../Components/CheckBox';
var status = '';

function InstaContent(props) {
  const [isShow, setShow] = useState('1');
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const [imageArr, setImageArr] = useState([]);
  const [contentinsta, setContentinsta] = useState();
  const [selectIndex, setSelIndex] = useState(null);
  const [isSelected, setSelected] = useState(false);

  useEffect(() => {
    instaDetails();
  }, []);

  async function instaDetails() {
    try {
      let obj = 'creatorID=' + AuthReducer?.creatorID;
      connectionrequest()
        .then(() => {
          dispatch(getInstagramUserDetailRequest(obj));
        })
        .catch(err => {
          console.log(err);
          showErrorAlert('Please connect to internet');
        });
    } catch (error) {}
  }
  async function content(item) {
    console.log(ProfileReducer?.instagramuserResponse?.result?.token);
    console.log(item);

    var arr = [];
    try {
      getInstaFeedDetails(
        item == 'Posts'
          ? 'post'
          : item == 'Reels'
          ? 'reel'
          : item == 'Stories'
          ? 'stories'
          : item,
        ProfileReducer?.instagramuserResponse?.result?.igid,
        ProfileReducer?.instagramuserResponse?.result?.token,
        60,
      )
        .then(res => {
          console.log(res);
          res?.data?.data?.map(itempst => {
            if (
              itempst?.media_type == 'IMAGE'
                ? item?.toLowerCase() == 'posts'
                  ? true
                  : false
                : false
            ) {
              arr.push(itempst);
            } else if (
              itempst?.media_type == 'VIDEO'
                ? item?.toLowerCase() == 'reels'? true : false
                : false
            ) {
              arr.push(itempst);
            }else{
              arr.push(itempst);
            }
          });
          setImageArr([...arr]);
        })
        .catch(err => {
          console.log(err);
          showErrorAlert('Please connect to internet');
        });
    } catch (e) {
      console.log(e);
    }
  }

  const renderItemImage = ({item, index}) => {
    console.log('item', item);
    return (
      <TouchableOpacity
        onPress={() => {
          setContentinsta(item), setSelIndex(index);
        }}
        activeOpacity={0.9}>
        <Image
          source={{uri: item?.media_url}}
          style={{
            height: normalize(100),
            width: normalize(Dimensions.get('window').width / 4.6),
            marginEnd: normalize(6),
            marginTop: normalize(6),
            borderRadius: normalize(6),
          }}
          imageStyle={{borderRadius: normalize(3)}}>
          <View style={{position: 'absolute', end: 10, top: 10}}>
            <CheckBox
              CheckBox={
                index == selectIndex ? Icons.radiocheck : Icons.radio_uncheck
              }
              active={index == selectIndex ? true : false}
              onChange={() => setSelIndex(index)}
            />
          </View>
        </Image>
      </TouchableOpacity>
    );
  };

  if (status == '' || ProfileReducer.status != status) {
    switch (ProfileReducer.status) {
      case 'Profile/getInstagramUserDetailRequest':
        status = ProfileReducer.status;
        break;
      case 'Profile/getInstagramUserDetailSuccess':
        status = ProfileReducer.status;
        console.log('hgfgcvcb');
        // content('Posts');
        break;
      case 'Profile/getInstagramUserDetailFailure':
        status = ProfileReducer.status;
        break;
    }
  }
  function commonButton(item) {
    return (
      <>
        <TouchableOpacity
          style={[
            {
              ...style.btn,
              backgroundColor: isSelected == item ? Colors.white : Colors.black,
            },
          ]}
          activeOpacity={0.9}
          onPress={() => {
            content(item);
            setSelected(item);
            setSelIndex(null);
          }}>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Text
              style={[
                {
                  ...style.text4,
                  color: isSelected == item ? Colors.black : Colors.white,
                },
              ]}>
              {item}
            </Text>
          </View>
        </TouchableOpacity>
      </>
    );
  }
  return (
    <>
      <Loader visible={false} />
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.black}}>
        <HeaderCommon
          picTitle={true}
          home={true}
          back={true}
          backgroundColor={'#000'}
          title={'Spotlight'}
          heardetext={Colors.white}
          headerHeight={Platform.OS == 'ios' ? normalize(40) : normalize(41)}
          textfontSize={normalize(16)}
          fontFamily={Fonts.Inter_Bold}
          // marginStart={normalize(33)}
          backScreen={() => {
            props.navigation.goBack();
          }}
          notifiPress={() => props.navigation.navigate('Notifications')}
          profilePress={() => props.navigation.navigate('Chat')}
          textColor={'#ffff'}
          {...props}
        />
        <ScrollView nestedScrollEnabled={true}>
          <View style={style.container}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: normalize(9),
                alignItems: 'center',
              }}>
              <View style={{flexDirection: 'row'}}>
                {commonButton('Posts')}
                {commonButton('Reels')}
                {commonButton('Stories')}
              </View>
              <View style={{}}>
                <Image
                  source={Icons.insta}
                  style={{height: normalize(20), width: normalize(14)}}
                  resizeMode="contain"
                />
              </View>
            </View>
            <View
              style={{
                marginTop: normalize(12),
              }}>
              <FlatList
                data={imageArr}
                renderItem={renderItemImage}
                numColumns={3}
                keyExtractor={index => index?.toString()}
                ListEmptyComponent={
                  <EmptyComponent
                    height={normalize(155)}
                    imgHeight={normalize(90)}
                    width={normalize(120)}
                    val={'No instagram content found'}
                  />
                }
              />
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          }}>
          <ButtonLinear
            width={'90%'}
            height={normalize(37)}
            alignSelf={'center'}
            backgroundColor={Colors.btnColor}
            title={'Display in spotlight'} //
            textColor={Colors.black}
            titlesingle={true}
            borderRadius={normalize(25)}
            marginHorizontal={normalize(5)}
            marginTop={normalize(22)}
            onPress={() => {}}
          />
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

export default InstaContent;
