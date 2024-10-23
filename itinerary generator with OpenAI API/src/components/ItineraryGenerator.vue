<script setup>
import { ref } from 'vue';
import ItineraryForm from './ItineraryForm.vue';
import ItineraryResult from './ItineraryResult.vue';
import ApiService from '../services/api';

const loading = ref(false);
const error = ref('');
const itinerary = ref('');

async function handleGenerate(data) {
  loading.value = true;
  error.value = '';

  try {
    const apiService = new ApiService(data.apiKey);
    itinerary.value = await apiService.generateItinerary(data.params);
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'An unexpected error occurred';
    console.error(e);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card shadow">
          <div class="card-header bg-primary text-white">
            <h2 class="mb-0">AI Travel Itinerary Generator</h2>
          </div>
          
          <ItineraryForm 
            @generate="handleGenerate"
            :class="{ 'opacity-50': loading }"
            :disabled="loading"
          />

          <div v-if="loading" class="card-body text-center">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>

          <ItineraryResult
            v-if="!loading"
            :itinerary="itinerary"
            :error="error"
          />
        </div>
      </div>
    </div>
  </div>
</template>