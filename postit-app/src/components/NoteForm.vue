<template>
  <div class="note-form">
    <h2 class="mb-4">{{ editing ? 'Modifier la note' : 'Nouvelle note' }}</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="title" class="form-label">Titre</label>
        <input
          type="text"
          id="title"
          v-model="formData.title"
          class="form-input"
          :class="{ 'form-input-error': errors.title }"
          placeholder="Titre de la note"
        />
        <p v-if="errors.title" class="error-message">{{ errors.title }}</p>
      </div>

      <div class="form-group">
        <label for="content" class="form-label">Contenu</label>
        <textarea
          id="content"
          v-model="formData.content"
          rows="4"
          class="form-textarea"
          :class="{ 'form-input-error': errors.content }"
          placeholder="Contenu de la note..."
        ></textarea>
        <p v-if="errors.content" class="error-message">{{ errors.content }}</p>
      </div>

      <div class="form-group">
        <label class="form-label">Couleur</label>
        <div class="color-options">
          <div
            v-for="color in colorOptions"
            :key="color.name"
            @click="formData.color = color.name"
            class="color-option"
            :class="[color.class, { selected: formData.color === color.name }]"
            :title="color.label"
          ></div>
        </div>
      </div>

      <div class="flex justify-between">
        <button
          v-if="editing"
          type="button"
          @click="$emit('cancel')"
          class="btn btn-secondary"
        >
          Annuler
        </button>
        <button
          type="submit"
          class="btn btn-primary"
          :class="{ 'ml-auto': !editing }"
        >
          {{ editing ? 'Modifier' : 'Créer' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'

const props = defineProps({
  editing: Boolean,
  note: Object
})

const emit = defineEmits(['submit', 'cancel'])

const colorOptions = [
  { name: 'yellow', class: 'color-yellow', label: 'Jaune' },
  { name: 'blue', class: 'color-blue', label: 'Bleu' },
  { name: 'green', class: 'color-green', label: 'Vert' },
  { name: 'pink', class: 'color-pink', label: 'Rose' }
]

const formData = reactive({
  title: '',
  content: '',
  color: 'yellow'
})

const errors = reactive({
  title: '',
  content: ''
})

// Si on est en mode édition, pré-remplir le formulaire
watch(() => props.note, (newNote) => {
  if (newNote) {
    formData.title = newNote.title
    formData.content = newNote.content
    formData.color = newNote.color
  }
}, { immediate: true })

// Validation du formulaire
const validateForm = () => {
  let isValid = true
  errors.title = ''
  errors.content = ''

  // Validation du titre
  if (!formData.title.trim()) {
    errors.title = 'Le titre est obligatoire'
    isValid = false
  }

  // Validation du contenu : si c'est un tableau, convertir en string
  let contentString = formData.content
  if (Array.isArray(contentString)) {
    contentString = contentString.join(' ')
  }

  if (!contentString.trim()) {
    errors.content = 'Le contenu est obligatoire'
    isValid = false
  }

  return isValid
}

// Soumission du formulaire
const handleSubmit = () => {

  if (validateForm()) {
 
    emit('submit', { ...formData })
    
    // Réinitialiser le formulaire si on n'est pas en mode édition
    if (!props.editing) {
      formData.title = ''
      formData.content = ''
      formData.color = 'yellow'
    }
  }
}
</script>

<style scoped>
.note-form {
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.ml-auto {
  margin-left: auto;
}
</style>