<script setup>
defineProps({
  itinerary: {
    type: [Array, String],
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

    <div v-if="itinerary && Array.isArray(itinerary)" class="mt-4">
      <h3>Your Itinerary</h3>
      <div v-for="day in itinerary" :key="day.day" class="mb-4">
        <h4 class="mb-3">Day {{ day.day }}</h4>
        <div class="list-group">
          <div 
            v-for="(item, index) in day.schedule" 
            :key="index"
            class="list-group-item"
          >
            <div class="d-flex justify-content-between align-items-center">
              <strong class="text-primary">{{ item.time }}</strong>
              <span class="badge bg-light text-dark">{{ item.location }}</span>
            </div>
            <div class="mt-2">{{ item.activity }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>