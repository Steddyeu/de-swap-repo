import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Text } from 'react-native-elements';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import SignUp from './SignUp';
import Login from './Login';
import { createStackNavigator } from '@react-navigation/stack';

function LandingPage({ navigation }) {
  return (
    <View style={styles.landingPage}>
      <Image source={require('../images/logo.png')} />
      <TouchableOpacity
        style={styles.landingButton}
        raised
        icon={<Icon name="user" size={25} color="white" />}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={styles.text}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.landingButton}
        raised
        icon={<Icon name="arrow-right" size={20} color="white" />}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.text}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}
const LandingStack = createStackNavigator();

function LandingStackScreen() {
  return (
    <LandingStack.Navigator>
      <LandingStack.Screen
        name="LandingPage"
        component={LandingPage}
        options={{ headerShown: false }}
      />

      <LandingStack.Screen name="Signup" component={SignUp} />
      <LandingStack.Screen name="Login" component={Login} />
    </LandingStack.Navigator>
  );
}

const styles = StyleSheet.create({
  landingPage: {
    flex: 1,
    backgroundColor: '#ccdfff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  landingButton: {
    backgroundColor: '#1E90FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    padding: 10,
    marginTop: 10,
    width: '70%',
  },
  text: {
    color: 'whitesmoke',
  },
});

export default LandingStackScreen;
