import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Trash2, Book, MapPin, Users } from 'lucide-react'

const LanguageForm = ({ language, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    isoCode: '',
    region: '',
    family: '',
    introduction: '',
    history: '',
    geography: { longitude: '', latitude: '' },
    status: '',
    literature: '',
    linguistics: '',
    internationality: '',
    education: '',
    media: '',
    languageActivism: '',
    future: '',
    speakers: '',
    location: '',
    description: '',
    dictionary: [{
      word: '',
      meaning: '',
      pronunciation: '',
      region: '',
      example: '',
      dialects: ['']
    }]
  })

  useEffect(() => {
    if (language) {
      setFormData({
        name: language.name || '',
        isoCode: language.isoCode || '',
        region: language.region || '',
        family: language.family || '',
        introduction: language.introduction || '',
        history: language.history || '',
        geography: language.geography || { longitude: '', latitude: '' },
        status: language.status || '',
        literature: language.literature || '',
        linguistics: language.linguistics || '',
        internationality: language.internationality || '',
        education: language.education || '',
        media: language.media || '',
        languageActivism: language.languageActivism || '',
        future: language.future || '',
        speakers: language.speakers || '',
        location: language.location || '',
        description: language.description || '',
        dictionary: language.dictionary || [{
          word: '',
          meaning: '',
          pronunciation: '',
          region: '',
          example: '',
          dialects: ['']
        }]
      })
    }
  }, [language])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleGeographyChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      geography: {
        ...prev.geography,
        [name]: value
      }
    }))
  }

  // Dictionary handlers
  const handleDictionaryChange = (index, field, value) => {
    const updatedDictionary = [...formData.dictionary]
    updatedDictionary[index] = {
      ...updatedDictionary[index],
      [field]: value
    }
    setFormData(prev => ({
      ...prev,
      dictionary: updatedDictionary
    }))
  }

  const handleDialectChange = (dictIndex, dialectIndex, value) => {
    const updatedDictionary = [...formData.dictionary]
    const updatedDialects = [...updatedDictionary[dictIndex].dialects]
    updatedDialects[dialectIndex] = value
    updatedDictionary[dictIndex].dialects = updatedDialects
    setFormData(prev => ({
      ...prev,
      dictionary: updatedDictionary
    }))
  }

  const addDictionaryEntry = () => {
    setFormData(prev => ({
      ...prev,
      dictionary: [
        ...prev.dictionary,
        {
          word: '',
          meaning: '',
          pronunciation: '',
          region: '',
          example: '',
          dialects: ['']
        }
      ]
    }))
  }

  const removeDictionaryEntry = (index) => {
    const updatedDictionary = formData.dictionary.filter((_, i) => i !== index)
    setFormData(prev => ({
      ...prev,
      dictionary: updatedDictionary
    }))
  }

  const addDialectField = (dictIndex) => {
    const updatedDictionary = [...formData.dictionary]
    updatedDictionary[dictIndex].dialects.push('')
    setFormData(prev => ({
      ...prev,
      dictionary: updatedDictionary
    }))
  }

  const removeDialectField = (dictIndex, dialectIndex) => {
    const updatedDictionary = [...formData.dictionary]
    updatedDictionary[dictIndex].dialects = updatedDictionary[dictIndex].dialects.filter((_, i) => i !== dialectIndex)
    setFormData(prev => ({
      ...prev,
      dictionary: updatedDictionary
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const regions = ['Punjab', 'Sindh', 'Khyber Pakhtunkhwa', 'Balochistan', 'Gilgit-Baltistan', 'Azad Kashmir', 'Federal']
  const families = ['Indo-Aryan', 'Iranian', 'Dardic', 'Turkic', 'Dravidian', 'Isolate', 'Other']
  const statusOptions = ['Endangered', 'Vulnerable', 'Stable', 'Thriving', 'Critically Endangered']

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div>
            <h2 className="text-2xl font-bold">
              {language ? 'Edit Language' : 'Add New Language'}
            </h2>
            <p className="text-blue-100 mt-1">
              {language ? 'Update language information and dictionary' : 'Add a new language to the database'}
            </p>
          </div>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-blue-500 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Basic Information */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center gap-2">
                <Users size={20} />
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Urdu, Punjabi, Sindhi"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ISO Code *</label>
                  <input
                    type="text"
                    name="isoCode"
                    value={formData.isoCode}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., urd, pnb, sind"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Region *</label>
                  <select
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Region</option>
                    {regions.map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language Family *</label>
                  <select
                    name="family"
                    value={formData.family}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Family</option>
                    {families.map(family => (
                      <option key={family} value={family}>{family}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Speakers</label>
                  <input
                    type="number"
                    name="speakers"
                    value={formData.speakers}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 1000000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Status</option>
                    {statusOptions.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Geography */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center gap-2">
                <MapPin size={20} />
                Geography
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
                  <input
                    type="text"
                    name="longitude"
                    value={formData.geography.longitude}
                    onChange={handleGeographyChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 73.0479"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Latitude</label>
                  <input
                    type="text"
                    name="latitude"
                    value={formData.geography.latitude}
                    onChange={handleGeographyChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 33.6844"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location Description</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Northern Pakistan, Sindh province"
                  />
                </div>
              </div>
            </div>

            {/* Dictionary Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Book size={20} />
                  Dictionary ({formData.dictionary.length} words)
                </h3>
                <motion.button
                  type="button"
                  onClick={addDictionaryEntry}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  <Plus size={16} />
                  Add Word
                </motion.button>
              </div>

              <div className="space-y-4">
                {formData.dictionary.map((entry, dictIndex) => (
                  <div key={dictIndex} className="border border-gray-200 rounded-lg p-6 bg-gray-50 hover:bg-white transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-semibold text-gray-900">Word #{dictIndex + 1}</h4>
                      <button
                        type="button"
                        onClick={() => removeDictionaryEntry(dictIndex)}
                        className="text-red-600 hover:text-red-800 p-1 rounded transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Word *</label>
                        <input
                          type="text"
                          value={entry.word}
                          onChange={(e) => handleDictionaryChange(dictIndex, 'word', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                          placeholder="e.g., Salam"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Meaning *</label>
                        <input
                          type="text"
                          value={entry.meaning}
                          onChange={(e) => handleDictionaryChange(dictIndex, 'meaning', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                          placeholder="e.g., Hello, Peace"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Pronunciation</label>
                        <input
                          type="text"
                          value={entry.pronunciation}
                          onChange={(e) => handleDictionaryChange(dictIndex, 'pronunciation', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., sa-laam"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Specific Region</label>
                        <select
                          value={entry.region}
                          onChange={(e) => handleDictionaryChange(dictIndex, 'region', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">All Regions</option>
                          {regions.map(region => (
                            <option key={region} value={region}>{region}</option>
                          ))}
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Example Usage</label>
                        <input
                          type="text"
                          value={entry.example}
                          onChange={(e) => handleDictionaryChange(dictIndex, 'example', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., Used as a common greeting"
                        />
                      </div>
                    </div>

                    {/* Dialects */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-3">
                        <label className="block text-sm font-medium text-gray-700">Dialect Variations</label>
                        <button
                          type="button"
                          onClick={() => addDialectField(dictIndex)}
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          <Plus size={14} />
                          Add Dialect
                        </button>
                      </div>
                      <div className="space-y-2">
                        {entry.dialects.map((dialect, dialectIndex) => (
                          <div key={dialectIndex} className="flex gap-2">
                            <input
                              type="text"
                              value={dialect}
                              onChange={(e) => handleDialectChange(dictIndex, dialectIndex, e.target.value)}
                              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="e.g., Multani dialect: saraaki, Mianwali dialect: saraiki"
                            />
                            <button
                              type="button"
                              onClick={() => removeDialectField(dictIndex, dialectIndex)}
                              className="px-3 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Information */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Detailed Information</h3>
              <div className="space-y-4">
                {[
                  { name: 'introduction', label: 'Introduction', rows: 4 },
                  { name: 'history', label: 'History', rows: 4 },
                  { name: 'literature', label: 'Literature', rows: 3 },
                  { name: 'linguistics', label: 'Linguistics', rows: 3 },
                  { name: 'internationality', label: 'Internationality', rows: 2 },
                  { name: 'education', label: 'Education', rows: 2 },
                  { name: 'media', label: 'Media', rows: 2 },
                  { name: 'languageActivism', label: 'Language Activism', rows: 2 },
                  { name: 'future', label: 'Future', rows: 2 },
                  { name: 'description', label: 'General Description', rows: 3 }
                ].map(field => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
                    <textarea
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      rows={field.rows}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                      placeholder={`Enter ${field.label.toLowerCase()}...`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <motion.button
                type="button"
                onClick={onCancel}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-semibold transition-colors"
                disabled={loading}
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? 'Saving...' : (language ? 'Update Language' : 'Add Language')}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default LanguageForm