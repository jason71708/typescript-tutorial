
import { Map } from 'leaflet'

export default class MapSingleton {
  readonly map: Map

  private constructor(elementId: string) {
    this.map = window.L.map(elementId)
  }

  private static Instance = new MapSingleton('map').map

  static getInstance() { return this.Instance }
}