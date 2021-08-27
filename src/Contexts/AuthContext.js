import React, { useContext, useState, useEffect } from "react"
import { auth, db } from "../firebase"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState(null)
  const [userZipCodes, setUserZipCodes] = useState(null)

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }


  function getUserId(user) {

    const dbRef = db.ref('users')

    dbRef.on('value', (snapshot) => {

      for (let id in snapshot.val()) {
        const dbUser = snapshot.val()[id]
        if (dbUser.email === user.email) {
          setUserId(id)
          return
        }
      }

      dbRef.push({
        email: user.email,
      }).getKey()
    })
  }

  function addZipCode(zipCode) {
    if (zipCode !== null && userId !== null) {
      const dbRef = db.ref(`users/${userId}/zipCodes`)
      dbRef.push(zipCode)
    }
  }

  function deleteZipCode(key) {
    if (key !== null && userId !== null) {
      db.ref(`users/${userId}/zipCodes/${key}`).remove()
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      if (user != null) {
        getUserId(user)
      }
      setLoading(false)
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    if (userId != null) {
      const dbRef = db.ref(`users/${userId}/zipCodes/`)
      dbRef.on('value', (snapshot) => {
        setUserZipCodes(snapshot.val())
      })
    }
  }, [userId])


  const value = {
    currentUser,
    userZipCodes,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    addZipCode,
    deleteZipCode,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}