import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { db } from '../firebase'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Book, Globe, MapPin, Users, ChevronDown, ChevronUp, X, Grid, List, Download, BookOpen, Volume2 } from 'lucide-react'

const DictionaryPage = ({ user }) => {
  const [languages, setLanguages] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('')
  const [viewMode, setViewMode] = useState('all') // all, byLanguage, byRegion
  const [displayMode, setDisplayMode] = useState('grid') // grid, list
  const [sortBy, setSortBy] = useState('word') // word, language, region
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(24)
  const [loading, setLoading] = useState(true)
  const [selectedEntry, setSelectedEntry] = useState(null)

  // Load languages with optimized query
  useEffect(() => {
    setLoading(true)
    try {
      const languagesQuery = query(
        collection(db, 'languages'),
        orderBy('name')
      )

      const unsubscribe = onSnapshot(languagesQuery, snapshot => {
        const langs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setLanguages(langs)
        setLoading(false)
      })

      return () => unsubscribe()
    } catch (err) {
      console.error('Error loading languages:', err)
      setLoading(false)
    }
  }, [])

  // Memoized dictionary entries with performance optimization
  const allDictionaryEntries = useMemo(() => {
    return languages.flatMap(lang => 
      (lang.dictionary || []).map(entry => ({
        ...entry,
        languageName: lang.name,
        languageId: lang.id,
        languageRegion: lang.region,
        languageFamily: lang.family,
        languageSpeakers: lang.speakers
      }))
    )
  }, [languages])

  // Memoized filtering for performance
  const filteredEntries = useMemo(() => {
    if (!searchTerm && !selectedLanguage && !selectedRegion) {
      return allDictionaryEntries
    }

    return allDictionaryEntries.filter(entry => {
      const matchesSearch = 
        entry.word?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.meaning?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.pronunciation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.example?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.dialects?.some(dialect => 
          dialect?.toLowerCase().includes(searchTerm.toLowerCase())
        )

      const matchesLanguage = !selectedLanguage || entry.languageName === selectedLanguage
      const matchesRegion = !selectedRegion || entry.region === selectedRegion || entry.languageRegion === selectedRegion

      return matchesSearch && matchesLanguage && matchesRegion
    })
  }, [allDictionaryEntries, searchTerm, selectedLanguage, selectedRegion])

  // Memoized sorting
  const sortedEntries = useMemo(() => {
    return [...filteredEntries].sort((a, b) => {
      switch (sortBy) {
        case 'word':
          return a.word?.localeCompare(b.word || '')
        case 'language':
          return a.languageName?.localeCompare(b.languageName || '')
        case 'region':
          return (a.region || a.languageRegion)?.localeCompare((b.region || b.languageRegion) || '')
        default:
          return 0
      }
    })
  }, [filteredEntries, sortBy])

  // Pagination
  const paginatedEntries = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return sortedEntries.slice(startIndex, startIndex + itemsPerPage)
  }, [sortedEntries, currentPage, itemsPerPage])

  const totalPages = Math.ceil(sortedEntries.length / itemsPerPage)

  // Get unique languages and regions for filters
  const uniqueLanguages = useMemo(() => 
    [...new Set(languages.map(lang => lang.name))].sort(), 
    [languages]
  )

  const uniqueRegions = useMemo(() => 
    [...new Set(languages.map(lang => lang.region))].sort(), 
    [languages]
  )

  // Group entries by language (optimized)
  const entriesByLanguage = useMemo(() => {
    return languages.reduce((acc, lang) => {
      if (lang.dictionary && lang.dictionary.length > 0) {
        acc[lang.name] = lang.dictionary.map(entry => ({
          ...entry,
          languageName: lang.name,
          languageId: lang.id,
          languageRegion: lang.region
        }))
      }
      return acc
    }, {})
  }, [languages])

  // Group entries by region (optimized)
  const entriesByRegion = useMemo(() => {
    return languages.reduce((acc, lang) => {
      if (lang.dictionary && lang.dictionary.length > 0) {
        const region = lang.region
        if (!acc[region]) acc[region] = []
        acc[region].push(...lang.dictionary.map(entry => ({
          ...entry,
          languageName: lang.name,
          languageId: lang.id,
          languageRegion: lang.region
        })))
      }
      return acc
    }, {})
  }, [languages])

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSearchTerm('')
    setSelectedLanguage('')
    setSelectedRegion('')
    setCurrentPage(1)
  }, [])

  // Handle entry click for detailed view
  const handleEntryClick = useCallback((entry) => {
    setSelectedEntry(entry)
  }, [])

  // Stats for the dashboard
  const stats = useMemo(() => ({
    totalWords: allDictionaryEntries.length,
    totalLanguages: Object.keys(entriesByLanguage).length,
    totalRegions: Object.keys(entriesByRegion).length,
    averageWordsPerLanguage: allDictionaryEntries.length / Math.max(Object.keys(entriesByLanguage).length, 1)
  }), [allDictionaryEntries, entriesByLanguage, entriesByRegion])

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
            Language Dictionary
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore words, meanings, and dialects from Pakistan's rich linguistic heritage
          </p>
        </motion.div>

        {/* Stats Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Words</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalWords.toLocaleString()}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Book className="text-blue-600" size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Languages</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalLanguages}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Globe className="text-green-600" size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Regions</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalRegions}</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <MapPin className="text-purple-600" size={20} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Words</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{Math.round(stats.averageWordsPerLanguage)}</p>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <Users className="text-orange-600" size={20} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="flex-1 w-full lg:max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search words, meanings, pronunciations, dialects..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <Filter size={18} />
                Filters
                {showAdvancedFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </motion.button>

              <div className="flex border border-gray-300 rounded-xl overflow-hidden">
                <button
                  onClick={() => setDisplayMode('grid')}
                  className={`px-4 py-3 transition-colors ${
                    displayMode === 'grid' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setDisplayMode('list')}
                  className={`px-4 py-3 transition-colors ${
                    displayMode === 'list' 
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
                <option value="word">Sort by Word</option>
                <option value="language">Sort by Language</option>
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
                <option value={24}>24 per page</option>
                <option value={48}>48 per page</option>
                <option value={96}>96 per page</option>
                <option value={192}>192 per page</option>
              </select>
            </div>
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showAdvancedFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 pt-6 border-t border-gray-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                    <select
                      value={selectedLanguage}
                      onChange={(e) => {
                        setSelectedLanguage(e.target.value)
                        setCurrentPage(1)
                      }}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">All Languages</option>
                      {uniqueLanguages.map(lang => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
                    <select
                      value={selectedRegion}
                      onChange={(e) => {
                        setSelectedRegion(e.target.value)
                        setCurrentPage(1)
                      }}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">All Regions</option>
                      {uniqueRegions.map(region => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-gray-600">
                    {filteredEntries.length.toLocaleString()} words found
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={clearFilters}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      Clear all filters
                    </button>
                    <button className="flex items-center gap-2 text-green-600 hover:text-green-800 font-medium text-sm">
                      <Download size={16} />
                      Export Results
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* View Mode Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'all', label: 'All Words', count: filteredEntries.length },
                { key: 'byLanguage', label: 'By Language', count: Object.keys(entriesByLanguage).length },
                { key: 'byRegion', label: 'By Region', count: Object.keys(entriesByRegion).length }
              ].map((tab) => (
                <motion.button
                  key={tab.key}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setViewMode(tab.key)
                    setCurrentPage(1)
                  }}
                  className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                    viewMode === tab.key
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tab.label}
                  <span className="ml-2 px-2 py-1 text-xs bg-white/20 rounded-full">
                    {tab.count.toLocaleString()}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
        >
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : viewMode === 'all' ? (
            <AllWordsView 
              entries={paginatedEntries}
              displayMode={displayMode}
              onEntryClick={handleEntryClick}
              totalEntries={filteredEntries.length}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          ) : viewMode === 'byLanguage' ? (
            <ByLanguageView 
              entriesByLanguage={entriesByLanguage}
              searchTerm={searchTerm}
              displayMode={displayMode}
              onEntryClick={handleEntryClick}
            />
          ) : (
            <ByRegionView 
              entriesByRegion={entriesByRegion}
              searchTerm={searchTerm}
              displayMode={displayMode}
              onEntryClick={handleEntryClick}
            />
          )}
        </motion.div>

        {/* Entry Detail Modal */}
        <AnimatePresence>
          {selectedEntry && (
            <EntryDetailModal 
              entry={selectedEntry} 
              onClose={() => setSelectedEntry(null)} 
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// All Words View Component
const AllWordsView = ({ entries, displayMode, onEntryClick, totalEntries, currentPage, totalPages, onPageChange }) => {
  if (entries.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="mx-auto text-gray-400" size={48} />
        <p className="text-gray-500 text-lg mt-4">No words found matching your criteria.</p>
        <p className="text-gray-400 mt-2">Try adjusting your search or filters.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              All Dictionary Words
            </h2>
            <p className="text-gray-600 mt-1">
              Showing {((currentPage - 1) * entries.length) + 1} to {currentPage * entries.length} of {totalEntries.toLocaleString()} words
            </p>
          </div>
        </div>
      </div>

      {displayMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
          {entries.map((entry, index) => (
            <DictionaryCard 
              key={`${entry.languageId}-${entry.word}-${index}`} 
              entry={entry} 
              displayMode={displayMode}
              onClick={onEntryClick}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4 p-6">
          {entries.map((entry, index) => (
            <DictionaryCard 
              key={`${entry.languageId}-${entry.word}-${index}`} 
              entry={entry} 
              displayMode={displayMode}
              onClick={onEntryClick}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200">
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  )
}

// By Language View Component
const ByLanguageView = ({ entriesByLanguage, searchTerm, displayMode, onEntryClick }) => {
  const filteredLanguages = Object.entries(entriesByLanguage)
    .filter(([language, entries]) => {
      if (!searchTerm) return true
      return entries.some(entry =>
        entry.word?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.meaning?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
    .sort(([a], [b]) => a.localeCompare(b))

  if (filteredLanguages.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="mx-auto text-gray-400" size={48} />
        <p className="text-gray-500 text-lg mt-4">No languages found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {filteredLanguages.map(([language, entries]) => {
        const filteredEntries = entries.filter(entry =>
          !searchTerm ||
          entry.word?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          entry.meaning?.toLowerCase().includes(searchTerm.toLowerCase())
        )

        if (filteredEntries.length === 0) return null

        return (
          <motion.div
            key={language}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-50 rounded-xl p-6"
          >
            <h3 className="text-2xl font-bold text-blue-600 mb-4 pb-3 border-b border-gray-200 flex items-center gap-3">
              <Globe className="text-blue-500" size={24} />
              {language}
              <span className="text-sm font-normal text-gray-500 bg-white px-3 py-1 rounded-full">
                {filteredEntries.length} words
              </span>
            </h3>
            
            {displayMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredEntries.map((entry, index) => (
                  <DictionaryCard 
                    key={`${language}-${entry.word}-${index}`} 
                    entry={entry} 
                    displayMode={displayMode}
                    onClick={onEntryClick}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredEntries.map((entry, index) => (
                  <DictionaryCard 
                    key={`${language}-${entry.word}-${index}`} 
                    entry={entry} 
                    displayMode={displayMode}
                    onClick={onEntryClick}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

// By Region View Component
const ByRegionView = ({ entriesByRegion, searchTerm, displayMode, onEntryClick }) => {
  const filteredRegions = Object.entries(entriesByRegion)
    .filter(([region, entries]) => {
      if (!searchTerm) return true
      return entries.some(entry =>
        entry.word?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.meaning?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
    .sort(([a], [b]) => a.localeCompare(b))

  if (filteredRegions.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="mx-auto text-gray-400" size={48} />
        <p className="text-gray-500 text-lg mt-4">No regions found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {filteredRegions.map(([region, entries]) => {
        const filteredEntries = entries.filter(entry =>
          !searchTerm ||
          entry.word?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          entry.meaning?.toLowerCase().includes(searchTerm.toLowerCase())
        )

        if (filteredEntries.length === 0) return null

        return (
          <motion.div
            key={region}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-50 rounded-xl p-6"
          >
            <h3 className="text-2xl font-bold text-green-600 mb-4 pb-3 border-b border-gray-200 flex items-center gap-3">
              <MapPin className="text-green-500" size={24} />
              {region}
              <span className="text-sm font-normal text-gray-500 bg-white px-3 py-1 rounded-full">
                {filteredEntries.length} words
              </span>
            </h3>
            
            {displayMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredEntries.map((entry, index) => (
                  <DictionaryCard 
                    key={`${region}-${entry.word}-${index}`} 
                    entry={entry} 
                    displayMode={displayMode}
                    onClick={onEntryClick}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredEntries.map((entry, index) => (
                  <DictionaryCard 
                    key={`${region}-${entry.word}-${index}`} 
                    entry={entry} 
                    displayMode={displayMode}
                    onClick={onEntryClick}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

// Dictionary Card Component
const DictionaryCard = ({ entry, displayMode, onClick }) => {
  const handleClick = () => {
    onClick(entry)
  }

  if (displayMode === 'list') {
    return (
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 p-4 cursor-pointer"
        onClick={handleClick}
      >
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
              <h3 className="text-xl font-bold text-blue-600">{entry.word}</h3>
              <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-medium">
                {entry.languageName}
              </span>
              {entry.region && (
                <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                  {entry.region}
                </span>
              )}
            </div>
            
            {entry.pronunciation && (
              <p className="text-gray-600 text-sm mb-2 flex items-center gap-2">
                <Volume2 size={14} />
                <span className="font-medium">Pronunciation:</span> {entry.pronunciation}
              </p>
            )}
            
            <p className="text-gray-700 mb-2">
              <span className="font-medium">Meaning:</span> {entry.meaning}
            </p>

            {entry.dialects && entry.dialects.some(d => d) && (
              <div className="mb-2">
                <p className="text-sm font-medium text-gray-700 mb-1">Dialect Variations:</p>
                <div className="flex flex-wrap gap-1">
                  {entry.dialects.filter(d => d).map((dialect, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded border">
                      {dialect}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {entry.example && (
              <p className="text-gray-600 text-sm italic mt-2">
                "<span className="font-medium">Example:</span> {entry.example}"
              </p>
            )}
          </div>
        </div>
      </motion.div>
    )
  }

  // Grid View
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 p-5 cursor-pointer group"
      onClick={handleClick}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
          {entry.word}
        </h3>
        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
          {entry.languageName}
        </span>
      </div>
      
      {entry.pronunciation && (
        <p className="text-gray-600 text-sm mb-2 flex items-center gap-2">
          <Volume2 size={14} />
          <span className="font-medium">Sound:</span> {entry.pronunciation}
        </p>
      )}
      
      <p className="text-gray-700 mb-3 line-clamp-2">
        {entry.meaning}
      </p>

      {entry.region && (
        <p className="text-gray-600 text-sm mb-2">
          <span className="font-medium">Region:</span> {entry.region}
        </p>
      )}

      {entry.dialects && entry.dialects.some(d => d) && (
        <div className="mb-3">
          <p className="text-xs font-medium text-gray-700 mb-1">Dialects:</p>
          <div className="flex flex-wrap gap-1">
            {entry.dialects.filter(d => d).slice(0, 2).map((dialect, idx) => (
              <span key={idx} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded border border-blue-200">
                {dialect}
              </span>
            ))}
            {entry.dialects.filter(d => d).length > 2 && (
              <span className="bg-gray-50 text-gray-600 text-xs px-2 py-1 rounded border">
                +{entry.dialects.filter(d => d).length - 2} more
              </span>
            )}
          </div>
        </div>
      )}

      {entry.example && (
        <p className="text-gray-600 text-sm italic border-l-3 border-blue-500 pl-3 py-1 bg-blue-50 rounded-r">
          "{entry.example}"
        </p>
      )}
    </motion.div>
  )
}

// Entry Detail Modal Component
const EntryDetailModal = ({ entry, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold mb-2">{entry.word}</h2>
            <p className="text-blue-100 text-lg">{entry.languageName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {entry.pronunciation && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Volume2 size={18} />
              Pronunciation
            </h3>
            <p className="text-gray-700 text-lg">{entry.pronunciation}</p>
          </div>
        )}

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Meaning</h3>
          <p className="text-gray-700 text-lg">{entry.meaning}</p>
        </div>

        {entry.region && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <MapPin size={18} />
              Specific Region
            </h3>
            <p className="text-gray-700">{entry.region}</p>
          </div>
        )}

        {entry.dialects && entry.dialects.some(d => d) && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Dialect Variations</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {entry.dialects.filter(d => d).map((dialect, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <p className="text-gray-700">{dialect}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {entry.example && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Example Usage</h3>
            <div className="bg-blue-50 rounded-xl p-4 border-l-4 border-blue-500">
              <p className="text-gray-700 text-lg italic">"{entry.example}"</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  </motion.div>
)

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        
        {getVisiblePages().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentPage === page
                ? 'bg-blue-600 text-white'
                : page === '...'
                ? 'cursor-default'
                : 'border border-gray-300 hover:bg-gray-50'
            }`}
            disabled={page === '...'}
          >
            {page}
          </button>
        ))}
        
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default DictionaryPage