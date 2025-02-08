import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
  SafeAreaView,
} from 'react-native';

import Selector from '../../../../Components/Selector';
import PropTypes from 'prop-types';
import Picker from '../../../../Components/Picker';
import {Colors, Fonts} from '../../../../themes/Themes';
import Icons from '../../../../themes/icons';
import CheckBox from '../../../../Components/CheckBox';
import HeaderCommon from '../../../../Components/HeaderCommon';
import normalise from '../../../../utils/helpers/dimen';
import Button from '../../../../Components/Button';
import ButtonLinear from '../../../../Components/Button Linear';
import connectionrequest from '../../../../utils/helpers/NetInfo';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAcceptOfferRequest,
  getRejectOfferRequest,
} from '../../../../redux/reducers/CollaborationReducer';
import Loader from '../../../../utils/helpers/Loader';
var status = '';

function OfferScreen(props) {
  const dispatch = useDispatch();
  const CollaborationReducer = useSelector(state => state.CollaborationReducer);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const [selectedTerm, setSelectedTerm] = useState('Creator Terms of Service');
  const [isAgreed, setIsAgreed] = useState(false);
  const [isTerm, setIsTerm] = useState(false);
  const [isCopy, setIsCopy] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  const [isShowAlert, setShowAlert] = useState(false);
  const [countryValue, setCountryValue] = useState('');
  const [country, setCountry] = useState([]);
  function back(item) {
    if (props.onBack) {
      props.onBack(item);
    }
  }
  const insta = item => {
    if (props.onConnect) {
      props.onConnect(item);
    }
  };
  function acceptOffer() {
    console.log(props?.route);
    try {
      var obj =
        'campaignID=' +
        props?.route?.params?.campaignID +
        '&creatorID=' +
        AuthReducer?.creatorID;
      connectionrequest().then(() => {
        dispatch(getAcceptOfferRequest(obj));
      });
    } catch (error) {}
  }

  function rejectOffer() {
    console.log(props?.route);
    try {
      var obj =
        'campaignID=' +
        props?.route?.params?.campaignID +
        '&creatorID=' +
        AuthReducer?.creatorID;
      connectionrequest().then(() => {
        dispatch(getRejectOfferRequest(obj));
        props?.navigation?.goBack();
      });
    } catch (error) {}
  }

  if (status == '' || CollaborationReducer.status != status) {
    switch (CollaborationReducer.status) {
      case 'collaboration/getAcceptOfferRequest':
        status = CollaborationReducer.status;
        break;

      case 'collaboration/getAcceptOfferSuccess':
        status = CollaborationReducer.status;
        console.log('hgfgcvcb');
        props?.navigation?.goBack();
        props?.navigation?.goBack();
        // setInvite([CollaborationReducer?.inviteDetailsResponse]);
        break;
      case 'collaboration/getAcceptOfferFailure':
        status = CollaborationReducer.status;
        break;
    }
  }

  useEffect(() => {}, []);

  return (
    <>
      <Loader
        visible={
          CollaborationReducer?.status == 'collaboration/getAcceptOfferRequest'
        }
      />
      <SafeAreaView style={styles.container}>
        <HeaderCommon
          picTitle={true}
          home={false}
          back={true}
          backgroundColor={'#000'}
          title={'Offer'}
          heardetext={Colors.white}
          headerHeight={Platform.OS == 'ios' ? normalise(40) : normalise(51)}
          textfontSize={normalise(16)}
          fontFamily={Fonts.Inter_Bold}
          backScreen={() => props.navigation.goBack()}
          textColor={'#ffff'}
          {...props}
        />
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={{justifyContent: 'space-between'}}>
            <Text style={styles.title}>Read the terms of service</Text>

            <View style={styles.termContainer}>
              <TouchableOpacity
                style={{flexDirection: 'row', justifyContent: 'space-between'}}
                onPress={() => {
                  setIsTerm(!isTerm);
                }}
                activeOpacity={0.6}>
                <Text style={styles.termText}>Creator Terms of Service</Text>
                <View style={{}}>
                  <Image
                    style={{
                      height: normalise(14),
                      width: normalise(14),
                    }}
                    source={!isTerm ? Icons.drop_arrow : Icons.drop_up}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
              {isTerm ? (
                <Text style={{...styles.termText, marginTop: normalise(14)}}>
                  Ensure that required permissions are given to unlock all
                  features of Beacons.
                </Text>
              ) : null}
            </View>
            <View style={styles.termContainer}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: isCopy ? normalise(10) : 0,
                }}
                onPress={() => {
                  setIsCopy(!isCopy);
                }}
                activeOpacity={0.6}>
                <Text style={styles.termText}>Copyright</Text>
                <View style={{}}>
                  <Image
                    style={{
                      height: normalise(14),
                      width: normalise(14),
                    }}
                    source={!isCopy ? Icons.drop_arrow : Icons.drop_up}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
              {isCopy ? (
                <View
                  style={{
                    height: normalise(2),
                    backgroundColor: Colors.borderColor,
                  }}
                />
              ) : null}
              {isCopy ? (
                <Text style={{...styles.termText, marginTop: normalise(14)}}>
                  Ensure that required permissions are given to unlock all
                  features of Beacons.
                </Text>
              ) : null}
            </View>
          </View>
        </ScrollView>
        <Picker
          backgroundColor={Colors.bcolor}
          dataList={country}
          modalVisible={showPicker}
          isSearch={true}
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
      <View
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
          alignSelf: 'center',
        }}>
        <View style={styles.checkboxContainer}>
          <CheckBox
            active={isAccept}
            backgroundColor={'#0000'}
            CheckBox={Icons.radiocheck}
            borderWidth={1}
            onChange={v => {
              setIsAccept(!isAccept);
            }}
          />
          <Text style={styles.label}>{'  '}I agree</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: normalise(12),
            marginBottom: normalise(12),
            width: '100%',
          }}>
          <Button
            width={'32%'}
            height={normalise(40)}
            alignSelf={'center'}
            backgroundColor={'#000000'}
            title={'Back'}
            textColor={Colors.white}
            titlesingle={true}
            borderRadius={normalise(22)}
            marginHorizontal={normalise(5)}
            btnBottom={0}
            onPress={() => {
              isAccept ? rejectOffer() : null;
            }}
          />
          <ButtonLinear
            width={'57%'}
            height={normalise(40)}
            alignSelf={'center'}
            color1={isAccept ? '#B7F9CF' : Colors.greyish}
            color2={isAccept ? '#EAF7A7' : Colors.greyish}
            backgroundColor={Colors.btnColor}
            title={'Accept'}
            textColor={Colors.black}
            titlesingle={true}
            borderRadius={normalise(25)}
            marginHorizontal={normalise(5)}
            btnBottom={0}
            onPress={() => {
              isAccept ? acceptOffer() : null;
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
  },
  contentContainer: {
    paddingVertical: normalise(21),
    paddingHorizontal: normalise(12),
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
    fontFamily: Fonts.Inter_Bold,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#333',
  },
  dropdown: {
    color: 'white',
  },
  termContainer: {
    padding: 15,
    backgroundColor: '#000',
    borderRadius: 5,
    marginBottom: 20,
    borderWidth: normalise(1),
    borderColor: Colors.borderColor,
    opacity: 0.8,
  },
  termText: {
    color: 'white',
    fontSize: 14,
    fontFamily: Fonts.Inter_Medium,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginStart: normalise(12),
    marginEnd: normalise(12),
    backgroundColor: Colors.bcolor,
    paddingVertical: normalise(10),
    borderRadius: normalise(7),
  },
  checkbox: {
    marginRight: 10,
  },
  label: {
    color: 'white',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropDownItem: {
    paddingVertical: normalise(12),
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: normalise(1),
    color: Colors.white,
  },
  dropDownItemText: {
    fontSize: normalise(14),
    lineHeight: normalise(14),
    fontFamily: Fonts.montserrat_reg,
  },
  closeButton: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  closeButtonText: {
    color: 'lime',
    fontSize: 16,
  },
  acceptButton: {
    backgroundColor: 'lime',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
  acceptButtonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default OfferScreen;
