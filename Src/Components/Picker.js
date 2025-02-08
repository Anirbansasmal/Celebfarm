import React, {useState} from 'react';
import {FlatList, SafeAreaView, View, Text} from 'react-native';
import PropTypes, {array, object} from 'prop-types';
import normalize from '../utils/helpers/dimen';
import Modal from 'react-native-modal';
import TextInputItem from './TextInputItem';
import {Colors, Fonts} from '../themes/Themes';
// import {  } from 'react-native-svg';

export default function Picker(props) {
  const [country, setCountry] = useState([]);
  const [searchData, setSearchData] = useState([props?.dataList]);

  const [searchd, setSearch] = useState('');
  function onBackdropPress() {
    if (props.onBackdropPress) {
      props.onBackdropPress();
    }
  }
  function search(val) {
    let arrData = [];
    setSearch(val);
    // setCountry([]);
    console.log(val);
    arrData = props?.dataList?.filter(item => {
      console.log(
        'item',
        item?.name?.toString()?.toLowerCase() ===
          val?.toString()?.toLowerCase(),
      );
      return item?.name?.toLowerCase().includes(val?.toLowerCase());
    });
    console.log('hello world', arrData);

    if ((arrData != undefined || 'undefined') && val != '') {
      setCountry([...arrData]);
    } else {
      setCountry([...props?.dataList]);
    }
    console.log('redata', arrData);
  }
  console.log('val', country[0]);
  return (
    <SafeAreaView style={{
      marginTop:normalize(52),
    }}>
      <Modal
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        backdropTransitionOutTiming={0}
        hideModalContentWhileAnimating={true}
        isVisible={props.modalVisible}
        style={{width: '100%', alignSelf: 'center', margin: 0,}}
        animationInTiming={800}
        animationOutTiming={1000}
        onBackButtonPress={() => onBackdropPress()}
        onBackdropPress={() => onBackdropPress()}>
        <View
          style={{
            flex: 1,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            backgroundColor: props.backgroundColor,
            borderRadius: normalize(7),
            maxHeight: props.height,
            paddingLeft: normalize(20),
            paddingBottom: normalize(0),
          }}>
          {props?.title != '' ? (
            <>
              <Text
                style={{
                  fontSize: normalize(14),
                  color: Colors.white,
                  fontFamily: Fonts.Inter_SemiBold,
                  marginTop: normalize(12),
                }}>
                {props?.title}
              </Text>
              <View
                style={{
                  height: normalize(1),
                  width: '90%',
                  backgroundColor: Colors.white,
                  marginTop: normalize(12),

                }}></View>
            </>
          ) : null}
          {props.isSearch ? (
            <TextInputItem
              heightInput={Platform.OS == 'ios' ? normalize(42) : normalize(40)}
              widthInput={'90%'}
              value={searchd}
              placeholder="Search here..."
              onChangeText={text => search(text)}
              marginTop={normalize(10)}
              placeholderTextColor={'#ABABAB'}
              autoCapitalize={'sentences'}
              fontFamily={Fonts.Inter_Medium}
              color={'#fff'}
              borderRadius={7}
              borderColor={Colors.borderColor}
              borderWidth={normalize(1)}
              backgroundColor={Colors.bcolor}
              inputHeight={normalize(52)}
            />
          ) : null}
          <FlatList
            data={
              country.length == 0
                ? props.dataList
                : typeof country[0] === 'undefined'
                ? props.dataList
                : typeof country === undefined
                ? props.dataList
                : country == []
                ? props.dataList
                : typeof country === object
                ? props.dataList
                : country
            }
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => {
              index.toString();
            }}
            renderItem={props.renderData}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

Picker.propTypes = {
  dataList: PropTypes.array,
  modalVisible: PropTypes.bool,
  renderData: PropTypes.func,
  onBackdropPress: PropTypes.func,
  backgroundColor: PropTypes.string,
  height: PropTypes.number,
  isSearch: PropTypes.any,
  serach: PropTypes.any,
  title: PropTypes.any,
};

Picker.defaultProps = {
  dataList: [],
  modalVisible: false,
  renderData: null,
  onBackdropPress: null,
  backgroundColor: 'white',
  height: normalize(400),
  isSearch: false,
  serach: '',
  title: '',
};
