import fire from 'firebase/app'
import 'firebase/auth'
import createUserDocument from './functions';

const config = {
    apiKey: "AIzaSyCwaFXi8bFlFlupg4YSy5nmiZSIrhakcdI",
    authDomain: "sage-decision-making.firebaseapp.com",
    projectId: "sage-decision-making",
    storageBucket: "sage-decision-making.appspot.com",
    messagingSenderId: "100306809687",
    appId: "1:100306809687:web:84db2951d6590ce5f14412",
    measurementId: "G-JC0PR1NJ98"
}

class Firebase {

    constructor() {
        if (!fire.apps.length) {
            fire.initializeApp(config);
        }
        
        this.auth = fire.auth()
    }

    isInitialized() {
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve)
        })
    }

    async login({ email, password }) {
        return await this.auth.signInWithEmailAndPassword(email, password)
    }

    async logout() {
        return await this.auth.signOut()
    }

    async register({ name, email, password }) {
        const { user } = await this.auth.createUserWithEmailAndPassword(email, password)
        await createUserDocument(user, name)
        await this.auth.currentUser.sendEmailVerification()
        return this.auth.currentUser.updateProfile({
            displayName: name,
        })

    }

    isLoggedIN() {
        if (this.auth.currentUser) {
            return true
        } else {
            return false
        }
    }

    async deleteAccount() {
        if (this.auth.currentUser) {
            await this.auth.currentUser.delete()
            return true
        } else {
            return false
        }
    }

    async updatePasswords(password, password2) {
       
        //const credential = this.auth.EmailAuthProvider.credential(user.email, password)
       // user.reauthenticateWithCredential(credential)
        //var user2 = this.auth.currentUser;

        const user = this.auth.currentUser;
    
        try {
            const credential = fire.auth.EmailAuthProvider.credential(user.email, password)
            user.reauthenticateWithCredential(credential)
            user.updatePassword(password2)
       
        } catch (error) {
            return false
        }
    }

    async resetPassword(email){
            this.auth.sendPasswordResetEmail(email)
              .then(function () {
               // success
            }).catch((error) => {
            });
    }

    async updateUsersEmail(password,newemail) {

        const user = fire.auth().currentUser;
        const credential = fire.auth.EmailAuthProvider.credential(user.email, password)

        user.reauthenticateWithCredential(credential)
    
        //const credential = fire.auth().EmailAuthProvider.credential(email, password)

        //var credentials = fire.auth().EmailAuthProvider.credential(email, password);

        //user.reauthenticate(credentials);

        this.auth.currentUser.updateEmail(newemail).then(() => {
        // Update successful
        // ...
        }).catch((error) => {
        // An error occurred
        // ...
        });
    }

    getProfile() {
        if (this.auth.currentUser) {
            return {
                name: this.auth.currentUser.displayName,
                email: this.auth.currentUser.email,
                verified: this.auth.currentUser.emailVerified
            }
        } else {
            return {
                name: null,
                email: null
            }
        }
    }

    async sendVerification() {
        try {
            if (this.auth.currentUser) {
                await this.auth.currentUser.sendEmailVerification()
                return true
            } else {
                throw ''
            }
        } catch (error) {
            return false
        }
    }
}

export default new Firebase()