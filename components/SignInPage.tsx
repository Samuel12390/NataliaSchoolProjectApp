import React, { useState } from 'react';
import { View, Image, TextInput, Button, Text, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Stack, Link } from 'expo-router';
import { LandingPage } from './LandingPage';
import { Spinner } from 'tamagui';

export const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [landingPage, setLandingPage] = useState<'components/LandingPage' | ''>('')

  const handleSignIn = () => {
    console.log("Signing In")
    if (email === "natalia.antunez@upr.org" && password === "saludpublica") {
    } else {
      Alert.alert('Login Failed', 'Incorrect email or password.');
    }
 };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: -40}}>
      <TextInput
        style={{ width: '80%', marginBottom: 10, padding: 10, borderWidth: 1, borderColor: 'gray', borderRadius: 30 }}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={{ width: '80%', marginBottom: 10, padding: 10, borderWidth: 1, borderColor: 'gray', borderRadius: 30 }}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
          <View style={{ width: 20, height: 20, borderWidth: 1, marginRight: 10 }}>
            {rememberMe && <View style={{ flex: 1, backgroundColor: 'blue' }} />}
          </View>
        </TouchableOpacity>
        <Text>Remember me</Text>
      </View>
      <Link href={{ pathname: './landing' }} asChild>
          <Button title="Sign In"/>
      </Link>
    </View>
    </KeyboardAvoidingView>
  );
};