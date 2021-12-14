import { LayerGroup, Map, Marker, LatLngExpression, ZoomPanOptions } from 'leaflet'
import { UBikeInfo } from '../fetchData'

declare namespace CustomMap {
  export interface Initializer {
    readonly map: Map
    init(): void
  }

  export interface MarkerLayer {
    readonly map: Map
    readonly layer: LayerGroup
    addMarker(marker: CustomMarker): void
    addMarkers(markers: CustomMarker[]): void
    clear(): void
  }

  export interface CustomMarker {
    marker: Marker
    bindTooltip(data: UBikeInfo): void
  }
}