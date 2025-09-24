import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useNotesStore = defineStore('notes', () => {
  const notes = ref(JSON.parse(localStorage.getItem('notes')) || [])
  const nextId = ref(JSON.parse(localStorage.getItem('nextId')) || 1)

  // Sauvegarder dans le localStorage
  const saveToLocalStorage = () => {
    localStorage.setItem('notes', JSON.stringify(notes.value))
    localStorage.setItem('nextId', JSON.stringify(nextId.value))
  }

  // Ajouter une nouvelle note
  const addNote = (noteData) => {
    const newNote = {
      id: nextId.value++,
      title: noteData.title,
      content: noteData.content,
      color: noteData.color || 'yellow',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    notes.value.push(newNote)
    saveToLocalStorage()
    return newNote
  }

  // Mettre à jour une note
  const updateNote = (id, noteData) => {
    const index = notes.value.findIndex(note => note.id === id)
    if (index !== -1) {
      notes.value[index] = { 
        ...notes.value[index], 
        ...noteData,
        updatedAt: new Date().toISOString()
      }
      saveToLocalStorage()
    }
  }

  // Supprimer une note
  const deleteNote = (id) => {
    notes.value = notes.value.filter(note => note.id !== id)
    saveToLocalStorage()
  }

  // Supprimer toutes les notes
  const deleteAllNotes = () => {
    notes.value = []
    nextId.value = 1
    saveToLocalStorage()
  }

  // Récupérer une note par son ID
  const getNoteById = (id) => {
    return notes.value.find(note => note.id === parseInt(id))
  }

  // Compteur de notes (lecture seule)
  const totalNotes = computed(() => notes.value.length)

  return {
    notes,
    addNote,
    updateNote,
    deleteNote,
    deleteAllNotes,
    getNoteById,
    totalNotes
  }
})
