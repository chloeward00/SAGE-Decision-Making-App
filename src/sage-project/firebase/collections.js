import fire from 'firebase/app'
import 'firebase/firestore';

// export firestore collections here

const groupsCollection = fire.firestore().collection('groups');
const eventsCollection = fire.firestore().collection('events');
const usersCollection = fire.firestore().collection('users');


export {
    groupsCollection,
    eventsCollection,
    usersCollection
}
