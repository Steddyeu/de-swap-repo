// import firebase from 'react-native-firebase'
import collections from "../constants/collections";
import firebase from "../firebase-config";

export default class FirebaseService {
    auth = firebase.auth();

    firestore = firebase.firestore();

    messageRef = this.firestore.collection(collections.MESSAGES);

    //   async fetchMessages() {
    //     const messages = await this.messageRef
    //       .orderBy("created_at", "desc")
    //       .limit(10)
    //       .get();

    //     return messages.docs;
    //   }

    chatID = () => {
        const user = firebase.auth().currentUser;
        const chatterID = user.displayName;
        const chateeID = "angela";
        const chatIDpre = [];
        chatIDpre.push(chatterID);
        chatIDpre.push(chateeID);
        chatIDpre.sort();
        console.log(chatIDpre.join("_"));
        return chatIDpre.join("_");
    };

    async createMessage({ message, userName }) {
        await this.messageRef.add({
            message,
            user_id: userName,
            created_at: new Date(),
        });
    }

    //   async createMessage({ message, userName }) {
    //     await this.messageRef.doc(this.chatID()).collection("chats").add({
    //       message,
    //       user_id: userName,
    //       created_at: new Date(),
    //     });
    //   }

    //     async fetchMessages() {
    //         const messages = await this.messageRef
    //             .doc(this.chatID())
    //             .collection("chats")
    //             .orderBy("created_at", "desc")
    //             .limit(10)
    //             .get();
    //         return messages.docs;
    //     }
}
