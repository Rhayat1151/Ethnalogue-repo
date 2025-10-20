import React, { useState, useEffect, useCallback } from 'react'
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, serverTimestamp, query, orderBy } from 'firebase/firestore'
import { db } from '../firebase'
import LanguageForm from './LanguageForm'
import LanguageList from './LanguageList'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Users, Globe, BookOpen, BarChart3, Search, Filter, Download, Upload } from 'lucide-react'

const AdminPanel = ({ user }) => {
  const [languages, setLanguages] = useState([])
  const [editingLanguage, setEditingLanguage] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [stats, setStats] = useState({
    totalLanguages: 0,
    totalWords: 0,
    endangeredCount: 0,
    recentAdditions: 0
  })

  // Memoized data processing
  const processLanguagesData = useCallback((snapshot) => {
    const languagesData = []
    let totalWords = 0
    let endangeredCount = 0
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    let recentAdditions = 0

    snapshot.forEach((doc) => {
      const languageData = { id: doc.id, ...doc.data() }
      languagesData.push(languageData)
      
      // Calculate stats
      if (languageData.dictionary) {
        totalWords += languageData.dictionary.length
      }
      if (languageData.status === 'Endangered' || languageData.status === 'Critically Endangered') {
        endangeredCount++
      }
      if (languageData.createdAt && languageData.createdAt.toDate() > oneWeekAgo) {
        recentAdditions++
      }
    })

    setLanguages(languagesData)
    setStats({
      totalLanguages: languagesData.length,
      totalWords,
      endangeredCount,
      recentAdditions
    })
    setLoading(false)
  }, [])

  useEffect(() => {
    setLoading(true)
    // Optimized query with ordering
    const languagesQuery = query(
      collection(db, "languages"),
      orderBy("createdAt", "desc")
    )

    const unsubscribe = onSnapshot(languagesQuery, processLanguagesData, (error) => {
      console.error("Error fetching languages:", error)
      setLoading(false)
    })
    
    return () => unsubscribe()
  }, [processLanguagesData])

  const handleAddLanguage = async (languageData) => {
    try {
      setLoading(true)
      await addDoc(collection(db, "languages"), {
        ...languageData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        createdBy: user.uid,
        createdByEmail: user.email
      })
      setShowForm(false)
    } catch (error) {
      alert("Error adding language: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateLanguage = async (languageData) => {
    try {
      setLoading(true)
      await updateDoc(doc(db, "languages", editingLanguage.id), {
        ...languageData,
        updatedAt: serverTimestamp(),
        updatedBy: user.uid,
        updatedByEmail: user.email
      })
      setEditingLanguage(null)
      setShowForm(false)
    } catch (error) {
      alert("Error updating language: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteLanguage = async (id) => {
    if (window.confirm("Are you sure you want to delete this language? This action cannot be undone.")) {
      try {
        setLoading(true)
        await deleteDoc(doc(db, "languages", id))
      } catch (error) {
        alert("Error deleting language: " + error.message)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleBulkAction = async (action, selectedIds) => {
    // Implement bulk actions if needed
    console.log('Bulk action:', action, selectedIds)
  }

  const filteredLanguages = languages.filter(language =>
    language.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    language.isoCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    language.region?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">Manage languages and dictionary entries</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setEditingLanguage(null)
                  setShowForm(true)
                }}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                <Plus size={20} />
                Add New Language
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                <Upload size={20} />
                Import Data
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Languages</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalLanguages}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Globe className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Words</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalWords}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <BookOpen className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Endangered</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.endangeredCount}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <BarChart3 className="text-red-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">+{stats.recentAdditions}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full lg:max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search languages, ISO codes, regions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter size={16} />
                Filters
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Download size={16} />
                Export
              </button>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        >
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <LanguageList 
              languages={filteredLanguages}
              onEdit={(language) => {
                setEditingLanguage(language)
                setShowForm(true)
              }}
              onDelete={handleDeleteLanguage}
              onBulkAction={handleBulkAction}
            />
          )}
        </motion.div>

        {/* Language Form Modal */}
        <AnimatePresence>
          {showForm && (
            <LanguageForm 
              language={editingLanguage}
              onSubmit={editingLanguage ? handleUpdateLanguage : handleAddLanguage}
              onCancel={() => {
                setShowForm(false)
                setEditingLanguage(null)
              }}
              loading={loading}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default AdminPanel