<template>
  <div v-if="mapStore.selectedRegionName" class="font-serif bg-primary text-lg text-white absolute right-0 bottom-0 flex justify-center px-2 min-w-64 rounded-tl-lg">
    {{ mapStore.selectedRegionName }}
  </div>
</template>

<script lang="ts" setup>
import { useMapStore } from '@/store/map';

const mapStore = useMapStore();
</script>

<style scoped>

</style>