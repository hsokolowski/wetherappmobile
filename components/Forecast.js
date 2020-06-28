/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import firebase from '../firebase/firebase';
import { key, api, forecast } from "../api/wetherbit"
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import WeatherIcon from "./WeatherIcon"



function ForecastScreen({ navigation }) {

  const [days, setDays] = useState(null);
  const [keys, setKeys] = useState([]);
  const [IsVisible, SetVisible] = useState(false);
  const [IsRCBReady, SetIsRCBReady] = useState(false);
  const [favCity, setFavCity] = useState("Bielsk Podlaski")
  const [country, setCountry] = useState("pl")
  const [language, setLanguage] = useState("en")
  const [message, setMessage] = useState(null)
  const [goodDay, setGoodDay] = useState(null)
  const [badDay, setBadDay] = useState(null)
  const [nameBadDay, setNameBadDay] = useState(null)
  const [NameGoodDay, setNameGoodDay] = useState(null)

  const customData = require('../api/dump.json');
  const image = require("../assets/itembg.png");
  const msgs = ['CYCLING', "JOGGING", 'WALK', 'a BARBECUE']

  useEffect(() => {
    // firebase.database().ref('/fav').on('value', function (snapshot) {
    //   var cities_result = [];

    //   snapshot.forEach(function (item) {
    //     var itemVal = item.val();
    //     cities_result.push(itemVal);
    //   });

    //   setFavCity(cities_result[0].city_name)
    //   setCountry(cities_result[0].country_code)

    // }, function (error) {
    //   console.error(error);
    // })
    //getWeatherApiAsync()
    setDays(customData.data)
    SetRCB(customData.data)
  }, []);
  // useEffect(() => {
  //   getWeatherApiAsync()
  // },[]);

  async function getWeatherApiAsync() {
    try {
      let response = await fetch(
        forecast + `?city=${favCity}&country=${country}&lang=${language}&key=${key}`
      );
      let json = await response.json();
      console.log("forecast")
      console.log(json.data)
      setDays(json.data)
      SetRCB(json.data)
      return json.data;
    } catch (error) {
      console.error(error);
    }
  }

  function SetRCB(days) {
    let goodDay = false, badDay = false;
    for (let i = 0; i < days.length; i++) {
      if (IsGoodDay(days[i])&& goodDay==false) {
        setGoodDay((days[i].datetime))
        setNameGoodDay(SetNameDay(days[i].datetime))
        setMessage(msgs[Math.floor(Math.random() * 4) + 0])
        goodDay = true
      }
      if (IsBadDay(days[i])&&  badDay == false) {
        setBadDay((days[i].datetime))
        setNameBadDay(SetNameDay(days[i].datetime))
        badDay = true
      }
      if (goodDay && badDay) {
        SetVisible(true)
        break;
      }
    }
  }

  function SetNameDay(datetime){
    let date = new Date(datetime)
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let dayName = days[date.getDay()];

    return dayName;
  }

  function IsGoodDay(day) {
    const { rh, wind_spd, pop, snow, vis, precip } = day

    let like = 0
    if (wind_spd < 9) like++
    if (precip < 3) like++
    if (pop < 30) like += 2
    if (vis == 0 || vis > 16) like += 2
    if (snow == 0) like++
    if (rh > 60) like++

    //console.log(day.datetime + ":SUMA: " + (like))
    if (like > 5) return true
    return false;
  }
  function IsBadDay(day) {
    const { clouds, wind_spd, pop, snow, vis, precip } = day

    let dangerous = 0
    if (wind_spd > 10) dangerous += 2
    if (clouds > 65) dangerous++
    if (precip > 4) dangerous++
    if (precip > 7) dangerous += 2
    if (snow > 7) dangerous++
    if (vis > 0 && vis < 10) dangerous += 2

    dangerous += pop

    if (dangerous > 61) return true
    return false;
  }

  function GetWaterPopIcon(pop) {
    if (pop < 21) return require('../assets/water-drop1.png')
    else if (pop < 50) return require('../assets/water-drop.png')
    else if (pop < 80) return require('../assets/water-drop2.png')
    else return require('../assets/water-drop3.png')
  }

  function Item({ weather }) {
    let weatherCode = weather.weather.code;
    var date = new Date(weather.datetime);
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let dayName = days[date.getDay()];

    return (
      <TouchableOpacity onPress={() => {
        console.log('push');
        navigation.navigate('Details', { weather, dayName });
      }}>

        <View style={styles.container} >
          <ImageBackground source={image} style={styles.image}>
            <View style={styles.item}>
              <View style={styles.item_inside1}>
                <Text style={{ color: 'white' }}>{dayName}, {date.getDate()}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 30, color: '#68ff9b' }}>{weather.temp + "\u2103"}</Text>
              </View>
              <View style={styles.item_inside2}>
                {/* <Icon name={weatherCode} /> */}
                <WeatherIcon name={weather.weather.icon} />
                <View style={{ justifyContent: "center", alignContent: "center" }}>
                  <Image style={styles.tinyLogo} source={GetWaterPopIcon(weather.pop)} />
                  <Text>{weather.pop}%</Text>
                </View>
              </View>


            </View>
          </ImageBackground>
        </View>

      </TouchableOpacity >
    );
  }

  if (days == null) {
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f3f3' }}></View>
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f3f3' }}>
      <FlatList
        style={{ marginTop: 15 }}
        data={days}
        renderItem={({ item }) => <Item weather={item} />}
        keyExtractor={item => item.datetime}
        key={item => item.datetime}
      />
      <Dialog
        visible={IsVisible}
        footer={
          <DialogFooter>
            <DialogButton
              text="I got it!"
              onPress={() => { SetVisible(false) }}
            />
            {/* <DialogButton
              text="YES"
              onPress={() => {
                console.log('delete')
                firebase.database().ref('/cities/' + navigation.getParam('city').id).set(null)
                SetVisible(false)
                navigation.navigate('Watchlist')
              }}
            /> */}
          </DialogFooter>
        }
      >
        <DialogContent>
          <View style={{ justifyContent: "center", alignItems: "center", alignContent: "center", flexDirection: "column" }}>
            {(goodDay != null)
              ? <View style={{width: '100%', marginBottom: 10 ,padding: 10 }}>
                <Text style={{ fontSize: 17, color: 'white',textAlign: "center",fontWeight: "bold" , backgroundColor: 'green' }}>CATCH THE MOMENT</Text>
                <View style={{flexDirection: "row", justifyContent: "space-between", marginBottom: 5, marginTop: 5}}>
                  <Text style={{ fontSize: 17, fontWeight: "bold" }}>{goodDay}</Text>
                  <Text style={{ fontSize: 17, fontWeight: "bold" }}>{NameGoodDay}</Text>
                </View>

                <Text style={{ fontSize: 17 }}>It's is a good day for </Text>
                <Text style={{ fontSize: 17 }}>{message}.</Text>
              </View>
              : <View>
              </View>}

            {(badDay != null)
              ? <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 17,  color: 'white',textAlign: "center",fontWeight: "bold" , backgroundColor: 'red'  }}>WARNING ! </Text>
                <View style={{flexDirection: "row", justifyContent: "space-between", marginBottom: 5, marginTop: 5}}>
                  <Text style={{ fontSize: 17, fontWeight: "bold" }}>{badDay}</Text>
                  <Text style={{ fontSize: 17, fontWeight: "bold" }}>{nameBadDay}</Text>
                </View>
              <Text style={{ fontSize: 17 }}>Take care of yourself that day!</Text>
              <Text style={{ fontSize: 17 }}>Probable thunderstorms.</Text>
            </View>
              : <View>
              </View>}


          </View>

        </DialogContent>
      </Dialog>
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
    resizeMode: 'stretch',
    resizeMode: 'cover',
    width: '100%',
    height: '100%'
  },
  title: {
    padding: 10,
    color: 'black',
    fontWeight: 'bold',
    backgroundColor: 'yellow',
    borderRadius: 10,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 320,
    padding: 10,
  },
  item_inside1: {
    flex: 1,
    flexDirection: 'column',
    width: '60%',
  },
  item_inside2: {
    flex: 1,
    flexDirection: 'row',
    width: '40%',
    justifyContent: "flex-end",
  },
});
