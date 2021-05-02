import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCdblWwLQOTGmS7XGoWcrhG-8Wv9RhzwGE',
	authDomain: 'portal-demo-11283.firebaseapp.com',
	databaseURL: 'https://portal-demo-11283.firebaseio.com',
	projectId: 'portal-demo-11283',
	storageBucket: 'portal-demo-11283.appspot.com',
	messagingSenderId: '355944807795',
	appId: '1:355944807795:web:4073ef2c17dd9537135906',
	measurementId: 'G-X282N1MZTB',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

export const anonAuth = () => {
	return firebase.auth().signInAnonymously();
};

export const isAuthenticated = async () => {
	await auth.signInWithEmailAndPassword('tyler.simmons@golevelone.com', 'Password1!');
	return auth.currentUser !== null;
};

export { db, auth };