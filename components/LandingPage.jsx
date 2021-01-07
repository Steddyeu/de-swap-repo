import React from "react";
import { StyleSheet, TextInput, View, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import SignUp from "./SignUp";
import Login from "./Login";
import { createStackNavigator } from '@react-navigation/stack';
// const Stack = createStackNavigator()
function LandingPage({ navigation }) {
    return (

        <View style={styles.landingPage}>

            <Image source={require('../images/logo.png')} />
            <TouchableOpacity style={styles.landingButton}
                raised
                // title="Sign Up"
                icon={<Icon name="user" size={25} color="white" />}
                onPress={() => navigation.navigate('Signup')}
            >
                <Text>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.landingButton}
                raised
                // title="Log In"
                icon={<Icon name="arrow-right" size={20} color="white" />}
                onPress={() => navigation.navigate('Login')}
            >
                <Text>Log In</Text>

            </TouchableOpacity>

        </View>

    );
}
const LandingStack = createStackNavigator();

function LandingStackScreen() {

    return (
        <LandingStack.Navigator>
            <LandingStack.Screen name="LandingPage" component={LandingPage} />


            <LandingStack.Screen name="Signup" component={SignUp} />
            <LandingStack.Screen name="Login" component={Login} />


        </LandingStack.Navigator>
    );
}

const styles = StyleSheet.create({
    landingPage: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    landingButton: {

        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        marginTop: 10,
        width: '70%',

    },
});

export default LandingStackScreen;
