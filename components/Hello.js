/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Picker, Text, TouchableOpacity, SafeAreaView, TextInput, Image, Platform, StyleSheet, Alert } from 'react-native';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import Toast from 'react-native-simple-toast';
import firebase from '../firebase/firebase';
import { key, api, forecast } from "../api/wetherbit"
import Icon from "./ImageClip"
import WeatherIcon from './WeatherIcon'

import DatePicker from 'react-native-datepicker';
import { block, color } from 'react-native-reanimated';
//var db = SQLite.openDatabase({ name: 'gsdb.db', createFromLocation: '~gsdb.db' });

function HomeScreen({ navigation }) {

  const [date, setTime] = useState(new Date);
  const [favCity, setFavCity] = useState("Bielsk Podlaski")
  const [country, setCountry] = useState("pl")
  const [language, setLanguage] = useState("en")
  const [weatherCode, setWeatherCode] = useState(900)
  const [weatherDesc, setWeatherDescription] = useState("Słonecznie")
  const [weather, setWeather] = useState({ weather: { temp: 10, code: 10, description: "A" } })
  const [temperatur, setTemperature] = useState(10)

  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let dayName = days[date.getDay()];
  let day = date.getDate()
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let month = months[date.getMonth()]


  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) minutes = '0' + minutes;
  let seconds = date.getSeconds();

  useEffect(() => {
    firebase.database().ref('/fav').on('value', function (snapshot) {
      var cities_result = [];

      snapshot.forEach(function (item) {
        var itemVal = item.val();
        cities_result.push(itemVal);
      });

      setFavCity(cities_result[0].city_name)
    }, function (error) {
      console.error(error);
    })
    getWeatherApiAsync()

  }, []);

  async function getWeatherApiAsync() {
    try {
      let response = await fetch(
        api + `?city=${favCity}&country=${country}&lang=${language}&key=${key}`
      );
      let json = await response.json();
      console.log(json.data[0])
      setWeather(json.data[0])

      setTemperature(json.data[0].temp)
      setWeatherCode(json.data[0].weather.icon)
      setWeatherDescription(json.data[0].weather.description)

      return json.data[0];
    } catch (error) {
      console.error(error);
    }
  }

  function handleRefresh() {
    let time = new Date();
    //console.log(hours+ "-"+ time.getHours())
    console.log(minutes + "-" + time.getMinutes())
    //if(minutes<time.getMinutes())
    {
      setTime(new Date())
      console.log("refresh2 i strzał do api")
      getWeatherApiAsync()
      //console.log(weather.weather.description)
      Toast.show('The weather is up to date.', Toast.SHORT, Toast.TOP);

      setTemperature(weather.temp)
      setWeatherCode(weather.weather.icon)
      setWeatherDescription(weather.weather.description)
    }

  }

if(weather==null)
{
  return <LinearGradient colors={['#192f6a', '#3b5998', '#4c669f']} style={{ flex: 1, overflow: "hidden", margin: 0, width: 400, paddingTop: 20, }}></LinearGradient>
}

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#192f6a', '#3b5998', '#4c669f']} style={{ flex: 1, overflow: "hidden", margin: 0, width: 400, paddingTop: 20, }}>
        <TouchableOpacity onLongPress={() => handleRefresh()} onPress={() => navigation.navigate('Current', { weather, dayName })}>
          <View style={styles.favCity}>
            <View style={styles.namCity}>
              <Image source={require('../assets/map-localization-icon-white.png')}
                style={{
                  width: 31,
                  height: 31,
                  resizeMode: 'contain',
                }} />
              <View>
                <Text style={[styles.favCity_text, styles.text_shadow]}>{favCity.toUpperCase()}</Text>
              </View>
            </View>
            <View style={styles.temp}>
              <Text style={[{ color: 'white', }, styles.text_shadow]}>{dayName}, {day} {month} {hours}:{minutes} </Text>
            </View>
            <View style={styles.temp2}>
              {/* <Icon name={weatherCode} /> */}
              <WeatherIcon name={weatherCode} />
              <Text style={[styles.favCity_text2, styles.text_shadow]}>{temperatur + "\u2103"}</Text>
            </View>
            <View>
              <Text style={[{ fontSize: 24, color: 'white', }, styles.text_shadow]}>{weatherDesc}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.bnt_menu}>
            <Text style={styles.bnt_menu_text} onPress={() => navigation.navigate('Check')}>CHECK WEATHER</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bnt_menu} onPress={() => navigation.navigate('Forecast')}>
            <Text style={styles.bnt_menu_text}>FORECAST 16-DAY</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bnt_menu}>
            <Text style={styles.bnt_menu_text} onPress={() => navigation.navigate('Watchlist')}>WATCHLIST</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bnt_menu_set}>
            <Image source={require('../assets/gear-white.png')}
              style={{
                width: 41,
                height: 41,
                resizeMode: 'contain',
                right: 15,
              }} />
            <Text style={styles.bnt_menu_set_text} onPress={() => navigation.navigate('Settings')}>Settings</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#f7f7f7',
    // backgroundColor: '#113255',
    alignItems: "center",
    textAlign: "center",
  },
  buttons: {
    marginBottom: 10,
    flex: 1,
    //backgroundColor: '#113255',
    width: '100%',
  },
  favCity: {
    padding: 10,
    //backgroundColor: '#f7f7f7',
    //backgroundColor: 'red',
    justifyContent: "space-between",
    alignItems: 'center',
    flexDirection: "column",
    textAlign: "center",
    height: 210,
    width: '100%',
    marginBottom: 50
  },
  bnt_menu: {

    //color: '#f7f7f7',
    //backgroundColor: '#333',
    backgroundColor: '#113255',
    justifyContent: "center",
    alignItems: 'center',
    textAlign: "center",
    borderRadius: 20,
    marginRight: 90,
    marginLeft: 90,
    marginTop: 10,
    marginBottom: 10,
    padding: 20,
  },
  bnt_menu_set: {
    borderWidth: 1,
    //borderColor:'#333',
    borderColor: 'white',
    padding: 10,
    //color:'#333',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'center',
    textAlign: "center",
    borderRadius: 20,
    marginLeft: 90,
    marginRight: 90,
    margin: 10,
    padding: 10,
  },
  bnt_menu_set_text: {
    fontWeight: "bold",
    color: 'white',
  },
  bnt_menu_text: {
    //color: '#f7f7f7',
    color: 'white',
    //color:'#68ff9b',
  },
  namCity: {
    //backgroundColor: '#f7f7f7',
    //backgroundColor: 'red',
    justifyContent: "center",
    alignItems: 'center',
    alignContent: "center",
    flexDirection: "row",
    textAlign: "center",
    height: 55,
    width: '100%',
  },
  favCity_text: {
    fontSize: 25,
    fontWeight: "bold",
    left: 10,
    color: 'white',
  },
  favCity_text2: {
    //backgroundColor: 'green',
    fontSize: 60,
    fontWeight: "bold",
    color: 'white',
    //color:'#68ff9b'
  },
  temp: {
    flex: 2,
    alignItems: "center",
    alignContent: "center",
    textAlign: "center",
  },
  temp2: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 25,
    color: 'white',
    fontWeight: "bold",
    //backgroundColor: 'green'
  },
  text_shadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  }
});
