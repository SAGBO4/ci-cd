<template>
  <div 
    class="note-card"
    :class="colorClass"
    @click="$emit('view-details', note)"
  >
    <div>
      <h3 class="note-title">{{ note.title }}</h3>
      <p class="note-content">{{ note.content[0] }}</p>
    </div>
    <div class="note-footer">
      <span class="note-date">{{ formattedDate }}</span>
      <div class="note-actions">
        <button 
          @click.stop="$emit('edit', note)"
          class="btn-card btn-edit"
          title="Modifier"
        >
          <span class="btn-emoji">✏️</span>
        </button>
        <button 
          @click.stop="$emit('delete', note.id)"
          class="btn-card btn-delete"
          title="Supprimer"
        >
          <span class="btn-emoji">🗑️</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  note: {
    type: Object,
    required: true
  }
})

defineEmits(['edit', 'delete', 'view-details'])

const colorClass = computed(() => {
  return `note-card-${props.note.color}`
})

const formattedDate = computed(() => {
  return new Date(props.note.createdAt).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
})
</script>

<style scoped>
/* Styles pour les boutons de carte */
.btn-card {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border-radius: 50%;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s;
  width: 1.75rem;
  height: 1.75rem;
}

.btn-card:hover {
  background-color: rgba(0, 0, 0, 0.1);
  transform: scale(1.1);
}

.btn-emoji {
  font-size: 1rem;
}
</style>