import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import {Colors, Fonts} from '../../themes/Themes';
import normalize from '../../utils/helpers/dimen';
import Button from '../../Components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Images from '../../themes/Images';
import Toast from '../../utils/helpers/Toast';
import Header from '../../Components/Header';
import ButtonLinear from '../../Components/Button Linear';
import {useDispatch, useSelector} from 'react-redux';
import connectionrequest from '../../utils/helpers/NetInfo';
import {
  getLaunageRequest,
  profilelocalRequest,
} from '../../redux/reducers/AuthReducer';
import Loader from '../../utils/helpers/Loader';
import LinearGradient from 'react-native-linear-gradient';
var status = '';

function Language(props) {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);
  var countSel = 0;
  const renderData = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          ...style.cardLanguage,
          
            borderColor:
              item.isChose == true ? Colors.white : Colors.borderColor,
            backgroundColor: item.isChose == true ? Colors.white : Colors.black,
          }
        }
        onPress={() => {
          const tempData = [...data];
          tempData.map((item, index) => {
            if (item?.isChose == true) {
              countSel = countSel == 5 ? countSel : countSel + 1;
              console.log('>>>>>>>>>>>>>>>> ', countSel);
            }
          });
          if (countSel == 5) {
            if (tempData[index].isChose == true) {
              tempData[index].isChose = false;
              setData([...tempData]);
              countSel = countSel - 1;
            }
          } else {
            if (tempData[index].isChose == false) {
              tempData[index].isChose = true;
              setData([...tempData]);
              countSel = countSel <= 5 ? countSel + 1 : countSel;
              console.log('count ', countSel);
            } else {
              tempData[index].isChose = false;
              setData([...tempData]);
              countSel = countSel - 1;
            }
          }
        }}>
        <Text
          style={[
            {
              ...style.text4,
              color: item?.isChose ? Colors.black : Colors.white,
              fontFamily: Fonts.Inter_Regular,
            },
          ]}>
          {item?.lang}
        </Text>
      </TouchableOpacity>
    );
  };
  function launage() {
    console.log('45 ', AuthReducer);
    var arr = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i]['isChose'] == true) {
        arr.push(data[i]['lang']);
      }
    }
    if (arr.length == 0) {
      Toast('Please select your launage');
    } else {
      var obj = {
        country: AuthReducer?.profileLocalResponse?.country,
        city: AuthReducer?.profileLocalResponse?.city,
        launage: arr,
        identity: AuthReducer?.profileLocalResponse?.identity,
        niche: AuthReducer?.profilelocaLResponse?.niche,
        social: AuthReducer?.profilelocaLResponse?.social,
      };
      dispatch(profilelocalRequest(obj));
      props.navigation.navigate('Identity');
    }
  }
  useEffect(() => {
    console.log('=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    try {
      connectionrequest()
        .then(() => {
          dispatch(getLaunageRequest());
        })
        .catch(err => {
          console.log(err);
          Toast('Please connect to internet');
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  if (status == '' || AuthReducer.status != status) {
    switch (AuthReducer.status) {
      case 'Auth/getLaunageRequest':
        status = AuthReducer.status;
        console.log('request =>>>>>>>');
        break;

      case 'Auth/getLaunageSuccess':
        status = AuthReducer.status;
        console.log(
          'AuthReducer?.launageResponse?.result>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
          AuthReducer.launageResponse?.result,
        );
        setData(
          AuthReducer?.launageResponse?.result?.map((item, index) => {
            return {lang: item?.name, isChose: false};
          }),
        );
        // setData(
        // var arr = [];
        // setTimeout(() => {

        // try {
        // arr.map((item)=>{
        // })
        // );
        // console.log(arr);
        // setData([...arr]);
        // } catch (e) {}
        // }, 2000);
        break;
      case 'Auth/getLaunageFailure':
        status = AuthReducer.status;
        break;
    }
  }

  return (
    <>
      <Loader visible={AuthReducer.status == 'Auth/getLaunageRequest'} />
      <SafeAreaView style={style.container}>
        <Header
          picTitle={false}
          logo={false}
          back={true}
          backgroundColor={'#000'}
          title={'Getting started'}
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
              width: '48%',
            }}></LinearGradient>
        </View>
        <View style={style.containerBody}>
          <Text style={style.text}>Language</Text>
          <Text style={style.text2}>Choose languages of your content.</Text>
          <Text style={style.text3}>Content language</Text>

          <View
            style={{
              marginTop: normalize(17),
              width: Dimensions.get('window').width,
              marginStart: normalize(12),
              marginBottom: normalize(180),
            }}>
            <FlatList
              data={data} //AuthReducer?.launageResponse?.result
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderData}
            />
            {/* </ScrollView> */}
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: normalize(10),
            }}>
            <ButtonLinear
              width={'82%'}
              height={normalize(40)}
              alignSelf={'center'}
              backgroundColor={Colors.btnColor}
              title={'Next'}
              textColor={Colors.black}
              titlesingle={true}
              borderRadius={normalize(25)}
              marginHorizontal={normalize(5)}
              btnBottom={0}
              onPress={() => {
                launage();
              }}
            />
          </View>
        </View>
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
    paddingHorizontal: normalize(14),
    alignItems: 'center',
    flex: 1,
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
    fontSize: normalize(12),
    marginTop: normalize(22),
    alignSelf: 'flex-start',
    fontFamily: Fonts.Inter_SemiBold,
  },
  text4: {
    color: Colors.white,
    fontSize: normalize(12),
  },
  cardLanguage: {
    flexDirection: 'row',
    borderWidth: normalize(1),
    borderRadius: normalize(25),
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(6),
    marginBottom: normalize(8),
    marginStart: normalize(5),
    width: '90%',
  },
});
export default Language;
