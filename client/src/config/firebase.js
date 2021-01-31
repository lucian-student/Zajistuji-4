import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';
/*
konfigurace firebase
*/
firebase.initializeApp(firebaseConfig);

export default firebase;