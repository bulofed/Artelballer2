<template>
  <div class="w-screen h-screen overflow-hidden relative flex justify-center align-center" @mousedown="startDrag" @mouseup="stopDrag">
    <div id="map-container" class="absolute w-full h-full flex justify-center items-center" @mousedown="startDrag" @mouseup="stopDrag">
    </div>
  </div>
  <RegionInfo />
</template>

<script setup>
import { useMapStore } from '@/store/map';
import RegionInfo from './RegionInfo.vue';
const mapStore = useMapStore();
let startGlobal = { x: 0, y: 0 };
let svg, viewBox, point;
let isDragging = false;

const startDrag = (event) => {
  isDragging = false;
  mapStore.setDragging(true);
  point.x = event.clientX;
  point.y = event.clientY;
  startGlobal = point.matrixTransform(svg.getScreenCTM().inverse());
};

const dragMap = (event) => {
  if (mapStore.isDragging) {
    isDragging = true;
    point.x = event.clientX;
    point.y = event.clientY;
    const moveGlobal = point.matrixTransform(svg.getScreenCTM().inverse());
    mapStore.offsetX -= (moveGlobal.x - startGlobal.x);
    mapStore.offsetY -= (moveGlobal.y - startGlobal.y);
    mapStore.updateViewBox();
  }
};

const stopDrag = () => {
  mapStore.setDragging(false);
  if (!isDragging) {
    mapStore.updateTransform(viewBox.x, viewBox.y, mapStore.currentScale);
  }
};

const selectRegion = (event) => {
  if (!isDragging) {
    const region = event.target;
    if (region.tagName === 'path') {
      if (mapStore.selectedRegion) {
        mapStore.selectedRegion.classList.remove('selected-region');
      }
      mapStore.setSelectedRegion(region);
      region.classList.add('selected-region');
      region.parentNode.appendChild(region);
    }
  }
};

onMounted(() => {
  fetch('/territories.svg')
    .then(response => response.text())
    .then(svgData => {
      document.getElementById('map-container').innerHTML = svgData;
      svg = document.querySelector('#map-container svg');
      viewBox = svg.viewBox.baseVal;
      point = svg.createSVGPoint();
      const regions = document.querySelectorAll("#map-container path");
      regions.forEach((region, _) => {
        if (region.id === 'sea' || region.classList.contains('sea')) {
          return;
        }
        region.classList.add("region");
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
  window.addEventListener('mouseup', stopDrag);
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