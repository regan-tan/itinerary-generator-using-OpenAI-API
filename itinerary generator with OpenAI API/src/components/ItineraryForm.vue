<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['generate']);

const destination = ref('');
const days = ref(3);
const interests = ref('');
const budget = ref('medium');
const apiKey = ref('');

function handleSubmit() {
  emit('generate', {
    apiKey: apiKey.value,
    params: {
      destination: destination.value,
      days: days.value,
      interests: interests.value,
      budget: budget.value
    }
  });
}
</script>

<template>
  <div class="card-body">
    <div class="mb-3">
      <label class="form-label">OpenAI API Key</label>
      <input 
        type="password" 
        v-model="apiKey"
        class="form-control"
        placeholder="Enter your OpenAI API key"
      >
    </div>

    <div class="mb-3">
      <label class="form-label">Destination</label>
      <input 
        type="text" 
        v-model="destination"
        class="form-control"
        placeholder="e.g., Paris, France"
      >
    </div>

    <div class="mb-3">
      <label class="form-label">Number of Days</label>
      <input 
        type="number" 
        v-model="days"
        class="form-control"
        min="1"
        max="14"
      >
    </div>

    <div class="mb-3">
      <label class="form-label">Interests</label>
      <textarea 
        v-model="interests"
        class="form-control"
        placeholder="e.g., history, food, art, outdoor activities"
        rows="3"
      ></textarea>
    </div>

    <div class="mb-3">
      <label class="form-label">Budget</label>
      <select v-model="budget" class="form-select">
        <option value="budget">Budget</option>
        <option value="medium">Medium</option>
        <option value="luxury">Luxury</option>
      </select>
    </div>

    <button 
      @click="handleSubmit"
      class="btn btn-primary w-100"
      :disabled="!destination || !apiKey"
    >
      Generate Itinerary
    </button>
  </div>
</template>