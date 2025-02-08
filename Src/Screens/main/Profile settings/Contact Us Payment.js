import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
} from 'react-native';
import {Colors, Fonts} from '../../../themes/Themes';
import normalize from '../../../utils/helpers/dimen';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icons from '../../../themes/icons';
import Images from '../../../themes/Images';
import {useDispatch, useSelector} from 'react-redux';
import HeaderCommon from '../../../Components/HeaderCommon';
import ImageProfile from '../../../Components/ImageProfile';
import Modal from 'react-native-modal';
import Picker from '../../../Components/Picker';
import TextArea from '../../../Components/TextArea';
import ButtonLinear from '../../../Components/Button Linear';
function ContactUsPayment(props) {
  const [data, setData] = useState([
    {
      brandName: 'Brand Name',
      brandDesc: 'Product Name Name Name Name Name',
      no: '21223',
      date: new Date(),
      deliveryType: 'Post',
      image: '',
      type: 'Instagram',
      price: '3245',
      isSelect: false,
    },
    {
      brandName: 'Brand Name',
      brandDesc: 'Product Name Name Name Name Name',
      no: '21223',
      date: new Date(),
      deliveryType: 'Post',
      image: '',
      type: 'Instagram',
      price: '3245',
    },
    {
      brandName: 'Brand Name',
      brandDesc: 'Product Name Name Name Name Name',
      no: '21223',
      date: new Date(),
      deliveryType: 'Post',
      image: '',
      type: 'Instagram',
      price: '3245',
    },
    {
      brandName: 'Brand Name',
      brandDesc: 'Product Name Name Name Name Name',
      no: '21223',
      date: new Date(),
      deliveryType: 'Post',
      image: '',
      type: 'Instagram',
      price: '3245',
    },
    {
      brandName: 'Brand Name',
      brandDesc: 'Product Name Name Name Name Name',
      no: '21223',
      date: new Date(),
      deliveryType: 'Post',
      image: '',
      type: 'Instagram',
      price: '3245',
    },
  ]);
  const [isShow, setShow] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [payment, setPayment] = useState([]);
  const [reqVal, setReqval] = useState('');
  const [contact, setContact] = useState('');

  const dispatch = useDispatch();
  const ContentLabReducer = useSelector(state => state.ContentLabReducer);
  // Sample data for the FlatList

  const ListItem = ({item}) => (
    <View style={style.itemContainer}>
      <View style={style.header}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <ImageProfile
            brandImageUrl={
              item?.brandImageUrl == null ? Images.profile : item?.brandImageUrl
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
          <Text style={style.brandName}>{item.brandName}</Text>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={style.orderNumber}>
            {'#'}
            {item.no}
          </Text>
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
              item?.platformType === 'Instagram' ? Icons.insta : Icons.youtube
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
            {item?.type}
          </Text>
        </View>
      </View>

      <View
        style={{
          width: '100%',
          height: normalize(1),
          backgroundColor: Colors.white,
          marginBottom: normalize(14),
          marginTop: normalize(3),
        }}
      />
      <View style={style.body}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image style={style.postType} source={Icons.active} />
          <Text style={style.price}>{item?.deliveryType}</Text>
        </View>
        <Text style={style.price}>{item?.price}</Text>
      </View>
      <Text style={style.productName}>{item?.brandDesc}</Text>
    </View>
  );

  useEffect(() => {}, []);

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.black}}>
        <HeaderCommon
          picTitle={true}
          home={true}
          back={true}
          backgroundColor={'#000'}
          title={'Contact Us'}
          heardetext={Colors.white}
          headerHeight={Platform.OS == 'ios' ? normalize(40) : normalize(81)}
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
                }}>
                <Text
                  style={{fontFamily: Fonts.Inter_Medium, color: Colors.white}}>
                  Help with payment
                </Text>

                <TouchableOpacity
                  style={style.drop}
                  activeOpacity={0.8}
                  onPress={() => setShow(!isShow)}>
                  <View style={{alignItems: 'center'}}>
                    <Text style={[{...style.text4, fontSize: normalize(14)}]}>
                      {reqVal == '' ? 'Payment request' : reqVal}
                    </Text>
                  </View>
                  <Image
                    source={Icons.arrow_down}
                    style={{
                      height: normalize(18),
                      width: normalize(18),
                    }}
                  />
                </TouchableOpacity>
                <TextArea
                  heightInput={
                    Platform.OS == 'ios' ? normalize(142) : normalize(40)
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
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: normalize(14),
                    alignItems: 'center',
                    justifyContent:'space-between'
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={Icons.document_upload}
                      style={{height: normalize(12), width: normalize(12)}}
                    />
                    <Text
                      style={{
                        color: Colors.white,
                        fontSize: normalize(12),
                        marginStart: normalize(3),
                      }}>
                      Add a screenshot (optional)
                    </Text>
                  </View>
                  <ButtonLinear
                    width={'42%'}
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
                      // props.navigation.navigate('ContactUs');
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: normalize(6),
                  }}></View>
              </View>
            </>
          </ScrollView>
        </View>
        {/* </SafeAreaView> */}
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
          onBackdropPress={() => setShow(false)}>
          {/* <ScrollView> */}
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              top: normalize(110),
              backgroundColor: Colors.black,
              borderTopLeftRadius: normalize(17),
              borderTopRightRadius: normalize(17),
              paddingLeft: normalize(14),
              paddingRight: normalize(14),
              paddingBottom: normalize(15),
              paddingTop: normalize(17),
            }}>
            <View
              style={{
                borderRadius: normalize(3),
              }}>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  width: '100%',
                }}>
                <Text style={style.title}>Payment request</Text>
                <TouchableOpacity
                  style={[
                    {
                      ...style.modelView,
                      alignSelf: 'flex-end',
                    },
                  ]}
                  onPress={() => {}}></TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderBottomWidth: normalize(1),
                    borderBottomColor: Colors.white,
                  }}>
                  <Text style={{...style.title, fontSize: normalize(12)}}>
                    Clear All
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: '100%',
                  height: normalize(1),
                  backgroundColor: Colors.white,
                  marginTop: normalize(12),
                }}
              />
              <FlatList
                data={data}
                renderItem={({item}) => <ListItem item={item} />}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
          {/* </ScrollView> */}
        </Modal>
        <Picker
          backgroundColor={Colors.bcolor}
          dataList={payment}
          modalVisible={showPicker}
          onBackdropPress={() => setShowPicker(!showPicker)}
          renderData={({item, index}) => {
            return (
              <>
                <TouchableOpacity
                  onPress={() => {
                    setCountryValue(item?.name);
                    setShowPicker(!showPicker);
                  }}
                  style={style.dropDownItem}>
                  <Text
                    style={[
                      style.dropDownItemText,
                      countryValue == item?.name
                        ? {color: Colors.red}
                        : {color: Colors.white},
                    ]}>
                    {item?.name}
                  </Text>
                </TouchableOpacity>
              </>
            );
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
    marginStart: normalize(0),
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
  title: {
    fontSize: normalize(16),
    color: '#fff',
    // marginBottom: 16,
    fontFamily: Fonts.Inter_SemiBold,
  },
  itemContainer: {
    backgroundColor: '#1c1c1e',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
    marginTop: normalize(6),
    borderWidth: normalize(1),
  },
  drop: {
    height: normalize(45),
    padding: normalize(12),
    borderRadius: normalize(6),
    borderWidth: normalize(1),
    marginTop: normalize(12),
    borderColor: Colors.borderColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    // backgroundColor:Colors.white
  },
  brandImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  brandName: {
    color: '#fff',
    fontFamily: Fonts.Inter_Medium,
    fontSize: normalize(10),
    marginStart: normalize(3),
  },
  orderNumber: {
    color: '#fff',
    marginRight: 8,
  },
  platformIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  date: {
    color: '#fff',
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postTypeContainer: {
    backgroundColor: '#1e90ff',
    padding: 8,
    borderRadius: 8,
  },
  dropDownItem: {
    paddingVertical: normalize(12),
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: normalize(1),
    color: Colors.white,
  },
  dropDownItemText: {
    fontSize: normalize(14),
    lineHeight: normalize(14),
    fontFamily: Fonts.montserrat_reg,
  },
  postType: {
    height: normalize(24),
    width: normalize(24),
  },
  price: {
    color: '#fff',
    fontWeight: 'bold',
    marginStart: normalize(6),
  },
  productName: {
    color: '#fff',
    flexWrap: 'wrap',
    fontFamily: Fonts.Inter_Medium,
    fontSize: normalize(12),
    marginTop: normalize(16),
  },
});

export default ContactUsPayment;
