
<template>
  <div class="container">
    <div class="mb-6">
      <button 
        @click="$router.back()" 
        class="btn btn-secondary"
      >
        <span class="btn-emoji">⬅️</span>
        Retour
      </button>
    </div>

    <div v-if="note" class="note-detail" :class="colorClass">
      <div class="note-detail-header">
        <h1 class="note-detail-title">{{ note.title }}</h1>
        <div class="note-actions">
          <button 
            @click="editNote"
            class="btn btn-edit"
            title="Modifier cette note"
          >
            <span class="btn-emoji">✏️</span>
            <span class="action-text">Modifier</span>
          </button>
          <button 
            @click="deleteNote"
            class="btn btn-delete"
            title="Supprimer cette note"
          >
            <span class="btn-emoji">🗑️</span>
            <span class="action-text">Supprimer</span>
          </button>
        </div>
      </div>

      <div class="note-detail-content">{{ note.content }}</div>

      <div class="note-detail-date">
        Créée le {{ formattedDate }}
      </div>
    </div>

    <div v-else class="empty-state">
      <p class="empty-text">Note non trouvée</p>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNotesStore } from '../stores/notes'

const route = useRoute()
const router = useRouter()
const notesStore = useNotesStore()

const noteId = route.params.id
const note = computed(() => notesStore.getNoteById(noteId))

const colorClass = computed(() => {
  return `note-detail-${note.value?.color}`
})

const formattedDate = computed(() => {
  if (!note.value) return ''
  return new Date(note.value.createdAt).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
})

const editNote = () => {
  router.push({ name: 'home', query: { edit: noteId } })
}

const deleteNote = () => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette note ?')) {
    notesStore.deleteNote(parseInt(noteId))
    router.push('/')
  }
}

onMounted(() => {
  if (!note.value) {
    // Redirige vers la page d'accueil si la note n'existe pas
    router.push('/')
  }
})
</script>

<style scoped>
.note-detail-yellow {
  background-color: #FFFD75;
}

.note-detail-blue {
  background-color: #A6E1FF;
}

.note-detail-green {
  background-color: #B0FFA6;
}

.note-detail-pink {
  background-color: #FFA6F9;
}

/* Styles pour les boutons d'action */
.note-actions {
  display: flex;
  gap: 0.5rem;
}

.btn {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: 1px solid transparent;
  transition: all 0.2s;
  font-size: 1rem;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn-edit {
  background-color: #eff6ff;
  color: #1d4ed8;
  border-color: #bfdbfe;
}

.btn-edit:hover {
  background-color: #dbeafe;
}

.btn-delete {
  background-color: #fef2f2;
  color: #dc2626;
  border-color: #fecaca;
}

.btn-delete:hover {
  background-color: #fee2e2;
}

.btn-secondary {
  background-color: #f8fafc;
  color: #475569;
  border-color: #e2e8f0;
}

.btn-secondary:hover {
  background-color: #f1f5f9;
}

.btn-emoji {
  font-size: 1.25rem;
  margin-right: 0.5rem;
}

.action-text {
  font-weight: 500;
}

/* Responsive */
@media (max-width: 640px) {
  .action-text {
    display: none;
  }
  
  .btn {
    padding: 0.5rem;
  }
  
  .btn-emoji {
    margin-right: 0;
  }
}
</style>