import React, {useRef, useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {Colors, Fonts} from '../themes/Themes';
import normalize from '../utils/helpers/dimen';

const OtpInput = ({length = 6, onOtpChange}) => {
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;

    setOtp(newOtp);
    onOtpChange(newOtp.join(''));

    // Move to the next input box if current one is filled
    if (text && index < length - 1) {
      inputs.current[index + 1].focus();
    }

    // If backspace pressed, go to the previous input
    if (!text && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '') {
      if (index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((value, index) => (
        <TextInput
          key={index}
          ref={ref => (inputs.current[index] = ref)}
          style={styles.input}
          keyboardType="numeric"
          maxLength={1}
          value={value}
          onChangeText={text => handleChange(text, index)}
          onKeyPress={e => handleKeyPress(e, index)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  input: {
    height: normalize(42),
    width: normalize(42),
    marginStart: normalize(7),
    color: Colors.white,
    textAlign: 'center',
    fontSize: normalize(12),
    borderColor: '#434540',
    borderWidth: normalize(1),
    borderRadius: normalize(6),
    fontFamily: Fonts.Inter_Medium,
  },
});

export default OtpInput;
