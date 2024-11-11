import { defineStore } from 'pinia';

const VIEWBOX_SIZE = 100;

interface MapState {
  selectedRegion: SVGElement | null;
  fillMode: boolean;
  currentScale: number;
  offsetX: number;
  offsetY: number;
  isDragging: boolean;
  zoomFactor: number;
}

export const useMapStore = defineStore('map', {
  state: (): MapState => ({
    selectedRegion: null,
    fillMode: false,
    currentScale: 1,
    offsetX: 0,
    offsetY: 0,
    isDragging: false,
    zoomFactor: 1.2,
  }),
  getters: {
    strokeWidth(state) {
      return 0.1 / state.currentScale;
    },
  },
  actions: {
    toggleFillMode() {
      this.fillMode = !this.fillMode;
    },
    setSelectedRegion(region: SVGElement | null) {
      this.selectedRegion = region;
    },
    updateTransform(offsetX: number, offsetY: number, scale: number) {
      this.offsetX = offsetX;
      this.offsetY = offsetY;
      this.currentScale = scale;
      this.updateViewBox();
    },
    setDragging(isDragging: boolean) {
      this.isDragging = isDragging;
    },
    updateViewBox() {
      const svgElement = document.getElementById('map-container')?.querySelector('svg');
      if (svgElement) {
        const newViewBox = `${this.offsetX} ${this.offsetY} ${VIEWBOX_SIZE / this.currentScale} ${VIEWBOX_SIZE / this.currentScale}`;
        svgElement.setAttribute('viewBox', newViewBox);
        this.updateStrokeWidth();
      }
    },
    updateStrokeWidth() {
      const regions = document.querySelectorAll("#map-container path:not(.sea)");
      const strokeWidth = `${this.strokeWidth}px`;
      regions.forEach(region => {
        (region as SVGElement).style.strokeWidth = strokeWidth;
      });
    },
    zoomIn() {
      this.zoom(this.zoomFactor);
    },
    zoomOut() {
      this.zoom(1 / this.zoomFactor);
    },
    zoom(factor: number) {
      const newScale = this.currentScale * factor;
      const newOffsetX = this.offsetX + (VIEWBOX_SIZE / this.currentScale - VIEWBOX_SIZE / newScale) / 2;
      const newOffsetY = this.offsetY + (VIEWBOX_SIZE / this.currentScale - VIEWBOX_SIZE / newScale) / 2;
      this.updateTransform(newOffsetX, newOffsetY, newScale);
    }
  },
});