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
import {Colors} from '../../../themes/Themes';
import normalize from '../../../utils/helpers/dimen';
import Button from '../../../Components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icons from '../../../themes/icons';
import Images from '../../../themes/Images';
import {ScrollView} from 'react-native-gesture-handler';
import TextInputItem from '../../../Components/TextInputItem';
import TextArea from '../../../Components/TextArea';
import { useDispatch, useSelector } from 'react-redux';
import connectionrequest from '../../../utils/helpers/NetInfo';
import { getUploadContentHubRequest } from '../../../redux/reducers/CollaborationReducer';
import { imageSign } from '../../../utils/helpers/ApiRequest';

var status='';
var arr=[], arr1=[];
function DeliverablePayment(props) {
  const [isShow, setShow] = useState('1');
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const HomeReducer = useSelector(state => state.HomeReducer);
  const CollaborationReducer = useSelector(state => state.CollaborationReducer);
  const [image, setImage] = useState([]);
  const [indexDel, setIndexDel] = useState();
  const [caption, setCaption] = useState('');
  const [inprogress, setInProgress] = useState();
  const [deliverables, setDeliverable] = useState();
  const [deliverablesEdit, setDeliverableEdit] = useState([]);

  useEffect(()=>{
    const unsuscribe = props.navigation.addListener('focus', payload => {
      arr = [];
      arr1 = [];
      setInProgress(props?.route?.params?.progress);
      setDeliverable(props?.route?.params?.deliverable);
      console.log(props?.route?.params?.progress);
      content();
    });
    return () => {
      unsuscribe();
    };

  },[])
  async function content() {
    var obj =
      'creatorID=' +
      AuthReducer?.creatorID +
      '&' +
      'campaignID=' +
      props?.route?.params?.progress?.campaignID +
      '&' +
      'deliverableType=' +
      props?.route?.params?.deliverable?.name;

    console.log(obj);
    try {
      connectionrequest()
        .then(() => {
          dispatch(getUploadContentHubRequest(obj));
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
      case 'collaboration/getUploadImageRequest':
        status = CollaborationReducer.status;
        break;
      case 'collaboration/getUploadImageSuccess':
        status = CollaborationReducer.status;
        arr1.push({
          url: CollaborationReducer?.uploadImageResponse,
          name: arr[0],
        });
        console.log('hgfgcvcb 407', arr1);
        arr = [];
        break;
      case 'collaboration/getUploadImageFailure':
        status = CollaborationReducer.status;
        break;

      case 'collaboration/getDeleteImageRequest':
        status = CollaborationReducer.status;
        break;
      case 'collaboration/getDeleteImageSuccess':
        status = CollaborationReducer.status;
        console.log('hgfgcvcb', image);
        // arr.push(imageUri?.name);
        arr1.pop(indexDel);
        break;
      case 'collaboration/getDeleteImageFailure':
        status = CollaborationReducer.status;
        break;

      case 'collaboration/uploadContentRequest':
        status = CollaborationReducer.status;
        break;
      case 'collaboration/uploadContentSuccess':
        status = CollaborationReducer.status;
        console.log('hgfgcvcb', image);
        arr1 = [];
        props.navigation.navigate('ActiveContent');
        break;
      case 'collaboration/uploadContentFailure':
        status = CollaborationReducer.status;
        break;

      case 'collaboration/updateContentRequest':
        status = CollaborationReducer.status;
        break;
      case 'collaboration/updateContentSuccess':
        status = CollaborationReducer.status;
        console.log('hgfgcvcb', image);
        // arr.push(imageUri?.name);
        arr1 = [];
        arr = [];
        props.navigation.navigate('ActiveContent');

        break;
      case 'collaboration/updateContentFailure':
        status = CollaborationReducer.status;
        break;

      case 'collaboration/getUploadContentHubRequest':
        status = CollaborationReducer.status;
        break;
      case 'collaboration/getUploadContentHubSuccess':
        status = CollaborationReducer.status;
        if (CollaborationReducer?.contentHubResponse != null) {
          setDeliverableEdit(CollaborationReducer?.contentHubResponse);
          setCaption(CollaborationReducer?.contentHubResponse?.contents);
          console.log(
            'names',
            CollaborationReducer?.contentHubResponse?.imageNames,
          );
          {
            CollaborationReducer?.contentHubResponse?.imageNames != ''
              ? CollaborationReducer?.contentHubResponse?.imageNames
                  ?.split(',')
                  ?.map(async item => {
                    var res = await imageSign(
                      item,
                      AuthReducer?.creatorID,
                      AuthReducer?.token,
                    );
                    arr1.push({name: item, url: res.data.result});
                    console.log('bnvnmbvnsfvnsdfdsf', res.data.result);
                  })
              : null;
          }
        } else {
        }
        console.log('hgfgcvcb 440', CollaborationReducer?.contentHubResponse);
        break;
      case 'collaboration/getUploadContentHubFailure':
        status = CollaborationReducer.status;
        break;
    }
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.black}}>
      
      {/* <SafeAreaView style={style.container}> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.container}>
          <View
            style={{
              marginTop: normalize(12),
            }}>
            <View
              style={{
                borderRadius: normalize(4),
                borderWidth: normalize(1),
                borderColor: '#2A2C27',
                paddingHorizontal: normalize(9),
                marginTop: normalize(12),
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
                    source={Images.profile}
                    style={style.profileCollabr}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: normalize(10),
                      marginStart: normalize(3),
                    }}>
                    Brand Name
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
                      paddingHorizontal: normalize(7),
                      justifyContent: 'center',
                      height: normalize(19),
                      marginRight: normalize(4),
                    }}>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(10),
                      }}>
                      Barter
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      backgroundColor: Colors.white,
                      height: normalize(3),
                      width: normalize(3),
                      borderRadius: normalize(3 / 2),
                      marginRight: normalize(4),
                    }}
                  />
                  <Image
                    source={Icons.insta}
                    style={style.profileCollabration}
                    resizeMode="contain"
                  />
                  <View
                    style={{
                      backgroundColor: Colors.white,
                      height: normalize(3),
                      width: normalize(3),
                      borderRadius: normalize(3 / 2),
                      marginRight: normalize(4),
                    }}
                  />
                  <Text style={{color: Colors.white, fontSize: normalize(10)}}>
                    5 Mar
                  </Text>
                </View>
              </View>

              <View
                style={{
                  marginTop: normalize(12),
                  width: normalize(Dimensions.get('window').width - 106),
                  height: normalize(2),
                  backgroundColor: '#2A2C27',
                }}></View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: normalize(7),
                  marginBottom: normalize(9),
                  justifyContent: 'space-between',
                  // marginTop: normalize(18),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={Icons.images}
                    style={style.profileCollabration}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: normalize(12),
                    }}>
                    Post
                  </Text>
                </View>

                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    // height: normalize(25),
                    paddingHorizontal: normalize(12),
                    paddingVertical: normalize(4),
                    backgroundColor: '#2D353B',
                    borderRadius: normalize(19),
                  }}>
                  <Text
                    style={[
                      {
                        ...style.text4,
                        color: '#77C3FD',
                        fontSize: normalize(14),
                        opacity: 1,
                        marginStart: 0,
                      },
                    ]}>
                    Payment
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                marginTop: normalize(18),
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  paddingHorizontal: normalize(12),
                }}>
                <Image
                  source={Icons.active}
                  style={{height: normalize(27), width: normalize(26)}}
                  resizeMode="contain"
                />
                <Image
                  source={Icons.lineborder}
                  style={{width: normalize(66)}}
                  resizeMode="contain"
                />
                <Image
                  source={Icons.active2}
                  style={{height: normalize(27), width: normalize(26)}}
                  resizeMode="contain"
                />
                <Image
                  source={Icons.lineborder}
                  style={{width: normalize(46)}}
                  resizeMode="contain"
                />
                <Image
                  source={Icons.active3}
                  style={{height: normalize(27), width: normalize(26)}}
                  resizeMode="contain"
                />
                <Image
                  source={Icons.lineborder}
                  style={{width: normalize(26)}}
                  resizeMode="contain"
                />
                <Image
                  source={Icons.active4}
                  style={{height: normalize(27), width: normalize(26)}}
                  resizeMode="contain"
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(10),
                    marginTop: normalize(7),
                  }}>
                  In Progress
                </Text>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(10),
                    marginStart: normalize(17),
                    marginTop: normalize(7),
                  }}>
                  Approved
                </Text>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(10),
                    marginStart: normalize(17),
                    marginTop: normalize(7),
                  }}>
                  Live
                </Text>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(10),
                    marginEnd: normalize(4),
                    marginTop: normalize(7),
                  }}>
                  Payment
                </Text>
              </View>
            </View>

            <View
              style={{
                justifyContent: 'center',
                marginTop: normalize(200),
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(14),
                  marginStart: normalize(3),
                }}>
                Payment was completed...
              </Text>
              <View
                style={{
                  width: normalize(Dimensions.get('window').width - 92),
                  height: normalize(122),
                  borderRadius: normalize(7),
                  borderWidth: normalize(2),
                  borderColor: '#2A2C27',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: normalize(12),
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(36),
                    marginStart: normalize(3),
                  }}>
                  ₹{}
                </Text>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(12),
                    marginStart: normalize(3),
                  }}>
                  Amount was created to your wallet
                </Text>
              </View>

              <View
                style={{
                  width: normalize(Dimensions.get('window').width - 92),
                  height: normalize(52),
                  borderRadius: normalize(7),
                  borderWidth: normalize(2),
                  borderColor: '#2A2C27',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: normalize(20),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginStart: normalize(6),
                    alignItems: 'center',
                  }}>
                  <ImageBackground
                    source={Images.dyning}
                    style={{height: normalize(37), width: normalize(37)}}
                    imageStyle={{borderRadius: normalize(4)}}
                  />

                  <View style={{marginStart: normalize(7)}}>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(12),
                        marginStart: normalize(3),
                        marginTop: normalize(3),
                      }}>
                      Invoice Name
                    </Text>
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(10),
                        marginStart: normalize(3),
                        marginTop: normalize(6),
                      }}>
                      09 mar, 2023
                    </Text>
                  </View>
                </View>

                <Image
                  source={Icons.document_upload}
                  style={{
                    height: normalize(17),
                    width: normalize(17),
                    marginEnd: normalize(10),
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* </SafeAreaView> */}
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    flex: 1,
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

export default DeliverablePayment;
