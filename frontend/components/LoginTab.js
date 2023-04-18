import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import axios from 'axios';

const { height } = Dimensions.get('window');

const LoginTab = ({ navigation, handleLogin }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleConfirm = async (event) => {
    event.preventDefault();

    console.log('Button pressed');

    const normalNumber = normalizePhoneNumber(phoneNumber);
    const encodedNumber = encodeURIComponent(phoneNumber);

    if (phoneNumber != '' && normalNumber.length == 10) {

      axios.get(`http://10.110.153.30:5000/proxi-users/phoneNumber/${encodedNumber}`)
      .then(async (response) => {
        const result = response.data;

        if (result === null) {

          const postData = {
            phoneNumber: phoneNumber,
          };

          const response = await axios.post(
            `http://10.110.153.30:5000/proxi-users/register`,
            postData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          handleLogin(phoneNumber);
          navigation.navigate('CreateProfile');
        } else {
          handleLogin(phoneNumber);
          navigation.navigate('HomePage');
        }
      })
      .catch((error) => {
        console.error('Error occurred while fetching data:', error);
      });
    }
  };

  const handlePhoneChange = (text) => {
    if (text.length == 10) {
      setPhoneNumber(text.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3'));
    } else {
      setPhoneNumber(normalizePhoneNumber(text));
    }
  };

  const normalizePhoneNumber = (phoneNumber) => {
    // Remove any non-digit characters
    const normalizedPhoneNumber = phoneNumber.replace(/\D/g, '');
    // Limit the phone number to 10 digits
    return normalizedPhoneNumber.slice(0, 10);
  };

  return (
    <KeyboardAvoidingView
      style={styles.overarchingContainter}
      behavior="height"
      onPress={Keyboard}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.container, { height }]}>
        <Text style={styles.title}>Proxi</Text>
        <View style={styles.information}>
          <Text style={styles.introduction}>Get Started</Text>
          <Text style={styles.memo}>Sign up or login with your phone #</Text>
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="(123) 456-7890"
              keyboardType="phone-pad"
              maxLength={14}
              value={phoneNumber}
              onChangeText={handlePhoneChange}
            />
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirm}>
              <Text style={styles.confirmText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  overarchingContainter: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#7069f5',
  },
  container: {
    top: 70,
    flex: 1,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: windowHeight - 100,
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#6A5ACD',
  },
  introduction: {
    fontSize: 35,
    color: '#6A5ACD',
    fontWeight: 'bold',
  },
  memo: {
    fontSize: 15,
  },
  formContainer: {
    marginTop: 40,
  },
  information: {
    alignItems: 'center',
    paddingBottom: 20,
    bottom: 60,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    width: 200,
  },
  confirmButton: {
    backgroundColor: '#FD5252',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  confirmText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default LoginTab;
