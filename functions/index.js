const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, res) => {
  res.send('Hello from Heitor!')
})

exports.createNewUser = functions.https.onCall((data, context) => {
  return admin.auth().createUser({
    displayName: data.nome,
    email: data.email,
    emailVerified: false,
    password: '12345678'
  })
    .then((user) => {
      return user
    })
    .catch((err) => {
      return { message: `Error: ${err.message}` }
    })
})

exports.deleteUser = functions.https.onCall((data, context) => {
  return admin.auth().deleteUser(data.uid)
    .then(() => {
      return data.uid
    })
    .catch(() => {
      return { message: 'Error user delete' }
    })
})

exports.getListUsers = functions.https.onCall((data, context) => {
  return admin.auth().listUsers()
    .then((users) => {
      return users
    })
    .catch((err) => {
      return { message: `Error: ${err.message}` }
    })
})
