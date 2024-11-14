<template>
  <div class="w-screen h-screen overflow-hidden relative flex justify-center align-center" @mousedown="startDrag" @mouseup="stopDrag">
    <div id="map-container" class="absolute w-full h-full flex justify-center items-center" @mousedown="startDrag" @mouseup="stopDrag"/>
  </div>
  <RegionInfo />
</template>

<script setup>
import { useMapStore } from '@/store/map';
import RegionInfo from './RegionInfo.vue';

const mapStore = useMapStore();
let startGlobal = { x: 0, y: 0 };
let startClient = { x: 0, y: 0 };
let svg, point;
let isDragging = false;

const DRAG_THRESHOLD = 5;

const startDrag = (event) => {
  point.x = event.clientX;
  point.y = event.clientY;
  startClient = { x: event.clientX, y: event.clientY };
  startGlobal = point.matrixTransform(svg.getScreenCTM().inverse());
  isDragging = false;
};

const dragMap = (event) => {
  if (!event.buttons) return;

  const deltaX = Math.abs(event.clientX - startClient.x);
  const deltaY = Math.abs(event.clientY - startClient.y);
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  if (distance > DRAG_THRESHOLD) {
    isDragging = true;
  }

  if (isDragging) {
    point.x = event.clientX;
    point.y = event.clientY;
    const moveGlobal = point.matrixTransform(svg.getScreenCTM().inverse());
    mapStore.offsetX -= (moveGlobal.x - startGlobal.x);
    mapStore.offsetY -= (moveGlobal.y - startGlobal.y);
    mapStore.updateViewBox();
  }
};

const selectRegion = (event) => {
  if (isDragging) return;

  const region = event.target;
  if (region.tagName !== 'path') return;

  if (mapStore.selectedRegion) {
    mapStore.selectedRegion.classList.remove('selected-region');
  }
  mapStore.setSelectedRegion(region);
  region.classList.add('selected-region');
  region.parentNode.appendChild(region);
};

onMounted(() => {
  fetch('/territories.svg')
    .then(response => response.text())
    .then(svgData => {
      document.getElementById('map-container').innerHTML = svgData;
      svg = document.querySelector('#map-container svg');
      point = svg.createSVGPoint();

      const regions = document.querySelectorAll("#map-container path");
      regions.forEach((region) => {
        if (region.id === 'sea' || region.classList.contains('sea')) return;
        
        region.classList.add("region");
        region.addEventListener('mousedown', startDrag);
        region.addEventListener('click', selectRegion);
      });

      mapStore.offsetX = 400;
      mapStore.offsetY = 25;
      mapStore.updateViewBox();
    })
    .catch(error => {
      console.error("Error loading the SVG:", error);
    });

  window.addEventListener('mousemove', dragMap);
});
</script>

<style>
.region {
  fill: gray;
  stroke: #F8F8F2;
}
.selected-region {
  stroke: #44475A;
}
</style>