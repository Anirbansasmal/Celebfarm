import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';
import Icons from '../../themes/icons';
import {Colors, Fonts} from '../../themes/Themes';
import normalise from '../../utils/helpers/dimen';
import ButtonLinear from '../../Components/Button Linear';
import HeaderCommon from '../../Components/HeaderCommon';
import Modal from 'react-native-modal';
export default function ConnectInstagramScreen(props) {
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

      <View style={styles.container}>
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
        <Text style={styles.title}>
          Connecting Instagram works via Facebook
        </Text>
        <View style={styles.questionContainer}>
          <Text style={styles.question}>
            Do you have Instagram Creator or Instagram Business account?
          </Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[
                styles.button,
                hasBusinessAccount === true && styles.activeButton,
              ]}
              onPress={() => setHasBusinessAccount(true)}>
              <Text
                style={{
                  ...styles.buttonText,
                  color: hasBusinessAccount ? Colors.black : Colors.white,
                }}>
                Yes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                hasBusinessAccount === false && styles.activeButton,
              ]}
              onPress={() => setHasBusinessAccount(false)}>
              <Text
                style={{
                  ...styles.buttonText,
                  color:
                    hasBusinessAccount == false ? Colors.black : Colors.white,
                }}>
                No
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.questionContainer}>
          <Text style={styles.question}>
            Is your Instagram account linked to a Facebook page?
          </Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[
                styles.button,
                isLinkedToFacebook === true && styles.activeButton,
              ]}
              onPress={() => setIsLinkedToFacebook(true)}>
              <Text
                style={{
                  ...styles.buttonText,
                  color:
                    isLinkedToFacebook === true ? Colors.black : Colors.white,
                }}>
                Yes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                isLinkedToFacebook === false && styles.activeButton,
              ]}
              onPress={() => setIsLinkedToFacebook(false)}>
              <Text
                style={{
                  ...styles.buttonText,
                  color:
                    isLinkedToFacebook === false ? Colors.black : Colors.white,
                }}>
                No
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: normalise(10),
        }}>
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
            isLinkedToFacebook && hasBusinessAccount
              ? (back(false),
                setTimeout(() => {
                  insta();
                }, 500))
              : null;
          }}
        />
      </View>
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
    marginVertical: 20,
    width: '100%',
  },
  iconBorder: {
    backgroundColor: Colors.white,
    borderRadius: normalise(18),
    padding: normalise(6),
  },
  icon: {
    width: normalise(20),
    height: normalise(20),
    // marginHorizontal: 10,
  },
  title: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: Fonts.Inter_Bold,
  },
  questionContainer: {
    marginBottom: 20,
  },
  question: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: normalise(14),
    marginBottom: normalise(12),
  },
  button: {
    flex: 1,
    padding: 15,
    backgroundColor: '#333',
    borderRadius: 36,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: 'white',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  connectButton: {
    marginTop: 30,
    padding: 15,
    backgroundColor: 'lime',
    borderRadius: 10,
    alignItems: 'center',
  },
  connectButtonText: {
    color: 'black',
    fontSize: 16,
  },
});

ConnectInstagramScreen.propTypes = {
  onBack: PropTypes.func,
  onConnect: PropTypes.func,
  isShow: PropTypes.bool,
};
ConnectInstagramScreen.defaultProps = {
  onBack: () => {},
  onConnect: () => {},
  isShow: true,
};
