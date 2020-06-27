/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import firebase from '../firebase/firebase';
import { LinearGradient } from 'expo-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';


function SettingsScreen({ navigation }) {
    const countriesWithCodesNEW = require('../api/countries-new.json');
    const [value, onChangeText] = useState('')
    const [countryCode, SetCountryCode] = useState(null)
    const [favcity, SetFavCity] = useState("[]");
    const [tmp, SetTmp] = useState(null);

    useEffect(() => {
        firebase.database().ref('/fav').on('value', function (snapshot) {
            var cities_result = [];

            snapshot.forEach(function (item) {
                var itemVal = item.val();
                cities_result.push(itemVal);
            });

            SetFavCity(cities_result[0].city_name)
            SetTmp(cities_result[0].id)
        }, function (error) {
            console.error(error);
        })
    }, []);

    function FavCity(){
        console.log(tmp)

        var key = firebase.database().ref('/fav').push().key

        let city = {
          id: key,
          city_name: value,
          country_code: countryCode
        }

        firebase.database().ref('/fav').child(key).set(city);

        firebase.database().ref('/fav/' + tmp).set(null)

        navigation.navigate('Hello')
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']}
                style={{
                    flex: 1,
                    margin: 0, width: 400, paddingTop: 10,  alignContent: "center", alignItems: "center"
                }}>
                <View style={{ justifyContent: 'center', alignItems: "center", alignContent: "center", marginBottom: 10 }}>
                    <Text style={{ color: 'white', fontSize: 30, fontWeight: "bold" }}>Your favourite city:</Text>
                    <Text style={{ color: '#68ff9b', fontSize: 30, fontWeight: "bold" }}>{favcity.toUpperCase()}</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: "center", alignContent: "center" }}>
                    <View style={{ alignItems: 'center', justifyContent: 'space-around', width: 320, padding: 10, flexDirection: "column" }}>
                        <TextInput
                            style={{ width: '100%', padding: 10, borderColor: 'lightgrey', borderWidth: 1, borderRadius: 5, backgroundColor: '#fafafa' }}
                            onChangeText={text => onChangeText(text)}
                            value={value.toUpperCase()}
                            placeholder={'City..'}
                        //editable={true}
                        />
                        <DropDownPicker
                            items={countriesWithCodesNEW}
                            defaultValue={countryCode}
                            style={{ paddingVertical: 10, height: 200 }}
                            containerStyle={{ height: 40, width: 300, margin: 10 }}
                            placeholder="Select country"
                            placeholderStyle={{
                                color: 'lightgrey',
                            }}
                            searchable={true}
                            searchablePlaceholder="Search..."
                            searchableError="Not Found"
                            style={{ backgroundColor: '#fafafa' }}
                            dropDownStyle={{ backgroundColor: '#fafafa', height: 300 }}
                            onChangeItem={item => SetCountryCode(item.value)}
                        />

                    </View>
                    <TouchableOpacity style={{ width: 300, borderRadius: 10, padding: 10, borderWidth: 2, borderColor: 'white', alignContent: "center", justifyContent: "center", alignContent: "center" }}>
                        <Text style={{ textAlign: "center", color: 'white' }} onPress={() => FavCity()}>Set Favourite City</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>
    );
}

export default SettingsScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'powderblue',
        padding: 10,
        textAlign: 'center',
        borderRadius: 15,
        marginBottom: 10,
        fontWeight: 'bold',
    },

});
