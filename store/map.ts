import { defineStore } from 'pinia';

const VIEWBOX_SIZE = 100;
const MIN_SCALE = 1;
const MAX_SCALE = 115;

interface MapState {
  selectedRegion: SVGElement | null;
  selectedRegionName: string | null;
  fillMode: boolean;
  currentScale: number;
  offsetX: number;
  offsetY: number;
  zoomFactor: number;
}

export const useMapStore = defineStore('map', {
  state: (): MapState => ({
    selectedRegion: null,
    selectedRegionName: null,
    fillMode: false,
    currentScale: 1,
    offsetX: 0,
    offsetY: 0,
    zoomFactor: 1.2,
  }),
  getters: {
    strokeWidth(state): number {
      return 0.1 / state.currentScale;
    },
  },
  actions: {
    toggleFillMode(): void {
      this.fillMode = !this.fillMode;
    },
    setSelectedRegion(region: SVGElement | null): void {
      this.selectedRegion = region;
      this.selectedRegionName = region?.getAttribute('data-name') || null;
    },
    updateTransform(offsetX: number, offsetY: number, scale: number): void {
      this.offsetX = offsetX;
      this.offsetY = offsetY;
      this.currentScale = scale;
      this.updateViewBox();
    },
    updateViewBox(): void {
      const svgElement = document.getElementById('map-container')?.querySelector('svg');
      if (svgElement) {
        const newViewBox = `${this.offsetX} ${this.offsetY} ${VIEWBOX_SIZE / this.currentScale} ${VIEWBOX_SIZE / this.currentScale}`;
        svgElement.setAttribute('viewBox', newViewBox);
        this.updateStrokeWidth();
      }
    },
    updateStrokeWidth(): void {
      const regions = document.querySelectorAll("#map-container path:not(.sea)");
      const strokeWidth = `${this.strokeWidth}px`;
      regions.forEach(region => {
        (region as SVGElement).style.strokeWidth = strokeWidth;
      });
    },
    zoomIn(): void {
      this.zoom(this.zoomFactor);
    },
    zoomOut(): void {
      this.zoom(1 / this.zoomFactor);
    },
    zoom(factor: number): void {
      const newScale = this.currentScale * factor;
      if (newScale < MIN_SCALE || newScale > MAX_SCALE) return;
      const newOffsetX = this.offsetX + (VIEWBOX_SIZE / this.currentScale - VIEWBOX_SIZE / newScale) / 2;
      const newOffsetY = this.offsetY + (VIEWBOX_SIZE / this.currentScale - VIEWBOX_SIZE / newScale) / 2;
      this.updateTransform(newOffsetX, newOffsetY, newScale);
    }
  },
});