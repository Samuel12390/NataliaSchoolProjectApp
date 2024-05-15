import { Button } from '~/components/Button';
import React, { useState } from 'react';
import { View, TextInput, Text, Alert, KeyboardAvoidingView } from 'react-native';
import {H1, Separator, Form, Spinner} from 'tamagui';

export const CreateAccountPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [ssn, setSsn] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [status, setStatus] = useState<'off' | 'submitting'>('off')
  
    const handleSubmit = () => {
        setStatus('submitting');
        console.log("Submitting");
        checkFieldsFilled();
        if (submitDisabled === false) {
          Alert.alert('Login Successful', 'Account has been created. Please go back and log in with your new credentials');
        } else {
          Alert.alert('Account Creation Failed', 'Please fill out all fields.');
        }
    };
  
    // Function to check if all fields are filled
    const checkFieldsFilled = () => {
      if (
        firstName &&
        lastName &&
        dob &&
        ssn &&
        phoneNumber &&
        addressLine1 &&
        city &&
        state
      ) {
        setSubmitDisabled(false);
      } else {
        setSubmitDisabled(true);
      }
    };
  
    // Call checkFieldsFilled whenever any field value changes
    useState(checkFieldsFilled);
  
    return (
      <Form onSubmit={() => handleSubmit}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <H1 style= {{ color: 'black', fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center'}}>Create Your Account</H1>
        <Separator borderWidth={10} borderColor={'$colorTransparent'}/>
        <TextInput
          style={{ marginTop: 10, width: '80%', padding: 10, borderWidth: 1, borderRadius: 30 }}
          placeholder="First Name"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
        <TextInput
          style={{ marginTop: 20, width: '80%', padding: 10, borderWidth: 1, borderRadius: 30 }}
          placeholder="Last Name"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
        <TextInput
          style={{ marginTop: 20, width: '80%', padding: 10, borderWidth: 1, borderRadius: 30 }}
          placeholder="Date of Birth"
          value={dob}
          onChangeText={(text) => setDob(text)}
        />
        <TextInput
          style={{ marginTop: 20, width: '80%', padding: 10, borderWidth: 1, borderRadius: 30 }}
          placeholder="Social Security Number"
          value={ssn}
          onChangeText={(text) => setSsn(text)}
        />
        <TextInput
          style={{ marginTop: 20, width: '80%', padding: 10, borderWidth: 1, borderRadius: 30 }}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />
        <TextInput
          style={{ marginTop: 20, width: '80%', padding: 10, borderWidth: 1, borderRadius: 30 }}
          placeholder="Address (Street Address)"
          value={addressLine1}
          onChangeText={(text) => setAddressLine1(text)}
        />
        <TextInput
          style={{ marginTop: 20, width: '80%', padding: 10, borderWidth: 1, borderRadius: 30 }}
          placeholder="Address (Apartment, Unit, P.O. Box, etc.)"
          value={addressLine2}
          onChangeText={(text) => setAddressLine2(text)}
        />
        <TextInput
          style={{ marginTop: 20, width: '80%', padding: 10, borderWidth: 1, borderRadius: 30 }}
          placeholder="City"
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <TextInput
          style={{ marginTop: 20, width: '80%', padding: 10, borderWidth: 1, borderRadius: 30 }}
          placeholder="State/Territory"
          value={state}
          onChangeText={(text) => setState(text)}
        />
        <Separator borderWidth={20} borderColor={'$colorTransparent'}/>
        <Form.Trigger asChild disabled={status !== 'off'}>
        <Button title="Create Account" onPress={handleSubmit}>
          Submit
        </Button>
      </Form.Trigger>
      </Form>
    );
  };
  