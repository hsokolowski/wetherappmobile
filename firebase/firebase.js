import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyBJ5XSN29F4pTAgUpa5x6rQH4vk8F7qas8",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "https://wetherapp-78b9d.firebaseio.com/",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_ID"
};
if (firebase.apps.length === 0) {
    firebase.initializeApp(config);
}



//firebase.firestore().settings(settings);

export default firebase;