/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, TextInput,Picker, } from 'react-native';
import firebase from '../firebase/firebase';
import {key, api, forecast} from "../api/wetherbit"
import Icon from "./ImageClip"




function CheckScreen({ navigation }) {
  const [value, onChangeText] = useState('')
  const [country, SetCountry] = useState('')
  const [countryCode, SetCountryCode] = useState(null)

  function handleSetCountry(countryCode){
    console.log("wybrany kod "+ countryCode)
    SetCountryCode(countryCode)
    countriesWithCodes.forEach(element => {
      if(element.country_code == countryCode)
      {
        SetCountry(element.country_name)
        console.log(element.country_name)
      }
    });
  }

  function getWeather(){

  }

  const countriesWithCodes = require('../api/countries.json');
  const pickers = countriesWithCodes.map((item, index) =>
  {
    if(item.country_name != null){
       return <Picker.Item key={index} label={item.country_name} value={item.country_code} />
    }})


    return (
      <View style={{ flex: 1, alignItems: 'center' , backgroundColor: '#113255'}}>
        <View style={{justifyContent: 'center', backgroundColor:'yellow', alignItems: "center", alignContent: "center"}}>
          <View style={{ alignItems: 'center', justifyContent: 'space-around' , width: 300, backgroundColor:'red', padding: 10, flexDirection: "column"}}>
            <TextInput
              style={{ width: '100%', padding: 10, borderColor: '#113255', borderWidth: 2, borderRadius: 10 , backgroundColor: '#f3f3f3'}}
              onChangeText={text => onChangeText(text)}
              value={value}
              placeholder={'City..'}
            />
            <View  style={{width: '100%', borderColor: '#113255', borderWidth: 2, borderRadius: 10 , backgroundColor: '#f3f3f3', overflow: 'hidden'}}>
            <Picker
                selectedValue={countryCode}

                onValueChange={(itemValue, itemIndex) =>
                  handleSetCountry(itemValue)
                  //SetCountryCode(itemValue)
                }>
                {pickers}
            </Picker>
            </View>

          </View>
          <TouchableOpacity style={{width: 300, borderRadius: 10, padding: 10, borderWidth: 2, alignContent: "center", justifyContent: "center", alignContent: "center"}}>
            <Text style={{textAlign: "center"}} onPress={() => getWeather()}>SHOW WEATHER</Text>
          </TouchableOpacity>
        </View>



      </View>
    );
}

export default CheckScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        //borderColor: '#333',
        //borderColor: '#113255',
        borderColor: '#0f2a47',
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
});


function CountryCodes(){

}