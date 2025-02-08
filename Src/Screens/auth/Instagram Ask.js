import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
} from 'react-native';
import Icons from '../../themes/icons';
import PropTypes from 'prop-types';
import {Colors, Fonts} from '../../themes/Themes';
import normalise from '../../utils/helpers/dimen';
import ButtonLinear from '../../Components/Button Linear';
import HeaderCommon from '../../Components/HeaderCommon';
import {ScrollView} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
export default function ConnectInstagramAskScreen(props) {
  const [hasBusinessAccount, setHasBusinessAccount] = useState(null);
  const [isLinkedToFacebook, setIsLinkedToFacebook] = useState(null);
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

  const pagesData = [
    {
      id: '1',
      name: 'Page name 01',
      details: 'Details about demo demo',
      image: 'https://via.placeholder.com/50',
    },
    {
      id: '2',
      name: 'Page name 02',
      details: 'Details about demo demo',
      image: 'https://via.placeholder.com/50',
    },
  ];

  return (
    <Modal
      isVisible={props?.isShow}
      backdropTransitionOutTiming={0}
      hideModalContentWhileAnimating={true}
      style={{
        width: '100%',
        alignSelf: 'center',
        margin: 0,
        backgroundColor: Colors.black,
      }}
      animationInTiming={800}
      animationOutTiming={1000}
      backdropColor={'#000000'}
      onBackButtonPress={() => back(false)}>
      <HeaderCommon
        picTitle={false}
        home={true}
        back={true}
        backgroundColor={'#000'}
        title={'Get started'}
        heardetext={Colors.white}
        headerHeight={Platform.OS == 'ios' ? normalise(40) : normalise(45)}
        textfontSize={normalise(16)}
        fontFamily={Fonts.Inter_Bold}
        backScreen={() => {
          back(false);
        }}
        textColor={'#ffff'}
        {...props}
      />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <View style={styles.iconContainer}>
              <View style={styles.iconBorder}>
                <Image source={Icons.facebook} style={styles.icon} />
              </View>
              <View
                style={{
                  ...styles.iconBorder,
                  marginLeft: normalise(-4),
                  borderWidth: normalise(3),
                }}>
                <Image source={Icons.insta} style={styles.icon} />
              </View>
            </View>
          </View>

          <Text style={styles.title}>
            While logging in with Facebook, remember to
          </Text>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.stepBody}>
              <Text style={styles.stepNumber}>1 </Text>
            </View>
            <Text style={styles.step}>
              Do you have Instagram Creator or Instagram Business account?
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.stepBody2}>
              <Text style={styles.stepNumber}>2 </Text>
            </View>
            <Text style={styles.step}>
              Ensure that required permissions are given to unlock all features
              of Beacons.
            </Text>
          </View>
          <View
            style={{height: normalise(3), backgroundColor: Colors.bcolor}}
          />
          <View style={{alignSelf: 'center', width: '80%'}}>
            <Text style={styles.subtitle}>
              What Pages do you want to use with Phyllo?
            </Text>
            <Text style={styles.description}>
              What Pages do you want to use with Phyllo?
            </Text>
          </View>
          <View style={{alignSelf: 'center', width: '80%'}}>
            <View style={styles.selectAllContainer}>
              <Text style={styles.selectAllText}>
                All Pages ({pagesData.length})
              </Text>
              <Text style={styles.selectAllLabel}>Select all</Text>
            </View>
            <View
              style={{
                height: normalise(2),
                backgroundColor: Colors.bcolor,
                marginBottom: normalise(10),
              }}
            />

            <FlatList
              data={pagesData}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <View style={styles.pageItem}>
                  <Image source={{uri: item.image}} style={styles.pageImage} />
                  <View style={styles.pageDetails}>
                    <Text style={styles.pageName}>{item.name}</Text>
                    <Text style={styles.pageDescription}>{item.details}</Text>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
        <View style={{marginTop: normalise(58)}}>
          <ButtonLinear
            width={'90%'}
            height={normalise(40)}
            alignSelf={'center'}
            backgroundColor={Colors.btnColor}
            title={'Connect Instagram via Facebook'}
            textColor={Colors.black}
            titlesingle={true}
            borderRadius={normalise(25)}
            btnBottom={normalise(29)}
            onPress={() => {
              insta();
              setTimeout(() => {
                back(false);
              }, 500);
            }}
          />
        </View>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepBody: {
    height: normalise(25),
    width: normalise(25),
    backgroundColor: Colors.white,
    borderRadius: normalise(18),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
  },
  skipText: {
    color: 'lime',
    fontSize: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: normalise(10),
    width: '100%',
  },
  stepBody2: {
    height: normalise(25),
    width: normalise(25),
    backgroundColor: Colors.white,
    borderRadius: normalise(18),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBorder: {
    backgroundColor: Colors.white,
    borderRadius: normalise(18),
    padding: normalise(6),
  },
  icon: {
    width: normalise(20),
    height: normalise(20),
  },
  title: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: Fonts.Inter_Bold,
  },
  step: {
    color: 'white',
    fontSize: normalise(12),
    marginBottom: normalise(29),
    marginStart: normalise(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumber: {
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'white',
    fontSize: normalise(14),
    marginTop: normalise(24),
    marginBottom: 5,
  },
  description: {
    color: 'white',
    opacity: 0.8,
    fontSize: normalise(12),
    marginBottom: 20,
  },
  selectAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  selectAllText: {
    color: 'white',
    fontSize: 16,
    marginRight: 5,
  },
  selectAllLabel: {
    color: 'white',
    fontSize: 14,
  },
  pageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  pageImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  pageDetails: {
    flex: 1,
  },
  pageName: {
    color: 'white',
    fontSize: 16,
  },
  pageDescription: {
    color: '#ccc',
    fontSize: 14,
  },
});

ConnectInstagramAskScreen.propTypes = {
  onBack: PropTypes.func,
  onConnect: PropTypes.func,
  isShow: PropTypes.bool,
};
ConnectInstagramAskScreen.defaultProps = {
  onBack: () => {},
  onConnect: () => {},
  isShow: false,
};
