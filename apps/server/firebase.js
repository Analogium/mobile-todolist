import admin from 'firebase-admin'
import credentials from './serviceAccountKey.json' assert { type: "json" }

// Configure Firebase Messaging: To receive server notifications in your 
// application, you'll need to configure Firebase Messaging

const app = admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(credentials))
})


export function ping(token) {
  return app.messaging().send({
    notification: {
      title: 'test',
      body: 'body'
    },
    token
  })
    .then(res => console.log('RES', res))
    .catch(e => console.log('ERR', e))
}


export const FirebaseMessaging = app.messaging()