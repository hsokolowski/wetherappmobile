/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import firebase from '../firebase/firebase';
import {key, api, forecast} from "../api/wetherbit"


function ForecastScreen({ navigation }) {

    const [days, setDays] = useState([]);
    const [keys, setKeys] = useState([]);
    const [favCity,setFavCity] = useState("Bielsk Podlaski")
    const [country,setCountry] = useState("pl")
    const [language,setLanguage] = useState("en")

    Date.prototype.addDays = function(days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    }

    var date = new Date();

    // useEffect(() => {
    //   getWeatherApiAsync()
    // },[days]);

    async function getWeatherApiAsync() {
      try {
        let response = await fetch(
          forecast+`?city=${favCity}&country=${country}&lang=${language}&key=${key}`
        );
        let json = await response.json();
        console.log("forecast")
        console.log(json.data)
        setDays(json.data)
        return json.data;
      } catch (error) {
        console.error(error);
      }
    }

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
        // var date = new Date(car.datetime);
        // var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        // let dayName = days[date.getDay()];
        return (
            <TouchableOpacity onPress={() => {
                console.log('push');
                navigation.navigate('Details',car);
            }}>
                <View style={styles.container} >
                    <View style={styles.item}>
                        <Text style={{fontWeight:"bold"}}>{car.datetime} {car.temp}</Text>
                        {/* <Text style={styles.burn}> {car.burn}l </Text> */}
                    </View>
                </View>
            </TouchableOpacity >
        );
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>FORECAST 16-DAY</Text>
            <Button
                title="Go to Home"
                onPress={() => navigation.navigate('Add')}
            />
            <Button
                title="Pobierz dane"
                onPress={() => getWeatherApiAsync()}
            />
            <FlatList
                style={{ marginTop: 15 }}
                data={days}
                renderItem={({ item }) => <Item car={item} />}
                keyExtractor={item => item.datetime}
                key = {item => item.datetime}
            />
        </View>
    );
}

export default ForecastScreen;


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
