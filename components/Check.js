/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, TextInput, Button, } from 'react-native';
import firebase from '../firebase/firebase';
import { key, alerts, api } from "../api/wetherbit"
import Icon from "./ImageClip"
import { LinearGradient } from 'expo-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';
import WeatherIcon from './WeatherIcon'


function CheckScreen({ navigation }) {
  const [value, onChangeText] = useState('')
  const [weather, SetWeather] = useState(null)
  const [language, setLanguage] = useState("en")
  const [countryCode, SetCountryCode] = useState(null)
  const [isReady, SetIsReady] = useState(false)
  const [isDay, SetIsDay] = useState(true)
  const [alert, SetAlert] = useState(true)
  const countriesWithCodesNEW = require('../api/countries-new.json');
  let image = ""

  function getData() {
    getWeatherApiAsync()
    getWeatherAlertAsync()
  }

  async function getWeatherAlertAsync() {
    console.log(alerts + `?city=${value}&country=${countryCode}&lang=${language}&key=${key}`)
    try {
      let response = await fetch(
        alerts + `?city=${value}&country=${countryCode}&lang=${language}&key=${key}`
      );
      let json = await response.json();
      console.log(json.alerts)
      SetAlert(json.alerts[0].description)
      return json.alerts[0];
    } catch (error) {
      console.error(error);
    }
  }

  async function getWeatherApiAsync() {
    try {
      let response = await fetch(
        api + `?city=${value}&country=${countryCode}&lang=${language}&key=${key}`
      );
      let json = await response.json();
      //console.log(json.data[0])
      SetWeather(json.data[0])
      if (json.data[0].pod == 'd') {
        image = require('../assets/day.png')
        SetIsDay(true)
      }
      else {
        image = require('../assets/night.png')
        SetIsDay(false)
      }
      SetIsReady(true)
      return json.data[0];
    } catch (error) {
      console.error(error);
    }
  }

  function addToWatchList() {
    console.log("add to db")
    var key = firebase.database().ref('/cities').push().key

    let city = {
      id: key,
      city_name: value,
      country_code: countryCode
    }

    firebase.database().ref('/cities').child(key).set(city);
    navigation.navigate('Hello')
  }

  function CityWeather({ weather }) {
    let image = (weather.pod == "d") ? require('../assets/day.png') : require('../assets/night.png')

    let weatherCode = weather.weather.code;
    var date = new Date(weather.datetime);
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let dayName = days[date.getDay()];

    return (
      <LinearGradient colors={isDay ? ['#bee6ee', '#4c669f'] : ['black', 'grey']} style={[styles.details]} >
        <TouchableOpacity onPress={() => {
          console.log('push');
          navigation.navigate('Details', { weather });
        }}>
          <View style={styles.details_top}>
            <Text style={[isDay ? styles.day : styles.night, { textAlign: "center", fontSize: 25 }]}>{isDay ? 'Day' : 'Night'} in {value}, {countryCode}</Text>
            <View style={{ justifyContent: "center", alignContent: "center", alignItems: "center" }}>
              <View style={{ flexDirection: "row", justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                <WeatherIcon name={weather.weather.icon} size={100} />
                <Text style={[isDay ? styles.day : styles.night, { fontSize: 60, fontWeight: "bold" }]}>{weather.temp + "\u2103"}</Text>
              </View>
              <View>
                <Text style={[isDay ? styles.day : styles.night, { fontSize: 30, }]}>{weather.weather.description}</Text>
              </View>
            </View>
          </View>

        </TouchableOpacity >
        <View style={styles.details_bottom}>
          <LinearGradient colors={isDay ? ['#4c669f', 'black'] : ['#bee6ee', '#4c669f']} style={[styles.geo, { overflow: "hidden" }]}>
            <Text style={[!isDay ? styles.day : styles.night, { fontWeight: "bold", fontSize: 30, textAlign: "center", borderBottomWidth: 2, borderColor: isDay ? 'black' : 'white' }, styles.text_shadow]}>GEOLOCALIZATION</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-around", paddingLeft: 20, paddingRight: 20, alignContent: "center", alignItems: "center" }}>
              <Image source={isDay ? require('../assets/globe.png') : require('../assets/globe.png')}
                style={{
                  width: 61,
                  height: 61,
                  resizeMode: 'contain',
                }} />
              <View>
                <Text style={!isDay ? styles.day : styles.night}>Longitude: {weather.lon}</Text>
                <Text style={!isDay ? styles.day : styles.night}>Latitude : {weather.lat}</Text>
              </View>
            </View>
          </LinearGradient>
          <LinearGradient colors={isDay ? ['#4c669f', 'black'] : ['#bee6ee', '#4c669f']} style={[styles.geo, { overflow: "hidden" }]}>
            <Text style={[!isDay ? styles.day : styles.night, { fontWeight: "bold", fontSize: 30, textAlign: "center", borderBottomWidth: 2, borderColor: isDay ? 'black' : 'white' }, styles.text_shadow]}>TIMEZONE</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-around", paddingLeft: 10, paddingRight: 20, alignContent: "center", alignItems: "center" }}>
              <Image source={require('../assets/Timezone.png')}
                style={{
                  width: 61,
                  height: 61,
                  resizeMode: 'contain',
                }} />
              <View>
                <Text style={[!isDay ? styles.day : styles.night, { fontWeight: "bold", fontSize: 20, }]}>{weather.timezone}</Text>
              </View>
            </View>
          </LinearGradient>
          <LinearGradient colors={isDay ? ['#4c669f', 'black'] : ['#bee6ee', '#4c669f']} style={[styles.geo, { overflow: "hidden", }]}>
            <Text style={[!isDay ? styles.day : styles.night, { fontWeight: "bold", fontSize: 30, textAlign: "center", borderBottomWidth: 2, borderColor: isDay ? 'black' : 'white' }, styles.text_shadow]}>ALERTS</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-around", paddingLeft: 10, paddingRight: 20, alignContent: "center", alignItems: "center" }}>
              <SafeAreaView style={styles.container2}>
                <ScrollView style={styles.scrollView}>
                  <View>
                    <Text style={[!isDay ? styles.day : styles.night, { fontSize: 16, }]}>{alert.split('\nenglish:  ')[1]} </Text>
                  </View>
                </ScrollView>
              </SafeAreaView>
            </View>
          </LinearGradient>

        </View>
        <TouchableOpacity style={{ width: 280, marginTop: 10, borderRadius: 10, padding: 10, borderWidth: 2, borderColor: '#68ff9b', backgroundColor: '#68ff9b', alignContent: "center", justifyContent: "center", alignContent: "center" }}>
          <Text style={{ textAlign: "center", color: '#4c669f' }} onPress={() => addToWatchList()}>ADD TO WATCHLIST</Text>
        </TouchableOpacity>
      </LinearGradient>

    );
  }


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#113255' }}>
          <LinearGradient colors={!isReady ? ['#4c669f', '#3b5998', '#192f6a'] : isDay ? ['#4c669f', '#3b5998', '#bee6ee'] : ['#4c669f', '#3b5998', 'black']}
            style={{
              flex: 1,
              margin: 0, width: 400, paddingTop: 10, justifyContent: "center", alignContent: "center", alignItems: "center"
            }}>
            <View style={{ justifyContent: 'center', alignItems: "center", alignContent: "center" }}>
              <View style={{ alignItems: 'center', justifyContent: 'space-around', width: 320, padding: 10, flexDirection: "column" }}>
                <TextInput
                  style={{ width: '100%', padding: 10, borderColor: 'lightgrey', borderWidth: 1, borderRadius: 5, backgroundColor: '#fafafa' }}
                  onChangeText={text => onChangeText(text.toUpperCase())}
                  value={value}
                  placeholder={'City..'}
                //editable={true}
                />
                <DropDownPicker
                  items={countriesWithCodesNEW}
                  defaultValue={countryCode}
                  style={{ paddingVertical: 10, height: 200 }}
                  containerStyle={{ height: 40, width: 300, margin: 10 }}
                  placeholder="Select country"
                  placeholderStyle={{
                    color: 'lightgrey',
                  }}
                  searchable={true}
                  searchablePlaceholder="Search..."
                  searchableError="Not Found"
                  style={{ backgroundColor: '#fafafa' }}
                  dropDownStyle={{ backgroundColor: '#fafafa', height: 300 }}
                  onChangeItem={item => SetCountryCode(item.value)}
                />

              </View>
              <TouchableOpacity style={{ width: 300, borderRadius: 10, padding: 10, borderWidth: 2, borderColor: 'white', alignContent: "center", justifyContent: "center", alignContent: "center" }}>
                <Text style={{ textAlign: "center", color: 'white' }} onPress={() => getData()}>SHOW WEATHER</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: 'center', alignContent: "center", justifyContent: "center", height: 470 }}>
              {!isReady ? <View /> :
                <Image source={require('../assets/arrows.png')}
                  style={{
                    width: 61,
                    height: 61,
                    resizeMode: 'contain',
                  }} />}
            </View>
          </LinearGradient>
          {!isReady ? <View /> : <CityWeather weather={weather} />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default CheckScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    //overflow: 'hidden',
    textAlign: 'center',
    justifyContent: "center"
  },
  container2: {
    textAlign: 'center',
    justifyContent: "center"
  },
  details: {
    flex: 1,
    width: 360,
    flexDirection: 'column',
    height: 725,
    alignItems: "center"
  },
  details_top: {
    //borderTopWidth: 3,
    borderColor: 'white',
    justifyContent: "center",
    flexDirection: "column",
    top: -19
  },
  image: {
    //flex: 1,
    width: '100%',
    //overflow: 'hidden',
    resizeMode: "cover",
    aspectRatio: 1,
  },
  day: {
    color: 'black'
  },
  night: {
    color: 'white'
  },
  geo: {
    flexDirection: "column",
    borderRadius: 5,
    //borderWidth: 2,
    padding: 5,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    //backgroundColor: 'lightgrey'

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.55,
    shadowRadius: 2,

    elevation: 5,
  },
  text_shadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5
  }
});
