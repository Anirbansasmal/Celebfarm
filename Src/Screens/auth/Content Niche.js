import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Colors, Fonts} from '../../themes/Themes';
import normalize from '../../utils/helpers/dimen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../../Components/Header';
import Icons from '../../themes/icons';
import Toast from '../../utils/helpers/Toast';
import ButtonLinear from '../../Components/Button Linear';
import LinearGradient from 'react-native-linear-gradient';
import {
  getNicheRequest,
  profileRequest,
} from '../../redux/reducers/AuthReducer';
import {useDispatch, useSelector} from 'react-redux';
import connectionrequest from '../../utils/helpers/NetInfo';
import Loader from '../../utils/helpers/Loader';
import TextInputItem from '../../Components/TextInputItem';
var status = '';

function ContentNiche(props) {
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  const [data, setData] = useState([]);
  const [searchdata, setSearchData] = useState([]);
  const [search, setSearch] = useState('');
  let arr = new Set();
  var countSel = 0;
  useEffect(() => {
    console.log('=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    try {
      connectionrequest()
        .then(() => {
          dispatch(getNicheRequest());
        })
        .catch(err => {
          console.log(err);
          Toast('Please connect to internet');
        });
    } catch (e) {
      console.log(e);
    }
  }, []);
  function submit() {
    console.log('45 ', AuthReducer);
    var arr = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i]['isChose'] == true) {
        arr.push(data[i]['lang']);
      }
    }
    if (arr.length == 0) {
      Toast('Please select your niche');
    } else {
      var launage = '';
      var niches = '';
      for (
        let i = 0;
        i < AuthReducer?.profileLocalResponse?.launage?.length;
        i++
      ) {
        launage = AuthReducer?.profileLocalResponse?.launage[i] + ',' + launage;
      }
      for (let i = 0; i < arr.length; i++) {
        niches = arr[i] + ',' + niches;
      }
      console.log('AuthReducer', AuthReducer);
      var obj = {
        Country: AuthReducer?.profileLocalResponse?.country,
        City: AuthReducer?.profileLocalResponse?.city,
        Languages: launage,
        Gender: AuthReducer?.profileLocalResponse?.identity,
        Niches: niches,
        // social: AuthReducer?.profilelocaLResponse?.social,
        CreatorID: AuthReducer?.creatorID,
      };
      console.log('obj', obj);
      connectionrequest()
        .then(() => {
          console.log('login', obj);
          dispatch(profileRequest(obj));
        })
        .catch(err => {
          console.log(err);
          Toast('Please connect to internet');
        });
    }
  }

  function searchNiche(val) {
    let arrData = [];
    setSearch(val);
    // setData([]);
    console.log(val);
    arrData = data?.filter(item => {
      console.log('item', item?.lang?.toLowerCase());
      return item?.lang?.toLowerCase().includes(val?.toLowerCase());
    });
    console.log('hello world', arrData);

    if ((arrData != undefined || 'undefined') && val != '') {
      setData([...arrData]);
    } else {
      setData([...searchdata]);
    }
    console.log('redata', arrData);
  }
  if (status == '' || AuthReducer.status != status) {
    switch (AuthReducer.status) {
      case 'Auth/getNicheRequest':
        status = AuthReducer.status;
        console.log('=>>>>>>>');
        break;

      case 'Auth/getNicheSuccess':
        status = AuthReducer.status;
        console.log(
          'AuthReducer?.launageResponse?.result>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
          AuthReducer.nicheResponse,
        );
        setData(
          AuthReducer?.nicheResponse?.result?.map((item, index) => {
            return {lang: item?.name, isChose: false};
          }),
        );
        setSearchData(
          AuthReducer?.nicheResponse?.result?.map((item, index) => {
            return {lang: item?.name, isChose: false};
          }),
        );
        break;
      case 'Auth/getNicheFailure':
        status = AuthReducer.status;
        break;
      case 'Auth/profileRequest':
        status = AuthReducer.status;
        console.log('=>>>>>>>');
        break;

      case 'Auth/profileSuccess':
        status = AuthReducer.status;
        props.navigation.navigate('SocialAccounts');
        break;
      case 'Auth/profileFailure':
        status = AuthReducer.status;
        break;
    }
  }
  function nicheUpdate(niche, index) {
    const tempData = [...data];
    tempData.map((item, index) => {
      if (item?.isChose == true) {
        countSel = countSel == 3 ? countSel : countSel + 1;
        console.log('>>>>>>>>>>>>>>>> ', countSel);
      }
    });
    if (countSel == 3) {
      if (tempData[index].isChose == true) {
        tempData[index].isChose = false;
        setData([...tempData]);
        countSel = countSel - 1;
      }
    } else {
      if (tempData[index].isChose == false) {
        tempData[index].isChose = true;
        setData([...tempData]);
        countSel = countSel <= 3 ? countSel + 1 : countSel;
        console.log('count ', countSel);
      } else {
        tempData[index].isChose = false;
        setData([...tempData]);
        countSel = countSel - 1;
      }
    }
  }
  const renderData = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          ...style.card,
            borderColor: item?.isChose ? Colors.white : Colors.borderColor,
            backgroundColor: item?.isChose ? Colors.white : Colors.black,
          }
        }
        onPress={() => nicheUpdate(item, index)}>
        <Image
          source={Icons.notificationacc}
          style={{
            width: normalize(12),
            height: normalize(12),
          }}
          resizeMode="contain"
        />
        <Text
          style={[
            {
              ...style.text4,
              color: item?.isChose ? Colors.black : Colors.white,
              fontFamily: Fonts.Inter_Regular,
            },
          ]}>
          {/* {item?.lang?.length > 10
            ? item?.lang?.substring(0, 18 - 10) + '....'
            : item?.lang} */}
          {item?.lang}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Loader visible={AuthReducer.status == 'Auth/profileRequest'} />
      <SafeAreaView style={style.container}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Header
            picTitle={false}
            logo={false}
            back={true}
            backgroundColor={'#000'}
            title={'Get started'}
            heardetext={Colors.white}
            headerHeight={Platform.OS == 'ios' ? normalize(40) : normalize(51)}
            textfontSize={normalize(16)}
            fontFamily={Fonts.Inter_Bold}
            marginStart={normalize(43)}
            textColor={'#ffff'}
            {...props}
          />
          <View
            style={{
              backgroundColor: '#434540',
              width: '100%',
            }}>
            <LinearGradient
              colors={['#B7E2F2', '#D8E480', '#FC9973']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{
                height: normalize(3),
                width: '80%',
              }}></LinearGradient>
          </View>
          <View style={style.containerBody}>
            <Text style={style.text}>Niche</Text>
            <Text style={style.text2}>
              Choose the category of your content.
            </Text>
            <Text style={style.text3}>Content niche (upto 3)</Text>

            <View
              style={{
                marginTop: normalize(17),
                width: Dimensions.get('window').width,
                marginBottom: normalize(180),
                alignItems: 'center',
              }}>
              <TextInputItem
                heightInput={
                  Platform.OS == 'ios' ? normalize(42) : normalize(40)
                }
                widthInput={'92%'}
                value={search}
                placeholder="Search Your Content Niche (Select upto 3)"
                onChangeText={text => searchNiche(text)}
                marginTop={normalize(0)}
                placeholderTextColor={'#ABABAB'}
                fontFamily={Fonts.Inter_Medium}
                color={'#fff'}
                maxLength={10}
                borderRadius={7}
                borderColor={Colors.borderColor}
                borderWidth={normalize(1)}
                backgroundColor={Colors.black}
                inputHeight={normalize(52)}
              />
              <ScrollView
                scrollEnabled={true}
                horizontal
                style={{
                  marginTop: normalize(12),
                }}
                showsVerticalScrollIndicator={false}>
                <FlatList
                  data={data}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  style={{
                    marginHorizontal: normalize(6),
                  }}
                  renderItem={renderData}
                  contentContainerStyle={{
                    // flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                />
              </ScrollView>
            </View>
          </View>
        </KeyboardAvoidingView>
        <ButtonLinear
          width={'91%'}
          height={normalize(40)}
          alignSelf={'center'}
          backgroundColor={Colors.btnColor}
          title={'Next'}
          textColor={Colors.black}
          titlesingle={true}
          borderRadius={normalize(25)}
          marginHorizontal={normalize(5)}
          btnBottom={10}
          onPress={() => {
            submit();
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
  },
  containerBody: {
    paddingHorizontal: normalize(12),
    flex: 1,
    alignItems: 'center',
  },
  text: {
    color: Colors.white,
    fontSize: normalize(21),
    marginTop: normalize(12),
    alignSelf: 'flex-start',
    fontFamily: Fonts.Inter_Bold,
  },
  text2: {
    color: Colors.white,
    fontSize: normalize(12),
    marginTop: normalize(7),
    opacity: 0.7,
    alignSelf: 'flex-start',
    fontFamily: Fonts.Inter_Medium,
  },
  text3: {
    color: Colors.white,
    fontSize: normalize(14),
    marginTop: normalize(22),
    alignSelf: 'flex-start',
    fontFamily: Fonts.Inter_Regular,
  },
  text4: {
    color: Colors.white,
    fontSize: normalize(12),
    fontFamily: Fonts.Inter_Regular,
    marginStart: normalize(6),
  },
  card: {
    flexDirection: 'row',
    borderWidth: normalize(1),
    borderRadius: normalize(25),
    // justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(6),
    marginBottom: normalize(8),
    marginStart: normalize(5),
    width: Dimensions.get('window').width - 28,
  },
});
export default ContentNiche;
