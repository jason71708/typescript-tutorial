import { LayerGroup, Map } from 'leaflet'
import { CustomMap } from './map'
import MapCustomMarker from './CustomMarker'

export default class MapMarkerLayer implements CustomMap.MarkerLayer {
  readonly layer: LayerGroup = window.L.layerGroup()

  constructor(
    readonly map: Map,
  ) {
    this.layer.addTo(map)
  }

  addMarker(marker: MapCustomMarker) {
    marker.marker.addTo(this.layer)
  }

  addMarkers(markers: MapCustomMarker[]) {
    markers.forEach(marker => {
      this.addMarker(marker)
    })
  }

  clear() {
    this.layer.clearLayers()
  }
}