import React, { useState, useEffect } from 'react';
import { View, Picker, Text, TouchableOpacity, TextInput, Image, Platform, StyleSheet, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

function WeatherIcon({ name }) {

  let someImage =""
  if (name == 'a01d'){
    someImage = require('../assets/icons/a01d.png');
  }
  else if (name == 'a01n'){
    someImage = require('../assets/icons/a01n.png');
  }
  else if (name == 'a02d'){
    someImage = require('../assets/icons/a02n.png');
  }
  else if (name == 'a02n'){
    someImage = require('../assets/icons/a02n.png');
  }
  else if (name == 'a03d'){
    someImage = require('../assets/icons/a03n.png');
  }
  else if (name == 'a03n'){
    someImage = require('../assets/icons/a03n.png');
  }
  else if (name == 'a04d'){
    someImage = require('../assets/icons/a04n.png');
  }
  else if (name == 'a04n'){
    someImage = require('../assets/icons/a04n.png');
  }
  else if (name == 'a05d'){
    someImage = require('../assets/icons/a05n.png');
  }
  else if (name == 'a05n'){
    someImage = require('../assets/icons/a05n.png');
  }
  else if (name == 'a06d'){
    someImage = require('../assets/icons/a06n.png');
  }
  else if (name == 'a06n'){
    someImage = require('../assets/icons/a06n.png');
  }


    return (

    <View style={{ width: 80, height: 80, overflow: 'hidden', justifyContent: 'center', alignItems: 'center'}}>
      {/* <Text>{posx}:{posy}</Text> */}
      <Image
        source={someImage}
        resizeMode={'contain'}
        style={{
          height: 80,
          width: 80,

        }} //position of image you want display.
      />
    </View>
    );
}
export default WeatherIcon;