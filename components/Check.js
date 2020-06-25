/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, Image, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, TextInput,Picker, } from 'react-native';
import firebase from '../firebase/firebase';
import {key, api, forecast} from "../api/wetherbit"
import Icon from "./ImageClip"
import { LinearGradient } from 'expo-linear-gradient';




function CheckScreen({ navigation }) {
  const [value, onChangeText] = useState('')
  const [country, SetCountry] = useState('')
  const [language,setLanguage] = useState("en")
  const [countryCode, SetCountryCode] = useState("Country")

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

  async function getWeatherApiAsync() {
    console.log(api+`?city=${value}&country=${countryCode}&lang=${language}&key=${key}`)
    try {
      let response = await fetch(
        api+`?city=${value}&country=${countryCode}&lang=${language}&key=${key}`
      );
      let json = await response.json();
      console.log(json.data[0])
      
      return json.data[0];
    } catch (error) {
      console.error(error);
    }
  }

  const countriesWithCodes = require('../api/countries.json');
  const pickers = countriesWithCodes.map((item, index) =>
  {
    if(item.country_name != null){
      //console.log(item.country_name +" "+ item.country_code)
       return <Picker.Item key={index} label={item.country_name} value={item.country_code} />
    }})


    return (
      <View style={{ flex: 1, alignItems: 'center' , backgroundColor: '#113255'}}>
        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={{flex: 1, overflow: "hidden", margin: 0, width: 400,paddingTop: 10,}}>
          <View style={{justifyContent: 'center',  alignItems: "center", alignContent: "center"}}>
            <View style={{ alignItems: 'center', justifyContent: 'space-around' , width: 320,  padding: 10, flexDirection: "column"}}>
              <TextInput
                style={{ width: '100%', padding: 10, borderColor: '#113255', borderWidth: 2, borderRadius: 10 , backgroundColor: '#f3f3f3'}}
                onChangeText={text => onChangeText(text)}
                value={value}
                placeholder={'City..'}
              />
              <View  style={{width: '100%',marginTop: 10, borderColor: '#113255', borderWidth: 2, borderRadius: 10 , backgroundColor: '#f3f3f3', overflow: 'hidden'}}>
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
            <TouchableOpacity style={{width: 300, borderRadius: 10, padding: 10, borderWidth: 2,borderColor: 'white', alignContent: "center", justifyContent: "center", alignContent: "center"}}>
              <Text style={{textAlign: "center", color:'white'}} onPress={() => getWeatherApiAsync()}>SHOW WEATHER</Text>
            </TouchableOpacity>
          </View>
          
          <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
              <View style={styles.details}>
                    
              </View> 
              </ScrollView>         
          </SafeAreaView>
        </LinearGradient>
      </View>
    );
}

export default CheckScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden',
        textAlign: 'center',
    },
    details: {
      flex: 1,
    }
});


function CountryCodes(){

}