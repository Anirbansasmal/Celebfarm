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
import {Colors, Fonts} from '../../../themes/Themes';
import normalize from '../../../utils/helpers/dimen';
import Button from '../../../Components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icons from '../../../themes/icons';
import Images from '../../../themes/Images';
import {ScrollView} from 'react-native-gesture-handler';
import TextArea from '../../../Components/TextArea';
import ButtonLinear from '../../../Components/Button Linear';
import HeaderCommon from '../../../Components/HeaderCommon';
import connectionrequest from '../../../utils/helpers/NetInfo';
import {useDispatch, useSelector} from 'react-redux';
import {getUploadImageRequest} from '../../../redux/reducers/CollaborationReducer';
import {launchImageLibrary} from 'react-native-image-picker';
import {getContactusRequest} from '../../../redux/reducers/ProfileReducer';
import showErrorAlert from '../../../utils/helpers/Toast';
var status = '';

function ContactUsSend(props) {
  const [contact, setContact] = useState('');
  const [shot, setShot] = useState('');
  const [selImage, setSelectedImage] = useState('');
  const [selected, setSelected] = useState(false);

  const dispatch = useDispatch();
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const CollaborationReducer = useSelector(state => state.CollaborationReducer);
  async function contactusSave() {
    console.log('contactus', props?.route?.params?.contact);
    try {
      var obj = {
        CreatorID: AuthReducer?.creatorID,
        ContactID: props?.route?.params?.contact,
        Details: contact,
        // ImageName: CollaborationReducer?.,
      };
      connectionrequest()
        .then(() => {
          dispatch(getContactusRequest(obj));
        })
        .then(() => {});
    } catch (err) {
      console.log(err);
    }
  }

  function pickupGallery() {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 400,
      maxWidth: 400,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        var imageUri = {
          image: response.assets[0].base64,
          name: response.assets?.[0]?.fileName,
          type: response.assets?.[0]?.type,
        };
        setSelectedImage(imageUri);
        setSelected(false);
        setTimeout(() => {
          uploadImage(imageUri);
        }, 2000);
      }
    });
  }

  async function uploadImage(imageObj) {
    // console.log('nfmdf',imageObj)
    var obj = {
      id: AuthReducer?.creatorID.toString(),
      folderName: 'ContentHub',
      image64: imageObj?.image,
      imageName: imageObj?.name,
      contentType: '.' + imageObj?.type.replace('image/', ''),
      bucketName: 'dev_celebfarm',
    };
    console.log(obj);
    try {
      connectionrequest()
        .then(() => {
          dispatch(getUploadImageRequest(obj));
        })
        .catch(err => {
          console.log(err);
          showErrorAlert('Please connect to internet');
        });
    } catch (e) {
      console.log(e);
    }
  }

  if (status == '' || ProfileReducer.status != status) {
    switch (ProfileReducer.status) {
      case 'Profile/getContactusRequest':
        status = ProfileReducer.status;
        console.log('=>>>>>>>');
        break;

      case 'Profile/getContactusSuccess':
        status = ProfileReducer.status;
        console.log(
          'ProfileReducer?.nichResponse?.result>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
          ProfileReducer.initSessionResponse,
        );
        showErrorAlert('Successfully request submited');
        props.navigation.goBack();
        // verifyCaptcha();
        break;
      case 'Profile/getContactusFailure':
        status = ProfileReducer.status;
        break;
    }
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.black}}>
      <HeaderCommon
        picTitle={true}
        home={true}
        back={true}
        backgroundColor={'#000'}
        title={'Contact Us'}
        heardetext={Colors.white}
        headerHeight={Platform.OS == 'ios' ? normalize(40) : normalize(51)}
        textfontSize={normalize(16)}
        fontFamily={Fonts.Inter_Bold}
        // marginStart={normalize(33)}
        notifiPress={() => props.navigation.navigate('Notifications')}
        profilePress={() => props.navigation.navigate('Chat')}
        backScreen={() => props.navigation.goBack()}
        textColor={'#ffff'}
        {...props}
      />

      <View style={style.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEnabled={selImage!=='' ? true : false}>
          <>
            <View
              style={{
                marginTop: normalize(12),
                borderRadius: normalize(7),
              }}>
              <View
                style={{
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: Colors.whitegrey,
                    fontSize: normalize(12),
                    marginStart: normalize(3),
                  }}>
                  Ask a general question
                </Text>
                <TextArea
                  heightInput={
                    Platform.OS == 'ios' ? normalize(142) : normalize(140)
                  }
                  value={contact}
                  placeholder="Write your comment..."
                  onChangeText={text => setContact(text)}
                  marginTop={normalize(18)}
                  placeholderTextColor={'#fff'}
                  fontFamily={Fonts.Inter_Bold}
                  color={'#fff'}
                  borderRadius={7}
                  borderColor={'#434540'}
                  multiline={true}
                  borderWidth={1}
                  background={Colors.black}
                  // isSecure={isSequre}
                  // onPressssequre={() => setisSequre(!isSequre)}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: normalize(12),
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '86%',
              }}>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => pickupGallery()}>
                <Image
                  source={Icons.document_upload}
                  style={{height: normalize(12), width: normalize(12)}}
                />
                <Text
                  style={{
                    color: Colors.whitegrey,
                    fontSize: normalize(10),
                    marginStart: normalize(3),
                  }}>
                  Add a screenshot (optional)
                </Text>
              </TouchableOpacity>
              <ButtonLinear
                width={'43%'}
                height={normalize(36)}
                alignSelf={'flex-end'}
                backgroundColor={Colors.btnColor}
                title={'Send'}
                textColor={Colors.black}
                titlesingle={true}
                borderRadius={normalize(25)}
                marginHorizontal={normalize(5)}
                btnBottom={0}
                onPress={() => {
                  contactusSave();
                  // props.navigation.navigate('ContactUs');
                }}
              />
            </View>
            <View
              style={{
                marginTop: normalize(18),
                height: normalize(490),
                // bottom:0,
                // position:'absolute',
                // top:0,
                // backgroundColor:Colors.red
              }}>
              <ImageBackground
                source={{uri: 'data:image/png;base64,' + selImage?.image}}
                style={{
                  height: normalize(350),
                  width: normalize(270),
                  alignSelf: 'center',
                }}
                resizeMode="contain"
              />
            </View>
          </>
        </ScrollView>
      </View>
      {/* </SafeAreaView> */}
    </SafeAreaView>
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

export default ContactUsSend;
