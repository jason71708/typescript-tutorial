import { Map } from 'leaflet'
import MapCustomMarker from './map/CustomMarker'
import MapInitializer from './map/Initializer'
import MapMarkerLayer from './map/MarkerLayer'
import MapSingleton from './map/MapSingleton'
import { UBikeInfo } from './fetchData'

export default class UBikeMapFacade {
  private map: Map = MapSingleton.getInstance()
  private mapInitializer: MapInitializer = new MapInitializer(this.map)
  private mapMarkerLayer: MapMarkerLayer = new MapMarkerLayer(this.map)

  constructor() {
    this.mapInitializer.init()
  }

  pinStops(data: UBikeInfo[]) {
    if (data.length === 0) return
    const markers = data.map(info => {
      const marker = MapCustomMarker.create(info, this.map)
      return marker
    })
    this.mapMarkerLayer.addMarkers(markers)
    this.map.flyTo(data[0].latLng, 13)
  }

  clearStops() {
    this.mapMarkerLayer.clear()
  }
}