// import React, { useState, useEffect } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { X, Plus, Trash2, Book, MapPin, Users } from 'lucide-react'

// const LanguageForm = ({ language, onSubmit, onCancel, loading }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     isoCode: '',
//     region: '',
//     family: '',
//     introduction: '',
//     history: '',
//     geography: { longitude: '', latitude: '' },
//     status: '',
//     literature: '',
//     linguistics: '',
//     internationality: '',
//     education: '',
//     media: '',
//     languageActivism: '',
//     future: '',
//     speakers: '',
//     location: '',
//     description: '',
//     dictionary: [{
//       word: '',
//       meaning: '',
//       pronunciation: '',
//       region: '',
//       example: '',
//       dialects: ['']
//     }]
//   })

//   useEffect(() => {
//     if (language) {
//       setFormData({
//         name: language.name || '',
//         isoCode: language.isoCode || '',
//         region: language.region || '',
//         family: language.family || '',
//         introduction: language.introduction || '',
//         history: language.history || '',
//         geography: language.geography || { longitude: '', latitude: '' },
//         status: language.status || '',
//         literature: language.literature || '',
//         linguistics: language.linguistics || '',
//         internationality: language.internationality || '',
//         education: language.education || '',
//         media: language.media || '',
//         languageActivism: language.languageActivism || '',
//         future: language.future || '',
//         speakers: language.speakers || '',
//         location: language.location || '',
//         description: language.description || '',
//         dictionary: language.dictionary || [{
//           word: '',
//           meaning: '',
//           pronunciation: '',
//           region: '',
//           example: '',
//           dialects: ['']
//         }]
//       })
//     }
//   }, [language])

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }))
//   }

//   const handleGeographyChange = (e) => {
//     const { name, value } = e.target
//     setFormData(prev => ({
//       ...prev,
//       geography: {
//         ...prev.geography,
//         [name]: value
//       }
//     }))
//   }

//   // Dictionary handlers
//   const handleDictionaryChange = (index, field, value) => {
//     const updatedDictionary = [...formData.dictionary]
//     updatedDictionary[index] = {
//       ...updatedDictionary[index],
//       [field]: value
//     }
//     setFormData(prev => ({
//       ...prev,
//       dictionary: updatedDictionary
//     }))
//   }

//   const handleDialectChange = (dictIndex, dialectIndex, value) => {
//     const updatedDictionary = [...formData.dictionary]
//     const updatedDialects = [...updatedDictionary[dictIndex].dialects]
//     updatedDialects[dialectIndex] = value
//     updatedDictionary[dictIndex].dialects = updatedDialects
//     setFormData(prev => ({
//       ...prev,
//       dictionary: updatedDictionary
//     }))
//   }

//   const addDictionaryEntry = () => {
//     setFormData(prev => ({
//       ...prev,
//       dictionary: [
//         ...prev.dictionary,
//         {
//           word: '',
//           meaning: '',
//           pronunciation: '',
//           region: '',
//           example: '',
//           dialects: ['']
//         }
//       ]
//     }))
//   }

//   const removeDictionaryEntry = (index) => {
//     const updatedDictionary = formData.dictionary.filter((_, i) => i !== index)
//     setFormData(prev => ({
//       ...prev,
//       dictionary: updatedDictionary
//     }))
//   }

//   const addDialectField = (dictIndex) => {
//     const updatedDictionary = [...formData.dictionary]
//     updatedDictionary[dictIndex].dialects.push('')
//     setFormData(prev => ({
//       ...prev,
//       dictionary: updatedDictionary
//     }))
//   }

//   const removeDialectField = (dictIndex, dialectIndex) => {
//     const updatedDictionary = [...formData.dictionary]
//     updatedDictionary[dictIndex].dialects = updatedDictionary[dictIndex].dialects.filter((_, i) => i !== dialectIndex)
//     setFormData(prev => ({
//       ...prev,
//       dictionary: updatedDictionary
//     }))
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     onSubmit(formData)
//   }

//   const regions = ['Punjab', 'Sindh', 'Khyber Pakhtunkhwa', 'Balochistan', 'Gilgit-Baltistan', 'Azad Kashmir', 'Federal']
//   const families = ['Indo-Aryan', 'Iranian', 'Dardic', 'Turkic', 'Dravidian', 'Isolate', 'Other']
//   const statusOptions = ['Endangered', 'Vulnerable', 'Stable', 'Thriving', 'Critically Endangered']

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
//     >
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         exit={{ scale: 0.9, opacity: 0 }}
//         className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col"
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
//           <div>
//             <h2 className="text-2xl font-bold">
//               {language ? 'Edit Language' : 'Add New Language'}
//             </h2>
//             <p className="text-blue-100 mt-1">
//               {language ? 'Update language information and dictionary' : 'Add a new language to the database'}
//             </p>
//           </div>
//           <button
//             onClick={onCancel}
//             className="p-2 hover:bg-blue-500 rounded-lg transition-colors"
//           >
//             <X size={24} />
//           </button>
//         </div>

//         {/* Form Content */}
//         <div className="flex-1 overflow-y-auto">
//           <form onSubmit={handleSubmit} className="p-6 space-y-8">
//             {/* Basic Information */}
//             <div className="bg-white rounded-lg border border-gray-200 p-6">
//               <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center gap-2">
//                 <Users size={20} />
//                 Basic Information
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Language Name *</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="e.g., Urdu, Punjabi, Sindhi"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">ISO Code *</label>
//                   <input
//                     type="text"
//                     name="isoCode"
//                     value={formData.isoCode}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="e.g., urd, pnb, sind"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Region *</label>
//                   <select
//                     name="region"
//                     value={formData.region}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   >
//                     <option value="">Select Region</option>
//                     {regions.map(region => (
//                       <option key={region} value={region}>{region}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Language Family *</label>
//                   <select
//                     name="family"
//                     value={formData.family}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   >
//                     <option value="">Select Family</option>
//                     {families.map(family => (
//                       <option key={family} value={family}>{family}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Number of Speakers</label>
//                   <input
//                     type="number"
//                     name="speakers"
//                     value={formData.speakers}
//                     onChange={handleChange}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="e.g., 1000000"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
//                   <select
//                     name="status"
//                     value={formData.status}
//                     onChange={handleChange}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   >
//                     <option value="">Select Status</option>
//                     {statusOptions.map(status => (
//                       <option key={status} value={status}>{status}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </div>

//             {/* Geography */}
//             <div className="bg-white rounded-lg border border-gray-200 p-6">
//               <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center gap-2">
//                 <MapPin size={20} />
//                 Geography
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
//                   <input
//                     type="text"
//                     name="longitude"
//                     value={formData.geography.longitude}
//                     onChange={handleGeographyChange}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="e.g., 73.0479"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Latitude</label>
//                   <input
//                     type="text"
//                     name="latitude"
//                     value={formData.geography.latitude}
//                     onChange={handleGeographyChange}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="e.g., 33.6844"
//                   />
//                 </div>

//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Location Description</label>
//                   <input
//                     type="text"
//                     name="location"
//                     value={formData.location}
//                     onChange={handleChange}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="e.g., Northern Pakistan, Sindh province"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Dictionary Section */}
//             <div className="bg-white rounded-lg border border-gray-200 p-6">
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                   <Book size={20} />
//                   Dictionary ({formData.dictionary.length} words)
//                 </h3>
//                 <motion.button
//                   type="button"
//                   onClick={addDictionaryEntry}
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
//                 >
//                   <Plus size={16} />
//                   Add Word
//                 </motion.button>
//               </div>

//               <div className="space-y-4">
//                 {formData.dictionary.map((entry, dictIndex) => (
//                   <div key={dictIndex} className="border border-gray-200 rounded-lg p-6 bg-gray-50 hover:bg-white transition-colors">
//                     <div className="flex justify-between items-start mb-4">
//                       <h4 className="font-semibold text-gray-900">Word #{dictIndex + 1}</h4>
//                       <button
//                         type="button"
//                         onClick={() => removeDictionaryEntry(dictIndex)}
//                         className="text-red-600 hover:text-red-800 p-1 rounded transition-colors"
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Word *</label>
//                         <input
//                           type="text"
//                           value={entry.word}
//                           onChange={(e) => handleDictionaryChange(dictIndex, 'word', e.target.value)}
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                           required
//                           placeholder="e.g., Salam"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Meaning *</label>
//                         <input
//                           type="text"
//                           value={entry.meaning}
//                           onChange={(e) => handleDictionaryChange(dictIndex, 'meaning', e.target.value)}
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                           required
//                           placeholder="e.g., Hello, Peace"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Pronunciation</label>
//                         <input
//                           type="text"
//                           value={entry.pronunciation}
//                           onChange={(e) => handleDictionaryChange(dictIndex, 'pronunciation', e.target.value)}
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                           placeholder="e.g., sa-laam"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Specific Region</label>
//                         <select
//                           value={entry.region}
//                           onChange={(e) => handleDictionaryChange(dictIndex, 'region', e.target.value)}
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         >
//                           <option value="">All Regions</option>
//                           {regions.map(region => (
//                             <option key={region} value={region}>{region}</option>
//                           ))}
//                         </select>
//                       </div>
//                       <div className="md:col-span-2">
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Example Usage</label>
//                         <input
//                           type="text"
//                           value={entry.example}
//                           onChange={(e) => handleDictionaryChange(dictIndex, 'example', e.target.value)}
//                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                           placeholder="e.g., Used as a common greeting"
//                         />
//                       </div>
//                     </div>

//                     {/* Dialects */}
//                     <div className="mb-4">
//                       <div className="flex justify-between items-center mb-3">
//                         <label className="block text-sm font-medium text-gray-700">Dialect Variations</label>
//                         <button
//                           type="button"
//                           onClick={() => addDialectField(dictIndex)}
//                           className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
//                         >
//                           <Plus size={14} />
//                           Add Dialect
//                         </button>
//                       </div>
//                       <div className="space-y-2">
//                         {entry.dialects.map((dialect, dialectIndex) => (
//                           <div key={dialectIndex} className="flex gap-2">
//                             <input
//                               type="text"
//                               value={dialect}
//                               onChange={(e) => handleDialectChange(dictIndex, dialectIndex, e.target.value)}
//                               className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                               placeholder="e.g., Multani dialect: saraaki, Mianwali dialect: saraiki"
//                             />
//                             <button
//                               type="button"
//                               onClick={() => removeDialectField(dictIndex, dialectIndex)}
//                               className="px-3 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
//                             >
//                               <Trash2 size={14} />
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Detailed Information */}
//             <div className="bg-white rounded-lg border border-gray-200 p-6">
//               <h3 className="text-lg font-semibold mb-4 text-gray-900">Detailed Information</h3>
//               <div className="space-y-4">
//                 {[
//                   { name: 'introduction', label: 'Introduction', rows: 4 },
//                   { name: 'history', label: 'History', rows: 4 },
//                   { name: 'literature', label: 'Literature', rows: 3 },
//                   { name: 'linguistics', label: 'Linguistics', rows: 3 },
//                   { name: 'internationality', label: 'Internationality', rows: 2 },
//                   { name: 'education', label: 'Education', rows: 2 },
//                   { name: 'media', label: 'Media', rows: 2 },
//                   { name: 'languageActivism', label: 'Language Activism', rows: 2 },
//                   { name: 'future', label: 'Future', rows: 2 },
//                   { name: 'description', label: 'General Description', rows: 3 }
//                 ].map(field => (
//                   <div key={field.name}>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
//                     <textarea
//                       name={field.name}
//                       value={formData[field.name]}
//                       onChange={handleChange}
//                       rows={field.rows}
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
//                       placeholder={`Enter ${field.label.toLowerCase()}...`}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Form Actions */}
//             <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
//               <motion.button
//                 type="button"
//                 onClick={onCancel}
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-semibold transition-colors"
//                 disabled={loading}
//               >
//                 Cancel
//               </motion.button>
//               <motion.button
//                 type="submit"
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                 disabled={loading}
//               >
//                 {loading ? 'Saving...' : (language ? 'Update Language' : 'Add Language')}
//               </motion.button>
//             </div>
//           </form>
//         </div>
//       </motion.div>
//     </motion.div>
//   )
// }

// export default LanguageForm


import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Users, MapPin, Upload, FileText, CheckCircle, AlertCircle, Download } from 'lucide-react'
import Papa from 'papaparse'

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
    description: ''
  })

  const [csvFile, setCsvFile] = useState(null)
  const [csvData, setCsvData] = useState([])
  const [csvStatus, setCsvStatus] = useState({ type: '', message: '' })
  const [isDragOver, setIsDragOver] = useState(false)

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
        description: language.description || ''
      })
      
      // If editing and has dictionary, show it as imported
      if (language.dictionary && language.dictionary.length > 0) {
        setCsvData(language.dictionary)
        setCsvStatus({ 
          type: 'success', 
          message: `${language.dictionary.length} words loaded from existing data` 
        })
      }
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

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      processCSV(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const file = e.dataTransfer.files[0]
    if (file && file.name.endsWith('.csv')) {
      processCSV(file)
    } else {
      setCsvStatus({ type: 'error', message: 'Please upload a CSV file' })
    }
  }

  const processCSV = (file) => {
    setCsvFile(file)
    setCsvStatus({ type: 'loading', message: 'Processing CSV file...' })

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
      complete: (results) => {
        if (results.errors.length > 0) {
          setCsvStatus({ 
            type: 'error', 
            message: `CSV parsing errors: ${results.errors[0].message}` 
          })
          return
        }

        // Validate required columns
        const requiredColumns = ['word', 'meaning']
        const headers = results.meta.fields.map(f => f.toLowerCase())
        const missingColumns = requiredColumns.filter(col => !headers.includes(col))

        if (missingColumns.length > 0) {
          setCsvStatus({ 
            type: 'error', 
            message: `Missing required columns: ${missingColumns.join(', ')}` 
          })
          return
        }

        // Transform CSV data to match dictionary structure
        const transformedData = results.data.map((row, index) => {
          // Parse dialects from comma-separated string or array
          let dialects = ['']
          if (row.dialects) {
            if (typeof row.dialects === 'string') {
              dialects = row.dialects.split(',').map(d => d.trim()).filter(d => d)
            } else if (Array.isArray(row.dialects)) {
              dialects = row.dialects.filter(d => d)
            }
          }
          if (dialects.length === 0) dialects = ['']

          return {
            word: row.word || '',
            meaning: row.meaning || '',
            pronunciation: row.pronunciation || '',
            region: row.region || '',
            example: row.example || '',
            dialects: dialects
          }
        }).filter(entry => entry.word && entry.meaning) // Filter out invalid entries

        if (transformedData.length === 0) {
          setCsvStatus({ 
            type: 'error', 
            message: 'No valid entries found in CSV. Ensure word and meaning columns are filled.' 
          })
          return
        }

        setCsvData(transformedData)
        setCsvStatus({ 
          type: 'success', 
          message: `Successfully imported ${transformedData.length} words from CSV` 
        })
      },
      error: (error) => {
        setCsvStatus({ 
          type: 'error', 
          message: `Error reading CSV: ${error.message}` 
        })
      }
    })
  }

  const downloadTemplate = () => {
    const template = `word,meaning,pronunciation,region,example,dialects
Salam,Hello/Peace,sa-laam,Punjab,Used as a common greeting,"Multani: salamat, Lahori: salaam"
Mehrbani,Kindness,mehr-ba-nee,Sindh,Show mehrbani to others,"Sindhi: mehrbano"
Adab,Respect,aa-dab,Federal,A formal greeting,""
`
    
    const blob = new Blob([template], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'dictionary_template.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Combine form data with CSV dictionary data
    const completeData = {
      ...formData,
      dictionary: csvData.length > 0 ? csvData : [{
        word: '',
        meaning: '',
        pronunciation: '',
        region: '',
        example: '',
        dialects: ['']
      }]
    }
    
    onSubmit(completeData)
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
              {language ? 'Update language information and upload dictionary CSV' : 'Add language details and import dictionary from CSV'}
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

            {/* CSV Dictionary Upload */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <FileText size={20} />
                  Dictionary (CSV Upload)
                </h3>
                <button
                  type="button"
                  onClick={downloadTemplate}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  <Download size={16} />
                  Download Template
                </button>
              </div>

              <div className="mb-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-blue-900 mb-2">CSV Format Requirements:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• <strong>Required columns:</strong> word, meaning</li>
                    <li>• <strong>Optional columns:</strong> pronunciation, region, example, dialects</li>
                    <li>• For dialects, separate multiple values with commas: "Multani: salamat, Lahori: salaam"</li>
                    <li>• Download the template above to see the exact format</li>
                  </ul>
                </div>

                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    isDragOver 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-blue-400 bg-gray-50'
                  }`}
                >
                  <Upload size={48} className="mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 mb-2">
                    Drag and drop your CSV file here, or
                  </p>
                  <label className="inline-block">
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <span className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer inline-block transition-colors">
                      Browse Files
                    </span>
                  </label>
                  {csvFile && (
                    <p className="text-sm text-gray-600 mt-3">
                      Selected: {csvFile.name}
                    </p>
                  )}
                </div>

                {/* Status Messages */}
                {csvStatus.message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-4 p-4 rounded-lg flex items-start gap-3 ${
                      csvStatus.type === 'success' 
                        ? 'bg-green-50 border border-green-200' 
                        : csvStatus.type === 'error'
                        ? 'bg-red-50 border border-red-200'
                        : 'bg-blue-50 border border-blue-200'
                    }`}
                  >
                    {csvStatus.type === 'success' && <CheckCircle size={20} className="text-green-600 mt-0.5" />}
                    {csvStatus.type === 'error' && <AlertCircle size={20} className="text-red-600 mt-0.5" />}
                    {csvStatus.type === 'loading' && (
                      <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className={`font-medium ${
                        csvStatus.type === 'success' 
                          ? 'text-green-900' 
                          : csvStatus.type === 'error'
                          ? 'text-red-900'
                          : 'text-blue-900'
                      }`}>
                        {csvStatus.message}
                      </p>
                      {csvStatus.type === 'success' && csvData.length > 0 && (
                        <div className="mt-2 text-sm text-green-800">
                          Preview: {csvData.slice(0, 3).map(w => w.word).join(', ')}
                          {csvData.length > 3 && ` ... and ${csvData.length - 3} more`}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
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