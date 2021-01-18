import React, { Component, useContext } from 'react';
import {
  Button,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import firebase from '../firebase-config';
import { UserContext } from './context/user';

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
      <View style={styles.signupContainer}>
        <TextInput
          style={styles.inputBox}
          placeholder="Your name!"
          onChangeText={(value) => this.onChangeText('name', value)}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Your Email address!"
          onChangeText={(value) => this.onChangeText('email', value)}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Your password!"
          onChangeText={(value) => this.onChangeText('password', value)}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={this.submitSignUp}>
          <Text style={styles.loginText}>Join! </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

SignUp.contextType = UserContext;

const styles = StyleSheet.create({
  signupContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#ccdfff',
  },
  button: {
    borderRadius: 40,
    backgroundColor: '#1E90FF',
    alignItems: 'center',
    padding: 10,
  },
  loginText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputBox: {
    backgroundColor: 'white',
    height: 40,
    borderRadius: 40,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default SignUp;
