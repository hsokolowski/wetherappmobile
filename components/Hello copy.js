/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Picker, Text, TouchableOpacity, TextInput, Image, Platform, StyleSheet, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from '../firebase/firebase';

import DatePicker from 'react-native-datepicker';
//var db = SQLite.openDatabase({ name: 'gsdb.db', createFromLocation: '~gsdb.db' });

function HomeScreen({ navigation }) {

  const [marka, SetMarka] = useState(0);
  const [model, SetModel] = useState(0);
  const [zdj, SetZdj] = useState(0);
  const [litry, SetLitry] = useState(0);
  const [cena, SetCena] = useState(0);
  const [kilometry, SetKilometry] = useState(0);
  const [data, SetData] = useState(0);
  const [paliwo, SetPaliwo] = useState('Diesel');
  const [isDisable, SetDisable] = useState(true);

  function handleSetMarka(e) {
    SetMarka(e);
  }
  function handleSetModel(e) {
    SetModel(e);
  }
  function handleSetZdj(e) {
    SetZdj(e);
  }
  function handleSetPaliwo(e) {
    console.log(e)
    SetPaliwo(e);
  }
  function handleSetLitry(e) {
    SetLitry(isNumber(e));
  }
  function handleSetCena(e) {
    console.log(e);
    SetCena(isNumber(e));
  }
  function handleSetKilometry(e) {
    if(e==''){
        SetDisable(true)
    }
    if(e!=''||e!=0) SetDisable(false);

    SetKilometry(isNumber(e));
  }
  function handleSetDisable(){
    return isDisable;
  }
  function isNumber(text) {
    if (text.includes('..')) return alert("Podwójna kropka");
    let newText = '';
    let numbers = '0123456789.';

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      }
      else {
        // your call back function
        alert("Tylko liczby");
      }
    }
    return newText;
  }
  function handleSetdata(e) {
    console.log(e);
    SetData(e);
  }
  let id = 0;
  function buildEntity() {
    var key = firebase.database().ref('/cars').push().key

    let spalanie = obliczSpalanie(kilometry, litry);
    let _koszt = cena * litry;
    let car = {
      carId: key,
      carMark: marka,
      carModel: model,
      fuel: paliwo,
      cost: _koszt.toFixed(2),
      burn: spalanie.toFixed(1),
      date: data,
      photo: zdj,
    };
    console.log(car);


    let cars = firebase.database().ref('/cars').child(key).set(car);

    navigation.navigate('List');
  }
  function obliczSpalanie(z, l) {
    let spalanie = 0;
    spalanie = (l / z) * 100;

    return spalanie;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View
          style={styles.marka}>
          <Text style={styles.text_on_input}>MARKA:</Text>
          <TextInput
            style={styles.marka_input}
            onChangeText={t => handleSetMarka(t)}
            value={marka}
          />
          <Text style={styles.text_on_input}>MODEL:</Text>
          <TextInput
            style={styles.marka_input}
            onChangeText={t => handleSetModel(t)}
            value={model}
          />
          <Text style={styles.text_on_input}>LINK DO ZDJĘCIA:</Text>
          <TextInput
            style={styles.marka_input}
            onChangeText={t => handleSetZdj(t)}
            value={zdj}
          />
        </View>
        <View style={styles.marka2}>
          <View style={{ height: 50, width: 200, borderColor: 'white', borderBottomWidth: 2 }}>
            <Picker
              selectedValue={paliwo}

              onValueChange={(itemValue, itemIndex) =>
                handleSetPaliwo(itemValue)
              }>
              <Picker.Item label="Diesel" value="Diesel" />
              <Picker.Item label="Benzyna" value="Benzyna" />
              <Picker.Item label="Gaz" value="Gaz" />
            </Picker>
          </View>

          <Text style={styles.text_on_input}>ILE LITRÓW WLANO:</Text>
          <TextInput
            style={styles.marka_input}
            onChangeText={t => handleSetLitry(t)}
            value={litry}
            keyboardType="numeric"
          />
          <Text style={styles.text_on_input}>CENA ZA LITR:</Text>
          <TextInput
            style={styles.marka_input}
            onChangeText={t => handleSetCena(t)}
            value={cena}
            keyboardType="numeric"
          />
          <Text style={styles.text_on_input}>PRZEJECHANE KILOMETRY:</Text>
          <TextInput
            style={styles.marka_input}
            onChangeText={t => handleSetKilometry(t)}
            value={kilometry}
            keyboardType="numeric"
          />
        </View>
        <View
          style={styles.marka3}>
          <Text style={styles.text_on_input}>DATA ZATANKOWANIA:</Text>
          <DatePicker
            style={{ width: 200 }}
            date={data}
            mode="date"
            placeholder="Wybierz date"
            format="YYYY-MM-DD"
            //minDate="2016-05-01"
            //maxDate="2016-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
                borderColor: 'white',
              },
              // ...You can check the source to find the other keys.
            }}
            onDateChange={date => handleSetdata(date)}
          />

          <TouchableOpacity onPress={() => buildEntity()} disabled={isDisable}>
            <Text style={[isDisable ? styles.disabledButton : styles.button]}>
              DODAJ
            </Text>
          </TouchableOpacity >
          <TouchableOpacity onPress={() => navigation.navigate('List')}>
            <Text style={styles.button}>
              Lista
          </Text>
          </TouchableOpacity >
        </View>


      </ScrollView>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text_on_input: {
    padding: 10,
    fontWeight: 'bold',
  },
  marka: {
    flex: 2,
    backgroundColor: 'powderblue',
    alignItems: 'center',
    padding: 10,
  },
  marka2: {
    flex: 2,
    alignItems: 'center',
    backgroundColor: 'skyblue',
    padding: 10,
  },
  marka3: {
    flex: 3,
    alignItems: 'center',
    backgroundColor: 'steelblue',
    padding: 10,
  },
  marka_input: {
    height: 40,
    width: 200,
    borderColor: 'white',
    borderWidth: 2,
    textAlign: 'center',
    color: 'black',
  },
  button: {
    marginTop: 30,
    width: 200,
    borderRadius: 5,
    padding: 10,
    textAlign: 'center',
    backgroundColor: 'blue',
    color: 'white',
  },
  disabledButton: {
    marginTop: 30,
    width: 200,
    borderRadius: 5,
    padding: 10,
    textAlign: 'center',
    backgroundColor: 'lightblue',
    color: 'white',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 0,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
