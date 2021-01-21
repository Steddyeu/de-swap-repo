# What is De-Swap?

De-Swap is a peer-to-peer social swapping app aimed at young people and works as a way of swapping items of clothing with other users. 
I we wanted to create an app that would be beneficial to a user in a number of ways, providing them with the opportunity to both help save the environment and the cash in their pockets, all from their phone.

Users can access a general Marketplace of items up for ‘swaps’, and inspect the items to get details such as clothing condition. Users can also upload pictures to our database of items they would like to offer or barter in a trade, and if happy with the deal on the table, request to swap via out chat functionality. Just remember, before you give your old clothes the drop, check out our App and give it a swap. 

## To run on your emulator 
1. Clone repo
2. npm install
3. Open your emulator 
4. In the project terminal run the command expo start

# Tech
## Front end
* React-native 
* React-Image picker
* CSS

## Back end
* Firebase
* Firestore
* Fire base authentication
* Lodash library

# Features

* Login/Sign-up
* Upload images (select from camera roll or take picture)
* See other users clothes on homepage (excluding yours)
* See your clothes on your user page.
* realtime chat capabilities
* Clothes swapping capabilities


# Further details on how De-Swap was made, the challenges faced and how they were overcome 

## Tech Choices 

 I decided early on that we wanted to test ourselves and engage with as many new technologies as possible throughout this project. 

## Front-end

As de-swap is mainly aimed at younger people who are more likely to pick up a phone than turn on a computer we decided that de-swap should be an app with the front end being built with react-native, using expo to make it work on both android and ios devices. 

To take images we used react-natives image picker, which allowed us to ask permission to see a users photo library or open their camera to take a picture of an item they wished to upload. 

We created our own chatroom in react-native storing the data in firebases firestore, something i shall talk more about in a moment. 

We styled our app with css, our aim was to use simple and complementary colours to create a clean and clear user experience. 

When it came to testing our app and experimenting with the user experience, we used android studio which gave us live feedback on how our app looked and ran, with clear errors to help us identify where bugs arose and how to fix them.

## Backend

As our users would be messaging and swapping in real time, it was critical that we had back end storage which could be updated and read so that a user could see what another was doing at the same time. We also needed a database which could store all of our images and user information securely. 

Originally, we had planned to build our own backend with express, postgres and socket, but during our spiking phase we discovered firebase which covered all our back end needs. 

With firebase authentification we could create a secure user accounts with a unique id for each user.
We could store and get our images firebase database.
Most importantly, using firebases firestore meant users could have real time conversations and swap capabilities, a vital aspect of our app. 

Using firebase and harnessing it features meant all our energies could be focused on functionality and creating a pleasant user experience. 

We also used the lodash library to help create our swap functionality. 

## Soft Skills

Communication, preparation, planning and accountability were critical to our projects success.
We made use of Agile practices.
Each morning we would conduct a standup and each member would discuss what they achieved the previous day, hurdles they faced and their plan for the day. This ensured each member of the team knew what the other was doing and we could asses if their task required more help. 
At the core of our project was the trello board, highly detailed which we updated each morning before we began the day and each evening when we finished. 

Our user stories were made with figma, and were highly detailed to create full user experiences. Everything from colour schemes, fonts, layouts and features. 
