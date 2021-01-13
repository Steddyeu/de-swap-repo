// import firebase from 'react-native-firebase'
import collections from "../constants/collections";
import firebase from "../firebase-config";

export default class FirebaseService {
    auth = firebase.auth();

    firestore = firebase.firestore();

    messageRef = this.firestore.collection(collections.MESSAGES);

    // async fetchMessages() {
    //     const messages = await this.messageRef
    //         .orderBy("created_at", "desc")
    //         .limit(10)
    //         .get();

    //     return messages.docs;
    // }

    chatID = (userName2) => {

        const user = firebase.auth().currentUser;
        const chatterID = user.displayName;
        //chatterID=userName
        const chateeID = userName2;
        //chateeID=userName2
        const chatIDpre = [];
        chatIDpre.push(chatterID);
        chatIDpre.push(chateeID);
        chatIDpre.sort();
        console.log(userName2, 'chatid');
        return chatIDpre.join("_");
    };

    async createMessage({ message, userName, userName2 }) {
        //create chat ID doc .add or .set
        await this.messageRef.doc(this.chatID(userName2)).set({
            chat_id: this.chatID(userName2),
            users: [userName, userName2]
        })
        await this.messageRef.doc(this.chatID(userName2)).collection("chats").add({
            message,
            user_id: userName,
            created_at: new Date(),
        });
    }

    // async fetchMessages() {
    //     const messages = await this.messageRef
    //         .doc(this.chatID())
    //         .collection("chats")
    //         .orderBy("created_at", "desc")
    //         .limit(10)
    //         .get();
    //     return messages.docs;
    // }
}
