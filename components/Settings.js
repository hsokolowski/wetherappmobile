/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import firebase from '../firebase/firebase';


function SettingsScreen({ navigation }) {

    const [cars, SetCars] = useState(0);
    const [keys, SetKeys] = useState([]);


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Settigns</Text>

        </View>
    );
}

export default SettingsScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'powderblue',
        padding: 10,
        textAlign: 'center',
        borderRadius: 15,
        marginBottom: 10,
        fontWeight: 'bold',
    },

});
