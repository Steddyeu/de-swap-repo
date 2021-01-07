import React, { Component, useContext } from 'react';
import { Button, TextInput, View } from 'react-native';
import { Route } from 'react-router-native';
import firebase from '../firebase-config';
import { UserContext } from './context/user';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };
  onChangeText = (key, value) => {
    this.setState({ [key]: value });
  };
  submitLogin = async () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.context.logInUser();
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
          placeholder="Your Email address!"
          onChangeText={(value) => this.onChangeText('email', value)}
        />
        <TextInput
          style={{ height: 40 }}
          placeholder="Your password!"
          onChangeText={(value) => this.onChangeText('password', value)}
          secureTextEntry={true}
        />
        <Button title="Log in" onPress={this.submitLogin} />
      </View>
    );
  }
}

Login.contextType = UserContext;
export default Login;
