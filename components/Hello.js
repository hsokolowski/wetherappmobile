/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Picker, Text, TouchableOpacity, TextInput, Image, Platform, StyleSheet, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from '../firebase/firebase';
import {key, api} from "../api/wetherbit"

import DatePicker from 'react-native-datepicker';
//var db = SQLite.openDatabase({ name: 'gsdb.db', createFromLocation: '~gsdb.db' });

function HomeScreen({ navigation }) {


  return (
    <View style={styles.container}>
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

});
