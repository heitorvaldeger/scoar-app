const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.createNewUser = functions.https.onCall(async (data, context) => {
  try {
    const user = await admin.auth().createUser({
      displayName: data.nome,
      email: data.email,
      emailVerified: false,
      password: data.matricula
    })
    if (data.admin) {
      await admin.auth().setCustomUserClaims(user.uid, { admin: true })
    }
    return user
  } catch (err) {
    return { message: `Error: ${err.message}` }
  }
})

exports.deleteUser = functions.https.onCall(async (data, context) => {
  try {
    await admin.auth().deleteUser(data.uid)
    return data.uid
  } catch (e) {
    return { message: 'Error user delete' }
  }
})

exports.getListUsers = functions.https.onCall(async (data, context) => {
  try {
    const users = await admin.auth().listUsers()
    return users
  } catch (err) {
    return { message: `Error: ${err.message}` }
  }
})
