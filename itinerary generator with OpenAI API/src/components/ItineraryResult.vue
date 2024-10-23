<script setup>
defineProps({
  itinerary: {
    type: String,
    required: true
  },
  error: {
    type: String,
    required: false
  }
});
</script>

<template>
  <div class="card-body">
    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <div v-if="itinerary" class="mt-4">
      <h3>Your Itinerary</h3>
      <div class="bg-light p-3 rounded">
        <pre class="mb-0" style="white-space: pre-wrap;">{{ itinerary }}</pre>
      </div>
    </div>
  </div>
</template>