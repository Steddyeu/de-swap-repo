import React, { Component } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Image,
    TouchableOpacity, FlatList, SafeAreaView, Text
} from 'react-native';
import { Dimensions } from 'react-native';
import HomeScreen from './Home';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
class UserItemList extends Component {
    state = {
        people: ['https://firebasestorage.googleapis.com/v0/b/de-swap.appspot.com/o/images%2FMy%20Selfie?alt=media&token=78af33b3-42de-44df-b3af-6f66332d0d29', 'https://firebasestorage.googleapis.com/v0/b/de-swap.appspot.com/o/images%2Fa%20stunning%20chair?alt=media&token=737b11b5-ebbc-4f98-8f57-539137f6b7ed', 'https://reactjs.org/logo-og.png', 'https://reactjs.org/logo-og.png', 'https://reactjs.org/logo-og.png', 'https://reactjs.org/logo-og.png', 'https://reactjs.org/logo-og.png', 'https://reactjs.org/logo-og.png', 'https://reactjs.org/logo-og.png']
    }

    render() {
        return (
            <View style={styles.itemList}>
                <FlatList data={this.state.people} renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => { }}>
                        <Image source={{ uri: item }} style={{ width: windowWidth / 3, height: windowWidth / 3 }} />
                    </TouchableOpacity>


                )} numColumns={3} >

                </FlatList>
            </View >
        );
    }
}
const styles = StyleSheet.create({
    itemList: {
        flex: 0.6
    }
})
export default UserItemList;