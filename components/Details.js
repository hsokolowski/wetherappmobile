/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import firebase from '../firebase/firebase';


function DetailsScreen({ navigation }) {

    const [IsVisible, SetVisible] = useState(false);

    let image = <Text>BRAK ZDJĘCIA</Text>
    if (navigation.getParam('photo') != 0) {
        console.log(navigation.getParam('photo'))
        image = <Image source={{ uri: navigation.getParam('photo') }} style={{ height: 100, width: 170, resizeMode: 'stretch', margin: 5, }}></Image>
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>
            <View style={styles.main}>

                <Text>{navigation.getParam('carMark')} {navigation.getParam('carModel')}</Text>
                {image}
                <View style={styles.line}>
                    <Text>Paliwo:</Text>
                    <Text>{navigation.getParam('fuel')}</Text>
                </View>
                <View style={styles.line}>
                    <Text>Koszt tankowania:</Text>
                    <Text>{navigation.getParam('cost')} zł</Text>
                </View>
                <View style={styles.line}>
                    <Text>Spalanie:</Text>
                    <Text>{navigation.getParam('burn')}l/100 KM</Text>
                </View>
                <View style={styles.line}>
                    <Text>Data zatankowania:</Text>
                    <Text>{navigation.getParam('date')}</Text>
                </View>

                <Button
                    title="Go to Home"
                    onPress={() => navigation.navigate('Add')}
                />
                <TouchableOpacity >
                    <View style={styles.container} >
                        <Text onPress={() => { SetVisible(true)

                        }}>DELETE</Text>
                    </View>
                </TouchableOpacity >

                <Dialog
                    visible={IsVisible}
                    footer={
                        <DialogFooter>
                            <DialogButton
                                text="CANCEL"
                                onPress={() => {SetVisible(false) }}
                            />
                            <DialogButton
                                text="OK"
                                onPress={() => {console.log('delete')
                                firebase.database().ref('/cars/' + navigation.getParam('carId')).set(null)

                                navigation.navigate('List') }}
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

            </View>



        </View>
    );
}

export default DetailsScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        padding: 5,
        textAlign: "center",
        margin: 5,
        borderRadius: 5
    },
    line: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 220,
        padding: 5,
        fontWeight: 'bold'
    },
    main: {
        //flex:1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'powderblue',
        fontWeight: "bold",
        width: 250,
        padding: 20,
        borderRadius: 15
    }
});
