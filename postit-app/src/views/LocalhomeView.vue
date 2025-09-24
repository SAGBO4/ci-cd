<template>
  <div class="container">
    <NoteForm 
      v-if="showForm"
      :editing="!!editingNote"
      :note="editingNote"
      @submit="handleFormSubmit"
      @cancel="cancelEdit"
    />

    <button
      v-else
      @click="showForm = true"
      class="btn btn-primary mb-6"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="mr-2" style="width: 1.25rem; height: 1.25rem;">
        <path fill-rule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clip-rule="evenodd" />
      </svg>
      Nouvelle note
    </button>

    <NoteList
      @edit-note="editNote"
      @delete-note="deleteNote"
      @view-details="viewNoteDetails"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useNotesStore } from '../stores/noteslocal'
import NoteForm from '../components/NoteForm.vue'
import NoteList from '../components/NoteList.vue'

const router = useRouter()
const notesStore = useNotesStore()

const showForm = ref(false)
const editingNote = ref(null)

const handleFormSubmit = (noteData) => {
  if (editingNote.value) {
    notesStore.updateNote(editingNote.value.id, noteData)
  } else {
    notesStore.addNote(noteData)
  }
  resetForm()
}

const editNote = (note) => {
  editingNote.value = note
  showForm.value = true
}

const deleteNote = (id) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette note ?')) {
    notesStore.deleteNote(id)
  }
}

const cancelEdit = () => {
  resetForm()
}

const resetForm = () => {
  showForm.value = false
  editingNote.value = null
}

const viewNoteDetails = (note) => {
  router.push(`/note/${note.id}`)
}
</script>