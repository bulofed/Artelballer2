<template>
  <div class="flex flex-col space-y-2">
    <button 
      class="bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-full flex items-center justify-center p-2"
      @click="mapStore.zoomIn()"
    >
      <Icon name="material-symbols:zoom-in-rounded" class="size-6" />
    </button>
    <button 
      class="bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-full flex items-center justify-center p-2"
      @click="mapStore.zoomOut()"
    >
      <Icon name="material-symbols:zoom-out-rounded" class="size-6" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useMapStore } from '@/store/map';

const mapStore = useMapStore();
</script>