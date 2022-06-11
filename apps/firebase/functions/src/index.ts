import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import axios from 'axios'

const config = functions.config()

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

admin.initializeApp()

const registerUserToHasura = (user: admin.auth.UserRecord) => {
  const CREATE_USER = `
    mutation CreateUser($id: String!, $email: String!) {
      insert_users_one(object: {id: $id, email: $email}, on_conflict: {constraint: users_pkey, update_columns: []}) {
        id
        email
      }
    }
  `

  const query = {
    query: CREATE_USER,
    variables: { id: user.uid, email: user.email },
  }

  return axios({
    method: 'post',
    url: config.hasura.endpoint,
    data: query,
    headers: {
      'x-hasura-admin-secret': config.hasura.admin.secret,
    },
  })
}

exports.processSignUp = functions.auth.user().onCreate(async (user) => {
  const customClaims = {
    'https://hasura.io/jwt/claims': {
      'x-hasura-default-role': 'user',
      'x-hasura-allowed-roles': ['user'],
      'x-hasura-user-id': user.uid,
    },
  }

  try {
    // Set custom user claims on this newly created user.
    await admin.auth().setCustomUserClaims(user.uid, customClaims)

    await registerUserToHasura(user)

    // Update firestore to notify client to force refresh.
    const metadataRef = admin.firestore().collection('userMetas').doc(user.uid)

    // Set the refresh time to the current UTC timestamp.
    // This will be captured on the client to force a token refresh.
    await metadataRef.create({
      refreshTime: admin.firestore.FieldValue.serverTimestamp(),
    })
  } catch (error) {
    console.error(error)
  }
})
