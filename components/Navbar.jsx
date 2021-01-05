import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Link } from '@reach/router';
import { StyleSheet, View } from "react-native";

class Navbar extends Component {
    render() {
        return (
            <View style={styles.navbar}>
                <Link to={'/home'}>

                    <Icon
                        name="home"
                        size={17}
                        color="black"
                    />


                </Link>
                <Link to={'/search'}>

                    <Icon
                        name="search"
                        size={15}
                        color="black"
                    />


                </Link>
                <Link to={'/camera'}>

                    <Icon
                        name="camera"
                        size={15}
                        color="black"
                    />


                </Link>
                <Link to={'/message'}>

                    <Icon
                        name="envelope"
                        size={15}
                        color="black"
                    />


                </Link>
                <Link to={'/user'}>

                    <Icon
                        name="user"
                        size={15}
                        color="black"
                    />


                </Link>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    navbar: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,

        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

});
export default Navbar;