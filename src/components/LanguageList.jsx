import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Edit, Trash2, MapPin, Users, Book, Eye, MoreVertical } from 'lucide-react'

const LanguageList = ({ languages, onEdit, onDelete, onBulkAction }) => {
  const [filterRegion, setFilterRegion] = useState('')
  const [filterFamily, setFilterFamily] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [viewMode, setViewMode] = useState('grid')
  const [expandedLanguage, setExpandedLanguage] = useState(null)
  const [selectedLanguages, setSelectedLanguages] = useState(new Set())

  const regions = ['Punjab', 'Sindh', 'Khyber Pakhtunkhwa', 'Balochistan', 'Gilgit-Baltistan', 'Azad Kashmir', 'Federal']
  const families = ['Indo-Aryan', 'Iranian', 'Dardic', 'Turkic', 'Dravidian', 'Isolate', 'Other']
  const statusOptions = ['Endangered', 'Vulnerable', 'Stable', 'Thriving', 'Critically Endangered']

  // Memoized filtered and sorted languages
  const filteredLanguages = useMemo(() => {
    return languages.filter(language => {
      const matchesRegion = !filterRegion || language.region === filterRegion
      const matchesFamily = !filterFamily || language.family === filterFamily
      const matchesStatus = !filterStatus || language.status === filterStatus
      
      return matchesRegion && matchesFamily && matchesStatus
    })
  }, [languages, filterRegion, filterFamily, filterStatus])

  const sortedLanguages = useMemo(() => {
    return [...filteredLanguages].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.name || '').localeCompare(b.name || '')
        case 'speakers':
          return (b.speakers || 0) - (a.speakers || 0)
        case 'region':
          return (a.region || '').localeCompare(b.region || '')
        case 'family':
          return (a.family || '').localeCompare(b.family || '')
        case 'created':
          return (b.createdAt?.toDate() || 0) - (a.createdAt?.toDate() || 0)
        default:
          return 0
      }
    })
  }, [filteredLanguages, sortBy])

  const handleSelectLanguage = (id) => {
    const newSelected = new Set(selectedLanguages)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedLanguages(newSelected)
  }

  const handleSelectAll = () => {
    if (selectedLanguages.size === sortedLanguages.length) {
      setSelectedLanguages(new Set())
    } else {
      setSelectedLanguages(new Set(sortedLanguages.map(lang => lang.id)))
    }
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

  const LanguageCard = ({ language }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={selectedLanguages.has(language.id)}
              onChange={() => handleSelectLanguage(language.id)}
              className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <div>
              <h3 className="text-xl font-bold text-gray-900">{language.name}</h3>
              <span className="inline-block bg-gray-100 text-gray-600 text-sm px-2 py-1 rounded-full mt-1">
                {language.isoCode}
              </span>
            </div>
          </div>
          <div className="flex gap-1">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onEdit(language)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Edit Language"
            >
              <Edit size={16} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onDelete(language.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete Language"
            >
              <Trash2 size={16} />
            </motion.button>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin size={16} />
            <span>{language.region || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users size={16} />
            <span>{language.family || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Book size={16} />
            <span>{language.dictionary?.length || 0} words</span>
          </div>
          {language.speakers && (
            <div className="text-sm text-gray-600">
              <strong>Speakers:</strong> {language.speakers.toLocaleString()}
            </div>
          )}
        </div>

        {language.status && (
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(language.status)}`}>
            {language.status}
          </div>
        )}

        {language.introduction && (
          <div className="mt-4">
            <p className="text-gray-700 text-sm line-clamp-2">
              {expandedLanguage === language.id ? language.introduction : `${language.introduction.substring(0, 100)}...`}
            </p>
            {language.introduction.length > 100 && (
              <button
                onClick={() => setExpandedLanguage(expandedLanguage === language.id ? null : language.id)}
                className="text-blue-600 text-xs mt-1 hover:underline font-medium"
              >
                {expandedLanguage === language.id ? 'Show less' : 'Read more'}
              </button>
            )}
          </div>
        )}

        {language.createdAt && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Added {language.createdAt.toDate().toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  )

  const LanguageTableRow = ({ language }) => (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <input
          type="checkbox"
          checked={selectedLanguages.has(language.id)}
          onChange={() => handleSelectLanguage(language.id)}
          className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
        />
      </td>
      <td className="px-6 py-4">
        <div>
          <div className="font-semibold text-gray-900">{language.name}</div>
          <div className="text-sm text-gray-500">{language.isoCode}</div>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-900">{language.region || 'N/A'}</td>
      <td className="px-6 py-4 text-sm text-gray-900">{language.family || 'N/A'}</td>
      <td className="px-6 py-4 text-sm text-gray-900">{language.speakers?.toLocaleString() || 'N/A'}</td>
      <td className="px-6 py-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(language.status)}`}>
          {language.status || 'Unknown'}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-900">{language.dictionary?.length || 0}</td>
      <td className="px-6 py-4">
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onEdit(language)}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            Edit
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDelete(language.id)}
            className="text-red-600 hover:text-red-800 font-medium text-sm"
          >
            Delete
          </motion.button>
        </div>
      </td>
    </tr>
  )

  return (
    <div>
      {/* Bulk Actions */}
      {selectedLanguages.size > 0 && (
        <div className="bg-blue-50 border-b border-blue-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-blue-800">
              {selectedLanguages.size} language(s) selected
            </div>
            <div className="flex gap-2">
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                Export Selected
              </button>
              <button className="text-sm text-red-600 hover:text-red-800 font-medium">
                Delete Selected
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-3">
            <select
              value={filterRegion}
              onChange={(e) => setFilterRegion(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Regions</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>

            <select
              value={filterFamily}
              onChange={(e) => setFilterFamily(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Families</option>
              {families.map(family => (
                <option key={family} value={family}>{family}</option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Statuses</option>
              {statusOptions.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="name">Sort by Name</option>
              <option value="speakers">Sort by Speakers</option>
              <option value="region">Sort by Region</option>
              <option value="family">Sort by Family</option>
              <option value="created">Sort by Date Added</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg ${viewMode === 'table' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Table
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {sortedLanguages.length === 0 ? (
        <div className="text-center py-12">
          <Book className="mx-auto text-gray-400" size={48} />
          <p className="text-gray-500 text-lg mt-4">No languages found matching your criteria.</p>
          <p className="text-gray-400 mt-2">Try adjusting your filters or add new languages.</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
          {sortedLanguages.map(language => (
            <LanguageCard key={language.id} language={language} />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={selectedLanguages.size === sortedLanguages.length}
                    onChange={handleSelectAll}
                    className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Language</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Family</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Speakers</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Words</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedLanguages.map(language => (
                <LanguageTableRow key={language.id} language={language} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default LanguageList