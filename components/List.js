/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import firebase from '../firebase/firebase';
import { key, api, forecast } from "../api/wetherbit"
import { LinearGradient } from 'expo-linear-gradient';


function ListScreen({ navigation }) {

    const [cities, SetCities] = useState(0);
    const [keys, SetKeys] = useState([]);
    const [weather, setWeather] = useState(null)
    const [language, setLanguage] = useState("en")

    useEffect(() => {
        firebase.database().ref('/cities').on('value', function (snapshot) {
            var cities_result = [];

            snapshot.forEach(function (item) {
                var itemVal = item.val();
                cities_result.push(itemVal);
            });

            SetCities(cities_result)
        }, function (error) {
            console.error(error);
        })
    }, []);

    async function getWeatherApiAsync(favCity, country) {
        try {
            let response = await fetch(
                api + `?city=${favCity}&country=${country}&lang=${language}&key=${key}`
            );
            let json = await response.json();
            console.log(json.data[0])
            //setWeather(json.data[0])
            return json.data[0];
        } catch (error) {
            console.error(error);
        }
    }


    function Item({ city }) {

        return (
            <TouchableOpacity onPress={() => {
                console.log('push');
                navigation.navigate('Watch', { city });
            }}>
                <View style={styles.container} >
                    <View style={styles.item}>
                        {/* <Text style={{ fontWeight: "bold", textAlign: "center" }}>{city.city_name.toUpperCase()}</Text> */}
                        <TextInput
                            style={{ width: '100%', padding: 10, borderColor: 'lightgrey', borderWidth: 1, borderRadius: 5, backgroundColor: '#fafafa', textAlign: "center" }}
                            value={city.city_name.toUpperCase()}
                            placeholder={'City..'}
                            editable={false}
                        />
                    </View>
                </View>
            </TouchableOpacity >
        );
    }

    return (
        <LinearGradient colors={['#7e89b1', '#4b6aa9', '#2a417b']} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <FlatList
                style={{ marginTop: 15 }}
                data={cities}
                renderItem={({ item }) => <Item city={item} />}
                keyExtractor={item => item.id}
                key={item => item.id}
            />
        </LinearGradient>
    );
}

export default ListScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'powderblue',
        padding: 1,
        textAlign: 'center',
        borderRadius: 15,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    burn: {
        padding: 10,
        color: 'black',
        fontWeight: 'bold',
        backgroundColor: 'yellow',
        borderRadius: 10,
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 280,
        padding: 10,
    },
});
