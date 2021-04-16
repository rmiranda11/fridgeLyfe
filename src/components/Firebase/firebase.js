import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
// require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// import dotenv from 'dotenv'


const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_ID,
  // measurementId:process.env.REACT_APP_MEASUREMENTID
};


class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
 // *** Merge Auth and DB User API *** //
 
 onAuthUserListener = (next, fallback) =>
 this.auth.onAuthStateChanged(authUser => {
   if (authUser) {
     this.user(authUser.uid)
       .once('value')
       .then(snapshot => {
         const dbUser = snapshot.val();

        //  default empty roles
        //  if (!dbUser.roles) {
        //    dbUser.roles = {};
        //  }

         // merge auth and db user
         authUser = {
           uid: authUser.uid,
           email: authUser.email,
           ...dbUser,
         };

         next(authUser);
       });
   } else {
     fallback();
   }
 });

  // *** User API ***

  // userFood2 = (uid) => this.db.ref(`users/${uid}/food`)

  // userFood = (uid) => this.db.ref(`users/${uid}`)

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  //*** Food API */

  // userFood = (uid,itemId) => this.db.ref(`food/undefined/${uid}`)
  
  userFood = (uid) => this.db.ref(`users/${uid}/food`)
  
  userFood2 = (uid, authUser) => this.db.ref(`users/${authUser}/food/${uid}`)


  
  food = (uid) => this.db.ref(`food/${uid}`)

  foods = () => this.db.ref("food")

}

export default Firebase;