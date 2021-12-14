import { LatLngExpression, Map } from 'leaflet'
import { CustomMap } from './map';

const config = {
  coordinate: [25.0330, 121.5654] as LatLngExpression,
  zoomLevel: 13,
  tileLayerURL: 'https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
}

export default class MapInitializer implements CustomMap.Initializer {
  constructor(
    public readonly map: Map
  ) { }

  init() {
    this.map.setView(config.coordinate, config.zoomLevel)
    window.L.tileLayer(config.tileLayerURL).addTo(this.map)
  }
}