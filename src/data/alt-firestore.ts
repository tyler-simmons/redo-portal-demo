import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyAGXoBVcpKCW2YokDx0xrXi60id6Qe0IYs",
//     authDomain: "new-portal-demo.firebaseapp.com",
//     databaseURL: "https://new-portal-demo.firebaseio.com",
//     projectId: "new-portal-demo",
//     storageBucket: "new-portal-demo.appspot.com",
//     messagingSenderId: "206289852256",
//     appId: "1:206289852256:web:b770bb245bfb502b233005",
//     measurementId: "G-XF78C54TLG"
//   };

// firebase.initializeApp(firebaseConfig, 'alt');

// const altDb = firebase.firestore();
// const altAuth = firebase.auth();

// export const altAnonAuth = () => {
// 	return firebase.auth().signInAnonymously();
// };

// export const altIsAuthenticated = async () => {
// 	await altAuth.signInWithEmailAndPassword('tyler.simmons@golevelone.com', 'Password1!');
// 	return altAuth.currentUser !== null;
// };

// export {altAuth, altDb};