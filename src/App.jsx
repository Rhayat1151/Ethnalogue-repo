import React, { useState, useEffect } from 'react'
import { auth, db } from './firebase'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { motion, AnimatePresence } from 'framer-motion'
import AdminPanel from './components/AdminPanel'
import UserDashboard from './components/UserDashboard'
import HomePage from './components/Homepage'
import AboutPage from './components/AboutPage'
import DictionaryPage from './components/DictionaryPage'
import Navigation from './components/Navigation'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [view, setView] = useState('home') // home, about, user, admin, dictionary
  const [showLogin, setShowLogin] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  // Get admin emails from environment variables with fallback
  const adminEmails = import.meta.env.VITE_ADMIN_EMAILS 
    ? import.meta.env.VITE_ADMIN_EMAILS.split(',').map(email => email.trim())
    : ['adminjunaid@gmail.com']

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      if (currentUser) {
        setIsAdmin(adminEmails.includes(currentUser.email))
      } else {
        setIsAdmin(false)
      }
    })
    return () => unsubscribe()
  }, [adminEmails])

  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password)
        setSuccessMsg('Login successful! Redirecting to Home...')
      } else {
        const cred = await createUserWithEmailAndPassword(auth, email, password)
        await setDoc(doc(db, 'users', cred.user.uid), {
          firstName,
          lastName,
          email,
          favorites: [],
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp()
        })
        setSuccessMsg('Sign Up successful! Redirecting to Home...')
      }

      setEmail('')
      setPassword('')
      setFirstName('')
      setLastName('')
      setShowLogin(false)
      setView('home')
      setTimeout(() => setSuccessMsg(''), 3000)
    } catch (error) {
      alert(error.message)
    }
    setLoading(false)
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      setView('home')
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation 
        user={user} 
        isAdmin={isAdmin} 
        onLogout={handleLogout} 
        currentView={view} 
        setView={setView} 
        setShowLogin={setShowLogin}
      />

      {successMsg && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded shadow z-50">
          {successMsg}
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {view === 'home' && <HomePage user={user} />}
        {view === 'about' && <AboutPage />}
        {view === 'user' && <UserDashboard user={user} />}
        {view === 'admin' && isAdmin && <AdminPanel user={user} />}
        {view === 'dictionary' && <DictionaryPage user={user} />}

        <AnimatePresence>
          {showLogin && !user && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 flex items-center justify-center z-50 bg-black/40"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
              >
                <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
                  {isLogin ? 'Login' : 'Sign Up'}
                </h1>
                <form onSubmit={handleAuth}>
                  {!isLogin && (
                    <div className="flex gap-2 mb-4">
                      <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                        required
                      />
                    </div>
                  )}
                  <div className="mb-4">
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4 disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
                  </button>
                  <p className="text-center text-sm">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                      type="button"
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-blue-500 hover:text-blue-700 font-bold"
                    >
                      {isLogin ? 'Sign Up' : 'Login'}
                    </button>
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowLogin(false)}
                    className="mt-4 text-red-500 hover:text-red-700 text-sm w-full"
                  >
                    Cancel
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App