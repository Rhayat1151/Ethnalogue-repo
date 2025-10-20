import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { db } from '../firebase'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, MapPin, Users, Book, Globe, ChevronDown, ChevronUp, X, Eye, Grid, List } from 'lucide-react'

// Fix for React-Leaflet default marker
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// MapUpdater to dynamically change center
const MapUpdater = ({ center }) => {
  const map = useMap()
  useEffect(() => {
    if (center?.[0] != null && center?.[1] != null) {
      map.setView(center, 7)
    }
  }, [center, map])
  return null
}

const UserDashboard = ({ user }) => {
  const [languages, setLanguages] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRegion, setFilterRegion] = useState('')
  const [filterFamily, setFilterFamily] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState(null)
  const [viewMode, setViewMode] = useState('grid') // grid or list
  const [sortBy, setSortBy] = useState('name')
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(12)

  const regions = ['Punjab', 'Sindh', 'Khyber Pakhtunkhwa', 'Balochistan', 'Gilgit-Baltistan', 'Azad Kashmir', 'Federal']
  const families = ['Indo-Aryan', 'Iranian', 'Dardic', 'Turkic', 'Dravidian', 'Isolate', 'Other']
  const statusOptions = ['Endangered', 'Vulnerable', 'Stable', 'Thriving', 'Critically Endangered']

  // Load languages with optimized query
  useEffect(() => {
    setLoading(true)
    try {
      const languagesQuery = query(
        collection(db, 'languages'),
        orderBy('name')
      )

      const unsubscribeLanguages = onSnapshot(languagesQuery, snapshot => {
        const langs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setLanguages(langs)
        setLoading(false)
      })

      return () => unsubscribeLanguages()
    } catch (err) {
      console.error('Error loading languages:', err)
      setLoading(false)
    }
  }, [])

  // Memoized filtered languages for performance
  const filteredLanguages = useMemo(() => {
    return languages.filter(lang => {
      const matchesSearch =
        lang.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lang.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lang.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lang.family?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lang.isoCode?.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesRegion = !filterRegion || lang.region === filterRegion
      const matchesFamily = !filterFamily || lang.family === filterFamily
      const matchesStatus = !filterStatus || lang.status === filterStatus
      
      return matchesSearch && matchesRegion && matchesFamily && matchesStatus
    })
  }, [languages, searchTerm, filterRegion, filterFamily, filterStatus])

  // Memoized sorted languages
  const sortedLanguages = useMemo(() => {
    return [...filteredLanguages].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.name || '').localeCompare(b.name || '')
        case 'speakers':
          return (b.speakers || 0) - (a.speakers || 0)
        case 'region':
          return (a.region || '').localeCompare(b.region || '')
        default:
          return 0
      }
    })
  }, [filteredLanguages, sortBy])

  // Pagination
  const paginatedLanguages = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return sortedLanguages.slice(startIndex, startIndex + itemsPerPage)
  }, [sortedLanguages, currentPage, itemsPerPage])

  const totalPages = Math.ceil(sortedLanguages.length / itemsPerPage)

  // Explore language function
  const exploreLanguage = useCallback((language) => {
    setSelectedLanguage(language)
    // Scroll to detail view
    setTimeout(() => {
      document.getElementById('language-detail')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }, [])

  // Safe marker check
  const isValidLatLng = (lat, lng) => !isNaN(lat) && !isNaN(lng) && lat != null && lng != null

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('')
    setFilterRegion('')
    setFilterFamily('')
    setFilterStatus('')
    setCurrentPage(1)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Endangered': return 'bg-red-100 text-red-800 border-red-200'
      case 'Critically Endangered': return 'bg-red-100 text-red-800 border-red-200'
      case 'Vulnerable': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'Stable': return 'bg-green-100 text-green-800 border-green-200'
      case 'Thriving': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  // Language Card Component
  const LanguageCard = ({ language }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              {language.name}
            </h3>
            <span className="inline-block bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full mt-2">
              {language.isoCode}
            </span>
          </div>
          {language.status && (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(language.status)}`}>
              {language.status}
            </span>
          )}
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <MapPin size={16} className="text-blue-500" />
            <span>{language.region || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Users size={16} className="text-green-500" />
            <span>{language.family || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Book size={16} className="text-purple-500" />
            <span>{language.dictionary?.length || 0} words</span>
          </div>
          {language.speakers && (
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Globe size={16} className="text-orange-500" />
              <span>{language.speakers.toLocaleString()} speakers</span>
            </div>
          )}
        </div>

        {language.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {language.description}
          </p>
        )}

        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => exploreLanguage(language)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors text-sm"
          >
            Explore
          </motion.button>
          {isValidLatLng(Number(language.geography?.latitude), Number(language.geography?.longitude)) && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedLanguage(language)}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors text-sm"
            >
              On Map
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  )

  // Language List Item Component
  const LanguageListItem = ({ language }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-300 p-6"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
            <h3 className="text-xl font-bold text-gray-900">{language.name}</h3>
            <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
              {language.isoCode}
            </span>
            {language.status && (
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(language.status)}`}>
                {language.status}
              </span>
            )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin size={14} />
              <span>{language.region || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={14} />
              <span>{language.family || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Book size={14} />
              <span>{language.dictionary?.length || 0} words</span>
            </div>
            {language.speakers && (
              <div className="flex items-center gap-2">
                <Globe size={14} />
                <span>{language.speakers.toLocaleString()} speakers</span>
              </div>
            )}
          </div>

          {language.description && (
            <p className="text-gray-600 text-sm mt-3 line-clamp-2">
              {language.description}
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => exploreLanguage(language)}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors text-sm"
          >
            Explore
          </motion.button>
          {isValidLatLng(Number(language.geography?.latitude), Number(language.geography?.longitude)) && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedLanguage(language)}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors text-sm"
            >
              Map
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Language Explorer
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover and explore the rich linguistic diversity of Pakistan with interactive maps and detailed language information.
          </p>
        </motion.div>

        {/* Search and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="flex-1 w-full lg:max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search languages, regions, families..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <Filter size={18} />
                Filters
                {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </motion.button>

              <div className="flex border border-gray-300 rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-3 transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-3 transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <List size={18} />
                </button>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="speakers">Sort by Speakers</option>
                <option value="region">Sort by Region</option>
              </select>

              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value))
                  setCurrentPage(1)
                }}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={12}>12 per page</option>
                <option value={24}>24 per page</option>
                <option value={48}>48 per page</option>
                <option value={96}>96 per page</option>
              </select>
            </div>
          </div>

          {/* Expanded Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 pt-6 border-t border-gray-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
                    <select
                      value={filterRegion}
                      onChange={(e) => setFilterRegion(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">All Regions</option>
                      {regions.map(region => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Family</label>
                    <select
                      value={filterFamily}
                      onChange={(e) => setFilterFamily(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">All Families</option>
                      {families.map(family => (
                        <option key={family} value={family}>{family}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">All Statuses</option>
                      {statusOptions.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-gray-600">
                    {filteredLanguages.length} languages found
                  </div>
                  <button
                    onClick={clearFilters}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    Clear all filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Interactive Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8"
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <MapPin className="text-blue-600" size={24} />
              Language Distribution Map
            </h2>
          </div>
          <div className="h-96 lg:h-[500px]">
            <MapContainer 
              center={[30.3753, 69.3451]} 
              zoom={5} 
              style={{ height: '100%', width: '100%' }}
              className="rounded-b-2xl"
            >
              <TileLayer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {selectedLanguage &&
                isValidLatLng(Number(selectedLanguage.geography?.latitude), Number(selectedLanguage.geography?.longitude)) && (
                  <MapUpdater
                    center={[
                      Number(selectedLanguage.geography.latitude),
                      Number(selectedLanguage.geography.longitude),
                    ]}
                  />
                )}
              {languages.map(lang => {
                const lat = Number(lang.geography?.latitude)
                const lng = Number(lang.geography?.longitude)
                if (!isValidLatLng(lat, lng)) return null
                return (
                  <Marker
                    key={lang.id}
                    position={[lat, lng]}
                    eventHandlers={{ 
                      click: () => setSelectedLanguage(lang),
                      mouseover: (e) => e.target.openPopup() 
                    }}
                  >
                    <Popup className="custom-popup">
                      <div className="min-w-[250px] p-2">
                        <h3 className="font-bold text-lg text-blue-600 mb-2">{lang.name}</h3>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p><strong>Region:</strong> {lang.region}</p>
                          <p><strong>Speakers:</strong> {lang.speakers?.toLocaleString() || 'N/A'}</p>
                          <p><strong>Status:</strong> {lang.status}</p>
                        </div>
                        <button
                          onClick={() => exploreLanguage(lang)}
                          className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors text-sm"
                        >
                          Explore Language
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                )
              })}
            </MapContainer>
          </div>
        </motion.div>

        {/* Languages Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  All Languages ({filteredLanguages.length})
                </h2>
                <p className="text-gray-600 mt-1">
                  Discover the linguistic diversity of Pakistan
                </p>
              </div>
              <div className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredLanguages.length === 0 ? (
            <div className="text-center py-12">
              <Book className="mx-auto text-gray-400" size={48} />
              <p className="text-gray-500 text-lg mt-4">No languages found matching your criteria.</p>
              <p className="text-gray-400 mt-2">Try adjusting your search or filters.</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
              {paginatedLanguages.map(language => (
                <LanguageCard key={language.id} language={language} />
              ))}
            </div>
          ) : (
            <div className="space-y-4 p-6">
              {paginatedLanguages.map(language => (
                <LanguageListItem key={language.id} language={language} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-600">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredLanguages.length)} of {filteredLanguages.length} languages
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = i + 1
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  })}
                  {totalPages > 5 && (
                    <span className="px-2 py-2">...</span>
                  )}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Selected Language Detail View */}
        <AnimatePresence>
          {selectedLanguage && (
            <motion.div
              id="language-detail"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="bg-white rounded-2xl shadow-lg border border-blue-200 mt-8 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{selectedLanguage.name}</h2>
                    <p className="text-blue-100 text-lg">
                      Comprehensive language information and dictionary
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedLanguage(null)}
                    className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    <X size={20} />
                    Close
                  </motion.button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Basic Information */}
                  <div>
                    <h3 className="text-2xl font-semibold mb-6 text-gray-900 border-b pb-3">Basic Information</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="font-medium text-gray-700">ISO Code</span>
                        <span className="text-gray-900 font-semibold">{selectedLanguage.isoCode || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="font-medium text-gray-700">Region</span>
                        <span className="text-gray-900 font-semibold">{selectedLanguage.region || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="font-medium text-gray-700">Family</span>
                        <span className="text-gray-900 font-semibold">{selectedLanguage.family || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="font-medium text-gray-700">Speakers</span>
                        <span className="text-gray-900 font-semibold">{selectedLanguage.speakers?.toLocaleString() || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="font-medium text-gray-700">Status</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedLanguage.status)}`}>
                          {selectedLanguage.status || 'Unknown'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="font-medium text-gray-700">Location</span>
                        <span className="text-gray-900 font-semibold">{selectedLanguage.location || 'N/A'}</span>
                      </div>
                    </div>

                    {selectedLanguage.introduction && (
                      <div className="mt-8">
                        <h4 className="text-xl font-semibold mb-4 text-gray-900">Introduction</h4>
                        <p className="text-gray-700 leading-relaxed">{selectedLanguage.introduction}</p>
                      </div>
                    )}

                    {selectedLanguage.history && (
                      <div className="mt-6">
                        <h4 className="text-xl font-semibold mb-4 text-gray-900">History</h4>
                        <p className="text-gray-700 leading-relaxed">{selectedLanguage.history}</p>
                      </div>
                    )}
                  </div>

                  {/* Dictionary Section */}
                  <div>
                    <h3 className="text-2xl font-semibold mb-6 text-gray-900 border-b pb-3">
                      Dictionary ({selectedLanguage.dictionary?.length || 0} words)
                    </h3>
                    
                    {selectedLanguage.dictionary && selectedLanguage.dictionary.length > 0 ? (
                      <div className="max-h-96 overflow-y-auto space-y-4 pr-2">
                        {selectedLanguage.dictionary.map((entry, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="border border-gray-200 rounded-xl p-4 bg-gray-50 hover:bg-white transition-colors"
                          >
                            <div className="flex justify-between items-start mb-3">
                              <h4 className="font-bold text-xl text-green-600">{entry.word}</h4>
                              {entry.region && (
                                <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">
                                  {entry.region}
                                </span>
                              )}
                            </div>
                            
                            {entry.pronunciation && (
                              <p className="text-gray-600 text-sm mb-2">
                                <span className="font-medium">Pronunciation:</span> {entry.pronunciation}
                              </p>
                            )}
                            
                            <p className="text-gray-700 mb-3">
                              <span className="font-medium">Meaning:</span> {entry.meaning}
                            </p>

                            {entry.dialects && entry.dialects.some(d => d) && (
                              <div className="mb-3">
                                <p className="text-sm font-medium text-gray-700 mb-2">Dialect Variations:</p>
                                <div className="flex flex-wrap gap-2">
                                  {entry.dialects.filter(d => d).map((dialect, idx) => (
                                    <span key={idx} className="bg-white text-gray-700 text-xs px-3 py-2 rounded-lg border border-gray-300 shadow-sm">
                                      {dialect}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {entry.example && (
                              <p className="text-gray-600 text-sm italic border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded-r-lg">
                                <span className="font-medium">Example:</span> "{entry.example}"
                              </p>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 bg-gray-50 rounded-xl">
                        <Book className="mx-auto text-gray-400" size={48} />
                        <p className="text-gray-500 mt-4">No dictionary entries available for this language.</p>
                        <p className="text-gray-400 text-sm mt-1">Check back later for updates.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default UserDashboard