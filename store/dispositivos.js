import { firebaseAction } from 'vuexfire'
import { db } from '../services/firebase'

export const state = () => ({
  all: []
})

export const actions = {
  getDispositivos: firebaseAction(({ bindFirebaseRef }) => {
    return bindFirebaseRef('all', db.ref('dispositivos'))
  })
}
