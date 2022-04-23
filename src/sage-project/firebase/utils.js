import firebase from "firebase/app";
import 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyCx0iOI6aOtZ9O66mY7D4ueHgWv9kmirCU",
    authDomain: "sage-decision-making-app.firebaseapp.com",
    projectId: "sage-decision-making-app",
    storageBucket: "sage-decision-making-app.appspot.com",
    messagingSenderId: "1002751213097",
    appId: "1:1002751213097:web:4bb357eb40d588dc6da638",
    measurementId: "G-RV335ZG9LN"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const analytics = firebase.analytics;

export { firebase, analytics };