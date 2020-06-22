/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Picker, Text, TouchableOpacity,SafeAreaView, TextInput, Image, Platform, StyleSheet, Alert } from 'react-native';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';
import firebase from '../firebase/firebase';
import {key, api, forecast} from "../api/wetherbit"
import Icon from "./ImageClip"

import DatePicker from 'react-native-datepicker';
import { block, color } from 'react-native-reanimated';
//var db = SQLite.openDatabase({ name: 'gsdb.db', createFromLocation: '~gsdb.db' });

function HomeScreen({ navigation }) {

  const [date, setTime] = useState(new Date);
  const [favCity,setFavCity] = useState("Bielsk Podlaski")
  const [country,setCountry] = useState("pl")
  const [language,setLanguage] = useState("en")
  const [weatherCode,setWeatherCode] = useState(900)
  const [weatherDesc,setWeatherDescription] = useState("Słonecznie")
  const [weather,setWeather] = useState({weather:{temp: 10, code: 10, description: "A"}})
  const [temperatur,setTemperature] = useState(10)

  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let dayName = days[date.getDay()];
  let day = date.getDate()
  let months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
  let month = months[date.getMonth()]


  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) minutes ='0'+ minutes;
  let seconds = date.getSeconds();

  // useEffect(() => {
  //   getWeatherApiAsync()
  //   setTemperature(weather.temp)
  //   setWeatherCode(weather.weather.code)
  //   setWeatherDescription(weather.weather.description)
  // },[]);

  async function getWeatherApiAsync() {
    try {
      let response = await fetch(
        api+`?city=${favCity}&country=${country}&lang=${language}&key=${key}`
      );
      let json = await response.json();
      console.log(json.data[0])
      setWeather(json.data[0])
      return json.data[0];
    } catch (error) {
      console.error(error);
    }
  }

  function handleRefresh(){
    let time = new Date();
    //console.log(hours+ "-"+ time.getHours())
    console.log(minutes+ "-"+ time.getMinutes())
    //if(minutes<time.getMinutes())
    {
      setTime(new Date())
      console.log("refresh2 i strzał do api")
      getWeatherApiAsync()
      //console.log(weather.weather.description)
      Toast.show('The weather is up to date.', Toast.SHORT, Toast.TOP);

      setTemperature(weather.temp)
      setWeatherCode(weather.weather.code)
      setWeatherDescription(weather.weather.description)
    }

  }



  return (
    <View style={styles.container}>
      <TouchableOpacity  onLongPress={() => handleRefresh()} >
        <View style={styles.favCity}>
          <View style={styles.namCity}>
            <Image source={require('../assets/map-localization-icon.png')}
            style={{
              width: 31,
              height: 31,
              resizeMode: 'contain',
            }} />
            <View>
              <Text style={styles.favCity_text}>{favCity}</Text>
            </View>
          </View>
            <View style={styles.temp}>
              <Text>{dayName}, {day} {month} {hours}:{minutes} </Text>
            </View>
          <View style={styles.temp2}>
            <Icon name={weatherCode} />
            <Text style={styles.favCity_text2}>{temperatur+"\u2103"}</Text>
          </View>
          <View>
            <Text>{weatherDesc}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.bnt_menu}>
          <Text style={styles.bnt_menu_text} onPress={() => navigation.navigate('List')}>CHECK WEATHER</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bnt_menu} onPress={() => navigation.navigate('Forecast')}>
          <Text style={styles.bnt_menu_text}>FORECAST 16-DAY</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bnt_menu}>
          <Text style={styles.bnt_menu_text} onPress={() => navigation.navigate('List')}>WATCHLIST</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bnt_menu_set}>
          <Image source={require('../assets/gear.png')}
            style={{
              width: 41,
              height: 41,
              resizeMode: 'contain',
              right: 15,
            }} />
          <Text style={styles.bnt_menu_set_text} onPress={() => navigation.navigate('Settings')}>Settings</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: "center",
    textAlign: "center",
  },
  buttons:{
    marginBottom: 10,
    flex: 1,
    //backgroundColor: 'red'
  },
  favCity: {
    padding: 10,
    backgroundColor: '#f7f7f7',
    //backgroundColor: 'red',
    justifyContent: "space-between",
    alignItems: 'center',
    flexDirection: "column",
    textAlign: "center",
    height: 200,
    width: '100%',

  },
  bnt_menu:{
    //padding: 10,
    color: '#f7f7f7',
    backgroundColor: '#333',
    justifyContent: "center",
    alignItems: 'center',
    textAlign: "center",
    borderRadius: 20,
    marginRight: 30,
    marginLeft: 30,
    marginTop: 30,
    marginBottom: 10,
    padding: 20,
  },
  bnt_menu_set:{
    borderWidth: 1,
    borderColor:'#333',
    padding: 10,
    color:'#333',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'center',
    textAlign: "center",
    borderRadius: 20,
    marginLeft: 30,
    marginRight: 30,
    margin: 30,
    padding: 10,
  },
  bnt_menu_set_text:{
    fontWeight:"bold",
  },
  bnt_menu_text:{
    color: '#f7f7f7',
  },
  namCity: {
    backgroundColor: '#f7f7f7',
    //backgroundColor: 'red',
    //justifyContent: "center",
    alignItems: 'center',
    //alignContent: "center",
    flexDirection: "row",
    textAlign: "center",
    height: 55,
    width: '100%',
  },
  favCity_text: {
    fontSize: 20,
    fontWeight: "bold",
    left: 0
  },
  favCity_text2: {
    //backgroundColor: 'green',
    fontSize: 40,
    fontWeight: "bold",
  },
  temp:{
    flex: 2,
    alignItems: "center",
    alignContent: "center",
    textAlign: "center",
  },
  temp2: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 25,
    fontWeight: "bold",
    //backgroundColor: 'green'
  }
});
