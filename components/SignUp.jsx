import React, { Component, useContext } from 'react';
import { Button, TextInput, View } from 'react-native';
import firebase from "../firebase-config";
import { UserContext } from './context/user';


class SignUp extends Component {

    state = {
        name: '',
        email: '',
        password: ''
    }
    onChangeText = (key, value) => {
        this.setState({ [key]: value })
    }
    submitSignUp = async () => {
        const { email, password } = this.state
        const { navigation } = this.props
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                this.context.logInUser()
            })
            .catch(err => {
                alert(err)
            });
    }
    render() {

        return (

            <View style={{ padding: 10 }}>
                <TextInput
                    style={{ height: 40 }}
                    placeholder="Your name!"
                    onChangeText={value => this.onChangeText('name', value)}
                //defaultValue={name}
                />
                <TextInput
                    style={{ height: 40 }}
                    placeholder="Your Email address!"
                    onChangeText={value => this.onChangeText('email', value)}
                //defaultValue={email}
                />
                <TextInput
                    style={{ height: 40 }}
                    placeholder="Your password!"
                    onChangeText={value => this.onChangeText('password', value)}
                    //defaultValue={password}
                    secureTextEntry={true}
                />
                <Button title='Sign up' onPress={this.submitSignUp} />

            </View>
        );
    }
}

SignUp.contextType = UserContext;
export default SignUp;

