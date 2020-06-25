/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, Image, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, TextInput, ImageBackground, } from 'react-native';
import firebase from '../firebase/firebase';
import { key, api, forecast } from "../api/wetherbit"
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
  const countriesWithCodesNEW = require('../api/countries-new.json');
  let image = ""

  async function getWeatherApiAsync() {
    console.log(api + `?city=${value}&country=${countryCode}&lang=${language}&key=${key}`)
    try {
      let response = await fetch(
        api + `?city=${value}&country=${countryCode}&lang=${language}&key=${key}`
      );
      let json = await response.json();
      //console.log(json.data[0])
      SetWeather(json.data[0])
      if(json.data[0].pod == 'd') 
      {
        image = require('../assets/day.png')
        SetIsDay(true)
      }
      else{
        image = require('../assets/night.png')
        SetIsDay(false)
      }
      SetIsReady(true)
      return json.data[0];
    } catch (error) {
      console.error(error);
    }
  }

  function CityWeather({ weather }) {
    console.log(weather.pod)
    console.log(typeof(weather.pod ))
    let image = (weather.pod == "d") ? require('../assets/day.png') : require('../assets/night.png')
    console.log(image)
    let weatherCode = weather.weather.code;
    var date = new Date(weather.datetime);
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let dayName = days[date.getDay()];

    return (
      <TouchableOpacity onPress={() => {
        console.log('push');
        //navigation.navigate('Details', weather);
      }}>
        
        <View style={styles.details} >
        <ImageBackground source={image} style={styles.image}>
            <View style={styles.details_top}>
              <WeatherIcon name={weather.weather.icon} size={100} />
              <View>
                <Text style={isDay ? styles.day : styles.night}>{weather.temp + "\u2103"}</Text>
              </View>
            </View>
            <View style={styles.details_bottom}></View>
            <Image source={require('../assets/lon-lat.png')}
              style={{
                width: 61,
                height: 61,
                resizeMode: 'contain',
              }} />
            <Text style={isDay ? styles.day : styles.night}>Longitude: {weather.lon}</Text>
            <Text style={isDay ? styles.day : styles.night}>Latitude : {weather.lat}</Text>
            <Text style={isDay ? styles.day : styles.night}>Pressure : {weather.pres} hPa</Text>
            </ImageBackground>
          </View>
        
      </TouchableOpacity >
    );
  }


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#113255' }}>
          <LinearGradient colors={!isReady ? ['#4c669f', '#3b5998', '#192f6a'] : isDay ? ['#4c669f', '#3b5998', '#bee6ee'] : ['#4c669f', '#3b5998', 'black']} 
          style={{flex: 1,
            margin: 0, width: 400, paddingTop: 10, justifyContent: "center", alignContent: "center", alignItems: "center"
          }}>
            <View style={{ justifyContent: 'center', alignItems: "center", alignContent: "center" }}>
              <View style={{ alignItems: 'center', justifyContent: 'space-around', width: 320, padding: 10, flexDirection: "column" }}>
                <TextInput
                  style={{ width: '100%', padding: 10, borderColor: 'lightgrey', borderWidth: 1, borderRadius: 5, backgroundColor: '#fafafa' }}
                  onChangeText={text => onChangeText(text)}
                  value={value}
                  placeholder={'City..'}
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
                <Text style={{ textAlign: "center", color: 'white' }} onPress={() => getWeatherApiAsync()}>SHOW WEATHER</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: 'center', alignContent: "center", justifyContent: "center", height: 470}}>
            {!isReady ? <View /> : <Image source={require('../assets/arrows.png')}
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
  details: {
    flex: 1,
    width: 360,
    flexDirection: 'column',
    height: 360
  },
  details_top: {
    flexDirection: "row",
    //backgroundColor: 'red',
  },
  image: {
    //flex: 1,
    width: '100%',
    overflow: 'hidden',
    resizeMode: "cover",
    aspectRatio: 1,
  },
  day: {
    color: 'black'
  },
  night: {
    color: 'white'
  }
});
