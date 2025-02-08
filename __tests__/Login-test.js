/**
 * @format
 */

import React from 'react';
import {} from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from '../src/Screens/auth/Login';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders login screen correctly', () => {
  const { getByPlaceholderText, getByText } = render(<LoginScreen />);

  expect(getByPlaceholderText('Username')).toBeTruthy();
  expect(getByPlaceholderText('Password')).toBeTruthy();
  expect(getByText('Login')).toBeTruthy();
});
