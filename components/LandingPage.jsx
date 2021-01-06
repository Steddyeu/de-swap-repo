import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
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
            <Text h1>De-Swap</Text>

            <Button
                style={styles.button}
                raised
                title="Sign Up"
                icon={<Icon name="user" size={25} color="white" />}
                onPress={() => navigation.navigate('Signup')}
            />
            <Button
                raised
                title="Log In"
                icon={<Icon name="arrow-right" size={20} color="white" />}
                onPress={() => navigation.navigate('Login')}
            />

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
    button: {
        color: "#20232a",
    },
});

export default LandingStackScreen;
