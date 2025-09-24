import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const API_URL = 'https://post-it.epi-bluelock.bj/notes'

export const useNotesStore = defineStore('notes', () => {
  const notes = ref([])

  // Charger toutes les notes depuis l'API
  const fetchNotes = async () => {
    try {
      const res = await fetch(API_URL)
      const data = await res.json()
      notes.value = data.notes
    } catch (err) {
      console.error(err)
    }
  }

 
  const addNote = async (noteData) => {


    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noteData)
      })
      if (!res.ok) throw new Error('Erreur lors de la création de la note')
      const newNote = await res.json()
      await fetchNotes()
    } catch (err) {
      console.error(err)
    }
  }

  
  const updateNote = async (id, noteData) => {
   
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noteData)
      })
      if (!res.ok) throw new Error('Erreur lors de la mise à jour de la note')
      const updatedNote = await res.json()
      const index = notes.value.findIndex(note => note.id === id)
      await fetchNotes()

      if (index !== -1) notes.value[index] = updatedNote
    } catch (err) {
      console.error(err)
    }
  }

  
  const deleteNote = async (id) => {

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Erreur lors de la suppression de la note')
      notes.value = notes.value.filter(note => note.id !== id)

      // Recharger les notes
      await fetchNotes()
    } catch (err) {
      console.error(err)
    }
  }
const deleteAllNotes = async () => {
  try {
    if (!notes.value.length) return

    // Supprimer toutes les notes en parallèle
    await Promise.all(
      notes.value.map(note =>
        fetch(`${API_URL}/${note._id}`, { method: 'DELETE' })
      )
    )

    // Vider le tableau local et recharger les notes
    notes.value = []
    await fetchNotes()
  } catch (err) {
    console.error('Erreur lors de la suppression de toutes les notes', err)
  }
}



  // Récupérer une note par ID
  const getNoteById = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`)
      if (!res.ok) throw new Error('Erreur lors de la récupération de la note')
      return await res.json()
    } catch (err) {
      console.error(err)
    }
  }

  // Compteur de notes
  const totalNotes = computed(() => notes.value.length)

  return {
    notes,
    fetchNotes,
    addNote,
    updateNote,
    deleteNote,
    deleteAllNotes,
    getNoteById,
    totalNotes
  }
})