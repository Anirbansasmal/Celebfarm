import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  CheckBox,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Picker} from '@react-native-picker/picker'; // For the dropdown
import HeaderCommon from '../../../../Components/HeaderCommon';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Fonts} from '../../../../themes/Themes';

const AcceptOffer = props => {
  const [selectedTerm, setSelectedTerm] = useState('Creator Terms of Service');
  const [isAgreed, setIsAgreed] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderCommon
        picTitle={true}
        home={false}
        back={true}
        backgroundColor={'#000'}
        title={'Offer'}
        heardetext={Colors.white}
        headerHeight={Platform.OS == 'ios' ? normalize(40) : normalize(51)}
        textfontSize={normalize(16)}
        fontFamily={Fonts.Inter_Bold}
        backScreen={() => {
          props.navigation.goBack();
        }}
        textColor={'#ffff'}
        {...props}
      />
      <ScrollView contentContainerStyle={styles.inner}>
        <Text style={styles.title}>Read the terms of service</Text>

        <View style={styles.dropdownContainer}>
          <Picker
            selectedValue={selectedTerm}
            onValueChange={itemValue => setSelectedTerm(itemValue)}
            style={styles.dropdown}>
            <Picker.Item
              label="Creator Terms of Service"
              value="Creator Terms of Service"
            />
            <Picker.Item label="Copyright" value="Copyright" />
          </Picker>
        </View>

        <View style={styles.termContainer}>
          <Text style={styles.termText}>
            Ensure that required permissions are given to unlock all features of
            Beacons.
          </Text>
        </View>

        <View style={styles.checkboxContainer}>
          <Text style={styles.label}>I agree</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              /* handle close action */
            }}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.acceptButton, !isAgreed && styles.disabledButton]}
            onPress={() => {
              if (isAgreed) {
                // Handle accept action
              }
            }}
            disabled={!isAgreed}>
            <Text style={styles.acceptButtonText}>Accept</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  inner: {
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
  title: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
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
    backgroundColor: '#333',
    borderRadius: 5,
    marginBottom: 20,
  },
  termText: {
    color: 'white',
    fontSize: 14,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
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

export default AcceptOffer;
