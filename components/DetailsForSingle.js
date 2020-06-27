/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native';
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import firebase from '../firebase/firebase';
import { LinearGradient } from 'expo-linear-gradient';
import WeatherIcon from './WeatherIcon'

function DetailsSingleScreen({ navigation }) {

    const [IsVisible, SetVisible] = useState(false);
    const [weather, SetWeather] = useState(navigation.getParam('weather'))
    const [dayName, SetDayName] = useState(navigation.getParam('dayName'))
    const [date, setTime] = useState(new Date(weather.ts*1000));

    let months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    let month = months[date.getMonth()]

    let scaleWindImg = 0.8
    if (weather.wind_spd.toFixed(0) < 7) {
        scaleWindImg = 1
    }
    else if (weather.wind_spd.toFixed(0) < 13) {
        scaleWindImg = 1.2
    }
    else {
        scaleWindImg = 1.5
    }

    function getTimeFromTS(ts) {
        var h = new Date(ts * 1000).getHours();
        var m = new Date(ts * 1000).getMinutes();

        h = (h < 10) ? '0' + h : h;
        m = (m < 10) ? '0' + m : m;

        return h + ':' + m;
    }

    return (
        <LinearGradient colors={['#7e89b1', '#4b6aa9', '#2a417b']} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <SafeAreaView style={styles.container}>
                <ScrollView >
                    <View >
                        <View style={{alignContent: "center", justifyContent: "space-between", alignItems: "center"}}>
                            <Text style={[styles.text_white, styles.text_shadow, { fontSize: 30 }]}>{dayName}, {date.getDate()} {month} </Text>
                        </View>
                        <View style={styles.row}>
                            <View style={[styles.cafels, { backgroundColor: '#fff8de', width: 165}]}>
                                <View style={styles.text_shadow}>
                                    <Image source={require('../assets/sunrise.png')}
                                        style={{
                                            width: 60,
                                            height: 60,
                                            resizeMode: 'cover',
                                            borderRadius: 400 / 2,
                                        }} />
                                </View>
                                <Text style={styles.cafels_text}>{weather.sunrise}</Text>
                            </View>
                            <View style={[styles.cafels, { backgroundColor: '#fff8de', width: 165}]}>
                                <View style={styles.text_shadow}>
                                    <Image source={require('../assets/sunset.png')}
                                        style={{
                                            width: 60,
                                            height: 60,
                                            resizeMode: 'cover',
                                            borderRadius: 400 / 2,
                                        }} />
                                </View>
                                <Text style={styles.cafels_text}>{weather.sunset} </Text>
                            </View>
                        </View>
                        <View style={[styles.row,]}>
                            <View style={[styles.cafels, { alignItems: "center", alignContent: "center", backgroundColor: 'white', width: '100%', borderRadius: 50 }]}>
                                <WeatherIcon name={weather.weather.icon} size={100} />
                                <View style={{ flexDirection: "column", }}>
                                    <Text style={[styles.text_shadow, { fontSize: 20 }]}>{weather.temp + "\u2103"}</Text>
                                    <Text style={[{ fontSize: 16, color: '#777777' }]}>{weather.app_temp + "\u2103"} Apparent</Text>
                                    <Text style={[{ fontSize: 14 }]}>{weather.weather.description}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.row,]}>
                            <View style={[styles.cafels, { justifyContent: "space-around",alignItems: "center", alignContent: "center", backgroundColor: '#dee7ff', width: '100%', borderRadius: 50 }]}>
                                {/* <View style={[styles.cafels_column, { backgroundColor: '#dee7ff', width: 110, padding: 10, borderRadius: 40 }]}>
                                    <View style={styles.text_shadow}>
                                        <Image source={require('../assets/rain.png')}
                                            style={{
                                                width: 60,
                                                height: 60,
                                                resizeMode: 'cover',
                                                borderRadius: 400 / 2,
                                            }} />
                                    </View>
                                    <Text style={[{ fontSize: 18, marginLeft: 10, fontWeight: "bold" }]}>{weather.pop} %</Text>
                                </View> */}
                                <View style={[styles.cafels_column, { backgroundColor: '#dee7ff', width: 110, padding: 10, borderRadius: 40 }]}>
                                    <View style={styles.text_shadow}>
                                        <Image source={require('../assets/measure.png')}
                                            style={{
                                                width: 60,
                                                height: 60,
                                                resizeMode: 'cover',
                                                borderRadius: 400 / 2,
                                            }} />
                                    </View>
                                    <Text style={[{ fontSize: 18, fontWeight: "bold", textAlign: "center" }]}>{weather.precip.toFixed(1)} mm</Text>
                                </View>
                                <View style={[styles.cafels_column, { backgroundColor: '#dee7ff', width: 110, padding: 10, borderRadius: 40 }]}>
                                    <View style={styles.text_shadow}>
                                        <Image source={require('../assets/humidity.png')}
                                            style={{
                                                width: 60,
                                                height: 60,
                                                resizeMode: 'cover',
                                                borderRadius: 400 / 2,
                                            }} />
                                    </View>
                                    <Text style={[{ fontSize: 18, marginLeft: 10, fontWeight: "bold" }]}>{weather.rh} %</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.row,]}>
                            <View style={[styles.cafels_column, { backgroundColor: '#fff0c8', width: 220, padding: 18, borderRadius: 40 }]}>
                                <View style={styles.text_shadow}>
                                    <Image source={require('../assets/wind.png')}
                                        style={{
                                            width: 130,
                                            height: 60,
                                            resizeMode: 'cover',
                                            margin: 0
                                        }} />
                                </View>
                                <Text style={[{ fontSize: 20, marginLeft: 10 }, styles.text_shadow]}>{weather.wind_spd.toFixed(2)} m/s </Text>
                            </View>
                            <View style={[styles.cafels_column, { backgroundColor: '#defffc', width: 110, padding: 14, borderRadius: 40 }]}>
                                <Text style={[{ fontSize: 14, textAlign: "center", fontWeight: "bold" }]}>{weather.wind_cdir.toUpperCase()} </Text>
                                <Text style={[{ fontSize: 14, textAlign: "center", fontWeight: "bold" }]}> ({weather.wind_dir + '\u00B0'})</Text>
                                <Image source={require('../assets/direction.png')}
                                    style={{
                                        width: 50,
                                        height: 50,
                                        resizeMode: 'cover',
                                        transform: [{ rotate: `${weather.wind_dir}deg` }, { scale: scaleWindImg }],
                                        //transform: [{ rotate: `90deg` }, { scale: 1.5 }],
                                        margin: 5
                                    }} />
                            </View>

                        </View>
                        <View style={styles.row}>
                            <View style={[styles.cafels, { backgroundColor: '#def5ff', width: 165 }]}>
                                <View style={styles.text_shadow}>
                                    <Image source={require('../assets/snow.png')}
                                        style={{
                                            width: 60,
                                            height: 60,
                                            resizeMode: 'cover',
                                            borderRadius: 400 / 2,
                                        }} />
                                </View>
                                <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", alignContent: "center", marginLeft: 0, }}>
                                    <Text style={[styles.cafels_text, { textAlign: "center", }]}>{weather.snow} mm</Text>
                                    {/* <Text style={{}}> mm</Text> */}
                                </View>
                            </View>
                            <View style={[styles.cafels, { backgroundColor: '#def5ff', width: 165 }]}>
                                <View style={styles.text_shadow}>
                                    <Image source={require('../assets/pressure.png')}
                                        style={{
                                            width: 60,
                                            height: 60,
                                            resizeMode: 'cover',
                                            borderRadius: 400 / 2,
                                        }} />
                                </View>
                                <Text style={styles.cafels_text, { fontSize: 16, textAlign: "center", left: 10 }}>{weather.pres.toFixed(0)} hPa</Text>
                            </View>
                        </View>
                        <View style={[styles.row,]}>
                            <View style={[styles.cafels_column, { backgroundColor: '#f3f3f3', width: 105, padding: 10, borderRadius: 40 }]}>
                                <View style={styles.text_shadow}>
                                    <Image source={require('../assets/clouds.png')}
                                        style={{
                                            width: 80,
                                            height: 48,
                                            resizeMode: 'cover',
                                            //marginBottom: 10
                                        }} />
                                </View>
                                <Text style={[{ fontSize: 20, marginLeft: 10, fontWeight: "bold" }, styles.text_shadow]}>{weather.clouds} %</Text>
                            </View>
                            <View style={[styles.cafels_column, { backgroundColor: '#e1e1e1', width: 105, padding: 14, borderRadius: 40 }]}>
                                <Image source={require('../assets/uv.png')}
                                    style={{
                                        width: 47,
                                        height: 48,
                                        resizeMode: 'cover',
                                        }} />
                                <Text style={[{ fontSize: 20, textAlign: "center", fontWeight: "bold" }]}>{weather.uv.toFixed(2)} </Text>
                            </View>
                            <View style={[styles.cafels_column, { backgroundColor: '#f1f1f1', width: 105, padding: 14, borderRadius: 40 }]}>
                                <Image source={require('../assets/visibility.png')}
                                    style={{
                                        width: 48,
                                        height: 48,
                                        resizeMode: 'cover',
                                        }} />
                                <Text style={[{ fontSize: 20, textAlign: "center", fontWeight: "bold" }]}>{weather.vis.toFixed(1)} KM</Text>
                            </View>
                        </View>
                    </View>

                    {/* <Button
                        title="Go to Home"
                        onPress={() => navigation.navigate('Add')}
                    />
                    <TouchableOpacity >
                        <View >
                            <Text onPress={() => {
                                SetVisible(true)

                            }}>DELETE</Text>
                        </View>
                    </TouchableOpacity > */}

                    <Dialog
                        visible={IsVisible}
                        footer={
                            <DialogFooter>
                                <DialogButton
                                    text="CANCEL"
                                    onPress={() => { SetVisible(false) }}
                                />
                                <DialogButton
                                    text="OK"
                                    onPress={() => {
                                        console.log('delete')
                                        firebase.database().ref('/cars/' + navigation.getParam('carId')).set(null)

                                        navigation.navigate('List')
                                    }}
                                />
                            </DialogFooter>
                        }
                    >
                        <DialogContent>
                            <Text>
                                Na pewno chcesz usunać?
                       </Text>
                        </DialogContent>
                    </Dialog>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>

    );
}

export default DetailsSingleScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "space-between"
    },
    text_white: {
        color: 'white'
    },
    text_shadow: {
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 1
    },
    cafels: {
        width: 140,
        borderRadius: 200,
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        padding: 5
    },
    cafels_column: {
        borderRadius: 200,
        flexDirection: "column",
        alignContent: "center",
        alignItems: "center",
        padding: 5
    },
    cafels_text: {
        fontSize: 20,
        marginLeft: 10
    },
    row: {
        marginTop: 15,
        flexDirection: "row",
        justifyContent: "space-between",

    }

});
