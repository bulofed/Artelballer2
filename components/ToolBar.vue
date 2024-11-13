<template>
  <div class="flex flex-col">
    <button 
      class="flex items-center justify-center p-2"
      @click="mapStore.zoomIn()"
    >
      <Icon name="material-symbols:zoom-in-rounded" class="size-8 text-accent hover:text-white transition" />
    </button>
    <button 
      class="flex items-center justify-center p-2"
      @click="mapStore.zoomOut()"
    >
      <Icon name="material-symbols:zoom-out-rounded" class="size-8 text-accent hover:text-white transition" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useMapStore } from '@/store/map';

const mapStore = useMapStore();
</script>