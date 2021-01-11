// import firebase from 'react-native-firebase'
import collections from '../constants/collections'
import firebase from '../firebase-config';
export default class FirebaseService {
    auth = firebase.auth()

    firestore = firebase.firestore()

    messageRef = this.firestore.collection(collections.MESSAGES);

    async signIn() {
        try {
            const response = await this.auth.signInAnonymously()
            return { user: response.user }
        } catch (error) {
            return { error }
        }
    }

    async fetchMessages() {
        const messages = await this.messageRef
            .orderBy('created_at', 'desc')
            .limit(10)
            .get()

        return messages.docs
    }

    async createMessage({ message, userName }) {
        await this.messageRef.add({
            message,
            user_id: userName,
            created_at: new Date()
        })
    }
}
