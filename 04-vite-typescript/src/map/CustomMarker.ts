import { Marker, Map } from 'leaflet'
import { CustomMap } from './map'
import { UBikeInfo } from '../fetchData'

export default class MapCustomMarker implements CustomMap.CustomMarker {
  marker: Marker

  private constructor(data: UBikeInfo, map: Map) {
    this.marker = new window.L.Marker(data.latLng)
    this.bindTooltip(data)
    this.marker.on('mouseover', () => {
      this.marker.openTooltip()
    })
    this.marker.on('mouseout', () => {
      this.marker.closeTooltip()
    })
    this.marker.on('click', () => {
      map.flyTo(data.latLng, 16)
    })
  }

  static create(data: UBikeInfo, map: Map) {
    return new MapCustomMarker(data, map)
  }

  bindTooltip(data: UBikeInfo) {
    this.marker.bindTooltip(`
      <p>${data.regionName} - ${data.stopName}</p>
      <p>總車數：${data.totalBikes}</p>
      <p>可用車數：${data.availableBikes}</p>
    `)
  }
}