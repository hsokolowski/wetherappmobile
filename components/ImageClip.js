import React, { useState, useEffect } from 'react';
import { View, Picker, Text, TouchableOpacity, TextInput, Image, Platform, StyleSheet, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

function ImageClip({ name }) {

  let someImage =""
  switch (name)
  {
    case 'p1':
      someImage = require('../assets/pogoda/p1.gif');
      break;
    case 'p2':
      someImage = require('../assets/pogoda/p2.gif');
      break;
    case 'p3':
      someImage = require('../assets/pogoda/p3.gif');
      break;
    case 'p4':
      someImage = require('../assets/pogoda/p4.gif');
      break;

    default:
      someImage = require('../assets/pogoda/p0.gif');
  }

    return (

    <View style={{ width: 50, height: 50, overflow: 'hidden' }}>
      {/* <Text>{posx}:{posy}</Text> */}
      <Image
        source={someImage}
        resizeMode={'contain'}
        style={{
          height: 50,
          width: 50,

        }} //position of image you want display.
      />
    </View>
    );
}
export default ImageClip;