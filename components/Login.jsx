import React, { Component, useContext } from 'react';
import { Button, TextInput, View, StyleSheet, Text } from 'react-native';
import firebase from '../firebase-config';
import { UserContext } from './context/user';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
      <View style={styles.loginCointainer}>
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
        <TouchableOpacity style={styles.button} onPress={this.submitLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Login.contextType = UserContext;

const styles = StyleSheet.create({
  loginCointainer: {
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
export default Login;
