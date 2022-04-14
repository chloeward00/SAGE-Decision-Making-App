import 'firebase/auth';
import 'firebase/firestore';
import fire from 'firebase/app'

const createUserDocument = async (user, name) => {

    // if no user signing up to the database just return
    if(!user) return;

    const userRef = fire.firestore().collection('users').doc(`${user.uid}`)

    const userDocument = await userRef.get();

    if(!userDocument.exists) {
        console.log('userDocument does not exist, create a document')
        const { email } = user;

        try {
            console.log('adding user credentials to the database')
            userRef.set({
                userName: name,
                userEmail: email,
                userUID: user.uid,
                userBio: '',
                userEvents: [],
                userGroups: [],
                createdAt: new Date(),
            })
            console.log("added to the database")
        } catch(error) {
            console.log(error)
        }
    } else {
        console.log('it exists')
    }
}


export default createUserDocument;


