/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import firebase from '../firebase/firebase';
import {key, api, forecast} from "../api/wetherbit"
import Icon from "./ImageClip"


function ForecastScreen({ navigation }) {

    const [days, setDays] = useState([]);
    const [keys, setKeys] = useState([]);
    const [favCity,setFavCity] = useState("Bielsk Podlaski")
    const [country,setCountry] = useState("pl")
    const [language,setLanguage] = useState("en")

    const customData = require('../api/dump.json');

    useEffect(() => {
      setDays(customData.data)
    },[]);
    // useEffect(() => {
    //   getWeatherApiAsync()
    // },[]);

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

    function GetWaterPopIcon(pop)
    {
      if(pop < 21) return require('../assets/water-drop1.png')
      else if(pop < 50) return require('../assets/water-drop.png')
      else if(pop < 80) return require('../assets/water-drop2.png')
      else return require('../assets/water-drop3.png')
    }

    function Item({ weather }) {
        let weatherCode =weather.weather.code;
        var date = new Date(weather.datetime);
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let dayName = days[date.getDay()].substr(0,3);

        return (
            <TouchableOpacity onPress={() => {
                console.log('push');
                navigation.navigate('Details',weather);
            }}>
                <View style={styles.container} >
                    <View style={styles.item}>
                        <Text >{dayName}, {date.getDate()}</Text>
                        <Text style={{fontWeight:"bold", fontSize: 30}}>{weather.temp+"\u2103"}</Text>
                        <Icon name={weatherCode} />
                        <View style={{justifyContent:"center", alignContent: "center"}}>
                          <Image style={styles.tinyLogo} source={GetWaterPopIcon(weather.pop)}/>
                          <Text>{weather.pop}%</Text>
                        </View>

                    </View>
                </View>
            </TouchableOpacity >
        );
    }

    return (
        //<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' , backgroundColor: '#0131ba'}}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' , backgroundColor: '#0f2a47'}}>
            {/* <View style={styles.title}> */}
              {/* <Button
                  title="Go to Home"
                  onPress={() => navigation.navigate('Add')}
              />
              <Button
                  title="Pobierz dane"
                  //onPress={() => getWeatherApiAsync()}
                  onPress={() => setDays(customData.data)}
                  //onPress={() => console.log(customData.data)}
              />
            </View> */}
            <Text>FORECAST 16-DAY</Text>

            <FlatList
                style={{ marginTop: 15 }}
                data={days}
                renderItem={({ item }) => <Item weather={item} />}
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
        //borderColor: '#333',
        borderColor: '#113255',
        backgroundColor: '#f7f7f7',
        borderWidth: 2,
        paddingBottom: 5,
        paddingTop:5,
        paddingRight: 10,
        paddingLeft: 10,
        textAlign: 'center',
        borderRadius: 15,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    tinyLogo: {
      width: 30, height: 30, overflow: 'hidden'
    },
    title :{
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
        width: 300,
        padding: 10,
    },
});
