import React, { useState, useEffect } from 'react';
import { View, Picker, Text, TouchableOpacity, TextInput, Image, Platform, StyleSheet, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

function ImageClip({ name }) {

  let someImage =""
  if (name >= 200 && name <=233){
    someImage = require('../assets/pogoda/r4.gif');
  }
  else if (name >= 300 && name <=302){
    someImage = require('../assets/pogoda/p3.gif');
  }
  else if (name>=500 && name <=522){
    someImage = require('../assets/pogoda/r3.gif');
  }
  else if (name>=600 && name <=612){
    someImage = require('../assets/pogoda/r5.gif');
  }
  else if (name>=621 && name <=623){
    someImage = require('../assets/pogoda/r6.gif');
  }
  else if ((name>=700 && name <=751) || name ==804){
    someImage = require('../assets/pogoda/r1.gif');
  }
  else if ( name ==800){
    someImage = require('../assets/pogoda/p1.gif');
  }
  else if (name>=801 && name <=803){
    someImage = require('../assets/pogoda/r6.gif');
  }
  else{
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