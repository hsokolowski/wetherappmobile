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
    someImage = require('../assets/icons/a02d.png');
  }
  else if (name == 'a02n'){
    someImage = require('../assets/icons/a02d.png');
  }
  else if (name == 'a03d'){
    someImage = require('../assets/icons/a03n.png');
  }
  else if (name == 'a03n'){
    someImage = require('../assets/icons/a03d.png');
  }
  else if (name == 'a04d'){
    someImage = require('../assets/icons/a04d.png');
  }
  else if (name == 'a04n'){
    someImage = require('../assets/icons/a04n.png');
  }
  else if (name == 'a05d'){
    someImage = require('../assets/icons/a05d.png');
  }
  else if (name == 'a05n'){
    someImage = require('../assets/icons/a05n.png');
  }
  else if (name == 'a06d'){
    someImage = require('../assets/icons/a06d.png');
  }
  else if (name == 'a06n'){
    someImage = require('../assets/icons/a06n.png');
  }
  else if (name == 'c01d'){
    someImage = require('../assets/icons/c01d.png');
  }
  else if (name == 'c01n'){
    someImage = require('../assets/icons/c01n.png');
  }
  else if (name == 'c02d'){
    someImage = require('../assets/icons/c02d.png');
  }
  else if (name == 'c02n'){
    someImage = require('../assets/icons/c02n.png');
  }
  else if (name == 'c03d'){
    someImage = require('../assets/icons/c03d.png');
  }
  else if (name == 'c03n'){
    someImage = require('../assets/icons/c03n.png');
  }
  else if (name == 'c04d'){
    someImage = require('../assets/icons/c04d.png');
  }
  else if (name == 'c04n'){
    someImage = require('../assets/icons/c04n.png');
  }
  else if (name == 'd01d'){
    someImage = require('../assets/icons/d01d.png');
  }
  else if (name == 'd01n'){
    someImage = require('../assets/icons/d01n.png');
  }
  else if (name == 'd02d'){
    someImage = require('../assets/icons/d02d.png');
  }
  else if (name == 'd02n'){
    someImage = require('../assets/icons/d02n.png');
  }
  else if (name == 'd03d'){
    someImage = require('../assets/icons/d03d.png');
  }
  else if (name == 'd03n'){
    someImage = require('../assets/icons/d03n.png');
  }
  else if (name == 'f01d'){
    someImage = require('../assets/icons/f01d.png');
  }
  else if (name == 'f01n'){
    someImage = require('../assets/icons/f01n.png');
  }
  else if (name == 'r01d'){
    someImage = require('../assets/icons/r01d.png');
  }
  else if (name == 'r01n'){
    someImage = require('../assets/icons/r01n.png');
  }
  else if (name == 'r02d'){
    someImage = require('../assets/icons/r02d.png');
  }
  else if (name == 'r02n'){
    someImage = require('../assets/icons/r02d.png');
  }
  else if (name == 'r03d'){
    someImage = require('../assets/icons/r03n.png');
  }
  else if (name == 'r03n'){
    someImage = require('../assets/icons/r03d.png');
  }
  else if (name == 'r04d'){
    someImage = require('../assets/icons/r04d.png');
  }
  else if (name == 'r04n'){
    someImage = require('../assets/icons/r04n.png');
  }
  else if (name == 'r05d'){
    someImage = require('../assets/icons/r05d.png');
  }
  else if (name == 'r05n'){
    someImage = require('../assets/icons/r05n.png');
  }
  else if (name == 'r06d'){
    someImage = require('../assets/icons/r06d.png');
  }
  else if (name == 'r06n'){
    someImage = require('../assets/icons/r06n.png');
  }
  else if (name == 's01d'){
    someImage = require('../assets/icons/s01d.png');
  }
  else if (name == 's01n'){
    someImage = require('../assets/icons/s01n.png');
  }
  else if (name == 's02d'){
    someImage = require('../assets/icons/s02d.png');
  }
  else if (name == 's02n'){
    someImage = require('../assets/icons/s02d.png');
  }
  else if (name == 's03d'){
    someImage = require('../assets/icons/s03n.png');
  }
  else if (name == 's03n'){
    someImage = require('../assets/icons/s03d.png');
  }
  else if (name == 's04d'){
    someImage = require('../assets/icons/s04d.png');
  }
  else if (name == 's04n'){
    someImage = require('../assets/icons/s04n.png');
  }
  else if (name == 's05d'){
    someImage = require('../assets/icons/s05d.png');
  }
  else if (name == 's05n'){
    someImage = require('../assets/icons/s05n.png');
  }
  else if (name == 's06d'){
    someImage = require('../assets/icons/s06d.png');
  }
  else if (name == 's06n'){
    someImage = require('../assets/icons/s06n.png');
  }
  else if (name == 't01d'){
    someImage = require('../assets/icons/t01d.png');
  }
  else if (name == 't01n'){
    someImage = require('../assets/icons/t01n.png');
  }
  else if (name == 't02d'){
    someImage = require('../assets/icons/t02d.png');
  }
  else if (name == 't02n'){
    someImage = require('../assets/icons/t02d.png');
  }
  else if (name == 't03d'){
    someImage = require('../assets/icons/t03n.png');
  }
  else if (name == 't03n'){
    someImage = require('../assets/icons/t03d.png');
  }
  else if (name == 't04d'){
    someImage = require('../assets/icons/t04d.png');
  }
  else if (name == 't04n'){
    someImage = require('../assets/icons/t04n.png');
  }
  else if (name == 't05d'){
    someImage = require('../assets/icons/t05d.png');
  }
  else if (name == 't05n'){
    someImage = require('../assets/icons/t05n.png');
  }
  else if (name == 'u00d'){
    someImage = require('../assets/icons/u00d.png');
  }
  else if (name == 'u00n'){
    someImage = require('../assets/icons/u00n.png');
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