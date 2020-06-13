/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import firebase from '../firebase/firebase';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height


function ListScreen({ navigation }) {

    const [cars, SetCars] = useState(0);
    const [keys, SetKeys] = useState([]);


    function getData( ){
        console.log("DATA")
        //SetCars(firebase.firestore().collection('cars'))
        console.log(firebase.database().ref('/cars').on('value',function (snapshot) {
            console.log("In Value");
            console.log(snapshot);

            console.log("Raw");
            var cars_result = [];

            snapshot.forEach(function(item) {
                var itemVal = item.val();
                console.log(item.key)
                cars_result.push(itemVal);
            });

            console.log(cars_result);
            SetCars(cars_result)
        }, function(error) {
            console.error(error);
        }))
    }


    function Item({ car }) {
        return (
            <TouchableOpacity onPress={() => {
                console.log('push');
                navigation.navigate('Details',car);
            }}>
                <View style={styles.container} >
                    <View style={styles.item}>
                        <Text style={{fontWeight:"bold"}}>{car.carMark} {car.carModel}</Text>
                        <Text style={styles.burn}> {car.burn}l </Text>
                    </View>
                </View>
            </TouchableOpacity >
        );
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>List Screen</Text>
            <Button
                title="Go to Home"
                onPress={() => navigation.navigate('Add')}
            />
            <Button
                title="Pobierz dane"
                onPress={() => getData()}
            />
            <FlatList
                style={{ marginTop: 15 }}
                data={cars}
                renderItem={({ item }) => <Item car={item} />}
                keyExtractor={item => item.carId}
                key = {item => item.carId}
            />
        </View>
    );
}

export default ListScreen;


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
    burn :{
        padding: 10,
        color: 'black',
        fontWeight:'bold',
        backgroundColor: 'yellow',
        borderRadius: 10,
    },
    item:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 200,
        padding: 10,
    },
});
