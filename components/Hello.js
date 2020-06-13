/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Picker, Text, TouchableOpacity,SafeAreaView, TextInput, Image, Platform, StyleSheet, Alert } from 'react-native';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import firebase from '../firebase/firebase';
import {key, api} from "../api/wetherbit"
import Icon from "./ImageClip"

import DatePicker from 'react-native-datepicker';
import { block } from 'react-native-reanimated';
//var db = SQLite.openDatabase({ name: 'gsdb.db', createFromLocation: '~gsdb.db' });

function HomeScreen({ navigation }) {
  let date = new Date();

  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let dayName = days[date.getDay()];
  let day = date.getDate()
  let months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
  let month = months[date.getMonth()]


  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) minutes ='0'+ minutes;
  let seconds = date.getSeconds();

  const [time, setTime] = useState(Date.now());

  // useEffect(() => {
  //   const interval = setInterval(() => setTime(Date.now()), 1000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  function handleRefresh(){
    console.log("refresh2")
  }

  var favCity = "Bielsk Podlaski"
  var weather = "p1"

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
            <Icon name={weather} />
            <Text style={styles.favCity_text2}>17 C</Text>
          </View>
          <View>
            <Text>Słonecznie</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.temp}>

      </View>
      <Text>{key}</Text>
      <Text>{hours}:{minutes}:{seconds} - {time}</Text>
      <Text>Hubert</Text>
      <View>
          <Image source={require('../assets/gear.png')}
          style={{
            width: 41,
            height: 41,
            resizeMode: 'contain',
            right: 15,
          }} />
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
  favCity: {
    padding: 10,
    backgroundColor: '#f7f7f7',
    //backgroundColor: 'red',
    justifyContent: "space-between",
    alignItems: 'center',
    flexDirection: "column",
    textAlign: "center",
    height: 175,
    width: '100%',

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
    top: 0,
    flexDirection: "row",
    alignItems: "center",
    fontSize: 25,
    fontWeight: "bold",
  }
});
