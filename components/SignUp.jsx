import React, { Component, useContext } from 'react';
import { Button, TextInput, View } from 'react-native';
import firebase from '../firebase-config';
import { UserContext } from './context/user';
import { Picker } from '@react-native-picker/picker';

class SignUp extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    avatar: null,
  };
  onChangeText = (key, value) => {
    this.setState({ [key]: value });
  };
  submitSignUp = async () => {
    const { email, password, name } = this.state;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const user = firebase.auth().currentUser;
        user
          .updateProfile({
            displayName: name,
          })
          .then(() => {
            this.context.logInUser();
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        alert(err);
      });
  };
  render() {
    return (
      <View style={{ padding: 10 }}>
        <TextInput
          style={{ height: 40 }}
          placeholder="Your name!"
          onChangeText={(value) => this.onChangeText('name', value)}
        />
        <TextInput
          style={{ height: 40 }}
          placeholder="Your Email address!"
          onChangeText={(value) => this.onChangeText('email', value)}
        />
        <TextInput
          style={{ height: 40 }}
          placeholder="Your password!"
          onChangeText={(value) => this.onChangeText('password', value)}
          secureTextEntry={true}
        />

        <Button title="Sign up" onPress={this.submitSignUp} />
      </View>
    );
  }
}

SignUp.contextType = UserContext;
export default SignUp;
