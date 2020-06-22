/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
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
    const image =  require("../assets/itembg.png" );

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
        let dayName = days[date.getDay()];

        return (
            <TouchableOpacity onPress={() => {
                console.log('push');
                navigation.navigate('Details',weather);
            }}>

                <View style={styles.container} >
                  <ImageBackground source={image} style={styles.image}>
                    <View style={styles.item}>
                        <View style={styles.item_inside1}>
                          <Text style={{color:'white'}}>{dayName}, {date.getDate()}</Text>
                          <Text style={{fontWeight:"bold", fontSize: 30, color:'#68ff9b'}}>{weather.temp+"\u2103"}</Text>
                        </View>
                        <View style={styles.item_inside2}>
                          <Icon name={weatherCode} />
                          <View style={{justifyContent:"center", alignContent: "center"}}>
                            <Image style={styles.tinyLogo} source={GetWaterPopIcon(weather.pop)}/>
                            <Text>{weather.pop}%</Text>
                          </View>
                        </View>


                    </View>
                    </ImageBackground>
                </View>

            </TouchableOpacity >
        );
    }

    return (
        //<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' , backgroundColor: '#0131ba'}}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' , backgroundColor: '#f3f3f3'}}>
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
            {/* <Text>FORECAST 16-DAY</Text> */}

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
        //backgroundColor: '#f7f7f7',
        borderWidth: 2,
        // paddingBottom: 5,
        // paddingTop:5,
        // paddingRight: 10,
        // paddingLeft: 10,
        overflow: 'hidden',
        textAlign: 'center',
        borderRadius: 15,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    tinyLogo: {
      width: 30, height: 30, overflow: 'hidden'
    },
    image: {
      flex: 1,
      justifyContent: "center",
      resizeMode: 'stretch' ,
      resizeMode: 'cover' ,
      width: '100%',
      height: '100%'
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
        width: 320,
        padding: 10,
    },
    item_inside1:{
      flex:1,
      flexDirection: 'column',
      width: '60%',
    },
    item_inside2:{
      flex:1,
      flexDirection: 'row',
      width: '40%',
      justifyContent: "flex-end",
    },
});
