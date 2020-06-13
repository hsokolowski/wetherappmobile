/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Picker, Text, TouchableOpacity, TextInput, Image, Platform, StyleSheet, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from '../firebase/firebase';
import {key, api} from "../api/wetherbit"

import DatePicker from 'react-native-datepicker';
//var db = SQLite.openDatabase({ name: 'gsdb.db', createFromLocation: '~gsdb.db' });

function HomeScreen({ navigation }) {
  var favCity = "Bielsk Podlaski"

  return (
    <View style={styles.container}>
      <View style={styles.favCity}>
        <View>
          <Text style={styles.favCity_text}>{favCity}</Text>
        </View>
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
      <Text>{key}</Text>
      <Text>Hubert</Text>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center",
    textAlign: "center",
  },
  favCity: {
    backgroundColor: '#fff',
    justifyContent: "space-between",
    alignItems: 'center',
    flexDirection: "row",
    textAlign: "center",
    height: 55,
    width: '100%',

  },
  favCity_text: {
    fontSize: 20,
    fontWeight: "bold",
    left: 15
  }
});
