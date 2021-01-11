import React, { useCallback, useState } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Button } from 'react-native'
import firebase from "../firebase-config";
//import Button from '../common/Button'
import { firebaseService } from '../services'


export default function Input() {
    const user = firebase.auth().currentUser;
    const userName = user.displayName

    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const handlePress = useCallback(
        function () {
            // todo this
            console.log(userName)
            setIsLoading(true);
            firebaseService.createMessage({ message, userName })
                .then(function () {
                    setIsLoading(false)
                    setMessage('')
                })
        },
        [message]
    )

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} value={message} onChangeText={setMessage} placeholder="Write you message" />
            </View>

            <Button onPress={handlePress} title='send' />


            {/* <TouchableOpacity onPress={handlePress} >
                <Text>send</Text>
            </TouchableOpacity> */}
            {isLoading}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%'
    },
    inputContainer: {
        width: '70%'
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 3,
        flexDirection: 'row',
        paddingHorizontal: 10
    }
})